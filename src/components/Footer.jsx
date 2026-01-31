import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer id="contact" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <h2>DAYWAY</h2>
                        <p>AI & Data Based Solution Partner</p>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.group}>
                            <h3>Contact</h3>
                            <p>Email: dayway.ict@gmail.com</p>
                            <p>Tel: 010-3643-7544</p>
                        </div>
                        <div className={styles.group}>
                            <h3>Info</h3>
                            <p>주소: 전남 목포시 석현로 46 전남진흥원벤처문화센터 데이웨이</p>
                            <p>대표자: 김대운</p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; 2026 Dayway. All rights reserved.</p>
                    <p>Designed emphasizing Premium, Dark, Tech values.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
