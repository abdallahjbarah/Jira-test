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
];

function removeConsoleStatements(code) {
  const lines = code.split('\n');
  const filteredLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (
      trimmedLine.startsWith('console.log(') ||
      trimmedLine.startsWith('console.warn(') ||
      trimmedLine.startsWith('console.error(') ||
      trimmedLine.startsWith('console.info(') ||
      trimmedLine.startsWith('console.debug(') ||
      trimmedLine.startsWith('console.trace(') ||
      trimmedLine.startsWith('console.table(') ||
      trimmedLine.startsWith('console.group(') ||
      trimmedLine.startsWith('console.groupEnd(') ||
      line.includes('console.log(') ||
      line.includes('console.warn(') ||
      line.includes('console.error(') ||
      line.includes('console.info(') ||
      line.includes('console.debug(')
    ) {
      if (
        trimmedLine.includes('console.error(') &&
        (trimmedLine.includes('catch') || trimmedLine.includes('error:'))
      ) {
        filteredLines.push(line);
      } else {
        continue;
      }
    } else {
      filteredLines.push(line);
    }
  }

  return filteredLines.join('\n');
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const processed = removeConsoleStatements(content);

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

      if (EXCLUDE_DIRS.some(dir => relativePath.includes(dir))) {
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

console.log('🧹 Starting console statement removal...\n');

const startTime = Date.now();
const processedCount = processDirectory(process.cwd());
const endTime = Date.now();

console.log(`\n✨ Console cleanup completed!`);
console.log(`📊 Files processed: ${processedCount}`);
console.log(`⏱️  Time taken: ${endTime - startTime}ms`);

if (processedCount > 0) {
  console.log('\n💡 Tip: Run "npm run format" to ensure consistent formatting');
}
