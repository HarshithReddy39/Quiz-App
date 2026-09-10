const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('togglePassword');
const eyeIcon = toggleBtn.querySelector('.icon-eye');
const eyeOffIcon = toggleBtn.querySelector('.icon-eye-off');

// Show / hide password
toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.setAttribute('aria-pressed', String(isPassword));
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    eyeIcon.hidden = isPassword;
    eyeOffIcon.hidden = !isPassword;
});

function setFieldError(input, errorEl, message) {
    errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validate() {
    let valid = true;

    if (!emailInput.value.trim()) {
        setFieldError(emailInput, emailError, 'Enter your email.');
        valid = false;
    } else if (!emailInput.checkValidity()) {
        setFieldError(emailInput, emailError, 'Enter a valid email address.');
        valid = false;
    } else {
        setFieldError(emailInput, emailError, '');
    }

    if (!passwordInput.value) {
        setFieldError(passwordInput, passwordError, 'Enter your password.');
        valid = false;
    } else {
        setFieldError(passwordInput, passwordError, '');
    }

    return valid;
}

// Clear a field's error as soon as the person fixes it
[emailInput, passwordInput].forEach((input) => {
    input.addEventListener('input', () => {
        if (input === emailInput) setFieldError(emailInput, emailError, '');
        if (input === passwordInput) setFieldError(passwordInput, passwordError, '');
        formError.textContent = '';
    });
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formError.textContent = '';

    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');

    try {
        // Replace this with your real auth endpoint.
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailInput.value.trim(),
                password: passwordInput.value,
                remember: document.getElementById('remember').checked
            })
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || 'Incorrect email or password.');
        }

        window.location.href = 'dashboard.html';
    } catch (err) {
        formError.textContent = err.message || 'Something went wrong. Try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
    }
});
