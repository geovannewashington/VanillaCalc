const localScope = function() {
    const display = document.querySelector("#display");
    const clearButton = document.querySelector("#clear-btn");
    const calculateButton = document.querySelector("#calculate-btn");
    const undoButton = document.querySelector("#undo-btn");
    const buttons = document.querySelectorAll("#keys button.normal-btn");

    function appendToDisplay(inputValue) {
        const displayValues = display.value;
        const lastDigit = displayValues.slice(-1);
        
        //prevent from putting a new operator following an existing operator
        const isLastCharOperator = ['+', '-', '×', '÷'].includes(lastDigit);
        if (isLastCharOperator && ['+', '-', '×', '÷'].includes(inputValue)) {
            const arrayOfDigits = displayValues.slice(0, -1) + inputValue;
            display.value = arrayOfDigits;
            return;
        }
        display.value += inputValue;    
    }
    
    //removes the last digit from display
    function undo() {
        /*
            This was how I first did it:
            if (display.value === '') {
                return;
            }
            const displayValues = display.value;
            const arrayOfDigits = displayValues.split('');
            arrayOfDigits.pop();
            display.value = arrayOfDigits.join("");
        */
       
        if (display.value !== '') {
            const displayValues = display.value;
            display.value = displayValues.slice(0, -1);
        }
    }
    
    function clearDisplay() {
        //to clear the display, basically all the value is replaced by an empty string:
        display.value = '';
    }
    
    function calculate() {
        try {
            //checking if there is something to calculate
            if (display.value === '') {
                return;
                
            } else {
                const displayValue = display.value;
                //apparently it is not safe to use the eval(); function, but I will keep it in this version for now.
                display.value = eval(displayValue.replace("÷", "/").replace("×", "*")); 
            }
        }
        catch(error) {
            display.value = "Error";
        }
    }
    
    clearButton.addEventListener("click", clearDisplay);
    calculateButton.addEventListener("click", calculate);
    undoButton.addEventListener("click", undo);

    /*
    Note: apparently I can do this using the forEach() function 
    I'll implement it on a future new version of this project, once I learn more about it
    */
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            appendToDisplay(buttons[i].innerText);
        });
    }
}

localScope();
