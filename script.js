const add = (a, b) => { return a + b };
const subtract = (a, b) => { return a - b};
const mult = (a, b) => { return a * b };
const divide = (a, b) => { return a / b};  

const operate = (a, b, operator) => {
    if ( operator === "add" ) {
        return add(a, b); 
    }
    else if ( operator === "subtract") {
        return subtract(a, b);
    }
    else if ( operator === "multiply") {
        return mult(a, b);
    }
    else if ( operator === "divide") {
        return divide(a, b); 
    }
};