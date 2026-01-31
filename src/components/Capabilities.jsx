import React, { useState, useEffect } from 'react';
import styles from './Capabilities.module.css';
import { portfolioData } from '../data/portfolioData';

// Image mapping 
import dashboardUi from '../assets/dashboard-ui.png';
import educationBg from '../assets/education-bg.png';
import platformBg from '../assets/platform-bg.png';
import safelightBg from '../assets/safelight-bg.png';
import projectRadar from '../assets/project-radar.png';
import projectAiClass from '../assets/project-ai-class.png';
import projectPopMap from '../assets/project-population-map.png';
import projectTourism from '../assets/project-tourism-goods.png';
import realRadar from '../assets/real-radar.png';
import complexDataViz from '../assets/complex-data-viz.png';
import certElectric from '../assets/cert_electric.jpg';
import strategyKorea from '../assets/strategy-korea.png';
import rndKorea from '../assets/rnd-korea.png';
import eduKorea from '../assets/edu-korea.png';

const imageMap = {
    "dashboard-ui.png": dashboardUi,
    "education-bg.png": educationBg,
    "platform-bg.png": platformBg,
    "safelight-bg.png": safelightBg,
    "project-radar.png": projectRadar,
    "project-ai-class.png": projectAiClass,
    "project-population-map.png": projectPopMap,
    "project-tourism-goods.png": projectTourism,
    "real-radar.png": realRadar,
    "complex-data-viz.png": complexDataViz,
    "cert_electric.jpg": certElectric,
    "strategy-korea.png": strategyKorea,
    "rnd-korea.png": rndKorea,
    "edu-korea.png": eduKorea
};

const ImageSlider = ({ projects }) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIdx(prev => (prev + 1) % projects.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [projects.length]);

    return (
        <div className={styles.sliderContainer}>
            <div
                className={styles.slideImage}
                style={{ backgroundImage: `url(${imageMap[projects[idx].image] || dashboardUi})` }}
            />
        </div>
    );
};

const CapabilitySection = ({ data }) => {
    return (
        <div className={styles.section}>
            <div className={styles.headerArea}>
                <h3 className={styles.sectionTitle}>{data.title}</h3>
                <p className={styles.competency}>{data.competency}</p>
            </div>

            {/* Top: Visual Slider (Large) */}
            <div className={styles.imageArea}>
                <ImageSlider projects={data.projects} />
            </div>

            {/* Bottom: Content List */}
            <div className={styles.contentArea}>
                <div className={styles.projectList}>
                    {data.projects.map((proj, idx) => (
                        <div key={idx} className={styles.projectItem}>
                            <span className={styles.bullet}>•</span>
                            <span className={styles.projectText}>{proj.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Capabilities = () => {
    const sections = Object.values(portfolioData);

    return (
        <section id="portfolio" className={styles.capabilities}>
            <div className={styles.container}>
                <h2 className={`${styles.mainTitle} cyber-header flicker`}>Business Portfolio</h2>
                <div className={styles.list}>
                    {sections.map((item, idx) => (
                        <div key={idx} className="reveal-item" style={{ animationDelay: `${idx * 0.2}s` }}>
                            <CapabilitySection data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
