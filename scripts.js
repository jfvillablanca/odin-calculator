/***********************************************************************/
// Visual Bug
// - .clicked Class remains if mouse/keyboard is clicked too fast. Might need to proactively remove class instead of waiting for transitionend event
/***********************************************************************/
const add = function(a,b) {
    return a+b;
};

const subtract = function(a,b) {
    return a-b;
};

const divide = function(a,b) {
    return a/b;
};

const multiply = function(a,b) {
    return a*b;
};

const updateViewport = function(userInput,resetState) {
  viewport = document.querySelector('.calc-viewport');
  let viewportBuffer = viewport.innerText;
  if (userInput === "←") { 
    if (viewportBuffer.length === 1) { 
      viewport.innerText = "0";
      return;
    }
    else {
      viewport.innerText = viewportBuffer.substring(0,viewportBuffer.length-1); 
      console.log(`innertext: ${viewport.innerText}, buffer: ${viewportBuffer} `); //DIAGNOSTICS
      return;
    }
  }

  if (viewportBuffer === "0" && userInput !== ".") { viewportBuffer = ""; } //Removes leading zero for non decimal
  if (resetState) { viewport.innerText = "0"; }
  else {
    if (userInput === "±") { console.log("plusminus"); }
    else if (userInput === "÷") { console.log("divide"); }
    else if (userInput === "×") { console.log("multiply"); }
    else if (userInput === "-") { console.log("subtract"); }
    else if (userInput === "+") { console.log("add"); }
    else if (viewportBuffer.includes(".") && userInput === ".") { viewport.innerText = viewportBuffer; }
    else if (viewportBuffer.length !== 15) { 
      viewport.innerText = `${viewportBuffer}${userInput}`; 
    }
  }
  console.log(viewportBuffer); //DIAGNOSTICS
}

const registerClick = function(e) {
  let resetState = true;
  // console.log(e.target.innerText); //DIAGNOSTICS
  e.target.classList.add('clicked');
  if (e.target.innerText !== "C") { resetState = false;}
  updateViewport(e.target.innerText,resetState)
}

const removeTransition = function(e) {
  e.target.classList.remove('clicked');
}

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click',registerClick));
buttons.forEach(button => button.addEventListener('transitionend',removeTransition));
