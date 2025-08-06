import React, { useState } from 'react';

export default function SendTestEmail() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = async () => {
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, subject, html })
      });
      if (res.ok) setStatus('Email sent!');
      else setStatus('Failed to send email.');
    } catch (err) {
      setStatus('Failed to send email.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Send Test Email</h2>
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      /><br/>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      /><br/>
      <textarea
        placeholder="HTML Code"
        value={html}
        onChange={e => setHtml(e.target.value)}
        rows={10}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      /><br/>
      <button onClick={sendEmail} style={{ padding: '10px 20px' }}>Send Test Email</button>
      <div style={{ marginTop: 10 }}>{status}</div>
    </div>
  );
} 