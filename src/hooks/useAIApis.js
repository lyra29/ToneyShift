import { useState, useCallback } from 'react';

export const useAIApis = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const detectTone = useCallback(async (text) => {
    if (!text.trim()) return null;
    
    // Simple heuristic-based tone detection
    // In a real scenario, you might use more sophisticated detection
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
    
    // Additional checks for sentence structure
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(' ').length, 0) / sentences.length;
    
    if (avgSentenceLength > 15) formalScore++;
    if (avgSentenceLength < 10) informalScore++;
    
    return formalScore >= informalScore ? 'formal' : 'informal';
  }, []);

  const convertTone = useCallback(async (text, targetTone) => {
    if (!text.trim() || !window.ai?.rewriter) {
      throw new Error('AI Rewriter API not available');
    }

    setIsProcessing(true);
    try {
      let prompt;
      
      if (targetTone === 'formal') {
        prompt = `Convert the following text to a formal, professional tone while preserving the original meaning. Use proper business language and complete sentences:\n\n"${text}"`;
      } else {
        prompt = `Convert the following text to a casual, informal tone as if talking to a friend. Make it conversational and relaxed:\n\n"${text}"`;
      }

      const result = await window.ai.rewriter.create(prompt);
      let convertedText = await result.text();
      
      // Use Proofreader API to correct any grammar issues
      if (window.ai?.proofreader) {
        const proofreadResult = await window.ai.proofreader.create(convertedText);
        convertedText = await proofreadResult.text();
      }
      
      return convertedText;
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