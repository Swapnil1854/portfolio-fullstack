import { useEffect, useRef, useState } from 'react'
import styles from './Certifications.module.css'

export default function Certifications() {
  const cardsRef = useRef([])
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/certifications')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch certifications')
        return res.json()
      })
      .then((data) => {
        setCerts(data)
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
      { threshold: 0.1 }
    )
    cardsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [certs])

  if (loading)
    return (
      <section id="certifications" className={styles.certs}>
        <div className="container"><p>Loading certifications...</p></div>
      </section>
    )

  if (error)
    return (
      <section id="certifications" className={styles.certs}>
        <div className="container"><p>Error: {error}</p></div>
      </section>
    )

  return (
    <section id="certifications" className={styles.certs}>
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">Industry-recognized credentials</p>
        <div className={styles.certsGrid}>
          {certs.map((c, i) => (
            <div
              key={c.id ?? i}
              className={styles.certCard}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
            >
              <div className={styles.certIcon}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p><strong>{c.issuer}</strong></p>      {/* was c.subtitle */}
              <p className={styles.certDesc}>{c.description}</p>  {/* was c.desc */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}