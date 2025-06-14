const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// 静的ファイル提供
app.use(express.static(path.join(__dirname, 'public')));

// YouTubeダウンロードAPI
app.get('/api/download', async (req, res) => {
  const url = req.query.url;
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).send('Invalid YouTube URL');
  }
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, { format: 'mp4' }).pipe(res);
});

// ポート番号: Renderは自動でPORT環境変数をセットする
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});