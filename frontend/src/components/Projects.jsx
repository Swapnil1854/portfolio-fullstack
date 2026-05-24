
import { useEffect, useRef, useState } from 'react'
import { getProjects } from '../services/api'
import styles from './Projects.module.css'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const cardsRef = useRef([])

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )
    cardsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [loading, projects])

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Showcasing my work and technical expertise</p>

        {loading && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</p>}

        <div className={styles.projectsGrid}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={styles.projectCard}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <span className={styles.projectTech}>{p.tech}</span>
              </div>
              <p className={styles.projectDescription}>{p.description}</p>
              {p.features && p.features.length > 0 && (
                <ul className={styles.projectFeatures}>
                  {p.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
              )}
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                {p.githubLink && (
                  <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                    View on GitHub
                  </a>
                )}
                {p.demoLink && (
                  <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}