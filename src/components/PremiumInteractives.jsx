import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './PremiumInteractives.module.css';

const PremiumInteractives = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sections = [
        { id: 'strategy', title: 'Strategy', subtitle: '2048', icon: '🎯' },
        { id: 'rnd', title: 'R&D', subtitle: 'Blueprint of Standards', icon: '⚙️' },
        { id: 'education', title: 'Education', subtitle: 'Curriculum Galaxy', icon: '🎓' },
        { id: 'platform', title: 'Platform', subtitle: 'Capability Inventory', icon: '🚀' },
        { id: 'design', title: 'Design', subtitle: 'The Clarity Lens', icon: '🎨' }
    ];

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Visualizing Intelligence</h2>
                <p className={styles.subtitle}>인터랙티브 경험을 통해 비즈니스 가치를 발견하세요</p>
            </div>

            <nav className={styles.nav}>
                {sections.map((sec, idx) => (
                    <button
                        key={sec.id}
                        className={`${styles.navBtn} ${activeSection === idx ? styles.active : ''}`}
                        onClick={() => setActiveSection(idx)}
                    >
                        <span className={`${styles.navIcon} emoji-align`}>{sec.icon}</span>
                        <div className={styles.navText}>
                            <span className={styles.navTitle}>{sec.title}</span>
                            <span className={styles.navSub}>{sec.subtitle}</span>
                        </div>
                    </button>
                ))}
            </nav>

            <div className={styles.content}>
                {activeSection === 0 && <Strategy2048 />}
                {activeSection === 1 && <BlueprintOfStandards />}
                {activeSection === 2 && <CurriculumGalaxy />}
                {activeSection === 3 && <CapabilityInventory />}
                {activeSection === 4 && <FocusOfInspiration />}
            </div>
        </section>
    );
};

