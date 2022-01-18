x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
to_number = "";
speak_data = "";

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start(){
  document.getElementById("status").innerHTML = "System is Listening. Please Speak";  
  recognition.start();
}
 
recognition.onresult = function(event) {
  console.log(event); 
  
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "Object recognized is: " + content; 
  
  to_number = Number(content);
  console.log("Input: "+to_number);
  
  if (Number.isInteger(to_number)){
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "The Speech has not Recognized a Number";
  }
}

function preload(){
  apple = loadImage("apple.png");
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width-275, screen_height-275);
}

function draw() {
  if(draw_apple == "set"){
    for (i = 1; i <= to_number; i++){
      x = Math.floor(Math.random()*900);
      y = Math.floor(Math.random()*575);
      image(apple, x, y, 50, 50);
    }
    speak_data = to_number+" Apples Drawn.";
    speak();
    
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    
    draw_apple = "";
  }
}

function speak(){
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  speak_data = "";
}

function clean(){
  background("pink");
  console.log("Canvas Cleared");
}