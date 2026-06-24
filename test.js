const assert = require('assert');

// Smoke tests for adil-cicd-project build pipeline
function multiply(a, b) {
  return a * b;
}

function banner() {
  return 'Hello from Adil CI/CD Pipeline!';
}

assert.strictEqual(multiply(3, 4), 12, 'multiply() should return the product');
assert.ok(banner().includes('Adil'), 'banner should mention Adil');

console.log('All tests passed for adil-cicd-project');
process.exit(0);
