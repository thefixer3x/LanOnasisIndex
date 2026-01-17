import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const patterns = [
    'href="#"',
    'href=""',
    "href=''",
    "href=\"\"",
  ];

  for (const pattern of patterns) {
    if (content.includes(pattern)) {
      return { filePath, pattern };
    }
  }

  return null;
}

const distDir = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run the build first (bun run build).');
  process.exit(2);
}

const files = walk(distDir).filter((f) =>
  f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')
);

const hits = [];
for (const file of files) {
  const hit = scanFile(file);
  if (hit) {
    hits.push(hit);
  }
}

if (hits.length > 0) {
  console.error('Found placeholder/empty hrefs in build output:');
  for (const hit of hits) {
    console.error(`- ${hit.filePath} (${hit.pattern})`);
  }
  process.exit(1);
}

console.log('✅ No placeholder/empty hrefs found in dist output.');
