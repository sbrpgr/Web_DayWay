import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './UltimateInteractives.module.css';

const UltimateInteractives = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sections = [
        { id: 'strategy', title: 'Strategy', subtitle: 'Flow Optimization' },
        { id: 'rnd', title: 'R&D', subtitle: 'The R&D Machine' },
        { id: 'education', title: 'Education', subtitle: 'Class Promotion' },
        { id: 'platform', title: 'Platform', subtitle: 'Revenue Engine' },
        { id: 'design', title: 'Design', subtitle: 'Aesthetic Synthesis' }
    ];

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Visualizing Intelligence</h2>
                <p className={styles.subtitle}>인터랙티브 경험을 통해 비즈니스 가치를 체험하세요</p>
            </div>

            <div className={styles.nav}>
                {sections.map((sec, idx) => (
                    <button
                        key={sec.id}
                        className={`${styles.navBtn} ${activeSection === idx ? styles.active : ''}`}
                        onClick={() => setActiveSection(idx)}
                    >
                        <span className={styles.navTitle}>{sec.title}</span>
                        <span className={styles.navSub}>{sec.subtitle}</span>
                    </button>
                ))}
            </div>

            <div className={styles.gameArea}>
                {activeSection === 0 && <FlowOptimization />}
                {activeSection === 1 && <RnDMachine />}
                {activeSection === 2 && <ClassPromotion />}
                {activeSection === 3 && <RevenueEngine />}
                {activeSection === 4 && <AestheticSynthesis />}
            </div>
        </section>
    );
};

/* ========================================
   1. STRATEGY: Flow Optimization
   Mini Metro / Flow Free 스타일 경로 연결
======================================== */
const FLOW_NODES = {
    sources: [
        { id: 's1', x: 10, y: 20, label: '시장 데이터' },
        { id: 's2', x: 10, y: 50, label: '고객 인사이트' },
        { id: 's3', x: 10, y: 80, label: '운영 데이터' }
    ],
    targets: [
        { id: 't1', x: 90, y: 20, label: '매출 성장' },
        { id: 't2', x: 90, y: 50, label: '비용 절감' },
        { id: 't3', x: 90, y: 80, label: '시장 확대' }
    ],
    obstacles: [
        { id: 'o1', x: 35, y: 30, label: '규제' },
        { id: 'o2', x: 50, y: 55, label: '경쟁사' },
        { id: 'o3', x: 65, y: 40, label: '노이즈' }
    ]
};

