import { useState, useEffect } from 'react'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../services/api'
import styles from './AdminDashboard.module.css'

export default function SkillManager() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ category: '', items: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await getSkills()
      setSkills(res.data)
    } catch {
      setError('Failed to load skills')
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
      const payload = {
        ...form,
        items: form.items.split(',').map(i => i.trim()).filter(Boolean),
      }

      if (editingId) {
        await updateSkill(editingId, payload)
      } else {
        await createSkill(payload)
      }

      setForm({ category: '', items: '' })
      setEditingId(null)
      fetchSkills()
    } catch {
      setError('Failed to save skill')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (skill) => {
    setForm({
      category: skill.category,
      items: Array.isArray(skill.items) ? skill.items.join(', ') : skill.items,
    })
    setEditingId(skill.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    try {
      await deleteSkill(id)
      setSkills(prev => prev.filter(s => s.id !== id))
    } catch {
      alert('Failed to delete skill')
    }
  }

  return (
    <div className={styles.managerSection}>
      <h2>💻 Skills</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Languages, Backend)"
          value={form.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="items"
          placeholder="Skills (comma-separated, e.g., Java, Python, JavaScript)"
          value={form.items}
          onChange={handleChange}
          required
          rows="3"
        />

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formActions}>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Skill
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setForm({ category: '', items: '' })
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className={styles.listSection}>
        <h3>All Skills ({skills.length})</h3>
        <div className={styles.itemsList}>
          {skills.map(s => (
            <div key={s.id} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h4>{s.category}</h4>
              </div>
              <p>{Array.isArray(s.items) ? s.items.join(', ') : s.items}</p>
              <div className={styles.itemActions}>
                <button onClick={() => handleEdit(s)} className={styles.editBtn}>✏️ Edit</button>
                <button onClick={() => handleDelete(s.id)} className={styles.deleteBtn}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}