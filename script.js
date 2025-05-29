const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+"];

let output = "";

// Calculate based on button clicked
const calculate = (btnValue) => {
  // Focus not needed since input is now readonly
  if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else if (btnValue === "=") {
    try {
      // Replace % with /100 for percentage calculations
      const expression = output.replaceAll("%", "/100");
      output = eval(expression);
    } catch (error) {
      output = "Error";
    }
  } else {
    const lastChar = output[output.length - 1];

    // Don't allow starting with an operator
    if (output === "" && specialChars.includes(btnValue)) return;

    // Don't allow two operators in a row
    if (specialChars.includes(lastChar) && specialChars.includes(btnValue)) return;

    output += btnValue;
  }

  display.value = output;
};

// Event listeners for all buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.dataset.value;
    calculate(value);
  });
});
