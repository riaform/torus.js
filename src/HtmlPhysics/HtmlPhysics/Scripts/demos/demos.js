var b2Vec2 = Box2D.Common.Math.b2Vec2,
			 b2BodyDef = Box2D.Dynamics.b2BodyDef,
			 b2Body = Box2D.Dynamics.b2Body,
			 b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
			 b2Fixture = Box2D.Dynamics.b2Fixture,
			 b2World = Box2D.Dynamics.b2World,
			 b2MassData = Box2D.Collision.Shapes.b2MassData,
			 b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
			 b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
			 b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
			 b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
			 b2Joint = Box2D.Dynamics.Joints.b2Joint;


var world;
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;

var _coulombConstant = 9;
var _defaultCharge = 1000; //, _defaultSize.Width)/2.0;

var forceMultiplier = 100;
var prefLength = 100;

function createWorld() {
	var gravity = new b2Vec2(0, 0);
	var doSleep = true;
	var world = new b2World(gravity, doSleep);
	createGround(world);
	createDemo(world);

	return world;
}

function createGround(world) {
	var groundSd = createBox(world, -500, 640, 2000, 50, true);
	var groundRd = createBox(world, 850, 0, 5, 900, true);
	var groundRd = createBox(world, 0, 0, 5, 900, true);
	var groundUd = createBox(world, 0, 0, 900, 5, true);
	
	return groundSd;
}

function createBall(world, x, y, radius, fixed) {

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;

	bodyDef.position.x = x;
	bodyDef.position.y = y;

	fixDef.shape = new b2CircleShape( radius );

	var body = world.CreateBody(bodyDef);
	//create ground
	if (fixed)
	    body.SetType(b2Body.b2_staticBody);
	else
	    body.SetType(b2Body.b2_dynamicBody);

	var fixture = body.CreateFixture(fixDef);
	fixture.SetFriction(0.5);

	if (!fixed) fixture.SetDensity(1.0);
	return body;
}

function createBox(world, x, y, width, height, fixed) {
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.99
	fixDef.restitution = 0.96;

	//create ground
	var bodyDef = new b2BodyDef;

	bodyDef.position.x = x;
	bodyDef.position.y = y;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width, height);
	var body = world.CreateBody(bodyDef);
	//create ground
	if (fixed)
	    body.SetType(b2Body.b2_staticBody);
	else
	    body.SetType(b2Body.b2_dynamicBody);

	var fixture = body.CreateFixture(fixDef);

	fixture.SetFriction(20.99);

	if (!fixed) fixture.SetDensity( 1.0 );
	return body;
}


function update() {
	try {
			world.Step(
					   1 / 20   //frame-rate
					, 10);       //velocity iterations
					//, 10       //position iterations
				 //);
		world.DrawDebugData();
		world.ClearForces();
		RepelForce();
	}
catch (e) {
	$("error").html(e.Description);
	}
}


function reset_click() {
	forceMultiplier = Number($("#forceMultiplier").attr("value"));
	prefLength = Number($("#length").attr("value"));
	_defaultCharge = Number($("#chargeMass").attr("value"));
	//setup();
	for (var joint = world.GetJointList(); joint; joint = joint.m_next) {
	    joint.SetLength(prefLength);
	}

}


function setProperties() {
    $("#forceMultiplier").attr("value",String(forceMultiplier));
    $("#length").attr("value", String(prefLength));
    $("#chargeMass").attr("value", String(_defaultCharge));
}

function CoulombRepulsion(distance)
{
	var chargeProduct = _defaultCharge * _defaultCharge; // a.Charge * b.Charge;
	return (_coulombConstant * chargeProduct) / (distance*distance);
}



