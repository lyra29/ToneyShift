import React from 'react';

const SetupInstructions = () => {
  return (
    <div className="setup-instructions">
      <h3>🚀 Setup Required for Chrome Built-in AI APIs</h3>
      
      <div className="steps">
        <div className="step">
          <h4>Step 1: Register for Origin Trial</h4>
          <p>Go to the <a href="https://developer.chrome.com/origin-trials" target="_blank" rel="noopener noreferrer">Chrome Origin Trials page</a> and register for the Rewriter API trial.</p>
        </div>

        <div className="step">
          <h4>Step 2: Get Your Token</h4>
          <p>Register your origin as: <code>http://localhost:3000</code> for development</p>
        </div>

        <div className="step">
          <h4>Step 3: Add Token to Your App</h4>
          <p>Add this to <code>public/index.html</code> in the <code>&lt;head&gt;</code> section:</p>
          <pre>{`<meta http-equiv="origin-trial" content="YOUR_TOKEN_HERE">`}</pre>
        </div>

        <div className="step">
          <h4>Step 4: Enable Chrome Flags</h4>
          <p>Visit <code>chrome://flags/#enable-experimental-web-platform-features</code> and enable it.</p>
        </div>

        <div className="step">
          <h4>Step 5: Restart & Test</h4>
          <p>Restart Chrome and refresh this page. The AI features should now work!</p>
        </div>
      </div>
    </div>
  );
};

export default SetupInstructions;