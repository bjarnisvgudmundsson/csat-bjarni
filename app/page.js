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
const WARN = "#E67E22";
const DANGER = "#E74C3C";

const sections = [
  { id: "undirbuningur", title: "Undirbúningur og ræsing", num: "01", questions: [
    { id: "q1", text: "Hversu skýr var gátlistinn sem þú fékkst fyrir vinnustofu?", type: "rating" },
    { id: "q2", text: "Var auðvelt að útvega þær upplýsingar og aðgang sem óskað var eftir?", type: "rating" },
    { id: "q3", text: "Var tímalínan raunhæf og skýr frá upphafi?", type: "rating" },
  ]},
  { id: "vinnustofa", title: "Vinnustofan", num: "02", questions: [
    { id: "q4", text: "Hversu vel undirbúinn var ráðgjafinn?", type: "rating" },
    { id: "q5", text: "Hversu vel náðist að kortleggja núverandi ferla (as-is)?", type: "rating" },
    { id: "q6", text: "Hversu gagnlegar voru gervigreindarprófanirnar á raunverulegum gögnum?", type: "rating" },
    { id: "q7", text: "Var nægilegt rými til umræðu og spurninga frá þínu fólki?", type: "rating" },
    { id: "q8", text: "Voru réttir aðilar af ykkar hálfu á vinnustofunni?", type: "choice", options: ["Já", "Nei", "Að hluta"] },
    { id: "q8b", text: "Ef nei eða að hluta — hverjir vantaði?", type: "text", condition: { id: "q8", values: ["Nei", "Að hluta"] } },
  ]},
  { id: "efnistok", title: "Efnistök og innihald", num: "03", questions: [
    { id: "q9", text: "Hversu mikilvæg er sjálfvirk samantekt mála og skjala fyrir ykkur?", type: "rating" },
    { id: "q10", text: "Hversu vel henta prompt-sniðmátin sem sett voru upp?", type: "rating" },
    { id: "q11", text: "Hversu raunhæfar finnast þér tillögurnar um sjálfvirka flokkun og úthlutun?", type: "rating" },
    { id: "q12", text: "Hversu gagnleg var forspárgreiningin á vinnuálagi?", type: "rating" },
    { id: "q13", text: "Hvaða efnistök skiptu þig mestu máli?", type: "text" },
  ]},
  { id: "skilagogn", title: "Skilagögn", num: "04", questions: [
    { id: "q14", text: "Hversu hagnýt var lokaskýrslan?", type: "rating" },
    { id: "q15", text: "Hversu skýr og raunhæfur var vegvísirinn (roadmap)?", type: "rating" },
    { id: "q16", text: "Voru kynningarglærurnar nothæfar til að kynna niðurstöður fyrir ykkar stjórnendum?", type: "rating" },
    { id: "q17", text: "Var eitthvað sem þú hefðir viljað fá sem skilagagn en fékkst ekki?", type: "text" },
  ]},
  { id: "heildarmat", title: "Heildarmat", num: "05", questions: [
    { id: "q18", text: "Hversu vel uppfyllti pakkinn væntingar þínar í heild?", type: "rating" },
    { id: "q19", text: "Hversu líklegt er að þú mælir með þessari þjónustu við aðra?", type: "nps" },
    { id: "q20", text: "Hefur þú áhuga á framhaldspakka eða frekari vinnu?", type: "choice", options: ["Já", "Kannski", "Nei"] },
    { id: "q21", text: "Hvað var best?", type: "text" },
    { id: "q22", text: "Hvað myndum við gera öðruvísi næst?", type: "text" },
  ]},
];

const ratingLabels = ["Mjög slæmt", "Slæmt", "Í lagi", "Gott", "Frábært"];

function RatingInput({ value, onChange }) {
  const [hover, setHover] = useState(null);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      {[1,2,3,4,5].map((n) => { const active = value === n; const hovered = hover === n; return (
        <button key={n} onClick={() => onChange(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(null)} style={{
          width: 52, height: 52, borderRadius: 10, border: `2px solid ${active ? HUGVIT_LIGHT : hovered ? HUGVIT_MED : GRAY_200}`,
          background: active ? HUGVIT_BLUE : hovered ? HUGVIT_BG : WHITE, color: active ? WHITE : hovered ? HUGVIT_BLUE : GRAY_800,
          fontSize: 18, fontWeight: 700, cursor: "pointer", transition: "all 0.15s ease", transform: active ? "scale(1.08)" : "scale(1)",
          boxShadow: active ? `0 4px 14px ${HUGVIT_BLUE}35` : "none",
        }}>{n}</button>);
      })}
      <span style={{ fontSize: 13, color: GRAY_400, marginLeft: 8, fontStyle: "italic" }}>{hover ? ratingLabels[hover-1] : value ? ratingLabels[value-1] : ""}</span>
    </div>
  );
}

