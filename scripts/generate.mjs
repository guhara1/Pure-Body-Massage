/* ==========================================================================
   서울 지역 페이지 생성기
   - /seoul/                       권역 허브 (index)
   - /seoul/<구>/                  25개 구 페이지 (index 대상)
   - /seoul/<구>/<동>/             대표 행정동 페이지 (noindex + canonical → 구)
   실행: node scripts/generate.mjs
   ========================================================================== */
import { REGIONS, GUS, PHONE, TELEGRAM, ORIGIN } from "../data/seoul.js";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "seoul");

const clip = (s, n = 80) => (s.length <= n ? s : s.slice(0, n - 1) + "…");
const enc = (p) => ORIGIN + encodeURI(p);

/* ---- 공통 파셜 -------------------------------------------------------- */
function head({ title, desc, path, robots = "index,follow", extraLd = "" }) {
  const url = enc(path);
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta name="robots" content="${robots}" />
  <meta name="theme-color" content="#0b0e16" />
  <link rel="canonical" href="${robots.includes("noindex") ? "" : url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="간다GO" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${ORIGIN}/assets/og-image.svg" />
  <meta property="og:locale" content="ko_KR" />
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  <link rel="stylesheet" as="style" crossorigin
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
  ${extraLd}
</head>
<body>`;
}

function canonicalFix({ robots, canonical }) {
  // noindex 페이지는 지정 canonical(구 페이지)로 연결
  return robots && robots.includes("noindex") && canonical
    ? `<link rel="canonical" href="${enc(canonical)}" />`
    : "";
}

function dropdown() {
  const cols = REGIONS.map(
    (r) =>
      `<div class="nav-dd__col"><span class="nav-dd__region">${r.name}</span>` +
      r.gus.map((g) => `<a href="/seoul/${encodeURIComponent(g)}/">${g}</a>`).join("") +
      `</div>`
  ).join("");
  return `<details class="nav-dd">
        <summary>권역별 안내</summary>
        <div class="nav-dd__panel">${cols}</div>
      </details>`;
}

function header() {
  return `  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="/" aria-label="간다GO 홈"><span class="brand__mark">G</span><span>간다GO</span></a>
      <nav class="nav__links" aria-label="주요 메뉴">
        <a href="/#pricing">이용 코스</a>
        ${dropdown()}
        <a href="/#program">마사지 프로그램</a>
        <a href="/#use">이용 장소</a>
        <a href="/#check">예약 전 확인</a>
        <a href="/#faq">자주 묻는 질문</a>
      </nav>
      <div class="nav__cta">
        <span class="nav__phone">전화예약 ${PHONE}</span>
        <a class="btn btn--accent" href="tel:${PHONE}">예약 문의</a>
      </div>
    </div>
  </header>`;
}

function footer() {
  const tg = (label) =>
    `<a class="btn btn--accent btn--tg" href="${TELEGRAM}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>${label}</a>`;
  return `  <footer class="site-footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a class="brand" href="/"><span class="brand__mark">G</span><span>간다GO</span></a>
          <p>서울 출장마사지·홈타이 지역별 생활권과 마사지 프로그램 예약 전 확인사항을 안내합니다.</p>
          <div class="footer__nap">
            <span><b>상호</b> · 간다GO</span>
            <span><b>전화예약</b> · <a href="tel:${PHONE}">${PHONE}</a></span>
          </div>
        </div>
        <div class="footer__col">
          <h4>안내</h4>
          <a href="/#pricing">이용 코스와 요금</a>
          <a href="/#area">권역별 안내</a>
          <a href="/#program">마사지 프로그램</a>
          <a href="/#use">이용 장소</a>
        </div>
        <div class="footer__col">
          <h4>이용 정보</h4>
          <a href="/#check">예약 전 확인</a>
          <a href="/#faq">자주 묻는 질문</a>
          <a href="https://www.pipc.go.kr/" target="_blank" rel="noopener nofollow">개인정보 처리 안내 ↗</a>
          <a href="tel:${PHONE}">전화예약 ${PHONE}</a>
        </div>
      </div>
      <div class="footer__inquiry">
        <span class="footer__inquiry-label">문의하기</span>
        ${tg("웹사이트 제작문의")}
        ${tg("제휴문의")}
      </div>
      <div class="footer__bottom">
        <span>© <span data-year>2026</span> 간다GO · 서울 출장마사지 안내</span>
        <span>불법·선정적 서비스는 제공하지 않습니다.</span>
      </div>
    </div>
  </footer>
  <a class="floating-call" href="tel:${PHONE}" aria-label="전화예약 ${PHONE} 걸기">
    <span class="floating-call__tip">전화예약 ${PHONE}</span>
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
  </a>
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

function breadcrumbLd(items) {
  const el = items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: enc(it.path),
  }));
  return { "@type": "BreadcrumbList", itemListElement: el };
}

function ld(nodes) {
  return `<script type="application/ld+json">${JSON.stringify(
    { "@context": "https://schema.org", "@graph": nodes },
    null,
    0
  )}</script>`;
}

const ORG = {
  "@type": "Organization",
  "@id": ORIGIN + "/#org",
  name: "간다GO",
  url: ORIGIN + "/",
  telephone: "+82-508-202-4719",
  areaServed: { "@type": "City", name: "서울" },
  sameAs: [TELEGRAM],
};

/* 공통 요금표 블록 (메인과 동일한 60·90·120분 코스) */
function pricingBlock() {
  const card = (name, price, dur, desc, featured) =>
    `<article class="price-card${featured ? " price-card--featured" : ""}">${
      featured ? '<span class="price-card__badge">추천</span>' : ""
    }<h3 class="price-card__name">${name}</h3><div class="price-card__price">${price}<span class="won">원</span></div><div class="price-card__dur">${dur}</div><p class="price-card__desc">${desc}</p><a class="btn ${
      featured ? "btn--accent" : "btn--ghost"
    } btn--block" href="tel:${PHONE}">예약 문의</a></article>`;
  return `<section class="section pricing" id="pricing">
      <div class="container">
        <div class="section-head">
          <h2>이용 코스와 요금 살펴보기</h2>
          <p>60·90·120분 코스별 기준 요금이며, 추가 비용 없이 있는 그대로 안내드립니다.</p>
        </div>
        <div class="pricing__grid">
          ${card("60분 코스", "90,000", "60분", "기본 컨디션·릴렉스 케어", false)}
          ${card("90분 코스", "150,000", "90분", "아로마 포함 추천 구성", true)}
          ${card("120분 코스", "180,000", "120분", "전신 집중 프리미엄 케어", false)}
        </div>
        <p class="pricing__note">지역·예약 시간대·이동 거리에 따라 상담 시 최종 확인됩니다. <a href="/#check">상세 예약 전 확인 보기 →</a></p>
      </div>
    </section>`;
}

