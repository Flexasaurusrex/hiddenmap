import Together from 'together-ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { metalName } = req.body;
    const prompt = `Extreme macro photograph of ${metalName} in raw crystalline form, dramatic lighting, 8K`;

    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1.1-pro",
      prompt: prompt,
      width: 1024,
      height: 1024,
      steps: 28,
      n: 1
    });

    return res.status(200).json({
      imageUrl: response.data[0].url,
      prompt: prompt
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Image generation failed' });
  }
}
