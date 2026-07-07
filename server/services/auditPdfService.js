import pdf from "html-pdf";

export const generateAuditPdf = async ({ businessName, businessLocation, research_data }) => {
  if (!research_data) {
    throw new Error("Research data is required to generate audit PDF.");
  }

  const html = getAuditPdfHtml({ businessName, businessLocation, research_data });

  return new Promise((resolve, reject) => {
    const options = {
      format: "Letter",
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
      width: "8.5in",
      height: "11in",
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error("PDF generation error:", err);
        reject(new Error("Failed to generate audit PDF: " + err.message));
      } else {
        console.log(`✓ PDF generated for: ${businessName}, ${businessLocation}`);
        resolve(buffer);
      }
    });
  });
};

export const getAuditPdfHtml = ({ businessName, businessLocation, research_data }) => {
  if (!research_data) {
    throw new Error("Research data required.");
  }

  const { gbp_completeness_score = 0, gbp_rating = 0, gbp_review_count = 0, website_issues = [], competitors = [], quick_wins = [], summary = "" } = research_data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Local Search Visibility Audit</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #f9fafb;
    }
    .page {
      max-width: 8.5in;
      height: 11in;
      background: white;
      margin: 0 auto;
      padding: 0.75in;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
      border-bottom: 3px solid #1d4ed8;
      padding-bottom: 1.5rem;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: #1d4ed8;
      border-radius: 50%;
      margin: 0 auto 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 24px;
    }
    .header h1 {
      font-size: 28px;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    .header p {
      color: #6b7280;
      font-size: 14px;
    }
    .business-info {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 16px;
      color: #374151;
    }
    .business-info strong {
      color: #1f2937;
      display: block;
      font-size: 18px;
    }
    .section {
      margin-bottom: 1.5rem;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.75rem;
      border-left: 4px solid #1d4ed8;
      padding-left: 0.75rem;
    }
    .gbp-card {
      background: #f0f4ff;
      border: 1px solid #1d4ed8;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .gbp-score {
      display: flex;
      justify-content: space-around;
      margin-bottom: 0.5rem;
    }
    .score-item {
      text-align: center;
      flex: 1;
    }
    .score-value {
      font-size: 24px;
      font-weight: 700;
      color: #1d4ed8;
    }
    .score-label {
      font-size: 12px;
      color: #6b7280;
      margin-top: 0.25rem;
    }
    .issues-list, .competitors-list, .wins-list {
      list-style: none;
      padding: 0;
    }
    .issues-list li, .competitors-list li, .wins-list li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
    }
    .issues-list li:last-child, .competitors-list li:last-child, .wins-list li:last-child {
      border-bottom: none;
    }
    .issue-item::before {
      content: "⚠ ";
      color: #dc2626;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    .competitor-item::before {
      content: "📊 ";
      margin-right: 0.5rem;
    }
    .win-item::before {
      content: "✓ ";
      color: #059669;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    .summary {
      background: #f3f4f6;
      border-left: 4px solid #1d4ed8;
      padding: 1rem;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }
    .cta {
      background: #1d4ed8;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      display: inline-block;
      text-decoration: none;
      margin-top: 1rem;
      font-weight: 600;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">E</div>
      <h1>Local Search Visibility Audit</h1>
      <p>Personalized analysis of your online presence</p>
    </div>

    <div class="business-info">
      <strong>${businessName}</strong>
      <span>${businessLocation}</span>
    </div>

    <!-- GBP Health Section -->
    <div class="section">
      <h2 class="section-title">Google Business Profile Health</h2>
      <div class="gbp-card">
        <div class="gbp-score">
          <div class="score-item">
            <div class="score-value">${gbp_completeness_score}%</div>
            <div class="score-label">Completeness</div>
          </div>
          <div class="score-item">
            <div class="score-value">${gbp_rating}</div>
            <div class="score-label">Rating</div>
          </div>
          <div class="score-item">
            <div class="score-value">${gbp_review_count}</div>
            <div class="score-label">Reviews</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Website Issues -->
    ${website_issues.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Website Issues Found</h2>
      <ul class="issues-list">
        ${website_issues.map(issue => `<li><span class="issue-item">${issue}</span></li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Competitors -->
    ${competitors.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Competitor Benchmarking</h2>
      <ul class="competitors-list">
        ${competitors.map(c => `<li><span class="competitor-item">${c.name}${c.ranking_position ? ` - Ranking #${c.ranking_position}` : ''}</span></li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Quick Wins -->
    ${quick_wins.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Quick Wins You Can Do Today</h2>
      <ul class="wins-list">
        ${quick_wins.map(win => `<li><span class="win-item">${win}</span></li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Summary -->
    ${summary ? `
    <div class="section">
      <h2 class="section-title">Summary</h2>
      <div class="summary">${summary}</div>
    </div>
    ` : ''}

    <div class="footer">
      <p>Ella Tech Solutions • Detroit, MI</p>
      <p>Questions about this audit? Reply to the email and we'll dig in.</p>
    </div>
  </div>
</body>
</html>`;
};
