import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the motion.div transition
content = content.replace(
  /initial=\{\{\s*opacity:\s*1\s*\}\}\n\s*exit=\{\{\s*opacity:\s*0,\s*y:\s*-50,\s*scale:\s*0\.95\s*\}\}\n\s*transition=\{\{\s*duration:\s*1\.2,\s*ease:\s*\[0\.22,\s*1,\s*0\.36,\s*1\]\s*\}\}\s*\/\/\s*Fast start, slow end \(cool fast-slow\)/,
  'initial={{ opacity: 1 }}\n exit={{ opacity: 0, scale: 1.05 }}\n transition={{ duration: 0.8, ease: "easeInOut" }}'
);

// Remove "pt-8 md:pt-0" and overflow-x-hidden class on the main wrapper
content = content.replace(
  /className="relative w-full overflow-x-hidden pt-8 md:pt-0"/g,
  'className="relative w-full"'
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated');
