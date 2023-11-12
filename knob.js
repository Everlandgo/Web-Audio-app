class Knob {
  //x axis, y axis, r (radius), angle,value(initial point), minval,maxval,name - knob name//
    constructor(x, y, r, angle,value, minval,maxval,name) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.angle = angle;
      this.value=value;
      this.isdragging = false;
      this.fill=255;
      this.minval=minval;
      this.maxval=maxval;
      this.name=name;
      this.angle = map(this.value, this.minval, this.maxval, 0, TWO_PI);
      this.isdragging = false;
      this.fill = 255;

    }
  
    drawknob() {
        push(); 
        fill(this.fill);
        strokeWeight(1);
        translate(this.x, this.y);
        rotate(this.angle);
        drawingContext.shadowOffsetX = 3;
        drawingContext.shadowOffsetY = -1;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = '#8c8c89';    
        circle(0, 0, this.r * 2);
        line(0, 0, this.r, 0);
        pop(); 

    }
  
    updateknob() {
      if (this.isdragging) {
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        this.angle=atan2(dy, dx);
        this.fill = color(244, 253, 175);

        if (this.angle < 0) {
            this.angle += TWO_PI; 
          }
        this.value = map(this.angle, 0, TWO_PI, this.minval, this.maxval);       
      }  
      }

  
    knobclicked() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.r) {
          this.isdragging = true;  
        } else {
          this.isdragging = false;
          return false;
        }
      }
      

    knobReleased() {
      this.isdragging = false;
      this.fill=255;

    }

  }
  