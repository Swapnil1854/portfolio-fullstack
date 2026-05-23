import { useState } from 'react'
import { submitContact } from '../services/api'
import styles from './Contact.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let's build something amazing together</p>

        <div className={styles.contactContent}>
          {/* Info boxes */}
          <div className={styles.contactInfo}>
            <div className={styles.contactBox}>
              <h3>Email</h3>
              <a href="mailto:swapnilkadam.comp.nbnstic@gmail.com">
                swapnilkadam.comp.nbnstic@gmail.com
              </a>
            </div>
            <div className={styles.contactBox}>
              <h3>Phone</h3>
              <a href="tel:+917840966925">+91 7840 966 925</a>
            </div>
            <div className={styles.contactBox}>
              <h3>Location</h3>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

          {/* Social links */}
          <div className={styles.socialLinks}>
            <a href="https://linkedin.com/in/swapnil-kadam-18741422a" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="LinkedIn">in</a>
            <a href="https://github.com/Swapnil1854" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="GitHub">⚙️</a>
            <a href="mailto:swapnilkadam.comp.nbnstic@gmail.com" className={styles.socialLink} title="Email">✉️</a>
          </div>

          {/* Contact Form */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Send a Message</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                required
              />
            </div>

            {status === 'success' && (
              <div className={styles.successMsg}>
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className={styles.errorMsg}>❌ {errorMsg}</div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading'}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
