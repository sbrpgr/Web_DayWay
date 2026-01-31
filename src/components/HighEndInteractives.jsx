import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './HighEndInteractives.module.css';

const HighEndInteractives = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sections = [
        { id: 'strategy', title: 'Strategy', subtitle: 'Tactical Nexus' },
        { id: 'rnd', title: 'R&D', subtitle: 'Blueprint of Standard' },
        { id: 'education', title: 'Education', subtitle: 'Growth Roadmap' },
        { id: 'platform', title: 'Platform', subtitle: 'Solution Engine' },
        { id: 'design', title: 'Design', subtitle: 'Creative Studio' }
    ];

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Experience Our Intelligence</h2>
                <p className={styles.subtitle}>각 섹션을 직접 체험하며 비즈니스 가치를 발견하세요</p>
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
                {activeSection === 0 && <TacticalNexus />}
                {activeSection === 1 && <BlueprintOfStandard />}
                {activeSection === 2 && <GrowthRoadmap />}
                {activeSection === 3 && <SolutionEngine />}
                {activeSection === 4 && <CreativeStudio />}
            </div>
        </section>
    );
};

/* ========================================
   1. STRATEGY: Tactical Nexus
   헥사곤 노드 커넥션 퍼즐
======================================== */
const HEX_GRID = [
    { id: 0, row: 0, col: 1, type: 'start', rotation: 0, connections: [1, 3] },
    { id: 1, row: 0, col: 2, type: 'path', rotation: 0, connections: [2, 4] },
    { id: 2, row: 0, col: 3, type: 'noise', rotation: 0, connections: [] },
    { id: 3, row: 1, col: 0, type: 'path', rotation: 0, connections: [0, 5] },
    { id: 4, row: 1, col: 1, type: 'path', rotation: 60, connections: [1, 6] },
    { id: 5, row: 1, col: 2, type: 'path', rotation: 0, connections: [3, 7] },
    { id: 6, row: 1, col: 3, type: 'path', rotation: 120, connections: [4, 8] },
    { id: 7, row: 2, col: 1, type: 'path', rotation: 0, connections: [5, 9] },
    { id: 8, row: 2, col: 2, type: 'path', rotation: 60, connections: [6, 10] },
    { id: 9, row: 2, col: 3, type: 'path', rotation: 0, connections: [7, 10] },
    { id: 10, row: 3, col: 2, type: 'end', rotation: 0, connections: [8, 9] }
];

