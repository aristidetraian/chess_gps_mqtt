//initialize speech recognition API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition(); //initialize my instance of speech recognition
recognition.interimResults = true; //return results while still working on current recognition

//this is where your speech-to-text results will appear
let p = document.createElement("p")
const words = document.querySelector(".words-container")
words.appendChild(p)

//I want to select and change the color of the body, but this could be any HTML element on your page
let body = document.querySelector("body")

let LEDON=["on","off"]

let cap_css_colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
const CSS_COLORS = cap_css_colors.map(color => {
  //I need to change all color names to lower case, because comparison between words will be case sensitive
  return color.toLowerCase()
})

//once speech recognition determines it has a "result", grab the texts of that result, join all of them, and add to paragraph
recognition.addEventListener("result", e => {
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join("")
  p.innerText = transcript

  //once speech recognition determines it has a final result, create a new paragraph and append it to the words-container
  //this way every time you add a new p to hold your speech-to-text every time you're finished with the previous results
  if (e.results[0].isFinal) {
    p = document.createElement("p")
    words.appendChild(p)
  }
  //for each result, map through all color names and check if current result (transcript) contains that color
  //i.e. see if a person said any color name you know
  CSS_COLORS.forEach(color => {
    //if find a match, change your background color to that color
    if (transcript.includes(color)) {
      body.style.backgroundColor = color;
    }
  }) 
  //check if on is said
  if (transcript.includes(LEDON[0])) {
      body.style.backgroundColor = "white";
      
      ////////////////
fetch('/disable')
.then(data => {
//return data.json();
console.log("disable request");
})
      ///////////////
      }
    if (transcript.includes(LEDON[1])) {
      body.style.backgroundColor = "black";
      
      ////////////////
fetch('/enable')
.then(data => {
//return data.json();
console.log("enable request");
})
      ///////////////
      }
})

//add your functionality to the start and stop buttons
function startRecording() {
  recognition.start();
  recognition.addEventListener("end", recognition.start)

  document.getElementById("stop").addEventListener("click", stopRecording)
}

function stopRecording() {
  console.log("okay I'll stop")
  recognition.removeEventListener("end", recognition.start)
  recognition.stop();
}
