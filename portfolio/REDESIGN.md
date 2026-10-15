# REDESIGN — Jang Hoon Min Portfolio (index.html)

재시작 후 이 파일을 기준으로 작업을 이어간다. 작업 브랜치: `upgrade` (main은 건드리지 않음). 섹션 하나를 마칠 때마다 playwright로 데스크톱(1440px)과 모바일(390px)에서 확인하고 커밋한다.

## 0. 결정 대기 (작업 시작 전 확인)
- [x] **기준점**: `Desktop\portfolio`(git) 현재 내용 그대로. 복사본에서는 leporem.html, ikseondong.html의 모바일 CSS만 검토했다. 390px에서 확인해 보니 leporem의 `.lp-meta`(2열일 때 3번째 칸에 왼쪽 선이 남음)와 `.lp-credits`(4열이라 칸 폭이 84px) 규칙만 필요해서 반영했다. `.lp-next`와 `.cs-next`는 390px에서도 한 줄에 들어가서 반영하지 않았다.
- [x] **대표작 3개**: Leporem, 청정익선, Breathing Structure (확정).
- [x] **Hero 배경 이미지**: 뺀다 (확정).
- [x] **나머지 목록**: 버튼 없이 항상 펼쳐 둔 한 줄 목록(`번호 — 이름 — 분야 — 연도`)으로 둔다. 호버하면 썸네일이 나온다. 목록은 10개다.
- [x] **설치 파일**: `.claude/`, `.mcp.json`, `skills-lock.json`, `.playwright-mcp/`는 `.gitignore`에 추가해 사이트에 올라가지 않게 한다.

## 1. 방향
- 핵심 콘셉트: **"보이지 않는 구조를 설계하는 디자이너"**. 그리드, 선, 정렬 같은 구조가 드러났다가 사라지게 한다.
- 스타일
  - **Swiss / International Style**: 12컬럼 그리드, 비대칭, 흑백 + 강조색 1개
  - **Editorial Typography**: 큰 제목, 넓은 여백, 컬럼 리듬
  - **Technical Blueprint는 포인트로만**: 얇은 가이드선, 고정폭 주석 라벨, 섹션 번호(01, 02 …)
- 금지: 보라·하늘색 그라데이션, 유리 효과 패널, 의미 없는 아이콘, 모든 걸 다 움직이게 하기. 기존의 커서 glow, 3D 유리 큐브 배경, "STRUCTURE" 세리프 워터마크도 이 기준으로 정리한다.

## 2. 폰트 (4종)
| 용도 | 폰트 |
|---|---|
| 영문 디스플레이 | Instrument Serif (em 강조는 이탤릭) |
| 본문 / UI | Inter Tight |
| 한글 | Pretendard (CDN) |
| 주석 / 메타 | IBM Plex Mono — 번호, 연도, 카테고리, 섹션 번호, 라벨 |

Abril Fatface와 Playfair Display는 제거한다.

## 3. 색
| 토큰 | 라이트 | 다크 |
|---|---|---|
| `--paper` (배경) | #F4F3EF | #0E0E0F |
| `--ink` (본문) | #111111 | #EDEDEA |
| `--ink-2` (보조) | 회색 1단계 | 회색 1단계 |
| `--line` (가이드선) | 회색 2단계 (아주 옅게) | 회색 2단계 |
| `--accent` | #2B4BFF | #2B4BFF (필요하면 밝기만 조정) |

강조색은 링크, 포커스, 그리드 강조에만 쓴다. 다크모드 토글과 기존 localStorage 키(`portfolio-theme-v2`)는 유지한다.

## 4. 레이아웃 (섹션별)
- **Grid layer**: 12컬럼 세로 가이드선(1px)을 배경 레이어로 둔다. 평소에는 거의 보이지 않고, 로딩 연출 때만 드러난다.
- **Nav**: 로고 / 링크 / 테마 토글 / 햄버거. 모바일에서 토글 위치가 어긋나고 햄버거가 안 보이는 문제를 고친다.
- **Hero**: 한글 핵심 문장을 크게 왼쪽 정렬로 그리드에 맞춘다. 이름, 역할, View Profile, CTA는 아래 메타 줄로 둔다. 배경 이미지는 약하게 하거나 제거한다.
- **Marquee → 정적인 한 줄**로 바꾼다. 움직이지 않는 키워드 줄이다.
- **About**: 짧게 펼쳐 둔다("Show ▼" 제거). 접근법 01–05는 고정폭 번호로 표시한다.
- **Work**
  - 대표작 3개만 크게 보여준다(비대칭 배치: 전체 폭 1 + 7:5 2 등). **카드 호버 크롭 마크는 대표작 카드에만** 넣는다.
  - 나머지는 **이미지 없는 한 줄 목록**으로 둔다. `번호 — 이름 — 분야 — 연도`, 고정폭 글씨로 쓰고 가는 rule로 줄을 구분한다.
  - 데스크톱: 줄에 마우스를 올리면 그 줄 옆에 썸네일이 나타난다(`hover: hover` + `pointer: fine`에서만).
  - 모바일: 작은 썸네일을 줄 왼쪽에 고정으로 보여준다.
  - 모든 줄과 카드는 기존 상세 페이지 링크를 그대로 쓴다.
- **Awards**: 짧게 펼쳐 두고 `연도 | 제목 | 기관 | 상` 표로 보여준다. 모바일에서는 2줄 스택으로 바꾼다.
- **Contact / Footer**: 큰 에디토리얼 제목과 이메일. 여백을 넓게 둔다.
- **Profile drawer**: 수상 내역은 **요약만** 둔다(예: 대표 수상 1–2개 + "전체 수상 내역은 Awards 섹션 참고"). 나머지 블록은 유지한다.

