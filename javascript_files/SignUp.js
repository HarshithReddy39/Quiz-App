document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Stop the page from reloading

    // 1. Get values from the form
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 2. Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // 3. Get existing users from localStorage (acting as our database)
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 4. Check for duplicate users (username or email)
    const isDuplicate = users.some(user => user.username === username || user.email === email);

    if (isDuplicate) {
        // Popup telling user they already exist
        alert("User already exists!");
        return;
    }

    // 5. Create new user object and save
    const newUser = { username, email, password };
    users.push(newUser);

    // Save back to the "database" (localStorage)
    localStorage.setItem('users', JSON.stringify(users));

    // 6. Success Popup
    // 6. Success Popup and Redirect
    alert("User created successfully!");
    document.getElementById('signupForm').reset();
    window.location.href = 'login.html'; // Redirects to login page

    // Optional: Automatically redirect them to the login page after they click 'OK' on the alert
    // window.location.href = 'login.html';
});