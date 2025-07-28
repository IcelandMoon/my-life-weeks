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
  const [selectedTheme, setSelectedTheme] = useState('grid');
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

  const getThemeNames = () => {
    const themeTranslations = {
      'en-US': {
        grid: '🔲 Grid', tree: '🌳 Tree Growth', stars: '⭐ Constellation', 
        flowers: '🌸 Flower Garden', waves: '🌊 Waves', books: '📚 Bookshelf', travel: '🗺️ Journey'
      },
      'ko-KR': {
        grid: '🔲 격자', tree: '🌳 나무 성장', stars: '⭐ 별자리', 
        flowers: '🌸 꽃밭', waves: '🌊 파도', books: '📚 책장', travel: '🗺️ 여행'
      },
      'ja-JP': {
        grid: '🔲 グリッド', tree: '🌳 木の成長', stars: '⭐ 星座', 
        flowers: '🌸 花園', waves: '🌊 波', books: '📚 本棚', travel: '🗺️ 旅'
      },
      'es-ES': {
        grid: '🔲 Cuadrícula', tree: '🌳 Crecimiento del árbol', stars: '⭐ Constelación', 
        flowers: '🌸 Jardín de flores', waves: '🌊 Ondas', books: '📚 Estantería', travel: '🗺️ Viaje'
      }
    };
    
    const descriptions = {
      'en-US': {
        grid: 'Classic weekly grid format', tree: 'Expanding in rings like tree rings', stars: 'Stars connecting to complete constellations', 
        flowers: 'Flowers blooming in a garden', waves: 'Smooth curved flow', books: 'Knowledge accumulating in a library', travel: 'Winding life journey'
      },
      'ko-KR': {
        grid: '클래식한 주간 격자 형태', tree: '나이테처럼 원형으로 확장', stars: '별들이 연결되어 별자리 완성', 
        flowers: '꽃들이 피어나는 정원', waves: '부드러운 곡선의 흐름', books: '지식이 쌓여가는 서재', travel: '구불구불한 인생 여정'
      },
      'ja-JP': {
        grid: 'クラシックな週間グリッド形式', tree: '年輪のように円形に拡張', stars: '星が繋がって星座を完成', 
        flowers: '庭に花が咲く', waves: '滑らかな曲線の流れ', books: '図書館で知識が蓄積', travel: '曲がりくねった人生の旅'
      },
      'es-ES': {
        grid: 'Formato clásico de cuadrícula semanal', tree: 'Expandiéndose en anillos como los de un árbol', stars: 'Estrellas conectándose para completar constelaciones', 
        flowers: 'Flores floreciendo en un jardín', waves: 'Flujo curvo suave', books: 'Conocimiento acumulándose en una biblioteca', travel: 'Viaje serpenteante de la vida'
      }
    };

    return [
      { id: 'grid', name: themeTranslations[selectedLanguage].grid, description: descriptions[selectedLanguage].grid },
      { id: 'tree', name: themeTranslations[selectedLanguage].tree, description: descriptions[selectedLanguage].tree },
      { id: 'stars', name: themeTranslations[selectedLanguage].stars, description: descriptions[selectedLanguage].stars },
      { id: 'flowers', name: themeTranslations[selectedLanguage].flowers, description: descriptions[selectedLanguage].flowers },
      { id: 'waves', name: themeTranslations[selectedLanguage].waves, description: descriptions[selectedLanguage].waves },
      { id: 'books', name: themeTranslations[selectedLanguage].books, description: descriptions[selectedLanguage].books },
      { id: 'travel', name: themeTranslations[selectedLanguage].travel, description: descriptions[selectedLanguage].travel }
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
      birthYear
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
    const maxRings = 15;
    const completedRings = Math.floor((stats.weeksLived / stats.totalWeeks) * maxRings);
    
    for (let i = 0; i < maxRings; i++) {
      const isCompleted = i < completedRings;
      const isCurrent = i === completedRings;
      const radius = 30 + i * 12;
      rings.push(
        <circle
          key={i}
          cx="200"
          cy="200"
          r={radius}
          fill="none"
          stroke={isCompleted ? "#10b981" : isCurrent ? "#3b82f6" : "#e5e7eb"}
          strokeWidth={isCompleted ? "4" : isCurrent ? "3" : "1"}
          opacity={isCompleted ? 0.8 : isCurrent ? 1 : 0.3}
          style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
        />
      );
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
          {rings}
          <rect x="195" y="200" width="10" height="60" fill="#8b5cf6" />
          <circle cx="200" cy="190" r="20" fill="#22c55e" opacity="0.8" />
        </svg>
      </div>
    );
  };

  const renderStarsVisualization = () => {
    const stars = [];
    const totalStars = 50;
    const completedStars = Math.floor((stats.weeksLived / stats.totalWeeks) * totalStars);
    
    for (let i = 0; i < totalStars; i++) {
      const angle = (i / totalStars) * 4 * Math.PI;
      const radius = 50 + (i * 3);
      const x = 200 + Math.cos(angle) * radius;
      const y = 200 + Math.sin(angle) * radius;
      const isCompleted = i < completedStars;
      const isCurrent = i === completedStars;
      
      stars.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={isCompleted ? "4" : isCurrent ? "5" : "2"}
          fill={isCompleted ? "#fbbf24" : isCurrent ? "#3b82f6" : "#e5e7eb"}
          opacity={isCompleted ? 1 : isCurrent ? 1 : 0.3}
          style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
        />
      );
      
      if (isCompleted && i > 0) {
        const prevAngle = ((i-1) / totalStars) * 4 * Math.PI;
        const prevRadius = 50 + ((i-1) * 3);
        const prevX = 200 + Math.cos(prevAngle) * prevRadius;
        const prevY = 200 + Math.sin(prevAngle) * prevRadius;
        
        stars.push(
          <line
            key={`line-${i}`}
            x1={prevX}
            y1={prevY}
            x2={x}
            y2={y}
            stroke="#fbbf24"
            strokeWidth="1"
            opacity="0.6"
          />
        );
      }
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#eff6ff', borderRadius: '8px' }}>
          {stars}
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
    const waveCount = 25;
    const completedWaves = Math.floor((stats.weeksLived / stats.totalWeeks) * waveCount);
    
    for (let i = 0; i < waveCount; i++) {
      const y = 30 + i * 14;
      const isCompleted = i < completedWaves;
      const isCurrent = i === completedWaves;
      const amplitude = 20;
      const frequency = 0.03;
      
      let pathData = `M 20 ${y}`;
      for (let x = 20; x <= 380; x += 8) {
        const waveY = y + Math.sin(x * frequency + i * 0.5) * amplitude;
        pathData += ` L ${x} ${waveY}`;
      }
      
      waves.push(
        <path
          key={i}
          d={pathData}
          fill="none"
          stroke={isCompleted ? "#06b6d4" : isCurrent ? "#3b82f6" : "#e5e7eb"}
          strokeWidth={isCompleted ? "3" : isCurrent ? "4" : "1"}
          opacity={isCompleted ? 0.8 : isCurrent ? 1 : 0.3}
          style={isCurrent ? {animation: 'pulse 2s infinite'} : {}}
        />
      );
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" style={{ backgroundColor: '#ecfeff', borderRadius: '8px' }}>
          {waves}
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
    setSelectedTheme('grid');
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
      case 'en-US': return { label: 'Expected Lifespan (Age)', range: '60 - 120 years range', unit: 'years' };
      case 'ja-JP': return { label: '予想寿命（年齢）', range: '60歳〜120歳の範囲', unit: '歳' };
      case 'es-ES': return { label: 'Esperanza de vida (Edad)', range: 'Rango de 60 - 120 años', unit: 'años' };
      default: return { label: '예상 수명 (나이)', range: '60세 ~ 120세 범위에서 설정 가능', unit: '세' };
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
                    min="60"
                    max="120"
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