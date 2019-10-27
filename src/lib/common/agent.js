import Agent, { HttpsAgent } from 'agentkeepalive';

const httpsAgent = new HttpsAgent({
  keepAlive: true,
  keepAliveMsecs: 2000,
  maxFreeSockets: 2048,
  socketActiveTTL: 300000,
  timeout: 60000,
  freeSocketTimeout: 30000,
});

const httpAgent = new Agent({
  keepAlive: true,
  keepAliveMsecs: 2000,
  maxFreeSockets: 2048,
  socketActiveTTL: 300000,
  timeout: 60000,
  freeSocketTimeout: 30000,
});

export {
  httpsAgent,
  httpAgent,
};
