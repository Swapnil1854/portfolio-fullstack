import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <h2 className="section-title">About</h2>
        <p className="section-subtitle">Computer Engineering student with a strong foundation in backend development</p>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <h3>Who I Am</h3>
            <p>
              I'm a Computer Engineering student at NBN Sinhgad Technical Institute with a passion for building
              robust, scalable backend systems. With hands-on experience in Spring Boot, Firebase, and Oracle Cloud,
              I specialize in designing systems that solve real-world problems.
            </p>
            <h3>What I Do</h3>
            <p>
              I develop RESTful APIs, architect database schemas, implement authentication systems, and optimize
              application performance. My recent internship at NEUAI Labs reinforced my ability to work in agile
              teams and deliver production-grade features.
            </p>
            <p>
              Beyond code, I'm fascinated by how technology drives impact. Whether it's through my research on
              women entrepreneurship or building hostel management systems, I focus on creating solutions that matter.
            </p>
          </div>
          <div>
            <div className={styles.stats}>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Problems Solved</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>4</div>
                <div className={styles.statLabel}>Major Projects</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>5+</div>
                <div className={styles.statLabel}>Tech Stack</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
