//function step(cnt) {
//	var stepping = false;
//	var timeStep = 1.0/60;
//	var iteration = 1;
//	RepelForce();

//	world.Step(timeStep, iteration);
////	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//	world.DrawDebugData();

//	setTimeout('step(' + (cnt || 0) + ')', 10);
//}


//				foreach (var node in nodesCollectionCache)
//				{
//					if (_terminate) break;
//					if (node != _nodePositionOverride)
//					{
//						Point netForce = new Point(0, 0); // running sum of total force on this particular node
//						//  for each other node
//						foreach (var otherNode in nodesCollectionCache)
//						{
//							if (otherNode != node)
//							{
//								//net-force := net-force + Coulomb_repulsion( this_node, other_node )
//								// increment net-force by the ColumbRepulsion
//								if (!newPositions.ContainsKey(otherNode)) newPositions[otherNode] = new Point(otherNode.X, otherNode.Y);
//								// get direction
//								Point unitVector = newPositions[node].Subtract(newPositions[otherNode]).GetUnitVector();
//								var cr = CoulombRepulsion(node, otherNode, newPositions[node], newPositions[otherNode]);
//								if (double.IsNaN(cr)) cr=double.Epsilon; 
//								netForce = netForce.Offset(unitVector.Multiply(cr));
//								if (double.IsInfinity(netForce.X)) System.Diagnostics.Debug.Assert(false);
//							}
//						}
//						// limit the net force to 100 (vector)
//						if (netForce.GetLength() > 100) netForce = netForce.GetUnitVector().Multiply(100.0);

//						//next node
//						//for each spring connected to this node
//						foreach (var edge in edgesCollectionCache.Where(e => object.ReferenceEquals(e.Source, node)))
//						{
//							//net-force := net-force + Hooke_attraction( this_node, spring )
//							Point unitVector = newPositions[node].Subtract(newPositions[edge.Target]).GetUnitVector();
//							netForce = netForce.Offset(unitVector.Multiply(HookeAttraction(node, edge, newPositions[node], newPositions[edge.Source], newPositions[edge.Target])));
//						}
//						//next spring
//						// without damping, it moves forever
//						if (!_velocities.ContainsKey(node)) _velocities[node] = new Point(0,0);
//						_velocities[node] = (_velocities[node].Offset(netForce.Multiply(_computeTimeStep))).Multiply(_damping);
//						newPositions[node] = newPositions[node].Offset(_velocities[node].Multiply(_computeTimeStep));
//					}

//}



//function drawWorld(world, context) {
//    for (var j = world.m_jointList; j; j = j.m_next) {
//        drawJoint(j, context);
//    }
//    for (var b = world.m_bodyList; b; b = b.m_next) {
//        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
//            drawShape(s, context);
//        }
//    }
//}
//function drawJoint(joint, context) {
//    var b1 = joint.GetBodyA();
//    var b2 = joint.GetBodyB();
//    var x1 = b1.GetPosition();
//    var x2 = b2.GetPosition();
//    var p1 = joint.GetAnchorA();
//    var p2 = joint.GetAnchorB();
//    context.strokeStyle = '#00eeee';
//    context.beginPath();
//    switch (joint.GetType()) {
//        case b2Joint.e_distanceJoint:
//            context.moveTo(p1.x, p1.y);
//            context.lineTo(p2.x, p2.y);
//            break;

//        case b2Joint.e_pulleyJoint:
//            // TODO
//            break;

//        default:
//            if (b1 == world.GetGroundBody()) {
//                context.moveTo(p1.x, p1.y);
//                context.lineTo(x2.x, x2.y);
//            }
//            else if (b2 == world.GetGroundBody()) {
//                context.moveTo(p1.x, p1.y);
//                context.lineTo(x1.x, x1.y);
//            }
//            else {
//                context.moveTo(x1.x, x1.y);
//                context.lineTo(p1.x, p1.y);
//                context.lineTo(x2.x, x2.y);
//                context.lineTo(p2.x, p2.y);
//            }
//            break;
//    }
//    context.stroke();
//}
//function drawShape(shape, context) {
//    context.strokeStyle = '#ffffff';
//    context.beginPath();
//    switch (shape.GetType()) {
//        case b2Shape.e_circleShape:
//            {
//                var circle = shape;
//                var pos = circle.GetPosition();
//                var r = circle.GetRadius();
//                var segments = 16.0;
//                var theta = 0.0;
//                var dtheta = 2.0 * Math.PI / segments;
//                // draw circle

//                context.moveTo(pos.x + r, pos.y);
//                for (var i = 0; i < segments; i++) {
//                    var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
//                    var v = b2Math.AddVV(pos, d);
//                    context.lineTo(v.x, v.y);
//                    theta += dtheta;
//                }
//                context.lineTo(pos.x + r, pos.y);

//                // draw radius
//                context.moveTo(pos.x, pos.y);
//                var ax = circle.R.col1;
//                var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
//                context.lineTo(pos2.x, pos2.y);
//            }
//            break;
//        case b2Shape.e_polyShape:
//            {
//                var poly = shape;
//                var tV = b2Math.AddVV(poly.GetPosition(), b2Math.b2MulMV(poly.R, poly.m_vertices[0]));
//                context.moveTo(tV.x, tV.y);
//                for (var i = 0; i < poly.m_vertexCount; i++) {
//                    var v = b2Math.AddVV(poly.GetPosition(), b2Math.b2MulMV(poly.R, poly.m_vertices[i]));
//                    context.lineTo(v.x, v.y);
//                }
//                context.lineTo(tV.x, tV.y);
//            }
//            break;
//    }
//    context.stroke();
//}







//function createBallFixed(world, x, y, rad, fixed) {
//	var ballSd = new b2CircleDef();
//	if (!fixed) ballSd.density = 1.0;
//	ballSd.radius = rad || 10;
//	ballSd.restitution = 0.2;
//	var ballBd = new b2BodyDef();
//	ballBd.AddShape(ballSd);
//	ballBd.position.Set(x, y);
//	return world.CreateBody(ballBd);
//};


//function createPoly (world, x, y, points, fixed) {
//	var polySd = new b2PolyDef();
//	if (!fixed) polySd.density = 1.0;
//	polySd.vertexCount = points.length;
//	for (var i = 0; i < points.length; i++) {
//		polySd.vertices[i].Set(points[i][0], points[i][1]);
//	}
//	var polyBd = new b2BodyDef();
//	polyBd.AddShape(polySd);
//	polyBd.position.Set(x, y);
//	return world.CreateBody(polyBd)
//};
