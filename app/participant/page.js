"use client";

import { useState } from "react";

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

// ── PHASES DATA ──
const phases = [
  { num: "01", title: "Ræsing", duration: "2–3 klst.", desc: "Stuttur upphafsfundur. Umfang og tímalína staðfest. Þátttakendur tilnefndir." },
  { num: "02", title: "Vinnustofa", duration: "1–2 dagar", desc: "Ráðgjafi mætir til ykkar. Kortlögðum ferla, prófum gervigreind á raunverulegum gögnum og sýnum möguleika í GoPro Foris." },
  { num: "03", title: "Úrvinnsla", duration: "3–5 dagar", desc: "Hugvit vinnur úr niðurstöðum, byggir prompt-sniðmát og skrifar lokaskýrslu og vegvísi." },
  { num: "04", title: "Skil", duration: "2–3 klst.", desc: "Kynning á niðurstöðum, vegvísir afhentur og næstu skref samþykkt." },
];

const expectations = [
  { title: "Þú þarft ekki að vera tæknimenntaður", desc: "Gervigreindin er verkfæri — við erum að skoða ferlana þína og hvernig hún getur hjálpað í þinni daglegu vinnu." },
  { title: "Engin heimavinna", desc: "Þú þarft ekki að undirbúa neitt sérstaklega. Koma eins og þú ert, með reynslu þína og skoðanir." },
  { title: "Opnar umræður", desc: "Vinnustofan er samvinnuverkefni. Allar spurningar og athugasemdir eru velkomnar — sérstaklega gagnrýni á núverandi ferla." },
  { title: "Þetta er ekki prófun", desc: "Við erum ekki að meta ykkar vinnu. Við erum að leita að tækifærum til að gera hlutina einfaldari." },
];

const dayAgenda = [
  { time: "09:00", item: "Kynning og markmið dagsins" },
  { time: "09:30", item: "Sýnikennsla — gervigreindareiginleikar í GoPro Foris" },
  { time: "10:30", item: "Hlé" },
  { time: "10:45", item: "Yfirferð á núverandi ferlum — hvernig er þetta gert í dag?" },
  { time: "12:00", item: "Hádegishlé" },
  { time: "13:00", item: "Prófun á gervigreind á raunverulegum dæmum" },
  { time: "14:30", item: "Hlé" },
  { time: "14:45", item: "Umræður — tækifæri, áskoranir, forgangsröðun" },
  { time: "15:30", item: "Samantekt og næstu skref" },
  { time: "16:00", item: "Lok" },
];

const questions = [
  { id: "name", text: "Nafn þitt", type: "input" },
  { id: "role", text: "Starfsheiti / hlutverk", type: "input" },
  { id: "email", text: "Netfang", type: "input" },
  { id: "experience", text: "Hversu lengi hefur þú unnið með málastjórnunarkerfi?", type: "choice", options: ["Minna en 1 ár", "1–3 ár", "3–10 ár", "10+ ár"] },
  { id: "daily_tasks", text: "Hvaða verkefni eyðir þú mestum tíma í á hverjum degi?", type: "textarea", placeholder: "T.d. flokkun mála, svara erindum, uppfletting í eldri málum, skýrslugerð..." },
  { id: "frustration", text: "Hvað finnst þér mest pirrandi í núverandi vinnu?", type: "textarea", placeholder: "Endilega vertu hreinskilin/n — þetta hjálpar okkur að einbeita okkur að réttu hlutunum" },
  { id: "ai_comfort", text: "Hversu vel þekkir þú gervigreind?", type: "choice", options: ["Ekkert", "Hef heyrt af", "Hef prófað (ChatGPT o.þ.h.)", "Nota reglulega"] },
  { id: "hope", text: "Hvað vonast þú mest til að fá út úr vinnustofunni?", type: "textarea", placeholder: "Frjálst val — stórt eða smátt" },
  { id: "dietary", text: "Mataræði / ofnæmi (fyrir veitingar á vinnustofudegi)", type: "input", placeholder: "Ef við á" },
];

