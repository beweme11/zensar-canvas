import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    contextRef.current = context;
  }, [strokeColor, strokeWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setLastPos({ x: offsetX, y: offsetY });
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(lastPos.x, lastPos.y);
    contextRef.current.quadraticCurveTo(lastPos.x, lastPos.y, offsetX, offsetY);
    contextRef.current.stroke();

    setLastPos({ x: offsetX, y: offsetY });
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Stroke Width: 
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={strokeWidth} 
            onChange={(e) => setStrokeWidth(e.target.value)} 
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Stroke Color: 
          <input 
            type="color" 
            value={strokeColor} 
            onChange={(e) => setStrokeColor(e.target.value)} 
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        style={{ border: '1px solid black', cursor: 'crosshair' }}
      />
    </div>
  );
};

export default DrawingCanvas;
