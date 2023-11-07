class Knob {
    constructor(x, y, r, angle,knobname) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.angle = angle;
      this.knobname=knobname;
      this.isdragging = false;
    }
  
    drawknob() {
      fill(255);
      strokeWeight(1);
      translate(this.x, this.y);
      rotate(this.angle);
      circle(0, 0, this.r * 2);
      line(0, 0, this.r, 0);
    }
  
    updateknob() {
      if (this.dragging) {
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        this.angle = atan2(dy, dx);
      }
    }
  
    knobclicked() {
      let d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.r) {
        this.dragging = true;
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        this.offsetAngle = atan2(dy, dx) - this.angle;
      }
    }
  
    release() {
      this.isdragging = false;
    }
  }
  