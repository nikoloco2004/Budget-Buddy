# 💸 Budget Buddy

**An AI-powered web app that helps users create personalized zero-based budgets.**  
Input your income and expenses, and let Google Gemini generate a suggested budget — stored securely in MongoDB Atlas.

---

## 🌟 Features

- Input monthly income & recurring expenses
- Customize budget categories
- AI-generated zero-based budget via Gemini
- Accept, tweak, or regenerate suggested budgets
- Save and view past budgets from MongoDB
- Visualize with pie charts
- Clean UI with Midnight and React

---

## 🛠️ Tech Stack

| Layer       | Tech Used                        |
|-------------|----------------------------------|
| Frontend    | React + Vite + Midnight UI       |
| Backend     | Node.js + Express                |
| AI Model    | Google Gemini API (gemini-2.0-flash) |
| Database    | MongoDB Atlas (cloud database)   |
| Charts      | Chart.js + chartjs-plugin-datalabels |

---

## 🚀 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/budget-buddy.git
cd budget-buddy
2. Install backend dependencies
bash
Copy
Edit
npm install
3. Install frontend dependencies
bash
Copy
Edit
cd budget-buddy-ui
npm install
cd ..
4. Set up .env
Create a .env file in the root directory. Use .env.example as a guide:

ini
Copy
Edit
GEMINI_API_KEY=your-real-key-here
MONGODB_URI=your-mongodb-uri-here
🌐 MongoDB Atlas Setup
If you’re new to MongoDB Atlas, follow these simple steps:

Go to https://www.mongodb.com/cloud/atlas

Create a free account and new project

Create a cluster (you can use the free "Shared Cluster")

Go to Database → Connect → Drivers, and copy the connection string

Paste it in your .env like:

env
Copy
Edit
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/budgetbuddy?retryWrites=true&w=majority
Make sure your IP is whitelisted (0.0.0.0/0 for public testing)

Create a database named budgetbuddy with a budgets collection — or let the app do it automatically on first save.

🧠 Gemini API Setup
Go to https://makersuite.google.com/app

Click Get API Key and copy it

Paste it in .env as GEMINI_API_KEY

▶️ Run the App
bash
Copy
Edit
npm run dev
Frontend: http://localhost:5173

Backend API: http://localhost:3000

🖼 Assets
All images and logos are located in:

arduino
Copy
Edit
budget-buddy-ui/public/
Reference them in code with:

jsx
Copy
Edit
<img src="/2.png" />
🧪 Test It Works
Try entering:

An income of $3000

Some monthly expenses

A few custom budget categories

Gemini will suggest a budget, and you can save it, view it later, or tweak it again.

📝 Notes
Don’t commit your .env file — it should never be uploaded!

This app is beginner-friendly and perfect for FinTech hackathons like Hackabull.

Need help? Open an issue or pull request!

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

⚡ License
MIT — free to use and modify.

yaml
Copy
Edit

---

## ✅ Final Checklist Before Pushing

- [x] You’ve committed all files (`budget-buddy-ui/`, `server.js`, etc.)
- [x] `.env` is in `.gitignore`
- [x] `.env.example` is created
- [x] `README.md` is placed in the root

---

Want me to generate a ZIP of this README + .env.example and email it? Or walk you through pushing this to GitHub cleanly?
