// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';

// 이미지 파일들을 import 합니다.
import GVTIA from './images/GVTI-A.png';
import GVTIB from './images/GVTI-B.png';
import GVTIC from './images/GVTI-C.png';
import GVTID from './images/GVTI-D.png';

// 질문 및 데이터
const questions = [
  {
    id: 1,
    text: '평소 당신의 소비 습관은 어떤 유형에 가장 가깝나요?',
    emoji: '💳', // 이모지 추가
    options: [
      { type: 'A', text: '계획에 따라 꼭 필요한 생필품이나 식료품을 주로 구매한다', emoji: '🛒' },
      { type: 'B', text: '새로운 맛집이나 분위기 좋은 식당을 찾아다니며 즐거움을 느낀다', emoji: '🍽️' },
      { type: 'C', text: '나 자신을 위한 미용이나 취미 활동에 투자하는 것을 중요하게 생각한다', emoji: '✨' },
      { type: 'D', text: '예쁘고 특별한 것을 발견하면 소소한 기쁨을 위해 구매하는 편이다', emoji: '☕' },
    ],
  },
  {
    id: 2,
    text: "다음 중 당신이 생각하는 '따뜻한 나눔'의 이미지는 무엇인가요?",
    emoji: '🤗', // 이모지 추가
    options: [
      { type: 'A', text: '힘든 시기를 버티게 해주는 든든한 식료품이나 생필품', emoji: '🏠' },
      { type: 'B', text: '따뜻한 한 끼 식사로 채워주는 마음의 위로', emoji: '🍲' },
      { type: 'C', text: '외적인 변화를 통해 잃었던 자신감을 되찾게 해주는 것', emoji: '💄' },
      { type: 'D', text: '일상에 소소한 즐거움을 더해주는 달콤한 간식이나 음료', emoji: '🧁' },
    ],
  },
  {
    id: 3,
    text: '기부의 가장 중요한 목적은 무엇이라고 생각하시나요?',
    emoji: '💝', // 이모지 추가
    options: [
      { type: 'A', text: '이웃의 가장 기본적인 생활을 지원하는 것', emoji: '🤝' },
      { type: 'B', text: '식사라는 행위를 통해 공동체의 따뜻함을 나누는 것', emoji: '👥' },
      { type: 'C', text: '상대방의 기분까지 긍정적으로 변화시켜 주는 것', emoji: '🦋' },
      { type: 'D', text: '힘든 하루에 잠시나마 소소한 행복을 선물하는 것', emoji: '😊' },
    ],
  },
  {
    id: 4,
    text: '누군가에게 선물을 한다면 어떤 것을 가장 주고 싶나요?',
    emoji: '🎁', // 이모지 추가
    options: [
      { type: 'A', text: '실용적이고 오래 사용할 수 있는 생필품', emoji: '📦' },
      { type: 'B', text: '함께 맛있는 식사를 나눌 수 있는 식사권', emoji: '🥘' },
      { type: 'C', text: '스타일 변신을 도울 수 있는 미용 서비스 이용권', emoji: '💅' },
      { type: 'D', 'text': '따뜻한 커피나 달콤한 디저트 쿠폰', emoji: '🍰' },
    ],
  },
];

