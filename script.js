let weakPasswords = [];

fetch('weak-passwords.txt')
    .then(response => response.text())
    .then(text => {
        weakPasswords = text.split("\n").map(p => p.trim());
    });

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