/* ========================================
   1. STRATEGY: 2048 Game
   전략적 사고를 보여주는 2048 퍼즐 게임
======================================== */
const Strategy2048 = () => {
    const [grid, setGrid] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const gameRef = useRef(null);

    const initGrid = () => {
        const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandomTile(newGrid);
        addRandomTile(newGrid);
        return newGrid;
    };

    const addRandomTile = (grid) => {
        const empty = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) empty.push({ i, j });
            }
        }
        if (empty.length > 0) {
            const { i, j } = empty[Math.floor(Math.random() * empty.length)];
            grid[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const slideRow = (row) => {
        let arr = row.filter(x => x !== 0);
        let newRow = [];
        let addScore = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === arr[i + 1]) {
                const merged = arr[i] * 2;
                newRow.push(merged);
                addScore += merged;
                if (merged === 2048) setWon(true);
                i++;
            } else {
                newRow.push(arr[i]);
            }
        }
        while (newRow.length < 4) newRow.push(0);
        return { row: newRow, score: addScore };
    };

    const move = (direction) => {
        if (gameOver) return;

        let newGrid = grid.map(row => [...row]);
        let moved = false;
        let addScore = 0;

        const rotateGrid = (g) => {
            return g[0].map((_, i) => g.map(row => row[i]).reverse());
        };

        // Rotate grid to always slide left
        let rotations = { left: 0, up: 1, right: 2, down: 3 }[direction];
        for (let r = 0; r < rotations; r++) newGrid = rotateGrid(newGrid);

        for (let i = 0; i < 4; i++) {
            const { row, score: s } = slideRow(newGrid[i]);
            if (row.toString() !== newGrid[i].toString()) moved = true;
            newGrid[i] = row;
            addScore += s;
        }

        // Rotate back
        for (let r = 0; r < (4 - rotations) % 4; r++) newGrid = rotateGrid(newGrid);

        if (moved) {
            addRandomTile(newGrid);
            setGrid(newGrid);
            setScore(prev => {
                const newScore = prev + addScore;
                if (newScore > bestScore) setBestScore(newScore);
                return newScore;
            });

            // Check game over
            if (!canMove(newGrid)) {
                setGameOver(true);
            }
        }
    };

    const canMove = (g) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (g[i][j] === 0) return true;
                if (i < 3 && g[i][j] === g[i + 1][j]) return true;
                if (j < 3 && g[i][j] === g[i][j + 1]) return true;
            }
        }
        return false;
    };

    useEffect(() => {
        setGrid(initGrid());
        gameRef.current?.focus();
    }, []);

    const handleKeyDown = (e) => {
        e.preventDefault();
        const keyMap = {
            ArrowUp: 'up', ArrowDown: 'down',
            ArrowLeft: 'left', ArrowRight: 'right'
        };
        if (keyMap[e.key]) move(keyMap[e.key]);
    };

    const reset = () => {
        setGrid(initGrid());
        setScore(0);
        setGameOver(false);
        setWon(false);
        gameRef.current?.focus();
    };

    const getTileColor = (value) => {
        const colors = {
            0: 'rgba(255,255,255,0.03)',
            2: '#3b4a5a',
            4: '#4a5568',
            8: '#ed8936',
            16: '#dd6b20',
            32: '#e53e3e',
            64: '#c53030',
            128: '#ecc94b',
            256: '#d69e2e',
            512: '#48bb78',
            1024: '#38a169',
            2048: '#00f2ff'
        };
        return colors[value] || '#a855f7';
    };

    const getTileTextColor = (value) => {
        return value >= 8 ? '#fff' : '#e2e8f0';
    };

    return (
        <div className={styles.game2048Wrapper}>
            <div className={styles.game2048Header}>
                <div className={styles.game2048Scores}>
                    <div className={styles.scoreBox}>
                        <span className={styles.scoreLabel}>SCORE</span>
                        <span className={styles.scoreValue}>{score}</span>
                    </div>
                    <div className={styles.scoreBox}>
                        <span className={styles.scoreLabel}>BEST</span>
                        <span className={styles.scoreValue}>{bestScore}</span>
                    </div>
                </div>
            </div>

            <div
                ref={gameRef}
                className={styles.game2048Grid}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                {grid.map((row, i) => (
                    <div key={i} className={styles.game2048Row}>
                        {row.map((cell, j) => (
                            <div
                                key={j}
                                className={`${styles.game2048Cell} ${cell > 0 ? styles.hasValue : ''}`}
                                style={{
                                    background: getTileColor(cell),
                                    color: getTileTextColor(cell)
                                }}
                            >
                                {cell > 0 && <span>{cell}</span>}
                            </div>
                        ))}
                    </div>
                ))}

                {(gameOver || won) && (
                    <div className={styles.game2048Overlay}>
                        <div className={styles.game2048Message}>
                            <h4>{won ? '🎉 2048 달성!' : '💼 Game Over'}</h4>
                            <p>{won ? '전략적 사고로 목표를 달성했습니다!' : `최종 점수: ${score}`}</p>
                            <button onClick={reset}>다시 시도</button>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.game2048Controls}>
                <div className={styles.arrowKeys}>
                    <button onClick={() => move('up')}>↑</button>
                    <div className={styles.arrowRow}>
                        <button onClick={() => move('left')}>←</button>
                        <button onClick={() => move('down')}>↓</button>
                        <button onClick={() => move('right')}>→</button>
                    </div>
                </div>
            </div>

            <div className={styles.game2048Footer}>
                <p className={styles.game2048Insight}>
                    "작은 조각들을 전략적으로 합쳐 더 큰 가치를 만들어내는 것,<br />
                    그것이 우리가 귀사의 비즈니스에 하는 일입니다."
                </p>
            </div>

            <div className={styles.gameFooter}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
                <span className={styles.hint}>화살표 키 또는 버튼으로 타일을 이동하세요</span>
            </div>
        </div>
    );
};


/* ========================================
   2. R&D: Blueprint of Standards
   클릭 선택 방식 (드래그 대신)
======================================== */
const RND_MODULES = [
    { id: 1, name: 'Problem Scanner', icon: '🔍', desc: '문제 인식' },
    { id: 2, name: 'Logic Gear', icon: '⚙️', desc: '기획/설계' },
    { id: 3, name: 'R&D Accelerator', icon: '🚀', desc: '연구 개발' },
    { id: 4, name: 'Quality Filter', icon: '🔬', desc: '검증/테스트' },
    { id: 5, name: 'Standard Light', icon: '💡', desc: '상용화' }
];

