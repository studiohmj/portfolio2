# DESIGN.md — Jang Hoon Min Portfolio

> Daylight editorial gallery. Bone-paper walls, one black stage for the work, light oversized type floating in negative space.

시각 규칙의 유일한 기준. 색·글자 크기·간격·라운드는 이 파일에 있는 값만 쓴다. 새 값을 만들지 않는다.
무엇을 어떤 순서로 만들지는 SPEC.md가 정한다. 둘이 충돌하면 시각 값은 DESIGN.md, 내용·구조·인터랙션은 SPEC.md를 따른다.

출처: Refero Styles의 Josephmark 스타일(https://styles.refero.design/style/58c0af12-8706-428f-8282-482d57d7b90e)을 기반으로 이 포트폴리오에 맞게 고쳤다.
바꾼 점: 검은 화면 기본 → 미색 종이 기본 / 강조색 taupe → 블루 1개(조형물·포스터의 파란 요소와 연결) / Scto Grotesk → Inter + Pretendard.

---

## 1. Tokens — Colors

| Name | Light theme | Dark theme | Token | Role |
|---|---|---|---|---|
| Bone | `#F4F3EF` | `#0E0E0F` | `--c-bg` | 기본 캔버스(종이) |
| Void | `#0B0B0C` | `#000000` | `--c-stage` | 검은 무대 섹션(Work, Contact) 배경 |
| Ink | `#111111` | `#F4F3EF` | `--c-ink` | 제목 |
| Body | `#4A4D46` | `#C9C7C1` | `--c-body` | 본문(따뜻한 짙은 회색) |
| Graphite | `#6A6862` | `#9A9891` | `--c-muted` | 보조 글자, 라벨, 메타 |
| Hairline | `rgba(17,17,17,.12)` | `rgba(244,243,239,.14)` | `--c-line` | 구분선 |
| On-stage text | `#F4F3EF` | `#F4F3EF` | `--c-on-stage` | 검은 무대 위 글자 |
| On-stage muted | `#9A9891` | `#9A9891` | `--c-on-stage-muted` | 검은 무대 위 보조 글자 |
| Blue | `#2B4BFF` | `#5B76FF` | `--c-accent` | 유일한 채도색. 링크 hover 밑줄, 현재 메뉴 표시 점 하나 |

- 다크 테마에서는 Bone 섹션이 `#0E0E0F`가 되고, Void 무대는 `#000000`으로 한 단계 더 깊어진다. 두 테마 모두 섹션 리듬(밝음/어두움 차이)이 유지돼야 한다.
- 작업 이미지 외에는 색을 쓰지 않는다. 사이트에서 유일하게 색이 많은 것은 작업물이어야 한다.

## 2. Tokens — Typography

### Families (2개만)
- **Inter** (`--f-en`): 영문·숫자·라벨. weights 300, 400, 500
- **Pretendard Variable** (`--f-ko`): 한글. weights 300, 400, 500
- `font-family: var(--f-en), var(--f-ko), system-ui, sans-serif;` 한 줄로 쓴다(영문은 Inter, 한글은 Pretendard로 자동 분기)
- 숫자는 `font-variant-numeric: tabular-nums;`

### Type Scale

| Role | Size (desktop / mobile) | Weight | Line height | Letter spacing | Token |
|---|---|---|---|---|---|
| display | 112px / 52px | 300 | 1.0 | -0.04em | `--t-display` |
| heading | 56px / 34px | 300 | 1.1 | -0.03em | `--t-heading` |
| heading-sm | 28px / 22px | 400 | 1.2 | -0.025em | `--t-heading-sm` |
| subheading | 20px / 18px | 400 | 1.35 | -0.02em | `--t-sub` |
| body | 17px / 16px | 400 | 1.55 (한글 1.65) | -0.01em (한글 0) | `--t-body` |
| body-sm | 14px | 400 | 1.45 | -0.01em | `--t-body-sm` |
| label | 12px | 500 | 1.2 | +0.06em, UPPERCASE | `--t-label` |

- 위계는 **크기와 색**으로 만든다. 굵기는 300 → 400 → 500까지만.
- 한글 제목은 자간을 영문보다 덜 줄인다(-0.02em까지).

## 3. Tokens — Spacing & Shape

**Base unit:** 8px. 모든 간격은 8의 배수.

| Token | Value | Use |
|---|---|---|
| `--s-1` | 8px | 아이콘·텍스트 간격 |
| `--s-2` | 16px | 요소 간격 |
| `--s-3` | 24px | 카드 안쪽 여백, 컬럼 간격 |
| `--s-5` | 40px | 섹션 제목 ↔ 본문 |
| `--s-8` | 64px | 블록 사이 |
| `--s-12` | 96px | 모바일 섹션 상하 여백 |
| `--s-20` | 160px | 데스크톱 섹션 상하 여백 |

**Grid:** 12 columns, gutter 24px, side margin 48px(모바일 20px), max content width 1440px. 무대(Void) 섹션의 배경은 화면 끝까지(full-bleed), 내용은 격자 안.

**Radius:**
| Element | Value |
|---|---|
| 버튼, 태그 | 9999px (pill) |
| 이미지, 카드, 패널, 입력창 | 0px |

**Elevation:** 없음. 그림자·블러·글로우 0개.

## 4. Section Rhythm

| 순서 | 섹션 | 배경 |
|---|---|---|
| 1 | Hero | Bone |
| 2 | Work | **Void (검은 무대)** |
| 3 | About | Bone |
| 4 | Awards & Projects | Bone (위에 1px Hairline으로 About과 구분) |
| 5 | Contact / Footer | **Void** |

밝은 종이 위에서 소개하고, 작업은 검은 무대에서 보여주고, 다시 종이로 돌아왔다가, 검은 무대에서 끝난다.

## 5. Components

### Nav
투명 배경, 한 줄. 왼쪽 `Jang Hoon Min`(label, Ink), 오른쪽 링크 4개 + 테마 토글 + `Contact` pill. 배경·테두리·블러 없음. 스크롤 후에도 배경은 현재 섹션 색과 같은 단색(반투명 금지). 무대 섹션 위에서는 글자색이 On-stage로 바뀐다.

### Pill Button
radius 9999px, 1px solid 테두리(밝은 곳 `--c-ink`, 무대 위 `--c-on-stage`), 배경 투명, padding 10px 20px, body-sm 500. hover 시 배경을 테두리 색으로 채우고 글자색 반전(0.2s). 버튼 모양은 이것 하나뿐.

### Text Link
body 또는 subheading 400, 뒤에 `→` (간격 8px). 밑줄 없음, hover 시 Blue 1px 밑줄.

### Section Head
위에 1px Hairline 전체 폭 → 그 아래 한 줄: 왼쪽 `01` 번호(label), 2칸 뒤 섹션 이름(label), 오른쪽 끝 보조 정보(label, Graphite). 그 아래 40px 띄우고 heading.

### Featured Work (Void 위)
이미지가 곧 카드: 테두리·라운드·그림자·오버레이 없음. 이미지 아래 16px에 한 줄: 번호(label, On-stage muted) · 이름(heading-sm, On-stage) · 분야·연도(label, On-stage muted, 오른쪽 정렬). hover 시 이미지 1.02배, 화살표 8px 이동.

### Index Row
1px Hairline으로 줄 구분, 상하 padding 24px. 열: 번호 / 이름(subheading) / 설명(body-sm, muted) / 분야 / 연도. hover 시 이름 색만 Ink(또는 On-stage)로 진해짐.

### Table (Awards)
Index Row와 같은 규칙. 패널·배경·박스 없음.

### Profile Drawer
오른쪽에서 열리는 Bone 패널(다크 테마는 `#0E0E0F`), 0px radius, 왼쪽 1px Hairline. 오버레이는 `rgba(0,0,0,.4)` 단색(블러 금지).

## 6. Guidelines

### Do
- 제목은 크게, 가늘게(300), 자간 좁게. 굵기로 강조하지 않는다
- 모든 글은 왼쪽 정렬, 12컬럼 격자에 맞춘다
- 섹션 구분은 배경색 전환(Bone ↔ Void)과 1px Hairline으로만 한다
- 작업 이미지는 크게, 장식 없이 보여준다. 작업물이 페이지에서 가장 색이 많아야 한다
- 간격은 8px 배수 토큰만 쓴다
- 값을 쓸 때 어느 토큰인지 CSS 주석이나 변수명으로 남긴다

### Don't
- Blue 외의 채도색을 UI에 쓰지 않는다. Blue로 면을 칠하지 않는다
- 그림자, 글로우, 블러, 그라데이션, 반투명 유리 효과를 쓰지 않는다
- 이미지·카드·패널에 라운드를 주지 않는다(버튼·태그만 pill)
- 600 이상 굵기를 쓰지 않는다
- 가운데 정렬하지 않는다(버튼 내부 글자 제외)
- 아이콘 세트, 이모지, 장식 그래픽을 넣지 않는다
- 폰트를 2개(Inter, Pretendard) 외에 추가하지 않는다
- 같은 크기 카드를 여러 장 쌓지 않는다

## 7. Quick Start — CSS Custom Properties

```css
:root {
  --c-bg: #F4F3EF; --c-stage: #0B0B0C; --c-ink: #111111; --c-body: #4A4D46;
  --c-muted: #6A6862; --c-line: rgba(17,17,17,.12);
  --c-on-stage: #F4F3EF; --c-on-stage-muted: #9A9891; --c-accent: #2B4BFF;

  --f-en: 'Inter', sans-serif; --f-ko: 'Pretendard Variable', Pretendard, sans-serif;
  --t-display: clamp(52px, 4vw + 36px, 112px);
  --t-heading: clamp(34px, 2.2vw + 24px, 56px);
  --t-heading-sm: clamp(22px, .6vw + 19px, 28px);
  --t-sub: clamp(18px, .2vw + 17px, 20px);
  --t-body: clamp(16px, .1vw + 15.6px, 17px);
  --t-body-sm: 14px; --t-label: 12px;

  --s-1: 8px; --s-2: 16px; --s-3: 24px; --s-5: 40px; --s-8: 64px; --s-12: 96px; --s-20: 160px;
  --gutter: 24px; --margin: clamp(20px, 4vw, 48px); --max: 1440px;
  --r-pill: 9999px; --r-none: 0px;
}
html.dark-mode {
  --c-bg: #0E0E0F; --c-stage: #000000; --c-ink: #F4F3EF; --c-body: #C9C7C1;
  --c-muted: #9A9891; --c-line: rgba(244,243,239,.14); --c-accent: #5B76FF;
}
```
