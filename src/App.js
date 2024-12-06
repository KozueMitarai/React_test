import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [position, setPosition] = useState({ x: 4, y: 0 }); // 初期位置（中央）
  const [gameOver, setGameOver] = useState(false);

  // キー入力処理
  const handleKeyPress = (e) => {
    if (gameOver) return;

    if (e.key === 'ArrowUp') {
      setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - 1 }));
    } else if (e.key === 'ArrowDown') {
      setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + 1 }));
    } else if (e.key === 'ArrowLeft') {
      setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 1 }));
    } else if (e.key === 'ArrowRight') {
      setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 1 }));
    }
  };

  // ゲームオーバーのチェック
  useEffect(() => {
    if (position.y < 0 || position.y >= 10 || position.x < 0 || position.x >= 10) {
      setGameOver(true);
    }
  }, [position]);

  // ボードを描画する関数
  const renderBoard = () => {
    const board = Array(10).fill(null).map(() => Array(10).fill(false)); // 10x10のボード作成
    board[position.y][position.x] = true; // ピースの位置を更新
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`cell ${cell ? 'filled' : ''}`}
            style={{
              width: '30px',
              height: '30px',
              display: 'inline-block',
              backgroundColor: cell ? 'blue' : 'lightgray',
            }}
          />
        ))}
      </div>
    ));
  };

  // キーイベントを監視するエフェクト
  useEffect(() => {
    const handleKeyPressWrapper = (e) => handleKeyPress(e);
    window.addEventListener('keydown', handleKeyPressWrapper);

    return () => {
      window.removeEventListener('keydown', handleKeyPressWrapper);
    };
  }, [handleKeyPress]);

  return (
    <div className="App">
      <h1>Tetris Game (Simple)</h1>
      <div>
        <p>Game Over: {gameOver ? 'Yes' : 'No'}</p>
        <p>Position: ({position.x}, {position.y})</p>
      </div>
      <div>{renderBoard()}</div>
      <button onClick={() => setGameOver(false)}>Restart</button>
    </div>
  );
}

export default App;
