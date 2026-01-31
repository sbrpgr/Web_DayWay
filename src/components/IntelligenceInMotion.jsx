import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './IntelligenceInMotion.module.css';

const IntelligenceInMotion = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sections = [
        { id: 'strategy', title: 'Strategy', subtitle: 'The Optimal Path' },
        { id: 'rnd', title: 'R&D', subtitle: 'The Standard Framework' },
        { id: 'education', title: 'Education', subtitle: 'Knowledge Diffusion' },
        { id: 'platform', title: 'Platform', subtitle: 'The Synapse Bridge' },
        { id: 'design', title: 'Design', subtitle: 'Aesthetic Logic' }
    ];

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Intelligence in Motion</h2>
                <p className={styles.subtitle}>마우스를 움직여 기술력을 체험하세요</p>
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

            <div className={styles.canvas}>
                {activeSection === 0 && <StrategyCanvas />}
                {activeSection === 1 && <RnDCanvas />}
                {activeSection === 2 && <EducationCanvas />}
                {activeSection === 3 && <PlatformCanvas />}
                {activeSection === 4 && <DesignCanvas />}
            </div>
        </section>
    );
};

/* ========================================
   1. STRATEGY: The Optimal Path
   마우스 경로를 따라 점들이 벡터 화살표 형성
======================================== */
const StrategyCanvas = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0, trail: [] });
    const [insight, setInsight] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        const particleCount = 150;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            baseX: Math.random() * canvas.offsetWidth,
            baseY: Math.random() * canvas.offsetHeight,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.3
        }));

        const animate = () => {
            ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            const trail = mouseRef.current.trail;

            // Draw trail
            if (trail.length > 2) {
                ctx.beginPath();
                ctx.moveTo(trail[0].x, trail[0].y);
                for (let i = 1; i < trail.length; i++) {
                    ctx.lineTo(trail[i].x, trail[i].y);
                }
                ctx.strokeStyle = 'rgba(0, 242, 255, 0.6)';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Arrowhead
                if (trail.length > 5) {
                    const last = trail[trail.length - 1];
                    const prev = trail[trail.length - 5];
                    const angle = Math.atan2(last.y - prev.y, last.x - prev.x);

                    ctx.beginPath();
                    ctx.moveTo(last.x, last.y);
                    ctx.lineTo(last.x - 15 * Math.cos(angle - 0.4), last.y - 15 * Math.sin(angle - 0.4));
                    ctx.moveTo(last.x, last.y);
                    ctx.lineTo(last.x - 15 * Math.cos(angle + 0.4), last.y - 15 * Math.sin(angle + 0.4));
                    ctx.strokeStyle = '#00f2ff';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            }

            // Draw and update particles
            particlesRef.current.forEach(p => {
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    p.x += dx * force * 0.03;
                    p.y += dy * force * 0.03;
                } else {
                    p.x += (p.baseX - p.x) * 0.02;
                    p.y += (p.baseY - p.y) * 0.02;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 255, ${p.alpha})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        mouseRef.current.trail.push({ x, y });
        if (mouseRef.current.trail.length > 50) {
            mouseRef.current.trail.shift();
        }
        if (mouseRef.current.trail.length > 30 && !insight) {
            setInsight(true);
        }
    };

    const handleMouseLeave = () => {
        mouseRef.current.trail = [];
    };

    return (
        <div className={styles.canvasWrapper}>
            <canvas
                ref={canvasRef}
                className={styles.canvasElement}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            <div className={`${styles.insight} ${insight ? styles.visible : ''}`}>
                전략이란 혼돈 속에서 승리를 향한 질서를 부여하는 것입니다.
            </div>
            <div className={styles.hint}>마우스를 움직여 경로를 그려보세요</div>
        </div>
    );
};

/* ========================================
   2. R&D: The Standard Framework
   롱프레스로 불안정한 격자 안정화
======================================== */
const RnDCanvas = () => {
    const canvasRef = useRef(null);
    const [pressing, setPressing] = useState(false);
    const [stability, setStability] = useState(0);
    const [insight, setInsight] = useState(false);
    const pressStartRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const gridSize = 8;
        const cellW = canvas.offsetWidth / gridSize;
        const cellH = canvas.offsetHeight / gridSize;

        const animate = () => {
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            const time = Date.now() * 0.002;
            const stab = stability / 100;

            for (let i = 0; i <= gridSize; i++) {
                for (let j = 0; j <= gridSize; j++) {
                    const baseX = i * cellW;
                    const baseY = j * cellH;

                    const shake = (1 - stab) * 8;
                    const offsetX = Math.sin(time + i * 0.5) * shake;
                    const offsetY = Math.cos(time + j * 0.5) * shake;

                    const x = baseX + offsetX;
                    const y = baseY + offsetY;

                    // Nodes
                    ctx.beginPath();
                    ctx.arc(x, y, 4 + stab * 2, 0, Math.PI * 2);
                    const alpha = 0.3 + stab * 0.7;
                    ctx.fillStyle = `rgba(0, 242, 255, ${alpha})`;
                    ctx.fill();

                    // Horizontal lines
                    if (i < gridSize) {
                        const nextX = (i + 1) * cellW + Math.sin(time + (i + 1) * 0.5) * shake;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(nextX, baseY + Math.cos(time + j * 0.5) * shake);
                        ctx.strokeStyle = `rgba(0, 242, 255, ${alpha * 0.5})`;
                        ctx.lineWidth = 1 + stab;
                        ctx.stroke();
                    }

                    // Vertical lines
                    if (j < gridSize) {
                        const nextY = (j + 1) * cellH + Math.cos(time + (j + 1) * 0.5) * shake;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(baseX + Math.sin(time + i * 0.5) * shake, nextY);
                        ctx.strokeStyle = `rgba(0, 242, 255, ${alpha * 0.5})`;
                        ctx.lineWidth = 1 + stab;
                        ctx.stroke();
                    }
                }
            }

            // Glow effect when stable
            if (stab > 0.8) {
                ctx.fillStyle = `rgba(0, 242, 255, ${(stab - 0.8) * 0.1})`;
                ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, [stability]);

    useEffect(() => {
        let interval;
        if (pressing) {
            pressStartRef.current = Date.now();
            interval = setInterval(() => {
                setStability(prev => {
                    const next = Math.min(prev + 2, 100);
                    if (next >= 100 && !insight) setInsight(true);
                    return next;
                });
            }, 30);
        } else {
            interval = setInterval(() => {
                setStability(prev => Math.max(prev - 1, 0));
            }, 50);
        }
        return () => clearInterval(interval);
    }, [pressing, insight]);

    return (
        <div className={styles.canvasWrapper}>
            <canvas ref={canvasRef} className={styles.canvasElement} />
            <button
                className={`${styles.holdBtn} ${pressing ? styles.holding : ''}`}
                onMouseDown={() => setPressing(true)}
                onMouseUp={() => setPressing(false)}
                onMouseLeave={() => setPressing(false)}
                onTouchStart={() => setPressing(true)}
                onTouchEnd={() => setPressing(false)}
            >
                <span className={styles.holdText}>{pressing ? 'Stabilizing...' : 'Hold to Standardize'}</span>
                <div className={styles.holdProgress} style={{ width: `${stability}%` }} />
            </button>
            <div className={`${styles.insight} ${insight ? styles.visible : ''}`}>
                우리의 R&D는 흔들리는 산업 현장에 기술이라는 단단한 기준을 세웁니다.
            </div>
        </div>
    );
};

/* ========================================
   3. EDUCATION: Knowledge Diffusion
   클릭으로 빛의 파동 확산
======================================== */
const EducationCanvas = () => {
    const canvasRef = useRef(null);
    const ripplesRef = useRef([]);
    const [insight, setInsight] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const words = ['혁신', 'AI', '성장', '데이터', '협업', '분석', '미래', '전략', '기술', '플랫폼', '교육', '역량'];
        const wordPositions = words.map((w, i) => ({
            text: w,
            x: Math.random() * (canvas.offsetWidth - 60) + 30,
            y: Math.random() * (canvas.offsetHeight - 40) + 20,
            lit: false,
            alpha: 0
        }));

        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;

        const animate = () => {
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            // Draw center point
            ctx.beginPath();
            ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
            gradient.addColorStop(0, 'rgba(0, 242, 255, 1)');
            gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();

            // Pulsing effect
            const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 242, 255, ${pulse * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw ripples
            ripplesRef.current = ripplesRef.current.filter(r => {
                r.radius += 4;
                r.alpha -= 0.008;

                if (r.alpha <= 0) return false;

                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 242, 255, ${r.alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Light up words
                wordPositions.forEach(w => {
                    const dist = Math.sqrt((w.x - r.x) ** 2 + (w.y - r.y) ** 2);
                    if (dist < r.radius && dist > r.radius - 20 && !w.lit) {
                        w.lit = true;
                        w.alpha = 1;
                    }
                });

                return true;
            });

            // Draw words
            ctx.font = '14px "Inter", sans-serif';
            ctx.textAlign = 'center';
            wordPositions.forEach(w => {
                if (w.lit && w.alpha > 0.2) {
                    ctx.fillStyle = `rgba(0, 242, 255, ${w.alpha})`;
                    ctx.fillText(w.text, w.x, w.y);
                    w.alpha -= 0.003;
                } else if (!w.lit) {
                    ctx.fillStyle = 'rgba(100, 116, 139, 0.3)';
                    ctx.fillText(w.text, w.x, w.y);
                }
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const handleClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        ripplesRef.current.push({
            x: canvasRef.current.offsetWidth / 2,
            y: canvasRef.current.offsetHeight / 2,
            radius: 0,
            alpha: 1
        });

        if (!insight) setInsight(true);
    };

    return (
        <div className={styles.canvasWrapper}>
            <canvas
                ref={canvasRef}
                className={styles.canvasElement}
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
            />
            <div className={`${styles.insight} ${insight ? styles.visible : ''}`}>
                축적된 노하우는 교육을 통해 기업 전체의 실무 지능으로 확산됩니다.
            </div>
            <div className={styles.hint}>중앙을 클릭하여 지식을 확산시키세요</div>
        </div>
    );
};

/* ========================================
   4. PLATFORM: The Synapse Bridge
   드래그로 노드 연결
======================================== */
const PlatformCanvas = () => {
    const canvasRef = useRef(null);
    const [dragging, setDragging] = useState(null);
    const [connections, setConnections] = useState([]);
    const [insight, setInsight] = useState(false);
    const nodesRef = useRef({
        left: [
            { id: 'l1', label: '매출 정체', x: 80, y: 80 },
            { id: 'l2', label: '고객 이탈', x: 80, y: 160 },
            { id: 'l3', label: '운영 비효율', x: 80, y: 240 }
        ],
        right: [
            { id: 'r1', label: 'AI 예측', x: 320, y: 80 },
            { id: 'r2', label: '챗봇 에이전트', x: 320, y: 160 },
            { id: 'r3', label: '자동화 플랫폼', x: 320, y: 240 }
        ]
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            // Update node positions based on canvas size
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            nodesRef.current.left.forEach((n, i) => {
                n.x = w * 0.15;
                n.y = h * 0.25 + i * (h * 0.25);
            });
            nodesRef.current.right.forEach((n, i) => {
                n.x = w * 0.85;
                n.y = h * 0.25 + i * (h * 0.25);
            });
        };
        resize();
        window.addEventListener('resize', resize);

        const animate = () => {
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            const time = Date.now() * 0.002;

            // Draw connections
            connections.forEach(conn => {
                const left = nodesRef.current.left.find(n => n.id === conn.left);
                const right = nodesRef.current.right.find(n => n.id === conn.right);
                if (left && right) {
                    // Synapse bridge effect
                    const midX = (left.x + right.x) / 2;
                    const midY = (left.y + right.y) / 2;

                    ctx.beginPath();
                    ctx.moveTo(left.x, left.y);
                    ctx.quadraticCurveTo(midX, midY + Math.sin(time) * 15, right.x, right.y);

                    const grad = ctx.createLinearGradient(left.x, left.y, right.x, right.y);
                    grad.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
                    grad.addColorStop(0.5, 'rgba(0, 242, 255, 1)');
                    grad.addColorStop(1, 'rgba(168, 85, 247, 0.8)');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 3;
                    ctx.stroke();

                    // Energy particles along path
                    for (let i = 0; i < 5; i++) {
                        const t = ((time * 0.5 + i * 0.2) % 1);
                        const px = left.x + (right.x - left.x) * t;
                        const py = left.y + (right.y - left.y) * t + Math.sin(time) * 15 * Math.sin(t * Math.PI);

                        ctx.beginPath();
                        ctx.arc(px, py, 3, 0, Math.PI * 2);
                        ctx.fillStyle = '#00f2ff';
                        ctx.fill();
                    }
                }
            });

            // Draw dragging line
            if (dragging) {
                ctx.beginPath();
                ctx.moveTo(dragging.startX, dragging.startY);
                ctx.lineTo(dragging.currentX, dragging.currentY);
                ctx.strokeStyle = 'rgba(0, 242, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Draw nodes
            [...nodesRef.current.left, ...nodesRef.current.right].forEach(node => {
                const isLeft = nodesRef.current.left.includes(node);
                const color = isLeft ? '#a855f7' : '#00f2ff';

                // Glow
                ctx.beginPath();
                ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
                const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30);
                glow.addColorStop(0, color);
                glow.addColorStop(1, 'transparent');
                ctx.fillStyle = glow;
                ctx.fill();

                // Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
                ctx.fillStyle = '#0f172a';
                ctx.fill();
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Label
                ctx.font = '12px "Inter", sans-serif';
                ctx.fillStyle = '#e2e8f0';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y + 40);
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, [dragging, connections]);

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const leftNode = nodesRef.current.left.find(n =>
            Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < 25
        );

        if (leftNode) {
            setDragging({
                nodeId: leftNode.id,
                startX: leftNode.x,
                startY: leftNode.y,
                currentX: x,
                currentY: y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setDragging(prev => ({
            ...prev,
            currentX: e.clientX - rect.left,
            currentY: e.clientY - rect.top
        }));
    };

    const handleMouseUp = (e) => {
        if (!dragging) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rightNode = nodesRef.current.right.find(n =>
            Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < 25
        );

        if (rightNode) {
            setConnections(prev => [...prev, { left: dragging.nodeId, right: rightNode.id }]);
            if (!insight) setInsight(true);
        }

        setDragging(null);
    };

    return (
        <div className={styles.canvasWrapper}>
            <canvas
                ref={canvasRef}
                className={styles.canvasElement}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setDragging(null)}
                style={{ cursor: dragging ? 'grabbing' : 'grab' }}
            />
            <div className={`${styles.insight} ${insight ? styles.visible : ''}`}>
                우리는 단순한 연결을 넘어, 기술과 수요 사이의 완벽한 접점을 설계합니다.
            </div>
            <div className={styles.hint}>왼쪽 노드를 오른쪽으로 드래그하여 연결하세요</div>
        </div>
    );
};

/* ========================================
   5. DESIGN: Aesthetic Logic
   스크롤로 코드 → 그래픽 변환
======================================== */
const DesignCanvas = () => {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [insight, setInsight] = useState(false);

    const codeLines = [
        'function analyzeData(input) {',
        '  const processed = transform(input);',
        '  return visualize(processed);',
        '}',
        '',
        'const insights = analyzeData(rawData);',
        'render(insights, canvas);'
    ];

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            setScrollProgress(prev => {
                const next = Math.max(0, Math.min(100, prev + e.deltaY * 0.1));
                if (next > 70 && !insight) setInsight(true);
                return next;
            });
        };

        const container = containerRef.current;
        container?.addEventListener('wheel', handleWheel, { passive: false });

        return () => container?.removeEventListener('wheel', handleWheel);
    }, [insight]);

    const progress = scrollProgress / 100;

    return (
        <div className={styles.canvasWrapper} ref={containerRef}>
            <div className={styles.designSplit}>
                <div className={styles.codeSection} style={{ opacity: 1 - progress * 0.7 }}>
                    <div className={styles.codeWindow}>
                        <div className={styles.codeHeader}>
                            <span className={styles.dot} style={{ background: '#ff5f56' }} />
                            <span className={styles.dot} style={{ background: '#ffbd2e' }} />
                            <span className={styles.dot} style={{ background: '#27ca40' }} />
                        </div>
                        <pre className={styles.codeContent}>
                            {codeLines.map((line, i) => (
                                <div
                                    key={i}
                                    className={styles.codeLine}
                                    style={{
                                        transform: `translateX(${progress * (i % 2 === 0 ? 50 : -50)}px)`,
                                        opacity: 1 - progress * 0.8
                                    }}
                                >
                                    <span className={styles.lineNum}>{i + 1}</span>
                                    <span className={styles.lineCode}>{line}</span>
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>

                <div className={styles.graphicSection} style={{ opacity: progress }}>
                    <div className={styles.graphicDisplay}>
                        <div
                            className={styles.chart}
                            style={{
                                transform: `scale(${0.5 + progress * 0.5})`,
                                opacity: progress
                            }}
                        >
                            <div className={styles.chartBar} style={{ height: `${20 + progress * 60}%` }} />
                            <div className={styles.chartBar} style={{ height: `${30 + progress * 50}%` }} />
                            <div className={styles.chartBar} style={{ height: `${15 + progress * 70}%` }} />
                            <div className={styles.chartBar} style={{ height: `${40 + progress * 40}%` }} />
                        </div>
                        <div
                            className={styles.graphicLabel}
                            style={{ opacity: progress > 0.5 ? (progress - 0.5) * 2 : 0 }}
                        >
                            Data Visualization
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.scrollFill} style={{ height: `${scrollProgress}%` }} />
            </div>

            <div className={`${styles.insight} ${insight ? styles.visible : ''}`}>
                가장 정교한 기술은 가장 아름다운 가치로 표현될 때 완성됩니다.
            </div>
            <div className={styles.hint}>스크롤하여 데이터를 디자인으로 변환하세요</div>
        </div>
    );
};

export default IntelligenceInMotion;
