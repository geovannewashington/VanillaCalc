document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('#display');
    const errorbox = document.querySelector('#error-msg');
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

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

    const clearDisplay = () => { 
        clearErrorMsg();
        display.value = '';
        display.focus();
    };

    const deleteLastChar = () => display.value = display.value.slice(0, -1);
    const autoScroll = () => display.scrollLeft = display.scrollWidth;
    const clearErrorMsg = () => {
        errorbox.style.display = 'none';
        errorbox.innerText = '';
    }
    const performCalc = () => {
        const errorMessage = 'Malformed expression';
        try {
            const result = eval(display.value.replace(/÷/g, "/").replace(/×/g, "*"));

            if (result === undefined || result === null || isNaN(result) || !result) {
                playErrorSound();
                errorbox.style.display = 'block';
                errorbox.innerText = errorMessage;
            }
            playSucessSound();
            clearErrorMsg();
            display.value = result;
        } catch (error) {
            playErrorSound();
            errorbox.style.display = 'block';
            errorbox.innerText = errorMessage;
            console.warn('An error ocurred: ', error);
        }
    };

    //locking the display focus only in pc
    display.addEventListener('blur', () => {
        if (!isMobileDevice) {
            setTimeout(() => {
                autoScroll();
                display.focus();
            }, 0);
        }
    });

    const handlePressEnter = () => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performCalc();
                display.focus();
            }
        });
    };

    const handleEscPress = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') clearDisplay();
        });
    }

    const playClickSound = () => { 
        const click = new Audio('../../audio/click.mp3');
        click.play();
    };

    const playErrorSound = () => {
        const error = new Audio('../../audio/error.mp3');
        error.play();
    }

    const playSucessSound = () => {
        const sucess = new Audio('../../audio/sucess.mp3');
        sucess.play();
    }

    const handleButtonClick = () => {
        document.querySelector('#keys').addEventListener('click', (event) => {
            playClickSound();
            const el = event.target.closest('.btn, .btn-clear, .btn-delete, .btn-solve');
            if (!el) return;

            if (el.classList.contains('btn')) appendToDisplay(el.innerText);
            if (el.classList.contains('btn-clear')) clearDisplay();
            if (el.classList.contains('btn-delete')) deleteLastChar();
            if (el.classList.contains('btn-solve')) performCalc();
        });
    };

    handlePressEnter();
    handleButtonClick();
    handleEscPress();
});
