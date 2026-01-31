import React from 'react';
import styles from './TechStack.module.css';

const TechStack = () => {
    const stack = [
        { category: "AI & ML", items: ["PyTorch", "TensorFlow", "YOLOv8", "LLM (GPT-4)", "Scikit-learn"] },
        { category: "Web & Server", items: ["React", "Next.js", "FastAPI", "Node.js", "AWS Cloud"] },
        { category: "Data & Viz", items: ["Tableau", "Google Maps API", "D3.js", "BigQuery", "Pandas"] },
        { category: "IoT & Embedded", items: ["Raspberry Pi", "Arduino", "C++", "Sensor Fusion", "LED Control"] }
    ];

    const deliverables = [
        {
            title: "AI Solutions",
            desc: "Anomalies, Risks, Patterns",
            detail: "이상 탐지 및 위험 예측 모델",
            icon: "🧠"
        },
        {
            title: "SaaS Platforms",
            desc: "Web, App, Dashboards",
            detail: "데이터 관제 및 매칭 플랫폼",
            icon: "💻"
        },
        {
            title: "Smart Hardware",
            desc: "IoT, Sensors, Lighting",
            detail: "지능형 도로 안전 및 디자인 제품",
            icon: "💡"
        },
        {
            title: "Policy & Reports",
            desc: "Strategy, Consulting, Curriculum",
            detail: "데이터 기반 정책 제안 및 교육",
            icon: "📄"
        }
    ];

    return (
        <section className={styles.container}>
            <div className={styles.inner}>

                {/* Deliverables Section (What we make) */}
                <div className={styles.deliverablesArea}>
                    <h2 className={styles.title}>Our Deliverables</h2>
                    <p className={styles.subtitle}>
                        보유한 기술력을 바탕으로 다음과 같은
                        <strong> 실질적인 결과물</strong>을 만들어냅니다.
                    </p>
                    <div className={styles.cardGrid}>
                        {deliverables.map((item, idx) => (
                            <div key={idx} className={styles.dCard}>
                                <div className={styles.icon}>{item.icon}</div>
                                <h3 className={styles.dTitle}>{item.title}</h3>
                                <p className={styles.dDesc}>{item.desc}</p>
                                <div className={styles.dDetail}>{item.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Section (How we make it) */}
                <div className={styles.stackArea}>
                    <h3 className={styles.stackTitle}>Core Technology Stack</h3>
                    <div className={styles.stackGrid}>
                        {stack.map((group, idx) => (
                            <div key={idx} className={styles.stackGroup}>
                                <h4 className={styles.groupTitle}>{group.category}</h4>
                                <div className={styles.tags}>
                                    {group.items.map((tech, tIdx) => (
                                        <span key={tIdx} className={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TechStack;
