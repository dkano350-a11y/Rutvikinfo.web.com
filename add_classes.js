const fs = require('fs');
const files = {
  'src/components/About.tsx': [
    ['className="grid md:grid-cols-2 gap-12 items-center"', 'className="reveal grid md:grid-cols-2 gap-12 items-center"'],
    ['className="grid grid-cols-2 gap-4"', 'className="reveal-grid grid grid-cols-2 gap-4"']
  ],
  'src/components/Projects.tsx': [
    ['<div>\n          <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">\n            Selected Work\n          </h2>', '<div className="reveal">\n          <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">\n            Selected Work\n          </h2>'],
    ['className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"', 'className="reveal-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"']
  ],
  'src/components/Academics.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-12 text-center">\n          Academic Road\n        </h2>', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-12 text-center">\n          Academic Road\n        </h2>'],
    ['className="relative pl-8 md:pl-0"', 'className="relative pl-8 md:pl-0"'],
    ['className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}', 'className={`reveal-left md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}', true] // For timeline item, wait, the map element is the div wrapping it. Let's inspect Academics.tsx exactly.
  ]
};

for (const [file, replacements] of Object.entries(files)) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    for (const rep of replacements) {
       if (rep[2]) {
         // replace all
         content = content.replaceAll(rep[0], rep[1]);
       } else {
         content = content.replace(rep[0], rep[1]);
       }
    }
    fs.writeFileSync(file, content);
  }
}
