import React, { useState, useEffect, useRef } from 'react';
import styles from './InteractiveGames.module.css';

const SLOT_ITEMS = [
    ["매출 정체", "신규 시장", "브랜드 노후", "운영 비효율", "고객 이탈"],
    ["데이터 솔루션", "AI 에이전트", "예측 모델", "DX 프로세스", "맞춤형 교육"],
    ["시장 점유율 UP", "비용 절감", "팬덤 형성", "업무 자동화", "성공적 안착"]
];

const InteractiveGames = () => {
    const [activeGame, setActiveGame] = useState('strategy');

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeGame === 'strategy' ? styles.active : ''}`}
                        onClick={() => setActiveGame('strategy')}
                    >
                        Strategy
                    </button>
                    <button
                        className={`${styles.tab} ${activeGame === 'platform' ? styles.active : ''}`}
                        onClick={() => setActiveGame('platform')}
                    >
                        Platform
                    </button>
                    <button
                        className={`${styles.tab} ${activeGame === 'education' ? styles.active : ''}`}
                        onClick={() => setActiveGame('education')}
                    >
                        Education
                    </button>
                    <button
                        className={`${styles.tab} ${activeGame === 'rnd' ? styles.active : ''}`}
                        onClick={() => setActiveGame('rnd')}
                    >
                        R&D / Design
                    </button>
                </div>

                <div className={styles.gameDisplay}>
                    {activeGame === 'strategy' && <SlotMachine />}
                    {activeGame === 'platform' && <BubblePop />}
                    {activeGame === 'education' && <CharacterEvolution />}
                    {activeGame === 'rnd' && <MagicLens />}
                </div>
            </div>
        </section>
    );
};

/* --- 1. Strategy: Slot Machine --- */
const SlotMachine = () => {
    const [slots, setSlots] = useState([0, 0, 0]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setResult(null);

        let spinCount = 0;
        const interval = setInterval(() => {
            setSlots([
                Math.floor(Math.random() * SLOT_ITEMS[0].length),
                Math.floor(Math.random() * SLOT_ITEMS[1].length),
                Math.floor(Math.random() * SLOT_ITEMS[2].length),
            ]);
            spinCount++;
            if (spinCount > 20) {
                clearInterval(interval);
                setIsSpinning(false);
                setResult(true);
            }
        }, 80);
    };

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameHeader}>
                <h3 className={styles.gameTitle}>Strategy: 승리 공식 만들기</h3>
                <p className={styles.gameDesc}>슬롯을 돌려 비즈니스 성공을 위한 최적의 조합을 찾아보세요.</p>
            </div>

            <div className={styles.slotMachine}>
                <div className={styles.slotWindow}>
                    {slots.map((val, i) => (
                        <div key={i} className={`${styles.slotColumn} ${isSpinning ? styles.spinning : ''}`}>
                            <div className={styles.slotItem}>{SLOT_ITEMS[i][val]}</div>
                        </div>
                    ))}
                </div>
                <button className={styles.lever} onClick={spin} disabled={isSpinning}>
                    {isSpinning ? 'SPINNING...' : 'LEVER'}
                </button>
            </div>

            {result && (
                <div className={styles.slotResult}>
                    <p className={styles.resultText}>
                        <strong>"{SLOT_ITEMS[0][slots[0]]}"</strong>를 <strong>"{SLOT_ITEMS[1][slots[1]]}"</strong>로 해결하여 <strong>"{SLOT_ITEMS[2][slots[2]]}"</strong>!
                    </p>
                    <div className={styles.aiFeedback}>
                        <span className={styles.aiTag}>AI Analysis</span>
                        이 조합은 특히 2030 타겟에게 강력한 승리 공식입니다.
                    </div>
                </div>
            )}
        </div>
    );
};

/* --- 2. Platform: Bubble Pop --- */
const BubblePop = () => {
    const [bubbles, setBubbles] = useState([]);
    const [basket, setBasket] = useState([]);
    const containerRef = useRef(null);

    const keywords = ['공공 정책', '매칭 허브', 'AI Agent', '빅데이터', 'DX 진단', '스마트 조명', '관광 콘텐츠', 'LLM'];

    useEffect(() => {
        const interval = setInterval(() => {
            if (bubbles.length < 8) {
                const newBubble = {
                    id: Date.now(),
                    text: keywords[Math.floor(Math.random() * keywords.length)],
                    x: Math.random() * 80 + 10,
                    y: 110,
                    size: Math.random() * 60 + 60,
                    speed: Math.random() * 1 + 0.5
                };
                setBubbles(prev => [...prev, newBubble]);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [bubbles]);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setBubbles(prev => prev.map(b => ({ ...b, y: b.y - b.speed })).filter(b => b.y > -20));
        }, 16);
        return () => clearInterval(moveInterval);
    }, []);

    const popBubble = (b) => {
        setBubbles(prev => prev.filter(item => item.id !== b.id));
        setBasket(prev => [...prev.slice(-4), { ...b, popTime: Date.now() }]);
    };

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameHeader}>
                <h3 className={styles.gameTitle}>Platform & Service: AI 매칭 버블</h3>
                <p className={styles.gameDesc}>비즈니스 요구사항 버블을 터치하여 솔루션을 수집하세요.</p>
            </div>

            <div className={styles.bubbleArea} ref={containerRef}>
                {bubbles.map(b => (
                    <div
                        key={b.id}
                        className={styles.bubble}
                        style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.size, height: b.size }}
                        onClick={() => popBubble(b)}
                    >
                        {b.text}
                    </div>
                ))}
                <div className={styles.basket}>
                    <div className={styles.basketLabel}>내 비즈니스 바구니</div>
                    <div className={styles.basketItems}>
                        {basket.map((item, idx) => (
                            <span key={item.id} className={styles.basketItem}>
                                {item.text} <small>매칭 성공!</small>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- 3. Education: Character Evolution --- */
const CharacterEvolution = () => {
    const [step, setStep] = useState(0);
    const [level, setLevel] = useState('사원');

    const questions = [
        {
            q: "업무 시 AI 도구를 쓰시나요?",
            options: [
                { text: "아직 잘 모르겠어요", level: "입문자" },
                { text: "자주 활용합니다!", level: "스마트 사원" }
            ]
        },
        {
            q: "데이터 분석을 자동화하고 싶나요?",
            options: [
                { text: "관심 있습니다", level: "DX 리더" },
                { text: "이미 하고 있어요", level: "DX 마스터" }
            ]
        }
    ];

    const handleChoice = (opt) => {
        setLevel(opt.level);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(step + 1); // Final result
        }
    };

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameHeader}>
                <h3 className={styles.gameTitle}>Education: DX 인재 진화 카드</h3>
                <p className={styles.gameDesc}>선택지를 골라 당신의 DX 레벨을 확인해 보세요.</p>
            </div>

            <div className={styles.evoArea}>
                <div className={styles.charVisual}>
                    <div className={`${styles.character} ${styles['lv' + (step + 1)]}`}>
                        <div className={styles.charIcon}>
                            {step === 0 && '👤'}
                            {step === 1 && '🕶️'}
                            {step >= 2 && '🔮'}
                        </div>
                        <div className={styles.charLevel}>현재: {level}</div>
                    </div>
                </div>

                <div className={styles.quizArea}>
                    {step < questions.length ? (
                        <div className={styles.quizCard}>
                            <p className={styles.quizText}>{questions[step].q}</p>
                            <div className={styles.optionList}>
                                {questions[step].options.map((opt, i) => (
                                    <button key={i} className={styles.optionBtn} onClick={() => handleChoice(opt)}>
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.finalCard}>
                            <h4 className={styles.finalTitle}>진화 완료: {level}</h4>
                            <p className={styles.finalDesc}>전문 교육을 통해 당신의 팀원들도 이렇게 진화할 수 있습니다.</p>
                            <button className={styles.resetBtn} onClick={() => { setStep(0); setLevel('사원'); }}>다시 하기</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* --- 4. R&D / Design: Magic Lens --- */
const MagicLens = () => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const areaRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!areaRef.current) return;
        const rect = areaRef.current.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameHeader}>
                <h3 className={styles.gameTitle}>R&D / Design: 매직 스와이프</h3>
                <p className={styles.gameDesc}>커서를 움직여 복잡한 기술이 디자인 가치로 변하는 순간을 포착하세요.</p>
            </div>

            <div className={styles.lensArea} ref={areaRef} onMouseMove={handleMouseMove}>
                <div className={styles.lensBackground}>
                    <div className={styles.techLayer}>
                        <div className={styles.techText}>f(x) = ∫ Σ(λ_i * ∇log P(y|x)) dt</div>
                        <div className={styles.techText}>while(unstable) {"{"} optimize(); {"}"}</div>
                        <div className={styles.techText}>01010110 01101001 01110011 01101001 01101111 01101110</div>
                    </div>
                </div>
                <div
                    className={styles.magicLens}
                    style={{
                        left: `${mousePos.x}%`,
                        top: `${mousePos.y}%`,
                        clipPath: `circle(80px at ${mousePos.x}% ${mousePos.y}%)`
                    }}
                >
                    <div className={styles.designLayer}>
                        <div className={styles.designIcon}>💎</div>
                        <div className={styles.designIcon}>🎨</div>
                        <div className={styles.designIcon}>🚀</div>
                        <div className={styles.designCaption}>가치 있는 디자인으로 변환</div>
                    </div>
                </div>
                <div
                    className={styles.lensCursor}
                    style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
                />
            </div>
        </div>
    );
};

export default InteractiveGames;
