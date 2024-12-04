import React, { useState, useEffect } from "react";
import "../styles/global.css";

const MissionTour = ({ route, onComplete, price, setPrice }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(true);
  }, [currentStep]);

  const handleNextMission = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (currentStep < route.missions.length - 1) {
        setCurrentStep(currentStep + 1);
        setShowHint(false);
        setPrice((prevPrice) => prevPrice - 1000);
      } else {
        onComplete(route.destination);
      }
    }, 300);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const getArrowDirection = () => {
    const directions = ["↑", "→", "↓", "←"];
    return directions[currentStep % directions.length];
  };

  return (
    <div className={`container ${fadeIn ? "fade-in" : ""}`}>
      <div className="price-display">あなたのお支払い金額は{price.toLocaleString()}円です</div>
      <div className="card">
        <h2>ミステリーツアー: ミッション {currentStep + 1}</h2>
        <p><strong>ミッション:</strong> {route.missions[currentStep]}</p>

        {showHint && (
          <div className="hint-arrow">
            {getArrowDirection()}
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleShowHint}
            className="btn"
            style={{ marginRight: "10px" }}
          >
            ヒントを見る
          </button>
          <button onClick={handleNextMission} className="btn">
            {currentStep < route.missions.length - 1 ? "次のミッションへ" : "ツアーを完了する"}
          </button>
        </div>
      </div>

      {/* 地図画像を画面の下に追加 */}
<div style={{ marginTop: "20px" }}>
  <img
    src="/images/miti1.jpg"
    alt="地図"
    style={{
      width: "100%",       // 幅をコンテナ全体に設定
      height: "auto",      // 自動調整で高さを維持
      objectFit: "contain" // 画像全体を表示
    }}
  />
      </div>
    </div>
  );
};

export default MissionTour;
