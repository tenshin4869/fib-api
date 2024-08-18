const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

function calculateFib(n) {
  if (n <= 1) return n;
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

// console.log('フィボナッチ(0):', calculateFib(0));
// console.log('フィボナッチ(1):', calculateFib(1));
// console.log('フィボナッチ(10):', calculateFib(10));

app.get("/fibonacci/:n", (req, res) => {
  const n = parseInt(req.params.n);

  if (isNaN(n) || n < 0) {
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
