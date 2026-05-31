const fs = require('fs');
const path = require('path');

const fileReplacements = {
  'src/components/About.tsx': [
    ['className="grid md:grid-cols-2 gap-12 items-center', 'className="reveal grid md:grid-cols-2 gap-12 items-center'],
    ['className="grid grid-cols-2 gap-4', 'className="reveal-grid grid grid-cols-2 gap-4']
  ],
  'src/components/Projects.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-4'],
    ['className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12', 'className="reveal-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12']
  ],
  'src/components/Academics.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-12 text-center', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-12 text-center'],
    ['<div key={index} className={`md:w-1/2', '<div key={index} className={`reveal-left md:w-1/2']
  ],
  'src/components/IndustryVisits.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-6', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-6'],
    ['className="grid md:grid-cols-2 gap-8', 'className="reveal-grid grid md:grid-cols-2 gap-8']
  ],
  'src/components/Seminars.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-6', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-6'],
    ['className="grid md:grid-cols-2 lg:grid-cols-4 gap-6', 'className="reveal-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6']
  ],
  'src/components/Courses.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-6', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-6'],
    ['className="grid md:grid-cols-2 lg:grid-cols-4 gap-6', 'className="reveal-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6'],
    ['className="grid md:grid-cols-2 gap-6', 'className="reveal-grid grid md:grid-cols-2 gap-6']
  ],
  'src/components/Skills.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-6', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-6'],
    ['className="grid md:grid-cols-3 gap-8', 'className="reveal-grid grid md:grid-cols-3 gap-8']
  ],
  'src/components/FeaturedSkill.tsx': [
    ['<div className="bg-navy rounded-3xl p-8 md:p-12 text-white', '<div className="reveal bg-navy rounded-3xl p-8 md:p-12 text-white']
  ],
  'src/components/Tools.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-6', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-6'],
    ['className="grid md:grid-cols-2 lg:grid-cols-4 gap-6', 'className="reveal-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6']
  ],
  'src/components/Insights.tsx': [
    ['<h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-6', '<h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-navy mb-6'],
    ['className="grid md:grid-cols-3 gap-8 mb-20', 'className="reveal-grid grid md:grid-cols-3 gap-8 mb-20'],
    ['className="bg-navy rounded-3xl p-8 md:p-12 text-center text-white', 'className="reveal bg-navy rounded-3xl p-8 md:p-12 text-center text-white']
  ],
  'src/components/Contact.tsx': [
    ['<div className="grid md:grid-cols-2 gap-16 items-start', '<div className="grid md:grid-cols-2 gap-16 items-start'],
    ['<h2 className="font-serif text-4xl md:text-6xl font-bold text-navy mb-6', '<h2 className="reveal font-serif text-4xl md:text-6xl font-bold text-navy mb-6'],
    ['<div className="bg-cream p-8 rounded-3xl border border-navy/5', '<div className="reveal bg-cream p-8 rounded-3xl border border-navy/5']
  ]
};

for (const [file, replacements] of Object.entries(fileReplacements)) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    for (const rep of Object.entries(replacements)) {
        const from = rep[1][0];
        const to = rep[1][1];
        if (content.includes(from)) {
            content = content.replace(from, to);
        } else {
             console.log(`Could not find "${from}" in ${file}`);
        }
    }
    fs.writeFileSync(filePath, content);
  } else {
      console.log(`${file} does not exist`);
  }
}
console.log('Added motion classes');