## 5. 모션 (이 5개만)
1. **첫 로딩**: 그리드 선이 위에서 아래로 그어진다 → hero 문장이 줄 단위로 마스크 리빌 → 그리드 선이 옅어지며 사라진다. 1.4초 안에 끝나고 세션당 한 번만 재생한다.
2. **스크롤 등장**: 섹션 머리의 가로 rule이 그어지고, 내용이 8px 위로 페이드인한다. IntersectionObserver를 쓰고 한 번만 재생한다.
3. **카드 호버(대표작만)**: 크롭 마크/정렬 가이드가 나타나고, 이미지가 1.02배 커지며 화살표가 이동한다. 목록 줄 호버에서는 썸네일만 나타난다.
4. **프로필 서랍**: 오른쪽에서 슬라이드 + 오버레이 페이드, 내부 블록은 순차 등장. focus trap과 ESC 닫기, 닫을 때 트리거로 포커스를 되돌린다.
5. **prefers-reduced-motion**: 위 모든 모션을 즉시 표시나 짧은 opacity 페이드로 바꾼다. 로딩 연출은 생략한다.

transform/opacity만 애니메이션한다(레이아웃 속성 금지). easing은 ease-out 계열, 지속시간은 150–500ms로 한다(로딩 연출 제외).

## 6. 지켜야 할 것
- 텍스트 내용, 이미지 경로, 링크, 상세 페이지(*.html)는 바꾸지 않는다.
- `upgrade` 브랜치에서만 작업하고 단계마다 커밋한다. main은 건드리지 않는다.
- `style.css`는 상세 페이지 17개가 함께 쓴다. 리디자인 스타일은 index.html만 불러오는 `home.css`에 넣고 `style.css`는 수정하지 않는다.
- 다크모드 토글은 유지한다.

## 7. 진행 순서
1. ✅ 기준점 확정 커밋
2. ✅ 토큰, 폰트, 그리드 레이어 — `home.css`(index.html 전용)
3. ✅ Nav + Hero (+ 정적 키워드 줄) — hero 배경 3D 이미지·워터마크 제거(그리드 레이어가 "구조" 역할), 모바일 nav 960px 이하 햄버거
4. Work — 대표작
5. Work — 목록 + 호버 썸네일
6. About
7. Awards 표 + Contact + Footer
8. Profile drawer (요약 + 모션)
9. 모션 정리 + reduced-motion
10. `/review-animations`로 모션 검토, 모바일 최종 확인

## 8. 검토 도구
- 설치된 프로젝트 스킬: `review-animations`, `improve-animations`, `animation-performance`, `emil-design-eng`, `design-taste-frontend`, `impeccable` 등 (`.claude/skills`)
- playwright MCP: `.mcp.json`(project scope)

---

## 부록 — 폴더 비교 결과 (2026-10-15)
날짜는 `Desktop\portfolio`의 git 커밋 기준이다. 체크아웃 때문에 파일 수정 시각이 모두 오늘로 찍혀 있어서 수정 시각은 쓰지 않았다.
복사본의 파일 수정 시각은 모두 2026-05-19이다. portfolio의 index.html 최근 커밋은 2026-10-06이다.

| 구분 | 파일 | 더 최근 |
|---|---|---|
| 동일 | 이미지 전체(`메인 이미지/**`, 프로필, 다크/라이트모드 webp) 등 56개 | — |
| 다름 | index.html, style.css, script.js, profile.html, portfolio-web.html, 상세 페이지 11개 | portfolio |
| portfolio에만 | og-image.png, og-image.webp, project.html, package.json, package-lock.json | — |
| 복사본에만 | 없음 | — |

**index.html 내용 차이**
| 항목 | portfolio (git) | 복사본 |
|---|---|---|
| 메뉴 / 섹션 제목 | "Awards & Projects" | "Awards" |
| Marquee 띠 | 없음 | 있음 |
| About 접근법 번호 01–05 | 없음 | 있음 |
| 작업 카드 구조 | 카드 전체가 `<a>` 링크 | `<article>` + "View Project ↗" pill |
| Awards | 8개 (2026 동상, 우수 연구상, 공로상 추가) | 5개 |
| Projects 목록 (순천시 펫 필름 페스타, 해양수산연구원 캠페인) | 있음 | 없음 |
| 서랍: Experience / Career / Projects 블록 | 분리, 운영위원 2건 추가 | Career & Experience 하나 |
| 서랍 Tools | Premiere Pro | After Effects |
| 날짜·명칭 표기 | 간략화(예: 2025~2026, "일반대학원") | 상세 날짜 |

**그 외 파일**
- script.js: portfolio 쪽에 "페이지 맨 아래에서 마지막 섹션 메뉴 활성화" 로직이 추가됐다.
- style.css: 복사본에는 marquee, 번호, view-pill 스타일이 있고, portfolio에는 Awards 그룹 제목 스타일이 있다.
- 상세 페이지: 공통으로 메뉴 "Awards & Projects"로 바뀌었고, 본문이 존댓말로 바뀌었다(ikseondong, portfolio-web 등). nunchi, portfolio-web 태그라인이 짧아졌다.
- ⚠ 복사본 leporem.html과 ikseondong.html에는 모바일 반응형 CSS 규칙(`.lp-meta`, `.lp-credits`, `.lp-next`, `.cs-next`)이 있는데 portfolio 쪽에는 없다. 의도한 삭제인지 확인이 필요하다.
