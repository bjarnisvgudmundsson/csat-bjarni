"use client";

import { useState, useRef } from "react";

const HUGVIT_BLUE = "#1A3C61";
const HUGVIT_MED = "#2D5C88";
const HUGVIT_LIGHT = "#176CBB";
const HUGVIT_BG = "#F7F8FA";
const WHITE = "#FFFFFF";
const GRAY_100 = "#F5F6F8";
const GRAY_200 = "#E8EAED";
const GRAY_400 = "#9CA3AF";
const GRAY_600 = "#6B7280";
const GRAY_800 = "#374151";
const SUCCESS = "#27AE60";

const sections = [
  {
    id: "thattakandi", title: "Um þáttakandann, fyrirtæki eða stofnun", num: "01",
    desc: "Grunnupplýsingar um ykkar stofnun og starfsemi.",
    questions: [
      { id: "org_name", text: "Nafn stofnunar / fyrirtækis", type: "input" },
      { id: "org_dept", text: "Deild eða svið (ef við á)", type: "input" },
      { id: "org_contact", text: "Nafn verkefnastjóra / aðaltengiliðar", type: "input" },
      { id: "org_email", text: "Netfang tengiliðar", type: "input" },
      { id: "org_phone", text: "Símanúmer tengiliðar", type: "input" },
      { id: "org_size", text: "Fjöldi starfsmanna sem vinna með málastjórnunarkerfi", type: "choice", options: ["1–10", "11–50", "51–200", "200+"] },
      { id: "org_sector", text: "Geiri", type: "choice", options: ["Ríkisstofnun", "Sveitarfélag", "Fjármálafyrirtæki", "Dómstóll", "Annað"] },
    ],
  },
  {
    id: "kerfi", title: "Núverandi kerfi og notkun", num: "02",
    desc: "Upplýsingar um ykkar GoPro Foris uppsetningu og notkun í dag.",
    questions: [
      { id: "sys_version", text: "Hvaða útgáfu af GoPro Foris eruð þið á?", type: "input", placeholder: "T.d. 7.2, 8.0 — ef óvíst, skrifið 'óvíst'" },
      { id: "sys_users", text: "Fjöldi virkra notenda í GoPro Foris", type: "input", placeholder: "T.d. 85" },
      { id: "sys_cases_year", text: "Áætlaður fjöldi mála á ári", type: "input", placeholder: "T.d. 3.500" },
      { id: "sys_case_types", text: "Helstu málategundir sem þið vinnið með", type: "textarea", placeholder: "T.d. erindi frá borgurum, leyfisumsóknir, eftirlitsmál, kæru..." },
      { id: "sys_modules", text: "Hvaða viðbætur / módúla notið þið í dag?", type: "multicheck", options: ["Verkflæðisvél", "Sjálfsafgreiðslugátt", "Skjalastjórnun", "Mælaborð / Power BI", "API-tengingar", "Rafræn undirritun", "Samþætting við island.is", "Annað"] },
      { id: "sys_modules_other", text: "Ef 'Annað' — hvaða viðbætur?", type: "input", condition: { id: "sys_modules", contains: "Annað" } },
      { id: "sys_integrations", text: "Er GoPro Foris tengt við önnur kerfi?", type: "textarea", placeholder: "T.d. fjármálakerfi (Business Central), mannauðskerfi, CRM, island.is..." },
    ],
  },
  {
    id: "askoranir", title: "Áskoranir og þarfir", num: "03",
    desc: "Hvar liggja helstu tækifæri og sársaukapunktar? Þetta hjálpar ráðgjafa okkar að undirbúa vinnustofuna.",
    questions: [
      { id: "pain_main", text: "Hverjar eru helstu áskoranirnar í ykkar málastjórnun í dag?", type: "textarea", placeholder: "Lýsið frjálslega — t.d. handvirk flokkun, tímafrekt eftirlit, óskýrir ferlar..." },
      { id: "pain_time", text: "Hvar eyðið þið mestum tíma í handvirka vinnu?", type: "textarea", placeholder: "T.d. flokkun innkominna mála, úthlutun, leit í eldri málum, skýrslugerð..." },
      { id: "pain_ai_interest", text: "Hversu mikinn áhuga hafið þið á að nýta gervigreind?", type: "choice", options: ["Mikinn — tilbúin að prófa", "Nokkurn — forvitni", "Lítinn — vil vita meira fyrst"] },
      { id: "pain_ai_experience", text: "Hafið þið reynslu af gervigreind í starfseminni?", type: "choice", options: ["Já, í notkun", "Já, prófað", "Nei"] },
      { id: "pain_goals", text: "Hvað viljið þið helst ná út úr þessum vinnupakka?", type: "textarea", placeholder: "T.d. fá vegvísi, prófa sjálfvirka samantekt, forgangsröðun mála, minnka handvirka vinnu..." },
    ],
  },
  {
    id: "adgangur", title: "Aðgangur og tæknileg atriði", num: "04",
    desc: "Ráðgjafi þarf aðgang að kerfum til undirbúnings. Vinsamlegast staðfestið eftirfarandi.",
    questions: [
      { id: "acc_gopro", text: "Getið þið útvegað ráðgjafa prófunaraðgang að GoPro Foris?", type: "choice", options: ["Já", "Nei — þarf umræðu", "Veit ekki"] },
      { id: "acc_data", text: "Getið þið útvegað sýnidögn eða prófunargögn?", type: "choice", options: ["Já — raunveruleg gögn (nafnlaus)", "Já — sviðsett gögn", "Nei — þarf umræðu"] },
      { id: "acc_remote", text: "Er hægt að halda vinnustofu fjartengt (Teams/Zoom)?", type: "choice", options: ["Já", "Nei — á staðnum eingöngu", "Hvort sem er"] },
      { id: "acc_contact_it", text: "Tengiliður tæknideildar (nafn og netfang)", type: "input", placeholder: "Ef við á" },
      { id: "acc_restrictions", text: "Eru einhverjar sérstakar öryggiskröfur eða takmarkanir sem ráðgjafi þarf að vita af?", type: "textarea", placeholder: "T.d. VPN, IP-takmarkanir, öryggisflokkun gagna..." },
    ],
  },
  {
    id: "thattakendur", title: "Þátttakendur í vinnustofu", num: "05",
    desc: "Til að vinnustofan skili árangri þurfum við rétta aðila. Vinsamlegast tilnefnið þátttakendur.",
    questions: [
      { id: "att_sponsor", text: "Verkefnisstjóri / ábyrgðarmaður (mætir á lokakynningarfund)", type: "input" },
      { id: "att_sme", text: "Efnislegur sérfræðingur — sá sem þekkir málaferla best", type: "input" },
      { id: "att_users", text: "Lykilnotendur sem mæta á vinnustofu (nöfn og hlutverk)", type: "textarea", placeholder: "T.d.\nJón Jónsson — deildarstjóri\nAnna Ösp — sérfræðingur í málavinnslu" },
      { id: "att_count", text: "Heildarfjöldi þátttakenda á vinnustofu", type: "choice", options: ["2–4", "5–8", "9–12", "13+"] },
      { id: "att_dates", text: "Hvenær hentar ykkur best? (dagsetningar eða vikur)", type: "input", placeholder: "T.d. vika 12–13, eða eftir páska" },
    ],
  },
  {
    id: "annad", title: "Annað", num: "06",
    desc: "Eitthvað annað sem þið viljið koma á framfæri?",
    questions: [
      { id: "other_expectations", text: "Eru einhverjar sérstakar væntingar eða áherslur sem þið viljið að ráðgjafi viti af?", type: "textarea" },
      { id: "other_previous", text: "Hafið þið áður unnið með Hugvit að ráðgjafarverkefni?", type: "choice", options: ["Já", "Nei"] },
      { id: "other_notes", text: "Annað sem þið viljið koma á framfæri", type: "textarea" },
    ],
  },
];

