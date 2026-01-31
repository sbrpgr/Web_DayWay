import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import styles from './ChatSidebar.module.css';
import { portfolioData } from '../data/portfolioData';

const ChatSidebar = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0); // 429 에러 시 쿨다운 타이머 (초)
    const scrollRef = useRef(null);



    // 시스템 프롬프트: 데이웨이(DayWay) 직원 페르소나 및 상세 지식 베이스
    const systemInstruction = `
        **[역할 및 페르소나]**
        당신은 AI/Data 솔루션 파트너 기업 **'데이웨이(DayWay)'의 정규직 사원**입니다.
        단순한 챗봇이 아니라, 회사를 대표하여 고객을 응대하는 **전문적이고 자부심 넘치는 직원**처럼 행동하세요.
        
        **[행동 지침]**
        1. **1인칭 화법 사용**: "데이웨이는~" 이라고 제3자처럼 말하지 말고, **"저희 데이웨이는~"** 또는 **"우리는~"** 이라고 표현하세요.
        2. **전문성 및 자신감**: 답변은 확신에 차 있어야 하며, 비즈니스 매너를 갖춰야 합니다.
        3. **간결성 유지**: 고객의 시간은 소중합니다. 핵심만 요약하여 **3~4문장 내외**로 답변하세요.
        4. **영업 마인드**: 우리 회사의 기술과 성과를 적극적으로(그러나 겸손하게) 어필하세요.
        5. **한국어 응대**: 무조건 자연스러운 한국어로 답변하세요.

        **[회사 정보 지식 베이스]**
        1. **비전 및 슬로건**: "We Engineer Intelligence" (우리는 지능을 설계합니다). 기술과 사람, 비즈니스를 데이터로 연결하여 가치를 창출합니다.
        2. **설립**: 2025년 설립된 스타트업으로, 가장 빠르게 성장하고 있는 AI 파트너입니다.
        3. **핵심 4대 사업 영역 (비즈니스 사이클)**:
           - **Strategy**: 데이터 기반 선거 전략, 입법/정책 기획, 난제 해결 솔루션.
           - **R&D**: 원천 기술 확보 (이상 탐지, 예측 모델, 매칭 플랫폼).
           - **Education**: 기술 확산 (AI 부트캠프, 기업 AX/DX 교육, 디지털 새싹).
           - **Platform & Content**: 수익화 및 가치 구현 (AI 에이전트, 스마트 디자인, 미디어 아트).
        
        **[주요 포트폴리오 및 레퍼런스]**
        고객이 질문하면 아래 실적을 근거로 답변하세요:
        ${JSON.stringify(portfolioData, null, 2)}

        **[대표 서비스 예시]**
        - **Tech-GPT 과제 스코어링 플랫폼**: R&D 역량 증명 (최우수상)
        - **AI 스토킹 탐지 플랫폼**: 사회 안전망 구축 기술
        - **군수품 이상치 탐지 레이더**: 국방 데이터 분석 역량
        - **광주 AI 사관학교 교육**: 교육 전문성 입증
    `;

    useEffect(() => {
        // LocalStorage에서 채팅 기록 불러오기
        const savedMessages = localStorage.getItem('dayway_chat_history');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            // 초기 환영 메시지
            const welcomeMsg = {
                role: 'model',
                parts: [{ text: '안녕하세요. 데이웨이의 AI 어시스턴트입니다. 무엇을 도와드릴까요? 제공해 드리는 정보는 현재 파악된 자료에 기반하며, 상황에 따라 다를 수 있음을 안내드립니다.' }]
            };
            setMessages([welcomeMsg]);
        }
    }, []);

    useEffect(() => {
        // 메시지 변경 시 LocalStorage 저장 및 스크롤 하단 이동
        if (messages.length > 0) {
            localStorage.setItem('dayway_chat_history', JSON.stringify(messages));
        }
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    // 쿨다운 타이머 효과
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading || cooldown > 0) return;

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        console.log("[DEBUG] API Key Present:", !!apiKey);

        if (!apiKey) {
            setMessages(prev => [...prev,
            { role: 'user', parts: [{ text: input }] },
            { role: 'model', parts: [{ text: '⚠️ [시스템 오류] API 키가 로드되지 않았습니다. 개발 서버를 재시작(Ctrl+C 후 npm run dev)해 주세요.' }] }
            ]);
            setInput('');
            return;
        }

        const userMsg = { role: 'user', parts: [{ text: input }] };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);

            // [모델 변경] gemini-flash-latest
            // 테스트 스크립트에서 유일하게 성공했던 모델입니다.
            // 호환성 모드(프롬프트 주입)는 유지합니다.
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
            });

            // 채팅 내역 정리: 빈 메시지 제거
            let chatHistory = messages
                .filter(m => m.parts && m.parts[0] && m.parts[0].text);

            // 첫 메시지가 사용자(user)가 나올 때까지 앞부분 제거
            const firstUserIndex = chatHistory.findIndex(m => m.role === 'user');
            if (firstUserIndex !== -1) {
                chatHistory = chatHistory.slice(firstUserIndex);
            } else {
                chatHistory = [];
            }

            const chat = model.startChat({
                history: chatHistory.map(m => ({
                    role: m.role,
                    parts: m.parts
                })),
            });

            let finalInput = input;

            if (chatHistory.length === 0) {
                finalInput = `${systemInstruction}\n\n[사용자 질문]: ${input}`;
            }

            const result = await chat.sendMessage(finalInput);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: 'model', parts: [{ text }] }]);
        } catch (error) {
            console.error("Gemini API Error:", error);

            let debugMsg = `[시스템 진단] 오류가 발생했습니다.\n\n상세 내용: ${error.message || error.toString()}`;

            if (error.message.includes('API key')) {
                debugMsg += '\n-> 진단: API 키가 유효하지 않거나 로드되지 않았습니다.';
            } else if (error.message.includes('404')) {
                debugMsg += '\n-> 진단: 지정된 모델을 찾을 수 없거나 접근 권한이 없습니다.';
            } else if (error.message.includes('429')) {
                // Rate Limit 발생 시 쿨다운 60초 설정
                const waitTime = 60;
                setCooldown(waitTime);
                debugMsg = `⚠️ 사용랑이 많아 잠시 제한되었습니다.\n약 ${waitTime}초 뒤에 자동으로 풀립니다. 잠시만 기다려주세요...`;
            }

            setMessages(prev => [...prev, { role: 'model', parts: [{ text: debugMsg }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearHistory = () => {
        if (window.confirm('채팅 기록을 모두 삭제하시겠습니까?')) {
            const welcomeMsg = { role: 'model', parts: [{ text: '채팅 기록이 삭제되었습니다. 새로 시작합니다.' }] };
            setMessages([welcomeMsg]);
            localStorage.removeItem('dayway_chat_history');
        }
    };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.header}>
                <div className={styles.titleArea}>
                    <span className={styles.icon}>🤖</span>
                    <div>
                        <h3 className={styles.title}>DayWay AI</h3>
                        <span className={styles.status}>Online Assistant</span>
                    </div>
                </div>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
            </div>

            <div className={styles.chatArea} ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.aiWrapper}`}>
                        <div className={styles.message}>
                            {msg.parts[0].text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className={styles.loadingWrapper}>
                        <div className={styles.loadingDots}>
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
            </div>

            <form className={styles.inputArea} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={cooldown > 0 ? `${cooldown}초 뒤에 입력 가능합니다...` : "데이웨이에 대해 질문해 보세요..."}
                    className={styles.input}
                    disabled={isLoading || cooldown > 0}
                />
                <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim() || cooldown > 0}>
                    <span className="emoji-align">{cooldown > 0 ? '⏳' : '🚀'}</span>
                </button>
            </form>

            <button className={styles.clearBtn} onClick={clearHistory}>
                채팅 기록 초기화
            </button>
        </div>
    );
};

export default ChatSidebar;
