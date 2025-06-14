const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/download', async (req, res) => {
  const url = req.query.url;
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).send('Invalid YouTube URL');
  }
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, { format: 'mp4' }).pipe(res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`YouTube downloader server running on port ${PORT}`);
});
