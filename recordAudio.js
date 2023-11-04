// buttons 
let pausebtn; 
let playbtn;
let stopbtn;
let restartbtn;
let loopbtn;
let recordbtn;
let reversebtn;

//sliders
let volumeslider
let drywetslider1;
let outputslider1;
let drywetslider2;
let outputslider2;
let drywetslider3;
let outputslider3;
let drywetslider4;
let outputslider4;

//knob 
let frequencyknob;
let resonanceknob; 
let attackknob; 
let kneeknob; 
let releaseknob;
let ratioknob;
let thresholdknob;
let reverbknob;
let delayknob;
let distortionknob;
let oversampleknob;


let islooping = false;
let isreverse = false;

function setup(){
let canvas = createCanvas(800, 800);
let x = (windowWidth - width) / 2;
let y = (windowHeight - height) / 2;
canvas.position(x, y);
background('lightblue');

// function to draw background boxes and its lablels
    drawingframe();
// function to write all the lables of the keys
    writelabels();
// function to draw buttons 
    drawbuttons();
//function to draw sliders
    drawslider();
//function to draw knob 
    drawknob();

}
function preload(){
    myaudiofile=loadSound('sound/house_lo.mp3');
}

function draw(){

    myaudiofile.setVolume(volumeslider.value());
    
    if(!myaudiofile.isPlaying()){
        playbtn.style('background-color', 'white');
    }

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

function drawbuttons(){
    
    pausebtn=createbtn('Pause',340,40,pausefunction); 
    playbtn=createbtn('Play',420,40,playfunction);
    stopbtn=createbtn('Stop',500,40,stopfunction);
    restartbtn=createbtn('Skip to start',580,40,restartfunction); 
    endbtn=createbtn('Skip to end',660,40,toendfunction); 
    loopbtn=createbtn('Loop',740,40,loopfunction); 
    recordbtn=createbtn('record',820,40,recordfunction);
    reversebtn=createbtn('Reverse',360,590,reversefunction); 
}

function drawslider(){

    volumeslider= createslider(0, 20, 2,1,875,225);

    drywetslider1= createslider(0, 10, 2,0.1,340,330);
    outputslider1= createslider(0, 10, 2,0.1,425,330);

    drywetslider2= createslider(0, 10, 2,0.1,580,430);
    outputslider2= createslider(0, 10, 2,0.1,680,430);

    drywetslider3= createslider(0, 10, 2,0.1,340,720);
    outputslider3= createslider(0, 10, 2,0.1,425,720);

    drywetslider4= createslider(0, 10, 2,0.1,560,720);
    outputslider4= createslider(0, 10, 2,0.1,660,720);
}

function drawknob( ) {

    frequencyknob=createknob(75,210,25,0);
    resonanceknob=createknob(80,0,25,0);
    
    attackknob=createknob(120,0,25,0);
    kneeknob=createknob(90,0,25,0);
    releaseknob=createknob(90,0,25,0);
    ratioknob==createknob(-140,90,25,0);
    thresholdknob==createknob(100,0,25,0);

    reverbknob=createknob(-340,240,25,0);
    delayknob=createknob(80,0,25,0);

    distortionknob=createknob(140,65,25,0);
    oversampleknob=createknob(100,0,25,0);
}

function writelabels(){
    textSize(12);
    fill('black');
    textFont('arial');

//low-pass filter slider headings
    text('dry/wet',55,270);
    text('output \n level',140,260);

//dynamic compressor slider headings
    text('dry/wet',290,370);
    text('output \n level',395,360);

//waveshape filter slider headings
    text('dry/wet',270,660);
    text('output \n level',375,650);

//reverb distortion slider headings
    text('dry/wet',50,660);
    text('output \n level',140,650);

    text('  cutoff \nfreqency',55,160);
    text('resonance',125,175);

    text('attack',260,180);
    text('knee',350,180);
    text('release',440,180);
    text('ratio',300,270);
    text('threshold',390,270);

    text(' reverb\nduration',55,490);
    text('decay\n rate',140,490);

    text('distortion\n amount',270,560);
    text('oversample',360,570);
    
}

function createbtn(text,X,Y,callfunction){
    let button =createButton(text); 
    button.size(70,50);
    button.position(X, Y);
    button.style('background-color', 'white');
    button.mouseClicked(callfunction);
    return button;
}

function createslider(minval, maxval, position, range,X,Y){
    let slider = createSlider(minval, maxval, position, range);
    slider.position(X,Y);
    slider.style('transform', 'rotate(90deg)');
    slider.addClass('mySliders');
    return slider;
}

function createknob(x,y,r,angle){
    fill(255);
    strokeWeight(1);
    translate(x, y);
    rotate(angle);
    circle(0, 0, r * 2);
    line(0, 0, r, 0);

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
        myaudiofile.jump(0);
        print('restart button clicked');
  }

  function toendfunction(){
    let dur=myaudiofile.duration();
    myaudiofile.jump(dur-0.1);
    print('end button clicked');

  }

  function loopfunction() {
    if (!islooping) {
        myaudiofile.setLoop(true); 
        loopbtn.style('background-color', 'lightgreen');
        islooping = true;
    } else {
        myaudiofile.setLoop(false); 
        loopbtn.style('background-color', 'white');
        islooping = false;
    }

  }

  function recordfunction(){

  }

  function reversefunction(){
    if(!isreverse){
        myaudiofile.reverseBuffer(true);
        print(myaudiofile.duration());
        reversebtn.style('background-color', 'lightyellow');
        isreverse=true;
    }else{
        myaudiofile.reverseBuffer(false);
        reversebtn.style('background-color', 'white');
        isreverse=false;
    }

  }

