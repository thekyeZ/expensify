// Edge Function: klasyfikacja tytułu wydatku do jednej z kategorii aplikacji
// przez Gemini Flash-Lite (darmowy tier). Klucz API w sekrecie GEMINI_API_KEY.
//
// Kontrakt: POST { title: string } -> 200 { category: string }
//           400 przy braku/pustym/za długim tytule, 502 przy błędzie Gemini.

// Musi być zsynchronizowane z EXPENSE_CATEGORIES w src/app/models/expense.model.ts
const CATEGORIES = ['Jedzenie', 'Transport', 'Rachunki', 'Rozrywka', 'Zdrowie', 'Inne'] as const;

const MAX_TITLE_LENGTH = 80;

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  let title: unknown;
  try {
    ({ title } = await req.json());
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  if (typeof title !== 'string' || title.trim().length === 0 || title.length > MAX_TITLE_LENGTH) {
    return jsonResponse(400, { error: 'Field "title" must be a non-empty string (max 80 chars)' });
  }

  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) {
    return jsonResponse(502, { error: 'GEMINI_API_KEY is not configured' });
  }

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Zaklasyfikuj tytuł wydatku do jednej z kategorii. Tytuł: «${title.trim()}»`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'text/x.enum',
          responseSchema: { type: 'STRING', enum: [...CATEGORIES] },
          temperature: 0,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!geminiResponse.ok) {
      return jsonResponse(502, { error: `Gemini API error (${geminiResponse.status})` });
    }

    const payload = await geminiResponse.json();
    const category: unknown = payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (typeof category !== 'string' || !(CATEGORIES as readonly string[]).includes(category)) {
      return jsonResponse(502, { error: 'Unexpected Gemini response' });
    }

    return jsonResponse(200, { category });
  } catch {
    return jsonResponse(502, { error: 'Gemini request failed or timed out' });
  }
});
