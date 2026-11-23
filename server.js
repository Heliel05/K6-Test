const http = require('node:http');

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  if (reqUrl.pathname === '/soma' && req.method === 'GET') {
    const a = Number(reqUrl.searchParams.get('a')) || 0;
    const b = Number(reqUrl.searchParams.get('b')) || 0;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ resultado: a + b }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ erro: 'Rota nao encontrada' }));
});

server.listen(3000, () => {
  console.log('API rodando em http://localhost:3000/soma?a=10&b=20');
});