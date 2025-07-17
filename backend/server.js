const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const productsFile = path.join(__dirname, 'data', 'products.json');
const ordersFile = path.join(__dirname, 'data', 'orders.json');
const archivedOrdersFile = path.join(__dirname, 'data', 'archived-orders.json');
const messagesFile = path.join(__dirname, 'data', 'messages.json');
const subscribersFile = path.join(__dirname, 'data', 'subscribers.json');

const readJSON = (file) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

/* PRODUCTS */
app.get('/api/products', (req, res) => {
  res.json(readJSON(productsFile));
});

app.post('/api/products', (req, res) => {
  const products = readJSON(productsFile);
  const newProduct = { ...req.body, id: Date.now(), available: true };
  products.push(newProduct);
  writeJSON(productsFile, products);
  res.status(201).json(newProduct);
});

app.patch('/api/products/:id/toggle', (req, res) => {
  const products = readJSON(productsFile);
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  product.available = !product.available;
  writeJSON(productsFile, products);
  res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
  let products = readJSON(productsFile);
  products = products.filter(p => p.id != req.params.id);
  writeJSON(productsFile, products);
  res.status(204).end();
});

/* ORDERS */
app.get('/api/orders', (req, res) => {
  res.json(readJSON(ordersFile));
});

app.post('/api/orders', (req, res) => {
  const orders = readJSON(ordersFile);
  const newOrder = {
    ...req.body,
    id: Date.now(),
    status: 'pending',
    date: new Date()
  };
  orders.push(newOrder);
  writeJSON(ordersFile, orders);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id', (req, res) => {
  const orders = readJSON(ordersFile);
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  order.status = 'completed';
  writeJSON(ordersFile, orders);
  res.json(order);
});

app.post('/api/orders/archive-completed', (req, res) => {
  const orders = readJSON(ordersFile);
  const archivedOrders = readJSON(archivedOrdersFile);

  const completed = orders.filter(o => o.status === 'completed');
  const pending = orders.filter(o => o.status !== 'completed');

  if (completed.length === 0) {
    return res.json({ message: 'No completed orders to archive.' });
  }

  writeJSON(archivedOrdersFile, [...archivedOrders, ...completed]);
  writeJSON(ordersFile, pending);

  res.json({ message: `${completed.length} orders archived.` });
});

/* ARCHIVED ORDERS */
app.get('/api/orders/archived', (req, res) => {
  res.json(readJSON(archivedOrdersFile));
});

app.patch('/api/orders/archived/:id/restore', (req, res) => {
  const archivedOrders = readJSON(archivedOrdersFile);
  const orders = readJSON(ordersFile);

  const idx = archivedOrders.findIndex(o => o.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const [order] = archivedOrders.splice(idx, 1);
  order.status = 'pending';
  orders.push(order);

  writeJSON(archivedOrdersFile, archivedOrders);
  writeJSON(ordersFile, orders);

  res.json({ message: 'Order restored to pending.' });
});

app.delete('/api/orders/archived/:id', (req, res) => {
  let archivedOrders = readJSON(archivedOrdersFile);
  archivedOrders = archivedOrders.filter(o => o.id != req.params.id);
  writeJSON(archivedOrdersFile, archivedOrders);
  res.status(204).end();
});

/* MESSAGES */
app.get('/api/messages', (req, res) => {
  res.json(readJSON(messagesFile));
});

app.post('/api/messages', (req, res) => {
  const messages = readJSON(messagesFile);
  const newMessage = {
    ...req.body,
    id: Date.now(),
    date: new Date()
  };
  messages.push(newMessage);
  writeJSON(messagesFile, messages);
  res.status(201).json(newMessage);
});

app.delete('/api/messages/:id', (req, res) => {
  let messages = readJSON(messagesFile);
  const initialLength = messages.length;
  messages = messages.filter(m => m.id != req.params.id);
  if (messages.length === initialLength) {
    return res.status(404).json({ error: 'Message not found' });
  }
  writeJSON(messagesFile, messages);
  res.status(204).end();
});

/* SUBSCRIBERS */
app.get('/api/subscribers', (req, res) => {
  res.json(readJSON(subscribersFile));
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const subscribers = readJSON(subscribersFile);
  if (subscribers.some(s => s.email === email)) {
    return res.status(400).json({ error: 'Email already subscribed' });
  }

  subscribers.push({ id: Date.now(), email, date: new Date() });
  writeJSON(subscribersFile, subscribers);

  res.json({ message: 'Subscribed successfully' });
});

app.delete('/api/subscribers/:id', (req, res) => {
  let subscribers = readJSON(subscribersFile);
  const initialLength = subscribers.length;
  subscribers = subscribers.filter(s => s.id != req.params.id);
  if (subscribers.length === initialLength) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }
  writeJSON(subscribersFile, subscribers);
  res.status(204).end();
});

/* LOGIN */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.json({ token: 'dummy-admin-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(5000, () => console.log('✅ Backend running on http://localhost:5000'));
