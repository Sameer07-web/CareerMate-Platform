const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const searchDir = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      const code = fs.readFileSync(fullPath, 'utf-8');
      try {
        const ast = parser.parse(code, {
          sourceType: 'module',
          plugins: ['jsx']
        });
        traverse(ast, {
          JSXAttribute(path) {
            const node = path.node;
            if (node.value && node.value.type === 'StringLiteral' && (node.value.value === 'true' || node.value.value === 'false')) {
              console.log(`Found string "${node.value.value}" in ${fullPath} at line ${node.loc.start.line}`);
              console.log(`Prop name: ${node.name.name}`);
            }
            if (node.value && node.value.type === 'JSXExpressionContainer' && node.value.expression.type === 'StringLiteral' && (node.value.expression.value === 'true' || node.value.expression.value === 'false')) {
              console.log(`Found string expression "${node.value.expression.value}" in ${fullPath} at line ${node.loc.start.line}`);
              console.log(`Prop name: ${node.name.name}`);
            }
          }
        });
      } catch (e) {
        console.error(`Error parsing ${fullPath}: ${e.message}`);
      }
    }
  }
};

searchDir('./src');
