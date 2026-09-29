import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generateVisitQuestions(
  query: string,
  language: "en" | "am" = "en"
): Promise<{
  calmNote: string;
  suggestedQuestions: string[];
}> {
  try {
    const ai = getAI();
    // Use gemini-2.5-flash which is fast, robust, and supported across Google GenAI SDK
    const model = "gemini-2.5-flash";

    const systemPrompt = `You are a warm, calm, compassionate early-childhood advisor for IVY Childcare Services in Addis Ababa, Ethiopia.
Your core philosophy:
1. Every child grows at their own pace. We make room for that.
2. Tone: warm, calm, plain language, sentence case, active voice.
3. No hype, no clinical jargon.
4. NEVER promise specific developmental outcomes, and NEVER provide medical or psychological diagnoses.
5. Emphasize that an individual, in-person assessment by a professional is always the right starting point.
6. The user is a parent preparing to visit IVY Childcare or schedule an assessment.
7. Return a JSON object with two fields:
   "calmNote": A brief 1-2 sentence warm, reassuring note.
   "suggestedQuestions": An array of 3 to 4 clear, practical, sentence-case questions the parent can ask the staff or therapist during their in-person visit.
8. Output the language in ${language === "am" ? "Amharic (Ethiopian script)" : "English"}.`;

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [{ text: query }],
        },
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    return {
      calmNote:
        parsed.calmNote ||
        (language === "am"
          ? "እያንዳንዱ ልጅ በራሱ ፍጥነት ያድጋል። በግል ጉብኝትዎ ወቅት ከባለሙያዎቻችን ጋር የሚከተሉትን ነጥቦች መወያየት ይችላሉ።"
          : "Every child develops at their own pace. During your in-person visit, here are helpful questions you can discuss directly with our team."),
      suggestedQuestions: Array.isArray(parsed.suggestedQuestions)
        ? parsed.suggestedQuestions.slice(0, 5)
        : [
            language === "am"
              ? "የግል ምዘናው እንዴት ይከናወናል?"
              : "How does the individual assessment work?",
            language === "am"
              ? "የዕለት ተዕለት ሪፖርቶች ምን ዓይነት መረጃዎችን ያካትታሉ?"
              : "What information is shared in the daily written report?",
            language === "am"
              ? "በትምህርት ቤት እና በቤት ውስጥ የሚሰጡ ተግባራት እንዴት ይገናኛሉ?"
              : "How does therapy carry over from the center to home?",
          ],
    };
  } catch (err: any) {
    console.error("Gemini visit guide error:", err?.message || err);
    // Graceful fallback if Gemini API is temporarily unavailable or without key
    return {
      calmNote:
        language === "am"
          ? "እያንዳንዱ ልጅ በራሱ ፍጥነት ያድጋል። በግል ጉብኝትዎ ወቅት የሚከተሉትን ጥያቄዎች ማንሳት ይችላሉ።"
          : "Every child grows at their own pace. When you visit our space, here are key questions to discuss with our staff.",
      suggestedQuestions: [
        language === "am"
          ? "ልጄ ከእድሜ እኩዮቹ ጋር እንዲላመድ ምን ዓይነት እንቅስቃሴዎችን ታደርጋላችሁ?"
          : "What routine activities will help my child feel comfortable and safe?",
        language === "am"
          ? "በዕለት ተዕለት የጽሁፍ ሪፖርት ውስጥ ምን ዓይነት መረጃዎችን እናገኛለን?"
          : "What specific observations are included in the daily written report?",
        language === "am"
          ? "የቴራፒ እቅዱ ከቤታችን አኗኗር ጋር እንዴት ይጣጣማል?"
          : "How will therapy exercises carry over into our home routine?",
      ],
    };
  }
}
