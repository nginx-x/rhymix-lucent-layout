# Lucent: Glassmorphism Layout for Rhymix

Rhymix CMS에서 사용하는 깨끗하고 모던한 글래스모피즘 반응형 레이아웃입니다.

> A clean, modern glassmorphism responsive layout for Rhymix.

## 설치 (Install)

`lucent` 폴더를 Rhymix의 `layouts/` 아래에 복사합니다.

## CSS 수정 / 재빌드 (Customizing the CSS)

스타일은 Tailwind CSS v4 소스(`src/input.css`)에서 컴파일됩니다. 색상·여백 등을 직접 바꾸려면 아래와 같이 하시기 바랍니다.

```bash
cd layouts/lucent
npm install        # 최초 1회
npm run build      # src/input.css -> lucent.layout.css (minify)
npm run dev        # 변경 감시(watch) 모드
```

> 가벼운 수정이라면 `lucent.layout.css`를 직접 편집해도 되지만, 재빌드 시 덮어쓰입니다.

## License

- 본 레이아웃: **GPL v2**
- 빌드 산출물 CSS에는 **Tailwind CSS(MIT, © Tailwind Labs)** 일부가 포함됩니다. (`CREDITS.md` 참고)
- Tailwind **Preflight(전역 리셋)는 의도적으로 제외**했습니다. 본문 영역의 모듈 스킨(게시판 등)에 전역 리셋이 새어 들어가 깨지는 것을 막기 위함입니다.
