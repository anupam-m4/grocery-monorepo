import path from 'path';
import { fileURLToPath } from 'url';

// Convert the current module URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory of the current file (i.e., the backend root)
const __dirname = path.dirname(__filename);

// Construct the absolute path to your middlewares directory
const absolutePath = path.join(__dirname, 'middlewares', 'isAuth.js');

console.log('Backend Root Dir:', __dirname);
console.log('Target Path:', absolutePath);
// Add a simple check
try {
  // Try dynamic import to check path validity
  import(absolutePath).then(() => {
      console.log('SUCCESS: Module found at absolute path.');
  }).catch((e) => {
      console.error('FAILURE: Module NOT found at absolute path:', e.message);
  });
} catch (e) {
  console.error('Initial import check failed:', e.message);
}

// Run this file using: node path_test.js
