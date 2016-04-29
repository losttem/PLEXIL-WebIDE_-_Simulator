




/*
 Source code adapted by Hector Cadavid.
 Original sources: Racing car example, author: Silver Moon (m00n.silv3r@gmail.com)
 */

var randomIdentifier=Math.random().toString(36).slice(2);
var carxpos=3;
var carypos=3;



//Get the objects of Box2d Library
var b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2AABB = Box2D.Collision.b2AABB
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
        , b2Shape = Box2D.Collision.Shapes.b2Shape
        , b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
        , b2Joint = Box2D.Dynamics.Joints.b2Joint
        , b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef
        ,      b2RayCastInput = Box2D.Collision.b2RayCastInput
        ,      b2RayCastOutput = Box2D.Collision.b2RayCastOutput
        ;

var car_raycast_origin = new b2Vec2( 0,0);
var car_raycast_destiny = new b2Vec2();
var car_raycast_intersectionPoint=new b2Vec2();



var game = {
    'rover_commands':function(code)
    {
        
        if (code === "m")
        {
            steering_angle = -30*(Math.PI/180);
            console.log('steering angle:'+steering_angle);
        }
        if (code === "n")
        {
            steering_angle = -20*(Math.PI/180);
            console.log('steering angle:'+steering_angle);
        }
        if (code === "o")
        {
            steering_angle = -10*(Math.PI/180);     
            console.log('steering angle:'+steering_angle);
        }
        if (code === "p")
        {
            steering_angle = 0;        
            console.log('steering angle:'+steering_angle);
        }
        if (code === "q")
        {
            steering_angle = 10*(Math.PI/180);
            console.log('steering angle:'+steering_angle);
        }
        if (code === "r")
        {
            steering_angle = 20*(Math.PI/180); 
            console.log('steering angle:'+steering_angle);
        }
        if (code === "s")
        {
            steering_angle = 30*(Math.PI/180);
            console.log('steering angle:'+steering_angle);
        }
        
        
        
        if (code === "M")
        {
            rear_steering_angle = -30*(Math.PI/180);
            console.log('steering angle:'+rear_steering_angle);
        }
        if (code === "N")
        {
            rear_steering_angle = -20*(Math.PI/180);
            console.log('steering angle:'+rear_steering_angle);
        }
        if (code === "O")
        {
            rear_steering_angle = -10*(Math.PI/180);     
            console.log('steering angle:'+rear_steering_angle);
        }
        if (code === "P")
        {
            rear_steering_angle = 0;        
            console.log('steering angle:'+rear_steering_angle);
        }
        if (code === "Q")
        {
            rear_steering_angle = 10*(Math.PI/180);
            console.log('steering angle:'+rear_steering_angle);
        }
        if (code === "R")
        {
            rear_steering_angle = 20*(Math.PI/180); 
            console.log('steering angle:'+rear_steering_angle);
        }
        if (code === "S")
        {
            rear_steering_angle = 30*(Math.PI/180);
            console.log('steering angle:'+rear_steering_angle);
        }
        
        
        
        //0: STOP
        if (code === "0")
        {
            car.stop_engine();
        }        
        
        if (code === "a")
        {
            car.gear = 1;
            car.start_engine_at_power(20);            
        }
        if (code === "b")
        {
            car.gear = 1;
            car.start_engine_at_power(40);            
        }
        if (code === "c")
        {
            car.gear = 1;
            car.start_engine_at_power(60);            
        }
        if (code === "d")
        {
            car.gear = 1;
            car.start_engine_at_power(80);            
        }
        if (code === "e")
        {
            car.gear = 1;
            car.start_engine_at_power(100);            
        }

        if (code === "a")
        {
            car.gear = 1;
            car.start_engine_at_power(20);            
        }
        if (code === "b")
        {
            car.gear = 1;
            car.start_engine_at_power(40);            
        }
        if (code === "c")
        {
            car.gear = 1;
            car.start_engine_at_power(60);            
        }
        if (code === "d")
        {
            car.gear = 1;
            car.start_engine_at_power(80);            
        }
        if (code === "e")
        {
            car.gear = 1;
            car.start_engine_at_power(100);            
        }        

        
        //backwards
        if (code === "f")
        {
            car.gear = -1;
            car.start_engine_at_power(20);            
        }
        if (code === "g")
        {
            car.gear = -1;
            car.start_engine_at_power(40);            
        }
        if (code === "h")
        {
            car.gear = -1;
            car.start_engine_at_power(60);            
        }
        if (code === "i")
        {
            car.gear = -1;
            car.start_engine_at_power(80);            
        }
        if (code === "j")
        {
            car.gear = -1;
            car.start_engine_at_power(100);            
        }
        
        
        //up
        
        /*if (code === "38")
        {
            var jsonstr = JSON.stringify({'destiny': 'servidor', 'body':'acuse de recibo' }); 
            //var jsonstr = JSON.stringify({'name': 'position', 'value': '33'});            
            stompClient.send("/app/rutaMensajesEntrantes", {}, jsonstr);
            
            car.gear = 1;
            car.start_engine();
        }*/

    },        
    'screen_width': 0,
    'screen_height': 0,
};

