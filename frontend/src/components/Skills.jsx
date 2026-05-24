import { useEffect, useRef, useState } from 'react'
import styles from './Skills.module.css'

export default function Skills() {
  const cardsRef = useRef([])
  const [skillsData, setSkillsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://portfolio-fullstack-w1z9.onrender.com/api/skills')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch skills')
        return res.json()
      })
      .then((data) => {
        setSkillsData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
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
  }, [skillsData])

  if (loading)
    return (
      <section id="skills">
        <div className="container">
          <p>Loading skills...</p>
        </div>
      </section>
    )

  if (error)
    return (
      <section id="skills">
        <div className="container">
          <p>Error: {error}</p>
        </div>
      </section>
    )

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>
        <div className={styles.skillsGrid}>
          {skillsData.map((skill, i) => (
            <div
              key={skill.id ?? i}
              className={styles.skillCard}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              <h4>{skill.category}</h4>
              <p>{skill.items.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}