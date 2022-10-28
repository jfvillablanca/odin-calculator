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

const registerKey = function(e) {
  e.preventDefault(); // Suppress default keybindings of browser e.g. "/" Quick Find

  // keyPress = document.querySelector(`.button`);
  // const keyClear = document.querySelector(".clear");
  const keyBackspace = document.querySelector(".backspace");
  // const keyPlusMinus = document.querySelector(".plusminus");
  const keyDivision = document.querySelector(".division");
  const keySeven = document.querySelector(".seven");
  const keyEight = document.querySelector(".eight");
  const keyNine = document.querySelector(".nine");
  const keyMultiplication = document.querySelector(".multiplication");
  const keyFour = document.querySelector(".four");
  const keyFive = document.querySelector(".five");
  const keySix = document.querySelector(".six");
  const keySubtraction = document.querySelector(".subtraction");
  const keyOne = document.querySelector(".one");
  const keyTwo = document.querySelector(".two");
  const keyThree = document.querySelector(".three");
  const keyAddition = document.querySelector(".addition");
  const keyDecimal = document.querySelector(".decimal");
  const keyZero = document.querySelector(".zero");
  const keyEqualSign = document.querySelector(".equalsign");
  
  // console.log(`${e.key}`);
  if (e.key === "Backspace"){ keyBackspace.classList.add('clicked'); }
  if (e.key === "/"){ keyDivision.classList.add('clicked'); }
  if (e.key === "7"){ keySeven.classList.add('clicked'); }
  if (e.key === "8"){ keyEight.classList.add('clicked'); }
  if (e.key === "9"){ keyNine.classList.add('clicked'); }
  if (e.key === "*"){ keyMultiplication.classList.add('clicked'); }
  if (e.key === "4"){ keyFour.classList.add('clicked'); }
  if (e.key === "5"){ keyFive.classList.add('clicked'); }
  if (e.key === "6"){ keySix.classList.add('clicked'); }
  if (e.key === "-"){ keySubtraction.classList.add('clicked'); }
  if (e.key === "1"){ keyOne.classList.add('clicked'); }
  if (e.key === "2"){ keyTwo.classList.add('clicked'); }
  if (e.key === "3"){ keyThree.classList.add('clicked'); }
  if (e.key === "+"){ keyAddition.classList.add('clicked'); }
  if (e.key === "."){ keyDecimal.classList.add('clicked'); }
  if (e.key === "0"){ keyZero.classList.add('clicked'); }
  if (e.key === "Enter"){ keyEqualSign.classList.add('clicked'); }
};

const removeTransition = function(e) {
  // console.log(e.propertyName);
  e.target.classList.remove('clicked');
}

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click',registerClick));
buttons.forEach(button => button.addEventListener('transitionend',removeTransition));
window.addEventListener('keydown',registerKey);

