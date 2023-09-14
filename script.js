const lengthslider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;':,./<>?"
}

const generatePassword = () => {
    let staticPassword = "";
    randomPassword = "";
    excludeDuplicate = false;
    passLength = lengthslider.value;

    options.forEach(option  => {
        if(option.checked) {
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") {
                staticPassword += ` ${staticPassword} `;
            }else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * 
        staticPassword.length)];
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) | randomChar == " " ?
             randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}

const updatePasswodIndicator = () => {
    passIndicator.id = lengthslider.value <= 8 ? "weak" : lengthslider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthslider.value;
    generatePassword();
    updatePasswodIndicator();
}
    updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#2ecc71";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#333";
    }, 2000);
}

copyIcon.addEventListener("click", copyPassword);
lengthslider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
