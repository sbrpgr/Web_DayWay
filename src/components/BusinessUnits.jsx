import React from 'react';
import styles from './BusinessUnits.module.css';

const units = [
    {
        id: 'rnd',
        title: 'Research & Development',
        desc: '주행 차량 센싱 데이터 분석 및 도로 상태 판정 AI 기술 연구.',
        icon: '🧬'
    },
    {
        id: 'edu',
        title: 'Education',
        desc: 'AI 및 자동화 솔루션 교육, AX/DX 컨설팅 제공.',
        icon: '🎓'
    },
    {
        id: 'platform',
        title: 'Marketing & Platform',
        desc: 'AI/ICT 상품 유통 및 안정적 수익 창출 플랫폼 운영.',
        icon: '📊'
    },
    {
        id: 'design',
        title: 'Design & Contents',
        desc: '창의적인 디자인과 콘텐츠 제작으로 비즈니스 가치 극대화.',
        icon: '🎨'
    }
];

const BusinessUnits = () => {
    return (
        <section id="business" className={styles.business}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Business Areas</h2>
                    <p className={styles.subtitle}>
                        데이웨이는 4가지 핵심 사업부를 통해 기술과 교육, 그리고 비즈니스의 선순환을 만들어갑니다.
                    </p>
                </div>

                <div className={styles.grid}>
                    {units.map((unit) => (
                        <div key={unit.id} className={styles.card}>
                            <div className={styles.icon}>{unit.icon}</div>
                            <h3 className={styles.cardTitle}>{unit.title}</h3>
                            <p className={styles.cardDesc}>{unit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BusinessUnits;
