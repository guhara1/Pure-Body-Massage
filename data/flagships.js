/* ==========================================================================
   플래그십 클러스터 레지스트리
   각 클러스터: { gu, dong, rep, subs }
   - 대표 허브 페이지(index) + 이용장소/역세권 서브 페이지(index, 2,000자+)
   - 새 지역 추가 시 data/<지역>.js 를 만들어 여기 배열에 등록하면 자동 생성
   ========================================================================== */
import { YEOKSAM_GU, YEOKSAM_DONG, YEOKSAM_REP, YEOKSAM_SUBS } from "./yeoksam.js";
import { JAMSIL_GU, JAMSIL_DONG, JAMSIL_REP, JAMSIL_SUBS } from "./jamsil.js";

export const FLAGSHIPS = [
  { gu: YEOKSAM_GU, dong: YEOKSAM_DONG, rep: YEOKSAM_REP, subs: YEOKSAM_SUBS },
  { gu: JAMSIL_GU, dong: JAMSIL_DONG, rep: JAMSIL_REP, subs: JAMSIL_SUBS },
];
