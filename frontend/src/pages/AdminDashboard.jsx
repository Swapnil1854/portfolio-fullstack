import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMessages, deleteMessage, getProjects, getSkills, getExperience, getCertifications } from '../services/api'
import { useAuth } from '../context/AuthContext'
import ProjectManager from './ProjectManager'
import SkillManager from './SkillManager'
import ExperienceManager from './ExperienceManager'
import CertificationManager from './CertificationManager'
import styles from './AdminDashboard.module.css'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({ messages: 0, projects: 0, skills: 0, experience: 0, certs: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [msgs, projs, skills, exps, certs] = await Promise.all([
        getMessages(),
        getProjects(),
        getSkills(),
        getExperience(),
        getCertifications(),
      ])
      setStats({
        messages: msgs.data.length,
        projects: projs.data.length,
        skills: skills.data.length,
        experience: exps.data.length,
        certs: certs.data.length,
      })
    } catch {
      setError('Failed to load statistics')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <span className={styles.logo}>SK</span>
            <span className={styles.headerTitle}>Admin Dashboard</span>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.refreshBtn} onClick={fetchStats}>↻ Refresh</button>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            <a href="/" className={styles.siteLink}>← Portfolio</a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.tabs}>
          {['overview', 'projects', 'skills', 'experience', 'certifications', 'messages'].map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && '📊 Overview'}
              {tab === 'projects' && '🚀 Projects'}
              {tab === 'skills' && '💻 Skills'}
              {tab === 'experience' && '💼 Experience'}
              {tab === 'certifications' && '🎓 Certifications'}
              {tab === 'messages' && '✉️ Messages'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className={styles.overviewTab}>
            <h2>Dashboard Overview</h2>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={styles.statNum}>{stats.projects}</div>
                <div className={styles.statLabel}>Projects</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum}>{stats.skills}</div>
                <div className={styles.statLabel}>Skills</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum}>{stats.experience}</div>
                <div className={styles.statLabel}>Experience</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum}>{stats.certs}</div>
                <div className={styles.statLabel}>Certifications</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum}>{stats.messages}</div>
                <div className={styles.statLabel}>Messages</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'skills' && <SkillManager />}
        {activeTab === 'experience' && <ExperienceManager />}
        {activeTab === 'certifications' && <CertificationManager />}
        {activeTab === 'messages' && <MessageTab />}
      </main>
    </div>
  )
}

// ── Messages Tab ──
// NOTE: styles is imported at the top of the file — do NOT use require() here
function MessageTab() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(null)

  useEffect(() => { fetchMessages() }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await getMessages()
      setMessages(res.data)
    } catch {
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    setDeleting(id)
    try {
      await deleteMessage(id)
      setMessages(prev => prev.filter(m => m.id !== id))
    } catch {
      alert('Failed to delete message')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className={styles.managerSection}>
      <h2>✉️ Messages</h2>

      {loading && <div className={styles.loadingMsg}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && messages.length === 0 && (
        <div className={styles.emptyMsg}>No messages yet</div>
      )}

      <div className={styles.messageGrid}>
        {messages.map(msg => (
          <div key={msg.id} className={styles.messageCard}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.msgName}>{msg.name}</div>
                <div className={styles.msgEmail}>{msg.email}</div>
              </div>
              <div className={styles.msgDate}>
                {new Date(msg.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className={styles.msgSubject}>{msg.subject}</div>
            <p className={styles.msgBody}>{msg.message}</p>
            <div className={styles.cardFooter}>
              <a href={`mailto:${msg.email}`} className={styles.replyBtn}>Reply</a>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(msg.id)}
                disabled={deleting === msg.id}
              >
                {deleting === msg.id ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}