import React, { useRef, useState, useEffect } from 'react';
import TodoList from './TodoList'; // Import the TodoList component

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('light');
  const [shape, setShape] = useState('freehand');
  const [showTodo, setShowTodo] = useState(false); // State to toggle the to-do list

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
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = strokeColor;
      contextRef.current.lineWidth = strokeWidth;
    }
  }, [strokeColor, strokeWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setLastPos({ x: offsetX, y: offsetY });
    if (shape === 'freehand') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
  };

  const finishDrawing = (event) => {
    if (!isDrawing) return;
    if (shape !== 'freehand') {
      drawShape(event);
    } else {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    if (shape === 'freehand') {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setLastPos({ x: offsetX, y: offsetY });
    }
  };

  const drawShape = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const startX = lastPos.x;
    const startY = lastPos.y;

    contextRef.current.beginPath();

    if (shape === 'arrow') {
      drawArrow(contextRef.current, startX, startY, offsetX, offsetY);
    } else if (shape === 'circle') {
      const radius = Math.sqrt(Math.pow(offsetX - startX, 2) + Math.pow(offsetY - startY, 2));
      contextRef.current.arc(startX, startY, radius, 0, Math.PI * 2);
    } else if (shape === 'square') {
      contextRef.current.rect(startX, startY, offsetX - startX, offsetY - startY);
    }

    contextRef.current.stroke();
    contextRef.current.closePath();
  };

  const drawArrow = (context, fromX, fromY, toX, toY) => {
    const headlen = 10; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.lineTo(
      toX - headlen * Math.cos(angle - Math.PI / 6),
      toY - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(toX, toY);
    context.lineTo(
      toX - headlen * Math.cos(angle + Math.PI / 6),
      toY - headlen * Math.sin(angle + Math.PI / 6)
    );
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={`relative min-h-screen w-screen p-5 flex ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <div className="flex flex-col items-start space-y-4 w-64 p-4 border-r ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <label className="flex items-center space-x-2">
          <span>Stroke Width:</span>
          <input
            type="range"
            min="1"
            max="50"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(e.target.value)}
            className="w-32"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span>Stroke Color:</span>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </label>
        <button
          onClick={resetCanvas}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Reset
        </button>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setShape('freehand')}
            className={`px-4 py-2 rounded ${shape === 'freehand' ? 'bg-green-500' : 'bg-gray-300'} text-white hover:bg-green-600`}
          >
            Freehand
          </button>
          <button
            onClick={() => setShape('arrow')}
            className={`px-4 py-2 rounded ${shape === 'arrow' ? 'bg-green-500' : 'bg-gray-300'} text-white hover:bg-green-600`}
          >
            Arrow
          </button>
          <button
            onClick={() => setShape('circle')}
            className={`px-4 py-2 rounded ${shape === 'circle' ? 'bg-green-500' : 'bg-gray-300'} text-white hover:bg-green-600`}
          >
            Circle
          </button>
          <button
            onClick={() => setShape('square')}
            className={`px-4 py-2 rounded ${shape === 'square' ? 'bg-green-500' : 'bg-gray-300'} text-white hover:bg-green-600`}
          >
            Square
          </button>
        </div>
        <button
          onClick={() => setShowTodo(!showTodo)}
          className="px-4 py-2 mt-4 rounded bg-purple-500 text-white hover:bg-purple-600"
        >
          {showTodo ? 'Hide' : 'Show'} To-Do List
        </button>
      </div>
      <div className="flex-grow relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          className={`border ${theme === 'light' ? 'border-black' : 'border-white'} cursor-crosshair`}
        />
        {showTodo && (
          <div className={`absolute top-0 right20 h-full w-200 bg-white shadow-lg p-4 ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black'}`}>
            <TodoList />
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawingCanvas;
