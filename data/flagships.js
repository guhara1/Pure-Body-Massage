/* ==========================================================================
   플래그십 클러스터 레지스트리
   각 클러스터: { gu, dong, rep, subs }
   - 대표 허브 페이지(index) + 이용장소/역세권 서브 페이지(index, 2,000자+)
   - 새 지역 추가 시 data/<지역>.js 를 만들어 여기 배열에 등록하면 자동 생성
   ========================================================================== */
import { YEOKSAM_GU, YEOKSAM_DONG, YEOKSAM_REP, YEOKSAM_SUBS } from "./yeoksam.js";
import { JAMSIL_GU, JAMSIL_DONG, JAMSIL_REP, JAMSIL_SUBS } from "./jamsil.js";
import { HONGDAE_GU, HONGDAE_DONG, HONGDAE_REP, HONGDAE_SUBS } from "./hongdae.js";
import { YEOUIDO_GU, YEOUIDO_DONG, YEOUIDO_REP, YEOUIDO_SUBS } from "./yeouido.js";
import { SEONGSU_GU, SEONGSU_DONG, SEONGSU_REP, SEONGSU_SUBS } from "./seongsu.js";
import { ITAEWON_GU, ITAEWON_DONG, ITAEWON_REP, ITAEWON_SUBS } from "./itaewon.js";
import { SAMSEONG_GU, SAMSEONG_DONG, SAMSEONG_REP, SAMSEONG_SUBS } from "./samseong.js";
import { KONDAE_GU, KONDAE_DONG, KONDAE_REP, KONDAE_SUBS } from "./kondae.js";
import { SEOCHO_GU, SEOCHO_DONG, SEOCHO_REP, SEOCHO_SUBS } from "./seocho.js";
import { GANGDONG_GU, GANGDONG_DONG, GANGDONG_REP, GANGDONG_SUBS } from "./gangdong.js";
import { GANGSEO_GU, GANGSEO_DONG, GANGSEO_REP, GANGSEO_SUBS } from "./gangseo.js";
import { GWANAK_GU, GWANAK_DONG, GWANAK_REP, GWANAK_SUBS } from "./gwanak.js";
import { DONGJAK_GU, DONGJAK_DONG, DONGJAK_REP, DONGJAK_SUBS } from "./dongjak.js";
import { SEODAEMUN_GU, SEODAEMUN_DONG, SEODAEMUN_REP, SEODAEMUN_SUBS } from "./seodaemun.js";
import { EUNPYEONG_GU, EUNPYEONG_DONG, EUNPYEONG_REP, EUNPYEONG_SUBS } from "./eunpyeong.js";
import { NOWON_GU, NOWON_DONG, NOWON_REP, NOWON_SUBS } from "./nowon.js";
import { GURO_GU, GURO_DONG, GURO_REP, GURO_SUBS } from "./guro.js";
import { GEUMCHEON_GU, GEUMCHEON_DONG, GEUMCHEON_REP, GEUMCHEON_SUBS } from "./geumcheon.js";
import { YANGCHEON_GU, YANGCHEON_DONG, YANGCHEON_REP, YANGCHEON_SUBS } from "./yangcheon.js";

export const FLAGSHIPS = [
  { gu: YEOKSAM_GU, dong: YEOKSAM_DONG, rep: YEOKSAM_REP, subs: YEOKSAM_SUBS },
  { gu: JAMSIL_GU, dong: JAMSIL_DONG, rep: JAMSIL_REP, subs: JAMSIL_SUBS },
  { gu: HONGDAE_GU, dong: HONGDAE_DONG, rep: HONGDAE_REP, subs: HONGDAE_SUBS },
  { gu: YEOUIDO_GU, dong: YEOUIDO_DONG, rep: YEOUIDO_REP, subs: YEOUIDO_SUBS },
  { gu: SEONGSU_GU, dong: SEONGSU_DONG, rep: SEONGSU_REP, subs: SEONGSU_SUBS },
  { gu: ITAEWON_GU, dong: ITAEWON_DONG, rep: ITAEWON_REP, subs: ITAEWON_SUBS },
  { gu: SAMSEONG_GU, dong: SAMSEONG_DONG, rep: SAMSEONG_REP, subs: SAMSEONG_SUBS },
  { gu: KONDAE_GU, dong: KONDAE_DONG, rep: KONDAE_REP, subs: KONDAE_SUBS },
  { gu: SEOCHO_GU, dong: SEOCHO_DONG, rep: SEOCHO_REP, subs: SEOCHO_SUBS },
  { gu: GANGDONG_GU, dong: GANGDONG_DONG, rep: GANGDONG_REP, subs: GANGDONG_SUBS },
  { gu: GANGSEO_GU, dong: GANGSEO_DONG, rep: GANGSEO_REP, subs: GANGSEO_SUBS },
  { gu: GWANAK_GU, dong: GWANAK_DONG, rep: GWANAK_REP, subs: GWANAK_SUBS },
  { gu: DONGJAK_GU, dong: DONGJAK_DONG, rep: DONGJAK_REP, subs: DONGJAK_SUBS },
  { gu: SEODAEMUN_GU, dong: SEODAEMUN_DONG, rep: SEODAEMUN_REP, subs: SEODAEMUN_SUBS },
  { gu: EUNPYEONG_GU, dong: EUNPYEONG_DONG, rep: EUNPYEONG_REP, subs: EUNPYEONG_SUBS },
  { gu: NOWON_GU, dong: NOWON_DONG, rep: NOWON_REP, subs: NOWON_SUBS },
  { gu: GURO_GU, dong: GURO_DONG, rep: GURO_REP, subs: GURO_SUBS },
  { gu: GEUMCHEON_GU, dong: GEUMCHEON_DONG, rep: GEUMCHEON_REP, subs: GEUMCHEON_SUBS },
  { gu: YANGCHEON_GU, dong: YANGCHEON_DONG, rep: YANGCHEON_REP, subs: YANGCHEON_SUBS },
];
