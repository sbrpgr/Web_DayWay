import React, { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null, radius: 200 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height, animationFrameId;
        let particles = [];
        let bullets = [];
        const gridSize = 50;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (event) => {
            mouseRef.current.x = event.clientX;
            mouseRef.current.y = event.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        const handleMouseDown = () => {
            // Shooting Burst on click
            for (let i = 0; i < 8; i++) {
                bullets.push(new Bullet(mouseRef.current.x, mouseRef.current.y));
            }
        };

        class Bullet {
            constructor(x, y) {
                this.x = x || width / 2;
                this.y = y || height / 2;
                const angle = Math.random() * Math.PI * 2;
                const speed = 15 + Math.random() * 5;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.size = 3;
                this.life = 1.0;
                this.decay = 0.02 + Math.random() * 0.02;
                this.color = '#fff';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#4cc9f0';
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                // Move orthogonally
                const speed = 0.5 + Math.random() * 1.5;
                const dir = Math.floor(Math.random() * 4);
                this.vx = dir === 0 ? speed : dir === 1 ? -speed : 0;
                this.vy = dir === 2 ? speed : dir === 3 ? -speed : 0;

                this.size = Math.random() * 3 + 1;
                this.color = Math.random() > 0.6 ? '#4cc9f0' : '#7209b7';
                this.pulse = Math.random() * Math.PI;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Randomly change direction occasionally to feel like a circuit
                if (Math.random() < 0.005) {
                    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                    const dir = Math.floor(Math.random() * 4);
                    this.vx = dir === 0 ? speed : dir === 1 ? -speed : 0;
                    this.vy = dir === 2 ? speed : dir === 3 ? -speed : 0;
                }

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                this.pulse += 0.05;
            }

            draw() {
                const s = this.size + Math.sin(this.pulse) * 1.5;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;

                // Draw as a bit/square
                ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s);
                ctx.shadowBlur = 0;
            }
        }

        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(76, 201, 240, 0.05)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        };

        const drawTraces = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(76, 201, 240, ${(1 - dist / 150) * 0.2})`;
                        ctx.lineWidth = 1;

                        // Orthogonal trace (circuit style)
                        ctx.moveTo(particles[i].x, particles[i].y);
                        if (Math.random() > 0.5) {
                            ctx.lineTo(particles[j].x, particles[i].y);
                        } else {
                            ctx.lineTo(particles[i].x, particles[j].y);
                        }
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const init = () => {
            particles = [];
            bullets = [];
            const particleCount = (width * height) / 20000;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            drawGrid();
            drawTraces();

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
            }

            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].update();
                bullets[i].draw();
                if (bullets[i].life <= 0) {
                    bullets.splice(i, 1);
                }
            }

            // Mouse highlight aura
            if (mouseRef.current.x !== null) {
                ctx.save();
                const gradient = ctx.createRadialGradient(
                    mouseRef.current.x, mouseRef.current.y, 0,
                    mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius
                );
                gradient.addColorStop(0, 'rgba(76, 201, 240, 0.15)');
                gradient.addColorStop(1, 'rgba(76, 201, 240, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousedown', handleMouseDown);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousedown', handleMouseDown);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default ParticleBackground;
