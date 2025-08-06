import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { auth, currentUser } from "@clerk/nextjs/server";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");


const PROMPT = `You are Trippy, an AI-powered trip planning assistant. Your role is to guide the user through planning their perfect trip by asking one relevant travel-related question at a time in a friendly, conversational tone.

Ask for the following trip details in this exact order, waiting for the user's response before proceeding to the next:

1. Starting location (Where the trip begins)
2. Destination (City or country)
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (Total number of days)
6. Travel interests (Adventure, Sightseeing, Culture, Food, Nightlife, Relaxation, etc.)
7. Special requirements or preferences (if any)

Ask only one question at a time.
Never ask multiple questions together or anything unrelated to the trip.
If the answer is missing or unclear, politely ask the user to clarify before moving forward.
Keep the tone warm, engaging, and interactive — you're here to make planning fun!
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/final) , where final means Al generating complete final output
Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
{
  "resp": "Text Resp",
  "ui": "budget/groupSize/tripDuration/final"
}

`
const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,
Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.
Output Schema:
{
  "trip_plan": {
  "destination": "string"
  "duration": "string",
  "origin". "string",
  "budget": "string",
  "group_size":'string",
  "hotels": [
  {
  "hotel_name": "string",
  "hotel_address": "string",
  "price_per_night": "string",
  "hotel_image_url": "string",
  "geo_coordinates": {
  "latitude": "number",
  "longitude": "number"
},
  "rating": "number",
  "description": "string"
}
],
  "itinerary": [
  {
  "day": "number",
  "day_plan": "string",
  "best_time_to_visit_day": "string",
  "activities": [
  {
  "place_name": "string",
  "place_details": "string",
  "place_image_url": "string"
  "geo coordinates": {
  "latitude": "number",
  "longitude": "number"
  },
  "place_address": "string",
  "ticket_pricing": "string",
  "time_travel_each_location": "string"
  "best_time_to visit": "string"
}
]
}
]
}
}`

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    // --- START DEBUG LOGGING ---
    console.log("\n--- NEW REQUEST RECEIVED ---");

    if (!process.env.GOOGLE_API_KEY) {
        console.error("🔴 GOOGLE_API_KEY is not set in the environment variables.");
        return NextResponse.json({ error: "Server configuration error: Missing API Key." }, { status: 500 });
    }
    
    const { messages, isFinal } = await req.json();
    console.log("1. Received isFinal flag:", isFinal);
    console.log("2. Received messages count:", messages.length);
    console.log("3. Full incoming messages:", JSON.stringify(messages, null, 2));
    
    // --- END DEBUG LOGGING ---

    const generationConfig = {
      responseMimeType: "application/json",
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
      generationConfig,
    });

    const systemPrompt = isFinal ? FINAL_PROMPT : PROMPT;

    const history = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));
    
    const latestUserMessage = history.pop();

    if (!latestUserMessage) {
        console.error("🔴 Validation Error: No user message found after processing history.");
        return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    // --- MORE DEBUG LOGGING ---
    console.log("4. Starting chat with history of count:", history.length);
    console.log("5. Sending last message to AI:", JSON.stringify(latestUserMessage, null, 2));
    // ---

    const chat = model.startChat({
      history: history,
    });
    
    const result = await chat.sendMessage(`${systemPrompt}\n\n${latestUserMessage.parts[0].text}`);

    const response = result.response;
    const text = response.text();

    // --- CRUCIAL DEBUG LOGGING ---
    console.log("6. Received raw text response from Gemini API:\n", text);
    // ---

    // The error is very often here if the AI doesn't return perfect JSON
    const parsedJson = JSON.parse(text);
    console.log("7. Successfully parsed JSON.");
    
    return NextResponse.json(parsedJson);

  } catch (e: any) {
    // --- ENHANCED ERROR LOGGING ---
    console.error("🔴 CATCH BLOCK ERROR - An error occurred in the API route:", e);

    // Log additional details if available, like from a Gemini API error
    if (e.response && e.response.data) {
        console.error("Axios/API Error Details:", e.response.data);
    }
    
    return NextResponse.json({ error: "Internal Server Error", details: e.message }, { status: 500 });
    // ---
  }
}

// export async function POST(req: NextRequest){
  
//     const { messages, isFinal } = await req.json()
//     const user = await currentUser()
//     const {has} = await auth()
//     const hasPremiumAccess = has({ plan: 'monthly' })
//     // @ts-ignore
//     const decision = await aj.protect(req, { userId:user?.primaryEmailAddress?.emailAddress??'', requested: isFinal? 5 :0}) // Deduct 5 Tokens from the bucket
    
//     // @ts-ignore
//     if(decision?.reason?.remaining==0 && !hasPremiumAccess){
//       return NextResponse.json({
//         resp: 'No Free Credit Remaining',
//         ui: 'Limit'
//       })
//     }
    
    
//     try{
//       const generationConfig = {
//       responseMimeType: "application/json",
//     };
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash", // Use the correct official model name
//       safetySettings,
//       generationConfig,
//     });
//     const systemPrompt = isFinal ? FINAL_PROMPT : PROMPT;
//     const history = messages.map((msg: { role: string; content: string }) => ({
//       role: msg.role === 'assistant' ? 'model' : 'user',
//       parts: [{ text: msg.content }],
//     }));
//   const latestUserMessage = history.pop();
//   if (!latestUserMessage) {
//         return NextResponse.json({ error: "No user message found" }, { status: 400 });
//     }
//     const chat = model.startChat({
//       history: history,
//     });
//     const result = await chat.sendMessage(`${systemPrompt}\n\n${latestUserMessage.parts[0].text}`);
//     const response = result.response;
//     const text = response.text();

//     return NextResponse.json(JSON.parse(text));
// }
//     catch (e) {
//     console.error("Error calling Gemini API:", e);
//     return NextResponse.json({ error: "Failed to get response from AI." }, { status: 500 });
//   }
// }