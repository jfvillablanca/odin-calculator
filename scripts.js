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
  if (viewportBuffer === "0") { viewportBuffer = ""; }
  console.log(viewportBuffer); //DIAGNOSTICS
  if (resetState) { viewport.innerText = "0"; }
  else {
    // viewport.innerText = "";
    viewport.innerText = `${viewportBuffer}${userInput}`;
  }
}

const registerClick = function(e) {
  let resetState = true;
  console.log(e.target.innerText); //DIAGNOSTICS
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
