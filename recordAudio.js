// buttons 
var pausebtn; 
var playbtn;
var stopbtn;
var restartbtn;
var loopbtn;
var recordbtn;

//sliders
var volumeslider
var drywetslider1
var outputslider1

var drywetslider2
var outputslider2

var drywetslider3
var outputslider3


var islooping = false;

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
    drawbuttons();
//function to draw sliders
    drawslider();

}

function preload(){
    myaudiofile=loadSound('sound/house_lo.mp3');
}

function draw(){

}

function drawbuttons(){

    // creating top layer buttons
    pausebtn=createbtn('Pause',340,40); 
    pausebtn.mouseClicked(pausefunction);

    playbtn=createbtn('Play',420,40);
    playbtn.mouseClicked(playfunction);

    stopbtn=createbtn('Stop',500,40);
    stopbtn.mouseClicked(stopfunction);
 
    restartbtn=createbtn('Skip to start',580,40); 
    restartbtn.mouseClicked(restartfunction);

    endbtn=createbtn('Skip to end',660,40); 
    endbtn.mouseClicked(toendfunction);

    loopbtn=createbtn('Loop',740,40); 
    loopbtn.mouseClicked(loopfunction);

    // recordbtn=createbtn('record',820,40); !!!

}

function createbtn(text,X,Y){
    var button =createButton(text); 
    button.size(70,50);
    button.position(X, Y);
    button.style('background-color', 'white');
    return button;
}

function drawslider(){
    volumeslider= createslider(0, 10, 2,0.1,860,225);

    drywetslider1= createslider(0, 10, 2,0.1,325,320);

    outputslider1= createslider(0, 10, 2,0.1,400,320);

    drywetslider2= createslider(0, 10, 2,0.1,580,400);
    outputslider2= createslider(0, 10, 2,0.1,670,400);

    drywetslider3= createslider(0, 10, 2,0.1,325,710);
    outputslider3= createslider(0, 10, 2,0.1,400,710);

    drywetslider4= createslider(0, 10, 2,0.1,560,710);
    outputslider4= createslider(0, 10, 2,0.1,650,710);


    textSize(12);
    fill('black');
    textFont('arial');
//dynmcic compressor slider headings
    text('dry/wet',55,245);
    text('output \n level',130,240);

//low-pass filter slider headings
    text('dry/wet',300,325);
    text('output \n level',400,320);

//reverb filter slider headings
    text('dry/wet',280,640);
    text('output \n level',380,630);

//waveshape distortion slider headings
    text('dry/wet',55,640);
    text('output \n level',130,630);

}

function createslider(minval, maxval, position, range,X,Y){
    var slider = createSlider(minval, maxval, position, range);
    slider.position(X,Y);
    slider.style('transform', 'rotate(90deg)');
    slider.style("background", "red");

    return slider;
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

function pausefunction(){
    if(myaudiofile.isPlaying()){
        myaudiofile.pause();
        stopbtn.style('background-color', 'white');
        playbtn.style('background-color', 'white');
        pausebtn.style('background-color', 'blue');
        print('Pause button clicked');
    }
}
  
  function playfunction() {
    if(!myaudiofile.isPlaying()){
        myaudiofile.play();
        playbtn.style('background-color', 'green');
        stopbtn.style('background-color', 'white');
        pausebtn.style('background-color', 'white');
        print('play button clicked');
    }
    }  
  
  function stopfunction() {
    if(myaudiofile.isPlaying()){
        myaudiofile.stop();
        stopbtn.style('background-color', 'red');
        playbtn.style('background-color', 'white');
        pausebtn.style('background-color', 'white');
        myaudiofile.jump(0);
        print('stop button clicked');
    }
  }

  function restartfunction(){
    if(myaudiofile.isPlaying()){
        myaudiofile.jump(0);
        print('restart button clicked');
    }
  }

  function toendfunction(){
    let dur=myaudiofile.duration();
    myaudiofile.jump(dur-0.1);
    print('end button clicked');

  }

  function loopfunction() {
    // if (!islooping ) {
    //   myaudiofile.isLooping(); 
    //   loopbtn.style('background-color', 'lightgreen');
    //   isLooping = true; 
    // } else {
    //   myaudiofile.noLoop(); 
    //   loopbtn.style('background-color', 'white'); 
    //   isLooping = false; 
    // }
  }