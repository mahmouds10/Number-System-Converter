//-------------- Variables declaration --------------//
var userInput = document.getElementById("userInput");
var output = document.getElementById("output");
var inputSelect = document.getElementById("inputSelect");
var outputSelect = document.getElementById("outputSelect");
var convertBtn = document.getElementById("convert");
var clearBtn = document.getElementById("clear");
var errorFrame = document.getElementById("errorFrame");
var undefinedBaseError = document.getElementById("undefinedBase");
var undefinedTargetError = document.getElementById("undefinedTarget");
var sameOptionError = document.getElementById("sameOption");
var closeBtn = Array.from(document.querySelectorAll(".closeBtn"));
var converFromOption;
var convertToOption;
// -------------------------------------------------- //

// ---- Identify the base and the target system ---- //
inputSelect.addEventListener("change", function () {
  converFromOption = inputSelect.value;
});
outputSelect.addEventListener("change", function () {
  convertToOption = outputSelect.value;
});
// ------------------------------------------------ //

//---------------- Close the error frame ----------------//
for (var i in closeBtn) {
  closeBtn[i].addEventListener("click", function () {
    errorFrame.style.display = "none";
    undefinedBaseError.style.display = "none";
    undefinedTargetError.style.display = "none";
    sameOptionError.style.display = "none";
    console.log("closed");
  });
}
// ---------------------------------------------------- //

// -------- Validate when click convert button -------- //
convertBtn.addEventListener("click", function () {
  validWhenClick();
  if (validWhenClick) {
    convert(userInput.value);
  }
});
// --------------------------------------------------- //

function validWhenClick() {
  if (converFromOption == undefined) {
    errorFrame.style.display = "flex";
    undefinedBaseError.style.display = "block";
  } else if (convertToOption == undefined) {
    errorFrame.style.display = "flex";
    undefinedTargetError.style.display = "block";
  } else if (converFromOption == convertToOption) {
    errorFrame.style.display = "flex";
    sameOptionError.style.display = "block";
  } else {
    return true;
  }
}

userInput.addEventListener("keyup", function () {
  validateWhileTyping();
  if (userInput.value == "") {
    userInput.classList.remove("is-valid");
    userInput.classList.remove("is-invalid");
  }
});
// --------------  Validate while typing -------------- //
function validateWhileTyping() {
  if (inputSelect.value == "binary") {
    if (validateBinary()) {
      userInput.classList.add("is-valid");
      userInput.classList.remove("is-invalid");
    } else {
      userInput.classList.remove("is-valid");
      userInput.classList.add("is-invalid");
    }
  } else if (inputSelect.value == "octal") {
    if (validateOctal()) {
      userInput.classList.add("is-valid");
      userInput.classList.remove("is-invalid");
    } else {
      userInput.classList.remove("is-valid");
      userInput.classList.add("is-invalid");
    }
  } else if (inputSelect.value == "decimal") {
    if (validateDecimal()) {
      userInput.classList.add("is-valid");
      userInput.classList.remove("is-invalid");
    } else {
      userInput.classList.remove("is-valid");
      userInput.classList.add("is-invalid");
    }
  } else if (inputSelect.value == "hexa") {
    if (validateHexa()) {
      userInput.classList.add("is-valid");
      userInput.classList.remove("is-invalid");
    } else {
      userInput.classList.remove("is-valid");
      userInput.classList.add("is-invalid");
    }
  }
}
// ----------------------------------------------------- //

function validateBinary() {
  const binaryRegex = /^[01]+$/;
  return binaryRegex.test(userInput.value);
}
function validateOctal() {
  const octalRegex = /^[0-7]+$/;
  return octalRegex.test(userInput.value);
}
function validateDecimal() {
  const decimalRegex = /^\d+$/;
  return decimalRegex.test(userInput.value);
}
function validateHexa() {
  const hexRegex = /^[0-9A-Fa-f]+$/;
  return hexRegex.test(userInput.value);
}

// Clrear the output when change the target system //
outputSelect.addEventListener("change", function () {
  output.value = "";
});
// ---------------------------------------------- //

// ----------------- Clear the form ----------------- //
clearBtn.addEventListener("click", function () {
  clearForm();
});
// -------------------------------------------------- //

