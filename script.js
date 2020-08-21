const add = (a, b) => { return a + b };
const subtract = (a, b) => { return a - b};
const mult = (a, b) => { return a * b };
const divide = (a, b) => { return a / b};  

const operate = (a, b, operator) => {
    if ( operator === "+" ) {
        return add(a, b); 
    }
    else if ( operator === "-") {
        return subtract(a, b);
    }
    else if ( operator === "x") {
        return mult(a, b);
    }
    else if ( operator === "/") {
        return divide(a, b); 
    }
};

function reset() {
    screen.innerHTML = 0;
}

// all the values need to be saved
let display = 0;
let screen = document.querySelector("#screen");
screen.innerHTML = display;
let x = 0.0;
let y = 0.0; 
let operator;
let xFlag = false; 
let yFlag = false;

// Splitting up inputs to make it easier
function readScreen(userVal) {

    if ( xFlag == true ) {
        // start finding detect the Y value
        // that means everything has been calculated.
        // so set Y to X

        console.log("detect Y now");

        if ( yFlag == true ) {
            x = y; 
            y = 0.0; // for new values
            operator = "";
            return;
        }

        yFlag = detectY(userVal);
        return
    }
   
    xFlag = detectX(userVal);

    return
}

// Checks if there's an X value that was entered
function detectX(userVal) {

    // checks for an operator
    if ( detectOperator(userVal) == true ) {
        console.log("isOperator is true");
        // set the value in "x";
        const end = screen.innerHTML.indexOf(operator);
        const convert = screen.innerHTML.substring(0, end);
        x = parseFloat(convert);

        return true;
    }

    input(userVal);
    return false;
}

function detectY(userVal) {

    if ( detectEqual(userVal) == true) {
        console.log("isEqual is true");
        // set the value in "y"; 
        const begin = screen.innerHTML.indexOf(operator);
        const convert = screen.innerHTML.substring(begin+1, screen.innerHTML.length-1 )

        console.log("Y convert: " + convert);

        return true;
    }

    input(userVal);
    return false 
}

function detectOperator(userVal) {
    if (userVal == "div" || userVal == "mult" || userVal == "sub" || userVal == "add") {
        switch (userVal) {
            case "div":
                operator = "/"; 
                screen.innerHTML = screen.innerHTML.concat("/"); 
                return true;
                break;

            case "mult":
                operator = "x"; 
                screen.innerHTML = screen.innerHTML.concat("x"); 
                return true;
                break;

            case "add":
                operator = "+";
                screen.innerHTML = screen.innerHTML.concat("+"); 
                return true;
                break;

            case "sub":
                operator = "-";
                screen.innerHTML = screen.innerHTML.concat("-"); 
                return true;
                break;
        }
    }
    return false;
}

function detectEqual(userVal) {

    if ( userVal == "equal" ) {
        return true; 
    }
    return false;
}

// button presses? not really the calculations.  
function input( userVal ) {

    if ( screen.innerHTML === "0" ) {
        return screen.innerHTML = userVal; 
    }

    screen.innerHTML = screen.innerHTML.concat(userVal);

    console.log(screen.innerHTML);
}