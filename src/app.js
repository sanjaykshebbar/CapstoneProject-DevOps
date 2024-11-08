const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname)));

// Serve the index.html file as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the login-success.html file when accessing /login-success.html
app.get('/login-success.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login-success.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
