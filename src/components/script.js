/* Variable Declaration */

class Data {
  constructor(wordLowerBound, timeLowerBound, topic, quote, count, started, completed) {
    this.wordLowerBound = wordLowerBound;  
    this.timeLowerBound = timeLowerBound; 
    this.topic = topic; 
    this.quote = quote; 
    this.count = count; 
    this.started = started; 
    this.completed = completed; 
  }
}

// STATIC server-side variables  
let topics = ["fornite", "love", "existentialism", "carl jung", "rejection", "compatibility"]; 
let quotes = [
  {quote: "One who has a why can bear any how", author: "Friedrich Nietzche"}, 
  {quote: "We must not let our shortcomings become normality", author: "Angela Markel"},
  {quote: "Unimelb mid", author: ""}
]
let allData = [ // is it necessary to check if data is sound? 
  new Data(0, 20, "fornite", undefined, 12, true, true),
  new Data(0, 20, "ihouse", undefined, 0, false, false), 
  new Data(0, 20, "balls", undefined, 50, true, false),
  new Data(0, 20, "the industrial society and its future", undefined, 100, true, true),
]; 

// STATIC client variables
let state; 

// HTML Elements
let editor, graph;  
let aElement; 

// Buttons
let downloadButton, startButton, openInputButton, completeButton; 

/* Initialization Functions */

function initState() {
  state = new Data(20, 4 * 1000, randomElement(topics), randomElement(quotes), 0, false, false); 
}

function initVariables() {
  editor = document.getElementById("text-editor");
  graph = document.getElementById("graph"); 
  aElement = document.createElement("a"); 
  startButton = document.getElementById("start");
  downloadButton = document.getElementById("download");
  openInputButton = document.getElementById("open");
  completeButton = document.getElementById("mark-complete"); 
}

/* Functions for displaying data */

function displayData() {
  document.getElementById("display-date").innerHTML = getDate(); 
  document.getElementById("topic").innerHTML = "Today's topic: " + state.topic; 
  document.getElementById("writing-specs").innerHTML = 
    ("Goal: At least " + state.wordLowerBound + " words and " + getMinute(state.timeLowerBound) + " minutes of writing"); 
}

/* Functions for the editor */

function updateWordCount() { // Bad time complexity 
  let s = editor.value; 
  state.count = 0; 
  for (let i = 0; i < s.length - 1; i++) 
    state.count += ((s[i] == '\n' || s[i] == ' ') && s[i + 1] != ' '); 
  if (s) state.count++; 
  document.getElementById("show-word-count").innerHTML = "Word count: " + state.count; 
}

function quoteString(quoteObj) {
  return quoteObj.quote + " - " + (quoteObj.author ? quoteObj.author : "Random Discord Mod"); 
}

function initEditor() {
  editor.oninput = updateWordCount;
  editor.placeholder = quoteString(state.quote);
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
  currentTime = state.timeLowerBound; 
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
    state.started = true; 
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
    if (!state.completed) {
      state.completed = true; 
      completeButton.style.backgroundColor = "green"; 
      completeButton.style.color = "white";  
      completeButton.innerHTML = "Done";    
      editor.readOnly = true; 
      saveData(state); 
    }
  }; 
}

/* Display bar graph of the progress */

function fetchProgress(init=false) {
  for (let i = (init ? 0 : allData.length - 1); i < allData.length; i++) {
    let data = allData[i]
    graph.innerHTML += `Day ${i}: ${data.count} words <br>`  
  }
}

function saveData(data) {
  allData.push(data); 
  fetchProgress(); 
}

window.onload = () => {
  initVariables(); 
  initState(); 
  displayData(); 
  initEditor(); 
  initDownloadButton(); 
  initOpenButton(); 
  initStartButton(); 
  initCompleteButton(); 
  fetchProgress(true); 
}
