import express from 'express';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { createDiscordServer } from './index.js'; // reuse existing logic

const app = express();
const port = process.env.PORT || 3000;

app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  const server = createDiscordServer();
  await server.connect(transport);
});

app.post('/messages', express.json(), async (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Discord MCP server running on port ${port}`);
});
