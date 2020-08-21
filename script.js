const add = (a, b) => { return a + b };
const subtract = (a, b) => { return a - b};
const mult = (a, b) => { return a * b };
const divide = (a, b) => { return a / b};  

const operate = (a, b, operator) => {
    if ( operator == "+" ) {
        return add(a, b); 
    }
    else if ( operator == "-") {
        return subtract(a, b);
    }
    else if ( operator == "x") {
        return mult(a, b);
    }
    else if ( operator == "/") {
        return divide(a, b); 
    }
};

function reset() {
    screen.innerHTML = 0;
    xFlag= false;
    x = 0.0;
    y = 0.0;
    tempAns = 0.0;
    operator = "";
}

// all the values need to be saved
let display = 0;
let screen = document.querySelector("#screen");
screen.innerHTML = display;
let x = 0.0;
let y = 0.0; 
let tempAns = 0.0;
let operator;
let xFlag = false;

// Splitting up inputs to make it easier
function readScreen(userVal) {
    if ( xFlag == true ) {
        // DOESN'T WORK WHEN VALUE WANTS TO KEEP DIVIDING
        detectY(userVal);
        return
    }
    xFlag = detectX(userVal);
    return
}

// Checks if there's an X value that was entered
function detectX(userVal) {
    // checks for an operator
    if ( detectOperator(userVal) == true ) {
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
        const convert = screen.innerHTML.substring(begin+1, screen.innerHTML.length )
        y = parseFloat(convert);

        showAns();

        // in case nothing resets, but  need to
        // somehow check for operator
        x = tempAns;
        y = 0.0; 
        xFlag = false;
        // need to somehow change or get an operator from user somehow??
        return;
    }

    input(userVal);
    return; 
}

function showAns() {
    const ans = operate(x, y, operator);
    tempAns = ans;
    console.log("x: " + x + " y: " + y + " op: " + operator);
    screen.innerHTML = ans.toString(); 
    return; 
}

// Might need to find a way to shorten this..
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

// Did someone press the equal sign? 
const detectEqual = (userVal) => { return userVal == "equal" ? true : false }

// button presses? not really the calculations.  
function input( userVal ) {
    if ( screen.innerHTML === "0" ) {
        return screen.innerHTML = userVal; 
    }
    screen.innerHTML = screen.innerHTML.concat(userVal);
}