function InputField({ value, onChange, placeholder }) {
  return <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || ""} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${GRAY_200}`, fontSize: 15, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", background: GRAY_100 }} onFocus={(e) => (e.target.style.borderColor = HUGVIT_LIGHT)} onBlur={(e) => (e.target.style.borderColor = GRAY_200)} />;
}
function TextArea({ value, onChange, placeholder }) {
  return <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || ""} rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${GRAY_200}`, fontSize: 15, resize: "vertical", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", background: GRAY_100 }} onFocus={(e) => (e.target.style.borderColor = HUGVIT_LIGHT)} onBlur={(e) => (e.target.style.borderColor = GRAY_200)} />;
}
function ChoiceInput({ options, value, onChange }) {
  return <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{options.map((opt) => (<button key={opt} onClick={() => onChange(opt)} style={{ padding: "9px 20px", borderRadius: 10, border: `2px solid ${value === opt ? HUGVIT_LIGHT : GRAY_200}`, background: value === opt ? HUGVIT_BLUE : WHITE, color: value === opt ? WHITE : GRAY_800, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>{opt}</button>))}</div>;
}
function MultiCheck({ options, value = [], onChange }) {
  const toggle = (opt) => { const next = value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]; onChange(next); };
  return <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{options.map((opt) => { const active = value.includes(opt); return <button key={opt} onClick={() => toggle(opt)} style={{ padding: "9px 18px", borderRadius: 10, border: `2px solid ${active ? HUGVIT_LIGHT : GRAY_200}`, background: active ? HUGVIT_BLUE + "12" : WHITE, color: active ? HUGVIT_BLUE : GRAY_800, fontSize: 14, fontWeight: active ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }}>{active ? "✓ " : ""}{opt}</button>; })}</div>;
}

export default function CompanyOnboarding() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);

  const setAnswer = (id, val) => setAnswers((prev) => ({ ...prev, [id]: val }));
  const allQs = sections.flatMap((s) => s.questions);
  const answeredCount = allQs.filter((q) => { if (q.condition) return true; const a = answers[q.id]; return a !== undefined && a !== "" && !(Array.isArray(a) && a.length === 0); }).length;
  const section = sections[currentSection];
  const isLast = currentSection === sections.length - 1;
  const pct = Math.round((answeredCount / allQs.length) * 100);
  const goTo = (idx) => { setAnimating(true); setTimeout(() => { setCurrentSection(idx); setAnimating(false); window.scrollTo({ top: 0, behavior: "smooth" }); }, 150); };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: HUGVIT_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: WHITE, borderRadius: 20, maxWidth: 560, width: "100%", margin: 20, boxShadow: "0 8px 40px rgba(26,60,97,0.08)", textAlign: "center", padding: "60px 24px" }}>
          <h2 style={{ fontSize: 26, color: HUGVIT_BLUE, fontWeight: 800, marginBottom: 12 }}>Takk fyrir upplýsingarnar</h2>
          <p style={{ fontSize: 16, color: GRAY_600, maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.7 }}>Ráðgjafi Hugvits mun fara yfir svörin og hafa samband til að staðfesta tímalínu og næstu skref. Þátttakendur munu fá sérstakan hlekk á undirbúningsefni og kynningarefni fyrir vinnustofuna.</p>
          <div style={{ background: HUGVIT_BG, borderRadius: 12, padding: "20px 24px", maxWidth: 400, margin: "0 auto 32px", textAlign: "left", border: `1px solid ${GRAY_200}` }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: HUGVIT_BLUE, marginBottom: 8 }}>Næstu skref:</p>
            <p style={{ fontSize: 14, color: GRAY_600, margin: "0 0 6px", lineHeight: 1.5 }}>1. Ráðgjafi fer yfir svör og undirbýr vinnustofu</p>
            <p style={{ fontSize: 14, color: GRAY_600, margin: "0 0 6px", lineHeight: 1.5 }}>2. Tengiliður fær staðfestingu á dagsetningum</p>
            <p style={{ fontSize: 14, color: GRAY_600, margin: "0 0 6px", lineHeight: 1.5 }}>3. Þátttakendur fá hlekk á einstaklingsbundinn undirbúning</p>
            <p style={{ fontSize: 14, color: GRAY_600, margin: 0, lineHeight: 1.5 }}>4. Vinnustofa hefst samkvæmt áætlun</p>
          </div>
          <div style={{ width: 60, height: 2, background: GRAY_200, margin: "0 auto 16px" }} />
          <p style={{ fontSize: 14, color: GRAY_400 }}>Hugvit hf. — hugvit.is — 510 3100</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: HUGVIT_BG }}>
      <div style={{ background: HUGVIT_BLUE, padding: "24px 0 28px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 4px 24px rgba(26,60,97,0.18)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <img src="/hugvit_logo.png" alt="Hugvit" style={{ height: 28, filter: "brightness(10)" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>Undirbúningur vinnupakka</span>
          </div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: WHITE, margin: "0 0 4px" }}>Málstjórnun með gervigreind</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>Upplýsingasöfnun fyrir vinnustofu</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{pct}% lokið</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{answeredCount} / {allQs.length}</span>
          </div>
          <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "rgba(255,255,255,0.8)", borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "14px 24px 0", display: "flex", gap: 4, overflowX: "auto" }}>
        {sections.map((s, i) => (<button key={s.id} onClick={() => goTo(i)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: i === currentSection ? HUGVIT_BLUE : GRAY_100, color: i === currentSection ? WHITE : GRAY_600, fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{s.num}</button>))}
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 24px 120px" }}>
        <div style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", boxShadow: "0 1px 12px rgba(26,60,97,0.05)", opacity: animating ? 0 : 1, transform: animating ? "translateX(20px)" : "translateX(0)", transition: "all 0.15s ease" }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: GRAY_400, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Kafli {currentSection + 1} af {sections.length}</span>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: HUGVIT_BLUE, margin: "6px 0 4px" }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: GRAY_600, margin: 0, lineHeight: 1.5 }}>{section.desc}</p>
          </div>
          {section.questions.map((q, qi) => {
            if (q.condition) { const val = answers[q.condition.id]; if (q.condition.contains && !(Array.isArray(val) && val.includes(q.condition.contains))) return null; if (q.condition.values && !q.condition.values.includes(val)) return null; }
            return (
              <div key={q.id} style={{ marginBottom: 22, paddingBottom: 22, borderBottom: qi < section.questions.length - 1 ? `1px solid ${GRAY_200}` : "none" }}>
                <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: GRAY_800, marginBottom: 10, lineHeight: 1.5 }}>{q.text}</label>
                {q.type === "input" && <InputField value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} placeholder={q.placeholder} />}
                {q.type === "textarea" && <TextArea value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} placeholder={q.placeholder} />}
                {q.type === "choice" && <ChoiceInput options={q.options} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />}
                {q.type === "multicheck" && <MultiCheck options={q.options} value={answers[q.id] || []} onChange={(v) => setAnswer(q.id, v)} />}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 12 }}>
          <button onClick={() => currentSection > 0 && goTo(currentSection - 1)} disabled={currentSection === 0} style={{ padding: "12px 24px", borderRadius: 10, border: `2px solid ${GRAY_200}`, background: WHITE, color: currentSection === 0 ? GRAY_400 : GRAY_800, fontSize: 14, fontWeight: 700, cursor: currentSection === 0 ? "default" : "pointer", opacity: currentSection === 0 ? 0.4 : 1 }}>Til baka</button>
          {isLast ? (
            <button onClick={() => { console.log("COMPANY_ONBOARDING", JSON.stringify(answers, null, 2)); setSubmitted(true); }} style={{ padding: "12px 32px", borderRadius: 10, border: "none", background: SUCCESS, color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Senda inn</button>
          ) : (
            <button onClick={() => goTo(currentSection + 1)} style={{ padding: "12px 24px", borderRadius: 10, border: "none", background: HUGVIT_BLUE, color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Áfram</button>
          )}
        </div>
      </div>
    </div>
  );
}
