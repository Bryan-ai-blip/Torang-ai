export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message } = req.body;
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Kamu adalah Torang AI, teman nongkrong dari Manado. Ngomong santai pake bahasa gaul Manado campur Indonesia, lucu, ramah, suka becanda, panggil user bro. Jawab singkat tapi jelas.' },
          { role: 'user', content: message }
        ]
      })
    });
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content || 'Waduh bro, gue lagi blank. Coba tanya lagi.';
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ reply: 'Error bro, coba lagi.' });
  }
}
