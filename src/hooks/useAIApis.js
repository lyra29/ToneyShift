/* global Rewriter */
import { useState, useCallback } from 'react';

export const useAIApis = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const detectTone = useCallback(async (text) => {
    if (!text.trim()) return null;
    
    const formalIndicators = [
      
       /\b(sincerely|regards|dear\s+(sir|madam)|respectfully)\b/i,
    /\b(would you kindly|please be advised|thank you for your attention)\b/i,
    /\b(therefore|however|moreover|furthermore)\b/i,
    /\.\s{2,}/,/\b(may I|could you|would you|please)\b/i
      
      
    ];
    
    const informalIndicators = [
      
       /\b(hey|hi there|yo|what's up|buddy|dude)\b/i,
    /\b(lol|brb|ttyl|omg|haha|hahaha)\b/i,
    /\b(gonna|wanna|gotta|y'all|ain't)\b/i,
    /!\s*$/, // Exclamation marks
    /[\u{1F600}-\u{1F64F}]/u // Emoji range
      
      
    ];
    
    let formalScore = 0;
    let informalScore = 0;
    
    formalIndicators.forEach(regex => {
      if (regex.test(text)) formalScore++;
    });
    
    informalIndicators.forEach(regex => {
      if (regex.test(text)) informalScore++;
    });
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(' ').length, 0) / sentences.length;
    
    if (avgSentenceLength > 12) formalScore++;
    if (avgSentenceLength < 8) informalScore++;
    const contractions = text.match(/\b(can't|won't|I'm|you're|they're|it's|didn't|doesn't|isn't|aren't|don't|wouldn't|couldn't)\b/gi);
  if (contractions && contractions.length > 0) informalScore += contractions.length;
    return formalScore >= informalScore ? 'formal' : 'informal';
  }, []);

  const convertTone = useCallback(async (text, targetTone) => {
    if (!text.trim()) {
      throw new Error('Input text cannot be empty');
    }

    if (typeof Rewriter === "undefined") {
      throw new Error('Rewriter API not supported in this browser');
    }

    setIsProcessing(true);

    try {
      const availability = await Rewriter.availability();
      console.log("Model availability:", availability);

      const rewriter = await Rewriter.create({
        language: "en",
        monitor(m) {
          m.addEventListener("downloadprogress", e => {
            console.log(`Downloaded ${(e.loaded * 100).toFixed(2)}%`);
          });
        }
      });

      console.log("Rewriter is ready");

      
      const instruction = targetTone === "informal" 
  ? "Rewrite this in rude tone"
  : "Make this sound formal like a business email";
      
      

      const result = await rewriter.rewrite(text, {
        instruction,
        language: "en"
      });

      console.log("Rewritten text:", result);
      return result;

    } catch (error) {
      console.error('AI conversion error:', error);
      throw new Error(`Failed to convert text: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    detectTone,
    convertTone,
    isProcessing,
  };
};