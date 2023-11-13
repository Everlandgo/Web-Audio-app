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
let WAV_drywetslider;
let WAV_outputslider;
let DE_drywetslider;
let DE_outputslider;
let DY_drywetslider;
let DY_outputslider;
let RE_drywetslider;
let RE_outputslider;

//knobs
let knobs = [];

let frequencyknob = [];
let resonanceknob = [];
let attackknob = [];
let kneeknob = [];
let releaseknob = [];
let ratioknob = [];
let thresholdknob = [];
let reverbdurknob = [];
let decayknob = [];
let distortionknob = [];
let oversampleknob = [];
let delaytimeknob = [];


//audio
let mic;
let recorder;
let soundFile;
let state = 0;

// apply differnt filter
let choosefilter;

// effects 
let lowpassfilter;
let distortioneffect;
let compressoreffect;
let reverbeffect;
let mastervolume;

let islooping = false;
let isreverse = false;

function preload() {
  soundFormats("mp3", "wav");
  myaudiofile = loadSound("sound/house_lo.mp3");
}

function setupfilters() {
  mic = new p5.AudioIn();
  mic.start();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  //effects
  soundFile = new p5.SoundFile();
  lowpassfilter = new p5.LowPass();
  distortioneffect = new p5.Distortion();
  delayeffect = new p5.Delay();
  compressoreffect= new p5.Compressor();
  reverbeffect = new p5.Reverb();
  mastervolume = new p5.Gain();
  Inputfft = new p5.FFT();
  Outputfft = new p5.FFT();

  myaudiofile.disconnect();
  lowpassfilter.disconnect();
  distortioneffect.disconnect();
  delayeffect.disconnect();
  compressoreffect.disconnect();
  reverbeffect.disconnect();
  mastervolume.disconnect();

  Inputfft.setInput(myaudiofile);

  myaudiofile.connect(lowpassfilter);
  lowpassfilter.connect(distortioneffect);
  distortioneffect.connect(delayeffect);
  delayeffect.connect(compressoreffect);
  compressoreffect.connect(reverbeffect);
  reverbeffect.connect(mastervolume);
  mastervolume.connect();

  Outputfft.setInput(mastervolume);
}

function setup() {
  let canvas = createCanvas(1200, 800);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);

  setupfilters();
  drawknobs();
  drawbuttons();
  drawslider();
  identifyFilter();
}

function draw() {
  clear();
  background("#e4f0c2");
  drawingframe();
  writelabels();
  choosefilter.changed(filterchanged);

  for (let knob of knobs) {
    knob.drawknob();
    fill(0);
    knob.updateknob();
    textSize(11);
    text(knob.value.toFixed(1), knob.x, knob.y + 40);
  }

  drawspectrum();

  if (myaudiofile.currentTime().toFixed(2) == myaudiofile.duration().toFixed(2)) {
    playbtn.style("background-color", "white");
  }
}

function drawingframe() {
  fill(255);
  rect(20, 100, 190, 300);
  rect(20, 420, 190, 370);
  rect(235, 100, 270, 400);
  rect(235, 510, 270, 280);
  rect(850, 100, 200, 200);
  rect(535, 100, 300, 200);

  //spectrum rectangles
  push();
  fill("#e2e1e8");
  rect(535, 320, 640, 230);
  rect(535, 560, 640, 230);
  pop();

  fill(0);
  textSize(20);
  textFont("Times new roman");
  text("filter", 150, 135);
  text("Dynamic compressor", 290, 130);
  text("Master\nvolume", 925, 130);
  text("Reverb", 80, 450);
  text("Waveshaper distortion", 290, 540);
  text("Delay", 660, 130);
  text("Spectrum In ", 540, 340);
  text("Spectrum Out", 540, 580);
}

function drawbuttons() {
  pausebtn = createbtn("Pause", 150, 30, pausefunction);
  playbtn = createbtn("Play", 275, 30, playfunction);
  stopbtn = createbtn("Stop", 400, 30, stopfunction);
  restartbtn = createbtn("Skip to start", 525, 30, restartfunction);
  endbtn = createbtn("Skip to end", 650, 30, toendfunction);
  loopbtn = createbtn("Loop", 775, 30, loopfunction);
  recordbtn = createbtn("record", 900, 30, recordfunction);
  reversebtn = createbtn("Reverse", 180, 590, reversefunction);
}

