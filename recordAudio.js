let pausebtn 
let playbtn 
let stopbtn
let restartbtn
let endbtn
let loopbtn
let recordbtn

let rect1; 
let rect2; 
let rect3; 
let rect4; 
let rect5; 
let rect6; 


function setup(){
    createCanvas(800, 800);
    background('lightblue');
    drawingbuttons();
    drawbackrectangles();
    
}
function mouseClicked(){
  

}

function draw(){


}

function drawingbuttons(){

    pausebtn=createbtn('Pause',20,20); 
    playbtn=createbtn('Play',105,20); 
    stopbtn=createbtn('Stop',195,20); 
    restartbtn=createbtn('Skip to start',285,20); 
    endbtn=createbtn('Skip to end',375,20); 
    loopbtn=createbtn('Loop',465,20); 
    recordbtn=createbtn('record',555,20); 

}

function drawbackrectangles(){
    rect1=rect(20,90,200,300);
    rect2=rect(245,90,300,400);
    rect2=rect(575,90,150,200);

}

function createbtn(text,X,Y){
    var button =createButton(text); 
    button.size(70,50);
    button.position(X, Y);

}


