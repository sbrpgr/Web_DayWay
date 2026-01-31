import React from 'react';
import styles from './Hero.module.css';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={`${styles.companyName} glitch-text`}>D A Y W A Y</div>
                    <h1 className={`${styles.title} flicker`}>
                        <span>AI & Data</span> <br />
                        <span>Solution Partner.</span>
                    </h1>
                    <p className={styles.subtitle}>
                        데이웨이는 <b>기술과 사람</b>, 그리고 <b>비즈니스</b>를 데이터로 연결합니다.<br />
                        <span className="energy-line">R&D, 교육, 플랫폼, 디자인의 유기적 결합을 통해 최적의 가치를 창출합니다.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
