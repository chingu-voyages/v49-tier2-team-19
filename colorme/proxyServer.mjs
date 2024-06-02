import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.groq.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  })
);

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
