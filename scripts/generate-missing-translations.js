#!/usr/bin/env node

/**
 * Generate missing translation keys by copying English content as placeholders
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

// Function to set nested value in object
function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

// Function to get nested value from object
function getNestedValue(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return current;
}

// Load source file
const sourceFile = path.join(localesDir, 'en.json');
if (!fs.existsSync(sourceFile)) {
  console.error('❌ Missing source file: locales/en.json');
  process.exit(1);
}

const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
const sourceKeys = getAllKeys(sourceData).sort();

console.log(`📊 Source file has ${sourceKeys.length} translation keys`);
console.log('🔄 Generating missing translations...\n');

let totalUpdated = 0;

for (const lang of languages) {
  const targetFile = path.join(localesDir, `${lang}.json`);
  
  if (!fs.existsSync(targetFile)) {
    console.warn(`⚠️  Missing translation file: locales/${lang}.json`);
    continue;
  }
  
  try {
    const targetData = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    const targetKeys = getAllKeys(targetData).sort();
    
    const missingKeys = sourceKeys.filter(key => !targetKeys.includes(key));
    
    if (missingKeys.length > 0) {
      console.log(`🔄 ${lang.toUpperCase()}: Adding ${missingKeys.length} missing keys`);
      
      // Add missing keys with English content as placeholders
      missingKeys.forEach(key => {
        const englishValue = getNestedValue(sourceData, key);
        if (englishValue !== undefined) {
          setNestedValue(targetData, key, englishValue);
        }
      });
      
      // Write updated file
      fs.writeFileSync(targetFile, JSON.stringify(targetData, null, 2) + '\n');
      totalUpdated += missingKeys.length;
      
      console.log(`✅ ${lang.toUpperCase()}: Updated with ${missingKeys.length} keys`);
    } else {
      console.log(`✅ ${lang.toUpperCase()}: Already complete`);
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${lang}.json: ${error.message}`);
  }
  
  console.log('');
}

console.log(`📈 Summary:`);
console.log(`   Total keys added: ${totalUpdated}`);
console.log(`   Languages processed: ${languages.length}`);
console.log('\n✅ Missing translations generated!');
console.log('\n📝 Next steps:');
console.log('   1. Review the generated translations');
console.log('   2. Replace English placeholders with proper translations');
console.log('   3. Run validation script to verify completeness');