function drawslider() {
  volumeslider = createslider(0, 20, 3, 1, 1010, 220, "volumeslider");
  LP_drywetslider = createslider(0, 1, 0.5, 0.1, 140, 330, "LP_drywetslider");
  LP_outputslider = createslider(0, 1, 0.5, 0.1, 225, 330, "LP_outputslider");
  WAV_drywetslider = createslider(0, 1, 0.5, 0.1, 380, 730, "WAV_drywetslider");
  WAV_outputslider = createslider(0, 1, 0.5, 0.1, 480, 730, "WAV_outputslider");
  DE_drywetslider = createslider(0, 1, 0.5, 0.1, 780, 220, "DE_drywetslider");
  DE_outputslider= createslider(0, 1, 0.5, 0.1, 860, 220, "DE_outputslider");
  DY_drywetslider = createslider(0, 1, 0.5, 0.1, 380, 430, "DY_drywetslider");
  DY_outputslider = createslider(0, 1, 0.5, 0.1, 480, 430, "DY_outputslider");
  RE_drywetslider = createslider(0, 1, 0.5, 0.1, 140, 720, "RE_drywetslider");
  RE_outputslider = createslider(0, 1, 1, 0.1, 225, 720, "RE_outputslider");

  lowpassfilter.drywet(LP_drywetslider.value());
  lowpassfilter.amp(LP_outputslider.value());
  distortioneffect.drywet(WAV_drywetslider.value());
  distortioneffect.amp(WAV_outputslider.value());
  delayeffect.drywet(DE_drywetslider.value());
  delayeffect.amp(DE_outputslider.value());
  compressoreffect.drywet(DY_drywetslider.value());
  compressoreffect.amp(DY_outputslider.value());
  reverbeffect.drywet(RE_drywetslider.value());
  reverbeffect.amp(RE_outputslider.value());
  mastervolume.amp(volumeslider.value());

}

function drawknobs() {
  frequencyknob = new Knob(75, 210, 25, 0, 10, 10, 22050, "frequencyknob");
  knobs.push(frequencyknob);
  resonanceknob = new Knob(155, 210, 25, 0, 0.001, 0.001, 1000, "resonanceknob");
  knobs.push(resonanceknob);

  attackknob = new Knob(275, 210, 25, 0, 0.003, 0, 1, "attackknob");
  knobs.push(attackknob);
  kneeknob = new Knob(365, 210, 25, 0, 30, 0, 40, "kneeknob");
  knobs.push(kneeknob);
  releaseknob = new Knob(455, 210, 25, 0, 0.25, 0, 1, "releaseknob");
  knobs.push(releaseknob);
  ratioknob = new Knob(420, 300, 25, 0, 12, 1, 20, "ratioknob");
  knobs.push(ratioknob);
  thresholdknob = new Knob(310, 300, 25, 0, -24, -100, -0, "thresholdknob");
  knobs.push(thresholdknob);

  reverbdurknob = new Knob(75, 530, 25, 0, 3, 0, 10, "reverbdurknob");
  knobs.push(reverbdurknob);
  decayknob = new Knob(155, 530, 25, 0, 2, 0, 10, "decayknob");
  knobs.push(decayknob);

  distortionknob = new Knob(320, 605, 25, 0, 0, 0, 1, "distortionknob");
  knobs.push(distortionknob);
  oversampleknob = new Knob(420, 605, 25, 0, 0, 0, 4, "oversampleknob");
  knobs.push(oversampleknob);

  delaytimeknob = new Knob(610, 200, 25, 0, 0, 0, 1, "delaytimeknob");
  knobs.push(delaytimeknob);

  lowpassfilter.set(frequencyknob.value,resonanceknob.value);
  distortioneffect.set(distortionknob.value, oversampleknob.value);
  delayeffect.delayTime(delaytimeknob.value);
  compressoreffect.attack(attackknob.value);
  compressoreffect.knee(kneeknob.value);
  compressoreffect.release(releaseknob.value);
  compressoreffect.ratio(ratioknob.value);
  compressoreffect.threshold(thresholdknob.value);
  reverbeffect.set(reverbdurknob.value, decayknob.value, false);
}

