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
    console.log(`hi buffer: ${viewportBuffer} intext: ${viewport.innerText}`)
    if (viewportBuffer.length === 1 || (viewportBuffer.length === 2 && viewportBuffer.startsWith("-"))) { 
      viewport.innerText = "0";
      return;
    }
    else {
      if (viewportBuffer === "-") {
        viewport.innerText = "0";
        return;
      }
      viewport.innerText = viewportBuffer.substring(0,viewportBuffer.length-1); 
      return;
    }
  }

  if (viewportBuffer === "0" || viewportBuffer === "-0") { //Removes leading zero for non decimal and allows plusminus even with resetstate
    if (userInput === "±") {
      if (viewportBuffer === "0"){
        viewport.innerText = "-0";
        return;
      }
      if (viewportBuffer === "-0"){
        viewport.innerText = "0";
        return;
      }
    }
    if (userInput !== ".") {
      if (viewportBuffer === "0"){
        viewportBuffer = "";
      }
      if (viewportBuffer === "-0"){
        viewportBuffer = "-";
      }
    }
  }

  if (resetState) { 
    viewport.innerText = "0";
    return;
  }
  else {
    if (userInput === "±") { 
      (viewportBuffer.startsWith("-")) 
        ? viewport.innerText = viewportBuffer.substring(1,viewportBuffer.length)
        : viewport.innerText = `-${viewportBuffer}`;
      // console.log(`(after) innertext: ${viewport.innerText} len ${viewport.innerText.length}, buffer: ${viewportBuffer} len ${viewportBuffer.length}`); //DIAGNOSTICS
      return;
    }
    else if (userInput === "÷") {
      console.log("divide");
      return;
    }
    else if (userInput === "×") { 
      console.log("multiply");
      return;
    }
    else if (userInput === "-") {
      console.log("subtract");
      return;
    }
    else if (userInput === "+") {
      console.log("add"); 
      return;
    }

    if (viewportBuffer.includes(".") && userInput === ".") { //Ensure single decimal point in buffer
      viewport.innerText = viewportBuffer;
      return;
    }
    if (viewportBuffer.length !== 15) { //Prevents text overflow. Text will still overflow for small screens; the value is arbitrary and does not follow responsive design 
      viewport.innerText = `${viewportBuffer}${userInput}`; 
      return;
    }
  }
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
