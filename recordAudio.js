let pausebtn; 
let playbtn; 
let stopbtn; 

function setup(){
    createCanvas(800, 800);



}


function mouseClicked(){
    console.log(state);
    if(getAudioContext().state !== 'running'){
        getAudioContext().resume();
    }
    if(state === 0 && mic.enabled){
        fill('pink');
        textSize(30)
        printtext='Recording';
        backCol='red';
        recorder.record(soundFile);
        state++;
    }
    else if(state === 1){
        backCol='blue';
        printtext='Click to play and download';
        fill(255,255,255);
        recorder.stop();
        state++;
    }
    else if(state === 2){
        backCol='green';
        printtext='click to record';
        fill(255,255,255);
        soundFile.play();
        save(soundFile,'output.wav');
        state=0;
    }

}

function draw() {
    background(220);
  
    fill('pink');
    rect(20, 20, 60, 40);
    fill(0);
    text('Pause', 30, 40); 
  
    fill('pink');
    rect(100, 20, 60, 40);
    fill(0);
    text('Play', 130, 40);
  
    fill('pink');
    rect(180, 20, 60, 40);
    fill(0);
    text('Stop', 210, 40);
  }
  