function writelabels() {
  textSize(12);
  fill("black");
  textFont("arial");
  text("dry/wet", 55, 270);
  text("output \n level", 140, 260);
  text("dry/wet", 290, 370);
  text("output \n level", 395, 360);
  text("dry/wet", 290, 670);
  text("output \n level", 395, 660);
  text("dry/wet", 50, 660);
  text("output \n level", 140, 650);
  text("dry/wet", 50, 660);
  text("output \n level", 780, 155);
  text("dry/wet", 700, 160);
  text("resonance", 125, 175);
  text("attack", 260, 180);
  text("knee", 350, 180);
  text("release", 440, 180);
  text("ratio", 300, 270);
  text("threshold", 390, 270);
  text("delay time", 585, 165);
  text(" reverb\nduration", 55, 480);
  text("decay\n rate", 140, 480);
  text("distortion\n amount", 290, 560);
  text("oversample", 390, 570);
  text("  cutoff \nfreqency", 55, 160);


  text(volumeslider.value(), 980, 230);
  text(LP_drywetslider.value(), 90, 330);
  text(LP_outputslider.value(), 175, 330);
  text(WAV_drywetslider.value(), 330, 730);
  text(WAV_outputslider.value(), 430, 730);
  text(DE_drywetslider.value(), 730, 220);
  text(DE_outputslider.value(), 810, 220);
  text(DY_drywetslider.value(), 330, 430);
  text(DY_outputslider.value(), 430, 430);
  text(RE_drywetslider.value(), 90, 720);
  text(RE_outputslider.value(), 175, 720);
}

function drawspectrum() {
  push();
  let boxX = 540;
  let boxY = 345;
  let boxwidth = 2800;
  let boxheight = 200;

  let boxX2 = 540;
  let boxY2 = 585;
  let boxwidth2 = 630;
  let boxheight2 = 200;

  //Drawing spectrum for original sound 
  let spectrumIN = Inputfft.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i < spectrumIN.length; i++) {
    let x = map(i, 0, spectrumIN.length, boxX, boxX + boxwidth);
    let h = -boxheight + map(spectrumIN[i], 0, 255, boxheight, 0);
    rect(x, boxY + boxheight, boxwidth / spectrumIN.length, h);
  }

  //Drawing spectrum for processed sound 
  let spectrumOUT = Outputfft.analyze();
  noStroke();
  fill(0);
  for (let i = 0; i < spectrumOUT.length; i++) {
    let x = map(i, 0, spectrumOUT.length, boxX2, boxX2 + boxwidth2);
    let h = -boxheight + map(spectrumOUT[i], 0, 255, boxheight2, 0);
    rect(x, boxY2 + boxheight2, boxwidth2 / spectrumOUT.length, h);
  }
  pop();
}

function identifyFilter(){
  choosefilter = createSelect();
  choosefilter.option('Low-pass');
  choosefilter.option('High-pass');
  choosefilter.option('Band-pass');
  choosefilter.selected('Low-pass');
  choosefilter.attribute('style', 'font-family: "Times New Roman", Times;');
  choosefilter.style('font-size', '18px');
  choosefilter.position(165, 120);
  choosefilter.size(100);
}

function filterchanged(){
  let selectedfilter= choosefilter.value();
  if(selectedfilter=='Low-pass'){
    lowpassfilter.setType("lowpass");
  }
  else if(selectedfilter=='High-pass') {
    lowpassfilter.setType("highpass");
  }
  else if(selectedfilter=='Band-pass'){
    lowpassfilter.setType("bandpass");
}
}

function createbtn(text, X, Y, callfunction) {
  let button = createButton(text);
  button.position(X, Y);
  button.style("background-color", "white");
  button.style("border-radius", "10px");
  if (text === "Reverse") {
    button.size(100, 40);
  } else {
    button.size(100, 60);
  }

  button.mouseClicked(callfunction);
  return button;
}

function createslider(minval, maxval, position, range, X, Y, sliderName) {
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
  if (sliderName === "volumeslider") {
    slider.addClass('volumeslider');
    slider.style("height", "30px"); 
    slider.style("width", "120px"); 
    slider.style("background-color", "#c2dcf0"); 
  }
  slider.mouseClicked(() => changesliderval(sliderName));

  return slider;
}

