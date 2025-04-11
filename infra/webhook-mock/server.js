const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const receivedWebhooks = [];

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  
  const webhook = {
    timestamp: new Date(),
    headers: req.headers,
    body: req.body
  };
  
  receivedWebhooks.push(webhook);
  
  res.status(200).json({ 
    status: 'success',
    message: 'Webhook received successfully'
  });
});

app.get('/webhooks', (req, res) => {
  res.json(receivedWebhooks);
});

app.delete('/webhooks', (req, res) => {
  receivedWebhooks.length = 0;
  res.status(200).json({ 
    status: 'success',
    message: 'All webhooks cleared'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Webhook mock server running on port ${PORT}`);
});
