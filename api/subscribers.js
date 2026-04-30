const API_KEY = "aaf774d8-f616-4178-9e8c-7fcf1936d161";
const BASE = "https://backend.botconversa.com.br/api/v1";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const page = req.query.page || 1;

  try {
    const response = await fetch(`${BASE}/subscribers/?page=${page}`, {
      headers: { "API-KEY": API_KEY },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `BotConversa error: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

