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

// Client-side hash so we at least never write a plaintext password to
// localStorage. NOTE: this is NOT real security — anyone can read the
// hashing code and the stored hash is unsalted-per-user in
