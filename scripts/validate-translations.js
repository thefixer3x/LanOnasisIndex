#!/usr/bin/env node

/**
 * Translation validator that compares structure and completeness
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['es', 'fr', 'de', 'ja', 'zh', 'pt', 'ar', 'ru', 'it', 'ko'];
const localesDir = path.join(__dirname, '..', 'locales');

// Function to get all keys from nested object
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], prefix ? `${prefix}.${key}` : key));
    } else {
      keys.push(prefix ? `${prefix}.${key}` : key);
    }
  }
  return keys;
}

// Check if source file exists
const sourceFile = path.join(localesDir, 'en.json');
if (!fs.existsSync(sourceFile)) {
  console.error('❌ Missing source file: locales/en.json');
  process.exit(1);
}

const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
const sourceKeys = getAllKeys(sourceData).sort();

console.log(`📊 Source file has ${sourceKeys.length} translation keys`);
console.log('🔍 Checking translation completeness...\n');

let hasErrors = false;
let totalMissing = 0;

for (const lang of languages) {
  const targetFile = path.join(localesDir, `${lang}.json`);
  
  if (!fs.existsSync(targetFile)) {
    console.warn(`⚠️  Missing translation file: locales/${lang}.json`);
    hasErrors = true;
    continue;
  }
  
  try {
    const targetData = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    const targetKeys = getAllKeys(targetData).sort();
    
    const missingKeys = sourceKeys.filter(key => !targetKeys.includes(key));
    const extraKeys = targetKeys.filter(key => !sourceKeys.includes(key));
    
    if (missingKeys.length > 0) {
      console.log(`❌ ${lang.toUpperCase()}: Missing ${missingKeys.length} keys`);
      missingKeys.forEach(key => console.log(`   - ${key}`));
      totalMissing += missingKeys.length;
      hasErrors = true;
    } else {
      console.log(`✅ ${lang.toUpperCase()}: Complete (${targetKeys.length} keys)`);
    }
    
    if (extraKeys.length > 0) {
      console.log(`⚠️  ${lang.toUpperCase()}: Has ${extraKeys.length} extra keys`);
      extraKeys.forEach(key => console.log(`   + ${key}`));
    }
    
  } catch (error) {
    console.error(`❌ Invalid JSON in ${lang}.json: ${error.message}`);
    hasErrors = true;
  }
  
  console.log('');
}

console.log(`📈 Summary:`);
console.log(`   Total missing keys: ${totalMissing}`);
console.log(`   Languages checked: ${languages.length}`);

if (hasErrors) {
  console.log('\n❌ Translation validation failed!');
  process.exit(1);
} else {
  console.log('\n✅ All translations are complete!');
}