const BlueprintOfStandards = () => {
    const [slots, setSlots] = useState([null, null, null, null, null]);
    const [inventory, setInventory] = useState([...RND_MODULES].sort(() => Math.random() - 0.5));
    const [selectedModule, setSelectedModule] = useState(null);
    const [running, setRunning] = useState(false);
    const [energyLevel, setEnergyLevel] = useState(-1);
    const [completed, setCompleted] = useState(false);
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(false);
    const intervalRef = useRef(null);

    // 인벤토리에서 모듈 클릭 - 선택/해제
    const handleModuleClick = (module) => {
        if (running) return;
        if (selectedModule?.id === module.id) {
            setSelectedModule(null);
        } else {
            setSelectedModule(module);
        }
    };

    // 슬롯 클릭 - 선택된 모듈 배치 또는 기존 모듈 해제
    const handleSlotClick = (slotIndex) => {
        if (running) return;

        // 슬롯에 이미 모듈이 있으면 해제
        if (slots[slotIndex]) {
            const removedModule = slots[slotIndex];
            const newSlots = [...slots];
            newSlots[slotIndex] = null;
            setSlots(newSlots);
            setInventory(prev => [...prev, removedModule].sort((a, b) => a.id - b.id));
            return;
        }

        // 선택된 모듈이 있으면 배치
        if (selectedModule) {
            const newSlots = [...slots];
            newSlots[slotIndex] = selectedModule;
            setSlots(newSlots);
            setInventory(prev => prev.filter(m => m.id !== selectedModule.id));
            setSelectedModule(null);
        }
    };

    const runProcess = () => {
        if (running) return;

        // Check if all slots are filled
        if (slots.some(s => !s)) {
            setLogs(['[ERROR] 모든 슬롯에 모듈을 배치하세요!']);
            setError(true);
            setTimeout(() => { setLogs([]); setError(false); }, 2000);
            return;
        }

        // Check correct order
        const isCorrect = slots.every((s, i) => s && s.id === i + 1);
        if (!isCorrect) {
            setLogs(['[ERROR] 모듈 순서가 올바르지 않습니다! (문제인식 → 기획 → 연구 → 검증 → 상용화)']);
            setError(true);
            setTimeout(() => { setLogs([]); setError(false); }, 3000);
            return;
        }

        setRunning(true);
        setError(false);
        setLogs(['[INIT] 프로세스 시작...']);
        setEnergyLevel(0);

        const logMessages = [
            '[SCAN] 문제 영역 스캔 중...',
            '[GEAR] 구조 설계 분석 중...',
            '[ACCEL] 연구 효율 140% 달성...',
            '[FILTER] 품질 검증 통과...',
            '[COMPLETE] 표준화 완료!'
        ];

        let step = 0;
        intervalRef.current = setInterval(() => {
            step++;
            if (step <= 5) {
                setEnergyLevel(step);
                setLogs(prev => [...prev, logMessages[step - 1]]);
            }

            if (step >= 5) {
                clearInterval(intervalRef.current);
                setTimeout(() => setCompleted(true), 500);
            }
        }, 700);
    };

    const reset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSlots([null, null, null, null, null]);
        setInventory([...RND_MODULES].sort(() => Math.random() - 0.5));
        setSelectedModule(null);
        setRunning(false);
        setEnergyLevel(-1);
        setCompleted(false);
        setLogs([]);
        setError(false);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className={styles.blueprintWrapper}>
            <div className={styles.blueprintHeader}>
                <h4>R&D Process Blueprint</h4>
                <p>모듈을 올바른 순서로 배치하고 프로세스를 가동하세요</p>
            </div>

            <div className={styles.inventoryBar}>
                <span className={styles.inventoryLabel}>
                    모듈 인벤토리 (클릭하여 선택 → 슬롯 클릭하여 배치)
                </span>
                <div className={styles.inventoryItems}>
                    {inventory.map(m => (
                        <div
                            key={m.id}
                            className={`${styles.inventoryItem} ${selectedModule?.id === m.id ? styles.selectedItem : ''}`}
                            onClick={() => handleModuleClick(m)}
                        >
                            <span className={`${styles.itemIcon} emoji-align`}>{m.icon}</span>
                            <span className={styles.itemName}>{m.desc}</span>
                        </div>
                    ))}
                    {inventory.length === 0 && <span className={styles.emptyMsg}>모든 모듈 배치됨</span>}
                </div>
            </div>

            <div className={styles.processTrack}>
                <div className={styles.trackStart}>
                    <button
                        className={styles.startBtn}
                        onClick={runProcess}
                        disabled={running}
                    >
                        {running ? '실행 중...' : '▶ START'}
                    </button>
                </div>

                <div className={styles.trackLine}>
                    {slots.map((slot, i) => (
                        <div
                            key={i}
                            className={`${styles.processSlot} ${energyLevel > i ? styles.energized : ''} ${energyLevel === i && running ? styles.currentEnergy : ''} ${selectedModule && !slot ? styles.availableSlot : ''}`}
                            onClick={() => handleSlotClick(i)}
                        >
                            {slot ? (
                                <div className={styles.slotFilled}>
                                    <span className={`${styles.slotIcon} emoji-align`}>{slot.icon}</span>
                                    <span className={styles.slotName}>{slot.desc}</span>
                                    {!running && <span className={styles.removeHint}>클릭하여 해제</span>}
                                </div>
                            ) : (
                                <div className={styles.slotEmpty}>
                                    <span>Step {i + 1}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.trackEnd}>
                    <div className={`${styles.standardBulb} ${completed ? styles.lit : ''}`}>
                        <span>💡</span>
                        {completed && <div className={styles.isoBadge}>ISO</div>}
                    </div>
                </div>
            </div>

            <div className={`${styles.logConsole} ${error ? styles.logError : ''}`}>
                {logs.length === 0 ? (
                    <div className={styles.logPlaceholder}>프로세스 로그가 여기에 표시됩니다...</div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className={styles.logLine}>{log}</div>
                    ))
                )}
            </div>

            {completed && (
                <div className={styles.resultReport}>
                    <h4>🏆 R&D Completion Certificate</h4>
                    <p><strong>Process Accuracy:</strong> 오차율 0.01% 이내의 완벽한 R&D 설계</p>
                    <p className={styles.insight}>"우리의 R&D는 정교하게 설계된 연쇄 반응의 결과입니다."</p>
                </div>
            )}

            <div className={styles.gameFooter}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
                <span className={styles.hint}>순서: 문제인식 → 기획/설계 → 연구개발 → 검증/테스트 → 상용화</span>
            </div>
        </div>
    );
};


/* ========================================
   3. EDUCATION: Curriculum Galaxy
   노드 기반 지식 그래프 (버튼 삭제)
======================================== */
const KNOWLEDGE_HUBS = [
    {
        id: 'genai', name: 'Generative AI', icon: '🤖', color: '#a855f7', x: 50, y: 18,
        nodes: ['Prompt Engineering', 'RAG 구축', 'LLM Fine-tuning', 'AI 비즈니스 모델']
    },
    {
        id: 'aidev', name: 'AI 개발', icon: '🧠', color: '#00f2ff', x: 22, y: 42,
        nodes: ['PyTorch/TensorFlow', 'Computer Vision', 'NLP', '머신러닝 알고리즘']
    },
    {
        id: 'data', name: '데이터 분석', icon: '📊', color: '#10b981', x: 78, y: 42,
        nodes: ['BigQuery', 'Python/SQL', '데이터 시각화', '통계적 의사결정']
    },
    {
        id: 'platform', name: '플랫폼 구현', icon: '🌐', color: '#f59e0b', x: 18, y: 78,
        nodes: ['Full-Stack 개발', 'MSA 아키텍처', 'Cloud 인프라', 'API 설계']
    },
    {
        id: 'service', name: '서비스 기획', icon: '📋', color: '#ec4899', x: 50, y: 82,
        nodes: ['UX/UI 전략', '서비스 기획', 'DX 컨설팅', 'PLM']
    },
    {
        id: 'rpa', name: '실무 자동화', icon: '⚡', color: '#6366f1', x: 82, y: 78,
        nodes: ['RPA', '업무 워크플로우', 'AI 에이전트', '자동화 설계']
    }
];

const CurriculumGalaxy = () => {
    const [activeHub, setActiveHub] = useState(null);

    const toggleHub = (hubId) => {
        setActiveHub(activeHub === hubId ? null : hubId);
    };

    return (
        <div className={styles.galaxyWrapper}>
            <div className={styles.galaxyHeader}>
                <h4>DX Curriculum Galaxy</h4>
                <p>현존하는 모든 DX 기술, 우리가 가장 실무적으로 가르칩니다</p>
            </div>

            <div className={styles.galaxyCanvas}>
                <svg className={styles.galaxySvg}>
                    {KNOWLEDGE_HUBS.map((hub, i) =>
                        KNOWLEDGE_HUBS.slice(i + 1).map((hub2) => (
                            <line
                                key={`${hub.id}-${hub2.id}`}
                                x1={`${hub.x}%`} y1={`${hub.y}%`}
                                x2={`${hub2.x}%`} y2={`${hub2.y}%`}
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                        ))
                    )}
                </svg>

                {KNOWLEDGE_HUBS.map(hub => (
                    <div
                        key={hub.id}
                        className={`${styles.hubNode} ${activeHub === hub.id ? styles.activeHub : ''}`}
                        style={{ left: `${hub.x}%`, top: `${hub.y}%`, '--hub-color': hub.color }}
                        onClick={() => toggleHub(hub.id)}
                    >
                        <div className={styles.hubCore}>
                            <span className={`${styles.hubIcon} emoji-align`}>{hub.icon}</span>
                        </div>
                        <span className={styles.hubName}>{hub.name}</span>

                        {activeHub === hub.id && (
                            <div className={styles.subNodes}>
                                {hub.nodes.map((node, i) => (
                                    <div
                                        key={i}
                                        className={styles.subNode}
                                        style={{ '--angle': `${(360 / hub.nodes.length) * i - 45}deg`, '--delay': `${i * 0.08}s` }}
                                    >
                                        <span>{node}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div className={styles.galaxyCore}>
                    <span>DX</span>
                    <span>Mastery</span>
                </div>
            </div>

            {activeHub && (
                <div className={styles.hubDetail}>
                    <h5>{KNOWLEDGE_HUBS.find(h => h.id === activeHub)?.name} 교육 과정</h5>
                    <div className={styles.courseList}>
                        {KNOWLEDGE_HUBS.find(h => h.id === activeHub)?.nodes.map((node, i) => (
                            <div key={i} className={styles.courseItem}>
                                <span className={styles.courseNum}>{String(i + 1).padStart(2, '0')}</span>
                                <span className={styles.courseName}>{node}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.galaxyFooter}>
                <span className={styles.hint}>허브 노드를 클릭하여 세부 커리큘럼을 확인하세요</span>
            </div>
        </div>
    );
};

/* ========================================
   4. PLATFORM: Capability Inventory
   제품 카달로그 (버튼 삭제, 레이아웃 조정)
======================================== */
const PRODUCTS = [
    { id: 'web', name: 'Web Platform', icon: '🌐', items: ['커머스 플랫폼', 'SaaS 시스템', '기업 포털', '대시보드'], specs: { web: 80, ai: 20, data: 30 } },
    { id: 'ai', name: 'AI Agent', icon: '🤖', items: ['CS 자동화 봇', '지식 베이스 Agent', '리서치 자동화', 'AI 어시스턴트'], specs: { web: 30, ai: 90, data: 50 } },
    { id: 'data', name: 'Data Analysis', icon: '📊', items: ['실시간 BI', '빅데이터 분석', '이상징후 탐지', '예측 모델링'], specs: { web: 40, ai: 60, data: 95 } },
    { id: 'custom', name: 'Custom Solution', icon: '⚡', items: ['맞춤형 앱', '프로세스 자동화', '통합 솔루션', '레거시 현대화'], specs: { web: 70, ai: 70, data: 70 } }
];

const CapabilityInventory = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className={styles.inventoryWrapper}>
            <div className={styles.inventoryHeader}>
                <h4>Capability Inventory</h4>
                <p>귀사가 필요로 하는 모든 디지털 솔루션을 구축합니다</p>
            </div>

            <div className={styles.productGrid}>
                {PRODUCTS.map((product) => (
                    <div
                        key={product.id}
                        className={`${styles.productCard} ${selectedProduct === product.id ? styles.selected : ''}`}
                        onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                    >
                        <div className={styles.cardGlass}>
                            <span className={`${styles.productIcon} emoji-align`}>{product.icon}</span>
                            <h5 className={styles.productName}>{product.name}</h5>

                            <div className={styles.productItems}>
                                {product.items.map((item, j) => (
                                    <span key={j} className={styles.itemTag}>{item}</span>
                                ))}
                            </div>

                            <div className={styles.specRadar}>
                                <div className={styles.specItem}>
                                    <span>Web</span>
                                    <div className={styles.specBar}><div style={{ width: `${product.specs.web}%` }} /></div>
                                    <span>{product.specs.web}%</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span>AI</span>
                                    <div className={styles.specBar}><div style={{ width: `${product.specs.ai}%` }} /></div>
                                    <span>{product.specs.ai}%</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span>Data</span>
                                    <div className={styles.specBar}><div style={{ width: `${product.specs.data}%` }} /></div>
                                    <span>{product.specs.data}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
/* ========================================
   5. DESIGN: The Focus of Inspiration
   경량화된 마스킹 렌즈 인터랙션
   - CSS Mask 기반 고성능 렌더링
   - 관성(Inertia) 물리 효과
   - 블러/선명 레이어 시스템
======================================== */
const DESIGN_SERVICES = [
    {
        id: 'visual',
        title: '시각 디자인',
        subtitle: 'Visual Design',
        color: '#00f2ff',
        items: [
            '브랜드 아이덴티티 (BI / BX) 구축',
            '전용 타이포그래피 및 그래픽 시스템 설계',
            '브랜드 가이드라인 및 어플리케이션 디자인'
        ]
    },
    {
        id: 'ad',
        title: '광고 디자인',
        subtitle: 'Advertising Design',
        color: '#f59e0b',
        items: [
            '디지털 캠페인 비주얼 크리에이티브',
            '소셜 미디어 및 퍼포먼스 마케팅 콘텐츠',
            '온/오프라인 통합 광고 시안 제작'
        ]
    },
    {
        id: 'video',
        title: '영상 디자인',
        subtitle: 'Video Design',
        color: '#a855f7',
        items: [
            '2D / 3D 모션 그래픽 및 인포그래픽',
            '시네마틱 브랜드 필름 및 제품 홍보 영상',
            '영상 포스트 프로덕션 (편집, 색보정, VFX)'
        ]
    },
    {
        id: 'ai',
        title: 'AI 콘텐츠',
        subtitle: 'AI-Powered Contents',
        color: '#10b981',
        items: [
            '생성형 AI 기반의 커스텀 이미지 제작',
            'AI 비디오 아트 및 실험적 미디어 콘텐츠',
            '최첨단 기술을 접목한 차세대 브랜딩 콘텐츠'
        ]
    }
];

const FocusOfInspiration = () => {
    const containerRef = useRef(null);
    const lensRef = useRef(null);
    const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
    const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);
    const animationRef = useRef(null);

    // 관성 애니메이션
    useEffect(() => {
        const animate = () => {
            setLensPos(prev => {
                const dx = targetPos.x - prev.x;
                const dy = targetPos.y - prev.y;
                // 부드러운 관성 (0.08 = 쫀득한 느낌)
                const easing = 0.08;
                return {
                    x: prev.x + dx * easing,
                    y: prev.y + dy * easing
                };
            });
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [targetPos]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setTargetPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        // 렌즈를 중앙으로 천천히 되돌림
        setTargetPos({ x: 50, y: 50 });
    };

    // 렌즈 마스크 스타일 (원형 그라데이션 마스크)
    const lensMaskStyle = {
        maskImage: `radial-gradient(circle 120px at ${lensPos.x}% ${lensPos.y}%, black 0%, black 60%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 120px at ${lensPos.x}% ${lensPos.y}%, black 0%, black 60%, transparent 100%)`
    };

    return (
        <div className={styles.focusWrapper}>
            {/* 상단: The Clarity Lens */}
            <div className={styles.focusHeader}>
                <h4>The Focus of Inspiration</h4>
                <p>복잡함 속에서 본질을 찾아내는 통찰 — 렌즈를 움직여 선명한 비전을 발견하세요</p>
            </div>

            <div
                className={styles.clarityStage}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Base Layer: 블러 처리된 배경 */}
                <div className={styles.blurLayer}>
                    <div className={styles.blurContent}>
                        <div className={styles.blurGrid}>
                            {DESIGN_SERVICES.map((service, i) => (
                                <div key={service.id} className={styles.blurCard} style={{ '--delay': `${i * 0.1}s` }}>
                                    <span className={styles.blurIcon} style={{ color: service.color }}>◈</span>
                                    <span>{service.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.blurCenterText}>
                            <span className={styles.bigLogo}>DESIGN</span>
                            <span className={styles.subText}>We Transform Vision into Reality</span>
                        </div>
                    </div>
                </div>

                {/* Top Layer: 선명한 렌즈 마스크 */}
                <div className={styles.clearLayer} style={lensMaskStyle}>
                    <div className={styles.clearContent}>
                        <div className={styles.clearGrid}>
                            {DESIGN_SERVICES.map((service, i) => (
                                <div key={service.id} className={styles.clearCard} style={{ '--service-color': service.color }}>
                                    <span className={styles.clearIcon} style={{ color: service.color }}>◆</span>
                                    <span>{service.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.clearCenterText}>
                            <span className={styles.clearLogo}>DESIGN</span>
                            <span className={styles.clearSubText}>We Transform Vision into Reality</span>
                        </div>
                    </div>
                </div>

                {/* 렌즈 경계 시각화 (물결 왜곡 효과) */}
                <div
                    className={`${styles.lensRing} ${isHovering ? styles.active : ''}`}
                    style={{
                        left: `${lensPos.x}%`,
                        top: `${lensPos.y}%`
                    }}
                    ref={lensRef}
                >
                    <div className={styles.lensInner} />
                    <div className={styles.lensOuter} />
                    <div className={styles.lensGlow} />
                </div>

                {/* 안내 텍스트 */}
                {!isHovering && (
                    <div className={styles.lensHint}>
                        <span>◉</span>
                        <p>마우스를 움직여<br />렌즈로 탐색하세요</p>
                    </div>
                )}
            </div>

            {/* 하단: Design Deliverables */}
            <div className={styles.deliverablesSection}>
                <h5 className={styles.deliverablesTitle}>Design Deliverables</h5>

                <div className={styles.deliverablesList}>
                    {DESIGN_SERVICES.map(service => (
                        <div key={service.id} className={styles.deliverableItem} style={{ '--item-color': service.color }}>
                            <div className={styles.deliverableHeader}>
                                <h6>{service.title}</h6>
                                <span className={styles.deliverableSubtitle}>{service.subtitle}</span>
                            </div>
                            <ul className={styles.deliverableItems}>
                                {service.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.focusFooter}>
                <p className={styles.focusInsight}>
                    "우리는 기술(Lens)을 통해 당신의 비즈니스를<br />
                    선명한 가치(Design)로 바꿉니다."
                </p>
            </div>
        </div>
    );
};



export default PremiumInteractives;