var engine_speed = 0;
var steering_angle = 0;
var rear_steering_angle = 0;
var steer_speed = 30.0;
var max_steer_angle = Math.PI / 3;    //60 degrees to be precise
var world;
var ctx;
var canvas_height;

var carbody;

var min_rotation_unit = Math.PI / 180;


//1 metre of box2d length becomes 100 pixels on canvas
var scale = 100;

var obstacle1;
var obstacle2;

//The car object
var car = {
    'top_engine_speed': 2.5,
    'engine_on': false,
    'start_engine_at_power': function (powerpercent)
    {
        car.engine_on = true;
        car.engine_speed = car.gear * (powerpercent*(car.top_engine_speed/100));
    },
    'start_engine': function ()
    {
        car.engine_on = true;
        car.engine_speed = car.gear * car.top_engine_speed;
    },
    'stop_engine': function ()
    {
        car.engine_on = false;
        car.engine_speed = 0;
    },
    'gear': 1
};

/*
 Draw a world
 this method is called in a loop to redraw the world
 */
function redraw_world(world, context)
{
    //convert the canvas coordinate directions to cartesian
    ctx.save();
    ctx.translate(0, canvas_height);
    ctx.scale(1, -1);
    world.DrawDebugData();
    ctx.restore();

    ctx.font = 'bold 15px arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    ctx.strokeStyle = "rgb(255, 255, 255)";

    ctx.beginPath(); // Start the path


    ctx.moveTo(car_raycast_origin.x * scale, canvas_height - (car_raycast_origin.y * scale)); // Set the path origin

    ctx.lineTo(car_raycast_intersectionPoint.x * scale, canvas_height - (car_raycast_intersectionPoint.y * scale));

    ctx.closePath(); // Close the path
    ctx.stroke();

}

//Create box2d world object
function createWorld()
{
    var gravity = new b2Vec2(0, 0);
    var doSleep = true;

    world = new b2World(gravity, doSleep);

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);

    //createBox(world, game.screen_width / 2, 0.5, game.screen_width / 2 - 1, 0.1, {'type': b2Body.b2_staticBody, 'restitution': 0.5});
    //createBox(world, game.screen_width - 1, game.screen_height / 2, 0.1, game.screen_height / 2 - 1, {'type': b2Body.b2_staticBody, 'restitution': 0.5});

    //few lightweight boxes
    var free = {'restitution': 1.0, 'linearDamping': 1.0, 'angularDamping': 1.0, 'density': 0.2};
    obstacle1=createBox(world, 2, 2, 0.25, 0.25, free);
    console.log("Obstacle 1:"+obstacle1.GetPosition().x);
    obstacle2=createBox(world, 5, 2, 0.5, 0.5, free);

    return world;
}

