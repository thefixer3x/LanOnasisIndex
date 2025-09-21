#!/usr/bin/env node

/**
 * Translation helper script for lanonasis-index
 * This script helps identify which content needs proper translation
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
const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

console.log('🌍 Translation Status Report for LanOnasis Index\n');

for (const lang of languages) {
  const targetFile = path.join(localesDir, `${lang}.json`);
  const targetData = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
  
  console.log(`\n📋 ${lang.toUpperCase()} Translation Status:`);
  
  // Check for sections that need translation
  const sections = {
    'Ecosystem': ['ecosystem.title', 'ecosystem.subtitle'],
    'Industries': ['industries.title', 'industries.subtitle', 'industries.cta_title'],
    'MCP Connection': ['mcp_connection.title', 'mcp_connection.subtitle'],
    'Partners': ['partners.section_title', 'partners.section_subtitle'],
    'Platform Services': ['platform_services.title', 'platform_services.subtitle'],
    'Products': ['products.vortexcore_ai.name', 'products.vortexcomply.name'],
    'Testimonials': ['testimonials.items.0.name', 'testimonials.items.0.description'],
    'Vision': ['vision.title', 'vision.description']
  };
  
  for (const [sectionName, keys] of Object.entries(sections)) {
    const needsTranslation = keys.some(key => {
      const englishValue = getNestedValue(sourceData, key);
      const translatedValue = getNestedValue(targetData, key);
      return englishValue === translatedValue;
    });
    
    if (needsTranslation) {
      console.log(`   ⚠️  ${sectionName}: Needs translation`);
    } else {
      console.log(`   ✅ ${sectionName}: Translated`);
    }
  }
}

console.log('\n📝 Translation Recommendations:');
console.log('   1. Focus on high-priority sections first:');
console.log('      - Hero section (main landing content)');
console.log('      - Navigation and CTAs');
console.log('      - Product descriptions');
console.log('      - Industry-specific content');
console.log('\n   2. Use professional translation services for:');
console.log('      - Marketing copy and taglines');
console.log('      - Technical product descriptions');
console.log('      - Industry-specific terminology');
console.log('\n   3. Consider cultural adaptation for:');
console.log('      - Arabic (RTL layout considerations)');
console.log('      - Asian languages (character limits)');
console.log('      - Regional business terminology');

console.log('\n🔧 Available Translation Tools:');
console.log('   - Google Translate API');
console.log('   - DeepL API');
console.log('   - Azure Translator');
console.log('   - AWS Translate');
console.log('   - Professional translation services');
