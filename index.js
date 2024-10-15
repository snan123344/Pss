const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve the terminal interface
app.get('/', (req, res) => {
  res.send(`
    <h1>Basin Linux Terminal</h1>
    <pre id="output"></pre>
    <input id="command" type="text" placeholder="Type your command here" autofocus />
    <script>
      const output = document.getElementById('output');
      const commandInput = document.getElementById('command');
      commandInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          const command = commandInput.value;
          fetch('/execute', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cmd: command })
          })
          .then(response => response.text())
          .then(data => {
            output.innerHTML += '> ' + command + '\\n' + data + '\\n';
            commandInput.value = '';
          });
        }
      });
    </script>
  `);
});

// Execute a command in the Basin Linux container
app.post('/execute', (req, res) => {
  const command = req.body.cmd;

  // Run the Docker command
  exec(`docker run --rm ubuntu:20.04 ${command}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr || error.message);
    }
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
