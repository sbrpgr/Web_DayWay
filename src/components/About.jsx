import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h2 className={`${styles.statement} cyber-header`}>
                        We Engineer <br />
                        <span className={`${styles.highlight} glitch-text flicker`}>Intelligence.</span>
                    </h2>
                    <p className={`${styles.description} reveal-item`} style={{ animationDelay: '0.2s' }}>
                        데이웨이는 2025년 설립된 <span className="glitch-text" style={{ color: 'var(--accent-primary)' }}>AI 솔루션 파트너</span>입니다.<br />
                        우리는 단순히 소프트웨어를 만드는 것이 아니라,<br />
                        <span className="energy-line">데이터를 통해 도시와 기업이 마주한 복잡한 문제를 해결합니다.</span>
                    </p>
                </div>

                <div className={styles.right}>
                    <div className={styles.valueGrid}>
                        <div className={`${styles.valueItem} reveal-item`} style={{ animationDelay: '0.4s' }}>
                            <h3 className="energy-line">Precision Engineering</h3>
                            <p>데이터의 0.1% 오차까지 추적하는 정밀한 분석 아키텍처</p>
                        </div>
                        <div className={`${styles.valueItem} reveal-item`} style={{ animationDelay: '0.5s' }}>
                            <h3 className="energy-line">Agile Intelligence</h3>
                            <p>기술의 가속에 맞춰 비즈니스의 미래를 가장 빠르게 동기화</p>
                        </div>
                        <div className={`${styles.valueItem} reveal-item`} style={{ animationDelay: '0.6s' }}>
                            <h3 className="energy-line">Scalable Ecosystem</h3>
                            <p>유기적 순환을 통해 중단 없이 확장되는 기술 가치 체인</p>
                        </div>
                        <div className={`${styles.valueItem} reveal-item`} style={{ animationDelay: '0.7s' }}>
                            <h3 className="energy-line">Impact-Driven Utility</h3>
                            <p>실생활의 난제를 기술로 해체하고 가시적인 변화를 설계</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