function NPSInput({ value, onChange }) {
  const [hover, setHover] = useState(null);
  const getColor = (n) => (n <= 6 ? DANGER : n <= 8 ? WARN : SUCCESS);
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({length:11},(_,i)=>i).map((n) => { const active = value === n; const hovered = hover === n; const c = getColor(n); return (
          <button key={n} onClick={() => onChange(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(null)} style={{
            width: 42, height: 42, borderRadius: 8, border: `2px solid ${active ? c : hovered ? c+"80" : GRAY_200}`,
            background: active ? c : hovered ? c+"12" : WHITE, color: active ? WHITE : GRAY_800,
            fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.15s ease", transform: active ? "scale(1.1)" : "scale(1)",
          }}>{n}</button>);
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: GRAY_400 }}><span>Mjög ólíklegt</span><span>Mjög líklegt</span></div>
    </div>
  );
}

function ChoiceInput({ options, value, onChange }) {
  return <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{options.map((opt) => { const active = value === opt; return (
    <button key={opt} onClick={() => onChange(opt)} style={{ padding: "10px 24px", borderRadius: 10, border: `2px solid ${active ? HUGVIT_LIGHT : GRAY_200}`, background: active ? HUGVIT_BLUE : WHITE, color: active ? WHITE : GRAY_800, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>{opt}</button>);
  })}</div>;
}

function TextInput({ value, onChange }) {
  return <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Skrifaðu hér..." rows={3} style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: `2px solid ${GRAY_200}`, fontSize: 15, resize: "vertical", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", background: GRAY_100 }} onFocus={(e) => (e.target.style.borderColor = HUGVIT_LIGHT)} onBlur={(e) => (e.target.style.borderColor = GRAY_200)} />;
}

function ThankYou({ answers }) {
  const ratings = Object.entries(answers).filter(([k,v]) => typeof v === "number" && v >= 1 && v <= 5 && k !== "q19").map(([,v]) => v);
  const avg = ratings.length > 0 ? (ratings.reduce((a,b) => a+b, 0) / ratings.length).toFixed(1) : "—";
  const nps = answers.q19;
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h2 style={{ fontSize: 28, color: HUGVIT_BLUE, fontWeight: 800, marginBottom: 12 }}>Takk fyrir þátttökuna</h2>
      <p style={{ fontSize: 16, color: GRAY_600, maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.7 }}>Svör þín hjálpa okkur að bæta þjónustu okkar. Við munum fara yfir athugasemdir þínar og nota þær til að bæta framtíðar vinnupakka.</p>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
        <div style={{ background: HUGVIT_BLUE, color: WHITE, borderRadius: 14, padding: "20px 36px", minWidth: 140 }}>
          <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>CSAT</div>
          <div style={{ fontSize: 36, fontWeight: 800 }}>{avg}</div>
          <div style={{ fontSize: 13, opacity: 0.6 }}>af 5.0</div>
        </div>
        {nps !== undefined && (
          <div style={{ background: nps >= 9 ? SUCCESS : nps >= 7 ? WARN : DANGER, color: WHITE, borderRadius: 14, padding: "20px 36px", minWidth: 140 }}>
            <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>NPS</div>
            <div style={{ fontSize: 36, fontWeight: 800 }}>{nps}</div>
            <div style={{ fontSize: 13, opacity: 0.6 }}>af 10</div>
          </div>
        )}
      </div>
      <div style={{ width: 60, height: 2, background: GRAY_200, margin: "0 auto 20px" }} />
      <p style={{ fontSize: 14, color: GRAY_400 }}>Hugvit hf. — hugvit.is — 510 3100</p>
    </div>
  );
}

