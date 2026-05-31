const fs = require('fs');
const file = 'src/components/Insights.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/setActiveCategory\("All"\); className=/g, 'setActiveCategory("All");\n              }\}\n              className=');
content = content.replace(/value=\{searchQuery\n/g, 'value={searchQuery}\n');
content = content.replace(/key=\{idx\n/g, 'key={idx}\n');
content = content.replace(/<div key=\{post.id\}` onClick/g, '<div key={post.id} onClick');
content = content.replace(/<Check size=\{18\} \/> className="text-emerald-500" \/>/g, '<Check size={18} className="text-emerald-500" />');

fs.writeFileSync(file, content);
