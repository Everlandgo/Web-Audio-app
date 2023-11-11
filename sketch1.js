// buttons
let pausebtn;
let playbtn;
let stopbtn;
let restartbtn;
let loopbtn;
let recordbtn;
let reversebtn;

//sliders
let volumeslider;
let LP_drywetslider;
let LP_outputslider;
let DY_drywetslider;
let DY_outputslider;
let RE_drywetslider;
let RE_outputslider;
let WAV_drywetslider;
let WAV_outputslider;

//knob
let knobs = [];

let frequencyknob = [];
let resonanceknob = [];
let attackknob = [];
let kneeknob = [];
let releaseknob = [];
let ratioknob = [];
let thresholdknob = [];
let reverbtimeknob = [];
let decayknob = [];
let distortionknob = [];
let oversampleknob = [];

let mic;
let recorder;
let soundFile;
let state = 0;
let fft;
let offsetangle;
let cutofffre;

let islooping = false;
let isreverse = false;

let dynamicCompressor;
let reverbeffect;
let lowpassfilter;
let distortion;
let mastervolume;

function preload() {
  soundFormats("mp3", "wav");
  myaudiofile = loadSound("sound/house_lo.mp3");
}

function setupfilters() {
  mic = new p5.AudioIn();
  mic.start();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  soundFile = new p5.SoundFile();
  lowpassfilter = new p5.LowPass();
  distortioneffect = new p5.Distortion();
  compressoreffect = new p5.Compressor();
  reverbeffect = new p5.Reverb();
  mastervolume = new p5.Gain();
  Inputfft = new p5.FFT();
  Outputfft = new p5.FFT();

  myaudiofile.disconnect();
  lowpassfilter.disconnect();
  distortioneffect.disconnect();
  compressoreffect.disconnect();
  reverbeffect.disconnect();
  mastervolume.disconnect();

  Inputfft.setInput(myaudiofile);

  myaudiofile.connect(lowpassfilter);
  lowpassfilter.connect(distortioneffect);
  distortioneffect.connect(compressoreffect);
  compressoreffect.connect(reverbeffect);
  reverbeffect.connect(mastervolume);
  mastervolume.connect();

  Outputfft.setInput(mastervolume);
}

function setup() {
  let canvas = createCanvas(800, 800);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
  setupfilters();
  drawknobs();
  drawbuttons();
  drawslider();
}

function draw() {
  clear();
  background("lightblue");
  drawingframe();
  writelabels();
  for (let knob of knobs) {
    knob.drawknob();
    fill(0);
    knob.updateknob();
    textSize(11);
    text(knob.value.toFixed(1), knob.x, knob.y + 40);
  }

  drawspectrum();

  if(myaudiofile.currentTime().toFixed(2) == myaudiofile.duration().toFixed(2)){
  playbtn.style("background-color", "white");
  }
}


function drawingframe() {
  fill(255);
  rect(20, 100, 190, 300);
  rect(235, 100, 270, 400);
  rect(535, 100, 150, 200);
  rect(20, 420, 190, 370);
  rect(235, 510, 230, 280);
  rect(480, 510, 310, 280);

  fill(0);
  textSize(20);
  textFont("Times new roman");
  text("Low-pass filter", 60, 130);
  text("Dynamic compressor", 290, 130);
  text("Master \nvolume", 580, 130);
  text("Reverb", 80, 450);
  text("Waveshaper distortion", 260, 540);
  text("spectrum in ", 680, 530);
  text("spectrum out", 680, 670);
}

function drawspectrum(){
  push();
  let spectrumIN = Inputfft.analyze();
  noStroke();
  fill(255, 0, 255);

  let boxX = 490;
  let boxY = 520;
  let boxwidth = 1300;
  let boxheight= 130;
  
  for (let i = 0; i < spectrumIN.length; i++) {
    let x = map(i, 0, spectrumIN.length, boxX, boxX + boxwidth);
    let h = -boxheight + map(spectrumIN[i], 0, 255, boxheight, 0);
    rect(x, 520 + boxheight, boxwidth / spectrumIN.length, h);
  }


  let spectrumOUT= Outputfft.analyze();
  noStroke();
  fill(0);  
  for (let i = 0; i < spectrumOUT.length; i++) {
    let x = map(i, 0, spectrumOUT.length, boxX, boxX + boxwidth);
    let h = -boxheight + map(spectrumOUT[i], 0, 255, boxheight, 0);
    rect(x, boxY+130 + boxheight, boxwidth / spectrumOUT.length, h);
  }
  pop();


}

function drawbuttons() {
  pausebtn = createbtn("Pause", 340, 40, pausefunction);
  playbtn = createbtn("Play", 420, 40, playfunction);
  stopbtn = createbtn("Stop", 500, 40, stopfunction);
  restartbtn = createbtn("Skip to start", 580, 40, restartfunction);
  endbtn = createbtn("Skip to end", 660, 40, toendfunction);
  loopbtn = createbtn("Loop", 740, 40, loopfunction);
  recordbtn = createbtn("record", 820, 40, recordfunction);
  reversebtn = createbtn("Reverse", 360, 590, reversefunction);
}

