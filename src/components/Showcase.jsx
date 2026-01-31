import React from 'react';
import styles from './Showcase.module.css';
import portfolio01 from '../assets/portfolio/01_Tech-GPT_과제스코어링플랫폼.png';

const Showcase = () => {
    return (
        <section id="rnd" className={styles.showcase}>
            <div className={styles.container}>
                <div className={styles.textContent}>
                    <span className={styles.label}>Core Technology</span>
                    <h2 className={styles.title}>AI Road Analysis System</h2>
                    <p className={styles.description}>
                        데이웨이는 스마트폰 센싱 데이터를 활용하여 도로 노면 상태를 실시간으로 분석합니다.
                        고가의 전문 장비 없이도 일상 속의 주행 데이터만으로 포트홀, 크랙 등 위험 요소를 탐지합니다.
                    </p>
                    <ul className={styles.features}>
                        <li>
                            <strong>Cost Effective</strong>
                            <span>고비용 장비 없이 스마트폰만으로 탐지 가능</span>
                        </li>
                        <li>
                            <strong>Big Data</strong>
                            <span>다수의 사용자로부터 수집된 빅데이터 분석</span>
                        </li>
                        <li>
                            <strong>Real-time</strong>
                            <span>실시간 위험 감지 및 네비게이션 연동</span>
                        </li>
                    </ul>
                    <div className={styles.metric}>
                        <div className={styles.metricItem}>
                            <h3>90%+</h3>
                            <p>Detection Accuracy</p>
                        </div>
                        <div className={styles.metricItem}>
                            <h3>Real-time</h3>
                            <p>Analysis Speed</p>
                        </div>
                    </div>
                </div>
                <div className={styles.visualContent}>
                    <div className={styles.visualWrapper}>
                        <img src={portfolio01} alt="Road Analysis HUD" className={styles.rndImage} />
                        <div className={styles.hudOverlay}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
