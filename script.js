function updateWordCount() { 
  console.log("fojerkj")
  let s = document.getElementById("text-editor").value; 
  let cnt = 0; 
  for (let i = 0; i < s.length - 1; i++) 
    cnt += ((s[i] == '\n' || s[i] == ' ') && s[i + 1] != ' '); 
  if (s) cnt++; 
  document.getElementById("show-word-count").innerHTML = "Word count: " + cnt; 
}

window.onload = () => {
  let editor = document.getElementById("text-editor");
  // Update word count
  editor.oninput = updateWordCount;  
  // Download button
  document.getElementById("download").addEventListener("click", () => {
    let content = editor.value; 
    let blob = new Blob([content], {type: 'plain/text'}); 
    let fileURL = URL.createObjectURL(blob); 
    let obj = document.createElement("a"); 
    obj.setAttribute("href", fileURL); 
    obj.setAttribute("download", "fileName.txt"); 
    obj.click(); 
  }); 
  // Load button
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

// file -> a href -