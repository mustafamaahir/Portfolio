# AI-Powered Portfolio Website

A modern, professional portfolio website with an integrated AI assistant powered by Groq API. Built with React, FastAPI, and Tailwind CSS.

```

Run the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
portfolio-project/
├── backend/
│   ├── main.py                 # FastAPI application & routes
│   ├── ai_service.py          # Groq API integration
│   ├── portfolio_data.py      # Your portfolio content (UPDATE THIS)
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
│
├── frontend/
│   ├── public/
│   │   └── images/           # Project images go here
│   ├── src/
│   │   ├── components/
│   │   │   ├── Portfolio.jsx      # Main portfolio component
│   │   │   ├── ChatAssistant.jsx  # AI chat interface
│   │   │   └── ProjectModal.jsx   # Project details modal
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env.example
│
└── README.md
```