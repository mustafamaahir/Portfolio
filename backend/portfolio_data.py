"""
Portfolio data - Replace with your actual information
"""

PORTFOLIO_DATA = {
    "bio": {
        "name": "Mustafa Mudathir K",
        "title": "AI Data Analyst & Scientist",
        "summary": "Proactive and results-driven Data and AI Analyst with experience in data analytics, backend API development, and intelligent system design. Proficient in Microsoft Excel for data preparation, reporting, and visualization. Skilled in applying analytical methods, Python programming, and machine learning techniques to solve real-world problems. Adept at collaborating across teams to design scalable AI-powered systems that enhance decision making and operational efficiency.",
        "email": "mustafamaahir@gmail.com",
        "linkedin": "https://linkedin.com/in/mustafamudathir",
        "github": "https://github.com/mustafamaahir",
        "location": "Lagos, Nigeria",
        "availability": "Open to opportunities"
    },
    
    "experience": [
        {
            "id": 1,
            "role": "AI Data Science Intern",
            "company": "SAIL Innovation Lab",
            "period": "April 2025 - September 2025",
            "description": "Gained hands-on experience in data science, backend API development, and AI-powered system design. Worked on exploratory data analysis, predictive modeling, and deployment of intelligent applications using modern AI frameworks.",
            "achievements": [
                "Faced with the need to automate decision-making processes, contributed to building AI-driven applications by developing and integrating Large Language Models, resulting in intelligent automation solutions",
                "Tasked with enabling real-time data exchange, designed and implemented FastAPI backend services that allowed seamless communication between models and client applications",
                "Worked in a cross-functional environment where models needed production integration, collaborated with AI, backend, and frontend teams to streamline API workflows and improve system reliability",
                "Assigned to predictive analytics tasks, applied Python and R for exploratory data analysis and model building, leading to more accurate forecasting outputs"
            ],
            "technologies": ["Python", "R", "FastAPI", "LLMs", "REST APIs", "Machine Learning"]
        },
        {
            "id": 2,
            "role": "Corp Member – Account Unit",
            "company": "Federal Airports Authority of Nigeria (FAAN)",
            "period": "July 2023 - July 2024",
            "description": "Supported financial operations through data automation, reporting, and compliance monitoring. Improved efficiency and accuracy of financial reporting using Excel-based solutions.",
            "achievements": [
                "In a manual and error-prone reporting environment, was responsible for improving efficiency and automated financial report generation using Excel templates, significantly reducing manual workload",
                "With challenges in tracking voucher retirements, designed a data validation and monitoring system that improved compliance with reporting timelines",
                "Required to support management decision-making, summarized daily and weekly financial collections using PivotTables, enabling clearer financial insights",
                "Addressed recurring data inconsistencies by standardizing Excel workflows, resulting in improved data accuracy and reporting reliability"
            ],
            "technologies": ["Microsoft Excel", "PivotTables", "Formulas", "Data Validation"]
        },
        {
            "id": 3,
            "role": "Data Analyst Intern",
            "company": "Lagos State Polytechnic, Ikorodu",
            "period": "March 2018 - February 2019",
            "description": "Assisted in academic data analysis and reporting within the Statistics Department. Supported students and faculty with data collection, analysis, and visualization.",
            "achievements": [
                "Faced with unstructured academic records, analyzed student performance data using Excel and R to generate clear summaries and trend reports",
                "Tasked with monitoring attendance and progress, created dashboards that enabled the department to easily track academic performance",
                "Supported faculty research activities by assisting with data collection and cleaning, improving the quality of datasets used for analysis",
                "Provided analytical support to students by guiding them through data visualization techniques, improving project outcomes"
            ],
            "technologies": ["Microsoft Excel", "R", "Data Visualization", "Dashboards"]
        }

    ],
    
    "projects": [
        {
            "id": "rainfall-forecasting-ai",
            "title": "Rainfall Forecasting & Chatbot AI System",
            "shortDesc": "AI-powered weather forecasting platform with predictive models and an intelligent chatbot interface.",
            "fullDesc": "An integrated AI system designed to provide automated rainfall forecasts and intelligent chatbot recommendations. The platform combines machine learning models, AI agents, and RESTful APIs to deliver real-time predictions and conversational insights. Built with a modular backend architecture to ensure scalability, accuracy, and seamless communication between predictive models, chatbot services, and frontend components.",
            "tech": ["Python", "FastAPI", "SQLite", "TensorFlow", "scikit-learn", "Groq API", "REST APIs"],
            "features": [
                "Machine learning models for rainfall prediction",
                "AI-powered chatbot for weather-related recommendations",
                "Unified backend architecture integrating models and chatbot services",
                "RESTful APIs for seamless frontend and service communication",
                "Scalable database schema and efficient data flow management",
                "Cloud deployment for real-time access and automation"
            ],
            "github": "https://github.com/mustafamaahir/RainPro_Backend_Agent",
            "image": "/images/rainfall-ai.png",
            "highlights": "Integrated predictive modeling and conversational AI into a single platform, improving accessibility to weather insights"

        },
        {
            "id": "school-result-management-system",
            "title": "School Result Management System",
            "shortDesc": "Full-stack academic result management platform with automation and data visualization.",
            "fullDesc": "A full-featured web application designed to manage academic results securely and efficiently. The system supports automated result uploads, data validation, role-based access control, and interactive dashboards for performance analysis. Built to reduce manual administrative workload while improving accuracy, transparency, and reporting speed.",
            "tech": ["React.js", "FastAPI", "PostgreSQL", "Pandas", "Recharts", "Bootstrap"],
            "features": [
                "Automated Excel and CSV result uploads",
                "Data validation and error handling workflows",
                "Role-based access control for administrators and students",
                "Interactive dashboards for academic performance trends",
                "Secure backend APIs for result processing",
                "Efficient database design for scalable academic records"
            ],
            "github": "https://github.com/mustafamaahir/School_Result_App",
            "image": "/images/Admin_port.png",
            "highlights": "Reduced administrative reporting time by 70% through automation and visualization"
        },
        {
            "id": "ab-testing-marketing",
            "title": "A/B Testing for Marketing Campaigns",
            "shortDesc": "Statistical experimentation framework for evaluating marketing campaign performance.",
            "fullDesc": "A data-driven experimentation project focused on measuring the effectiveness of marketing campaigns using hypothesis testing. The system applies statistical methods to compare campaign variants and presents results through an interactive dashboard, enabling evidence-based marketing decisions.",
            "tech": ["Python", "SciPy", "Streamlit"],
            "features": [
                "Hypothesis testing using t-tests",
                "Statistical comparison of campaign variants",
                "Interactive visualization of confidence intervals",
                "Streamlit dashboard for real-time result exploration",
                "Clear interpretation of statistical outcomes",
                "Support for data-driven marketing decisions"
            ],
            "github": "https://github.com/mustafamaahir/Data-projects-portfolio-with-streamlit",
            "image": "/images/ab-testing.png",
            "highlights": "Enabled statistically sound campaign decisions through automated testing and visualization"

        },
        {
            "id": "business-financial-management-suite",
            "title": "Business Financial Management Suite",
            "shortDesc": "Professional Excel-based system for executive budget tracking and investor management with automated dashboards.",
            "fullDesc": "A comprehensive financial management solution consisting of two production-ready Microsoft Excel workbooks designed for business owners and executives. The suite enables automated budget tracking, income and expense monitoring, investor record management, payment tracking, ROI calculation, and dividend monitoring. Built entirely with formulas, data validation, and protected structures, the system delivers real-time insights through executive dashboards while ensuring data accuracy, security, and ease of use without macros.",
            "tech": ["Microsoft Excel", "Advanced Formulas", "Pivot-style Calculations", "Data Validation", "Conditional Formatting"],
            "features": [
                "Executive budget dashboard with KPI cards, charts, and bi-monthly period selector",
                "Automated income, expense, savings, and variance tracking across six bi-monthly periods",
                "Investor management dashboard with month-based ROI and dividend filtering",
                "Investor records database with active/inactive status control",
                "Payment tracking system for capital, dividends, and refunds with status monitoring",
                "Fully automated calculations using SUMIFS, COUNTIFS, SUMPRODUCT, and MONTH functions",
                "Conditional formatting for paid, pending, overdue, and inactive statuses",
                "Protected formulas with unlocked input cells for secure data entry"
            ],
            "github": "https://github.com/mustafamaahir/Investor-Budget-tracking-system",
            "image": "/images/business-financial-suite.png",
            "highlights": "Two client-ready Excel systems with automated dashboards, zero macros, secure formulas, and real-time financial insights"

        },
        {
        "id": "advanced-excel-data-entry-reporting",
        "title": "Advanced Excel Data Entry & Reporting Template",
        "shortDesc": "Professional Excel workbook for operational data entry, transaction management, and executive reporting.",
        "fullDesc": "A fully Excel-based, production-ready workbook designed for accurate operational data entry, transaction tracking, and department-level reporting. The system demonstrates advanced Excel capabilities through structured data validation, error detection, conditional formatting, and dynamic summary calculations. It is styled for executive presentation and includes PivotTable-ready sheets to support scalable, interactive reporting without the use of macros.",
        "tech": [
            "Microsoft Excel","XLOOKUP","INDEX & MATCH","OFFSET","SUMIFS","COUNTIFS","Data Validation","Conditional Formatting"],
        "features": [
            "Operational data entry sheet with validation-controlled department selection",
            "Automated error detection for invalid inputs using IF and IFERROR logic",
            "Advanced lookups using XLOOKUP and INDEX-MATCH combinations",
            "Dynamic summary reports using SUMIFS, COUNTIFS, and AVERAGEIFS",
            "Transaction logging system with status-based validation and exception highlighting",
            "Conditional formatting to flag errors and high-value transactions",
            "PivotTable and PivotChart placeholders for scalable dashboards",
            "Professional styling with consistent color schemes and executive-ready layouts"
        ],
        "github": "https://github.com/mustafamaahir/Excel_for-_data_",
        "image": "/images/advanced-excel-reporting.png",
        "highlights": "Demonstrates advanced Excel data management, validation, and reporting techniques suitable for business analytics and operations roles"
        }
    ],
    
    "skills":
        {
            "frontend": ["React.js","HTML5","CSS3","Recharts","Bootstrap","JavaScript (ES6+)"],
            "backend": ["Python","FastAPI","REST APIs","PostgreSQL","SQLite","SQL"],
            "tools": ["Microsoft Excel","Power BI","Git","GitHub","VS Code","Postman", "Render", "Vercel", "Railway"],
            "ai_ml": ["Machine Learning","scikit-learn","TensorFlow","LLMs","Groq API","AI Agents"]
        },
    
    "testimonials": [
        {
            "id": 1,
            "name": "Sarah Johnson",
            "role": "CTO at TechCorp Solutions",
            "company": "TechCorp Solutions",
            "text": "Alex is an exceptional developer who consistently delivers high-quality work. Their ability to architect complex systems and mentor junior developers has been invaluable to our team. I highly recommend Alex for any challenging software project.",
            "image": "/images/testimonial-1.png"
        },
        {
            "id": 2,
            "name": "Michael Chen",
            "role": "Product Manager",
            "company": "StartupHub Inc",
            "text": "Working with Alex was a game-changer for our product. They transformed our requirements into elegant solutions and delivered ahead of schedule. Their technical expertise and communication skills made collaboration effortless.",
            "image": "/images/testimonial-2.png"
        },
        {
            "id": 3,
            "name": "Emily Rodriguez",
            "role": "Senior Software Engineer",
            "company": "Digital Innovations Ltd",
            "text": "Alex is one of the most talented developers I've worked with. Their code is clean, well-documented, and follows best practices. They're also great at problem-solving and always willing to help teammates.",
            "image": "/images/testimonial-3.png"
        }
    ]
}