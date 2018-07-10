

function circleGeometry(N) {
	var geometry = new THREE.Geometry();
	for(var i=0; i <= N; ++i) {
		var theta = i*Math.PI*2/N;
		var v = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta));
		geometry.vertices.push(v);
	}
	return geometry;
}

function lineGeometry() {
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0, -1000, 0));
	geometry.vertices.push(new THREE.Vector3(0, 1000, 0));
	return geometry;
}

var CIRCLE_GEOMETRY = circleGeometry(140);
var LINE_GEOMETRY = lineGeometry();


function circleMesh(color) {
	color = color||0x00aaff;
	var geometry = CIRCLE_GEOMETRY;
	var lineMaterial = new THREE.LineBasicMaterial({color: color, linewidth:1});
	var circle = new THREE.Line(geometry, lineMaterial);
	return circle;
}

function lineMesh(color) {
	color = color||0x00aaff;
	var geometry = LINE_GEOMETRY;
	var lineMaterial = new THREE.LineBasicMaterial({color: color, linewidth:1});
	var circle = new THREE.Line(geometry, lineMaterial);
	return circle;
}


applyQuat = function(g, q) {
	g.quaternion.copy(q);
	g.updateMatrix();
	g.updateMatrixWorld();
}

transform = function(g, pos, q, s) {
	g.position = pos;
	g.quaternion = q;
	g.scale = new THREE.Vector3(s, s, s);
	g.updateMatrix();
	g.updateMatrixWorld();
}

transformCircle = function(g, c) {
	var pos = PntToVector3(C3.Ro.loc(c));
	var b = C3.unit(C3.duale(C3.Dr.elem(C3.Fl.dir(C3.Ro.car(c)))));
	var R = Gen_ratio_vec(VEC_Y, b);
	var q = RotToQuat(R);
	var s = C3.Ro.radius(c);
	if(isNaN(s)) {
		if(g.geometry !== LINE_GEOMETRY) {
			var newg = lineMesh();
			newg.material = g.material
			g = newg;
		}
		transform(g, new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), 1);
	}
	else {
		if(g.geometry !== CIRCLE_GEOMETRY) {
			var newg = circleMesh();
			newg.material = g.material
			g = newg;
		}
		transform(g, pos, q, s);
	}
	return g;
}