const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let server;

function calculateFib(n) {
  if (n <= 1) return n;
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

app.get("/fib", (req, res) => {
  const n = Number(req.params.n);

  if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
    return res
      .status(400)
      .json({ エラー: "無効な入力です。0以上の整数を入力してください。" });
  }

  const result = calculateFib(n);
  res.json({ n, フィボナッチ数: result });
});

app.use((req, res) => {
  res.status(404).json({ エラー: "ページが見つかりません" });
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

if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = { app, startServer, stopServer };