//Create standard boxes of given height , width at x,y
function createBox(world, x, y, width, height, options)
{
    //default setting
    options = $.extend(true, {
        'density': 1.0,
        'friction': 0.0,
        'restitution': 0.2,
        'linearDamping': 0.0,
        'angularDamping': 0.0,
        'gravityScale': 1.0,
        'type': b2Body.b2_dynamicBody
    }, options);

    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef;

    fix_def.density = options.density;
    fix_def.friction = options.friction;
    fix_def.restitution = options.restitution;

    fix_def.shape = new b2PolygonShape();

    fix_def.shape.SetAsBox(width, height);

    body_def.position.Set(x, y);

    body_def.linearDamping = options.linearDamping;
    body_def.angularDamping = options.angularDamping;

    body_def.type = options.type;

    var b = world.CreateBody(body_def);
    var f = b.CreateFixture(fix_def);

    return b;
}

/*
 This method will draw the world again and again
 called by settimeout , self looped ,
 game_loop
 */
function game_loop()
{
    var updateDelta=0.1;
    var fps = 60;
    var time_step = 1.0 / fps;

    update_car();
    
    
    
    if (Math.abs(car.body.GetPosition().x-carxpos) >= updateDelta){
        carxpos=car.body.GetPosition().x;
        obsxpos=obstacle1.GetPosition().x;
        //console.log("Distance to obstacle:"+(carxpos-obsxpos));
        //sendEvent("pos.updated",car.body.GetPosition().x+","+car.body.GetPosition().y);                
    }    
    
    
    //move the world ahead , step ahead man!!
    world.Step(time_step, 8, 3);
    //Clear the forces , Box2d 2.1a 
    world.ClearForces();

    //redraw the world
    redraw_world(world, ctx);

    //call this function again after 10 seconds
    setTimeout('game_loop()', 5000 / 60);
}


// main entry point
$(function ()
{
    game.ctx = ctx = $('#canvas').get(0).getContext('2d');
    var canvas = $('#canvas');

    game.canvas_width = canvas_width = parseInt(canvas.width());
    game.canvas_height = canvas_height = parseInt(canvas.height());

    game.screen_width = game.canvas_width / scale;
    game.screen_height = game.canvas_height / scale;

    //first create the world
    world = createWorld();

    create_car();

    //Start the Game Loop!!!!!!!
    game_loop();
});


function createSmallBox(v) {
    createBox(world, (game.screen_width / 2), (game.screen_height / 2), 0.1, 0.1, {'type': b2Body.b2_staticBody, 'restitution': 0.5});

}


