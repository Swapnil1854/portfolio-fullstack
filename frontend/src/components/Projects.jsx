// import { useEffect, useRef } from 'react'
// import styles from './Projects.module.css'
//
// const projects = [
//   {
//     title: 'EmpowerHer',
//     tech: 'Java • Firebase',
//     description:
//       'Women Entrepreneurship Platform connecting entrepreneurs, investors, and mentors to streamline the idea-to-funding workflow with real-time data sync.',
//     features: [
//       'Role-based authentication with 3 distinct user types',
//       'Firestore schema across 5 collections',
//       'Structured pitch submission with 6+ data fields',
//       'Multi-format media upload system',
//     ],
//     link: '#',
//     linkText: 'Explore Project',
//   },
//   {
//     title: 'HostelVista',
//     tech: 'Java • JavaFX • Firebase',
//     description:
//       'Comprehensive hostel management system with 10+ operational modules for bookings, complaints, and inventory with real-time synchronization.',
//     features: [
//       '10+ operational modules with JavaFX UI',
//       'Firebase Authentication with role-based access',
//       'Real-time Firestore integration',
//       'Automated administrative workflows',
//     ],
//     link: '#',
//     linkText: 'Explore Project',
//   },
//   {
//     title: 'Student Management API',
//     tech: 'Spring Boot • MySQL',
//     description:
//       'RESTful API for comprehensive student record management with complete CRUD operations, clean architecture, and thorough testing coverage.',
//     features: [
//       '5 RESTful API endpoints',
//       'MVC architecture implementation',
//       'MySQL database integration',
//       'Full test coverage across scenarios',
//     ],
//     link: 'https://github.com/Swapnil1854/student-management',
//     linkText: 'View on GitHub',
//   },
// ]
//
// export default function Projects() {
//   const cardsRef = useRef([])
//
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.style.opacity = '1'
//             entry.target.style.transform = 'translateY(0)'
//           }
//         })
//       },
//       { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
//     )
//     cardsRef.current.forEach((el) => el && observer.observe(el))
//     return () => observer.disconnect()
//   }, [])
//
//   return (
//     <section id="projects" className={styles.projects}>
//       <div className="container">
//         <h2 className="section-title">Projects</h2>
//         <p className="section-subtitle">Showcasing my work and technical expertise</p>
//         <div className={styles.projectsGrid}>
//           {projects.map((p, i) => (
//             <div
//               key={i}
//               className={styles.projectCard}
//               ref={(el) => (cardsRef.current[i] = el)}
//               style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
//             >
//               <div className={styles.projectHeader}>
//                 <h3 className={styles.projectTitle}>{p.title}</h3>
//                 <span className={styles.projectTech}>{p.tech}</span>
//               </div>
//               <p className={styles.projectDescription}>{p.description}</p>
//               <ul className={styles.projectFeatures}>
//                 {p.features.map((f, j) => <li key={j}>{f}</li>)}
//               </ul>
//               <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
//                 {p.linkText}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

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