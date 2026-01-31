import React, { useState } from 'react';
import styles from './Portfolio.module.css';
import ProjectCarousel from './ProjectCarousel';
import { portfolioData } from '../data/portfolioData';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('strategy');

    const tabs = [
        { id: 'strategy', label: 'Strategy' },
        { id: 'rnd', label: 'R&D' },
        { id: 'education', label: 'Education' },
        { id: 'platform', label: 'Platform' },
        { id: 'design', label: 'Design' }
    ];

    // Format data for carousel: map from portfolioData structure to ProjectCarousel expected format
    const getFormattedProjects = (category) => {
        return portfolioData[category].projects.map(project => ({
            category: portfolioData[category].title,
            item: project.text,
            organizer: '', // Some lack explicit organizers in this structure
            image: project.image
        }));
    };

    return (
        <section id="portfolio" className={styles.portfolio}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={`${styles.title} cyber-header energy-line`}>Business Portfolio</h2>
                    <p className={styles.subtitle}>
                        분야별 주요 실적과 프로젝트를 통해 증명된 데이웨이의 가치입니다.
                    </p>
                </div>

                <div className={styles.tabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className={styles.content}>
                    <div className={styles.description}>
                        <h3>{portfolioData[activeTab].title}</h3>
                        <p>{portfolioData[activeTab].competency}</p>
                    </div>

                    <div className={styles.carouselWrapper}>
                        <ProjectCarousel projects={getFormattedProjects(activeTab)} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
