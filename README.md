# 🚀 Swapnil Kadam — Developer Portfolio

A full-stack personal portfolio website with a secure admin panel to manage all content dynamically.

---

## 🌐 Live Demo

https://swapnil-kadam.vercel.app

---

## ✨ Features

- **Dynamic Content** — All sections (Skills, Experience, Certifications, Projects) are managed via admin panel and stored in a database
- **Secure Admin Panel** — JWT-based authentication to protect admin routes
- **Contact Form** — Visitors can send messages; admin receives email notifications
- **Resume Download** — Resume served directly from the backend
- **Responsive Design** — Works on all screen sizes

---

## 🛠️ Tech Stack

### Backend
| Technology | Usage |
|---|---|
| Java | Primary language |
| Spring Boot | REST API framework |
| Spring Security + JWT | Authentication |
| Spring Mail | Email notifications |
| MySQL | Database |
| JPA / Hibernate | ORM |

### Frontend
| Technology | Usage |
|---|---|
| React | UI framework |
| Vite | Build tool |
| CSS Modules | Styling |
| Axios | HTTP client |

---

## 📁 Project Structure

```
portfolio-fullstack/
├── src/                        # Spring Boot backend
│   └── main/
│       ├── java/com/swapnil/portfolio/
│       │   ├── config/         # Security, CORS, Async config
│       │   ├── controller/     # REST controllers
│       │   ├── dto/            # Data transfer objects
│       │   ├── model/          # JPA entities
│       │   └── repository/     # Spring Data repositories
│       └── resources/
│           └── application-example.properties
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   └── services/           # API service (axios)
│   └── package.json
└── pom.xml
```

---

## ⚙️ Running Locally

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL (or Clever Cloud MySQL)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/portfolio-fullstack.git
cd portfolio-fullstack
```

2. Copy the example properties and fill in your credentials:
```bash
cp src/main/resources/application-example.properties src/main/resources/application.properties
```

3. Run the backend:
```bash
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the dev server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔐 Admin Panel

Access the admin panel at `/admin` on the frontend.

- Login with your admin credentials
- Manage Skills, Experience, Certifications, Projects
- View contact messages

---

## 📬 Contact

**Swapnil Kadam**
- Email: swapnilkadam.comp.nbnstic@gmail.com
- GitHub: github.com/Swapnil1854
- LinkedIn : linkedin.com/in/swapnil-kadam-18741422a

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
