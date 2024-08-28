import React from 'react';
import DrawingCanvas from './DrawingCanvas.jsx';

function App() {
  return (
    <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="font-poppins text-4xl pt-4 font-semibold mb-4">Interactive Drawing Canvas - Prathamesh Mahale Roll No. 36</h1>
      <DrawingCanvas />
    </div>
  );
}

export default App;
