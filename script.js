const numberButtons = document.querySelectorAll('[data-number]');

const equal = document.getElementById('equal');
const decimalPoint = document.getElementById('decimal-point');

const currentOperand = document.getElementById('current-operand');
const previousOperand = document.getElementById('previous-operand');

const arithmaticButtons = document.querySelectorAll('[data-arithmetic]');

const deleteButton = document.getElementById('delete-btn');
const clearButton = document.getElementById('clear-btn');


let inputString = "";
let inputStringShowCurr = '';
let inputStringShowPre = '';
const ARITHMATIC_SYMBOLS = {
    "+": "+", 
    "-": "-", 
    "×": "*", 
    "÷": "/"
}

let hasResult = false;

startGame();

function startGame(){
    // number buttons
    startNumberButtons();

    // alrithmatic buttons
    startArithmaticButtons();

    // decimal button
    startDecimalPoint();

    // AC button
    startAcButton();

    // delete button
    startDeleteButton();

    // output button
    startOutputButton();
}

// decimal point
function startDecimalPoint(){
    decimalPoint.addEventListener('click', () => {
        if(hasResult){
            throwCurrAnsToPre();
            resetInputString();
            showCurrAndPre();
            hasResult = false;
        }

        if(inputString.charAt(inputString.length-1) === '.') return;

        inputString += '.';
        showCurrentOperand('.');
    })
}

// clear the input
function startAcButton(){
    clearButton.addEventListener('click', () => {
        if(hasResult) {
            throwCurrAnsToPre();
            hasResult = false;
        } 
        resetInputString();
        
        showCurrAndPre();
    })
}



// delete current input
function startDeleteButton(){
    deleteButton.addEventListener('click', () => {
        if(inputString === '') return;
        if(hasResult) {
            throwCurrAnsToPre();
            resetInputString();
            showCurrAndPre();
            hasResult = false;
            return;
        }
        inputString = inputString.slice(0, -1);
        inputStringShowCurr = inputStringShowCurr.slice(0, -1);
        showCurrentOperand();
    })
}


// number buttons
function startNumberButtons(){
    numberButtons.forEach(numberButton => {
        numberButton.addEventListener('click', () => {
            if(hasResult){
                newTurn();
            }
            inputString += numberButton.innerText;
            showCurrentOperand(numberButton.innerText);
        })
    })
}

// arithmatic buttons
function startArithmaticButtons() {
    arithmaticButtons.forEach(arithmaticButton => {
        arithmaticButton.addEventListener('click', () => {
            if(hasResult){
                throwCurrAnsToPre();
                showCurrAndPre();
                hasResult = false;
            }
            inputString += ARITHMATIC_SYMBOLS[arithmaticButton.innerText];
    
            showCurrentOperand(arithmaticButton.innerText);
    
        })
    })
}

// compute result
function startOutputButton(){
    equal.addEventListener('click', () => {
    
        let result = 0;
        if(inputString === '') return;
        try{
            result = eval(inputString);
            result = twoDecimalPrecision(result);
            hasResult = true;
        } catch (error) {
            return;
        }

        fireOperandAnimation(currentOperand);
        fireOperandAnimation(previousOperand);
    
        showResult(result);
    })
}

function fireOperandAnimation(operand){
    operand.style.animation = 'none';
    operand.offsetHeight;    // trigger reflow
    operand.style.animation = null;
}

function twoDecimalPrecision(num){
    return Math.round(num * 100) / 100;
}

function resetInputString(){
    inputStringShowCurr = "";
    inputString = "";
}

// let pre = curr
function throwCurrAnsToPre(){
    assignCurrtoPre();
    inputStringShowPre = "Ans = " + inputStringShowPre;
}


function newTurn(){
    throwCurrAnsToPre();
    resetInputString();
    showCurrAndPre();
    hasResult = false;
}

function showResult(result){
    assignCurrtoPre();
    inputString = result.toString();    // set input as result
    inputStringShowCurr = result.toString();
    inputStringShowPre += "=";
    showCurrAndPre();
}

function showCurrAndPre(){
    currentOperand.innerText = inputStringShowCurr;
    previousOperand.innerText = inputStringShowPre;
}

function assignCurrtoPre(){
    inputStringShowPre = inputStringShowCurr;
}

function showCurrentOperand(symbol = ""){
    inputStringShowCurr += symbol;
    currentOperand.innerText = inputStringShowCurr;
}
