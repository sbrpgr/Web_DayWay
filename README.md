# DayWay: Engineering Intelligence

데이웨이는 데이터를 통해 도시와 기업의 복잡한 문제를 해결하는 AI 솔루션 파트너입니다. 
본 프로젝트는 데이웨이의 브랜드 가치와 기술력을 전문 에이전시 수준의 디자인으로 구현한 공식 웹사이트입니다.

## 🚀 Version 1.0.0 (Phase 1 완성)

본 버전은 "Professional Agency Level"로의 디자인 고도화가 완료된 첫 번째 정식 버전입니다. 
HTML 구조를 유지하면서 오직 CSS와 콘텐츠 스타일링만으로 프리미엄 테크 사를 위한 UX/UI를 구축했습니다.

### 핵심 디자인 시스템

- **8px Grid System**: 모든 여백과 패딩은 8px의 배수(`var(--space-1)` ~ `var(--space-12)`)로 정육화되었습니다.
- **Typography**: 
  - `Inter` 폰트 기반의 정교한 타이포그래피 위계.
  - 전역 `letter-spacing: -0.02em` 적용으로 가독성과 세련미 확보.
  - 임팩트 있는 제목을 위한 `font-weight: 900` 적극 활용.
- **Dark Premium Aesthetic**: 
  - 정교한 다크 그레이 팔레트(`#0a0a0c`, `#14141c`) 도입.
  - 부드러운 전송 효과(`cubic-bezier`)와 소프트 쉐도우 적용.
- **Emoji Optimization**: `.emoji-align` 유틸리티를 통한 이모지 수평 정렬 및 투명도 밸런싱.

## 🛠 Technology Stack

- **Core**: React 18
- **Build Tool**: Vite
- **Styling**: CSS Modules (Vanilla CSS 기반)
- **Animation**: GSAP, CSS Animations
- **Icons/Emoji**: Standard Unicode Emojis with custom styling

## 📂 Project Structure

- `src/components/`: 기능별 고도화된 UI 컴포넌트
- `src/assets/`: 프리미엄 16:9 포트폴리오 이미지 및 에셋
- `src/data/`: 포트폴리오 및 서비스 명세 데이터
- `src/index.css`: 전역 디자인 시스템 변수 및 유틸리티

---

© 2025 DayWay. All Rights Reserved.
"We Engineer Intelligence."
