# Min Lab 홈페이지 — Grok A

의존성 없는 정적 사이트입니다. Node.js(18+)로 HTML을 생성하고, 결과물 `dist/`는 어떤 정적 호스팅에도 그대로 올릴 수 있습니다(모든 경로 상대경로, 기본 경로 비종속).

## 실행
```bash
npm run build        # dist/index.html (KO), dist/en/index.html (EN)
npm run serve        # 빌드 후 http://127.0.0.1:4173 에서 미리보기
```

## GitHub Pages 배포

`main` 브랜치에 반영하면 `.github/workflows/pages.yml`이 Node.js 22로
`npm run build`를 실행하고 `dist/`를 GitHub Pages에 배포합니다.
별도 패키지 설치나 API 키는 필요하지 않습니다.

- 국문: https://kmin-lab.github.io/kmin-lab/
- 영문: https://kmin-lab.github.io/kmin-lab/en/

모든 내부 경로는 상대경로이므로 `/kmin-lab/` 아래에서도 이미지와 언어 전환이 동작합니다.
배포 결과물 `dist/`와 ChatGPT Sites 전용 설정은 저장소에 포함하지 않습니다.
이전 홈페이지는 Git 이력에 보존되어 있습니다.

## 수정 위치
- 논문·특허·경력·구성원·사진·문구(KO/EN): `src/content.mjs`
- 페이지 구조: `src/build.mjs`
- 스타일: `assets/site.css` / 메뉴·논문 펼치기: `assets/site.js`
- 승인 사진 웹 최적화(WebP 변환, 원본 크기 유지): `scripts/optimize-photos.py <approved-photos 폴더>`

## 사진
- 첫 화면 도트 플롯: 기존 source/public/images/hero-evidence.png 그대로(원본 사이트 첫 화면 이미지, 추상 그래픽이며 실험 데이터 아님).
- 실험실: approved-photos 승인본 3장만 사용 (`assets/photos/*.webp`). 예전 lab-*.jpg는 포함하지 않음.
- 프로필: 원본 파일 그대로 (`assets/people/`). 화면에서는 CSS로만 크롭.
- 연구 모식도: 기존 소스의 최신 파일(v5/v4) 그대로.

## 확인이 필요한 항목
- 장성원·김주빈: 석사과정으로 반영(2026-10 피드백).
- mSphere 2024 논문: Crossref 기준 9(9)로 수정.
- 국문 경력·학력: 한글 표기(강릉원주대학교 식물생명과학과, 서울대학교 응용생명화학부 반영). 나머지 국문 명칭은 확인 권장.
- 웹폰트(Pretendard, Newsreader)는 CDN에서 불러옴. 오프라인이면 시스템 폰트로 대체됨.
