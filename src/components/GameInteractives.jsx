import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './GameInteractives.module.css';

const GameInteractives = () => {
    const [activeGame, setActiveGame] = useState(0);
    const games = [
        { id: 'strategy', title: 'Strategy', subtitle: 'Data 2048 Merge' },
        { id: 'rnd', title: 'R&D', subtitle: 'Circuit Connect' },
        { id: 'education', title: 'Education', subtitle: 'Needs Tree' },
        { id: 'platform', title: 'Platform', subtitle: 'Synapse Match' },
        { id: 'design', title: 'Design', subtitle: 'Poly-Art Jigsaw' }
    ];

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Interactive Experience</h2>
                <p className={styles.subtitle}>비즈니스 가치를 직접 체험하세요</p>
            </div>

            <div className={styles.nav}>
                {games.map((game, idx) => (
                    <button
                        key={game.id}
                        className={`${styles.navBtn} ${activeGame === idx ? styles.active : ''}`}
                        onClick={() => setActiveGame(idx)}
                    >
                        <span className={styles.navTitle}>{game.title}</span>
                        <span className={styles.navSub}>{game.subtitle}</span>
                    </button>
                ))}
            </div>

            <div className={styles.gameArea}>
                {activeGame === 0 && <Game2048 />}
                {activeGame === 1 && <CircuitConnect />}
                {activeGame === 2 && <NeedsTree />}
                {activeGame === 3 && <SynapseMatch />}
                {activeGame === 4 && <PolyArtJigsaw />}
            </div>
        </section>
    );
};

/* ========================================
   1. STRATEGY: Data 2048 Merge
======================================== */
const TILE_TYPES = ['📊', '💡', '🎯', '🏆'];
const TILE_LABELS = ['Data', 'Insight', 'Strategy', 'Victory'];

