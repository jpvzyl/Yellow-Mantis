const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Single-page app: redirect any non-root path to / so canonical URL is always root (e.g. yellow-mantis.com)
app.get('*', (req, res) => {
  if (req.path !== '/') {
    return res.redirect(301, '/');
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