const FlowOptimization = () => {
    const canvasRef = useRef(null);
    const [connections, setConnections] = useState([]);
    const [drawing, setDrawing] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [efficiency, setEfficiency] = useState(0);
    const [completed, setCompleted] = useState(false);

    const getNodeAt = (x, y, nodes, threshold = 8) => {
        return nodes.find(n => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < threshold;
        });
    };

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const source = getNodeAt(x, y, FLOW_NODES.sources);
        if (source && !connections.find(c => c.from === source.id)) {
            setDrawing({ from: source.id, path: [{ x, y }] });
        }
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });

        if (drawing) {
            setDrawing(prev => ({
                ...prev,
                path: [...prev.path, { x, y }]
            }));
        }
    };

    const handleMouseUp = (e) => {
        if (!drawing) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const target = getNodeAt(x, y, FLOW_NODES.targets);
        if (target) {
            // Check if path crosses obstacles
            let blocked = false;
            if (!blocked) {
                setConnections(prev => [...prev, {
                    from: drawing.from,
                    to: target.id,
                    path: drawing.path
                }]);
            }
        }
        setDrawing(null);
    };

    useEffect(() => {
        if (connections.length >= 3) {
            setCompleted(true);
            // Calculate efficiency
            const totalLength = connections.reduce((sum, c) => {
                let len = 0;
                for (let i = 1; i < c.path.length; i++) {
                    const dx = c.path[i].x - c.path[i - 1].x;
                    const dy = c.path[i].y - c.path[i - 1].y;
                    len += Math.sqrt(dx * dx + dy * dy);
                }
                return sum + len;
            }, 0);
            const minPath = 80 * 3; // Minimum possible
            const eff = Math.max(0, Math.min(100, Math.round((minPath / totalLength) * 100)));
            setEfficiency(eff);
        }
    }, [connections]);

    const reset = () => {
        setConnections([]);
        setDrawing(null);
        setCompleted(false);
        setEfficiency(0);
    };

    return (
        <div className={styles.flowWrapper}>
            <div className={styles.flowStats}>
                <div className={styles.stat}>
                    <span>연결된 경로</span>
                    <strong>{connections.length} / 3</strong>
                </div>
                <div className={styles.stat}>
                    <span>전략적 효율성</span>
                    <strong className={styles.efficiency}>{efficiency}%</strong>
                </div>
            </div>

            <div
                ref={canvasRef}
                className={styles.flowCanvas}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setDrawing(null)}
            >
                <svg className={styles.flowSvg}>
                    {/* Connections */}
                    {connections.map((conn, i) => (
                        <path
                            key={i}
                            d={`M ${conn.path.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                            className={styles.flowPath}
                        />
                    ))}

                    {/* Drawing path */}
                    {drawing && (
                        <path
                            d={`M ${drawing.path.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                            className={styles.flowDrawing}
                        />
                    )}
                </svg>

                {/* Sources */}
                {FLOW_NODES.sources.map(node => (
                    <div
                        key={node.id}
                        className={`${styles.flowNode} ${styles.source} ${connections.find(c => c.from === node.id) ? styles.connected : ''}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        <div className={styles.nodeGlow} />
                        <span>{node.label}</span>
                    </div>
                ))}

                {/* Targets */}
                {FLOW_NODES.targets.map(node => (
                    <div
                        key={node.id}
                        className={`${styles.flowNode} ${styles.target} ${connections.find(c => c.to === node.id) ? styles.connected : ''}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        <div className={styles.nodeGlow} />
                        <span>{node.label}</span>
                    </div>
                ))}

                {/* Obstacles */}
                {FLOW_NODES.obstacles.map(node => (
                    <div
                        key={node.id}
                        className={`${styles.flowNode} ${styles.obstacle}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        <span>⚠️ {node.label}</span>
                    </div>
                ))}
            </div>

            {completed && (
                <div className={styles.resultBanner}>
                    <h4>🎯 전략 분석 완료</h4>
                    <p>AI 효율성 분석: {efficiency}% | 우리는 복잡한 변수 속에서도 데이터라는 근거로 가장 확실한 승리의 길을 찾아냅니다.</p>
                </div>
            )}

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>
            <div className={styles.hint}>소스 노드에서 타겟 노드로 드래그하여 연결하세요. 장애물을 피하세요!</div>
        </div>
    );
};

/* ========================================
   2. R&D: The R&D Machine
   루브 골드버그 연쇄 반응 장치
======================================== */
const MACHINE_MODULES = [
    { id: 'm1', label: '문제 인식', icon: '🔍', slot: 0 },
    { id: 'm2', label: '기획', icon: '📋', slot: 1 },
    { id: 'm3', label: '설계', icon: '✏️', slot: 2 },
    { id: 'm4', label: '연구', icon: '🔬', slot: 3 },
    { id: 'm5', label: '개발', icon: '⚙️', slot: 4 }
];

const RnDMachine = () => {
    const [placed, setPlaced] = useState([null, null, null, null, null]);
    const [available, setAvailable] = useState([...MACHINE_MODULES].sort(() => Math.random() - 0.5));
    const [running, setRunning] = useState(false);
    const [energyPos, setEnergyPos] = useState(-1);
    const [completed, setCompleted] = useState(false);

    const placeModule = (moduleId, slotIndex) => {
        const module = available.find(m => m.id === moduleId);
        if (!module || placed[slotIndex]) return;

        const newPlaced = [...placed];
        newPlaced[slotIndex] = module;
        setPlaced(newPlaced);
        setAvailable(prev => prev.filter(m => m.id !== moduleId));
    };

    const runMachine = () => {
        // Check if all placed correctly
        const correct = placed.every((m, i) => m && m.slot === i);
        if (!correct) {
            alert('모듈이 올바른 순서로 배치되지 않았습니다!');
            return;
        }

        setRunning(true);
        setEnergyPos(0);

        // Animate energy flow
        let pos = 0;
        const interval = setInterval(() => {
            pos++;
            setEnergyPos(pos);
            if (pos >= 5) {
                clearInterval(interval);
                setTimeout(() => {
                    setCompleted(true);
                    gsap.fromTo('.rnd-bulb', { scale: 1 }, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 3 });
                }, 300);
            }
        }, 600);
    };

    const reset = () => {
        setPlaced([null, null, null, null, null]);
        setAvailable([...MACHINE_MODULES].sort(() => Math.random() - 0.5));
        setRunning(false);
        setEnergyPos(-1);
        setCompleted(false);
    };

    return (
        <div className={styles.machineWrapper}>
            <div className={styles.machineAvailable}>
                <h4>사용 가능한 모듈</h4>
                <div className={styles.moduleList}>
                    {available.map(m => (
                        <div
                            key={m.id}
                            className={styles.machineModule}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('moduleId', m.id)}
                        >
                            <span className={styles.moduleIcon}>{m.icon}</span>
                            <span>{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.machineTrack}>
                <div className={styles.trackStart}>
                    <button
                        className={styles.startBtn}
                        onClick={runMachine}
                        disabled={running || placed.some(p => !p)}
                    >
                        ▶ START
                    </button>
                </div>

                <div className={styles.trackSlots}>
                    {placed.map((module, i) => (
                        <div
                            key={i}
                            className={`${styles.trackSlot} ${energyPos >= i ? styles.energized : ''}`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                const moduleId = e.dataTransfer.getData('moduleId');
                                placeModule(moduleId, i);
                            }}
                        >
                            {module ? (
                                <div className={styles.placedModule}>
                                    <span className={styles.moduleIcon}>{module.icon}</span>
                                    <span>{module.label}</span>
                                </div>
                            ) : (
                                <span className={styles.slotPlaceholder}>슬롯 {i + 1}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.trackEnd}>
                    <div className={`${styles.bulb} rnd-bulb ${completed ? styles.lit : ''}`}>
                        💡
                        {completed && <span className={styles.standardBadge}>ISO</span>}
                    </div>
                </div>

                {running && energyPos >= 0 && (
                    <div
                        className={styles.energyOrb}
                        style={{ left: `${10 + energyPos * 18}%` }}
                    />
                )}
            </div>

            {completed && (
                <div className={styles.resultBanner}>
                    <h4>🏆 산업 표준 달성!</h4>
                    <p>우리의 R&D는 정교하게 설계된 공정의 결과입니다. 우리는 기술의 표준을 만듭니다.</p>
                </div>
            )}

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>
            <div className={styles.hint}>모듈을 올바른 순서로 슬롯에 드래그하고 START를 누르세요</div>
        </div>
    );
};

/* ========================================
   3. EDUCATION: Class Promotion
   RPG 스킬트리 전직 시스템
======================================== */
const SKILL_PATHS = {
    ai: {
        name: 'AI 전문가',
        skills: ['Python 기초', 'PyTorch', 'RAG 아키텍처', 'LLM 튜닝'],
        finalClass: '🤖 Master AI Architect'
    },
    fullstack: {
        name: '풀스택 리더',
        skills: ['Next.js', 'FastAPI', 'Microservices', 'DevOps'],
        finalClass: '🚀 Full-Stack Commander'
    },
    data: {
        name: '데이터 사이언티스트',
        skills: ['SQL 마스터', 'Pandas', '시각화', 'ML 모델링'],
        finalClass: '📊 Data Sage'
    }
};

const ClassPromotion = () => {
    const [selectedPath, setSelectedPath] = useState(null);
    const [acquiredSkills, setAcquiredSkills] = useState([]);
    const [level, setLevel] = useState(1);
    const [promoted, setPromoted] = useState(false);

    const selectPath = (pathId) => {
        setSelectedPath(pathId);
        setAcquiredSkills([]);
        setLevel(1);
        setPromoted(false);
    };

    const acquireSkill = (skill) => {
        if (acquiredSkills.includes(skill)) return;
        setAcquiredSkills(prev => [...prev, skill]);
        setLevel(l => l + 25);

        const path = SKILL_PATHS[selectedPath];
        if (acquiredSkills.length + 1 >= path.skills.length) {
            setTimeout(() => {
                setPromoted(true);
                gsap.fromTo('.promo-card',
                    { rotateY: 180, opacity: 0 },
                    { rotateY: 0, opacity: 1, duration: 0.8, ease: 'back.out' }
                );
            }, 300);
        }
    };

    const reset = () => {
        setSelectedPath(null);
        setAcquiredSkills([]);
        setLevel(1);
        setPromoted(false);
    };

    return (
        <div className={styles.classWrapper}>
            {!selectedPath ? (
                <div className={styles.pathSelection}>
                    <h4>목표 클래스를 선택하세요</h4>
                    <div className={styles.pathCards}>
                        {Object.entries(SKILL_PATHS).map(([id, path]) => (
                            <div
                                key={id}
                                className={styles.pathCard}
                                onClick={() => selectPath(id)}
                            >
                                <span className={styles.pathIcon}>{path.finalClass.slice(0, 2)}</span>
                                <span className={styles.pathName}>{path.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.skillTree}>
                    <div className={styles.levelBar}>
                        <div className={styles.levelFill} style={{ width: `${level}%` }} />
                        <span>Level {Math.floor(level / 25) + 1} / 5</span>
                    </div>

                    <div className={styles.skillNodes}>
                        {SKILL_PATHS[selectedPath].skills.map((skill, i) => (
                            <div
                                key={i}
                                className={`${styles.skillNode} ${acquiredSkills.includes(skill) ? styles.acquired : ''} ${i <= acquiredSkills.length ? styles.available : ''}`}
                                onClick={() => i <= acquiredSkills.length && acquireSkill(skill)}
                            >
                                <div className={styles.skillIcon}>{acquiredSkills.includes(skill) ? '✓' : (i + 1)}</div>
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>

                    {promoted && (
                        <div className={`${styles.promotionCard} promo-card`}>
                            <div className={styles.cardShine} />
                            <div className={styles.cardContent}>
                                <span className={styles.cardLevel}>Lv.99</span>
                                <span className={styles.cardClass}>{SKILL_PATHS[selectedPath].finalClass}</span>
                                <span className={styles.cardSubtitle}>Master Certificate</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {promoted && (
                <div className={styles.resultBanner}>
                    <h4>🎓 전직 완료!</h4>
                    <p>현장 중심의 DX 교육을 통해 당신의 조직원을 최고의 클래스로 전직시킵니다.</p>
                </div>
            )}

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>다시 시작</button>
            </div>
        </div>
    );
};

/* ========================================
   4. PLATFORM: Revenue Engine
   ROI 인벤토리 빌더
======================================== */
const TECH_MODULES = [
    { id: 'web', name: 'Web Dev', icon: '🌐', stats: { reach: 40, cost: 10, predict: 5 } },
    { id: 'ai', name: 'AI Agent', icon: '🤖', stats: { reach: 20, cost: 45, predict: 25 } },
    { id: 'data', name: 'Data Analysis', icon: '📊', stats: { reach: 15, cost: 20, predict: 50 } }
];

const RevenueEngine = () => {
    const [slots, setSlots] = useState([null, null, null]);
    const [stats, setStats] = useState({ reach: 0, cost: 0, predict: 0 });
    const [launched, setLaunched] = useState(false);

    const toggleSlot = (slotIndex, moduleId) => {
        const newSlots = [...slots];
        if (newSlots[slotIndex]?.id === moduleId) {
            newSlots[slotIndex] = null;
        } else {
            const module = TECH_MODULES.find(m => m.id === moduleId);
            newSlots[slotIndex] = module;
        }
        setSlots(newSlots);

        // Calculate stats
        const newStats = { reach: 0, cost: 0, predict: 0 };
        newSlots.filter(Boolean).forEach(m => {
            newStats.reach += m.stats.reach;
            newStats.cost += m.stats.cost;
            newStats.predict += m.stats.predict;
        });
        setStats(newStats);
    };

    const launch = () => {
        if (!slots.some(Boolean)) return;
        setLaunched(true);
        gsap.fromTo('.roi-bar', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out', stagger: 0.2 });
    };

    const reset = () => {
        setSlots([null, null, null]);
        setStats({ reach: 0, cost: 0, predict: 0 });
        setLaunched(false);
    };

    return (
        <div className={styles.revenueWrapper}>
            <div className={styles.engineCore}>
                <div className={styles.coreVisual}>
                    <div className={`${styles.coreOrb} ${slots.some(Boolean) ? styles.active : ''}`}>
                        <span>수익 엔진</span>
                    </div>
                </div>

                <div className={styles.slotRing}>
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`${styles.engineSlot} ${slots[i] ? styles.filled : ''}`}>
                            {slots[i] ? (
                                <div className={styles.slotContent}>
                                    <span>{slots[i].icon}</span>
                                    <span>{slots[i].name}</span>
                                </div>
                            ) : (
                                <span className={styles.slotEmpty}>+</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.modulePalette}>
                <h4>기술 모듈</h4>
                <div className={styles.moduleGrid}>
                    {TECH_MODULES.map(m => (
                        <div
                            key={m.id}
                            className={`${styles.techModule} ${slots.find(s => s?.id === m.id) ? styles.equipped : ''}`}
                            onClick={() => {
                                const emptySlot = slots.findIndex(s => s === null);
                                const existingSlot = slots.findIndex(s => s?.id === m.id);
                                if (existingSlot >= 0) {
                                    toggleSlot(existingSlot, m.id);
                                } else if (emptySlot >= 0) {
                                    toggleSlot(emptySlot, m.id);
                                }
                            }}
                        >
                            <span className={styles.techIcon}>{m.icon}</span>
                            <span>{m.name}</span>
                        </div>
                    ))}
                </div>

                <button
                    className={styles.launchBtn}
                    onClick={launch}
                    disabled={!slots.some(Boolean) || launched}
                >
                    🚀 Launch Revenue Engine
                </button>
            </div>

            {launched && (
                <div className={styles.roiDashboard}>
                    <h4>📈 예상 ROI 분석</h4>
                    <div className={styles.roiMetrics}>
                        <div className={styles.roiItem}>
                            <span>사용자 접점</span>
                            <div className={styles.roiBarWrap}>
                                <div className={`${styles.roiBar} roi-bar`} style={{ '--val': stats.reach }} />
                            </div>
                            <span>+{stats.reach}%</span>
                        </div>
                        <div className={styles.roiItem}>
                            <span>운영 비용 절감</span>
                            <div className={styles.roiBarWrap}>
                                <div className={`${styles.roiBar} roi-bar`} style={{ '--val': stats.cost }} />
                            </div>
                            <span>+{stats.cost}%</span>
                        </div>
                        <div className={styles.roiItem}>
                            <span>미래 예측 정확도</span>
                            <div className={styles.roiBarWrap}>
                                <div className={`${styles.roiBar} roi-bar`} style={{ '--val': stats.predict }} />
                            </div>
                            <span>+{stats.predict}%</span>
                        </div>
                    </div>
                </div>
            )}

            {launched && (
                <div className={styles.resultBanner}>
                    <p>당사의 Web, AI, Data 역량을 조합하여 귀사의 비즈니스 가치를 극대화합니다.</p>
                    <button className={styles.ctaBtn}>💼 솔루션 상담 신청</button>
                </div>
            )}

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

/* ========================================
   5. DESIGN: Aesthetic Synthesis
   탱그램 / 폴리아트 퍼즐
======================================== */
const PUZZLE_PIECES = [
    { id: 0, shape: 'triangle', color: '#00f2ff', targetX: 30, targetY: 30, rotation: 0 },
    { id: 1, shape: 'triangle', color: '#a855f7', targetX: 50, targetY: 25, rotation: 90 },
    { id: 2, shape: 'square', color: '#f43f5e', targetX: 45, targetY: 50, rotation: 0 },
    { id: 3, shape: 'parallelogram', color: '#fbbf24', targetX: 60, targetY: 45, rotation: 0 },
    { id: 4, shape: 'triangle', color: '#22c55e', targetX: 35, targetY: 55, rotation: 180 },
    { id: 5, shape: 'triangle', color: '#0ea5e9', targetX: 55, targetY: 65, rotation: 270 },
    { id: 6, shape: 'triangle', color: '#ec4899', targetX: 70, targetY: 55, rotation: 45 }
];

const AestheticSynthesis = () => {
    const [pieces, setPieces] = useState(() =>
        PUZZLE_PIECES.map(p => ({
            ...p,
            x: 10 + Math.random() * 25,
            y: 70 + Math.random() * 20,
            currentRotation: Math.floor(Math.random() * 4) * 90,
            placed: false
        }))
    );
    const [dragging, setDragging] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const areaRef = useRef(null);

    const handleMouseDown = (id) => (e) => {
        e.preventDefault();
        if (pieces.find(p => p.id === id)?.placed) return;
        setDragging(id);
    };

    const handleMouseMove = (e) => {
        if (dragging === null) return;
        const rect = areaRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPieces(prev => prev.map(p =>
            p.id === dragging ? { ...p, x, y } : p
        ));
    };

    const handleMouseUp = () => {
        if (dragging === null) return;

        setPieces(prev => {
            const updated = prev.map(p => {
                if (p.id !== dragging) return p;

                const dx = p.x - p.targetX;
                const dy = p.y - p.targetY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 10) {
                    gsap.to(`#piece-${p.id}`, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 });
                    return { ...p, x: p.targetX, y: p.targetY, placed: true };
                }
                return p;
            });

            if (updated.every(p => p.placed) && !completed) {
                setCompleted(true);
                setTimeout(() => setShowResult(true), 500);
            }

            return updated;
        });

        setDragging(null);
    };

    const rotatePiece = (id) => {
        if (pieces.find(p => p.id === id)?.placed) return;
        setPieces(prev => prev.map(p =>
            p.id === id ? { ...p, currentRotation: (p.currentRotation + 90) % 360 } : p
        ));
    };

    const reset = () => {
        setPieces(PUZZLE_PIECES.map(p => ({
            ...p,
            x: 10 + Math.random() * 25,
            y: 70 + Math.random() * 20,
            currentRotation: Math.floor(Math.random() * 4) * 90,
            placed: false
        })));
        setCompleted(false);
        setShowResult(false);
    };

    return (
        <div className={styles.puzzleWrapper}>
            <div
                ref={areaRef}
                className={styles.puzzleArea}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setDragging(null)}
            >
                {/* Target silhouette */}
                <div className={styles.puzzleGuide}>
                    <svg viewBox="0 0 100 100" className={styles.guideSvg}>
                        <polygon points="30,20 60,20 45,45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2" />
                        <rect x="35" y="45" width="20" height="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2" />
                        <polygon points="55,65 75,65 65,85" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2" />
                    </svg>
                </div>

                {/* Puzzle pieces */}
                {pieces.map(p => (
                    <div
                        key={p.id}
                        id={`piece-${p.id}`}
                        className={`${styles.puzzlePiece} ${styles[p.shape]} ${p.placed ? styles.placed : ''}`}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            backgroundColor: p.color,
                            transform: `translate(-50%, -50%) rotate(${p.currentRotation}deg)`,
                            cursor: p.placed ? 'default' : 'grab'
                        }}
                        onMouseDown={handleMouseDown(p.id)}
                        onDoubleClick={() => rotatePiece(p.id)}
                    />
                ))}

                {/* Result overlay */}
                {showResult && (
                    <div className={styles.resultOverlay}>
                        <div className={styles.resultArt}>
                            <div className={styles.artContent}>
                                <span className={styles.artIcon}>🎨</span>
                                <h4>AI 생성 아트워크</h4>
                                <p>파편화된 아이디어가 기술을 만나 압도적인 시각적 가치로 승화됩니다</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.puzzleInfo}>
                <span>배치됨: {pieces.filter(p => p.placed).length} / {pieces.length}</span>
                <span className={styles.puzzleTip}>더블클릭으로 회전</span>
            </div>

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>
            <div className={styles.hint}>조각을 가이드라인에 맞춰 드래그하세요</div>
        </div>
    );
};

export default UltimateInteractives;
