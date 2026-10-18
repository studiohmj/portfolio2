# Jang Hoon Min — Portfolio

정적 HTML 사이트입니다. 빌드 과정 없이 그대로 GitHub Pages에 올라갑니다.

## 첫 화면 조형물 영상 넣기

영상이 생기기 전에는 첫 화면 오른쪽에 포스터(`메인 이미지/메인 포스터 이미지/1.webp`)가 나옵니다(SPEC.md §5).

1. `media/` 폴더에 같은 이름으로 두 형식을 넣습니다.
   - `media/hero-light.webm`, `media/hero-light.mp4` (석고 조형물, 16:9, 6–8초 반복, 소리 없음, 2MB 이하)
   - 다크 테마용 흑연 버전이 있으면 `media/hero-dark.webm`, `media/hero-dark.mp4` (선택)
2. `index.html`에서 `<div class="hero__media">`를 찾아 이렇게 바꿉니다.

   ```html
   <div class="hero__media" data-video="media/hero-light" data-video-dark="media/hero-dark">
   ```

   확장자는 쓰지 않습니다. 다크 버전이 없으면 `data-video-dark`는 빼면 됩니다.
3. 영상 첫 프레임 이미지(`media/hero-light-poster.webp`)가 있으면, 같은 div 안 `<img>`의 `src`를 그 파일로 바꿉니다. 영상이 뜨기 전과 휴대폰에서 이 이미지가 보입니다.

영상은 화면에 보일 때만 소리 없이 반복 재생되고, 화면 밖으로 나가면 멈춥니다. 휴대폰(760px 이하)과 '동작 줄이기' 설정에서는 포스터만 보입니다. 파일이 없거나 깨지면 포스터가 그대로 남습니다.

## 썸네일을 영상으로 바꾸기

영상은 직접 표시한 카드에서만 재생됩니다. 표시가 없으면 아무 요청도 보내지 않습니다.

1. `media/` 폴더를 만들고 영상을 넣습니다. 예: `media/leporem.mp4`
   - 짧은 반복 영상, 소리 없음, 가로 16:9, 5–10초, 3MB 이하를 권장합니다.
2. `index.html`에서 그 프로젝트의 카드를 찾아 `<a ...>` 태그에 `data-video`를 추가합니다.

   ```html
   <a href="leporem.html" class="card" data-video="media/leporem.mp4">
   ```

   아래 프로젝트 목록(`class="index__row"`)에도 같은 방식으로 넣으면, 마우스를 올렸을 때 영상이 나옵니다.
3. 저장하고 올리면 끝입니다. 영상은 화면에 보일 때만 소리 없이 반복 재생되고, 파일이 없거나 깨지면 원래 이미지가 그대로 남습니다.

## 로컬에서 미리보기

`index.html`을 더블클릭해 열면 스크립트가 막혀 테마 전환·스크롤 효과·영상이 꺼진 기본 화면만 보입니다(브라우저 보안 제한).
실제 모습은 폴더에서 `npx serve -l 5000`을 실행한 뒤 http://localhost:5000/ 으로 확인하세요.

## 파일 구조

모든 페이지가 같은 내비·모바일 메뉴·푸터 마크업과 같은 공통 파일을 씁니다.

| 파일 | 역할 |
| --- | --- |
| `DESIGN.md` | 시각 규칙(색·글자·간격·라운드)의 유일한 기준 |
| `SPEC.md` | 내용·섹션 구조·인터랙션의 기준과 빌드 순서 |
| `css/core.css` | 공통 디자인 시스템: DESIGN.md 토큰, 내비, 메뉴, 푸터, 버튼 |
| `css/home.css` | 메인(index.html) 전용 |
| `css/detail-base.css` → `css/pages.css` → `css/detail.css` | 상세 페이지·프로필 (순서대로 로드). `pages.css`는 페이지별 규칙을 한 파일에 모은 것으로, 각 규칙은 `<html data-page="페이지">`가 맞는 페이지에만 적용됩니다 |
| `js/core.js` | 공통 동작: 테마 전환, 내비, 메뉴, 프로필 서랍 |
| `js/site.js` | 메인 전용 (첫 화면 영상, 스크롤 모션 불러오기) |
| `js/detail.js` | 상세 페이지 전용 (나타나기 효과, 이미지 클릭) |

`portfolio-web.html`, `project.html`은 예전 주소를 위한 리다이렉트 페이지로, 열면 메인(index.html)으로 바로 넘어갑니다. `project.css`는 눈치코치 페이지가 씁니다.
