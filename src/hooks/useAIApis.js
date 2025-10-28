/* global Rewriter */
import { useState, useCallback } from 'react';

export const useAIApis = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const detectTone = useCallback(async (text) => {
    if (!text.trim()) return null;
    
    const formalIndicators = [
      /sincerely|regards|dear\s+(sir|madam)/i,
      /would you kindly|please be advised/i,
      /therefore|however|moreover/i,
      /\.\s{2,}/, // Multiple spaces after period
    ];
    
    const informalIndicators = [
      /hey|hi\s+there|what's up/i,
      /lol|brb|ttyl|omg/i,
      /gonna|wanna|gotta/i,
      /!\s{2,}/, // Multiple exclamation marks
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
    
    if (avgSentenceLength > 15) formalScore++;
    if (avgSentenceLength < 10) informalScore++;
    
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

      const instruction =
        targetTone === "formal"
          ? "Rewrite the text in a formal, professional tone."
          : "Rewrite the text in a casual, conversational tone.";

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
