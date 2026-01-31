import React, { useState } from 'react';
import styles from './Achievements.module.css';

const awards = {
    tech: [
        { title: '제 1회 Tech-GPT 서비스 경진대회 최우수상', issuer: '산자부/KEA', desc: 'Tech-GPT 기반 과제 스코어링 플랫폼' },
        { title: '11회 과학치안 아이디어 공모전 우수상', issuer: '과기부/경찰청', desc: 'AI 및 데이터 기반 스토킹 탐지 및 평가 플랫폼' },
        { title: '합동 데이터 공모전 최우수상', issuer: '국방부/병무청·방사청·질병청', desc: '군수품 단가 이상치 탐지 레이더' },
        { title: '2025년 대국민 혁신아이디어 공모전 대상', issuer: '중소기업기술정보진흥원', desc: 'AI 기반 과제 매칭 플랫폼' },
        { title: '2025년 자격증 활용 우수사례 회장상', issuer: '대한상공회의소' }
    ],
    content: [
        { title: '14회 도로 경관디자인 대전 최우수상', issuer: '국토부/한국도로공사', desc: 'AI 및 고휘도 LED 기반 기상 위험 경고 아트라이트' },
        { title: '2025년 통일문화 콘텐츠 공모전 통일부장관상', issuer: '통일부', desc: '슬로건 부문' },
        { title: '2025년 광주방문의해 관광 상품 공모전 동상', issuer: '광주디자인진흥원', desc: '로컬 아티스트 매칭 아트 오브제' },
        { title: '2025년 전라남도 섬·해양 관광 콘텐츠 발굴 공모전 장려상', issuer: '전남관광재단', desc: '여수 LED 굿즈' }
    ],
    policy: [
        { title: '2025년도 입법 및 정책 제안대회 우수제안상', issuer: '국회입법조사처', desc: '교통약자 배려를 위한 자가용 유상운수체계 개선안' },
        { title: '제2회 국회 인구 포럼 대한민국 인구 페스티벌 우수상', issuer: '인구보건복지협회', desc: 'AI 및 데이터 기반 맞춤형 인구전략 수립 방안' },
        { title: '전기에너지 국민 아이디어 공모 우수상', issuer: '대한전기협회/한국전력', desc: 'DC 기반 전력 거래 전용 요금 기획안' }
    ],
    upcoming: [
        { title: '2025년 광산구청장 표창', issuer: '광주광역시 광산구' },
        { title: '2025년 과학기술정보통신부장관 표창', issuer: '과기부' },
        { title: '2025년 교육부장관 표창', issuer: '교육부' },
        { title: 'AI 라이프 아이디어 챌린지', issuer: '한국산업기술기획평가원', desc: '샌드박스 기반 디지털 범죄 방어 AI 시스템' }
    ]
};

const Achievements = () => {
    const [activeTab, setActiveTab] = useState('tech');

    return (
        <section id="achievements" className={styles.achievements}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={`${styles.title} cyber-header energy-line`}>Innovation & Recognition</h2>
                    <p className={styles.subtitle}>
                        데이웨이의 끊임없는 도전과 혁신은 다양한 분야에서 인정받고 있습니다.
                    </p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'tech' ? styles.active : ''}`}
                        onClick={() => setActiveTab('tech')}
                    >
                        AI / Data Technology
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'content' ? styles.active : ''}`}
                        onClick={() => setActiveTab('content')}
                    >
                        Design & Content
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'policy' ? styles.active : ''}`}
                        onClick={() => setActiveTab('policy')}
                    >
                        Strategy & Policy
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'upcoming' ? styles.active : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming Reviews
                    </button>
                </div>

                <div className={styles.list}>
                    {awards[activeTab].map((award, index) => (
                        <div key={index} className={styles.item}>
                            <div className={`${styles.rankBadge} emoji-align`}>
                                {award.title.includes('대상') || award.title.includes('장관상') ? '🏆' : '🏅'}
                            </div>
                            <div className={styles.info}>
                                <h3 className={`${styles.awardTitle} energy-line`}>{award.title}</h3>
                                <span className={styles.issuer}>{award.issuer}</span>
                                {award.desc && <p className={styles.desc}>{award.desc}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.patent}>
                    <h3 className="energy-line">Patent Registration</h3>
                    <div className={styles.patentItem}>
                        <strong>10-2025-0172530</strong>
                        <span>디지털 취약 계층의 사기 피해 방지를 위한 실시간 다중 분석 AI 에이전트 기반 모바일 방어 시스템</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
