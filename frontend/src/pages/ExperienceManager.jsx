import { useState, useEffect } from 'react'
import { getExperience, createExperience, updateExperience, deleteExperience } from '../services/api'
import styles from './AdminDashboard.module.css'

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([])
  const [form, setForm] = useState({
    title: '',
    company: '',
    date: '',
    description: '',
    type: 'internship',
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchExperience()
  }, [])

  const fetchExperience = async () => {
    try {
      const res = await getExperience()
      setExperiences(res.data)
    } catch {
      setError('Failed to load experience')
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
        await updateExperience(editingId, form)
      } else {
        await createExperience(form)
      }

      setForm({ title: '', company: '', date: '', description: '', type: 'internship' })
      setEditingId(null)
      fetchExperience()
    } catch {
      setError('Failed to save experience')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (exp) => {
    setForm(exp)
    setEditingId(exp.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return
    try {
      await deleteExperience(id)
      setExperiences(prev => prev.filter(e => e.id !== id))
    } catch {
      alert('Failed to delete experience')
    }
  }

  return (
    <div className={styles.managerSection}>
      <h2>💼 Experience</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="date"
          placeholder="Date (e.g., December 2025)"
          value={form.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
        />

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="internship">Internship</option>
          <option value="job">Job</option>
          <option value="freelance">Freelance</option>
          <option value="project">Project</option>
        </select>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formActions}>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Experience
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setForm({ title: '', company: '', date: '', description: '', type: 'internship' })
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className={styles.listSection}>
        <h3>All Experience ({experiences.length})</h3>
        <div className={styles.itemsList}>
          {experiences.map(e => (
            <div key={e.id} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h4>{e.title}</h4>
                <span className={styles.badge}>{e.company}</span>
              </div>
              <p className={styles.date}>{e.date}</p>
              <p>{e.description}</p>
              <div className={styles.itemActions}>
                <button onClick={() => handleEdit(e)} className={styles.editBtn}>✏️ Edit</button>
                <button onClick={() => handleDelete(e.id)} className={styles.deleteBtn}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}