function clearForm() {
  userInput.value = "";
  output.value = "";
}
function convert(input) {
  // ------------------------- convert from binary ------------------------ //
  if (inputSelect.value == "binary" && outputSelect.value == "octal") {
    printResult(convertBtoO(input));
  } else if (inputSelect.value == "binary" && outputSelect.value == "decimal") {
    printResult(convertBtoD(input));
  } else if (inputSelect.value == "binary" && outputSelect.value == "hexa") {
    printResult(convertBtoH(input));
  }
  //-------------------------------------------------------------------------//

  // ------------------------- convert from octal ------------------------ //
  else if (inputSelect.value == "octal" && outputSelect.value == "binary") {
    printResult(convertOtoB(input));
  } else if (inputSelect.value == "octal" && outputSelect.value == "decimal") {
    printResult(convertOtoD(input));
  } else if (inputSelect.value == "octal" && outputSelect.value == "hexa") {
    printResult(convertOtoH(input));
  }
  //   ------------------------------------------------------------------- //

  // ------------------------ converty from decimal ------------------------ //
  else if (inputSelect.value == "decimal" && outputSelect.value == "binary") {
    printResult(convertDtoB(input));
  } else if (inputSelect.value == "decimal" && outputSelect.value == "octal") {
    printResult(convertDtoO(input));
  } else if (inputSelect.value == "decimal" && outputSelect.value == "hexa") {
    printResult(convertDtoH(input));
  }
  // --------------------------------------------------------------------- //

  // ------------------------ converty from hexa ------------------------ //
  else if (inputSelect.value == "hexa" && outputSelect.value == "binary") {
    printResult(convertHtoB(input));
  } else if (inputSelect.value == "hexa" && outputSelect.value == "octal") {
    printResult(convertHtoO(input));
  } else if (inputSelect.value == "hexa" && outputSelect.value == "decimal") {
    printResult(convertHtoD(input));
  }
  // --------------------------------------------------------------------- //
}

function convertBtoO(input) {
  let decimal = convertBtoD(input);
  return convertDtoO(decimal);
}
function convertBtoD(input) {
  let decimal = 0;
  const reversedBinary = input.split("").reverse().join("");
  for (let i = 0; i < reversedBinary.length; i++) {
    if (reversedBinary[i] === "1") {
      decimal += Math.pow(2, i);
    }
  }
  return decimal;
}
function convertBtoH(input) {
  let decimal = convertBtoD(input);
  return convertDtoH(decimal);
}

function convertOtoB(input) {
  let decimal = convertOtoD(input);
  return convertDtoB(decimal);
}
function convertOtoD(input) {
  let decimal = 0;
  const reversedOctal = input.split("").reverse().join("");

  for (let i = 0; i < reversedOctal.length; i++) {
    decimal += parseInt(reversedOctal[i]) * Math.pow(8, i);
  }

  return decimal;
}
function convertOtoH(input) {
  let decimal = convertOtoD(input);
  return convertDtoH(decimal);
}

function convertDtoB(input) {
  if (input === 0) {
    return "0";
  }

  let binary = "";
  while (input > 0) {
    binary = (input % 2) + binary;
    input = Math.floor(input / 2);
  }

  return binary;
}
function convertDtoO(input) {
  let octal = "";
  while (input > 0) {
    octal = (input % 8) + octal;
    input = Math.floor(input / 8);
  }
  return octal;
}
function convertDtoH(input) {
  const hexDigits = "0123456789ABCDEF";
  let hexadecimal = "";

  while (input > 0) {
    const remainder = input % 16;
    hexadecimal = hexDigits[remainder] + hexadecimal;
    input = Math.floor(input / 16);
  }

  return hexadecimal || "0";
}

function convertHtoB(input) {
  let decimal = convertHtoD(input);
  return convertDtoB(decimal);
}
function convertHtoO(input) {
  let decimal = convertHtoD(input);
  return convertDtoO(decimal);
}
function convertHtoD(input) {
  const hexDigits = "0123456789ABCDEF";
  let decimal = 0;

  const reversedHex = input.toUpperCase().split("").reverse().join("");

  for (let i = 0; i < reversedHex.length; i++) {
    const digit = hexDigits.indexOf(reversedHex[i]);
    decimal += digit * Math.pow(16, i);
  }

  return decimal;
}

function printResult(ressult) {
  output.value = ressult;
}
