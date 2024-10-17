document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const errorbox = document.querySelector("#error-msg");
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
  const btnToggleDarkMode = document.querySelector(".btn-toggle-dark-mode");

  display.focus();

  const appendToDisplay = (value) => {
    const lastDigit = display.value.slice(-1);
    const isLastCharOperator = ["+", "-", "×", "÷"].includes(lastDigit);
    if (isLastCharOperator && ["+", "-", "×", "÷"].includes(value)) {
      deleteLastChar();
    }
    display.value += value;
    autoScroll();
  };

  const clearDisplay = () => {
    clearErrorMsg();
    display.value = "";
    if (!isMobileDevice) display.focus();
  };

  const deleteLastChar = () => (display.value = display.value.slice(0, -1));
  const autoScroll = () => (display.scrollLeft = display.scrollWidth);
  const clearErrorMsg = () => {
    errorbox.style.display = "none";
    errorbox.innerText = "";
  };
  const performCalc = () => {
    const errorMessage = "Malformed expression";
    try {
      const result = eval(display.value.replace(/÷/g, "/").replace(/×/g, "*"));
      if (result === undefined || result === null || isNaN(result)) {
        errorbox.style.display = "block";
        errorbox.innerText = errorMessage;
      } else {
        clearErrorMsg();
        display.value = result;
      }
    } catch (error) {
      errorbox.style.display = "block";
      errorbox.innerText = errorMessage;
      console.warn("An error occurred: ", error);
    }
  };

  display.addEventListener("blur", () => {
    if (!isMobileDevice) {
      setTimeout(() => {
        autoScroll();
        display.focus();
      }, 0);
    }
  });

  const handleButtonClick = () => {
    document.querySelector("#keys").addEventListener("click", (event) => {
      const el = event.target.closest(
        ".btn, .btn-clear, .btn-delete, .btn-solve, .btn-toggle-dark-mode"
      );
      if (!el) return;

      if (el.classList.contains("btn")) appendToDisplay(el.innerText);
      if (el.classList.contains("btn-clear")) clearDisplay();
      if (el.classList.contains("btn-delete")) deleteLastChar();
      if (el.classList.contains("btn-solve")) performCalc();
      if (el.classList.contains("btn-toggle-dark-mode")) toggleDarkMode();
    });
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  handleButtonClick();
});
