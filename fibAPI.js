const express = require("express");
const config = require("./config");
const calculateFib = require("./fibCalculator");

const app = express();
const port = config.port;

let server;

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
