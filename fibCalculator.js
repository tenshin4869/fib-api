function calculateFib(n) {
  if (n <= 1) return BigInt(n);
  let a = BigInt(0),
    b = BigInt(1);
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

module.exports = calculateFib;
