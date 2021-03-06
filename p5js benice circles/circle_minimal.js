function Circle (r, p, s) { // radius, center point and speed
	this.radius = r; 	// radius decreases by half each children 
	this.children = undefined; // circle has no children by default
	this.middle = p; 	// Center of the circle
	this.point = createVector(0, 0);
						// The point where the child-Circle is touching the parent
						
	this.angle = -PI/2; // Starting angle is on top
	this.speed = s;
	
	this.rotate = function () {
		this.angle += this.speed;
		var x = this.middle.x + this.radius * cos(this.angle); // polar to cartesian
		var y = this.middle.y + this.radius * sin(this.angle);
		this.point = createVector(x,y); // evaluate new touching point
		
		if (this.children !== undefined) { // if circle has child, update middle point of child
			this.children.middle = this.point;
			this.children.middle.x += this.children.radius * cos(this.angle);
			this.children.middle.y += this.children.radius * sin(this.angle);
			this.children.rotate(); // recursion until the circles have no children left
		}
	}
	this.addChildren = function() { // add a new children
		if (this.children !== undefined) { // if it already has one, recurse
			this.children.addChildren();
		} else { // otherwise create new with half the size, and a speed of k times parent speed
			this.children = new Circle(this.radius/2, createVector(this.point.x, this.point.y-this.radius), k*this.speed);
		}
	}
	
	this.show = function () {
		if (this.children !== undefined) { // recursion to show all childran
			this.children.show();
		} else { // if no children, last circle should draw the path/line
			stroke(255,0,255);
			strokeWeight(4);
			point(this.point.x, this.point.y);
			path.push(this.point);
		}
		// show circles
		stroke(255);
		strokeWeight(1);
		noFill();
		ellipse(this.middle.x, this.middle.y, this.radius*2, this.radius*2);
	}
}