const TacticalNexus = () => {
    const [hexes, setHexes] = useState(() =>
        HEX_GRID.map(h => ({ ...h, rotation: Math.floor(Math.random() * 6) * 60 }))
    );
    const [moves, setMoves] = useState(0);
    const [efficiency, setEfficiency] = useState(100);
    const [aiProbability, setAiProbability] = useState(12);
    const [connected, setConnected] = useState(false);
    const [flowPath, setFlowPath] = useState([]);

    const rotateHex = (id) => {
        if (connected) return;

        setHexes(prev => prev.map(h =>
            h.id === id && h.type !== 'noise' ? { ...h, rotation: (h.rotation + 60) % 360 } : h
        ));
        setMoves(m => m + 1);
        setEfficiency(e => Math.max(0, e - 3));

        // Simulate AI probability calculation
        setAiProbability(prev => Math.min(99, prev + Math.floor(Math.random() * 15)));
    };

    useEffect(() => {
        // Check connection (simplified)
        if (aiProbability > 85 && moves > 3) {
            setConnected(true);
            setFlowPath([0, 3, 5, 7, 9, 10]);
        }
    }, [aiProbability, moves]);

    const reset = () => {
        setHexes(HEX_GRID.map(h => ({ ...h, rotation: Math.floor(Math.random() * 6) * 60 })));
        setMoves(0);
        setEfficiency(100);
        setAiProbability(12);
        setConnected(false);
        setFlowPath([]);
    };

    return (
        <div className={styles.tacticalWrapper}>
            <div className={styles.tacticalSidebar}>
                <div className={styles.sidebarSection}>
                    <h3 className={styles.sectionLabel}>Strategy</h3>
                    <div className={styles.statItem}>
                        <span>Efficiency</span>
                        <strong className={styles.statValue}>{efficiency}%</strong>
                    </div>
                    <div className={styles.statItem}>
                        <span>Moves</span>
                        <strong>{moves}</strong>
                    </div>
                    <div className={styles.statItem}>
                        <span>AI Analysis</span>
                        <strong className={styles.aiProb}>{aiProbability}%</strong>
                    </div>
                </div>
            </div>

            <div className={styles.hexGrid}>
                <div className={styles.hexContainer}>
                    {hexes.map(hex => (
                        <div
                            key={hex.id}
                            className={`${styles.hexTile} ${styles[hex.type]} ${flowPath.includes(hex.id) ? styles.flowing : ''}`}
                            style={{
                                '--row': hex.row,
                                '--col': hex.col,
                                transform: `rotate(${hex.rotation}deg)`
                            }}
                            onClick={() => rotateHex(hex.id)}
                        >
                            <div className={styles.hexInner}>
                                {hex.type === 'start' && <span className={styles.hexLabel}>START</span>}
                                {hex.type === 'end' && <span className={styles.hexLabel}>GOAL</span>}
                                {hex.type === 'noise' && <span className={styles.hexLabel}>⚠️</span>}
                                {hex.type === 'path' && <div className={styles.hexPath} />}
                            </div>
                        </div>
                    ))}

                    {connected && (
                        <div className={styles.flowAnimation}>
                            {flowPath.map((_, i) => (
                                <div key={i} className={styles.flowParticle} style={{ '--delay': i * 0.2 }} />
                            ))}
                        </div>
                    )}
                </div>

                {connected && (
                    <div className={styles.victoryBanner}>
                        <h3>🎯 Market Victory Achieved!</h3>
                        <p>복잡한 환경 속에서 가장 효율적인 승리의 길을 찾아냈습니다</p>
                    </div>
                )}
            </div>

            <div className={styles.tacticalActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset Puzzle</button>
            </div>

            <div className={styles.hint}>각 헥사곤 타일을 클릭하여 60° 회전시키고 START에서 GOAL까지 경로를 연결하세요</div>
        </div>
    );
};

/* ========================================
   2. R&D: Blueprint of Standard
   5단계 프로세스 빌더
======================================== */
const BlueprintOfStandard = () => {
    const [step, setStep] = useState(0);
    const [errorNodes, setErrorNodes] = useState([1, 3, 5]);
    const [planNodes, setPlanNodes] = useState([]);
    const [puzzlePieces, setPuzzlePieces] = useState([false, false, false]);
    const [chargeLevel, setChargeLevel] = useState(0);
    const [completed, setCompleted] = useState(false);
    const canvasRef = useRef(null);

    const steps = [
        { name: 'Problem Recognition', desc: '결함 노드를 스캔하세요' },
        { name: 'Planning', desc: '노드를 가이드라인에 배치하세요' },
        { name: 'Design', desc: '알고리즘 모듈을 조립하세요' },
        { name: 'Research', desc: '에너지를 충전하세요' },
        { name: 'Development', desc: '표준화를 완료하세요' }
    ];

    const handleStep0Click = (nodeId) => {
        setErrorNodes(prev => prev.filter(n => n !== nodeId));
        if (errorNodes.length <= 1) {
            gsap.to(canvasRef.current, { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1 });
            setTimeout(() => setStep(1), 500);
        }
    };

    const handleStep1Drop = (idx) => {
        setPlanNodes(prev => [...prev, idx]);
        if (planNodes.length >= 2) {
            setTimeout(() => setStep(2), 500);
        }
    };

    const handleStep2Piece = (idx) => {
        const newPieces = [...puzzlePieces];
        newPieces[idx] = true;
        setPuzzlePieces(newPieces);
        if (newPieces.every(p => p)) {
            setTimeout(() => setStep(3), 500);
        }
    };

    const handleStep3Charge = () => {
        setChargeLevel(prev => {
            const next = Math.min(prev + 5, 100);
            if (next >= 100) {
                setTimeout(() => setStep(4), 300);
            }
            return next;
        });
    };

    const handleStep4Complete = () => {
        setCompleted(true);
        gsap.fromTo(canvasRef.current, { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 });
    };

    const reset = () => {
        setStep(0);
        setErrorNodes([1, 3, 5]);
        setPlanNodes([]);
        setPuzzlePieces([false, false, false]);
        setChargeLevel(0);
        setCompleted(false);
    };

    return (
        <div className={styles.blueprintWrapper}>
            <div className={styles.progressBar}>
                {steps.map((s, i) => (
                    <div key={i} className={`${styles.progressStep} ${i <= step ? styles.active : ''} ${i === step ? styles.current : ''}`}>
                        <span className={styles.stepNum}>{i + 1}</span>
                        <span className={styles.stepName}>{s.name}</span>
                    </div>
                ))}
            </div>

            <div className={styles.blueprintCanvas} ref={canvasRef}>
                <div className={styles.blueprintOrb}>
                    <div className={`${styles.orbCore} ${step >= 1 ? styles.stable : ''} ${completed ? styles.complete : ''}`}>
                        {step === 0 && (
                            <div className={styles.noiseOverlay}>
                                {errorNodes.map(n => (
                                    <div
                                        key={n}
                                        className={styles.errorNode}
                                        onClick={() => handleStep0Click(n)}
                                        style={{ '--pos': n }}
                                    >
                                        ⚠️
                                    </div>
                                ))}
                            </div>
                        )}

                        {step === 1 && (
                            <div className={styles.planningPhase}>
                                {[0, 1, 2].map(i => (
                                    <div
                                        key={i}
                                        className={`${styles.planSlot} ${planNodes.includes(i) ? styles.placed : ''}`}
                                        onClick={() => handleStep1Drop(i)}
                                    >
                                        {planNodes.includes(i) ? '✓' : '+'}
                                    </div>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.designPhase}>
                                {puzzlePieces.map((placed, i) => (
                                    <div
                                        key={i}
                                        className={`${styles.puzzleSlot} ${placed ? styles.fitted : ''}`}
                                        onClick={() => handleStep2Piece(i)}
                                    >
                                        {placed ? '◆' : '◇'}
                                    </div>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div className={styles.researchPhase}>
                                <div className={styles.chargeRing} style={{ '--charge': chargeLevel }}>
                                    <span>{chargeLevel}%</span>
                                </div>
                                <button className={styles.chargeBtn} onClick={handleStep3Charge}>
                                    ⚡ Charge Energy
                                </button>
                            </div>
                        )}

                        {step === 4 && !completed && (
                            <div className={styles.finalPhase}>
                                <button className={styles.standardizeBtn} onClick={handleStep4Complete}>
                                    [ STANDARDIZE ]
                                </button>
                            </div>
                        )}

                        {completed && (
                            <div className={styles.completedPhase}>
                                <div className={styles.standardMark}>✓</div>
                                <p>Industry Standard Achieved</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.stepDescription}>
                <h4>{steps[step].name}</h4>
                <p>{steps[step].desc}</p>
            </div>

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset Process</button>
            </div>

            {completed && (
                <div className={styles.successMessage}>
                    R&D는 우연이 아닙니다. 문제를 정의하고 정교한 설계를 거쳐 기술의 표준을 창조합니다.
                </div>
            )}
        </div>
    );
};

/* ========================================
   3. EDUCATION: Growth Roadmap Navigator
   의사결정 나무 네비게이터
======================================== */
const TREE_DATA = {
    root: {
        question: '귀하의 조직이 직면한 가장 큰 갈증은 무엇입니까?',
        options: [
            { text: '비즈니스 인사이트 부족', next: 'insight' },
            { text: '실무 AI 역량 미비', next: 'ai' },
            { text: '데이터 기반 의사결정 체계 부재', next: 'data' }
        ]
    },
    insight: {
        question: '원하시는 인사이트의 깊이는?',
        options: [
            { text: '시장 트렌드 파악', next: 'result_market' },
            { text: '경쟁사 분석', next: 'result_compete' }
        ]
    },
    ai: {
        question: '대상자의 현재 디지털 숙련도는?',
        options: [
            { text: '기초 입문', next: 'result_basic' },
            { text: '실무 활용', next: 'result_practical' },
            { text: '전문가 심화', next: 'result_expert' }
        ]
    },
    data: {
        question: '어느 산업 분야에 적용할 계획입니까?',
        options: [
            { text: '공공/행정', next: 'result_public' },
            { text: '제조/물류', next: 'result_mfg' },
            { text: '금융/서비스', next: 'result_fin' }
        ]
    },
    result_market: { result: '📊 시장 인텔리전스 마스터 과정', level: 'Data Leader' },
    result_compete: { result: '🎯 경쟁 전략 분석 과정', level: 'Strategy Expert' },
    result_basic: { result: '🎓 AI 리터러시 기초 과정', level: 'AI Beginner' },
    result_practical: { result: '🔧 AI 실무 적용 과정', level: 'AI Practitioner' },
    result_expert: { result: '🔬 AI 아키텍트 심화 과정', level: 'AI Master' },
    result_public: { result: '🏛️ 공공 데이터 분석 과정', level: 'Public Analyst' },
    result_mfg: { result: '🏭 스마트 제조 분석 과정', level: 'Industry 4.0 Expert' },
    result_fin: { result: '💰 금융 데이터 사이언스 과정', level: 'FinTech Specialist' }
};

const GrowthRoadmap = () => {
    const [currentNode, setCurrentNode] = useState('root');
    const [path, setPath] = useState(['root']);
    const [branches, setBranches] = useState([]);

    const node = TREE_DATA[currentNode];
    const isResult = !!node?.result;

    const selectOption = (next) => {
        setPath(p => [...p, next]);
        setBranches(b => [...b, { from: currentNode, to: next }]);
        setCurrentNode(next);
    };

    const reset = () => {
        setCurrentNode('root');
        setPath(['root']);
        setBranches([]);
    };

    const progress = Math.min(100, (path.length / 4) * 100);

    return (
        <div className={styles.roadmapWrapper}>
            <div className={styles.progressIndicator}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                <span>{Math.round(progress)}% 분석 완료</span>
            </div>

            <div className={styles.treeVisualization}>
                <div className={styles.treeBranches}>
                    {branches.map((b, i) => (
                        <div key={i} className={styles.branch} style={{ '--delay': i * 0.3 }}>
                            <div className={styles.branchLine} />
                        </div>
                    ))}
                </div>

                <div className={styles.treeNode}>
                    {isResult ? (
                        <div className={styles.resultNode}>
                            <div className={styles.resultIcon}>{node.result.slice(0, 2)}</div>
                            <h3 className={styles.resultTitle}>{node.result.slice(2)}</h3>
                            <div className={styles.levelBadge}>
                                <span>🎖️ {node.level}</span>
                            </div>
                            <p className={styles.resultMessage}>
                                이 로드맵을 통해 귀사는 [초급]에서 [{node.level}]로 진화합니다.
                            </p>
                        </div>
                    ) : (
                        <div className={styles.questionNode}>
                            <h3 className={styles.question}>{node.question}</h3>
                            <div className={styles.options}>
                                {node.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={styles.optionBtn}
                                        onClick={() => selectOption(opt.next)}
                                    >
                                        <span className={styles.optionArrow}>→</span>
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.navButtons}>
                <button className={styles.resetBtn} onClick={reset}>처음부터 다시</button>
            </div>

            {isResult && (
                <div className={styles.successMessage}>
                    귀사의 고민에서 시작하여 전문성 강화라는 확실한 결과물로 안내합니다.
                </div>
            )}
        </div>
    );
};

/* ========================================
   4. PLATFORM: Solution Engine
   모듈러 솔루션 조립기
======================================== */
const SolutionEngine = () => {
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [modules, setModules] = useState({ web: false, ai: false, data: false });
    const [launched, setLaunched] = useState(false);

    const goals = [
        { id: 'revenue', label: '수익 극대화', color: '#fbbf24' },
        { id: 'automation', label: '운영 자동화', color: '#00f2ff' },
        { id: 'global', label: '글로벌 확장', color: '#a855f7' }
    ];

    const techModules = [
        { id: 'web', label: 'Web Dev', icon: '🌐', effect: '인터페이스 구축' },
        { id: 'ai', label: 'AI Agent', icon: '🤖', effect: '지능 엔진 탑재' },
        { id: 'data', label: 'Data Analysis', icon: '📊', effect: '분석 대시보드' }
    ];

    const toggleModule = (id) => {
        if (launched) return;
        setModules(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const launchBusiness = () => {
        if (!selectedGoal || !Object.values(modules).some(v => v)) return;
        setLaunched(true);
    };

    const reset = () => {
        setSelectedGoal(null);
        setModules({ web: false, ai: false, data: false });
        setLaunched(false);
    };

    const activeModules = Object.entries(modules).filter(([, v]) => v).length;

    return (
        <div className={styles.engineWrapper}>
            <div className={styles.enginePalette}>
                <h4>Business Goals</h4>
                <div className={styles.goalCards}>
                    {goals.map(g => (
                        <div
                            key={g.id}
                            className={`${styles.goalCard} ${selectedGoal === g.id ? styles.selected : ''}`}
                            style={{ '--accent': g.color }}
                            onClick={() => !launched && setSelectedGoal(g.id)}
                        >
                            {g.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.engineCore}>
                <div className={`${styles.coreFrame} ${selectedGoal ? styles.activated : ''} ${launched ? styles.launched : ''}`}>
                    <div className={styles.coreInner}>
                        {!selectedGoal && <span className={styles.corePlaceholder}>목표를 선택하세요</span>}
                        {selectedGoal && !launched && (
                            <>
                                <div className={styles.moduleSlots}>
                                    {techModules.map(m => (
                                        <div
                                            key={m.id}
                                            className={`${styles.moduleSlot} ${modules[m.id] ? styles.attached : ''}`}
                                        >
                                            {modules[m.id] ? m.icon : '○'}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className={styles.launchBtn}
                                    onClick={launchBusiness}
                                    disabled={activeModules === 0}
                                >
                                    [ Launch Business ]
                                </button>
                            </>
                        )}
                        {launched && (
                            <div className={styles.launchResult}>
                                <div className={styles.resultSpin}>🚀</div>
                                <h4>Solution Deployed!</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.enginePalette}>
                <h4>Tech Modules</h4>
                <div className={styles.moduleCards}>
                    {techModules.map(m => (
                        <div
                            key={m.id}
                            className={`${styles.moduleCard} ${modules[m.id] ? styles.selected : ''}`}
                            onClick={() => toggleModule(m.id)}
                        >
                            <span className={styles.moduleIcon}>{m.icon}</span>
                            <span className={styles.moduleLabel}>{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {launched && (
                <div className={styles.dashboard}>
                    <h4>📈 Expected ROI</h4>
                    <div className={styles.metrics}>
                        {modules.ai && <div className={styles.metric}>AI 에이전트: 운영 효율 40% ↑</div>}
                        {modules.data && <div className={styles.metric}>데이터 분석: 전환율 2.5배 ↑</div>}
                        {modules.web && <div className={styles.metric}>웹 플랫폼: 접근성 100% ↑</div>}
                    </div>
                </div>
            )}

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset Configuration</button>
            </div>

            {launched && (
                <div className={styles.successMessage}>
                    당신의 비즈니스 목표에 맞춰 Web, AI, Data 역량을 정교하게 조립하여 수익을 만들어 드립니다.
                </div>
            )}
        </div>
    );
};

/* ========================================
   5. DESIGN: Creative Studio
   크리에이티브 신시사이저
======================================== */
const CreativeStudio = () => {
    const [selectedConcept, setSelectedConcept] = useState(null);
    const [selectedMedium, setSelectedMedium] = useState(null);
    const [synthesizing, setSynthesizing] = useState(false);
    const [result, setResult] = useState(null);

    const concepts = [
        { id: 'brand', label: 'Brand Identity', icon: '✨' },
        { id: 'campaign', label: 'Campaign', icon: '📣' },
        { id: 'artistic', label: 'Artistic Vision', icon: '🎨' }
    ];

    const mediums = [
        { id: 'video', label: 'AI Video', icon: '🎬', result: '고품질 AI 생성 광고 영상' },
        { id: 'design', label: 'Visual Design', icon: '🖼️', result: '세련된 UI/UX 디자인 시스템' },
        { id: 'art', label: 'Fine Art', icon: '🎭', result: '디지털 아트 컬렉션' }
    ];

    const synthesize = () => {
        if (!selectedConcept || !selectedMedium) return;
        setSynthesizing(true);

        setTimeout(() => {
            setSynthesizing(false);
            const medium = mediums.find(m => m.id === selectedMedium);
            setResult(medium?.result || 'Masterpiece Created');
        }, 2000);
    };

    const reset = () => {
        setSelectedConcept(null);
        setSelectedMedium(null);
        setSynthesizing(false);
        setResult(null);
    };

    return (
        <div className={styles.studioWrapper}>
            <div className={styles.studioPalette}>
                <h4>Raw Concepts</h4>
                <div className={styles.conceptNodes}>
                    {concepts.map(c => (
                        <div
                            key={c.id}
                            className={`${styles.conceptNode} ${selectedConcept === c.id ? styles.selected : ''}`}
                            onClick={() => !result && setSelectedConcept(c.id)}
                        >
                            <span className={styles.nodeIcon}>{c.icon}</span>
                            <span>{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.synthesizerEngine}>
                <div className={`${styles.engineSlot} ${selectedConcept ? styles.filled : ''}`}>
                    {selectedConcept ? concepts.find(c => c.id === selectedConcept)?.icon : '?'}
                </div>

                <div className={`${styles.engineCore} ${synthesizing ? styles.active : ''} ${result ? styles.complete : ''}`}>
                    {!result && !synthesizing && (
                        <button
                            className={styles.synthesizeBtn}
                            onClick={synthesize}
                            disabled={!selectedConcept || !selectedMedium}
                        >
                            ⚡ SYNTHESIZE
                        </button>
                    )}
                    {synthesizing && (
                        <div className={styles.synthesizing}>
                            <div className={styles.spinner} />
                            <span>Creating...</span>
                        </div>
                    )}
                    {result && (
                        <div className={styles.masterpiece}>
                            <span className={styles.masterpieceIcon}>🎨</span>
                        </div>
                    )}
                </div>

                <div className={`${styles.engineSlot} ${selectedMedium ? styles.filled : ''}`}>
                    {selectedMedium ? mediums.find(m => m.id === selectedMedium)?.icon : '?'}
                </div>
            </div>

            <div className={styles.studioPalette}>
                <h4>Medium Modules</h4>
                <div className={styles.mediumModules}>
                    {mediums.map(m => (
                        <div
                            key={m.id}
                            className={`${styles.mediumModule} ${selectedMedium === m.id ? styles.selected : ''}`}
                            onClick={() => !result && setSelectedMedium(m.id)}
                        >
                            <span className={styles.moduleIcon}>{m.icon}</span>
                            <span>{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {result && (
                <div className={styles.resultReveal}>
                    <h3>✨ Masterpiece Created</h3>
                    <p>{result}</p>
                </div>
            )}

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>New Creation</button>
            </div>

            {result && (
                <div className={styles.successMessage}>
                    고객의 추상적인 아이디어를 AI 기술과 예술적 감각으로 합성하여 완벽한 결과물로 구현합니다.
                </div>
            )}
        </div>
    );
};

export default HighEndInteractives;
