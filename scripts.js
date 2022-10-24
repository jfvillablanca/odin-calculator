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

const registerKey = function(e) {
  // keyPress = document.querySelector(`.button`);
  console.log(`${e.key}`);
};


// const buttons = Array.from(document.querySelectorAll('.button'));
// buttons.forEach(button => button.addEventListener('transitionend',removeTransition));
window.addEventListener('keydown',registerKey);

