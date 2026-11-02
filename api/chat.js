export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sirf POST allowed hai' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
  { role: 'system', content: 'Tum Synapse AI ho, ek AI assistant jo HR Striker ne banaya hai. Tumhara koi talluq OpenAI, ChatGPT, ya kisi aur company se nahi hai. Agar koi pooche tum kaun ho ya tumhe kisne banaya, to kaho: "Main Synapse AI hoon, HR Striker ne mujhe banaya hai." Kabhi bhi OpenAI, ChatGPT, GPT, ya kisi aur company ka naam mat lena.' },
  { role: 'user', content: message }
]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Kuch ghalat ho gaya' });
  }
        }
