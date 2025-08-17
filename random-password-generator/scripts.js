const generateBtn = document.getElementById("generateBtn");
const generatedPass = document.getElementById("generatedPass");
const passLengthInput = document.getElementById("passLength"); 
const copyBtn = document.getElementById("copyBtn");
const msg = document.getElementById("msg");

generateBtn.addEventListener("click", () => {
  const useUppercase = document.getElementById("uppercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSpecial = document.getElementById("specialChars").checked;

  // Read, sanitize, and cap pass length
  let passLength = parseInt(passLengthInput.value.replace(/[^0-9]/g, ""), 10) || 12;
  passLength = Math.min(Math.max(passLength, 1), 32);

  const numbers = [...Array(10).keys()].map(String);
  const lowercase = [..."abcdefghijklmnopqrstuvwxyz"];
  const uppercase = lowercase.map(l => l.toUpperCase());
  const specialChars = [..."!@#$%^&*()_+-=[]{}|;:',.<>?/`~"];

  let pool = [];
  let password = [];

  if (useUppercase) {
    const char = uppercase[Math.floor(Math.random() * uppercase.length)];
    password.push(char);
    pool = pool.concat(uppercase);
  }
  if (useNumbers) {
    const char = numbers[Math.floor(Math.random() * numbers.length)];
    password.push(char);
    pool = pool.concat(numbers);
  }
  if (useSpecial) {
    const char = specialChars[Math.floor(Math.random() * specialChars.length)];
    password.push(char);
    pool = pool.concat(specialChars);
  }

  pool = pool.concat(lowercase);

  while (password.length < passLength) {
    const char = pool[Math.floor(Math.random() * pool.length)];
    password.push(char);
  }

  password = password.sort(() => Math.random() - 0.5);
  const finalPassword = password.join("");
  generatedPass.value = finalPassword;
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(generatedPass.value)
    .then(() => {
        msg.innerText = "Copied!";
        setTimeout(() => {
            msg.innerText = ""; 
        }, 2000);
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
});

