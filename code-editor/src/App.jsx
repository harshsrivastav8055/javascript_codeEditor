import React, { useState } from 'react';
import CodeEditor from './Editor';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <div className="App">
      <h1>JavaScript & React Code Editor</h1>
      <CodeEditor value={code} onChange={handleCodeChange} />
    </div>
  );
};

export default App;
