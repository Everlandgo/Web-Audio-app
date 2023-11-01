let pausebtn; 

function setup(){

//centering the canvas 
var canvas = createCanvas(800, 800);
var x = (windowWidth - width) / 2;
var y = (windowHeight - height) / 2;
canvas.position(x, y);
background('lightblue');

// function to draw background boxes and its labels
    drawingframe();
// function to draw buttons 
    drawingbuttons();

}

function draw(){

}

function drawButtons(){

}

function drawingbuttons(){
    pausebtn=createbtn('Pause',340,40); 
    playbtn=createbtn('Play',420,40); 
    stopbtn=createbtn('Stop',500,40); 
    restartbtn=createbtn('Skip to start',580,40); 
    endbtn=createbtn('Skip to end',660,40); 
    loopbtn=createbtn('Loop',740,40); 
    recordbtn=createbtn('record',820,40); 

}

function createbtn(text,X,Y){
    var button =createButton(text); 
    button.size(70,50);
    button.position(X, Y);
}

function createslider(text,X,Y){
    var slider = createSlider(0, 10, 8,text);
    slider.position(X,Y);
}

function drawingframe(){

    rect(20,100,190,300);
    rect(235,100,270,400);
    rect(535,100,150,200);

    rect(20,420,190,370);
    rect(235,510,230,280);
    rect(490,520,270,270);

    fill('black');
    textSize(20);
    textFont('Times new roman');
    text("Low-pass filter",60,130);
    text("Dynamic compressor",290,130);
    text("Master \nvolume",580,130);
    text("Reverb",80,450);
    text("Waveshaper distortion",260,540);
    text("spectrum in ",650,550);
    text("spectrum out",650,670);

}

