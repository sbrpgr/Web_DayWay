import React from 'react';
import styles from './ProductsServices.module.css';

const ProductsServices = () => {
    const sectors = [
        {
            id: 'strategy',
            title: 'Strategy',
            subtitle: 'Planning & Policy',
            items: [
                '선거 전략 수립 및 데이터 분석',
                '공공 정책/입법 제안 기획',
                '사회 문제 해결형 전략 솔루션',
                '인구/교통/환경 데이터 전략',
                '정량적 근거 기반 의사결정 지원'
            ]
        },
        {
            id: 'rnd',
            title: 'R&D',
            subtitle: 'Research & Tech',
            items: [
                'R&D 과제 기획 및 제안',
                'AI 이상 탐지/예측 모델 개발',
                '데이터 분석 플랫폼 구축',
                'LLM 기반 평가/매칭 시스템',
                '국가 연구용역 수행'
            ]
        },
        {
            id: 'edu',
            title: 'Education',
            subtitle: 'Tech Training',
            items: [
                'AI/SW 부트캠프 운영',
                '기업 맞춤형 AX/DX 교육',
                '공공기관/학교 SW 연수',
                '솔루션 활용 및 실무 교육',
                '디지털 새싹/KDT 사업'
            ]
        },
        {
            id: 'platform',
            title: 'Platform',
            subtitle: 'Service & Agent',
            items: [
                'AI 챗봇/에이전트 개발',
                '기업 AX 진단 솔루션',
                '비즈니스 솔루션 유통',
                '데이터 기반 리서치 서비스',
                '맞춤형 플랫폼 구축'
            ]
        },
        {
            id: 'design',
            title: 'Design',
            subtitle: 'Creative & Item',
            items: [
                '스마트 도로/경관 조명 디자인',
                '관광/문화 콘텐츠 굿즈',
                '공공 디자인 및 슬로건',
                '융복합 미디어 아트',
                '브랜딩 및 시각물 제작'
            ]
        }
    ];

    return (
        <section id="products" className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 className={`${styles.mainTitle} cyber-header flicker`}>Products & Services</h2>
                    <p className={`${styles.mainDesc} reveal-item`} style={{ animationDelay: '0.2s' }}>
                        전략 기획부터 R&D, 교육, 플랫폼, 디자인까지.<br />
                        <span className="energy-line">성공적인 비즈니스를 위한 A to Z 솔루션을 제공합니다.</span>
                    </p>
                </div>

                <div className={styles.grid}>
                    {sectors.map((sector, sIdx) => (
                        <div key={sector.id} className={`${styles.card} reveal-item`} style={{ animationDelay: `${0.3 + sIdx * 0.1}s` }}>
                            <div className={styles.cardHeader}>
                                <h3 className={`${styles.cardTitle} glitch-text`}>{sector.title}</h3>
                                <span className={styles.cardSubtitle}>{sector.subtitle}</span>
                            </div>
                            <ul className={styles.itemList}>
                                {sector.items.map((item, idx) => (
                                    <li key={idx} className={`${styles.item} reveal-item`} style={{ animationDelay: `${0.5 + idx * 0.05}s` }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsServices;
