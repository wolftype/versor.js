//Using D3
//<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

//maybe import d3 here . . .

var C2SVG = function(id){
	
	var w = 300;
	var h = 300;
	var scale = 1;

	var svg = d3.select(id).append("svg:svg")
		.attr("width", w)
		.attr("height", h);

	var g = svg.append("svg:g")
		.attr("transform", "translate("+(w/2)+", "+(h/2)+") scale("+scale+", "+(-scale)+")");


	function circleRadius(c) {
		return Math.sqrt(Math.abs(C2.Ro.size(c, true)));
	}

	function circleX(c) {
		return C2.Ro.cen(c)[0];
	}

	function circleY(c) {
		return C2.Ro.cen(c)[1];
	}

	// draw a C2 circle in an SVG using D3
	function makeCircle(sel) {
		return sel.attr("r", circleRadius)
			.attr("cx", circleX)
			.attr("cy", circleY);
	}


	var sel = g.selectAll(".elements").data(circles)
		.enter().append("svg:circle")
			.attr("class", "elements");
	d3Circle(sel)

};