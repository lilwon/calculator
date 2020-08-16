const add = (a, b) => { return a + b };
const subtract = (a, b) => { return a - b};
const mult = (a, b) => { return a * b };
const divide = (a, b) => { return a / b};  

const operate = (a, b, operator) => {
    if ( operator === "add" ) {
        return add(a, b); 
    }
    else if ( operator === "sub") {
        return subtract(a, b);
    }
    else if ( operator === "mult") {
        return mult(a, b);
    }
    else if ( operator === "div") {
        return divide(a, b); 
    }
};

let display = 0;
let screen = document.querySelector("#screen");
screen.innerHTML = display;


// used to store values..
let x = 0; 
let y = 0;
let opFlag = false;
let operator; 
let count = 0
// screen shows "nothing"
function reset() {
    screen.innerHTML = 0;
}

function detectOperator( userVal ) {
    if ( userVal == "div" || userVal == "mult" || userVal == "add" || userVal == "sub" ) {
        opFlag = true; 
        // save x value
        x = parseInt(screen.innerHTML);
        operator = userVal; 
        
        console.log(x); 
        console.log(operator); 
    }
    return;
}

function detectEqual( userVal) {

    if ( userVal == "equal" ) {
        const pos = screen.innerHTML.indexOf(operator);
        console.log(pos);
        y = screen.innerHTML.substring(pos+operator.length, screen.innerHTML.length);
        console.log(y);
    }

    return;
}

// button presses? not really the calculations.  
function input( userVal ) {

    // save the value and swith save val to y
    detectOperator(userVal);

    detectEqual(userVal);


    if ( screen.innerHTML === "0" ) {
        return screen.innerHTML = userVal; 
    }

    if ( y == 0 ) {
        screen.innerHTML = screen.innerHTML.concat(userVal);
        console.log(screen.innerHTML); 
    }
    else {
        screen.innerHTML = operate(x, y, operator);
    }

    return screen.innerHTML;

}