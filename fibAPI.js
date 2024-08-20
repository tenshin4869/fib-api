const express = require("express");
const config = require("./config");

const app = express();
const port = config.port;

let server;

function calculateFib(n) {
  if (n <= 1) return BigInt(n);
  let a = BigInt(0),
    b = BigInt(1);
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

app.get("/fib", (req, res) => {
  const n = parseFloat(req.query.n);

  if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
    return res.status(400).json({ status: 400, message: "Bad request." });
  }

  const result = calculateFib(BigInt(n));
  res.json({ result: result.toString() });
});

app.use((req, res) => {
  res.status(404).json({ status: 404, message: "ページが見つかりません" });
});

function startServer() {
  server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  return server;
}

function stopServer() {
  if (server) {
    server.close();
  }
}

if (config.nodeEnv !== "test") {
  startServer();
}

module.exports = { app, startServer, stopServer };