const Game2048 = () => {
    const [grid, setGrid] = useState(() => initGrid());
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const gridRef = useRef(null);

    function initGrid() {
        const g = Array(4).fill(null).map(() => Array(4).fill(null));
        addRandomTile(g);
        addRandomTile(g);
        return g;
    }

    function addRandomTile(g) {
        const empty = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (!g[r][c]) empty.push([r, c]);
            }
        }
        if (empty.length > 0) {
            const [r, c] = empty[Math.floor(Math.random() * empty.length)];
            g[r][c] = { level: 0, id: Date.now() + Math.random() };
        }
    }

    const move = useCallback((dir) => {
        const newGrid = grid.map(row => row.map(cell => cell ? { ...cell } : null));
        let moved = false;
        let points = 0;
        let merged = false;

        const slide = (arr) => {
            const filtered = arr.filter(x => x !== null);
            const result = [];
            for (let i = 0; i < filtered.length; i++) {
                if (i + 1 < filtered.length && filtered[i].level === filtered[i + 1].level) {
                    result.push({ level: Math.min(filtered[i].level + 1, 3), id: Date.now() + Math.random() });
                    points += (filtered[i].level + 1) * 10;
                    merged = true;
                    i++;
                } else {
                    result.push(filtered[i]);
                }
            }
            while (result.length < 4) result.push(null);
            return result;
        };

        if (dir === 'left' || dir === 'right') {
            for (let r = 0; r < 4; r++) {
                let row = newGrid[r];
                if (dir === 'right') row = row.slice().reverse();
                const slid = slide(row);
                if (dir === 'right') slid.reverse();
                if (JSON.stringify(newGrid[r]) !== JSON.stringify(slid)) moved = true;
                newGrid[r] = slid;
            }
        } else {
            for (let c = 0; c < 4; c++) {
                let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
                if (dir === 'down') col = col.slice().reverse();
                const slid = slide(col);
                if (dir === 'down') slid.reverse();
                if (newGrid[0][c]?.level !== slid[0]?.level ||
                    newGrid[1][c]?.level !== slid[1]?.level ||
                    newGrid[2][c]?.level !== slid[2]?.level ||
                    newGrid[3][c]?.level !== slid[3]?.level) moved = true;
                for (let r = 0; r < 4; r++) newGrid[r][c] = slid[r];
            }
        }

        if (moved) {
            addRandomTile(newGrid);
            setGrid(newGrid);
            setScore(s => s + points);

            if (merged) {
                gsap.to(gridRef.current, { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1 });
            }

            // Check for victory
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    if (newGrid[r][c]?.level === 3) {
                        setMessage('🏆 Business Victory! 작은 데이터 조각들이 거대한 전략적 승리로 융합되었습니다.');
                    }
                }
            }
        }
    }, [grid]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowUp') move('up');
            else if (e.key === 'ArrowDown') move('down');
            else if (e.key === 'ArrowLeft') move('left');
            else if (e.key === 'ArrowRight') move('right');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [move]);

    // Touch handling
    const touchStart = useRef({ x: 0, y: 0 });
    const handleTouchStart = (e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e) => {
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > Math.abs(dy)) {
            move(dx > 0 ? 'right' : 'left');
        } else {
            move(dy > 0 ? 'down' : 'up');
        }
    };

    const reset = () => {
        setGrid(initGrid());
        setScore(0);
        setMessage('');
    };

    return (
        <div className={styles.gameWrapper}>
            <div className={styles.gameInfo}>
                <span className={styles.scoreLabel}>Score: <strong>{score}</strong></span>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>

            <div
                ref={gridRef}
                className={styles.grid2048}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {grid.map((row, r) =>
                    row.map((cell, c) => (
                        <div key={`${r}-${c}`} className={styles.cell2048}>
                            {cell && (
                                <div className={`${styles.tile2048} ${styles[`level${cell.level}`]}`}>
                                    <span className={styles.tileIcon}>{TILE_TYPES[cell.level]}</span>
                                    <span className={styles.tileLabel}>{TILE_LABELS[cell.level]}</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {message && <div className={styles.victoryMessage}>{message}</div>}
            <div className={styles.hint}>화살표 키 또는 스와이프로 타일을 움직이세요</div>
        </div>
    );
};

/* ========================================
   2. R&D: Circuit Connect
======================================== */
const PIPE_TYPES = ['━', '┃', '┏', '┓', '┗', '┛', '╋'];
const ROTATIONS = {
    '━': ['━', '┃', '━', '┃'],
    '┃': ['┃', '━', '┃', '━'],
    '┏': ['┏', '┓', '┛', '┗'],
    '┓': ['┓', '┛', '┗', '┏'],
    '┗': ['┗', '┏', '┓', '┛'],
    '┛': ['┛', '┗', '┏', '┓'],
    '╋': ['╋', '╋', '╋', '╋']
};

const CircuitConnect = () => {
    const [pipes, setPipes] = useState(() => generatePuzzle());
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('');

    function generatePuzzle() {
        const stages = ['문제 인식', '기획', '설계', '연구', '개발'];
        return stages.map((label, i) => ({
            id: i,
            label,
            rotation: Math.floor(Math.random() * 4),
            correct: 0
        }));
    }

    const rotatePipe = (id) => {
        setPipes(prev => {
            const next = prev.map(p =>
                p.id === id ? { ...p, rotation: (p.rotation + 1) % 4 } : p
            );

            // Check if all aligned
            const allCorrect = next.every(p => p.rotation === p.correct);
            if (allCorrect && !connected) {
                setConnected(true);
                setMessage('R&D는 우연이 아닙니다. 정교한 프로세스 설계와 기술력의 연결이 산업의 표준을 만듭니다.');
                gsap.fromTo('.circuit-line', { width: 0 }, { width: '100%', duration: 1, ease: 'power2.out' });
            }

            return next;
        });
    };

    const reset = () => {
        setPipes(generatePuzzle());
        setConnected(false);
        setMessage('');
    };

    return (
        <div className={styles.gameWrapper}>
            <div className={styles.circuitBoard}>
                <div className={styles.circuitStart}>START</div>
                <div className={styles.circuitPipes}>
                    {pipes.map(pipe => (
                        <div
                            key={pipe.id}
                            className={`${styles.pipeModule} ${pipe.rotation === pipe.correct ? styles.aligned : ''}`}
                            onClick={() => !connected && rotatePipe(pipe.id)}
                            style={{ transform: `rotate(${pipe.rotation * 90}deg)` }}
                        >
                            <div className={styles.pipeIcon}>⚙️</div>
                            <div className={styles.pipeLabel}>{pipe.label}</div>
                        </div>
                    ))}
                </div>
                <div className={`${styles.circuitLine} circuit-line`} style={{ width: connected ? '100%' : '0%' }} />
                <div className={styles.circuitEnd}>END</div>
            </div>

            {message && <div className={styles.successMessage}>{message}</div>}
            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>
            <div className={styles.hint}>각 모듈을 클릭하여 정렬하세요</div>
        </div>
    );
};

/* ========================================
   3. EDUCATION: Needs Tree Navigator
======================================== */
const QUESTION_TREE = {
    root: {
        q: '어떤 변화가 필요하십니까?',
        options: [
            { text: '업무 효율화', next: 'efficiency' },
            { text: 'AI 리터러시 강화', next: 'ai' },
            { text: '데이터 분석 역량', next: 'data' }
        ]
    },
    efficiency: {
        q: '효율화의 우선순위는?',
        options: [
            { text: '반복 업무 자동화', next: 'result_auto' },
            { text: '의사결정 속도', next: 'result_decision' }
        ]
    },
    ai: {
        q: 'AI 활용 수준은?',
        options: [
            { text: '입문 단계', next: 'result_aibasic' },
            { text: '실무 적용 단계', next: 'result_aiadvanced' }
        ]
    },
    data: {
        q: '분석 대상은?',
        options: [
            { text: '고객/시장 데이터', next: 'result_market' },
            { text: '운영/프로세스 데이터', next: 'result_ops' }
        ]
    },
    result_auto: { result: '🤖 RPA & 자동화 마스터 과정', desc: '반복 업무를 90% 줄이는 실전 자동화 스킬' },
    result_decision: { result: '📊 데이터 기반 의사결정 과정', desc: '신속하고 정확한 비즈니스 판단력' },
    result_aibasic: { result: '🎓 AI 리터러시 기초 과정', desc: 'AI 개념부터 활용까지 완벽 마스터' },
    result_aiadvanced: { result: '🔬 AI 실무 적용 심화 과정', desc: '실제 업무에 AI를 적용하는 방법론' },
    result_market: { result: '📈 고객 분석 & 마케팅 인텔리전스', desc: '데이터로 고객을 이해하는 기술' },
    result_ops: { result: '⚡ 프로세스 마이닝 과정', desc: '운영 효율을 극대화하는 분석 기법' }
};

const NeedsTree = () => {
    const [path, setPath] = useState(['root']);
    const [history, setHistory] = useState([]);

    const current = QUESTION_TREE[path[path.length - 1]];
    const isResult = !!current?.result;

    const selectOption = (next) => {
        setHistory(h => [...h, path[path.length - 1]]);
        setPath(p => [...p, next]);
    };

    const reset = () => {
        setPath(['root']);
        setHistory([]);
    };

    return (
        <div className={styles.gameWrapper}>
            <div className={styles.treePath}>
                {history.map((h, i) => (
                    <span key={i} className={styles.pathNode}>
                        {QUESTION_TREE[h].q?.slice(0, 8)}... →
                    </span>
                ))}
            </div>

            <div className={styles.treeCard}>
                {isResult ? (
                    <div className={styles.resultCard}>
                        <div className={styles.resultIcon}>{current.result.slice(0, 2)}</div>
                        <h3 className={styles.resultTitle}>{current.result.slice(2)}</h3>
                        <p className={styles.resultDesc}>{current.desc}</p>
                        <div className={styles.resultMessage}>
                            귀사의 고민에서 시작하여 전문성 강화라는 확실한 결과물로 안내합니다.
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className={styles.treeQuestion}>{current.q}</h3>
                        <div className={styles.treeOptions}>
                            {current.options.map((opt, i) => (
                                <button
                                    key={i}
                                    className={styles.treeOption}
                                    onClick={() => selectOption(opt.next)}
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>처음으로</button>
            </div>
        </div>
    );
};

/* ========================================
   4. PLATFORM: Synapse Match-Maker
======================================== */
const LEFT_NODES = [
    { id: 'l1', label: '공공 정책', x: 15, y: 25 },
    { id: 'l2', label: '매칭 허브', x: 12, y: 50 },
    { id: 'l3', label: '빅데이터', x: 18, y: 75 }
];
const RIGHT_NODES = [
    { id: 'r1', label: 'AI 에이전트', x: 85, y: 25 },
    { id: 'r2', label: '예측 모델', x: 88, y: 50 },
    { id: 'r3', label: '자동화 플랫폼', x: 82, y: 75 }
];

const SynapseMatch = () => {
    const [search, setSearch] = useState('');
    const [connections, setConnections] = useState([]);
    const [activeNodes, setActiveNodes] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (search.length > 0) {
            const keywords = ['정책', '매칭', '데이터', 'AI', '예측', '자동화'];
            const matched = keywords.filter(k => k.includes(search) || search.includes(k));
            const activated = [];

            if (matched.some(m => ['정책'].includes(m))) activated.push('l1', 'r1');
            if (matched.some(m => ['매칭'].includes(m))) activated.push('l2', 'r2');
            if (matched.some(m => ['데이터', '빅'].includes(m))) activated.push('l3', 'r3');
            if (matched.some(m => ['AI', '에이전트'].includes(m))) activated.push('l1', 'r1');
            if (matched.some(m => ['예측'].includes(m))) activated.push('l2', 'r2');
            if (matched.some(m => ['자동화'].includes(m))) activated.push('l3', 'r3');

            setActiveNodes([...new Set(activated)]);

            // Auto connect if both sides active
            const newConns = [];
            if (activated.includes('l1') && activated.includes('r1')) newConns.push(['l1', 'r1']);
            if (activated.includes('l2') && activated.includes('r2')) newConns.push(['l2', 'r2']);
            if (activated.includes('l3') && activated.includes('r3')) newConns.push(['l3', 'r3']);
            setConnections(newConns);
        } else {
            setActiveNodes([]);
            setConnections([]);
        }
    }, [search]);

    return (
        <div className={styles.gameWrapper}>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="검색어 입력 (예: 정책, AI, 데이터...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.synapseField}>
                <svg className={styles.synapseSvg}>
                    {connections.map(([l, r], i) => {
                        const left = LEFT_NODES.find(n => n.id === l);
                        const right = RIGHT_NODES.find(n => n.id === r);
                        if (!left || !right) return null;
                        return (
                            <line
                                key={i}
                                x1={`${left.x}%`}
                                y1={`${left.y}%`}
                                x2={`${right.x}%`}
                                y2={`${right.y}%`}
                                className={styles.synapseLine}
                            />
                        );
                    })}
                </svg>

                {[...LEFT_NODES, ...RIGHT_NODES].map(node => (
                    <div
                        key={node.id}
                        className={`${styles.synapseNode} ${activeNodes.includes(node.id) ? styles.nodeActive : ''}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        <div className={styles.nodeGlow} />
                        <span className={styles.nodeLabel}>{node.label}</span>
                    </div>
                ))}
            </div>

            {connections.length > 0 && (
                <div className={styles.synapseMessage}>
                    우리의 플랫폼은 파편화된 수요와 공급을 가장 지능적인 방식으로 연결하는 매칭 허브입니다.
                </div>
            )}
            <div className={styles.hint}>키워드를 입력하면 관련 노드가 자동으로 연결됩니다</div>
        </div>
    );
};

/* ========================================
   5. DESIGN: Poly-Art Jigsaw
======================================== */
const PUZZLE_PIECES = [
    { id: 0, color: '#00f2ff', targetX: 20, targetY: 30 },
    { id: 1, color: '#a855f7', targetX: 40, targetY: 25 },
    { id: 2, color: '#f43f5e', targetX: 60, targetY: 35 },
    { id: 3, color: '#fbbf24', targetX: 35, targetY: 55 },
    { id: 4, color: '#22c55e', targetX: 55, targetY: 60 }
];

const PolyArtJigsaw = () => {
    const [pieces, setPieces] = useState(() =>
        PUZZLE_PIECES.map(p => ({
            ...p,
            x: 10 + Math.random() * 80,
            y: 75 + Math.random() * 15,
            placed: false
        }))
    );
    const [dragging, setDragging] = useState(null);
    const [completed, setCompleted] = useState(false);
    const areaRef = useRef(null);

    const handleMouseDown = (id) => (e) => {
        e.preventDefault();
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

                const dist = Math.sqrt((p.x - p.targetX) ** 2 + (p.y - p.targetY) ** 2);
                if (dist < 12) {
                    gsap.to(`#piece-${p.id}`, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
                    return { ...p, x: p.targetX, y: p.targetY, placed: true };
                }
                return p;
            });

            if (updated.every(p => p.placed) && !completed) {
                setCompleted(true);
            }

            return updated;
        });

        setDragging(null);
    };

    const reset = () => {
        setPieces(PUZZLE_PIECES.map(p => ({
            ...p,
            x: 10 + Math.random() * 80,
            y: 75 + Math.random() * 15,
            placed: false
        })));
        setCompleted(false);
    };

    return (
        <div className={styles.gameWrapper}>
            <div
                ref={areaRef}
                className={styles.puzzleArea}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Target silhouettes */}
                {PUZZLE_PIECES.map(p => (
                    <div
                        key={`target-${p.id}`}
                        className={styles.puzzleTarget}
                        style={{ left: `${p.targetX}%`, top: `${p.targetY}%` }}
                    />
                ))}

                {/* Draggable pieces */}
                {pieces.map(p => (
                    <div
                        key={p.id}
                        id={`piece-${p.id}`}
                        className={`${styles.puzzlePiece} ${p.placed ? styles.placed : ''}`}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            backgroundColor: p.color,
                            cursor: p.placed ? 'default' : 'grab'
                        }}
                        onMouseDown={!p.placed ? handleMouseDown(p.id) : undefined}
                    />
                ))}

                {completed && (
                    <div className={styles.puzzleComplete}>
                        <div className={styles.completeArt}>🎨</div>
                        <p>무질서한 기술의 조각들이 디자인을 만날 때, 비로소 강력한 비즈니스 가치를 지닌 예술이 됩니다.</p>
                    </div>
                )}
            </div>

            <div className={styles.gameActions}>
                <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>
            <div className={styles.hint}>조각을 드래그하여 가이드라인에 맞추세요</div>
        </div>
    );
};

export default GameInteractives;
