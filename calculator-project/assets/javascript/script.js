(function() {
    const display = document.querySelector('#display');
    
    const buttonClick = () => {
        addEventListener('click', (event) => {
            const el = event.target;
            if (el.classList.contains('btn')) appendToDisplay(el.innerText);
            if (el.classList.contains('btn-clear')) clearDisplay();
            if (el.classList.contains('btn-delete')) deleteLastChar();
            if (el.classList.contains('btn-solve')) performCalc();
        });
    };
    
    const appendToDisplay = value => {
        const lastDigit = display.value.slice(-1);
        autoScroll();
            
        //prevent from putting a new operator following an existing operator
        const isLastCharOperator = ['+', '-', '×', '÷'].includes(lastDigit);
        if (isLastCharOperator && ['+', '-', '×', '÷'].includes(value)) {
            deleteLastChar();
        }
        display.value += value;
    } 
    
    const clearDisplay = () => display.value = '';
    const deleteLastChar = () => display.value = display.value.slice(0, -1);
    const autoScroll = () => display.scrollLeft = display.scrollWidth;
    
    const performCalc = () => {
        const result = eval(display.value.replace("÷", "/").replace("×", "*"));
        
        try {
            if (!result) {
                alert('Invalid Operation!');
                return;
            }
            display.value = result;
        } catch (error) {
            alert('Invalid Operation!');
            return;
        }
    };
    
    pressEnter = () => {
        addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                performCalc();
                display.focus();
            } 
        });
    };
    
    pressBackspace = () => {
        addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') {
                clearDisplay();
                display.focus();
            } 
        });
    };
    
    buttonClick();
    pressEnter();
    pressBackspace();
})();
