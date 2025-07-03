require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/gpt', async (req, res) => {
  try {
    const { OpenAI } = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { messages, helperType } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: helperType },
        ...messages,
      ],
    });

    const result = completion.choices[0].message.content;
    res.json({ result });
  } catch (err) {
    console.error('GPT error:', err);
    res.status(500).json({ error: 'GPT request failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