function create_car()
{
    car_pos = new b2Vec2(3, 3);
    
    
    car_dim = new b2Vec2(0.15, 0.35);
    car.body = createBox(world, car_pos.x, car_pos.y, car_dim.x, car_dim.y, {'linearDamping': 10.0, 'angularDamping': 10.0});

    var wheel_dim = new b2Vec2(0.045, 0.1);
    //wheel_dim.Multiply(0.2);

    //front wheels
    left_wheel = createBox(world, car_pos.x - car_dim.x, car_pos.y + car_dim.y - 0.07, wheel_dim.x, wheel_dim.y, {});
    right_wheel = createBox(world, car_pos.x + car_dim.x, car_pos.y + car_dim.y - 0.07, wheel_dim.x, wheel_dim.y, {});

    //center wheels
    left_center_wheel = createBox(world, car_pos.x - car_dim.x, car_pos.y, wheel_dim.x, wheel_dim.y, {});
    right_center_wheel = createBox(world, car_pos.x + car_dim.x, car_pos.y, wheel_dim.x, wheel_dim.y, {});

    //rear wheels
    left_rear_wheel = createBox(world, car_pos.x - car_dim.x, car_pos.y - car_dim.y + 0.07, wheel_dim.x, wheel_dim.y, {});
    right_rear_wheel = createBox(world, car_pos.x + car_dim.x, car_pos.y - car_dim.y + 0.07, wheel_dim.x, wheel_dim.y, {});

    var front_wheels = {'left_wheel': left_wheel, 'right_wheel': right_wheel};

    var rear_wheels = {'left_rear_wheel': left_rear_wheel, 'right_rear_wheel': right_rear_wheel};

    //Wheels with freedoom degrees (front,rear)
    for (var i in front_wheels)
    {
        var wheel = front_wheels[i];

        var joint_def = new b2RevoluteJointDef();
        joint_def.Initialize(car.body, wheel, wheel.GetWorldCenter());

        //after enablemotor , setmotorspeed is used to make the joins rotate , remember!
        joint_def.enableMotor = true;
        joint_def.maxMotorTorque = 100000;

        //this will prevent spinning of wheels when hit by something strong
        joint_def.enableLimit = true;
        joint_def.lowerAngle = -1 * max_steer_angle;
        joint_def.upperAngle = max_steer_angle;

        //create and save the joint
        car[i + '_joint'] = world.CreateJoint(joint_def);
    }

    for (var i in rear_wheels)
    {
        var wheel = rear_wheels[i];

        var joint_def = new b2RevoluteJointDef();
        joint_def.Initialize(car.body, wheel, wheel.GetWorldCenter());

        //after enablemotor , setmotorspeed is used to make the joins rotate , remember!
        joint_def.enableMotor = true;
        joint_def.maxMotorTorque = 100000;

        //this will prevent spinning of wheels when hit by something strong
        joint_def.enableLimit = true;
        joint_def.lowerAngle = -1 * max_steer_angle;
        joint_def.upperAngle = max_steer_angle;

        //create and save the joint
        car[i + '_joint'] = world.CreateJoint(joint_def);
    }


    //Wheels without freedoom degrees     
    var center_wheels = {
        'left_center_wheel': left_center_wheel,
        'right_center_wheel': right_center_wheel
    };

    for (var i in center_wheels)
    {
        var wheel = center_wheels[i];

        var joint_def = new b2PrismaticJointDef();
        joint_def.Initialize(car.body, wheel, wheel.GetWorldCenter(), new b2Vec2(1, 0));

        joint_def.enableLimit = true;
        joint_def.lowerTranslation = joint_def.upperTranslation = 0.0;

        car[i + '_joint'] = world.CreateJoint(joint_def);
    }

    car.left_wheel = left_wheel;
    car.right_wheel = right_wheel;
    car.left_rear_wheel = left_rear_wheel;
    car.right_rear_wheel = right_rear_wheel;

    return car;
}

//Method to update the car
function update_car()
{
    var wheels = ['left', 'right'];

    var rear_wheels = ['left_rear', 'right_rear'];

    var motorized_wheels = ['left', 'right', 'left_rear', 'right_rear'];

    //Driving
    for (var i in motorized_wheels)
    {
        var d = motorized_wheels[i] + '_wheel';
        var wheel = car[d];

        //get the direction in which the wheel is pointing
        var direction = wheel.GetTransform().R.col2.Copy();

        //console.log(direction.y);
        direction.Multiply(car.engine_speed);

        //apply force in that direction
        wheel.ApplyForce(direction, wheel.GetPosition());
    }

    //Steering
    for (var i in wheels)
    {
        var d = wheels[i] + '_wheel_joint';
        var wheel_joint = car[d];

        //max speed - current speed , should be the motor speed , so when max speed reached , speed = 0;
        var angle_diff = steering_angle - wheel_joint.GetJointAngle();
        wheel_joint.SetMotorSpeed(angle_diff * steer_speed);
    }

    //Rear wheels Steering
    for (var i in rear_wheels)
    {
        var d = rear_wheels[i] + '_wheel_joint';
        var wheel_joint = car[d];

        //max speed - current speed , should be the motor speed , so when max speed reached , speed = 0;
        var angle_diff = rear_steering_angle - wheel_joint.GetJointAngle();
        wheel_joint.SetMotorSpeed(angle_diff * steer_speed);
    }


    ray();

}


/*
 * 
 * RAYTRACING
 * 
 */