function InputField({ value, onChange, placeholder }) {
  return (
    <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || ""}
      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${GRAY_200}`,
        fontSize: 15, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", background: GRAY_100 }}
      onFocus={(e) => (e.target.style.borderColor = HUGVIT_LIGHT)}
      onBlur={(e) => (e.target.style.borderColor = GRAY_200)} />
  );
}

function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || ""} rows={3}
      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${GRAY_200}`,
        fontSize: 15, resize: "vertical", outline: "none", transition: "border-color 0.2s",
        boxSizing: "border-box", background: GRAY_100 }}
      onFocus={(e) => (e.target.style.borderColor = HUGVIT_LIGHT)}
      onBlur={(e) => (e.target.style.borderColor = GRAY_200)} />
  );
}

function ChoiceInput({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button key={opt} onClick={() => onChange(opt)} style={{
            padding: "9px 18px", borderRadius: 10,
            border: `2px solid ${active ? HUGVIT_LIGHT : GRAY_200}`,
            background: active ? HUGVIT_BLUE : WHITE, color: active ? WHITE : GRAY_800,
            fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
          }}>{opt}</button>
        );
      })}
    </div>
  );
}

export default function ParticipantOnboarding() {
  const [step, setStep] = useState("welcome"); // welcome | prepare | form | done
  const [answers, setAnswers] = useState({});

  const setAnswer = (id, val) => setAnswers((prev) => ({ ...prev, [id]: val }));

  // ── SHARED HEADER ──
  const Header = ({ subtitle }) => (
    <div style={{
      background: `linear-gradient(135deg, ${HUGVIT_BLUE} 0%, ${HUGVIT_MED} 100%)`,
      padding: "24px 0 28px", position: "sticky", top: 0, zIndex: 10,
      boxShadow: "0 4px 24px rgba(26,60,97,0.18)",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: WHITE, letterSpacing: 4 }}>HUGVIT</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Vinnupakki</span>
        </div>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: WHITE, margin: "0 0 4px" }}>Málstjórnun með gervigreind</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>{subtitle}</p>
      </div>
    </div>
  );

  // ── NAV DOTS ──
  const steps = ["welcome", "prepare", "form"];
  const NavDots = () => (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, margin: "20px 0" }}>
      {steps.map((s, i) => (
        <div key={s} style={{
          width: step === s ? 24 : 8, height: 8, borderRadius: 4,
          background: step === s ? HUGVIT_BLUE : steps.indexOf(step) > i ? SUCCESS : GRAY_200,
          transition: "all 0.3s ease",
        }} />
      ))}
    </div>
  );

  // ── WELCOME SCREEN ──
  if (step === "welcome") {
    return (
      <div style={{ minHeight: "100vh", background: HUGVIT_BG }}>
        <Header subtitle="Velkomin/n \u00ED vinnustofu" />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 24px 80px" }}>
          <NavDots />
          <div style={{ background: WHITE, borderRadius: 16, padding: "32px 24px", boxShadow: "0 1px 12px rgba(26,60,97,0.05)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: HUGVIT_BLUE, margin: "0 0 8px" }}>
              Velkomin/n
            </h2>
            <p style={{ fontSize: 15, color: GRAY_600, lineHeight: 1.7, margin: "0 0 28px" }}>
              Þú hefur verið boðið til að taka þátt í vinnustofu um gervigreind í málastjórnun.
              Vinnustofan er hluti af vinnupakka sem stofnun þín keypti af Hugvit og miðar að því
              að kanna hvernig gervigreind getur aukið skilvirkni í ykkar daglegri vinnu.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: HUGVIT_BLUE, margin: "0 0 16px" }}>
              Hvernig vinnupakkinn virkar
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {phases.map((p) => (
                <div key={p.num} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    minWidth: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: HUGVIT_BLUE, color: WHITE, fontSize: 13, fontWeight: 800,
                  }}>{p.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: GRAY_800 }}>{p.title}</span>
                      <span style={{ fontSize: 12, color: GRAY_400 }}>{p.duration}</span>
                    </div>
                    <p style={{ fontSize: 14, color: GRAY_600, margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: HUGVIT_BLUE, margin: "0 0 16px" }}>
              Hvað þú getur vænst
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 8 }}>
              {expectations.map((e, i) => (
                <div key={i} style={{ background: HUGVIT_BG, borderRadius: 10, padding: "14px 16px", borderLeft: `3px solid ${HUGVIT_LIGHT}` }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: HUGVIT_BLUE, margin: "0 0 4px" }}>{e.title}</p>
                  <p style={{ fontSize: 14, color: GRAY_600, margin: 0, lineHeight: 1.5 }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setStep("prepare")} style={{
              padding: "12px 28px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${HUGVIT_BLUE}, ${HUGVIT_MED})`,
              color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 4px 14px ${HUGVIT_BLUE}25`,
            }}>Áfram</button>
          </div>
        </div>
      </div>
    );
  }

  // ── PREPARE SCREEN ──
  if (step === "prepare") {
    return (
      <div style={{ minHeight: "100vh", background: HUGVIT_BG }}>
        <Header subtitle="Undirbúningur fyrir vinnustofu" />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 24px 80px" }}>
          <NavDots />
          <div style={{ background: WHITE, borderRadius: 16, padding: "32px 24px", boxShadow: "0 1px 12px rgba(26,60,97,0.05)", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: HUGVIT_BLUE, margin: "0 0 8px" }}>
              Dæmigerð dagskrá
            </h2>
            <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.5, margin: "0 0 20px" }}>
              Dagskráin er sveigjanleg og ráðgjafi lagar hana að ykkar þörfum. Hér er dæmigerð uppbygging:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {dayAgenda.map((item, i) => {
                const isBreak = item.item.toLowerCase().includes("hlé") || item.item.toLowerCase().includes("hádegi") || item.item.toLowerCase().includes("lok");
                return (
                  <div key={i} style={{
                    display: "flex", gap: 16, padding: "10px 0",
                    borderBottom: i < dayAgenda.length - 1 ? `1px solid ${GRAY_200}` : "none",
                    opacity: isBreak ? 0.5 : 1,
                  }}>
                    <span style={{ minWidth: 48, fontSize: 14, fontWeight: 700, color: HUGVIT_MED, fontVariantNumeric: "tabular-nums" }}>{item.time}</span>
                    <span style={{ fontSize: 14, color: GRAY_800, fontWeight: isBreak ? 400 : 500 }}>{item.item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", boxShadow: "0 1px 12px rgba(26,60,97,0.05)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: HUGVIT_BLUE, margin: "0 0 8px" }}>
              Hvað er gervigreind í málastjórnun?
            </h2>
            <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.7, margin: "0 0 16px" }}>
              Gervigreind (e. artificial intelligence) er tækni sem getur lesið, skilið og dregið saman texta á nokkrum sekúndum.
              Í málastjórnun þýðir þetta að kerfið getur:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[
                "Lesið innkomið erindi og dregið saman kjarnann á nokkrum sekúndum",
                "Flokkað mál sjálfkrafa eftir tegund, forgangsstigi eða efni",
                "Ráðlagt hvaða starfsmanni málið ætti að vera úthlutað",
                "Spáð fyrir um vinnuálag og flöskuhálsa",
                "Fundið tengd mál og fordæmi úr eldri málum",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    minWidth: 22, height: 22, borderRadius: 6, background: HUGVIT_BLUE + "10",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, color: HUGVIT_BLUE, marginTop: 1,
                  }}>{i + 1}</div>
                  <span style={{ fontSize: 14, color: GRAY_800, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: HUGVIT_BG, borderRadius: 10, padding: "16px 18px", borderLeft: `3px solid ${SUCCESS}` }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: HUGVIT_BLUE, margin: "0 0 4px" }}>Mundu</p>
              <p style={{ fontSize: 14, color: GRAY_600, margin: 0, lineHeight: 1.5 }}>
                Gervigreindin er verkfæri sem styður þig, ekki kemur í staðinn fyrir þig.
                Á vinnustofunni munum við skoða saman hvar hún getur hjálpað mest í ykkar vinnu.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 12 }}>
            <button onClick={() => setStep("welcome")} style={{
              padding: "12px 24px", borderRadius: 10, border: `2px solid ${GRAY_200}`, background: WHITE,
              color: GRAY_800, fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>Til baka</button>
            <button onClick={() => setStep("form")} style={{
              padding: "12px 28px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${HUGVIT_BLUE}, ${HUGVIT_MED})`,
              color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 4px 14px ${HUGVIT_BLUE}25`,
            }}>Áfram</button>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM SCREEN ──
  if (step === "form") {
    return (
      <div style={{ minHeight: "100vh", background: HUGVIT_BG }}>
        <Header subtitle="Stuttar upplýsingar um þig" />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 24px 80px" }}>
          <NavDots />
          <div style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", boxShadow: "0 1px 12px rgba(26,60,97,0.05)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: HUGVIT_BLUE, margin: "0 0 8px" }}>
              Stuttar spurningar
            </h2>
            <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.5, margin: "0 0 24px" }}>
              Þetta tekur 2–3 mínútur. Svörin hjálpa ráðgjafa að sérsníða vinnustofuna að ykkar hóp.
            </p>

            {questions.map((q, qi) => (
              <div key={q.id} style={{
                marginBottom: 22, paddingBottom: 22,
                borderBottom: qi < questions.length - 1 ? `1px solid ${GRAY_200}` : "none",
              }}>
                <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: GRAY_800, marginBottom: 10, lineHeight: 1.5 }}>
                  {q.text}
                </label>
                {q.type === "input" && <InputField value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} placeholder={q.placeholder} />}
                {q.type === "textarea" && <TextArea value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} placeholder={q.placeholder} />}
                {q.type === "choice" && <ChoiceInput options={q.options} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 12 }}>
            <button onClick={() => setStep("prepare")} style={{
              padding: "12px 24px", borderRadius: 10, border: `2px solid ${GRAY_200}`, background: WHITE,
              color: GRAY_800, fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>Til baka</button>
            <button onClick={() => { console.log("PARTICIPANT_ONBOARDING", JSON.stringify(answers, null, 2)); setStep("done"); }} style={{
              padding: "12px 32px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${SUCCESS}, #219A52)`,
              color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 4px 14px ${SUCCESS}35`,
            }}>Senda inn</button>
          </div>
        </div>
      </div>
    );
  }

  // ── DONE SCREEN ──
  return (
    <div style={{ minHeight: "100vh", background: HUGVIT_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: WHITE, borderRadius: 20, maxWidth: 560, width: "100%", margin: 20, boxShadow: "0 8px 40px rgba(26,60,97,0.08)", textAlign: "center", padding: "60px 28px" }}>
        <h2 style={{ fontSize: 26, color: HUGVIT_BLUE, fontWeight: 800, marginBottom: 12 }}>Takk, {answers.name || "þátttakandi"}</h2>
        <p style={{ fontSize: 16, color: GRAY_600, maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.7 }}>
          Þú ert tilbúin/n. Ráðgjafi Hugvits mun nota svör þín til að sérsníða vinnustofuna.
          Þú færð dagskrá og staðfestingu í tölvupósti áður en vinnustofan hefst.
        </p>
        <div style={{ background: HUGVIT_BG, borderRadius: 12, padding: "18px 22px", maxWidth: 380, margin: "0 auto 32px", textAlign: "left" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: HUGVIT_BLUE, margin: "0 0 8px" }}>Til að muna:</p>
          <p style={{ fontSize: 14, color: GRAY_600, margin: "0 0 4px", lineHeight: 1.5 }}>Koma eins og þú ert</p>
          <p style={{ fontSize: 14, color: GRAY_600, margin: "0 0 4px", lineHeight: 1.5 }}>Engin heimavinna</p>
          <p style={{ fontSize: 14, color: GRAY_600, margin: "0 0 4px", lineHeight: 1.5 }}>Allar spurningar velkomnar</p>
          <p style={{ fontSize: 14, color: GRAY_600, margin: 0, lineHeight: 1.5 }}>Opið og trúnaðarsamræður</p>
        </div>
        <div style={{ width: 60, height: 2, background: GRAY_200, margin: "0 auto 16px" }} />
        <p style={{ fontSize: 14, color: GRAY_400 }}>Hugvit hf. — hugvit.is — 510 3100</p>
      </div>
    </div>
  );
}
