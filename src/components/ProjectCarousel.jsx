import React, { useState, useEffect } from 'react';
import styles from './ProjectCarousel.module.css';

// Import images again for mapping inside the carousel if passed as string keys
import dashboardUi from '../assets/dashboard-ui.png';
import educationBg from '../assets/education-bg.png';
import platformBg from '../assets/platform-bg.png';
import safelightBg from '../assets/safelight-bg.png';
import projectRadar from '../assets/project-radar.png';
import projectAiClass from '../assets/project-ai-class.png';
import projectPopMap from '../assets/project-population-map.png';
import projectTourism from '../assets/project-tourism-goods.png';
import certUnification from '../assets/cert_unification.jpg';
import certElectric from '../assets/cert_electric.jpg';
import certPolice from '../assets/cert_police.jpg';
import certTechgpt from '../assets/cert_techgpt.jpg';
import certGwangju from '../assets/cert_gwangju.jpg';
import realRadar from '../assets/real-radar.png';
import complexDataViz from '../assets/complex-data-viz.png';


const imageMap = {
    "dashboard-ui.png": dashboardUi,
    "education-bg.png": educationBg,
    "platform-bg.png": platformBg,
    "safelight-bg.png": safelightBg,
    "project-radar.png": projectRadar,
    "project-ai-class.png": projectAiClass,
    "project-population-map.png": projectPopMap,
    "project-tourism-goods.png": projectTourism,
    "cert_unification.jpg": certUnification,
    "cert_electric.jpg": certElectric,
    "cert_police.jpg": certPolice,
    "cert_techgpt.jpg": certTechgpt,
    "cert_gwangju.jpg": certGwangju,
    "real-radar.png": realRadar,
    "complex-data-viz.png": complexDataViz
};

const ProjectCarousel = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [projects.length]);

    const currentImage = imageMap[projects[currentIndex].image] || dashboardUi;
    const isCertificate = projects[currentIndex].image.includes('cert_');

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.slide}>
                {/* Visual Background Card */}
                <div
                    className={`${styles.visualCard} ${isCertificate ? styles.certificateMode : ''}`}
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