function pausefunction() {
  if (myaudiofile.isPlaying()) {
    myaudiofile.pause();
    stopbtn.style("background-color", "white");
    playbtn.style("background-color", "white");
    pausebtn.style("background-color", "#1c81ed");
    print("Pause button clicked");
  }
}

function playfunction() {
  if (!myaudiofile.isPlaying()) {
    myaudiofile.play();
    playbtn.style("background-color", "#25fae5");
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
    loopbtn.style("background-color", "#c0a6ed");
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
    recordbtn.size(100, 60);
    recordbtn.style("background-color", "#C3EB78");
    recordbtn.html("Recording...");
    recorder.record(soundFile);
    state++;
  } else if (state === 1) {
    print("record stoped");
    recorder.stop();
    recordbtn.html("Finished\nrecording Click to download");
    recordbtn.size(130, 60);
    recordbtn.style("background-color", "#56cbf9");
    state++;
  } else if (state === 2) {
    recordbtn.size(100, 60);
    recordbtn.html("Record");
    recordbtn.style("background-color", "white");
    soundFile.play();
    save(soundFile, "output.wav");
    state = 0;
  }
}
function reversefunction() {
  print('Current reverse state:' ,isreverse);
  if (!isreverse) {
    isreverse = true;
    reversebtn.style("background-color", "lightyellow");
    reverbeffect.set(reverbdurknob.value, decayknob.value, true);
  } else {
    isreverse = false;
    reversebtn.style("background-color", "white");
    reverbeffect.set(reverbdurknob.value, decayknob.value, false);
  }
}

function mousePressed() {
  for (let knob of knobs) {
    knob.knobclicked();
    if (knob.isdragging) {
      knob.updateknob();
      if (knob.name == "frequencyknob" || knob.name == "resonanceknob") {
        lowpassfilter.set(frequencyknob.value,resonanceknob.value);
      } else if (knob.name == "reverbdurknob" || knob.name == "decayknob") {
        reverbeffect.set(reverbdurknob.value, decayknob.value, false);
      } else if (knob.name == "delaytimeknob" ) {
        print('delayyy knob ',delaytimeknob.value);
        delayeffect.delayTime(delaytimeknob.value);
      } else if (
        knob.name == "attackknob" ||
        knob.name == "kneeknob" ||
        knob.name == "releaseknob" ||
        knob.name == "ratioknob" ||
        knob.name == "thresholdknob"
      ) {
        compressoreffect.attack(attackknob.value);
        compressoreffect.knee(kneeknob.value);
        compressoreffect.release(releaseknob.value);
        compressoreffect.ratio(ratioknob.value);
        compressoreffect.threshold(thresholdknob.value);
      } else if (knob.name == "distortionknob" || knob.name == "oversampleknob") {
        let oversample=0; 
        if (oversampleknob.value === 0) {
          oversample = 'none';
        } else if (oversampleknob.value > 0 && oversampleknob.value < 2) {
          oversample = '2x';
        } else if (oversampleknob.value >= 2) {
          oversample = '4x';
        }
        distortioneffect.set(distortionknob.value,oversample);
      }
    }
  }
}

function changesliderval(sliderName) {
  print("changesliderval");
  if (sliderName == "volumeslider") {
    mastervolume.amp(volumeslider.value());
  } else if (sliderName === "LP_drywetslider" || sliderName === "LP_outputslider") {
    lowpassfilter.drywet(LP_drywetslider.value());
    lowpassfilter.amp(LP_outputslider.value());
  } else if (sliderName === 'DE_drywetslider' || sliderName === 'DE_outputslider') {
    delayeffect.drywet(DE_drywetslider.value());
    delayeffect.amp(DE_outputslider.value());
  } else if (sliderName === "DY_drywetslider" || sliderName === "DY_outputslider") {
    compressoreffect.drywet(DY_drywetslider.value());
    compressoreffect.amp(DY_outputslider.value());
  } else if (sliderName === "RE_drywetslider" || sliderName === "RE_outputslider") {
    reverbeffect.drywet(RE_drywetslider.value());
    reverbeffect.amp(RE_outputslider.value());
  } else if (sliderName === "WAV_drywetslider" || sliderName === "WAV_outputslider") {
    distortioneffect.drywet(WAV_drywetslider.value());
    distortioneffect.amp(WAV_outputslider.value());
  }
}

function mouseReleased() {
  for (let knob of knobs) {
    knob.knobReleased();
  }
}
