const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "1234567890";
const symbolSet = "~!@#$%^&*()_+/";

const passBox = document.getElementById("pass-box");
const copiedPass = document.getElementById("copied-password");
const totalChar = document.getElementById("total-char");
const upperInput = document.getElementById("upper-case");
const lowerInput = document.getElementById("lower-case");
const symbolInput = document.getElementById("symbols");
const numberInput = document.getElementById("numbers");

const getRandomData = (dataSet) => {
  return dataSet[Math.floor(Math.random() * dataSet.length)];
};

const generatePassword = (password = "") => {
  if (
    numberInput.checked == false &&
    symbolInput.checked == false &&
    lowerInput.checked == false &&
    upperInput.checked == false
  ) {
    alert("Please select at least one option.");
    return;
  }
  if (upperInput.checked) {
    password = password + getRandomData(upperSet);
  }
  if (lowerInput.checked) {
    password = password + getRandomData(lowerSet);
  }
  if (symbolInput.checked) {
    password = password + getRandomData(symbolSet);
  }
  if (numberInput.checked) {
    password = password + getRandomData(numberSet);
  }
  if (totalChar.value > password.length) {
    return generatePassword(password);
  }
  passBox.innerText = truncateString(password, totalChar.value);
};

// Truncate the password to required value
function truncateString(str, num) {
  if (str.length > num) {
    let newStr = str.substring(0, num);
    return newStr;
  } else {
    return str;
  }
}

// Max 30 input value
function limitInput() {
  var inputElement = document.getElementById("total-char");
  var currentValue = parseInt(inputElement.value);
  var maxValue = parseInt(inputElement.max);

  if (currentValue > maxValue) {
    inputElement.value = maxValue;
  }
}
document.getElementById("generate-btn").addEventListener("click", function () {
  generatePassword();
});
document.getElementById("copy-btn").addEventListener("click", function () {
  var copyText = passBox.innerText; // Get the text from passBox
  if (copyText === "Select Option & Click Generate") {
    alert("Please generate a password before copying.");
    return;
  }
  // Copy the text to the clipboard
  navigator.clipboard.writeText(copyText).then(function () {
    copiedPass.innerText = `"${copyText}" Copied to Clipboard`;
  });

  setTimeout(function () {
    copiedPass.innerText = "";
  }, 1500);
});
