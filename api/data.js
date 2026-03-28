const GAS_URL = 'https://script.google.com/macros/s/AKfycbwpsZuNYQEoZoZF5Zo-E9yxEII-PAb7cU2xRr0bW2aFBHZXL2rdYES6O7KlxRLXtoV4SQ/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const response = await fetch(GAS_URL, { redirect: 'follow' });
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
