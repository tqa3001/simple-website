/* Variable Declaration */

// STATIC server-side variables  
let topics = ["fornite", "love", "existentialism", "carl jung", "rejection", "compatibility"]; 
let quotes = [
  {quote: "One who has a why can bear any how", author: "Friedrich Nietzche"}, 
  {quote: "We must not let our shortcomings become normality", author: "Angela Markel"},
  {quote: "Unimelb mid", author: ""}
]
let progress = [0, 1, 1, 1, 0, 1, 0, 0, 1, 1]; 

// STATIC client variables
let data = {
  wordLowerBound: Number, 
  timeLowerBound: Number, 
  topic: String,  
  quote: Object,
  started: Boolean, 
  completed: Boolean, 
}

// HTML Elements
let editor; 
let aElement; 

// Buttons
let downloadButton, startButton, openInputButton, completeButton; 

/* Initialization Functions */

function initStaticData() {
  data.wordLowerBound = 20; 
  data.timeLowerBound = 4 * 1000; // in milliseconds
  data.topic = randomElement(topics); 
  data.quote = randomElement(quotes); 
  data.started = false; 
  data.completed = false; 
}

function initVariables() {
  editor = document.getElementById("text-editor"); 
  aElement = document.createElement("a"); 
  startButton = document.getElementById("start");
  downloadButton = document.getElementById("download");
  openInputButton = document.getElementById("open");
  completeButton = document.getElementById("mark-complete"); 
  initStaticData(); 
}

/* Functions for displaying data */

function displayData() {
  document.getElementById("display-date").innerHTML = getDate(); 
  document.getElementById("topic").innerHTML = "Today's topic: " + data.topic; 
  document.getElementById("writing-specs").innerHTML = 
    ("Goal: At least " + data.wordLowerBound + " words and " + getMinute(data.timeLowerBound) + " minutes of writing"); 
}

/* Functions for the editor */

function updateWordCount() { 
  let s = editor.value; 
  let cnt = 0; 
  for (let i = 0; i < s.length - 1; i++) 
    cnt += ((s[i] == '\n' || s[i] == ' ') && s[i + 1] != ' '); 
  if (s) cnt++; 
  document.getElementById("show-word-count").innerHTML = "Word count: " + cnt; 
}

function quoteString(quoteObj) {
  return quoteObj.quote + " - " + (quoteObj.author ? quoteObj.author : "Random Discord Mod"); 
}

function initEditor() {
  editor.oninput = updateWordCount;
  editor.placeholder = quoteString(data.quote);
  editor.readOnly = true; 
}

/* Download file button */

function initDownloadButton() { 
  downloadButton.innerHTML = "Download"; 
  downloadButton.onclick = () => {
    let content = editor.value; 
    let blob = new Blob([content], {type: "plain/text"}); 
    let fileURL = URL.createObjectURL(blob); 
    aElement.setAttribute("href", fileURL); 
    aElement.setAttribute("download", "fileName.txt"); // TODO: make "filename" dynamic
    aElement.click(); 
  }; 
}

/* Open file button */

function initOpenButton() { 
  openInputButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsText(openInputButton.files[0]);  
    reader.onload = () => {
      editor.value = reader.result;
      updateWordCount(); 
    }
  }; 
}

/* Start Button */ 

function startTimer() {
  currentTime = data.timeLowerBound; 
  let timer = document.getElementById("timer"); 
  let func = setInterval(() => {
    currentTime -= 1000;  
    timer.innerHTML = displayTimer(currentTime); 
    if (!currentTime) {
      timer.innerHTML = "Well done!"; 
      let event = new CustomEvent("goalAchieved"); 
      completeButton.dispatchEvent(event); 
      clearInterval(func); 
    }
  }, 1000);
}

function initStartButton() {
  startButton.innerHTML = "Start";
  startButton.onclick = () => {
    data.started = true; 
    startButton.innerHTML = "Do your best ^^";
    startButton.disabled = true; 
    editor.readOnly = false; 
    startTimer(); 
  }; 
}

/* Mark complete button */

function initCompleteButton() {
  completeButton.innerHTML = "Mark as done"; 
  completeButton.disabled = true; 
  completeButton.addEventListener("goalAchieved", () => {
    completeButton.disabled = false; 
  }); 
  completeButton.onclick = () => {
    if (!data.completed) {
      data.completed = true; 
      completeButton.style.backgroundColor = "green"; 
      completeButton.style.color = "white";  
      completeButton.innerHTML = "Done";    
    }
  }; 
}


window.onload = () => {
  initVariables(); 
  displayData(); 
  initEditor(); 
  initDownloadButton(); 
  initOpenButton(); 
  initStartButton(); 
  initCompleteButton(); 
}