function ray() {

    
    rayLength = 10;

    car_angle=car.body.GetAngle();
    car_raycast_origin.x = car.body.GetPosition().x;
    car_raycast_origin.y = car.body.GetPosition().y;

    currentRayAngle = car_angle; //one revolution every 20 seconds
    
    //var p1 = new b2Vec2( car.body.GetPosition().x, car.body.GetPosition().y );
    //var p1 = new b2Vec2( 0,0);
    //var p2 = new b2Vec2();
    //var intersectionPoint=new b2Vec2();
    //console.log(currentRayAngle*(180/Math.PI));

    //calculate points of ray
    car_raycast_destiny.x = car_raycast_origin.x + rayLength * Math.sin(currentRayAngle);
    car_raycast_destiny.y = car_raycast_origin.y + rayLength * Math.cos(currentRayAngle);

    input = new b2RayCastInput();
    output = new b2RayCastOutput();


    input.p1 = car_raycast_origin;
    input.p2 = car_raycast_destiny;
    input.maxFraction = 1;
    closestFraction = 1;

    var b = new b2BodyDef();
    var f = new b2FixtureDef();
    for (b = world.GetBodyList(); b; b = b.GetNext()) {
        for (f = b.GetFixtureList(); f; f = f.GetNext()) {
            if (!f.RayCast(output, input))
                continue;
            else if (output.fraction < closestFraction) {
                closestFraction = output.fraction;
                intersectionNormal = output.normal;
            }
        }

    }

    car_raycast_intersectionPoint.x = car_raycast_origin.x + closestFraction * (car_raycast_destiny.x - car_raycast_origin.x);
    car_raycast_intersectionPoint.y = car_raycast_origin.y + closestFraction * (car_raycast_destiny.y - car_raycast_origin.y);

    //console.log("--->Closest fraction:"+closestFraction);


    //ctx.strokeStyle = "rgb(255, 255, 255)";

    //ctx.beginPath(); // Start the path

    //context.moveTo(p1.x*30,p1.y*30); // Set the path origin
    //context.moveTo(p1.x*scale,p1.y*scale); // Set the path origin
    //ctx.moveTo(10,10); // Set the path origin

    //context.lineTo(intersectionPoint.x*scale, intersectionPoint.y*scale); // Set the path destination
    //ctx.lineTo(200, 200); // Set the path destination
    //ctx.closePath(); // Close the path
    //ctx.stroke();

    //context.beginPath(); // Start the path
    //context.moveTo(intersectionPoint.x*30, intersectionPoint.y*30); // Set the path origin
    //context.lineTo(normalEnd.x*30, normalEnd.y*30); // Set the path destination
    //context.closePath(); // Close the path
    //context.stroke(); // Outline the path
}


/*----------------------------*/


var socket = new SockJS("/roversim/sockets/ws");
var stompClient = Stomp.over(socket);

// Callback function to be called when stomp client is connected to server
var connectCallback = function () {
    
    stompClient.subscribe('/topic/command/'+randomIdentifier,
            function (data) {
                console.log("GOT COMMAND:" + data);
                var message=JSON.parse(data.body);                
                game.rover_commands(message.commandCode);
                
                //var message = JSON.parse(data.body);
                //console.log("got:" + message.destiny + "," + message.body);
            }
    );
    
    stompClient.subscribe('/topic/messages/'+randomIdentifier,
            function (data) {
                //console.log("got message:" + data);
                var message=JSON.parse(data.body); 
                
                showError(message.body);                
                
                //game.rover_commands(message.commandCode);
                
                //var message = JSON.parse(data.body);
                //console.log("got:" + message.destiny + "," + message.body);
            }
    );    
    
};

// Callback function to be called when stomp client could not connect to server
var errorCallback = function (error) {
    alert(error.headers.message);
};

// Connect to server via websocket
stompClient.connect("guest", "guest", connectCallback, errorCallback);

sendEvent = function (name,value) {
                var jsessionId = randomIdentifier;                
                var jsonstr = JSON.stringify({'clientSessionId': jsessionId, 'name': name, 'value':value});
                stompClient.send("/app/event", {}, jsonstr);
            };
