import { useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logo}>SK</div>
          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
            <li><a onClick={() => scrollTo('about')}>About</a></li>
            <li><a onClick={() => scrollTo('skills')}>Skills</a></li>
            <li><a onClick={() => scrollTo('projects')}>Projects</a></li>
            <li><a onClick={() => scrollTo('experience')}>Experience</a></li>
            <li><a onClick={() => scrollTo('contact')}>Contact</a></li>
          </ul>
          <button className={styles.ctaButton} onClick={() => scrollTo('contact')}>
            Get in Touch
          </button>
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </nav>
      </div>
    </header>
  )
}
