const express = require('express');
const path = require('path');

const app = express();

// express.static
// 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공
app.use(
  '/static',
  express.static(path.resolve(__dirname, 'frontend', 'static'))
);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.PORT || 3000, () =>
  console.log('Server running...http://localhost:3000')
);
// node server.js 또는 nodemon server.js로 실행
