import React, { useState, useEffect } from 'react';

// This version connects to the first Record Management System via localStorage
export default function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({ name: '', idNumber: '', address: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Load applications from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('applications') || '[]');
    setApplications(stored);
  }, []);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.idNumber || !form.address || !form.phone || !form.email) {
      alert('Please fill in all required fields.');
      return;
    }
    const newApp = { id: Date.now().toString(), date: new Date().toLocaleString(), ...form };
    setApplications(prev => [...prev, newApp]);
    setForm({ name: '', idNumber: '', address: '', phone: '', email: '', message: '' });
    setSubmitted(true);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect admin password.');
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <header className="w-full max-w-5xl bg-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Limpopo Department of Housing</h1>
          <p className="text-sm">Online Record Management & Application Portal</p>
        </div>
        <button onClick={() => setAdminView(v => !v)} className="bg-white text-green-700 px-4 py-1 rounded shadow hover:bg-gray-200">
          {adminView ? 'Client View' : 'Admin View'}
        </button>
      </header>

      <main className="w-full max-w-5xl bg-white shadow p-6 rounded-b-lg">
        {!adminView ? (
          !submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Housing Application Form</h2>
              <div>
                <label className="block text-sm font-medium">Full Name*</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">ID Number*</label>
                <input name="idNumber" value={form.idNumber} onChange={handleChange} className="w-full border rounded p-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Residential Address*</label>
                <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded p-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Phone Number*</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email Address*</label>
                  <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Additional Notes</label>
                <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded p-2" rows="3" />
              </div>

              <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">Submit Application</button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-4">Thank you for applying. Your housing application has been received successfully.</p>
              <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit Another</button>
            </div>
          )
        ) : !authenticated ? (
          <form onSubmit={handleAdminLogin} className="max-w-sm mx-auto space-y-4">
            <h2 className="text-xl font-semibold text-center">Admin Login</h2>
            <input type="password" placeholder="Enter Admin Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full border rounded p-2" />
            <button type="submit" className="w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">Login</button>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard — Application Records</h2>
            {applications.length > 0 ? (
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">ID Number</th>
                    <th className="border p-2">Address</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Date Submitted</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td className="border p-2">{app.name}</td>
                      <td className="border p-2">{app.idNumber}</td>
                      <td className="border p-2">{app.address}</td>
                      <td className="border p-2">{app.email}</td>
                      <td className="border p-2">{app.date}</td>
                      <td className="border p-2 text-center">
                        <button onClick={() => handleDelete(app.id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No applications found yet.</p>
            )}
          </div>
        )}
      </main>

      <footer className="text-xs text-gray-500 mt-6">Limpopo Department of Housing © 2025</footer>
    </div>
  );
}
