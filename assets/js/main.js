/* 간다GO — 경량 상호작용 스크립트 */
(function () {
  "use strict";

  // 푸터 연도 자동 갱신
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // 앵커 클릭 시 sticky 헤더 높이만큼 오프셋 보정은 CSS scroll-margin 으로 처리됨.
  // 접근성: 애니메이션 축소 선호 시 플로팅 버튼 tip 은 유지, 모션만 CSS에서 제거.
})();
