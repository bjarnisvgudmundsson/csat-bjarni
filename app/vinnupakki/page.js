"use client";

import { useState, useEffect, useRef } from "react";

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

function Counter({ end, suffix = "", duration = 1500 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const pct = Math.min((now - start) / duration, 1);
          setVal(Math.round(pct * end));
          if (pct < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Section({ children, bg = WHITE, id }) {
  return (<section id={id} style={{ background: bg, padding: "64px 24px" }}><div style={{ maxWidth: 780, margin: "0 auto" }}>{children}</div></section>);
}

export default function LandingPage() {
  const [formData, setFormData] = useState({});
  const [formSent, setFormSent] = useState(false);
  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: GRAY_800 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');* { box-sizing: border-box; margin: 0; padding: 0; }html { scroll-behavior: smooth; }a { color: ${HUGVIT_LIGHT}; text-decoration: none; }a:hover { text-decoration: underline; }`}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: WHITE, borderBottom: `1px solid ${GRAY_200}`, padding: "12px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/hugvit_logo.png" alt="Hugvit" style={{ height: 32 }} />
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#hvad" style={{ fontSize: 13, fontWeight: 600, color: GRAY_600, textDecoration: "none" }}>Hvað</a>
            <a href="#hvernig" style={{ fontSize: 13, fontWeight: 600, color: GRAY_600, textDecoration: "none" }}>Hvernig</a>
            <a href="#hverjir" style={{ fontSize: 13, fontWeight: 600, color: GRAY_600, textDecoration: "none" }}>Hverjir</a>
            <a href="#samband" style={{ fontSize: 13, fontWeight: 700, color: WHITE, background: HUGVIT_BLUE, padding: "8px 18px", borderRadius: 8, textDecoration: "none" }}>Hafa samband</a>
          </div>
        </div>
      </nav>

      <section style={{ background: HUGVIT_BLUE, padding: "80px 24px 72px", color: WHITE }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.5, marginBottom: 16, textTransform: "uppercase" }}>Vinnupakki</p>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, maxWidth: 600 }}>Málastjórnun með gervigreind</h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.85, maxWidth: 560, marginBottom: 36 }}>Staðlað ráðgjafarverkefni sem greinir málastjórnunarferla þína og kannar hvernig gervigreind getur aukið skilvirkni, dregið úr handvirkri vinnu og styrkt ákvarðanatöku — á föstu verði, á 2–3 vikum.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#samband" style={{ padding: "14px 28px", borderRadius: 10, background: WHITE, color: HUGVIT_BLUE, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Bóka kynningu</a>
            <a href="#hvad" style={{ padding: "14px 28px", borderRadius: 10, background: "transparent", color: WHITE, fontWeight: 700, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>Sjá nánar</a>
          </div>
        </div>
      </section>

      <section style={{ background: HUGVIT_BG, padding: "48px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", textAlign: "center" }}>
          {[{ num: 60, suffix: "%", label: "Markaðshlutdeild á Íslandi" }, { num: 25, suffix: "+", label: "Ár í málastjórnun" }, { num: 3, suffix: " vikur", label: "Frá upphafi til skila" }].map((s) => (
            <div key={s.label} style={{ minWidth: 160 }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: HUGVIT_BLUE }}><Counter end={s.num} suffix={s.suffix} /></div>
              <div style={{ fontSize: 14, color: GRAY_600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Section id="hvad">
        <p style={{ fontSize: 13, fontWeight: 700, color: HUGVIT_LIGHT, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Hvað</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: HUGVIT_BLUE, marginBottom: 16 }}>Hvað er vinnupakki?</h2>
        <p style={{ fontSize: 16, color: GRAY_600, lineHeight: 1.8, marginBottom: 28 }}>Vinnupakki er afmarkað ráðgjafarverkefni á föstu verði þar sem ráðgjafi Hugvits kemur til þín, greinir ferla, prófar lausnir á raunverulegum gögnum og skilar skýrslu með tillögum og vegvísi. Engin opin tímavinna — fast verð, tryggður árangur og skýrar afurðir.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[{ title: "Sjálfvirk samantekt mála og skjala", desc: "Gervigreindin les innihald mála og dregur saman kjarnann á sekúndum. Starfsfólk þarf ekki lengur að opna og lesa hvert skjal til að skilja stöðuna." },
            { title: "Prompt-sniðmát í GoPro Foris", desc: "Við byggjum upp sérsniðin prompt-sniðmát sem starfsfólk getur notað beint í kerfinu til samræmdrar og skilvirkrar greiningar." },
            { title: "Sjálfvirk flokkun og úthlutun", desc: "Könnun á möguleikum gervigreindar til að flokka innkomin mál sjálfkrafa eftir tegund, forgangsstigi og ráðlögð úthlutun." },
            { title: "Eigindaskráning úr texta", desc: "Gervigreind greinir eigindi úr texta erindsins — tegund, aðila, tímafresti, lagaákvæði — og skráir sjálfkrafa." },
            { title: "Forspárgreining á vinnuálagi", desc: "Greining á mynstrum í innkomnum málum til að spá fyrir um álag og flöskuhálsa." }
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: HUGVIT_BG, borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: HUGVIT_BLUE, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, marginTop: 2 }}>{i + 1}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: GRAY_800, marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="hvernig" bg={HUGVIT_BG}>
        <p style={{ fontSize: 13, fontWeight: 700, color: HUGVIT_LIGHT, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Hvernig</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: HUGVIT_BLUE, marginBottom: 8 }}>Fjögur skref. 2–3 vikur. Skýrar afurðir.</h2>
        <p style={{ fontSize: 15, color: GRAY_600, lineHeight: 1.7, marginBottom: 32 }}>Öll verkefni fylgja sömu aðferðafræði sem hefur verið mótuð í fjölmörgum vinnustofum hjá stofnunum og dómstólum á Íslandi og erlendis.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[{ num: "01", title: "Ræsing", time: "2–3 klst.", desc: "Upphafsfundur, umfang staðfest, gátlisti sendur á þig. Verkefnið byrjar ekki fyrr en allt liggur fyrir.", color: HUGVIT_BLUE },
            { num: "02", title: "Vinnustofa", time: "1–2 dagur", desc: "Ráðgjafi mætir, kortleggur ferla, sýnir gervigreindareiginleika á raunverulegum gögnum og prófar prompt-sniðmát með þínu fólki.", color: HUGVIT_MED },
            { num: "03", title: "Úrvinnsla", time: "3–5 dagar", desc: "Hugvit vinnur úr niðurstöðum, byggir prompt-sniðmát, skrifar lokaskýrslu og vegvísi.", color: HUGVIT_LIGHT },
            { num: "04", title: "Skil", time: "2–3 klst.", desc: "Kynning á niðurstöðum fyrir stjórnendur. Vegvísir, tillögur og næstu skref afhent.", color: SUCCESS }
          ].map((step, i) => (
            <div key={step.num} style={{ display: "flex", gap: 20, position: "relative", paddingBottom: i < 3 ? 32 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 48 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: step.color, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800 }}>{step.num}</div>
                {i < 3 && <div style={{ width: 2, flex: 1, background: GRAY_200, marginTop: 4 }} />}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: GRAY_800, margin: 0 }}>{step.title}</h3>
                  <span style={{ fontSize: 13, color: GRAY_400 }}>{step.time}</span>
                </div>
                <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <p style={{ fontSize: 13, fontWeight: 700, color: HUGVIT_LIGHT, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Afurðir</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: HUGVIT_BLUE, marginBottom: 24 }}>Hvað þú færð</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[{ title: "Lokaskýrsla", desc: "As-is greining, niðurstöður úr prófunum, tillögur forgangsraðaðar" }, { title: "Vegvísir", desc: "Stuttur, miðlungs og langur tími — skref, kostnaður, ROI" }, { title: "Kynningarglærur", desc: "Tilbúnar til notkunar fyrir þína stjórnendur" }, { title: "Prompt-sniðmát", desc: "Prófuð og tilbúin í GoPro Foris" }, { title: "Þjálfunarefni", desc: "Stutt leiðbeiningar og notkunarhandbók" }].map((d, i) => (
            <div key={i} style={{ background: WHITE, borderRadius: 12, padding: "20px 18px", border: `1px solid ${GRAY_200}` }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: HUGVIT_BLUE, marginBottom: 6 }}>{d.title}</p>
              <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.5, margin: 0 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="hverjir" bg={HUGVIT_BG}>
        <p style={{ fontSize: 13, fontWeight: 700, color: HUGVIT_LIGHT, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Hverjir</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: HUGVIT_BLUE, marginBottom: 8 }}>Er þetta fyrir mig?</h2>
        <p style={{ fontSize: 15, color: GRAY_600, lineHeight: 1.7, marginBottom: 28 }}>Pakkinn hentar stofnunum sem vinna með mikinn fjölda mála og vilja kanna hvernig gervigreind getur bætt starfsemina — hvort sem þú ert núverandi viðskiptavinur Hugvits eða nýr.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: WHITE, borderRadius: 14, padding: "24px 22px", border: `2px solid ${HUGVIT_LIGHT}40` }}>
            <div style={{ marginBottom: 12 }}><span style={{ padding: "4px 10px", borderRadius: 6, background: HUGVIT_BLUE, color: WHITE, fontSize: 12, fontWeight: 700 }}>GoPro Foris viðskiptavinir</span></div>
            <p style={{ fontSize: 15, fontWeight: 700, color: GRAY_800, marginBottom: 6 }}>Þú notar nú þegar GoPro Foris og vilt nýta gervigreind</p>
            <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.6, marginBottom: 12 }}>Ráðgjafi okkar þekkir kerfið þitt, hefur aðgang að sýnieiginleikum og getur prófað beint á ykkar uppsetningu. Stystir leiðin frá hugmynd til niðurstöðu.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["50+ notendur", "1.000+ mál á ári", "Viðurkennd þörf á hagræðingu"].map((t) => (<span key={t} style={{ padding: "6px 12px", borderRadius: 6, background: HUGVIT_BG, fontSize: 13, fontWeight: 600, color: HUGVIT_MED }}>{t}</span>))}</div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, padding: "24px 22px", border: `1px solid ${GRAY_200}` }}>
            <div style={{ marginBottom: 12 }}><span style={{ padding: "4px 10px", borderRadius: 6, background: GRAY_600, color: WHITE, fontSize: 12, fontWeight: 700 }}>Nýir viðskiptavinir</span></div>
            <p style={{ fontSize: 15, fontWeight: 700, color: GRAY_800, marginBottom: 6 }}>Þú notar ekki GoPro Foris en hefur áhuga á gervigreind í málastjórnun</p>
            <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.6, marginBottom: 12 }}>Vinnupakkinn er góð leið til að byrja. Við greinum ykkar ferla og þarfir og sýnum möguleika — án skuldbindingar um kerfisskipti. Niðurstöðurnar eru ykkar hvort sem þið haldið áfram með okkur eða ekki.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["Ríkisstofnanir", "Sveitarfélög", "Fjármálafyrirtæki", "Dómstólar"].map((t) => (<span key={t} style={{ padding: "6px 12px", borderRadius: 6, background: GRAY_100, fontSize: 13, fontWeight: 600, color: GRAY_600 }}>{t}</span>))}</div>
          </div>
        </div>
      </Section>

      <Section>
        <p style={{ fontSize: 13, fontWeight: 700, color: HUGVIT_LIGHT, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Reynsla</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: HUGVIT_BLUE, marginBottom: 24 }}>Aðferðafræði prófuð á alþjóðavettvangi</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[{ org: "Alþjóðlegir dómstólar", text: "Vinnustofur hjá alþjóðlegum dómstólum þar sem unnið var með starfsfólki réttarskrifstofunnar, lögfræðideildar og skjalasafns. Verkflæði kortlögð, sandbox sett upp samhliða og gervigreindarfærni prófuð á raunverulegum málum." },
            { org: "Fangelsis- og réttarvörslustofnanir", text: "Greining á ferlum frá móttöku til endalausnar. Eldri kerfi skipt út fyrir stafræna ferla. BPMN-líkön unnin og verkflæði sjálfvirkjuð." },
            { org: "Ráðuneyti og ríkisstofnanir", text: "Fjölmörg verkefni hjá ráðuneytum og stofnunum þar sem málaferlum hefur verið umbreytt með GoPro Foris og Casedoc, þ.m.t. eftirlitsstofnanir, skattyfirvöld og sveitarfélög." }
          ].map((c, i) => (
            <div key={i} style={{ background: HUGVIT_BG, borderRadius: 12, padding: "20px 22px", border: `1px solid ${GRAY_200}` }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: HUGVIT_BLUE, marginBottom: 6 }}>{c.org}</p>
              <p style={{ fontSize: 14, color: GRAY_600, lineHeight: 1.6, margin: 0 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg={HUGVIT_BG}>
        <p style={{ fontSize: 13, fontWeight: 700, color: HUGVIT_LIGHT, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Verðlagning</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: HUGVIT_BLUE, marginBottom: 8 }}>Fast verð. Enginn kostnaður í huldu.</h2>
        <p style={{ fontSize: 15, color: GRAY_600, lineHeight: 1.7, marginBottom: 24 }}>Umfang er staðfest fyrir verkefnið og verð er fast frá upphafi. Enginn kostnaður umfram samninginn.</p>
        <div style={{ background: WHITE, borderRadius: 14, padding: "28px 24px", border: `1px solid ${GRAY_200}` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: HUGVIT_BLUE }}>1,2 – 2,0 M</span>
            <span style={{ fontSize: 16, color: GRAY_400 }}>ISK</span>
          </div>
          <p style={{ fontSize: 14, color: GRAY_600, marginBottom: 20 }}>Verðbilið fer eftir umfangi, fjölda notenda og tæknilegri flækju.</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Allir 4 fasar innifaldir", "Lokaskýrsla og vegvísir", "Prompt-sniðmát tilbúin", "Kynningarglærur innifaldar"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: GRAY_800 }}><span style={{ color: SUCCESS, fontWeight: 800, fontSize: 16 }}>&#10003;</span>{t}</div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="samband">
        <p style={{ fontSize: 13, fontWeight: 700, color: HUGVIT_LIGHT, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Samband</p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: HUGVIT_BLUE, marginBottom: 8 }}>Smelltu upplýsingum hér og við höfum samband</h2>
        <p style={{ fontSize: 15, color: GRAY_600, lineHeight: 1.7, marginBottom: 28 }}>Fylltu út hér að neðan og við munum hafa samband til að ræða hvort pakkinn hentar þér. Engin skuldbinding.</p>
        {formSent ? (
          <div style={{ background: SUCCESS + "10", borderRadius: 14, padding: "32px 24px", textAlign: "center", border: `1px solid ${SUCCESS}30` }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: SUCCESS, marginBottom: 8 }}>Takk fyrir áhugann</h3>
            <p style={{ fontSize: 15, color: GRAY_600, margin: 0 }}>Við munum hafa samband innan tveggja virkra daga til að bóka kynningu.</p>
          </div>
        ) : (
          <div style={{ background: WHITE, borderRadius: 14, padding: "28px 24px", border: `1px solid ${GRAY_200}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {[{ id: "name", label: "Nafn", ph: "Fullt nafn" }, { id: "org", label: "Stofnun / fyrirtæki", ph: "" }, { id: "email", label: "Netfang", ph: "nafn@stofnun.is" }, { id: "phone", label: "Símanúmer", ph: "+354" }].map((f) => (
                <div key={f.id}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY_600, marginBottom: 4 }}>{f.label}</label>
                  <input value={formData[f.id] || ""} onChange={(e) => set(f.id, e.target.value)} placeholder={f.ph} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `2px solid ${GRAY_200}`, fontSize: 14, outline: "none", background: GRAY_100, boxSizing: "border-box" }} onFocus={(e) => (e.target.style.borderColor = HUGVIT_LIGHT)} onBlur={(e) => (e.target.style.borderColor = GRAY_200)} />
                </div>
              ))}
            </div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY_600, marginBottom: 4 }}>Ertu núverandi GoPro Foris viðskiptavinur?</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {["Já", "Nei", "Veit ekki"].map((opt) => (<button key={opt} onClick={() => set("customer", opt)} style={{ padding: "8px 18px", borderRadius: 8, border: `2px solid ${formData.customer === opt ? HUGVIT_LIGHT : GRAY_200}`, background: formData.customer === opt ? HUGVIT_BLUE : WHITE, color: formData.customer === opt ? WHITE : GRAY_800, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{opt}</button>))}
            </div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY_600, marginBottom: 4 }}>Stutt lýsing á áhuga eða spurningum</label>
            <textarea value={formData.notes || ""} onChange={(e) => set("notes", e.target.value)} rows={3} placeholder="Frjálst val..." style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `2px solid ${GRAY_200}`, fontSize: 14, outline: "none", background: GRAY_100, boxSizing: "border-box", resize: "vertical", marginBottom: 18 }} onFocus={(e) => (e.target.style.borderColor = HUGVIT_LIGHT)} onBlur={(e) => (e.target.style.borderColor = GRAY_200)} />
            <button onClick={() => { console.log("LEAD_FORM", JSON.stringify(formData, null, 2)); setFormSent(true); }} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", background: HUGVIT_BLUE, color: WHITE, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Senda fyrirspurn</button>
            <p style={{ fontSize: 12, color: GRAY_400, textAlign: "center", marginTop: 10 }}>Engin skuldbinding. Við höfum samband innan tveggja virkra daga.</p>
          </div>
        )}
      </Section>

      <footer style={{ background: HUGVIT_BLUE, padding: "36px 24px", color: "rgba(255,255,255,0.5)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <img src="/hugvit_logo.png" alt="Hugvit" style={{ height: 24, filter: "brightness(10)" }} />
            <p style={{ fontSize: 13, margin: "6px 0 0" }}>Tunguháls 19</p>
          </div>
          <div style={{ textAlign: "right", fontSize: 13 }}><p style={{ margin: "0 0 4px" }}>510 3100</p><p style={{ margin: 0 }}>hugvit.is</p></div>
        </div>
      </footer>
    </div>
  );
}
