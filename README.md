# Riduan Aziz — Personal IT & Software Engineering Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=flat-square&logo=github)](https://riduanaziz.github.io/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Welcome to the source repository for the personal technical portfolio of **Riduan Aziz**, deployed live at **[riduanaziz.github.io](https://riduanaziz.github.io/)**.

This website is a production-quality, responsive personal portfolio designed to present a coherent career story bridging **Software Engineering**, **Data Management & Analytics**, and **AI/ML Applications**.

---

## 🌐 Live Preview

- **Production URL:** [https://riduanaziz.github.io](https://riduanaziz.github.io/)
- **Repository:** [https://github.com/RiduanAziz/riduanaziz.github.io](https://github.com/RiduanAziz/riduanaziz.github.io)

---

## 🎯 Core Professional Identity

- **Name:** Riduan Aziz
- **Headline:** Software Engineer | Data & AI/ML Enthusiast
- **Education:** B.Sc. in Computer Science and Engineering — Cox's Bazar International University (CGPA: 3.782 / 4.00)
- **Positioning:** Bridging real-world field data experience in humanitarian operations with modern software engineering, machine learning research, and intelligent software development.

---

## ✨ Key Features & Architectural Highlights

- **Data-Driven Architecture:** All experience, skill sets, project metadata, concepts, and credentials are decoupled into structured JSON/JavaScript data schemas (`src/data/portfolioData.js`) for rapid updates without altering core visual components.
- **Modern UI/UX Visual Language:** Deep navy & charcoal dark mode palette, high-contrast light mode, technical data grid accents, and typography hierarchy built with *Inter*.
- **Dark / Light Theme Toggle:** System-aware theme toggle with persistent state handling.
- **Recruiter-Friendly Showcase:** Highlighting career trajectories, verifiable CGPA metrics, field experience (World Vision, Handicap International), personal software projects (SpendWise, Aziz Mansion), and AI research (Bengali ASR, Dynamic ASL Recognition).
- **Automated CI/CD Pipeline:** Integrated GitHub Actions workflow (`deploy.yml`) that builds and deploys the production distribution (`dist`) directly to GitHub Pages on every commit to the primary branch.
- **Fully Responsive & Accessible:** Optimized for seamless performance across mobile (320px+), tablet, laptop, and ultra-wide desktop monitors.

---

## 🛠️ Tech Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling & System** | Tailwind CSS, PostCSS, Autoprefixer |
| **Icons & Animations** | Lucide React, Framer Motion |
| **CI/CD & Hosting** | GitHub Actions, GitHub Pages |
| **Version Control** | Git, GitHub |

---

## 📁 Repository Structure

```text
RiduanAziz.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD deployment workflow
├── public/
│   ├── assets/
│   │   └── CV of Riduan Aziz.pdf  # Downloadable resume document
│   └── favicon.svg             # Website tab icon
├── src/
│   ├── data/
│   │   └── portfolioData.js    # Source-of-truth data store (Projects, Experience, Skills)
│   ├── App.jsx                 # Core portfolio application component
│   ├── index.css               # Global CSS & Tailwind directives
│   └── main.jsx                # Application root entry point
├── .gitignore                  # Git exclusions file
├── index.html                  # Main HTML template with SEO metadata
├── LICENSE                     # Open-source license
├── package.json                # Project dependencies and script definitions
├── postcss.config.js           # PostCSS configuration for Tailwind
├── tailwind.config.js          # Custom theme & color configuration
└── vite.config.js              # Vite configuration (base route '/')
```
---

## 🚀 Local Development Setup
Follow these steps to run the portfolio locally on your machine:

Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

1. Clone the Repository
```Bash
git clone [https://github.com/RiduanAziz/riduanaziz.github.io.git](https://github.com/RiduanAziz/riduanaziz.github.io.git)
cd riduanaziz.github.io
```

2. Install Dependencies
```Bash
npm install
```

3. Launch the Local Development Server
```Bash
npm run dev
```
- Open your browser and navigate to http://localhost:5173/. Any changes saved in VS Code will update automatically in real-time (Hot Module Replacement).

4. Build for Production
To test the production build locally:

```Bash
npm run build
npm run preview
```
---

## 📝 Updating Portfolio Content
All site content is centralized in src/data/portfolioData.js. You do not need to modify layout code to update your achievements or projects:

1. Adding Projects: Add new project objects to the projects array in portfolioData.js.

2. Updating Skills: Modify the primary, workingKnowledge, or exploring arrays under skills.

3. Updating Experience or Education: Edit the experience or education entries directly.

4. Updating Resume: Place your updated resume file in public/assets/ and verify the file path in App.jsx.
---

## 🚢 GitHub Pages Deployment
Deployment is 100% automated using GitHub Actions:

1. Push your changes to the main or master branch:

```Bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

2. The .github/workflows/deploy.yml workflow will automatically trigger, build the Vite application, and publish the compiled static site to GitHub Pages.

3. Verify settings under Repository Settings > Pages > Source, ensuring GitHub Actions is selected as the build source.
---

## 📬 Contact & Links
- Name: Riduan Aziz
- Email: riduan.aziz46@gmail.com
- LinkedIn: linkedin.com/in/riduan-aziz
- GitHub: github.com/RiduanAziz
---

## 📄 License
This project is licensed under the MIT License.
---
