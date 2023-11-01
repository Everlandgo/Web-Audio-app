let pausebtn 
let playbtn 
let stopbtn
let restartbtn
let endbtn
let loopbtn
let recordbtn

function setup(){
    createCanvas(800, 600);
    background('white');

    pausebtn=createbtn('Pause',20,20); 
    playbtn=createbtn('Play',120,20); 
    stopbtn=createbtn('Stop',220,20); 
    restartbtn=createbtn('Skip to start',320,20); 
    endbtn=createbtn('Skip to end',420,20); 
    loopbtn=createbtn('Loop',520,20); 
    recordbtn=createbtn('record',620,20); 
    

}
function mouseClicked(){
  

}

function draw(){


}

function createbtn(text,X,Y){
    var button =createButton(text); 
    button.size(80,50);
    button.position(X, Y);

}

