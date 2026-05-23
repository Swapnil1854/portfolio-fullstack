import { getResumeUrl } from '../services/api'
import styles from './Hero.module.css'

export default function Hero() {
  const handleDownloadResume = () => {
    window.open(getResumeUrl(), '_blank')
  }

  return (
    <section className={styles.hero}>
      <div className={styles.scrollIndicator}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Building <span className={styles.gradient}>Software Solutions</span> That Scale
          </h1>
          <p className={styles.heroSubtitle}>
            Computer Engineering | Backend Developer | Cloud Infrastructure
          </p>
          <p className={styles.heroDescription}>
            I craft robust, scalable backend systems using Java, Spring Boot, and cloud technologies.
            Passionate about solving complex problems and delivering impactful software products.
          </p>
          <div className={styles.heroButtons}>
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </button>
            <button className="btn-secondary" onClick={handleDownloadResume}>
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
