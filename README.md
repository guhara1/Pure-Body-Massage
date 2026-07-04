# 간다GO — 서울 출장마사지 안내 사이트

정적(HTML/CSS/JS) 사이트로, GitHub 푸시 시 클라우드에 자동 배포되는 구성입니다.

## 구조
```
index.html            # 메인 페이지 (스키마·NAP·FAQ·내부링크 포함)
assets/css/styles.css # Pretendard + 프리미엄 디자인 토큰 시스템
assets/js/main.js     # 경량 상호작용
assets/favicon.svg    # 파비콘
assets/og-image.svg   # 소셜/선호 썸네일
robots.txt / sitemap.xml
```

## 반영된 요소
- **푸터 버튼**: `웹사이트 제작문의`, `제휴문의` (오렌지 · 텔레그램 링크)
- **NAP**: 상호 `간다GO` / 전화예약 `0508-202-4719` (전 페이지)
- **메타 디스크립션**: 80자 이내 (현재 61자)
- **구조화 데이터(JSON-LD)**: Organization · WebSite · WebPage · BreadcrumbList · FAQPage
  - 정책상 LocalBusiness / Review / AggregateRating 은 미사용
- **모바일 플로팅 전화 버튼**: 우측 하단, 오렌지, 애니메이션, 터치 시 `tel:` 전화 연결, 전 지역 노출
- **프리미엄 팔레트**: 기존 토큰명을 유지한 채 다크/앰버 팔레트 + 컴포넌트 오버레이
- **내부링크**: 메인 → 권역/구/프로그램/이용장소/예약 전 확인

## ⚠️ 배포 전 교체 필요
- **텔레그램 링크**: 현재 임시값 `https://t.me/ganda_go` — 실제 핸들로 교체
- **도메인**: `https://ganda-go.com/` — 실제 도메인으로 canonical/OG/schema/sitemap 일괄 교체
