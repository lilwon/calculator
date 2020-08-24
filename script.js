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

        console.log("DetectX x:" + x);

        return true;
    }

    input(userVal);
    return false;
}

function detectY(userVal) {
    if (  detectOperator(userVal) == true) {
        const checkOp= firstOccurrence();

        const begin = screen.innerHTML.indexOf(checkOp);
        const convert = screen.innerHTML.substring(begin+1, screen.innerHTML.length-1 )

        y = parseFloat(convert);

        // must check that the operators are equal
        if ( operator != checkOp) {
            // Ex: 5 + 6 - 1 * 3 ....
            showSecondOp(checkOp); 
        }
        else {
            // Ex: 5 + 6 + 7 + ...
            showOperatorAns();
        }
    
        x = tempAns;
        y = 0.0; 

        // true bc x value shouldn't be erased
        xFlag = true; 
        return;
    }
    else if ( detectEqual(userVal ) == true ) {
        const begin = screen.innerHTML.indexOf(operator);
        const convert = screen.innerHTML.substring(begin+1, screen.innerHTML.length )
        y = parseFloat(convert);

        showTempAns();

        x = tempAns;
        y = 0.0; 

        xFlag = false; // reset to false otherwise can't detect other operators
        return;

    }
    input(userVal);
    return; 
}

// Displays when user presses the = button 
function showTempAns() {
    const ans = operate(x, y, operator);
    tempAns = ans;
    screen.innerHTML = ans.toString(); 
    return; 
}

// Needs to find the first occurance of the operator 
// For cases :  5 + 7 - 3 
// Looks for the addition to add it first.. 
function firstOccurrence() {
    const currentString = screen.innerHTML;

    for ( let i = 0; i < screen.innerHTML.length; i++ ) {
        if ( currentString[i] == "x" || currentString[i] == "/" || currentString[i] == "+" || currentString[i] == "-" ) {
            return currentString[i];
        }
    }
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

function showOperatorAns() {
    const ans = operate(x, y, operator);
    tempAns = ans; 
    console.log("showOperatorAns: x:" + x + " y:" + y + " op:" + operator);

    screen.innerHTML = ans.toString() + operator;
    console.log(screen.innerHTML);
 
    return;
}

function showSecondOp(newOp)  {
    const ans = operate(x, y, newOp); 
    tempAns = ans; 
    
    screen.innerHTML = ans.toString() + operator;
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