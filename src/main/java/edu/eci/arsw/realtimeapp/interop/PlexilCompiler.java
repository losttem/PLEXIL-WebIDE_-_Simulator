/*
 * Copyright (C) 2015 hcadavid
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.eci.arsw.realtimeapp.interop;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author hcadavid
 */
public class PlexilCompiler {

    private static final PlexilCompiler instance = new PlexilCompiler();

    private PlexilCompiler() {
    }

    public static PlexilCompiler getInstance() {
        return instance;
    }

    public void compile(String planPath) throws CompilationException {
        String cmd1 = "/bin/bash";
        ProcessBuilder pb = new ProcessBuilder(cmd1, "-c", "$PLEXIL_HOME/scripts/plexilc " + planPath);
        Map<String, String> env = pb.environment();
        env.put("PLEXIL_HOME", "/Users/hcadavid/apps/plexil-4.0.1");
        Process p;
        try {
            p = pb.start();
        } catch (IOException ex) {
            throw new CompilationException("Error while compiling "+planPath,ex);
        }
        
        final InputStream is = p.getInputStream();
        final InputStream es = p.getErrorStream();
        final BufferedReader isbr = new BufferedReader(new InputStreamReader(is));
        final BufferedReader errbr = new BufferedReader(new InputStreamReader(es));

        
        
        int r;
        try {
            r = p.waitFor(); // Let the process finish.
            if (r != 0) { // No error                
                throw new CompilationException("Unable to compile "+planPath+". Compiler execution returned "+r);
            }
        } catch (InterruptedException ex) {
            throw new CompilationException("Error while compiling "+planPath,ex);
        }

        final StringBuffer errorOutcome=new StringBuffer();
        
        //thread to handle the commands generated by UE with a callback
        Thread isReadingThread=new Thread() {
            public void run() {
                try {
                    String line=null;
                    while ((line = isbr.readLine()) != null) {
                        errorOutcome.append(line+"\n");                        
                    }
                } catch (IOException ex) {
                    Logger.getLogger(PlexilCompiler.class.getName()).log(Level.SEVERE, null, ex);
                    throw new RuntimeException("Error generated by command reception callback thread.",ex);
                }
                
            }
        };

        
        isReadingThread.start();
        
        try {
            isReadingThread.join();
        } catch (InterruptedException ex) {
            Logger.getLogger(PlexilCompiler.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        Thread errReadingThread=new Thread() {
            public void run() {
                try {
                    String line=null;
                    while ((line = errbr.readLine()) != null) {                        
                        errorOutcome.append(line+"\n");                        
                    }
                } catch (IOException ex) {
                    Logger.getLogger(PlexilCompiler.class.getName()).log(Level.SEVERE, null, ex);
                    throw new RuntimeException("Error generated by command reception callback thread.",ex);
                }
                
            }
        };

        
        errReadingThread.start();        
        
        try {
            errReadingThread.join();
            String errorOutcomeMsg=errorOutcome.toString().trim();
            if (!errorOutcomeMsg.equals("")){
                throw new CompilationException("Compilation error:"+errorOutcomeMsg);
            }
        } catch (InterruptedException ex) {
            throw new CompilationException("Compilation error:"+ex);
        }
        
        
    }

    public static void main(String args[]) throws IOException, CompilationException {
        PlexilCompiler.getInstance().compile("/tmp/CommandsExample.ple");
        System.out.println("done");
    }

}
