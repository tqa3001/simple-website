function randomInt(lower, upper) { // include lower, exclude upper 
  return Math.floor(Math.random() * (upper - lower)) + lower;  
}

function randomElement(lst) {
  ret = lst[randomInt(0, lst.length)]; 
  console.log(ret); 
  return ret; 
}