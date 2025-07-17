import React, { useEffect, useState } from 'react';
import '../styles/pages/Admin.css';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [archivedOrders, setArchivedOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState({
    category: '',
    image: '',
    title: '',
    description: '',
    price: ''
  });

  const fetchAll = () => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch('http://localhost:5000/api/orders/archived')
      .then(res => res.json())
      .then(data => setArchivedOrders(data));

    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));

    fetch('http://localhost:5000/api/subscribers')
      .then(res => res.json())
      .then(data => setSubscribers(data));
  };

  useEffect(() => {
    if (token) {
      fetchAll();
    }
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setError('');
      })
      .catch(() => setError('Invalid username or password'));
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  const markAsCompleted = (id) => {
    fetch(`http://localhost:5000/api/orders/${id}`, { method: 'PATCH' }).then(fetchAll);
  };

  const archiveCompletedOrders = () => {
    fetch(`http://localhost:5000/api/orders/archive-completed`, { method: 'POST' }).then(fetchAll);
  };

  const restoreArchivedOrder = (id) => {
    fetch(`http://localhost:5000/api/orders/archived/${id}/restore`, { method: 'PATCH' }).then(fetchAll);
  };

  const deleteArchivedOrder = (id) => {
    fetch(`http://localhost:5000/api/orders/archived/${id}`, { method: 'DELETE' }).then(fetchAll);
  };

  const toggleAvailable = (id) => {
    fetch(`http://localhost:5000/api/products/${id}/toggle`, { method: 'PATCH' }).then(fetchAll);
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' }).then(fetchAll);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    }).then(() => {
      setNewProduct({ category: '', image: '', title: '', description: '', price: '' });
      fetchAll();
    });
  };

  const handleDeleteMessage = (id) => {
    fetch(`http://localhost:5000/api/messages/${id}`, { method: 'DELETE' }).then(fetchAll);
  };

  const handleDeleteSubscriber = (id) => {
    fetch(`http://localhost:5000/api/subscribers/${id}`, { method: 'DELETE' }).then(fetchAll);
  };

  if (!token) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <section>
        <h3>Orders</h3>
        <button onClick={archiveCompletedOrders}>Archive Completed</button>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Customer</th><th>Phone</th><th>Address</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                <td>{order.customer.phone}</td>
                <td>{order.customer.address}</td>
                <td>{order.items.map(i => <div key={i.id}>{i.title} x {i.quantity}</div>)}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === 'pending' && (
                    <button onClick={() => markAsCompleted(order.id)}>Complete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Archived Orders</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Customer</th><th>Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {archivedOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>
                  <button onClick={() => restoreArchivedOrder(order.id)}>Restore</button>
                  <button onClick={() => deleteArchivedOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Products</h3>
        <form onSubmit={handleAddProduct} className="admin-product-form">
          <input type="text" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
          <input type="text" placeholder="Image" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
          <input type="text" placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} />
          <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input type="text" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
          <button type="submit">Add Product</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Title</th><th>Category</th><th>Price</th><th>Available</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.available ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => toggleAvailable(p.id)}>Toggle</button>
                  <button onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Contact Messages</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.name} {msg.lastName}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.date).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Subscribers</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Email</th><th>Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(sub => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.email}</td>
                <td>{new Date(sub.date).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteSubscriber(sub.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
