class Knob {
    constructor(x, y, r, angle, minval,maxval) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.angle = angle;
      this.isdragging = false;
      this.fill=255;
      this.minval=minval;
      this.maxval=maxval;
    }
  
    drawknob() {
        push(); 
        fill(this.fill);
        strokeWeight(1);
        translate(this.x, this.y);
        rotate(this.angle);
        circle(0, 0, this.r * 2);
        line(0, 0, this.r, 0);
        pop(); 
    }
  
    updateknob() {
      if (this.isdragging) {
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        this.angle = atan2(dy, dx);
        this.fill=color(244, 253, 175);
        
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
  