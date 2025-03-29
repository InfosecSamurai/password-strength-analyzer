document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const strengthMeter = document.getElementById("strength-meter");
    const strengthText = document.getElementById("strength-text");
    const recommendations = document.getElementById("recommendations");
    const togglePassword = document.getElementById("togglePassword");

    passwordInput.addEventListener("input", updateStrengthMeter);
    togglePassword.addEventListener("click", togglePasswordVisibility);

    function updateStrengthMeter() {
        const password = passwordInput.value;
        const strength = analyzePassword(password);

        strengthMeter.className = "";
        recommendations.innerHTML = "";

        if (strength.score === 1) {
            strengthMeter.classList.add("weak");
            strengthText.innerText = "Weak";
            recommendations.innerHTML = "❌ Use at least 8 characters.<br>❌ Include uppercase, lowercase, numbers, and symbols.";
        } else if (strength.score === 2) {
            strengthMeter.classList.add("medium");
            strengthText.innerText = "Medium";
            recommendations.innerHTML = "⚠️ Consider making your password longer.<br>⚠️ Use a mix of characters.";
        } else if (strength.score === 3) {
            strengthMeter.classList.add("strong");
            strengthText.innerText = "Strong 💪";
            recommendations.innerHTML = "✅ Great password!";
        }
    }

    function analyzePassword(password) {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return { score };
    }

    function togglePasswordVisibility() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
});