// GVTI 유형별 정보 수정: description의 ** 문법을 <strong> 태그로 변경
const gvtiTypes = {
  A: {
    name: "든든이",
    title: "더 든든한 하루를 만드는 '든든이' 유형",
    description:
      "당신은 기부의 <strong>실용성과 효과</strong>를 가장 중요하게 생각하는 든든한 기부자입니다. 따뜻한 한 끼 식사나 꼭 필요한 생필품이 누군가의 하루를 지탱하는 힘이 된다는 것을 누구보다 잘 알고 있습니다. 이웃의 가장 기본적인 필요를 채워주는 당신의 기부는 가장 든든한 힘이 됩니다.",
    recommended: "슈퍼마켓, 정육점, 반찬가게, 마트 등",
    donationLink: "https://one-plus-one.vercel.app",
    image: GVTIA,
    color: "#4CAF50",
    bgColor: "#E8F5E8"
  },
  B: {
    name: "함께",
    title: "함께하는 따뜻한 식탁, '함께' 유형",
    description:
      "당신은 <strong>음식</strong>이 가진 힘을 믿는 <strong>나눔의 미식가</strong>입니다. 따뜻한 밥 한 끼가 단순한 배고픔을 채우는 것을 넘어, 사람의 마음을 든든하게 하고 공동체의 따뜻함을 느끼게 해준다고 믿습니다. 당신의 기부는 이웃의 마음에 온기를 전합니다.",
    recommended: "한식/양식/중식 등 일반 음식점",
    donationLink: "https://one-plus-one.vercel.app",
    image: GVTIB,
    color: "#FF9800",
    bgColor: "#FFF3E0"
  },
  C: {
    name: "반짝이",
    title: "활력을 선물하는 '반짝이' 유형",
    description:
      "당신은 기부가 <strong>긍정적인 변화</strong>를 일으킨다고 믿는 <strong>변화의 스타일리스트</strong>입니다. 외적인 변화가 누군가에게 자신감과 활력을 불어넣는 소중한 기회가 된다는 것을 알고 있습니다. 당신의 나눔은 이웃의 내면까지 반짝이게 할 것입니다.",
    recommended: "미용실, 네일숍, 피부관리실 등",
    donationLink: "https://one-plus-one.vercel.app",
    image: GVTIC,
    color: "#E91E63",
    bgColor: "#FCE4EC"
  },
  D: {
    name: "스마일",
    title: "행복한 미소를 나누는 '스마일' 유형",
    description:
      "당신은 기부를 통해 <strong>소소한 행복과 즐거움</strong>을 선물하고 싶어하는 <strong>행복 전달자</strong>입니다. 작은 달콤함이 누군가의 힘든 하루를 위로하고, 잠시나마 미소를 짓게 만든다고 믿습니다. 당신의 따뜻한 마음이 이웃의 일상에 기쁨을 더합니다.",
    recommended: "카페, 제과점, 빵집, 디저트 가게 등",
    donationLink: "https://one-plus-one.vercel.app",
    image: GVTID,
    color: "#2196F3",
    bgColor: "#E3F2FD"
  },
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (answerType) => {
    setSelectedOption(answerType);
    setIsAnimating(true);
    
    setTimeout(() => {
      const newAnswers = [...answers, answerType];
      setAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        const resultType = calculateResult(newAnswers);
        setResult(resultType);
      }
      setIsAnimating(false);
    }, 500);
  };

  const calculateResult = (userAnswers) => {
    const counts = userAnswers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    let maxCount = 0;
    let resultType = null;

    for (const type in counts) {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        resultType = type;
      }
    }

    return resultType;
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setIsStarted(false);
    setSelectedOption(null);
    setIsAnimating(false);
  };

  const startTest = () => {
    setIsStarted(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (result) {
    const resultData = gvtiTypes[result];
    return (
      <div className="app">
        <div className="container result-container" style={{ '--accent-color': resultData.color, '--bg-color': resultData.bgColor }}>
          <div className="result-header">
            <div className="result-badge">
              <span className="result-type">GVTI-{result}</span>
            </div>
            <div className="result-header-text">
              <p className="result-subtitle"><strong>가치를 나누는 당신의 유형</strong></p>
              <h1 className="result-title">{resultData.title}</h1>
            </div>
          </div>
          
          <div className="character-section">
            <div className="character-circle">
              <img src={resultData.image} alt={`${resultData.name} 캐릭터`} className="character-image" />
            </div>
          </div>

          <div className="result-content">
            <p className="result-description" dangerouslySetInnerHTML={{ __html: resultData.description }}></p>
            
            <div className="recommendation-card">
              <div className="recommendation-header">
                <span className="recommendation-icon">🎯</span>
                <h3>추천하는 기부처</h3>
              </div>
              <p className="recommendation-text">{resultData.recommended}</p>
            </div>

            <div className="action-buttons">
              <a href={resultData.donationLink} target="_blank" rel="noopener noreferrer" className="primary-button">
                <span>💝</span>
                기부 시작하기
              </a>
              <button onClick={resetTest} className="secondary-button">
                <span>🔄</span>
                다시 테스트하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        {!isStarted ? (
          <div className={`page start-page ${isAnimating ? 'fade-out' : ''}`}>
            <div className="hero-content">
              <div className="logo-section">
                <div className="logo-circle">
                  <span className="logo-emoji">🎁</span>
                </div>
                <h1 className="main-title">
                  <span className="gvti">GVTI</span>
                  <span className="subtitle">Giving Value Type Indicator</span>
                </h1>
              </div>
              
              <div className="hero-text">
                <h2>내 마음이 닿는 기부 유형은?</h2>
                <p>당신만의 특별한 기부 스타일을 발견하고<br />마음과 잘 맞는 기부처를 찾아보세요!</p>
              </div>

              <button onClick={startTest} className="start-button">
                <span>✨</span>
                테스트 시작하기
              </button>
            </div>
          </div>
        ) : (
          <div className={`page question-page ${isAnimating ? 'slide-out' : 'slide-in'}`}>
            <div className="progress-section">
              <div className="progress-info">
                <span className="progress-text">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="question-section">
              <div className="question-header">
                <span className="question-emoji">{questions[currentQuestionIndex].emoji}</span>
                <h2 className="question-text">{questions[currentQuestionIndex].text}</h2>
              </div>

              <div className="options-grid">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.type)}
                    className={`option-card ${selectedOption === option.type ? 'selected' : ''}`}
                    disabled={isAnimating}
                  >
                    <div className="option-header">
                      <span className="option-emoji">{option.emoji}</span>
                    </div>
                    <p className="option-text">{option.text}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;