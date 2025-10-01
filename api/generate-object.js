import Together from 'together-ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

const SYSTEM_PROMPT = `You are an expert materials scientist. Generate a breakdown following this structure:

{
  "name": "Object Name",
  "tagline": "A single powerful sentence (10-15 words)",
  "description": "2-3 sentences explaining material complexity",
  "metals": [
    {
      "name": "Metal Name",
      "symbol": "Symbol",
      "emoji": "emoji",
      "function": "How this metal is essential (40-60 words)",
      "journey": "Where and how extracted (40-60 words)",
      "impact": "Environmental and human costs (40-60 words)",
      "wonder": "Poetic reflection (25-35 words)",
      "locations": ["Country 1", "Country 2", "Country 3"]
    }
  ],
  "footprint": {
    "countries": 15,
    "water": "X liters",
    "co2": "X kg",
    "laborHours": 50,
    "conflictMinerals": 1,
    "recyclable": "Description"
  }
}

Return ONLY valid JSON.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { objectName } = req.body;
    if (!objectName) return res.status(400).json({ error: 'Object name required' });

    const response = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Generate breakdown for: ${objectName}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3000
    });

    const objectData = JSON.parse(response.choices[0].message.content);
    objectData.generated = true;
    objectData.heroImage = "ai-generated";
    objectData.metals.forEach(m => m.visualImage = "ai-generated");

    return res.status(200).json(objectData);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Generation failed' });
  }
}
