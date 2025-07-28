import { useState } from 'react';
import './App.css';

const TRANSLATIONS = {
  "en-US": {
    "pageTitle": "Life in weeks",
    "pageSubtitle": "A simple visualization to reflect on the passage of time",
    "birthDateQuestion": "Enter a birthdate",
    "visualizeButton": "Visualize your time",
    "startOverButton": "Start over",
    "lifeInWeeksTitle": "Your life in weeks",
    "weekHoverPast": " A week from your past",
    "weekHoverCurrent": " Your current week",
    "weekHoverFuture": " A week in your potential future",
    "legendPast": "Past",
    "legendPresent": "Present",
    "legendFuture": "Future",
    "lifeHighlightsTitle": "Life highlights",
    "lifeHighlightsWeeks": "You've lived",
    "lifeHighlightsWeeksEnd": "weeks, which is",
    "lifeHighlightsPercent": "of a full life.",
    "lifeHighlightsDays": "That's",
    "lifeHighlightsDaysEnd": "days of experience and approximately",
    "lifeHighlightsSeasonsEnd": "seasons observed.",
    "lifeHighlightsHeartbeats": "Your heart has beaten approximately",
    "lifeHighlightsHeartbeatsEnd": "times.",
    "lifeHighlightsBreaths": "You've taken around",
    "lifeHighlightsBreathsMiddle": "breaths and slept about",
    "lifeHighlightsBreathsEnd": "hours."
  },
  "ko-KR": {
    "pageTitle": "인생을 주 단위로",
    "pageSubtitle": "시간의 흐름을 성찰하는 간단한 시각화",
    "birthDateQuestion": "생년월일을 입력하세요",
    "visualizeButton": "시간 시각화하기",
    "startOverButton": "다시 시작",
    "lifeInWeeksTitle": "당신의 인생 (주 단위)",
    "weekHoverPast": " 과거의 한 주",
    "weekHoverCurrent": " 현재 주",
    "weekHoverFuture": " 미래의 한 주",
    "legendPast": "과거",
    "legendPresent": "현재",
    "legendFuture": "미래",
    "lifeHighlightsTitle": "인생 하이라이트",
    "lifeHighlightsWeeks": "당신은",
    "lifeHighlightsWeeksEnd": "주를 살았습니다. 이는 전체 인생의",
    "lifeHighlightsPercent": "입니다.",
    "lifeHighlightsDays": "이는",
    "lifeHighlightsDaysEnd": "일의 경험이며 약",
    "lifeHighlightsSeasonsEnd": "번의 계절을 관찰한 것입니다.",
    "lifeHighlightsHeartbeats": "당신의 심장은 약",
    "lifeHighlightsHeartbeatsEnd": "번 뛰었습니다.",
    "lifeHighlightsBreaths": "당신은 약",
    "lifeHighlightsBreathsMiddle": "번 숨쉬었고 약",
    "lifeHighlightsBreathsEnd": "시간 잠을 잤습니다."
  },
  "ja-JP": {
    "pageTitle": "人生を週で表示",
    "pageSubtitle": "時の流れを振り返るためのシンプルな視覚化",
    "birthDateQuestion": "生年月日を入力してください",
    "visualizeButton": "あなたの時間を視覚化",
    "startOverButton": "最初からやり直す",
    "lifeInWeeksTitle": "あなたの人生（週単位）",
    "weekHoverPast": " 過去の一週間",
    "weekHoverCurrent": " 現在の週",
    "weekHoverFuture": " 将来の一週間の可能性",
    "legendPast": "過去",
    "legendPresent": "現在",
    "legendFuture": "未来",
    "lifeHighlightsTitle": "人生のハイライト",
    "lifeHighlightsWeeks": "あなたは",
    "lifeHighlightsWeeksEnd": "週間生きており、これは人生全体の",
    "lifeHighlightsPercent": "です。",
    "lifeHighlightsDays": "それは",
    "lifeHighlightsDaysEnd": "日間の経験と約",
    "lifeHighlightsSeasonsEnd": "回の季節を観察したことになります。",
    "lifeHighlightsHeartbeats": "あなたの心臓は約",
    "lifeHighlightsHeartbeatsEnd": "回鼓動しました。",
    "lifeHighlightsBreaths": "あなたは約",
    "lifeHighlightsBreathsMiddle": "回呼吸し、約",
    "lifeHighlightsBreathsEnd": "時間睡眠しました。"
  },
  "es-ES": {
    "pageTitle": "La vida en semanas",
    "pageSubtitle": "Una visualización simple para reflexionar sobre el paso del tiempo",
    "birthDateQuestion": "Ingresa una fecha de nacimiento",
    "visualizeButton": "Visualizar tu tiempo",
    "startOverButton": "Empezar de nuevo",
    "lifeInWeeksTitle": "Tu vida en semanas",
    "weekHoverPast": " Una semana de tu pasado",
    "weekHoverCurrent": " Tu semana actual",
    "weekHoverFuture": " Una semana en tu futuro potencial",
    "legendPast": "Pasado",
    "legendPresent": "Presente",
    "legendFuture": "Futuro",
    "lifeHighlightsTitle": "Aspectos destacados de la vida",
    "lifeHighlightsWeeks": "Has vivido",
    "lifeHighlightsWeeksEnd": "semanas, que es el",
    "lifeHighlightsPercent": "de una vida completa.",
    "lifeHighlightsDays": "Eso son",
    "lifeHighlightsDaysEnd": "días de experiencia y aproximadamente",
    "lifeHighlightsSeasonsEnd": "estaciones observadas.",
    "lifeHighlightsHeartbeats": "Tu corazón ha latido aproximadamente",
    "lifeHighlightsHeartbeatsEnd": "veces.",
    "lifeHighlightsBreaths": "Has tomado alrededor de",
    "lifeHighlightsBreathsMiddle": "respiraciones y has dormido aproximadamente",
    "lifeHighlightsBreathsEnd": "horas."
  }
};

