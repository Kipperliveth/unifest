const SitemapGenerator = require('sitemap-generator');

// Create a generator
const generator = SitemapGenerator('https://www.unifest.online', {
  stripQuerystring: false,
  filepath: './public/sitemap.xml',
  maxEntriesPerFile: 50000,
  maxDepth: 0
});

// Register event listeners
generator.on('done', () => {
  console.log('Sitemap created!');
});

// Start the crawler
generator.start();
