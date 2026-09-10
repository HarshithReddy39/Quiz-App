const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');

const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmError = document.getElementById('confirm-error');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

// Show / hide password — wired to every toggle button on the page
document.querySelectorAll('.toggle-password').forEach((btn) => {
    const target = document.getElementById(btn.dataset.target);
    const eyeIcon = btn.querySelector('.icon-eye');
    const eyeOffIcon = btn.querySelector('.icon-eye-off');

    btn.addEventListener('click', () => {
        const isPassword = target.type === 'password';
        target.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-pressed', String(isPassword));
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        eyeIcon.hidden = isPassword;
        eyeOffIcon.hidden = !isPassword;
    });
});

function setFieldError(input, errorEl, message) {
    errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function validate(users) {
    let valid = true;

    if (usernameInput.value.trim().length < 3) {
        setFieldError(usernameInput, usernameError, 'Username needs at least 3 characters.');
        valid = false;
    } else {
        setFieldError(usernameInput, usernameError, '');
    }

    if (!emailInput.checkValidity() || !emailInput.value.trim()) {
        setFieldError(emailInput, emailError, 'Enter a valid email address.');
        valid = false;
    } else {
        setFieldError(emailInput, emailError, '');
    }

    if (passwordInput.value.length < 8) {
        setFieldError(passwordInput, passwordError, 'Password needs at least 8 characters.');
        valid = false;
    } else {
        setFieldError(passwordInput, passwordError, '');
    }

    if (confirmInput.value !== passwordInput.value) {
        setFieldError(confirmInput, confirmError, 'Passwords do not match.');
        valid = false;
    } else {
        setFieldError(confirmInput, confirmError, '');
    }

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const isDuplicate = users.some((user) => user.username === username || user.email === email);

    if (isDuplicate && valid) {
        formError.textContent = 'An account with that username or email already exists.';
        valid = false;
    }

    return valid;
}

// Clear a field's error as soon as the person edits it
[usernameInput, emailInput, passwordInput, confirmInput].forEach((input) => {
    input.addEventListener('input', () => {
        formError.textContent = '';
        if (input === usernameInput) setFieldError(usernameInput, usernameError, '');
        if (input === emailInput) setFieldError(emailInput, emailError, '');
        if (input === passwordInput) setFieldError(passwordInput, passwordError, '');
        if (input === confirmInput) setFieldError(confirmInput, confirmError, '');
    });
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    formError.textContent = '';

    const users = getUsers();
    if (!validate(users)) return;

    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');

 const newUser = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    window.location.href = 'login.html';
});
