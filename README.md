# HostelVerse

A smart hostel management dashboard built with vanilla HTML, CSS, and JavaScript. Designed to digitise everyday hostel operations — from complaints and maintenance tracking to mess ratings and announcements.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)

## Features

- **Dashboard** — Quick overview with KPI cards, recent complaints, today's menu, sentiment stats, and upcoming events
- **Complaint Tracker** — Submit and filter complaints with auto-assigned priority levels (Critical/High/Medium/Low) based on keyword detection
- **Mess Menu & Ratings** — Weekly menu with day selector, star ratings, written feedback, and live sentiment analysis
- **Maintenance Pipeline** — Kanban board (Pending → Assigned → In Progress → Completed) for tracking repair requests
- **Announcements** — Colour-coded notices (Urgent, Important, Info, Event) with author and date info
- **Analytics** — Doughnut chart for complaint categories, grouped bar chart for mess ratings, and AI-generated key insights
- **Chatbot (HostelBot)** — Answers 20+ hostel-related queries using fuzzy keyword matching
- **Notifications & Toasts** — Bell icon with unread indicators and contextual pop-up confirmations

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS3 (custom design system with CSS variables) |
| Logic | JavaScript ES6+ |
| Charts | Chart.js |
| Icons | Font Awesome 6 |
| Typography | Google Fonts (Inter) |

No frameworks. No build tools. No dependencies to install.

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/HostelVerse.git
   cd HostelVerse
   ```

2. Serve it with any HTTP server:
   ```bash
   # Python
   python -m http.server 8000

   # Or use VS Code Live Server, or any static file server
   ```

3. Open `http://localhost:8000` in your browser.

## Project Structure

```
├── index.html      # Page structure — all sections, modals, chatbot panel
├── styles.css      # Design system — variables, components, animations, responsive breakpoints
├── app.js          # Core logic — navigation, rendering, forms, charts
├── data.js         # Mock data — complaints, mess menu, maintenance, announcements
├── chatbot.js      # Chatbot knowledge base and keyword matching engine
└── README.md
```