export default function Page() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);
  const setAnswer = (id, val) => setAnswers((prev) => ({ ...prev, [id]: val }));
  const allQuestions = sections.flatMap((s) => s.questions);
  const answeredCount = allQuestions.filter((q) => { if (q.condition) { const cv = answers[q.condition.id]; if (!q.condition.values.includes(cv)) return true; } return answers[q.id] !== undefined && answers[q.id] !== ""; }).length;
  const section = sections[currentSection];
  const isLast = currentSection === sections.length - 1;
  const pct = Math.round((answeredCount / allQuestions.length) * 100);
  const goTo = (idx) => { setAnimating(true); setTimeout(() => { setCurrentSection(idx); setAnimating(false); if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: "smooth" }); }, 150); };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: HUGVIT_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: WHITE, borderRadius: 20, maxWidth: 560, width: "100%", margin: 20, boxShadow: "0 8px 40px rgba(26,60,97,0.08)" }}><ThankYou answers={answers} /></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: HUGVIT_BG }}>
      <div style={{ background: HUGVIT_BLUE, padding: "24px 0 28px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 4px 24px rgba(26,60,97,0.18)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <img src="/hugvit_logo.png" alt="Hugvit" style={{ height: 36, filter: "invert(1) brightness(2)" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Ánægjukönnun</span>
          </div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: WHITE, margin: "0 0 4px" }}>Málstjórnun með gervigreind</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>Vinnupakki — Endurgjöf viðskiptavinar</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{pct}% lokið</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{answeredCount} / {allQuestions.length}</span>
          </div>
          <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "rgba(255,255,255,0.8)", borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "14px 24px 0", display: "flex", gap: 4, overflowX: "auto" }}>
        {sections.map((s, i) => {
          const active = i === currentSection;
          const sQs = s.questions.filter((q) => !q.condition || answers[q.condition?.id] !== undefined);
          const sAns = sQs.filter((q) => answers[q.id] !== undefined && answers[q.id] !== "").length;
          const done = sAns === sQs.length && sQs.length > 0;
          return <button key={s.id} onClick={() => goTo(i)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: active ? HUGVIT_BLUE : done ? SUCCESS+"12" : GRAY_100, color: active ? WHITE : done ? SUCCESS : GRAY_600, fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{s.num}{done && !active ? " ✓" : ""}</button>;
        })}
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 24px 120px" }}>
        <div style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", boxShadow: "0 1px 12px rgba(26,60,97,0.05)", opacity: animating ? 0 : 1, transform: animating ? "translateX(20px)" : "translateX(0)", transition: "all 0.15s ease" }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: GRAY_400, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Kafli {currentSection+1} af {sections.length}</span>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: HUGVIT_BLUE, margin: "6px 0 0" }}>{section.title}</h2>
          </div>
          {section.questions.map((q, qi) => {
            if (q.condition) { const cv = answers[q.condition.id]; if (!q.condition.values.includes(cv)) return null; }
            return (
              <div key={q.id} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: qi < section.questions.length - 1 ? `1px solid ${GRAY_200}` : "none" }}>
                <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: GRAY_800, marginBottom: 12, lineHeight: 1.5 }}>{q.text}</label>
                {q.type === "rating" && <RatingInput value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />}
                {q.type === "nps" && <NPSInput value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />}
                {q.type === "choice" && <ChoiceInput options={q.options} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />}
                {q.type === "text" && <TextInput value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 12 }}>
          <button onClick={() => currentSection > 0 && goTo(currentSection-1)} disabled={currentSection === 0} style={{ padding: "12px 24px", borderRadius: 10, border: `2px solid ${GRAY_200}`, background: WHITE, color: currentSection === 0 ? GRAY_400 : GRAY_800, fontSize: 14, fontWeight: 700, cursor: currentSection === 0 ? "default" : "pointer", opacity: currentSection === 0 ? 0.4 : 1 }}>Til baka</button>
          {isLast ? (
            <button onClick={() => { console.log("CSAT_SUBMISSION", JSON.stringify(answers, null, 2)); setSubmitted(true); }} style={{ padding: "12px 32px", borderRadius: 10, border: "none", background: SUCCESS, color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Senda inn</button>
          ) : (
            <button onClick={() => goTo(currentSection+1)} style={{ padding: "12px 24px", borderRadius: 10, border: "none", background: HUGVIT_BLUE, color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Áfram</button>
          )}
        </div>
      </div>
    </div>
  );
}
