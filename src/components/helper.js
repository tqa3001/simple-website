function randomInt(lower, upper) { // include lower, exclude upper 
  return Math.floor(Math.random() * (upper - lower)) + lower;  
}

function randomElement(lst) {
  ret = lst[randomInt(0, lst.length)]; 
  return ret; 
}

function getDate() {
  console.log("fortnite"); 
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  let yyyy = today.getFullYear();
  return String(mm + '/' + dd + '/' + yyyy); 
}

function getMinute(time) {
  return time / 1000 / 60; 
}

function displayTimer(time) {
  console.assert(!(time % 1000)); 
  time /= 1000; 
  let ss = String(time % 60).padStart(2, '0');  
  time = (time - ss) / 60; 
  let mm = String(time % 60).padStart(2, '0'); 
  time = (time - mm) / 60; 
  let hh = String(time).padStart(2, '0'); 
  return hh + ':' + mm + ':' + ss; 
}