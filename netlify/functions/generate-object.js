const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { objectName } = JSON.parse(event.body);

    if (!objectName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Object name required' })
      };
    }

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

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Generate breakdown for: ${objectName}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    const data = await response.json();
    const objectData = JSON.parse(data.choices[0].message.content);
    
    objectData.generated = true;
    objectData.heroImage = "ai-generated";
    objectData.metals.forEach(m => m.visualImage = "ai-generated");

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(objectData)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Generation failed' })
    };
  }
};
