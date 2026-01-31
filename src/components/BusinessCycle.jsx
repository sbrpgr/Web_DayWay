import React from 'react';
import styles from './BusinessCycle.module.css';

const BusinessCycle = () => {
    return (
        <section className={styles.cycleSection}>
            <h2 className={`${styles.title} cyber-header flicker`}>Organic Business Cycle</h2>
            <p className={`${styles.subtitle} reveal-item`} style={{ animationDelay: '0.2s' }}>
                데이웨이는 단일 기술에 그치지 않고, <span className="glitch-text">네 가지 사업 영역</span>이 유기적으로 순환하며
                안정적인 비즈니스 모델을 창출합니다.
            </p>

            <div className={styles.cycleContainer}>
                <div className={`${styles.stage} reveal-item`} style={{ animationDelay: '0.4s' }}>
                    <div className={`${styles.circle} flicker`}>R&D</div>
                    <p className={`${styles.desc} energy-line`}>원천 기술 확보</p>
                </div>
                <div className={`${styles.arrow} reveal-item`} style={{ animationDelay: '0.5s' }}>→</div>
                <div className={`${styles.stage} reveal-item`} style={{ animationDelay: '0.6s' }}>
                    <div className={`${styles.circle} flicker`}>Education</div>
                    <p className={`${styles.desc} energy-line`}>인사이트 확산</p>
                </div>
                <div className={`${styles.arrow} reveal-item`} style={{ animationDelay: '0.7s' }}>→</div>
                <div className={`${styles.stage} reveal-item`} style={{ animationDelay: '0.8s' }}>
                    <div className={`${styles.circle} flicker`}>Platform</div>
                    <p className={`${styles.desc} energy-line`}>수익화 모델 구축</p>
                </div>
                <div className={`${styles.arrow} reveal-item`} style={{ animationDelay: '0.9s' }}>→</div>
                <div className={`${styles.stage} reveal-item`} style={{ animationDelay: '1.0s' }}>
                    <div className={`${styles.circle} flicker`}>Content</div>
                    <p className={`${styles.desc} energy-line`}>실제 가치 구현</p>
                </div>
            </div>

            <div className={styles.loopLine}></div>
        </section>
    );
};

export default BusinessCycle;
