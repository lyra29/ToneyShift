# ToneyShift
Formal and Informal Tone Converter-Built for Google Built In AI Challenge 2025
Link:https://toneyshift.netlify.app/

#ToneyShift:Tone Converter 

##Inspiration
I was inspired by my own struggles. I often find it difficult to decide whether to write in a formal or informal tone in emails or texts, or how to make my writing sound appropriately formal. I built ToneyShift to solve this problem for myself and others facing the same challenge.

##What It does
ToneyShift is a web application that converts text between **formal** and **informal** tones. Users can input any text, the system detect its current tone, and then have it rewritten in the opposite tone. It’s especially useful for students, professionals, or anyone who wants to ensure their message matches the context.

## How I built it
- **Frontend:** React.js, HTML, CSS  
- **API:** Google Chrome Built-in AI Rewriter API to process tone conversion  
- **Hosting:** Netlify for easy deployment  
- **Features:**  
  - Tone detection (formal/informal)  
  - Tone conversion 
  - History tracking for previously converted messages  
- **Approach:** The app uses client-side AI via the Rewriter API to ensure privacy and speed, keeping all user text local.

## Challenges I ran into
- Getting the AI to **fully convert text** from formal to informal was tricky. Often, formal messages used in professional contexts were hard to make casual without losing politeness.
- Ensuring that the AI instructions produced **consistent and accurate tone changes** across multiple types of text.  

## Limitations of My Project
- Tone detection is somewhat weak, and due to the API’s bias toward preserving structure, tone, and politeness, ToneyShift does not always convert text fully to formal or informal.  
- For example, if the original text is formal, it may be converted to casual but still slightly formal. If the original text is informal, it may be converted to a more polite tone but remain slightly informal.

## Accomplishments that I am proud of
- Successfully implemented a tone conversion system that works **both ways**: formal → informal and informal → formal.  
- Built a **fully client-side web app** that uses AI without sending user data to the cloud.  
- Created a **visually appealing, responsive UI** 

## What I learned
- How to **structure AI instructions** effectively for different use cases.  
- How to integrate the **Rewriter API** into a React application.  
- The challenges of handling **tone, context, and politeness** in natural language processing.  
- Deployment nuances on **Netlify** and handling client-side AI in production.

## What's next for ToneyShift
- Improve the **informal conversion** to make it more natural for casual and friendly contexts.  
- Add **additional languages** for multilingual tone conversion.  
- Implement **tone intensity controls**, letting users choose “slightly formal” or “very informal.”  
-Improve the tone detection regular expression for more accurate and better detection to convert.

## Setup Instructions

To run or test ToneyShift locally or on a device, follow these steps:

1. **Use Google Chrome**  
   - Make sure you are running the latest version of Chrome(v 136+ or Canary), as the Rewriter API is only available in Chrome.

2. **Enable the Rewriter API Flag**  
   - Open a new tab in Chrome.  
   - Go to `chrome://flags`  
   - Search for **“Rewriter API”** or **“Experimental AI Features”**.  
   - Set the flag to **Enabled**.  
   - Restart Chrome to apply the change.

3. **Access the App**  
   - Either visit the **Netlify link** or run the project locally using `npm start` (if cloned from GitHub).

## Testing Instructions

To test ToneyShift, follow these steps:

1. **Open the Web App**  
   Visit the deployed app on Netlify: [https://toneyshift.netlify.app/]

2. **Enter Text**  
   - Type or paste any text into the input textarea.  
   - You can try **formal**, **informal**, or casual messages.

3. **Detect Tone**  
   - Click the **"Detect Tone"** button.  
   - The system will analyze your text and display whether it is formal, informal, or neutral.

4. **Convert Tone**  
   - Choose your target tone by selecting **Formal** or **Informal**.  
   - Click **"Convert Tone"**.  
   - The rewritten text will appear in the output section below, along with the detected tone.

5. **Copy or Save**  
   - Click the **copy button** to copy the converted text.  
   - Previous conversions are stored in the **history section** for reference.

6. **Try Different Examples**  
   - Test both formal and informal inputs to see the conversion behavior.  
   - Examples to try:  
     - Formal: “Please submit your report by Friday for review.”  
     - Informal: “Hey! Wanna hang out later?”  

