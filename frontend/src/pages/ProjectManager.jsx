import { useState, useEffect } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '../services/api'
import styles from './AdminDashboard.module.css'

export default function ProjectManager() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    tech: '',
    features: '',
    githubLink: '',
    demoLink: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await getProjects()
      setProjects(res.data)
    } catch {
      setError('Failed to load projects')
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
        features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      }

      if (editingId) {
        await updateProject(editingId, payload)
      } else {
        await createProject(payload)
      }

      setForm({
        title: '',
        description: '',
        tech: '',
        features: '',
        githubLink: '',
        demoLink: '',
      })
      setEditingId(null)
      fetchProjects()
    } catch {
      setError('Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech,
      features: Array.isArray(project.features) ? project.features.join(', ') : project.features,
      githubLink: project.githubLink || '',
      demoLink: project.demoLink || '',
    })
    setEditingId(project.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await deleteProject(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch {
      alert('Failed to delete project')
    }
  }

  return (
    <div className={styles.managerSection}>
      <h2>🚀 Projects</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tech"
            placeholder="Tech Stack (e.g., React, Node.js)"
            value={form.tech}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="2"
        />

        <textarea
          name="features"
          placeholder="Features (comma-separated)"
          value={form.features}
          onChange={handleChange}
          rows="2"
        />

        <div className={styles.formRow}>
          <input
            type="url"
            name="githubLink"
            placeholder="GitHub Link"
            value={form.githubLink}
            onChange={handleChange}
          />
          <input
            type="url"
            name="demoLink"
            placeholder="Demo Link"
            value={form.demoLink}
            onChange={handleChange}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formActions}>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Project
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setForm({ title: '', description: '', tech: '', features: '', githubLink: '', demoLink: '' })
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className={styles.listSection}>
        <h3>All Projects ({projects.length})</h3>
        <div className={styles.itemsList}>
          {projects.map(p => (
            <div key={p.id} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h4>{p.title}</h4>
                <span className={styles.badge}>{p.tech}</span>
              </div>
              <p>{p.description}</p>
              <div className={styles.itemActions}>
                <button onClick={() => handleEdit(p)} className={styles.editBtn}>✏️ Edit</button>
                <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}