/***********************************************************************/
// Visual Bug
// - .clicked Class remains if mouse/keyboard is clicked too fast. Might need to proactively remove class instead of waiting for transitionend event
// Feature/Bug
// - Picking a new operator would operate instead of swapping to the new operator
/***********************************************************************/
(function(){
  let resultBuffer = 0; //Store current operand in the viewport here
  let currentOperator = "+"; // Since 0 is the initial value, the initial number input will be ADDED to 0, and is, technically, the first operation
  let resetState = true;
  let displayAfterOperate = false;
  viewport = document.querySelector('.calc-viewport');

  const reset = function(){
    resetState = true; //reset to fresh operation, clear buffer, aka CE
    resultBuffer = 0;
    currentOperation = "+"; 
    viewport.innerText = "0";
  }

  const operate = function (operation, op1, op2){
    console.log(`First Operand: ${op1}, Operation: ${operation}, Second Operand: ${op2}`);
    if (operation === "+"){
      resultBuffer = op1 + op2;
    }
    else if (operation === "-"){
      resultBuffer = op1 - op2;
    }
    else if (operation === "×"){
      resultBuffer = op1 * op2;
    }
    else if (operation === "÷"){
      resultBuffer = op1 / op2;
    }
    console.log(`Operation Result: ${resultBuffer}`);
    viewport.innerText = resultBuffer.toString();
    displayAfterOperate = true;
    return 0;
  };

  const updateViewport = function(userInput,pressedClear) {
    let viewportBuffer = "";
    viewportBuffer = viewport.innerText;
    if (userInput === "←") { 
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

    if (pressedClear) { 
      // viewport.innerText = "0";
      reset();
      return;
    }
    else {

      if (userInput === "±") { 
        (viewportBuffer.startsWith("-")) 
          ? viewport.innerText = viewportBuffer.substring(1,viewportBuffer.length)
          : viewport.innerText = `-${viewportBuffer}`;
        return;
      }
      else if (userInput === "÷") {
        currentOperator = "÷";
        if (resetState){
          resultBuffer = +viewportBuffer;
          resetState = false;
          displayAfterOperate = true;
        }
        else{
          operate(currentOperator, resultBuffer, +viewportBuffer);
        }
        // ADD .clicked status
        return 0;
      }
      else if (userInput === "×") { 
        currentOperator = "×";
        if (resetState){
          resultBuffer = +viewportBuffer;
          resetState = false;
          displayAfterOperate = true;
        }
        else{
          operate(currentOperator, resultBuffer, +viewportBuffer);
        }
        // ADD .clicked status
        return 0;
      }
      else if (userInput === "-") {
        currentOperator = "-";
        if (resetState){
          resultBuffer = +viewportBuffer;
          resetState = false;
          displayAfterOperate = true;
        }
        else{
          operate(currentOperator, resultBuffer, +viewportBuffer);
        }
        // ADD .clicked status
        return 0;
      }
      else if (userInput === "+") {
        currentOperator = "+";
        if (resetState){
          resultBuffer = +viewportBuffer;
          resetState = false;
          displayAfterOperate = true;
        }
        else{
          operate(currentOperator, resultBuffer, +viewportBuffer);
        }
        // ADD .clicked status
        return 0;
      }
      else if (userInput === "=") {
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
    return 0;
  };

  const registerClick = function(e) {
    let pressedClear = false;
    // console.log(`registerClick: ${e.target.innerText}, ${resetState}`)
    e.target.classList.add('clicked');
    if (e.target.innerText === "C") {
      pressedClear = true;
    }
      console.log(displayAfterOperate);
    if (displayAfterOperate){
      viewport.innerText = "";
      displayAfterOperate = false;
    }
    updateViewport(e.target.innerText,pressedClear);
    return 0;
  };

  const registerKey = function(e) {
    e.preventDefault(); // Suppress default keybindings of browser e.g. "/" Quick Find
    const resetState = false;

    const keyDivs = Array.from(document.querySelectorAll('.button'));
    keyDivs.forEach(keyDiv => {
      if (e.key === "Backspace" && keyDiv.innerText === "←"){
        keyDiv.classList.add('clicked');
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "/" && keyDiv.innerText === "÷"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "7" && keyDiv.innerText === "7"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "8" && keyDiv.innerText === "8"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "9" && keyDiv.innerText === "9"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "*" && keyDiv.innerText === "×"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "4" && keyDiv.innerText === "4"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "5" && keyDiv.innerText === "5"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "6" && keyDiv.innerText === "6"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "-" && keyDiv.innerText === "-"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "1" && keyDiv.innerText === "1"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "2" && keyDiv.innerText === "2"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "3" && keyDiv.innerText === "3"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "+" && keyDiv.innerText === "+"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "." && keyDiv.innerText === "."){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "0" && keyDiv.innerText === "0"){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
      if (e.key === "Enter" && keyDiv.innerText === "="){
        keyDiv.classList.add('clicked'); 
        updateViewport(keyDiv.innerText,resetState);
      }
    });

    return 0;
  };

  const removeTransition = function(e) {
    e.target.classList.remove('clicked');
    return 0;
  };


  reset();
  const buttons = Array.from(document.querySelectorAll('.button'));
  buttons.forEach(button => button.addEventListener('click',registerClick));
  buttons.forEach(button => button.addEventListener('transitionend',removeTransition));
  window.addEventListener('keydown',registerKey);
}());
