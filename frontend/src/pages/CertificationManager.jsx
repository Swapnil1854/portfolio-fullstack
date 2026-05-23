import { useState, useEffect } from 'react'
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../services/api'
import styles from './AdminDashboard.module.css'

export default function CertificationManager() {
  const [certs, setCerts] = useState([])
  const [form, setForm] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
    icon: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const res = await getCertifications()
      setCerts(res.data)
    } catch {
      setError('Failed to load certifications')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (editingId) {
        await updateCertification(editingId, form)
      } else {
        await createCertification(form)
      }

      setForm({ title: '', issuer: '', date: '', description: '', icon: '' })
      setEditingId(null)
      fetchCertifications()
    } catch {
      setError('Failed to save certification')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cert) => {
    setForm(cert)
    setEditingId(cert.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return
    try {
      await deleteCertification(id)
      setCerts(prev => prev.filter(c => c.id !== id))
    } catch {
      alert('Failed to delete certification')
    }
  }

  return (
    <div className={styles.managerSection}>
      <h2>🎓 Certifications</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <input
            type="text"
            name="title"
            placeholder="Certification Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="issuer"
            placeholder="Issuer/Organization"
            value={form.issuer}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="date"
          placeholder="Date (e.g., September 2025)"
          value={form.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="2"
        />

        <input
          type="text"
          name="icon"
          placeholder="Icon/Emoji (e.g., ☁️, 🎓)"
          value={form.icon}
          onChange={handleChange}
        />

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formActions}>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Certification
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setForm({ title: '', issuer: '', date: '', description: '', icon: '' })
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className={styles.listSection}>
        <h3>All Certifications ({certs.length})</h3>
        <div className={styles.itemsList}>
          {certs.map(c => (
            <div key={c.id} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h4>{c.icon} {c.title}</h4>
                <span className={styles.badge}>{c.issuer}</span>
              </div>
              <p className={styles.date}>{c.date}</p>
              {c.description && <p>{c.description}</p>}
              <div className={styles.itemActions}>
                <button onClick={() => handleEdit(c)} className={styles.editBtn}>✏️ Edit</button>
                <button onClick={() => handleDelete(c.id)} className={styles.deleteBtn}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}