function drawslider() {
  volumeslider = createslider(0, 20, 2, 1, 875, 225,'volumeslider');
  LP_drywetslider = createslider(0, 1, 0, 0.1, 340, 330,'LP_drywetslider');
  LP_outputslider = createslider(0, 1, 0, 0.1, 425, 330,'LP_outputslider');
  DY_drywetslider = createslider(0, 10, 0, 0.1, 580, 430,'DY_drywetslider');
  DY_outputslider = createslider(0, 10, 0, 0.1, 680, 430,'DY_outputslider');
  RE_drywetslider = createslider(0, 1, 0, 0.1, 340, 720,'RE_drywetslider');
  RE_outputslider = createslider(0, 1, 0, 0.1, 425, 720,'RE_outputslider');
  WAV_drywetslider = createslider(0, 10, 2, 0.1, 560, 730,'WAV_drywetslider');
  WAV_outputslider = createslider(0, 10, 2, 0.1, 660, 730,'WAV_outputslider');
}

function drawknobs() {
  frequencyknob = new Knob(75, 210, 25, 0, 10, 10, 22050, "frequencyknob");
  knobs.push(frequencyknob);
  resonanceknob = new Knob(155, 210, 25, 0, 0.001, 0.001, 1000, "resonanceknob");
  knobs.push(resonanceknob);

  attackknob = new Knob(275, 210, 25, 0, 0, 0, 1, "attackknob");
  knobs.push(attackknob);
  kneeknob = new Knob(365, 210, 25, 0, 0, 0, 40, "kneeknob");
  knobs.push(kneeknob);
  releaseknob = new Knob(455, 210, 25, 0, 0, 0, 1, "releaseknob");
  knobs.push(releaseknob);
  ratioknob = new Knob(420, 300, 25, 0, 0, 0, 1, "ratioknob");
  knobs.push(ratioknob);
  thresholdknob = new Knob(310, 300, 25, 0, 0, 0, 1, "thresholdknob");
  knobs.push(thresholdknob);

  reverbtimeknob = new Knob(75, 530, 25, 0, 0, 0, 5, "reverbtimeknob");
  knobs.push(reverbtimeknob);
  decayknob = new Knob(155, 530, 25, 0, 0, 0, 5, "decayknob");
  knobs.push(decayknob);

  distortionknob = new Knob(290, 605, 25, 0,0, 0, 1,'distortionknob');
  knobs.push(distortionknob);
  oversampleknob = new Knob(390, 605, 25, 0,0, 0, 1,'oversampleknob');
  knobs.push(oversampleknob);
}

function writelabels() {
  textSize(12);
  fill("black");
  textFont("arial");
  text("dry/wet", 55, 270);
  text("output \n level", 140, 260);
  text("dry/wet", 290, 370);
  text("output \n level", 395, 360);
  text("dry/wet", 270, 670);
  text("output \n level", 375, 660);
  text("dry/wet", 50, 660);
  text("output \n level", 140, 650);
  text("  cutoff \nfreqency", 55, 160);
  text("resonance", 125, 175);
  text("attack", 260, 180);
  text("knee", 350, 180);
  text("release", 440, 180);
  text("ratio", 300, 270);
  text("threshold", 390, 270);
  text(" reverb\nduration", 55, 480);
  text("decay\n rate", 140, 480);
  text("distortion\n amount", 270, 560);
  text("oversample", 360, 570);

  text(volumeslider.value(), 630, 230);
  text(LP_drywetslider.value(), 90, 330);
  text(LP_outputslider.value(), 175, 330);
  text(DY_drywetslider.value(), 330, 430);
  text(DY_outputslider.value(), 430, 430);
  text(RE_drywetslider.value(), 90, 720);
  text(RE_outputslider.value(), 175, 720);
  text(WAV_drywetslider.value(), 310, 730);
  text(WAV_outputslider.value(), 410, 730);
}

function createbtn(text, X, Y, callfunction) {
  let button = createButton(text);
  button.size(70, 50);
  button.position(X, Y);
  button.style("background-color", "white");
  button.mouseClicked(callfunction);
  return button;
}

function createslider(minval, maxval, position, range, X, Y,sliderName) {
  push();
  drawingContext.shadowOffsetX = 3;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "#8c8c89";
  circle(0, 0, this.r * 2);
  let slider = createSlider(minval, maxval, position, range);
  pop();
  slider.position(X, Y);
  slider.style("transform", "rotate(90deg)");
  slider.addClass("mySliders");
  slider.mouseClicked(() => changesliderval(sliderName));

  return slider;
}