function RepelForce() {
	for (var b = world.m_bodyList; b; b = b.m_next) {
		var netForce = new b2Vec2(0, 0);
		if (b.GetType() != b2Body.b2_dynamicBody) {
		    continue;
		}

		for (var other = world.m_bodyList; other; other = other.m_next) {
		    if (b == other) continue;
		    if (other.GetType() != b2Body.b2_dynamicBody) {
		        continue;
		    }

			var distanceVec = b.GetWorldCenter().Copy();
            distanceVec.Subtract( other.GetWorldCenter());
			var distance = distanceVec.Length();
			if (distance == 0) continue;
			var repuls = CoulombRepulsion(distance);
			var unit = b.GetWorldCenter().Copy();
			unit.Subtract(other.GetWorldCenter());
			unit.Normalize(); 
			unit.Multiply(repuls);
			netForce.Add(unit);
		}
		netForce.Multiply(forceMultiplier);
		b.ApplyForce(netForce, b.GetWorldCenter());
	}
}

function createChildren(world, center, term) 
{
	for (var n = 0; n < 15; n++) {
	     var box = createBox(
                world,
                200 + Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100) + 250, 12, 8, false);
	     box.isGraph = true;
	     box.SetFixedRotation(true);
	 }
	 var boxList = [];
     for (var boxa = world.GetBodyList(); boxa; boxa = boxa.GetNext()) {
         if (boxa.GetType() != b2Body.b2_dynamicBody) {
             continue;
         }
         boxList.push(boxa);
     }

     for (var n = 0; n < 2; n++)
        for(var boxa=world.GetBodyList(); boxa; boxa=boxa.GetNext()) {
            if (boxa.GetType() != b2Body.b2_dynamicBody) {
                continue;
            }
            var boxb;
            do {
                boxb = boxList[Math.floor(Math.random() * boxList.length)];
            } while ((boxa === boxb)|| (!boxb));
		    var jointDef = new b2DistanceJointDef();
		    jointDef.Initialize(boxa, boxb, boxa.GetWorldCenter(), boxb.GetWorldCenter());
		    var joint = world.CreateJoint(jointDef);
		    joint.SetLength(prefLength);
		    joint.SetFrequency(6);
		    joint.SetDampingRatio(1);
        }
}



function createDemo(world) {
    var center = createBall(world, 300, 400, 5, false);
    center.isGraph = true;
	createChildren(world, center,2);
    //		jointDef.body1 = b3;
    //		jointDef.anchorPoint1.Set(350, 500);
    //		jointDef.body2 = body2;
    //		jointDef.frequencyHz = 4.0;
    //		jointDef.dampingRatio = 0.5;
    //		world.CreateJoint(jointDef);

	//	demos.top.createPoly(world, 100, 100, [[0, 0], [10, 30], [-10, 30]], true);
	//	demos.top.createPoly(world, 150, 150, [[0, 0], [10, 30], [-10, 30]], true);
	//	var pendulum = createBox(world, 150, 100, 20, 20, false);
	//	var jointDef = new b2RevoluteJointDef();
	//	jointDef.body1 = pendulum;
	//	jointDef.body2 = world.GetGroundBody();
	//	jointDef.anchorPoint = pendulum.GetPosition();
	//	world.CreateJoint(jointDef);

	//	var seesaw = demos.top.createPoly(world, 300, 200, [[0, 0], [100, 30], [-100, 30]]);
	//	jointDef.body1 = seesaw;
	//	jointDef.anchorPoint = seesaw.GetPosition();
	//	world.CreateJoint(jointDef);
}


function setup() {
    setProperties();
	var canvasElm = $("#canvas")[0];
	ctx = canvasElm.getContext('2d');
	try {
		canvasWidth = parseInt(canvasElm.width);
		canvasHeight = parseInt(canvasElm.height);
		canvasTop = parseInt(canvasElm.style.top) || 0;
		canvasLeft = parseInt(canvasElm.style.left) || 0;
		world = createWorld();

		//setup debug draw
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(ctx);
		debugDraw.SetDrawScale(1.0);
		debugDraw.SetLineThickness(5.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);

		window.setInterval(update, 1000 / 20);
		$("#error").html( "Ready...");
	}
	catch (e) {
		$("#error").html(e.description);
	}
}

