document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const strengthMeter = document.getElementById("strength-meter");
    const strengthText = document.getElementById("strength-text");
    const recommendations = document.getElementById("recommendations");
    const togglePassword = document.getElementById("togglePassword");
    const generatePasswordBtn = document.getElementById("generatePassword");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const generateCustomPasswordBtn = document.getElementById("generateCustomPassword");

    passwordInput.addEventListener("input", updateStrengthMeter);
    togglePassword.addEventListener("click", togglePasswordVisibility);
    generatePasswordBtn.addEventListener("click", generateStrongPassword);
    generateCustomPasswordBtn.addEventListener("click", generateCustomPassword);
    darkModeToggle.addEventListener("click", toggleDarkMode);

    const weakPasswords = ["123456", "password", "qwerty", "111111", "letmein", "admin", "welcome"];

    // Load dark mode preference from localStorage
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Functions
    function updateStrengthMeter() {
        const password = passwordInput.value;
        const strength = analyzePassword(password);

        strengthMeter.className = "";
        recommendations.innerHTML = "";

        if (weakPasswords.includes(password)) {
            strengthMeter.classList.add("weak");
            strengthText.innerText = "Very Weak ❌";
            recommendations.innerHTML = "⚠️ This password is commonly used. Avoid predictable passwords!";
            return;
        }

        if (strength.score === 1) {
            strengthMeter.classList.add("weak");
            strengthText.innerText = "Weak ❌";
            recommendations.innerHTML = "❌ Use at least 8 characters.<br>❌ Include uppercase, lowercase, numbers, and symbols.";
        } else if (strength.score === 2) {
            strengthMeter.classList.add("medium");
            strengthText.innerText = "Medium ⚠️";
            recommendations.innerHTML = "⚠️ Consider making your password longer.<br>⚠️ Use a mix of characters.";
        } else if (strength.score === 3) {
            strengthMeter.classList.add("strong");
            strengthText.innerText = "Strong 💪";
            recommendations.innerHTML = "✅ Great password!";
        }
    }

    function analyzePassword(password) {
        let entropy = calculateEntropy(password);
        let score = 0;

        if (entropy > 28) score = 3; // Strong
        else if (entropy > 20) score = 2; // Medium
        else if (entropy > 10) score = 1; // Weak
        else score = 0; // Very Weak

        return { score, entropy };
    }

    function calculateEntropy(password) {
        let frequency = {};
        for (let char of password) {
            frequency[char] = (frequency[char] || 0) + 1;
        }

        let entropy = 0;
        let length = password.length;
        
        for (let char in frequency) {
            let probability = frequency[char] / length;
            entropy -= probability * Math.log2(probability);
        }

        return entropy;
    }

    function togglePasswordVisibility() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    function generateStrongPassword() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        passwordInput.value = password;
        updateStrengthMeter();
        saveGeneratedPassword(password);
    }

    function saveGeneratedPassword(password) {
        let savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
        
        if (!savedPasswords.includes(password)) {
            savedPasswords.push(password);
            localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords));
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    }

    function generateCustomPassword() {
        let length = document.getElementById("length").value;
        let useNumbers = document.getElementById("useNumbers").checked;
        let useSymbols = document.getElementById("useSymbols").checked;
        let useUppercase = document.getElementById("useUppercase").checked;

        passwordInput.value = generateCustomPasswordLogic(length, useNumbers, useSymbols, useUppercase);
        updateStrengthMeter();
    }

    function generateCustomPasswordLogic(length, useNumbers, useSymbols, useUppercase) {
        let lowerChars = "abcdefghijklmnopqrstuvwxyz";
        let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let numbers = "0123456789";
        let symbols = "!@#$%^&*()_+";
        
        let chars = lowerChars;
        if (useNumbers) chars += numbers;
        if (useSymbols) chars += symbols;
        if (useUppercase) chars += upperChars;

        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return password;
    }
});
