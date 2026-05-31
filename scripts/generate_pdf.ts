import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

function buildPDF() {
  const doc = new PDFDocument({ 
    size: 'LETTER',
    margins: {
      top: 54,
      bottom: 54,
      left: 54,
      right: 54
    }
  });

  const destPath = path.join(process.cwd(), 'public', 'rutvik_dangar_resume.pdf');
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const stream = fs.createWriteStream(destPath);
  doc.pipe(stream);

  // Styling helpers
  const primaryColor = '#0F172A'; // Dark slate
  const secondaryColor = '#3F3F46'; // Zinc
  const accentColor = '#3B82F6'; // Blue accent
  const dividerColor = '#E4E4E7';

  // --- HEADER SECTION ---
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(22)
    .text('DANGAR RUTVIKKUMAR ALPESHBHAI', { align: 'center' });

  doc.moveDown(0.3);

  doc
    .fillColor(secondaryColor)
    .font('Helvetica')
    .fontSize(10)
    .text('Email: rutvikdangar20@gmail.com   |   Phone: +91 9328796324   |   Location: Ahmedabad, Gujarat', { align: 'center' });

  doc.moveDown(1.2);

  const drawSectionHeader = (title: string) => {
    doc.moveDown(0.5);
    doc
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text(title.toUpperCase());

    const y = doc.y + 2;
    doc
      .strokeColor(primaryColor)
      .lineWidth(1)
      .moveTo(54, y)
      .lineTo(612 - 54, y)
      .stroke();

    doc.moveDown(0.8);
  };

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeader('Professional Summary');
  doc
    .fillColor(secondaryColor)
    .font('Helvetica')
    .fontSize(9.5)
    .text(
      'An analytical and highly motivated Bachelor of Business Administration (BBA) student specializing in Marketing (Semester 5). Possesses an empirical foundation in Management Information Systems (MIS), corporate financial structures, and consumer buying trends. Proven competency in drafting comprehensive business research models, analyzing data, and translating market parameters into core corporate strategies. Seeking to leverage academic research experience and modern marketing literacy in a progressive business environment.',
      { align: 'justify', lineGap: 3 }
    );

  // --- EDUCATION ---
  drawSectionHeader('Education');
  
  // BBA
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .text('Bachelor of Business Administration (BBA) — Marketing Specialization', { continued: true })
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('   |   2024 — Present (Semester 5)', { align: 'right' });

  doc
    .font('Helvetica-Oblique')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('Ahmedabad Institute of Business Management (AIBM)', { lineGap: 2 });

  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('Core Focus: Consumer Behaviour, Operational Planning, Brand Strategy, Business Analytics, and Management Information Systems (MIS).', { lineGap: 3 });

  doc.moveDown(0.8);

  // HSC
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .text('Higher Secondary Certificate (HSC — Class XII)', { continued: true })
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('   |   March 2024', { align: 'right' });

  doc
    .font('Helvetica-Oblique')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('Gujarat Secondary and Higher Secondary Education Board, Gandhinagar', { lineGap: 2 });

  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(primaryColor)
    .text('Percentile Rank: 68 PR', { lineGap: 3 });

  doc.moveDown(0.8);

  // SSC
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .text('Secondary School Certificate (SSC — Class X)', { continued: true })
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('   |   March 2022', { align: 'right' });

  doc
    .font('Helvetica-Oblique')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('Gujarat Secondary and Higher Secondary Education Board, Gandhinagar', { lineGap: 2 });

  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(primaryColor)
    .text('Percentile Rank: 76 PR', { lineGap: 3 });

  // --- PROJECTS ---
  drawSectionHeader('Academic & Business Projects');

  // BRM
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .text('Business Research Methods (BRM): College Students Buying Behaviour', { continued: true })
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('   |   Sem 4 Project', { align: 'right' });

  doc
    .font('Helvetica-Oblique')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('Lead Researcher & Analyst', { lineGap: 3 });

  doc
    .font('Helvetica')
    .fontSize(9.2)
    .text(' • Formulated structural research criteria to evaluate product preferences, brand loyalty patterns, and purchasing triggers among student segments.', { indent: 15, lineGap: 2 })
    .text(' • Compiled qualitative data arrays to identify consumer price elasticity, reliance on digital commerce infrastructure, and regional brand-switching activities.', { indent: 15, lineGap: 2 });

  doc.moveDown(0.8);

  // Financial
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .text('Financial Management Analysis: Dairy Sector Leader (Amul)', { continued: true })
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('   |   AIBM Curriculum Study', { align: 'right' });

  doc
    .font('Helvetica-Oblique')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('Market Analyst & Project Contributor', { lineGap: 3 });

  doc
    .font('Helvetica')
    .fontSize(9.2)
    .text(' • Evaluated capital frameworks, working capital cycles, and operational asset distributions of GCMMF (Amul) within the FMCG ecosystem.', { indent: 15, lineGap: 2 })
    .text(' • Assessed integration mechanics of perishable supply chain systems scaling into emerging Quick-Commerce distribution nodes.', { indent: 15, lineGap: 2 });

  // --- NEW PAGE FOR REMAINING ---
  doc.addPage();

  // Header mini
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(14)
    .text('DANGAR RUTVIKKUMAR ALPESHBHAI', { align: 'center' });
  doc.moveDown(0.5);

  // Aura Automation
  drawSectionHeader('Academic & Business Projects (Continued)');
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .text('Project Aura & Advanced Automation Frameworks', { continued: true })
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('   |   Technical Design', { align: 'right' });

  doc
    .font('Helvetica-Oblique')
    .fontSize(9.5)
    .fillColor(secondaryColor)
    .text('System Logic Design & Prompt Architect', { lineGap: 3 });

  doc
    .font('Helvetica')
    .fontSize(9.2)
    .text(' • Engineered context-handling frameworks and conversational parameters optimization for voice-first automation companions (Aura, Bella AI, Maya).', { indent: 15, lineGap: 2 })
    .text(' • Mapped semantic logic configurations to handle regional multi-dialect code-switching interactions smoothly.', { indent: 15, lineGap: 2 });

  // --- CORE COMPETENCIES ---
  drawSectionHeader('Core Competencies & Professional Skills');

  const printSkillRow = (label: string, value: string) => {
    doc
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(label, { continued: true, lineGap: 4 })
      .font('Helvetica')
      .fillColor(secondaryColor)
      .text(`  ${value}`);
  };

  printSkillRow('Marketing & Strategy:', 'Consumer Behaviour Tracking, Brand Architecture Foundations, Market Friction Analysis');
  printSkillRow('Management & Systems:', 'Business Research Models, Management Information Systems (MIS), Project Planning');
  printSkillRow('Technical Competencies:', 'Conversational Architecture Principles, MS Excel Data Records, Flow-Logic Maps');
  printSkillRow('Languages Known:', 'English, Hindi, Gujarati, Hinglish');

  doc.end();
  console.log('PDF Generation finished.');
}

buildPDF();
