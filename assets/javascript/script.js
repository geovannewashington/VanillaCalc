document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('#display');
    display.focus();

    const appendToDisplay = value => {
        const lastDigit = display.value.slice(-1);
        
        const isLastCharOperator = ['+', '-', '×', '÷'].includes(lastDigit);
        if (isLastCharOperator && ['+', '-', '×', '÷'].includes(value)) {
            deleteLastChar();
        }
        display.value += value;
        autoScroll();
    };

    const clearDisplay = () => display.value = '';
    const deleteLastChar = () => display.value = display.value.slice(0, -1);
    const autoScroll = () => display.scrollLeft = display.scrollWidth;

    const performCalc = () => {
        try {
            const result = eval(display.value.replace(/÷/g, "/").replace(/×/g, "*"));
            if (result === undefined || result === null || isNaN(result)) {
                alert('Invalid Operation!');
                return;
            }
            display.value = result;
        } catch (error) {
            alert('Invalid Operation!');
        }
    };

    //locking the display focus
    display.addEventListener('blur', () => {
        setTimeout(() => {
            display.focus();
        }, 0);
    });

    const pressEnter = () => {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                performCalc();
                display.focus();
            }
        });
    };

    const handleButtonClick = () => {
        document.querySelector('#keys').addEventListener('click', (event) => {
            const el = event.target.closest('.btn, .btn-clear, .btn-delete, .btn-solve');
            if (!el) return;

            if (el.classList.contains('btn')) appendToDisplay(el.innerText);
            if (el.classList.contains('btn-clear')) clearDisplay();
            if (el.classList.contains('btn-delete')) deleteLastChar();
            if (el.classList.contains('btn-solve')) performCalc();
        });
    };

    pressEnter();
    handleButtonClick();
});
