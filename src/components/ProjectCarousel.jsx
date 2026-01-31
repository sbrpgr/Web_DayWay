import React, { useState, useEffect } from 'react';
import styles from './ProjectCarousel.module.css';

// Portfolio Images Only
import portfolio01 from '../assets/portfolio/01_Tech-GPT_과제스코어링플랫폼.png';
import portfolio02 from '../assets/portfolio/02_AI스토킹탐지플랫폼.png';
import portfolio03 from '../assets/portfolio/03_군수품단가이상치탐지플랫폼.png';
import portfolio04 from '../assets/portfolio/04_AI과제매칭플랫폼.png';
import portfolio05 from '../assets/portfolio/05_샌드박스디지털범죄방어시스템.png';
import portfolio06 from '../assets/portfolio/06_항만물동량예측플랫폼.png';
import portfolio07 from '../assets/portfolio/07_디지털취약계층모바일방어시스템.png';
import portfolio08 from '../assets/portfolio/08_이스트소프트_광주AI사관학교교육.png';
import portfolio09 from '../assets/portfolio/09_중소기업AXDX컨설팅교육.png';
import portfolio10 from '../assets/portfolio/10_한국과학창의재단_디지털새싹사업.png';
import portfolio11 from '../assets/portfolio/11_공공기관중소기업AI자동화교육.png';
import portfolio12 from '../assets/portfolio/12_AI챗봇리서치솔루션.png';
import portfolio13 from '../assets/portfolio/13_기업AX전환컨설팅솔루션.png';
import portfolio14 from '../assets/portfolio/14_기상위험경고아트라이트.png';
import portfolio15 from '../assets/portfolio/15_로컬아티스트아트LED오브제.png';
import portfolio16 from '../assets/portfolio/16_여수LED굿즈.png';

const imageMap = {
    "portfolio/01_Tech-GPT_과제스코어링플랫폼.png": portfolio01,
    "portfolio/02_AI스토킹탐지플랫폼.png": portfolio02,
    "portfolio/03_군수품단가이상치탐지플랫폼.png": portfolio03,
    "portfolio/04_AI과제매칭플랫폼.png": portfolio04,
    "portfolio/05_샌드박스디지털범죄방어시스템.png": portfolio05,
    "portfolio/06_항만물동량예측플랫폼.png": portfolio06,
    "portfolio/07_디지털취약계층모바일방어시스템.png": portfolio07,
    "portfolio/08_이스트소프트_광주AI사관학교교육.png": portfolio08,
    "portfolio/09_중소기업AXDX컨설팅교육.png": portfolio09,
    "portfolio/10_한국과학창의재단_디지털새싹사업.png": portfolio10,
    "portfolio/11_공공기관중소기업AI자동화교육.png": portfolio11,
    "portfolio/12_AI챗봇리서치솔루션.png": portfolio12,
    "portfolio/13_기업AX전환컨설팅솔루션.png": portfolio13,
    "portfolio/14_기상위험경고아트라이트.png": portfolio14,
    "portfolio/15_로컬아티스트아트LED오브제.png": portfolio15,
    "portfolio/16_여수LED굿즈.png": portfolio16
};

const ProjectCarousel = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [projects.length]);

    const currentImage = imageMap[projects[currentIndex].image] || portfolio01;

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.slide}>
                <div
                    className={styles.visualCard}
                    style={{ backgroundImage: `url(${currentImage})` }}
                >
                    <div className={styles.overlay}>
                        <div className={styles.cardHeader}>
                            <span className={styles.category}>{projects[currentIndex].category}</span>
                        </div>
                        <h4 className={styles.contestName}>{projects[currentIndex].item}</h4>
                        <p className={styles.organizer}>{projects[currentIndex].organizer}</p>
                    </div>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.indicators}>
                    {projects.map((_, idx) => (
                        <span
                            key={idx}
                            className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCarousel;
