const users = [
    { username: "maire", password: "Password123", type: "client" },
    { username: "musicien", password: "Password123", type: "artiste" }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.type === "client") {
            window.location.href = `maire.html?username=${user.username}`;
        } else if (user.type === "artiste") {
            window.location.href = `artiste.html?username=${user.username}`;
        }
    } else {
        alert("Invalid username or password");
    }
});
