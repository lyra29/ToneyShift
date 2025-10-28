import React from 'react';
import ToneConverter from './components/ToneConverter';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Toney Shift</h1>
        <p>Convert between formal and informal tones effortlessly</p>
      </header>
      <main>
        <ToneConverter />
      </main>
      <footer>
        <p>2025</p>
      </footer>
    </div>
  );
}

export default App;