export default function WeeksOfLife() {
  const [step, setStep] = useState(1);
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [expectedLifespan, setExpectedLifespan] = useState(80);
  const [selectedTheme, setSelectedTheme] = useState('flowers');
  const [selectedLanguage, setSelectedLanguage] = useState('ko-KR');
  const [stats, setStats] = useState(null);
  const [showHoverData, setShowHoverData] = useState(false);
  const [hoverWeek, setHoverWeek] = useState(null);

  const languages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' }
  ];

  const getZodiacSign = (birthDate) => {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    
    const zodiacSigns = [
      { name: '물병자리', symbol: '♒', color: '#00bcd4', months: [[1, 20, 31], [2, 1, 18]] },
      { name: '물고기자리', symbol: '♓', color: '#9c27b0', months: [[2, 19, 29], [3, 1, 20]] },
      { name: '양자리', symbol: '♈', color: '#f44336', months: [[3, 21, 31], [4, 1, 19]] },
      { name: '황소자리', symbol: '♉', color: '#4caf50', months: [[4, 20, 30], [5, 1, 20]] },
      { name: '쌍둥이자리', symbol: '♊', color: '#ffeb3b', months: [[5, 21, 31], [6, 1, 20]] },
      { name: '게자리', symbol: '♋', color: '#2196f3', months: [[6, 21, 30], [7, 1, 22]] },
      { name: '사자자리', symbol: '♌', color: '#ff9800', months: [[7, 23, 31], [8, 1, 22]] },
      { name: '처녀자리', symbol: '♍', color: '#795548', months: [[8, 23, 31], [9, 1, 22]] },
      { name: '천칭자리', symbol: '♎', color: '#e91e63', months: [[9, 23, 30], [10, 1, 22]] },
      { name: '전갈자리', symbol: '♏', color: '#9e0000', months: [[10, 23, 31], [11, 1, 21]] },
      { name: '사수자리', symbol: '♐', color: '#673ab7', months: [[11, 22, 30], [12, 1, 21]] },
      { name: '염소자리', symbol: '♑', color: '#607d8b', months: [[12, 22, 31], [1, 1, 19]] }
    ];

    for (let sign of zodiacSigns) {
      for (let range of sign.months) {
        const [rangeMonth, startDay, endDay] = range;
        if (month === rangeMonth && day >= startDay && day <= endDay) {
          return sign;
        }
      }
    }
    return zodiacSigns[0]; // 기본값
  };

  const getThemeNames = () => {
    const themeTranslations = {
      'en-US': {
        flowers: '🌸 Flower Garden', books: '📚 Bookshelf', stars: '⭐ Constellation',
        waves: '🌊 Waves', tree: '🌳 Tree Growth', travel: '🗺️ Journey', grid: '🔲 Grid'
      },
      'ko-KR': {
        flowers: '🌸 꽃밭', books: '📚 책장', stars: '⭐ 별자리',
        waves: '🌊 파도', tree: '🌳 나무 성장', travel: '🗺️ 여행', grid: '🔲 격자'
      },
      'ja-JP': {
        flowers: '🌸 花園', books: '📚 本棚', stars: '⭐ 星座',
        waves: '🌊 波', tree: '🌳 木の成長', travel: '🗺️ 旅', grid: '🔲 グリッド'
      },
      'es-ES': {
        flowers: '🌸 Jardín de flores', books: '📚 Estantería', stars: '⭐ Constelación',
        waves: '🌊 Ondas', tree: '🌳 Crecimiento del árbol', travel: '🗺️ Viaje', grid: '🔲 Cuadrícula'
      }
    };
    
    const descriptions = {
      'en-US': {
        flowers: 'Flowers blooming in a garden', books: 'Knowledge accumulating in a library', stars: 'Your zodiac constellation based on birth date',
        waves: 'Dynamic ocean waves flow', tree: 'Clear tree rings showing life stages', travel: 'Winding life journey', grid: 'Classic weekly grid format'
      },
      'ko-KR': {
        flowers: '꽃들이 피어나는 정원', books: '지식이 쌓여가는 서재', stars: '생년월일 기반 개인 별자리',
        waves: '역동적인 바다 파도', tree: '인생 단계별 명확한 나이테', travel: '구불구불한 인생 여정', grid: '클래식한 주간 격자 형태'
      },
      'ja-JP': {
        flowers: '庭に花が咲く', books: '図書館で知識が蓄積', stars: '生年月日に基づく個人の星座',
        waves: 'ダイナミックな海の波', tree: '人生の段階を示す明確な年輪', travel: '曲がりくねった人生の旅', grid: 'クラシックな週間グリッド形式'
      },
      'es-ES': {
        flowers: 'Flores floreciendo en un jardín', books: 'Conocimiento acumulándose en una biblioteca', stars: 'Tu constelación zodiacal basada en fecha de nacimiento',
        waves: 'Flujo dinámico de olas del océano', tree: 'Anillos de árbol claros mostrando etapas de vida', travel: 'Viaje serpenteante de la vida', grid: 'Formato clásico de cuadrícula semanal'
      }
    };

    return [
      { id: 'flowers', name: themeTranslations[selectedLanguage].flowers, description: descriptions[selectedLanguage].flowers },
      { id: 'books', name: themeTranslations[selectedLanguage].books, description: descriptions[selectedLanguage].books },
      { id: 'stars', name: themeTranslations[selectedLanguage].stars, description: descriptions[selectedLanguage].stars },
      { id: 'waves', name: themeTranslations[selectedLanguage].waves, description: descriptions[selectedLanguage].waves },
      { id: 'tree', name: themeTranslations[selectedLanguage].tree, description: descriptions[selectedLanguage].tree },
      { id: 'travel', name: themeTranslations[selectedLanguage].travel, description: descriptions[selectedLanguage].travel },
      { id: 'grid', name: themeTranslations[selectedLanguage].grid, description: descriptions[selectedLanguage].grid }
    ];
  };

  const themes = getThemeNames();

  const t = (key) => TRANSLATIONS[selectedLanguage]?.[key] || TRANSLATIONS['en-US'][key] || key;

  const calculateStats = (date, lifespan) => {
    const birthDate = new Date(date);
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((today - birthDate) / msInWeek);
    
    const totalWeeks = lifespan * 52;
    const weeksRemaining = totalWeeks - weeksLived;
    const percentageLived = Math.round((weeksLived / totalWeeks) * 100);
    
    const msInDay = 1000 * 60 * 60 * 24;
    const daysLived = Math.floor((today - birthDate) / msInDay);
    
    const hoursSlept = Math.floor(daysLived * 8);
    const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
    const breaths = Math.floor(daysLived * 24 * 60 * 16);
    const seasons = Math.floor(daysLived / 91.25);
    
    return {
      weeksLived,
      totalWeeks,
      weeksRemaining,
      percentageLived,
      daysLived,
      hoursSlept,
      heartbeats,
      breaths,
      seasons,
      birthYear,
      birthDate
    };
  };

  const handleSubmit = () => {
    setStats(calculateStats(birthdate, expectedLifespan));
    setStep(2);
  };

  const getFormattedNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const renderGridVisualization = () => {
    const rows = [];
    const weeksPerRow = 52;
    const totalRows = Math.ceil(stats.totalWeeks / weeksPerRow);
    
    for (let row = 0; row < totalRows; row++) {
      const weekCells = [];
      for (let col = 0; col < weeksPerRow; col++) {
        const weekNumber = row * weeksPerRow + col;
        if (weekNumber < stats.totalWeeks) {
          const isPast = weekNumber < stats.weeksLived;
          const isCurrent = weekNumber === stats.weeksLived;
          
          let cellStyle = {
            width: '8px',
            height: '8px',
            margin: '2px',
            borderRadius: '2px',
            transition: 'all 0.3s',
            cursor: 'pointer'
          };
          
          if (isPast) {
            cellStyle.backgroundColor = '#374151';
          } else if (isCurrent) {
            cellStyle.backgroundColor = '#3b82f6';
            cellStyle.animation = 'pulse 2s infinite';
          } else {
            cellStyle.backgroundColor = '#e5e7eb';
          }
          
          weekCells.push(
            <div 
              key={weekNumber}
              style={cellStyle}
              onMouseEnter={() => {
                setHoverWeek(weekNumber);
                setShowHoverData(true);
              }}
              onMouseLeave={() => setShowHoverData(false)}
            />
          );
        }
      }
      
      rows.push(
        <div key={row} style={{ display: 'flex' }}>
          {weekCells}
        </div>
      );
    }
    
    return (
      <div className="grid-wrapper">
        {rows}
      </div>
    );
  };

  const renderTreeVisualization = () => {
    const rings = [];
    const yearsPerRing = Math.max(1, Math.floor(expectedLifespan / 15)); // 15개의 링으로 나누기
    const totalRings = Math.ceil(expectedLifespan / yearsPerRing);
    const currentAge = Math.floor(stats.weeksLived / 52);
    const completedRings = Math.floor(currentAge / yearsPerRing);
    
    // 각 링이 몇 살을 나타내는지 표시
    for (let i = 0; i < totalRings; i++) {
      const isCompleted = i < completedRings;
      const isCurrent = i === completedRings;
      const ringAge = (i + 1) * yearsPerRing;
      const radius = 30 + i * 15;
      
      rings.push(
        <g key={i}>
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke={isCompleted ? "#10b981" : isCurrent ? "#3b82f6" : "#e5e7eb"}
            strokeWidth={isCompleted ? "6" : isCurrent ? "4" : "2"}
            opacity={isCompleted ? 0.9 : isCurrent ? 1 : 0.4}
            style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
          />
          {/* 나이 표시 */}
          <text
            x={200 + radius * 0.7}
            y={200 - radius * 0.7}
            fontSize="10"
            fill={isCompleted ? "#10b981" : isCurrent ? "#3b82f6" : "#9ca3af"}
            fontWeight="bold"
          >
            {ringAge}세
          </text>
        </g>
      );
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
          {rings}
          {/* 나무 줄기 */}
          <rect x="195" y="200" width="10" height="80" fill="#8b5cf6" />
          {/* 나무 꼭대기 */}
          <circle cx="200" cy="180" r="25" fill="#22c55e" opacity="0.8" />
          {/* 중앙 현재 나이 표시 */}
          <text x="200" y="205" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="bold">
            {currentAge}세
          </text>
        </svg>
      </div>
    );
  };

  const renderStarsVisualization = () => {
    const zodiac = getZodiacSign(stats.birthDate);
    const stars = [];
    const totalStars = 88; // 실제 별자리의 별 개수에 가깝게
    const completedStars = Math.floor((stats.weeksLived / stats.totalWeeks) * totalStars);
    
    // 별자리 패턴을 실제 별자리 모양에 가깝게 배치
    const constellationPatterns = {
      '♈': [  // 양자리 - V자 모양
        [150, 100], [180, 80], [200, 100], [220, 80], [250, 100]
      ],
      '♉': [  // 황소자리 - 소의 얼굴 모양
        [120, 120], [150, 100], [200, 90], [250, 100], [280, 120]
      ],
      // 기본 원형 패턴
      default: []
    };
    
    const pattern = constellationPatterns[zodiac.symbol] || [];
    
    for (let i = 0; i < totalStars; i++) {
      let x, y;
      
      if (i < pattern.length) {
        // 주요 별자리 별들
        [x, y] = pattern[i];
      } else {
        // 나머지 별들은 원형으로 배치
        const angle = (i / totalStars) * 6 * Math.PI;
        const radius = 50 + (i % 8) * 25;
        x = 200 + Math.cos(angle) * radius;
        y = 200 + Math.sin(angle) * radius;
      }
      
      const isCompleted = i < completedStars;
      const isCurrent = i === completedStars;
      
      stars.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={isCompleted ? (i < pattern.length ? "6" : "3") : isCurrent ? "5" : "2"}
          fill={isCompleted ? zodiac.color : isCurrent ? "#3b82f6" : "#e5e7eb"}
          opacity={isCompleted ? 1 : isCurrent ? 1 : 0.3}
          style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
        />
      );
      
      // 주요 별들 연결선
      if (isCompleted && i < pattern.length - 1) {
        const [nextX, nextY] = pattern[i + 1];
        stars.push(
          <line
            key={`line-${i}`}
            x1={x}
            y1={y}
            x2={nextX}
            y2={nextY}
            stroke={zodiac.color}
            strokeWidth="2"
            opacity="0.8"
          />
        );
      }
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#0f172a', borderRadius: '8px' }}>
          {stars}
          {/* 별자리 이름 표시 */}
          <text x="200" y="350" textAnchor="middle" fontSize="16" fill={zodiac.color} fontWeight="bold">
            {zodiac.symbol} {zodiac.name}
          </text>
        </svg>
      </div>
    );
  };

  const renderFlowersVisualization = () => {
    const flowers = [];
    const rows = 15;
    const cols = 20;
    const totalFlowers = rows * cols;
    const completedFlowers = Math.floor((stats.weeksLived / stats.totalWeeks) * totalFlowers);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const x = 20 + col * 18;
        const y = 30 + row * 22;
        const isCompleted = index < completedFlowers;
        const isCurrent = index === completedFlowers;
        
        flowers.push(
          <g key={index}>
            <circle
              cx={x}
              cy={y}
              r="4"
              fill={isCompleted ? "#ec4899" : isCurrent ? "#3b82f6" : "#f3f4f6"}
              opacity={isCompleted ? 0.9 : isCurrent ? 1 : 0.3}
              style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
            />
            {isCompleted && (
              <>
                <circle cx={x-3} cy={y-3} r="2" fill="#fbbf24" opacity="0.8" />
                <circle cx={x+3} cy={y-3} r="2" fill="#fbbf24" opacity="0.8" />
                <circle cx={x} cy={y+3} r="2" fill="#fbbf24" opacity="0.8" />
                <circle cx={x-3} cy={y+3} r="2" fill="#fbbf24" opacity="0.8" />
                <circle cx={x+3} cy={y+3} r="2" fill="#fbbf24" opacity="0.8" />
              </>
            )}
          </g>
        );
      }
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#fdf2f8', borderRadius: '8px' }}>
          {flowers}
        </svg>
      </div>
    );
  };

  const renderWavesVisualization = () => {
    const waves = [];
    const waveCount = 20;
    const completedWaves = Math.floor((stats.weeksLived / stats.totalWeeks) * waveCount);
    
    for (let i = 0; i < waveCount; i++) {
      const y = 50 + i * 15;
      const isCompleted = i < completedWaves;
      const isCurrent = i === completedWaves;
      const amplitude = 25 + Math.sin(i * 0.5) * 10; // 변화하는 진폭
      const frequency = 0.025 + i * 0.001; // 점진적으로 변하는 주파수
      
      let pathData = `M 20 ${y}`;
      for (let x = 20; x <= 380; x += 6) {
        const waveY = y + Math.sin(x * frequency + i * 0.8) * amplitude + 
                      Math.cos(x * frequency * 1.5) * (amplitude * 0.3); // 복합 파형
        pathData += ` L ${x} ${waveY}`;
      }
      
      waves.push(
        <path
          key={i}
          d={pathData}
          fill="none"
          stroke={isCompleted ? `hsl(${200 + i * 3}, 80%, ${50 + i}%)` : isCurrent ? "#3b82f6" : "#e5e7eb"}
          strokeWidth={isCompleted ? "4" : isCurrent ? "5" : "1"}
          opacity={isCompleted ? 0.8 : isCurrent ? 1 : 0.3}
          style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
        />
      );
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#ecfeff', borderRadius: '8px' }}>
          {waves}
          {/* 파도 거품 효과 */}
          <circle cx="350" cy="100" r="3" fill="white" opacity="0.7" />
          <circle cx="330" cy="150" r="2" fill="white" opacity="0.5" />
          <circle cx="370" cy="200" r="4" fill="white" opacity="0.6" />
        </svg>
      </div>
    );
  };

  const renderBooksVisualization = () => {
    const books = [];
    const shelves = 12;
    const booksPerShelf = 15;
    const totalBooks = shelves * booksPerShelf;
    const completedBooks = Math.floor((stats.weeksLived / stats.totalWeeks) * totalBooks);
    
    for (let shelf = 0; shelf < shelves; shelf++) {
      books.push(
        <rect
          key={`shelf-${shelf}`}
          x="30"
          y={40 + shelf * 28 + 20}
          width="340"
          height="3"
          fill="#8b5cf6"
        />
      );
      
      for (let book = 0; book < booksPerShelf; book++) {
        const index = shelf * booksPerShelf + book;
        const x = 35 + book * 22;
        const y = 40 + shelf * 28;
        const isCompleted = index < completedBooks;
        const isCurrent = index === completedBooks;
        const colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];
        
        books.push(
          <rect
            key={index}
            x={x}
            y={y}
            width="18"
            height="20"
            fill={isCompleted ? colors[book % colors.length] : isCurrent ? "#3b82f6" : "#f3f4f6"}
            opacity={isCompleted ? 0.9 : isCurrent ? 1 : 0.3}
            rx="1"
            style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
          />
        );
      }
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#faf5ff', borderRadius: '8px' }}>
          {books}
        </svg>
      </div>
    );
  };

  const renderTravelVisualization = () => {
    const points = [];
    const totalPoints = 60;
    const completedPoints = Math.floor((stats.weeksLived / stats.totalWeeks) * totalPoints);
    
    const pathPoints = [];
    for (let i = 0; i < totalPoints; i++) {
      const progress = i / (totalPoints - 1);
      const x = 40 + progress * 320 + Math.sin(progress * 8) * 30;
      const y = 200 + Math.cos(progress * 6) * 60;
      pathPoints.push({ x, y });
    }
    
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const isCompleted = i < completedPoints - 1;
      const isCurrent = i === completedPoints - 1;
      points.push(
        <line
          key={`path-${i}`}
          x1={pathPoints[i].x}
          y1={pathPoints[i].y}
          x2={pathPoints[i + 1].x}
          y2={pathPoints[i + 1].y}
          stroke={isCompleted ? "#059669" : isCurrent ? "#3b82f6" : "#e5e7eb"}
          strokeWidth={isCompleted ? "4" : isCurrent ? "5" : "1"}
          opacity={isCompleted ? 0.8 : isCurrent ? 1 : 0.3}
          style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
        />
      );
    }
    
    pathPoints.forEach((point, i) => {
      const isCompleted = i < completedPoints;
      const isCurrent = i === completedPoints;
      points.push(
        <circle
          key={`step-${i}`}
          cx={point.x}
          cy={point.y}
          r={isCompleted ? "5" : isCurrent ? "6" : "2"}
          fill={isCompleted ? "#059669" : isCurrent ? "#3b82f6" : "#e5e7eb"}
          opacity={isCompleted ? 1 : isCurrent ? 1 : 0.3}
          style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
        />
      );
    });
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#ecfdf5', borderRadius: '8px' }}>
          {points}
        </svg>
      </div>
    );
  };

  const renderVisualization = () => {
    if (!stats) return null;
    
    return (
      <div className="week-grid-container">
        <div className="week-grid-header">
          <h2>
            {name ? `${name}'s life in weeks` : t('lifeInWeeksTitle')}
          </h2>
          <div className="percentage-display">
            <div className="date-display">
              {new Date().toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <span className="percentage">{stats.percentageLived}%</span>
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          {selectedTheme === 'grid' && renderGridVisualization()}
          {selectedTheme === 'tree' && renderTreeVisualization()}
          {selectedTheme === 'stars' && renderStarsVisualization()}
          {selectedTheme === 'flowers' && renderFlowersVisualization()}
          {selectedTheme === 'waves' && renderWavesVisualization()}
          {selectedTheme === 'books' && renderBooksVisualization()}
          {selectedTheme === 'travel' && renderTravelVisualization()}
        </div>
        
        {showHoverData && hoverWeek !== null && (
          <div className="hover-info">
            Week {hoverWeek + 1}: 
            {hoverWeek < stats.weeksLived ? 
              t('weekHoverPast') : 
              hoverWeek === stats.weeksLived ? 
              t('weekHoverCurrent') : 
              t('weekHoverFuture')}
          </div>
        )}
        
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color past"></div>
            <span>{t('legendPast')}</span>
          </div>
          <div className="legend-item">
            <div className="legend-color present"></div>
            <span>{t('legendPresent')}</span>
          </div>
          <div className="legend-item">
            <div className="legend-color future"></div>
            <span>{t('legendFuture')}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderStats = () => {
    if (!stats) return null;
    
    return (
      <div className="stats-container">
        <div className="stats-card">
          <h2>{t('lifeHighlightsTitle')}</h2>
          <div className="stats-content">
            <p>
              {t('lifeHighlightsWeeks')} <strong>{getFormattedNumber(stats.weeksLived)}</strong> {t('lifeHighlightsWeeksEnd')} <strong>{stats.percentageLived}%</strong> {t('lifeHighlightsPercent')}
            </p>
            <p>
              {t('lifeHighlightsDays')} <strong>{getFormattedNumber(stats.daysLived)}</strong> {t('lifeHighlightsDaysEnd')} <strong>{getFormattedNumber(stats.seasons)}</strong> {t('lifeHighlightsSeasonsEnd')}
            </p>
            <p>
              {t('lifeHighlightsHeartbeats')} <strong>{getFormattedNumber(stats.heartbeats)}</strong> {t('lifeHighlightsHeartbeatsEnd')}
            </p>
            <p>
              {t('lifeHighlightsBreaths')} <strong>{getFormattedNumber(stats.breaths)}</strong> {t('lifeHighlightsBreathsMiddle')} <strong>{getFormattedNumber(stats.hoursSlept)}</strong> {t('lifeHighlightsBreathsEnd')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleReset = () => {
    setBirthdate('');
    setName('');
    setExpectedLifespan(80);
    setSelectedTheme('flowers');
    setStats(null);
    setStep(1);
  };

  const getPlaceholderText = () => {
    switch(selectedLanguage) {
      case 'en-US': return 'Enter your name';
      case 'ja-JP': return '名前を入力してください';
      case 'es-ES': return 'Ingresa tu nombre';
      default: return '이름을 입력하세요';
    }
  };

  const getLifespanText = () => {
    switch(selectedLanguage) {
      case 'en-US': return { label: 'Expected Lifespan (Age)', range: '0 - 150 years range', unit: 'years' };
      case 'ja-JP': return { label: '予想寿命（年齢）', range: '0歳〜150歳の範囲', unit: '歳' };
      case 'es-ES': return { label: 'Esperanza de vida (Edad)', range: 'Rango de 0 - 150 años', unit: 'años' };
      default: return { label: '예상 수명 (나이)', range: '0세 ~ 150세 범위에서 설정 가능', unit: '세' };
    }
  };

  const getThemeText = () => {
    switch(selectedLanguage) {
      case 'en-US': return 'Select Visualization Theme';
      case 'ja-JP': return '視覚化テーマを選択';
      case 'es-ES': return 'Seleccionar tema de visualización';
      default: return '시각화 테마 선택';
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Language Selector */}
        <div className="language-selector">
          <div className="language-buttons">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`lang-btn ${selectedLanguage === lang.code ? 'active' : ''}`}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
        </div>

        <h1 className="main-title">{t('pageTitle')}</h1>
        <p className="subtitle">{t('pageSubtitle')}</p>
        
        {step === 1 ? (
          <div className="input-card">
            <h2>{t('birthDateQuestion')}</h2>
            <div className="input-form">
              <input
                type="text"
                placeholder={getPlaceholderText()}
                className="text-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="date"
                className="date-input"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              
              <div className="slider-container">
                <label className="slider-label">
                  {getLifespanText().label}
                </label>
                <div className="slider-wrapper">
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={expectedLifespan}
                    onChange={(e) => setExpectedLifespan(parseInt(e.target.value))}
                    className="slider"
                  />
                  <span className="slider-value">
                    {expectedLifespan}{getLifespanText().unit}
                  </span>
                </div>
                <div className="slider-range">
                  {getLifespanText().range}
                </div>
              </div>

              <div className="theme-container">
                <label className="theme-label">{getThemeText()}</label>
                <div className="theme-options">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`theme-option ${selectedTheme === theme.id ? 'selected' : ''}`}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className="theme-content">
                        <div className="theme-name">{theme.name}</div>
                        <div className="theme-description">{theme.description}</div>
                      </div>
                      <div className={`theme-radio ${selectedTheme === theme.id ? 'selected' : ''}`}>
                        {selectedTheme === theme.id && <div className="theme-radio-dot"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                className="submit-btn"
                disabled={!birthdate}
              >
                {t('visualizeButton')}
              </button>
            </div>
          </div>
        ) : (
          <>
            {renderVisualization()}
            {renderStats()}
            <button
              onClick={handleReset}
              className="reset-btn"
            >
              {t('startOverButton')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}