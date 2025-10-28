import React, { useState, useEffect } from 'react';
import { useAIApis } from '../hooks/useAIApis';
import ToneDisplay from './ToneDisplay';


const ToneConverter = () => {
  const [inputText, setInputText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [detectedTone, setDetectedTone] = useState(null);
  const [currentTone, setCurrentTone] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const { detectTone, convertTone, isProcessing } = useAIApis();

  useEffect(() => {
    const checkAIAvailability = async () => {
      try{
         await new Promise(resolve => setTimeout(resolve, 500));
         if (typeof Rewriter === "undefined") {
         setError('Rewriter API is not available. Please use Chrome Canary (with built-in AI features enabled).');
         }else {
        setError(''); 
      }
    } catch (err) {
      setError('Error accessing AI APIs: ' + err.message);
    }
  };

      
      
      

    checkAIAvailability();
  }, []);

  const handleInputChange = async (e) => {
    const text = e.target.value;
    setInputText(text);
    setError('');

    if (text.trim()) {
      try {
        const tone = await detectTone(text);
        setDetectedTone(tone);
        setCurrentTone(tone);
        setOriginalText(text);
      } catch (err) {
        console.error('Tone detection error:', err);
      }
    } else {
      setDetectedTone(null);
      setCurrentTone(null);
      setConvertedText('');
    }
  };

  const handleConvert = async (targetTone) => {
    if (!inputText.trim()) {
      setError('Please enter some text to convert');
      return;
    }

    setError('');
    
    try {
      const textToConvert = convertedText || inputText;
      const result = await convertTone(textToConvert, targetTone);
      
      setHistory(prev => [...prev, {
        original: textToConvert,
        converted: result,
        fromTone: currentTone,
        toTone: targetTone,
        timestamp: new Date().toISOString()
      }]);
      
      setConvertedText(result);
      setCurrentTone(targetTone);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRevert = () => {
    setConvertedText('');
    setCurrentTone(detectedTone);
    setInputText(originalText);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const canConvertToFormal = detectedTone === 'informal' && currentTone !== 'formal';
  const canConvertToInformal = detectedTone === 'formal' && currentTone !== 'informal';

  return (
    <div className="tone-converter">
        
      <div className="input-section">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your text here to detect and convert its tone..."
          rows="6"
          disabled={isProcessing}
        />
        
        {detectedTone && (
          <div className="tone-info">
            Detected tone: <span className={`tone-indicator ${detectedTone}`}>
              {detectedTone}
            </span>
          </div>
        )}
      </div>

      <div className="controls">
        <button
          onClick={() => handleConvert('formal')}
          disabled={!canConvertToFormal || isProcessing}
          className={`btn ${canConvertToFormal ? 'btn-primary' : 'btn-disabled'}`}
        >
          {isProcessing ? 'Converting...' : 'Convert to Formal'}
        </button>
        
        <button
          onClick={() => handleConvert('informal')}
          disabled={!canConvertToInformal || isProcessing}
          className={`btn ${canConvertToInformal ? 'btn-secondary' : 'btn-disabled'}`}
        >
          {isProcessing ? 'Converting...' : 'Convert to Informal'}
        </button>

        {convertedText && (
          <button
            onClick={handleRevert}
            disabled={isProcessing}
            className="btn btn-tertiary"
          >
            Revert to Original
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <div className="results">
        {convertedText ? (
          <>
            <ToneDisplay 
              text={convertedText} 
              tone={currentTone}
              onCopy={handleCopy}
            />
          </>
        ) : inputText && (
          <ToneDisplay 
            text={inputText} 
            tone={currentTone}
            onCopy={handleCopy}
          />
        )}
      </div>

      {history.length > 0 && (
        <div className="history">
          <h3>Conversion History</h3>
          {history.slice(-3).reverse().map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-tone">
                {item.fromTone} → {item.toTone}
              </div>
              <div className="history-text">{item.converted}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToneConverter;