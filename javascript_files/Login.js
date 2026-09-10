document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop the page from reloading

    // 1. Get values from the form
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // 2. Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 3. Find if a user matches the entered email and password
    const validUser = users.find(user => user.email === email && user.password === password);

    // 4. Show alert based on whether the user was found
    if (validUser) {
        alert("Login successful!");
        // Future step: redirect to the actual quiz page
        // window.location.href = 'quiz.html'; 
    } else {
        alert("Invalid email or password. Please try again.");
    }
});