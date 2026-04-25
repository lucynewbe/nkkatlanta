import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useApi';

const CONTACT_INFO = [
  { icon: '📍', label: 'Mailing Address', value: '11585 Jones Bridge Road\nSte 420 PMB1238\nJohns Creek, GA 30022', href: 'https://maps.google.com/?q=11585+Jones+Bridge+Road+Johns+Creek+GA+30022' },
  { icon: '📞', label: 'Phone', value: '(470) 645-2147', href: 'tel:4706452147' },
  { icon: '✉️', label: 'Email', value: 'info@atlantakannada.org', href: 'mailto:info@atlantakannada.org' },
];

export default function Contact() {
  useScrollReveal();
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('');

  // Volunteer form state
  const [volunteer, setVolunteer] = useState({ name: '', email: '', phone: '', skills: '', availability: '' });
  const [volStatus, setVolStatus] = useState(null);

  // Feedback form state
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: '5', comments: '' });
  const [fbStatus, setFbStatus] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrMsg('Something went wrong. Please try again or email us directly.');
    }
  };

  const handleVolunteer = (e) => {
    e.preventDefault();
    setVolStatus('success');
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    setFbStatus('success');
  };

  return (
    <>
      <header className="page-header">
        <div className="page-tag">Get in Touch</div>
        <h1 className="page-title">Contact <span className="gradient-text">NKK Atlanta</span></h1>
        <p className="page-subtitle">We'd love to hear from you — questions, feedback, volunteer interest, or just hello!</p>
        <div className="divider" />
      </header>

      {/* CONTACT MAIN */}
      <section>
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="reveal">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>Let's <span className="gradient-text">Connect</span></h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>Whether you have a question about membership, events, or the scholarship program — we're here for you.</p>
              <div className="contact-info">
                {CONTACT_INFO.map(c => (
                  <a href={c.href} key={c.label} className="contact-item" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <div className="contact-label">{c.label}</div>
                      <div className="contact-value" style={{ whiteSpace: 'pre-line' }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal reveal-delay-2">
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Send Us a <span className="gradient-text">Message</span></h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>We respond within 2 business days.</p>

                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Thank you for reaching out. We'll get back to you within 2 business days.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="grid-2" style={{ gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input className="form-input" placeholder="Arjun" required value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input className="form-input" placeholder="Sharma" required value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="arjun@example.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <select className="form-select" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                        <option value="">Select a topic…</option>
                        {['Membership Inquiry','Events & Tickets','Scholarship Program','Sponsorship Opportunities','Volunteering','General Question','Other'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea className="form-textarea" placeholder="Tell us how we can help…" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                    </div>
                    {status === 'error' && <div className="alert alert-error">{errMsg}</div>}
                    <button type="submit" className="btn btn-gold" style={{ justifyContent: 'center' }} disabled={status === 'loading'}>
                      {status === 'loading' ? <><span className="loading-spinner" /> Sending…</> : '📤 Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOLUNTEER SIGNUP */}
      <section id="volunteer" style={{ padding: '4rem 2rem', background: 'linear-gradient(180deg,rgba(124,58,237,0.05),transparent)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Volunteer with NKK</div>
            <h2 className="section-title">Help Us <span className="accent">Make Events</span> Happen</h2>
            <p className="section-desc">NKK events are made possible by our amazing volunteers. Join us behind the scenes!</p>
          </div>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {volStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '24px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙌</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>Thank You for Signing Up!</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>We'll reach out with volunteer opportunities closer to each event. Welcome to the NKK volunteer family!</p>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <form onSubmit={handleVolunteer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" placeholder="Your Name" required value={volunteer.name} onChange={e => setVolunteer(v => ({ ...v, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" type="tel" placeholder="(404) 555-0000" value={volunteer.phone} onChange={e => setVolunteer(v => ({ ...v, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="your@email.com" required value={volunteer.email} onChange={e => setVolunteer(v => ({ ...v, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Skills / Interests</label>
                    <input className="form-input" placeholder="e.g. Event coordination, photography, cooking…" value={volunteer.skills} onChange={e => setVolunteer(v => ({ ...v, skills: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Availability</label>
                    <select className="form-select" value={volunteer.availability} onChange={e => setVolunteer(v => ({ ...v, availability: e.target.value }))}>
                      <option value="">Select availability…</option>
                      <option>Weekends only</option>
                      <option>Weekdays only</option>
                      <option>Flexible — any time</option>
                      <option>Event days only</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>🙋 Sign Up to Volunteer</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section id="feedback" style={{ padding: '4rem 2rem 5rem' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Share Your Thoughts</div>
            <h2 className="section-title">Community <span className="accent">Feedback</span></h2>
            <p className="section-desc">Your feedback helps us improve. Tell us what you loved — or what we can do better.</p>
          </div>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            {fbStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(200,132,26,0.06)', border: '1px solid rgba(200,132,26,0.15)', borderRadius: '24px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💛</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>Thank You!</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>Your feedback has been submitted. We appreciate you helping NKK grow!</p>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <form onSubmit={handleFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input className="form-input" placeholder="Your Name" value={feedback.name} onChange={e => setFeedback(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="your@email.com" value={feedback.email} onChange={e => setFeedback(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Overall Rating</label>
                    <select className="form-select" value={feedback.rating} onChange={e => setFeedback(f => ({ ...f, rating: e.target.value }))}>
                      <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                      <option value="4">⭐⭐⭐⭐ Very Good</option>
                      <option value="3">⭐⭐⭐ Good</option>
                      <option value="2">⭐⭐ Fair</option>
                      <option value="1">⭐ Needs Improvement</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Comments</label>
                    <textarea className="form-textarea" placeholder="Share your thoughts about NKK events, programs, or how we can improve…" required value={feedback.comments} onChange={e => setFeedback(f => ({ ...f, comments: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-outline" style={{ justifyContent: 'center' }}>💬 Submit Feedback</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