function pausefunction() {
  if (myaudiofile.isPlaying()) {
    myaudiofile.pause();
    stopbtn.style("background-color", "white");
    playbtn.style("background-color", "white");
    pausebtn.style("background-color", "blue");
    print("Pause button clicked");
  }
  if (soundFile.isPlaying()) {
    soundFile.pause();
  }
}

function playfunction() {
  if (!myaudiofile.isPlaying()) {
    myaudiofile.play();
    playbtn.style("background-color", "green");
    stopbtn.style("background-color", "white");
    pausebtn.style("background-color", "white");
    print("play button clicked");
  }
}

function stopfunction() {
  if (myaudiofile.isPlaying()) {
    myaudiofile.stop();
    stopbtn.style("background-color", "red");
    playbtn.style("background-color", "white");
    pausebtn.style("background-color", "white");
    myaudiofile.jump(0);
    print("stop button clicked");
  }
  if (soundFile.isPlaying()) {
    soundFile.stop();
  }
}

function restartfunction() {
  myaudiofile.jump(0);
  print("restart button clicked");
}

function toendfunction() {
  let dur = myaudiofile.duration();
  myaudiofile.jump(dur - 0.1);
  print("end button clicked");
}

function loopfunction() {
  if (!islooping) {
    myaudiofile.setLoop(true);
    loopbtn.style("background-color", "lightgreen");
    islooping = true;
  } else {
    myaudiofile.setLoop(false);
    loopbtn.style("background-color", "white");
    islooping = false;
  }
}

function recordfunction() {
  console.log(state);
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
  if (state === 0 && mic.enabled) {
    recordbtn.size(100, 50);
    recordbtn.style("background-color", "#C3EB78");
    recordbtn.html("Recording...");
    recorder.record(soundFile);
    state++;
  } else if (state === 1) {
    print("record stoped");
    recorder.stop();
    recordbtn.html("Finished\nrecording Click to download");
    recordbtn.size(130, 50);
    recordbtn.style("background-color", "#56cbf9");
    state++;
  } else if (state === 2) {
    recordbtn.size(70, 50);
    recordbtn.html("Record");
    recordbtn.style("background-color", "white");
    soundFile.play();
    save(soundFile, "output.wav");
    state = 0;
  }
}
function reversefunction() {
  if (!isreverse) {
    myaudiofile.reverseBuffer(true);
    print(myaudiofile.duration());
    reversebtn.style("background-color", "lightyellow");
    isreverse = true;
  } else {
    myaudiofile.reverseBuffer(false);
    reversebtn.style("background-color", "white");
    isreverse = false;
  }
}

function changesliderval(sliderName) {
  print("changesliderval");
  if(sliderName=='volumeslider'){
    print('volumeslider.value()',volumeslider.value());
    mastervolume.amp(volumeslider.value());
  }
  else if (sliderName === 'LP_drywetslider' || sliderName === 'LP_outputslider') {
    lowpassfilter.Effect(myaudiofile,1,LP_drywetslider.value(),LP_outputslider.value());
  } else if (sliderName === 'DY_drywetslider' || sliderName === 'DY_outputslider') {
    compressoreffect.setDryWet(DY_drywetslider.value());
    compressoreffect.setOutput(DY_outputslider.value());
  } else if (sliderName === 'RE_drywetslider' || sliderName === 'RE_outputslider') {
    reverbeffect.drywet(RE_drywetslider.value());
    reverbeffect.output(RE_outputslider.value());
  } else if (sliderName === 'WAV_drywetslider' || sliderName === 'WAV_outputslider') {
    distortioneffect.setDryWet(WAV_drywetslider.value());
    distortioneffect.setOutput(WAV_outputslider.value());
  }
}

function mousePressed() {
  for (let knob of knobs) {
    knob.knobclicked();
    if (knob.isdragging) {
      knob.updateknob();
      print("selected knob", knob);
      if (knob.name == "frequencyknob" || knob.name =="resonanceknob") {
        lowpassfilter.set(frequencyknob.value, resonanceknob.value);
      } else if (knob.name == "reverbtimeknob" || knob.name == "decayknob") {
        reverbeffect.process(myaudiofile, reverbtimeknob.value, decayknob.value, false);
      } else if (
        knob.name == "attackknob" ||
        knob.name == "kneeknob" ||
        knob.name == "releaseknob" ||
        knob.name == "ratioknob" ||
        knob.name == "thresholdknob"
      ) {
        setcompressor.attack(
          attackknob.value,
          kneeknob.value,
          ratioknob.value,
          thresholdknob.value,
          releaseknob.value
        );
      } else if (knob.name == "distortionknob" || knob.name == "oversampleknob") {
        distortioneffect.set(distortionknob.value, oversampleknob.value);
      }
    }
  }
}

function mouseReleased() {
  for (let knob of knobs) {
    knob.knobReleased();
  }
}
