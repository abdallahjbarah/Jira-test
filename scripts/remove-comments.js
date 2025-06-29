const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

const EXCLUDE_DIRS = [
  'node_modules',
  '.next',
  'build',
  'dist',
  '.git',
  'scripts',
  'public',
];

const EXCLUDE_FILES = [
  'next.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  '.eslintrc.json',
  '.prettierrc.json',
];

function removeComments(code) {
  let result = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const char = code[i];
    const nextChar = code[i + 1];

    // Handle single quotes
    if (char === "'" && (i === 0 || code[i - 1] !== '\\')) {
      result += char;
      i++;
      while (i < len) {
        result += code[i];
        if (code[i] === "'" && code[i - 1] !== '\\') {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    // Handle double quotes
    if (char === '"' && (i === 0 || code[i - 1] !== '\\')) {
      result += char;
      i++;
      while (i < len) {
        result += code[i];
        if (code[i] === '"' && code[i - 1] !== '\\') {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    // Handle template literals
    if (char === '`' && (i === 0 || code[i - 1] !== '\\')) {
      result += char;
      i++;
      while (i < len) {
        result += code[i];
        if (code[i] === '`' && code[i - 1] !== '\\') {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    // Handle JSX comments {/* ... */}
    if (
      char === '{' &&
      i + 2 < len &&
      code[i + 1] === '/' &&
      code[i + 2] === '*'
    ) {
      i += 3; // Skip {/*
      let commentLines = 0;

      // Find the end of JSX comment */}
      while (i < len - 2) {
        if (code[i] === '\n') {
          commentLines++;
        }
        if (code[i] === '*' && code[i + 1] === '/' && code[i + 2] === '}') {
          i += 3; // Skip */}
          break;
        }
        i++;
      }

      // Preserve line structure
      result += '\n'.repeat(commentLines);
      continue;
    }

    // Handle single-line comments //
    if (char === '/' && nextChar === '/') {
      while (i < len && code[i] !== '\n') {
        i++;
      }
      if (i < len && code[i] === '\n') {
        result += '\n';
        i++;
      }
      continue;
    }

    // Handle multi-line comments /* ... */
    if (char === '/' && nextChar === '*') {
      i += 2;
      let commentLines = 0;

      while (i < len - 1) {
        if (code[i] === '\n') {
          commentLines++;
        }
        if (code[i] === '*' && code[i + 1] === '/') {
          i += 2;
          break;
        }
        i++;
      }

      result += '\n'.repeat(commentLines);
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

function cleanupEmptyJSXExpressions(code) {
  // Remove empty JSX expressions {} that are on their own line
  code = code.replace(/^\s*\{\}\s*$/gm, '');

  // Remove JSX comment blocks that might be left
  code = code.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');

  // Clean up multiple consecutive empty lines
  code = code.replace(/\n\s*\n\s*\n+/g, '\n\n');

  // Remove trailing whitespace on lines
  code = code.replace(/[ \t]+$/gm, '');

  return code;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let processed = removeComments(content);

    // Clean up JSX-specific remnants
    processed = cleanupEmptyJSXExpressions(processed);

    // Remove JSDoc comments
    processed = processed.replace(/\/\*\*[\s\S]*?\*\//g, '');

    // Final cleanup of excessive newlines
    processed = processed.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (processed !== content) {
      fs.writeFileSync(filePath, processed, 'utf8');
      console.log(`✓ Processed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  let processedCount = 0;

  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath);

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const relativePath = path.relative(process.cwd(), fullPath);

      if (EXCLUDE_DIRS.some((dir) => relativePath.includes(dir))) {
        continue;
      }

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(entry);
        const fileName = path.basename(entry);

        if (EXCLUDE_FILES.includes(fileName)) {
          continue;
        }

        if (EXTENSIONS.includes(ext)) {
          if (processFile(fullPath)) {
            processedCount++;
          }
        }
      }
    }
  }

  traverse(dirPath);
  return processedCount;
}

console.log('🧹 Starting enhanced comment removal process...\n');
console.log('📌 Now handles:');
console.log('  • JSX comments {/* ... */}');
console.log('  • Empty JSX expressions {}');
console.log('  • Regular comments // and /* */');
console.log('  • JSDoc comments /** ... */');
console.log('');

const startTime = Date.now();
const processedCount = processDirectory(process.cwd());
const endTime = Date.now();

console.log(`\n✨ Enhanced comment removal completed!`);
console.log(`📊 Files processed: ${processedCount}`);
console.log(`⏱️  Time taken: ${endTime - startTime}ms`);

if (processedCount > 0) {
  console.log('\n💡 Tip: Run "npm run format" to ensure consistent formatting');
}