/* 공통 정책/체크리스트/FAQ 블록 */
const policyBlock = `<div class="notice">개인정보는 예약 확인·연락에 필요한 최소 정보만 확인하며, <strong>불법·선정적 서비스는 제공하거나 안내하지 않습니다.</strong> <a href="https://www.pipc.go.kr/" target="_blank" rel="noopener nofollow">개인정보보호위원회 안내 ↗</a></div>`;

const checklist = `<ul class="checklist">
  <li>방문 주소와 건물명을 정확히 확인했나요?</li>
  <li>아파트 단지·오피스텔 공동현관 출입 방식을 확인했나요?</li>
  <li>호텔·숙소 이용 시 객실 출입·프런트 확인 방식을 확인했나요?</li>
  <li>이용하려는 마사지 프로그램을 확인했나요?</li>
  <li>예약 가능 시간과 변경 기준을 확인했나요?</li>
  <li>개인정보 처리 기준과 불법·선정적 서비스 불가 안내를 확인했나요?</li>
</ul>`;

/* ---- 구 페이지 -------------------------------------------------------- */
function guPage(gu) {
  const d = GUS[gu];
  const path = `/seoul/${gu}/`;
  const life = d.life.join(", ");
  const stations = d.stations.join(", ");
  const desc = clip(`${gu} 출장마사지·홈타이 ${d.life[0]}·${d.life[1] || ""} 생활권과 ${d.programs[0]}·${d.programs[1]} 등 프로그램 예약 전 확인 안내.`);
  const title = `${gu} 출장마사지 · 생활권과 마사지 프로그램 안내 | 간다GO`;

  const progCards = d.programs
    .map((p) => `<a class="chip" href="/#program">${p}</a>`)
    .join("");

  const dongCards = d.dongs
    .map(
      (dong) =>
        `<a class="link-card" href="/seoul/${gu}/${dong}/"><span class="link-card__title">${dong}</span><span class="link-card__sub">${gu} · 방문 주소·출입 확인</span><span class="link-card__arrow">이용 안내 →</span></a>`
    )
    .join("");

  const faq = [
    { q: `${gu} 전 지역 방문이 가능한가요?`, a: `${gu} 안에서도 업무지구·주거지·숙소 인접권이 다르므로, 실제 방문 주소와 가까운 생활권, 예약 가능 시간을 확인한 뒤 안내합니다.` },
    { q: `${gu}에서 어떤 마사지 프로그램을 이용할 수 있나요?`, a: `${d.programs.join(", ")} 등 관리 유형별로 압 조절과 오일 사용 여부가 다르므로 목적에 맞게 선택합니다.` },
    { q: `오피스텔·아파트에서 이용할 때 확인할 점은 무엇인가요?`, a: `공동현관, 엘리베이터, 경비실, 관리 규정, 방문 가능 시간대를 먼저 확인해야 합니다.` },
    { q: `불법·선정적 서비스도 가능한가요?`, a: `불법·선정적 서비스는 제공하거나 안내하지 않습니다.` },
  ];
  const faqLd = {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const bc = breadcrumbLd([
    { name: "홈", path: "/" },
    { name: "서울 출장마사지", path: "/seoul/" },
    { name: gu, path },
  ]);
  const webpage = {
    "@type": "WebPage",
    "@id": enc(path) + "#webpage",
    url: enc(path),
    name: title,
    description: desc,
    inLanguage: "ko",
    isPartOf: { "@id": ORIGIN + "/#website" },
    about: { "@id": ORIGIN + "/#org" },
  };

  const faqHtml = faq
    .map(
      (f, i) =>
        `<details${i === 0 ? " open" : ""}><summary>${f.q}</summary><p>${f.a}</p></details>`
    )
    .join("");

  return (
    head({ title, desc, path, extraLd: ld([ORG, webpage, bc, faqLd]) }) +
    header() +
    `<main>
    <section class="section" style="padding-bottom:0">
      <div class="container">
        <nav class="eyebrow" aria-label="위치"><a href="/seoul/" style="color:inherit">서울</a> · ${d.region}</nav>
        <div class="section-head" style="text-align:left; margin-bottom:22px; max-width:820px">
          <h2 style="font-size:clamp(1.7rem,4vw,2.4rem)">${gu} 출장마사지 · 생활권과 마사지 프로그램 안내</h2>
          <p style="margin-left:0">${d.intro}</p>
        </div>
        <div class="hero__cta" style="justify-content:flex-start; margin-top:8px">
          <a class="btn btn--accent" href="tel:${PHONE}">전화예약 ${PHONE}</a>
          <a class="btn btn--ghost" href="/#pricing">이용 코스 보기</a>
          <a class="btn" href="/#check">예약 전 확인</a>
        </div>
      </div>
    </section>

    ${pricingBlock()}

    <section class="section">
      <div class="container">
        <div class="section-head" style="text-align:left; margin-bottom:20px"><h2 style="font-size:1.4rem">이 구의 생활권과 가까운 역세권</h2></div>
        <p style="color:var(--text-muted); max-width:820px">대표 생활권은 <strong style="color:var(--text)">${life}</strong> 이며, 가까운 핵심 역세권으로는 <strong style="color:var(--text)">${stations}</strong> 이 있습니다. 같은 ${gu} 안에서도 업무지구·주거지·숙소 인접권에 따라 출입 방식과 예약 기준이 달라지므로 방문 주소와 생활권을 함께 확인합니다.</p>
        <div class="chip-row" style="justify-content:flex-start; margin-top:18px">${progCards}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head" style="text-align:left; margin-bottom:18px"><h2 style="font-size:1.4rem">${gu} 행정동별 이용 안내</h2><p style="margin-left:0">방문 주소·건물 출입 방식은 동마다 다릅니다. 번호동(1·2·3동)은 대표 행정동 1개로 안내합니다.</p></div>
        <div class="card-grid">${dongCards}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head" style="text-align:left; margin-bottom:18px"><h2 style="font-size:1.4rem">예약 전 확인해야 할 내용</h2></div>
        ${checklist}
        ${policyBlock}
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head" style="text-align:left; margin-bottom:18px"><h2 style="font-size:1.4rem">자주 묻는 질문</h2></div>
        <div class="faq" style="margin-left:0">${faqHtml}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="whw">
          <div class="whw__item"><h3><span>Who ·</span> 누가</h3><p>서울 ${gu} 지역 출장마사지 예약 상담을 운영하는 간다GO가 안내합니다. 문의는 전화예약 ${PHONE}.</p></div>
          <div class="whw__item"><h3><span>How ·</span> 어떻게</h3><p>${gu}의 생활권·역세권·이용 장소·프로그램을 실제 이용 기준에 맞춰 정리해 안내합니다.</p></div>
          <div class="whw__item"><h3><span>Why ·</span> 왜</h3><p>주소·건물 출입·숙소 정책 확인이 부족하면 방문이 지연되므로, 확인 정보를 먼저 제공합니다.</p></div>
        </div>
      </div>
    </section>
  </main>` +
    footer()
  );
}

/* ---- 행정동 페이지 (noindex + canonical → 구) ------------------------- */
function dongPage(gu, dong) {
  const d = GUS[gu];
  const path = `/seoul/${gu}/${dong}/`;
  const canonical = `/seoul/${gu}/`;
  const desc = clip(`${dong}(${gu}) 출장마사지·홈타이 방문 주소·건물 출입·숙소 이용 기준 등 예약 전 확인 안내.`);
  const title = `${dong} 출장마사지 · ${gu} 이용 안내 | 간다GO`;
  const robots = "noindex,follow";

  const bc = breadcrumbLd([
    { name: "홈", path: "/" },
    { name: "서울 출장마사지", path: "/seoul/" },
    { name: gu, path: canonical },
    { name: dong, path },
  ]);
  const webpage = {
    "@type": "WebPage",
    "@id": enc(path) + "#webpage",
    url: enc(path),
    name: title,
    description: desc,
    inLanguage: "ko",
    isPartOf: { "@id": ORIGIN + "/#website" },
  };

  return (
    head({ title, desc, path, robots, extraLd: ld([ORG, webpage, bc]) }).replace(
      '<link rel="canonical" href="" />',
      canonicalFix({ robots, canonical })
    ) +
    header() +
    `<main>
    <section class="section" style="padding-bottom:0">
      <div class="container">
        <nav class="eyebrow" aria-label="위치"><a href="/seoul/" style="color:inherit">서울</a> · <a href="/seoul/${gu}/" style="color:inherit">${gu}</a></nav>
        <div class="section-head" style="text-align:left; margin-bottom:22px; max-width:820px">
          <h2 style="font-size:clamp(1.6rem,3.6vw,2.2rem)">${dong} 출장마사지 · ${gu} 이용 안내</h2>
          <p style="margin-left:0">${dong}은 ${gu} ${d.region} 생활권에 속합니다. 방문 주소, 건물 출입, 숙소 정책 등 예약 전 확인사항을 안내하며, 자세한 구 단위 안내는 <a href="/seoul/${gu}/" style="color:var(--accent);font-weight:700">${gu} 페이지</a>에서 확인하세요.</p>
        </div>
        <div class="hero__cta" style="justify-content:flex-start; margin-top:8px">
          <a class="btn btn--accent" href="tel:${PHONE}">전화예약 ${PHONE}</a>
          <a class="btn btn--ghost" href="/seoul/${gu}/">${gu} 전체 보기</a>
        </div>
      </div>
    </section>

    ${pricingBlock()}

    <section class="section">
      <div class="container">
        <div class="section-head" style="text-align:left; margin-bottom:18px"><h2 style="font-size:1.35rem">이용 가능한 마사지 프로그램</h2></div>
        <div class="chip-row" style="justify-content:flex-start">${d.programs.map((p) => `<a class="chip" href="/#program">${p}</a>`).join("")}</div>
        <div class="section-head" style="text-align:left; margin:26px 0 18px"><h2 style="font-size:1.35rem">예약 전 확인해야 할 내용</h2></div>
        ${checklist}
        ${policyBlock}
      </div>
    </section>
  </main>` +
    footer()
  );
}

/* ---- 서울 허브 -------------------------------------------------------- */
function hubPage() {
  const path = "/seoul/";
  const title = "서울 출장마사지 · 5대 권역과 25개 구 안내 | 간다GO";
  const desc = clip("서울 출장마사지·홈타이 5대 권역과 강남·송파·마포·영등포 등 25개 구, 생활권·프로그램 예약 전 확인 안내.");
  const cols = REGIONS.map(
    (r) =>
      `<div class="link-card"><span class="link-card__title">${r.name}</span><div class="chip-row" style="justify-content:flex-start;margin-top:10px">${r.gus
        .map((g) => `<a class="chip" href="/seoul/${g}/">${g}</a>`)
        .join("")}</div></div>`
  ).join("");
  const bc = breadcrumbLd([
    { name: "홈", path: "/" },
    { name: "서울 출장마사지", path },
  ]);
  const webpage = {
    "@type": "WebPage",
    "@id": enc(path) + "#webpage",
    url: enc(path),
    name: title,
    description: desc,
    inLanguage: "ko",
    isPartOf: { "@id": ORIGIN + "/#website" },
  };
  return (
    head({ title, desc, path, extraLd: ld([ORG, webpage, bc]) }) +
    header() +
    `<main>
    <section class="hero" style="padding-bottom:40px">
      <div class="container">
        <span class="eyebrow">권역별 안내</span>
        <h1>서울 출장마사지<br/>5대 권역 · 25개 구 안내</h1>
        <p>서울은 같은 구 안에서도 업무지구·주거지·숙소 인접권이 다릅니다. 권역과 구, 생활권을 함께 확인하세요.</p>
      </div>
    </section>
    <section class="section" style="padding-top:40px">
      <div class="container">
        <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">${cols}</div>
      </div>
    </section>
    ${pricingBlock()}
    <section class="section" style="padding-top:0"><div class="container">${policyBlock}</div></section>
  </main>` +
    footer()
  );
}

/* ---- 실행 ------------------------------------------------------------- */
function write(path, htmlBody) {
  const dir = join(OUT, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), htmlBody, "utf8");
}

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let guCount = 0,
  dongCount = 0;
writeFileSync(join(OUT, "index.html"), hubPage(), "utf8");
for (const gu of Object.keys(GUS)) {
  write(gu, guPage(gu));
  guCount++;
  for (const dong of GUS[gu].dongs) {
    write(join(gu, dong), dongPage(gu, dong));
    dongCount++;
  }
}
console.log(`생성 완료: 허브 1 + 구 ${guCount} + 행정동 ${dongCount} = ${1 + guCount + dongCount} 페이지`);
