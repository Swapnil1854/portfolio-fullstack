import { useEffect, useState } from 'react'
import styles from './Experience.module.css'

export default function Experience() {
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/experience')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch experience')
        return res.json()
      })
      .then((data) => {
        setTimeline(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <section id="experience" className={styles.experience}>
        <div className="container"><p>Loading experience...</p></div>
      </section>
    )

  if (error)
    return (
      <section id="experience" className={styles.experience}>
        <div className="container"><p>Error: {error}</p></div>
      </section>
    )

  return (
    <section id="experience" className={styles.experience}>
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">My professional journey and continuous learning</p>
        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <div key={item.id ?? i} className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>{item.date}</div>
                <div className={styles.timelineTitle}>{item.title}</div>
                <div className={styles.timelineCompany}>{item.company}</div>
                <div className={styles.timelineDescription}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}