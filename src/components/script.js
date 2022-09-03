/* Variable Declaration */
// STATIC User-data variables  
let data = {
  wordLowerBound: Number, 
  timeLowerBound: Number, 
  progress: [], 
  topics: [], 
  quotes: [] 
}
// HTML Elements
let editor; 
let aElement; 

/* Functions */

function initStaticData() {
  data.wordLowerBound = 20; 
  data.timeLowerBound = 3000; // ms
  data.progress = [0, 1, 1, 1, 0, 1, 0, 1, 0]; 
  data.topics = [
    "fornite", "love", "existentialism", "carl jung", "rejection", "compatibility",
  ]; 
  data.quotes = [
    {quote: "One who has a why can bear any how", author: "Friedrich Nietzche"}, 
    {quote: "We must not let our shortcomings become normality", author: "Angela Markel"},
    {quote: "Unimelb mid", author: ""}
  ]; 
}

function initVariables() {
  editor = document.getElementById("text-editor"); 
  aElement = document.createElement("a"); 
  initStaticData(); 
}

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
  editor.placeholder = quoteString(randomElement(data.quotes));
}

function initDownloadButton() { 
  let downloadButton = document.getElementById("download")
  downloadButton.onclick = () => {
    let content = editor.value; 
    let blob = new Blob([content], {type: "plain/text"}); 
    let fileURL = URL.createObjectURL(blob); 
    aElement.setAttribute("href", fileURL); 
    aElement.setAttribute("download", "fileName.txt"); // TODO: make "filename" dynamic
    aElement.click(); 
  }; 
}

function initOpenButton() {
  let fileElement = document.getElementById("open"); 
  fileElement.onchange = () => {
    let reader = new FileReader();
    reader.readAsText(fileElement.files[0]);  
    reader.onload = () => {
      editor.value = reader.result;
      updateWordCount(); 
    }
  }; 
}

function init() {
  initVariables(); 
  initEditor(); 
  initDownloadButton(); 
  initOpenButton(); 
}

window.onload = () => {
  init(); 
}
