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
