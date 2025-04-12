// ✅ Updated server.js with simplified Gemini prompt
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const fetch = require('node-fetch'); // if needed

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const uri = "mongodb://nikoloco2004:125Nmmf1gsp7.@ac-rwfxkxx-shard-00-00.pshxsz5.mongodb.net:27017,ac-rwfxkxx-shard-00-01.pshxsz5.mongodb.net:27017,ac-rwfxkxx-shard-00-02.pshxsz5.mongodb.net:27017/?replicaSet=atlas-ll0757-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=budget-cluster";

const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("budgetbuddy");
    const expenses = db.collection("expenses");

    app.get('/', (req, res) => {
      res.send('👋 Budget Buddy API is live with MongoDB + Gemini!');
    });

    app.post('/save-expense', async (req, res) => {
      const newExpense = req.body;
      if (!newExpense.category || !newExpense.amount) {
        return res.status(400).json({ error: "Missing category or amount" });
      }
      try {
        const result = await expenses.insertOne(newExpense);
        res.json({ success: true, insertedId: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: "Failed to save expense" });
      }
    });

    app.get('/expenses', async (req, res) => {
      const allExpenses = await expenses.find().toArray();
      res.json(allExpenses);
    });

    app.post('/ai/organize-expenses', async (req, res) => {
      const userExpenses = req.body.expenses;

      const prompt = `
You are a zero-based budgeting assistant.

Take the user's expenses and generate:
1. A zero-based budget breakdown
2. A UI layout using **Midnight UI** components

📦 Respond ONLY with JSON in this format:
{
  "budget": {
    "income": ...,
    "categories": [...]
  },
  "ui": {
    "components": [
      {
        "type": "card",
        "title": "My Budget",
        "content": [...]
      },
      {
        "type": "table",
        "title": "Breakdown",
        "headers": [...],
        "data": [...]
      },
      {
        "type": "form",
        "title": "Add Expense",
        "fields": [...],
        "submit_button_text": "Add"
      }
    ]
  }
}
Do NOT use 'ui_layout' or 'jsx' or 'chart' elements.
Just use clean JSON.
User income: $${req.body.income}

User expenses:
${JSON.stringify(req.body.expenses, null, 2)}
`;

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt }
                ]
              }
            ]
          })
        });

        const data = await response.json();
        console.log("📦 Gemini full response:", JSON.stringify(data, null, 2));

        res.json({
          response: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini"
        });

      } catch (err) {
        res.status(500).json({ error: "Gemini REST call failed" });
      }
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

startServer();




