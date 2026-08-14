import React, { useState, useRef } from "react";
import heroImage from "./assets/aethel-hero.jpg";

const regions = {
  Orun: {
    kicker: "01 — Northern Reach",
    title: "Orun",
    subtitle: "The city that listened to ice",
    text: "Set where the great ice met the western sea, Orun's basalt halls were tuned to the slow movement of the glacier. Its keepers measured seasons in sound, not days.",
    stat: "46,000",
    label: "estimated inhabitants",
    temp: "−08°",
    season: "LONG NIGHT"
  },
  Tavra: {
    kicker: "02 — Ember Coast",
    title: "Tavra",
    subtitle: "Gardens beneath the ash",
    text: "Warm volcanic terraces fed an impossible abundance: bitter orange, black barley and medicinal moss. Copper mirrors carried daylight deep into the city's cultivated caverns.",
    stat: "82,000",
    label: "estimated inhabitants",
    temp: "+18°",
    season: "ASH BLOOM"
  },
  Suun: {
    kicker: "03 — Inland Sea",
    title: "Suun",
    subtitle: "A fleet without an ocean",
    text: "Reed-built vessels crossed a freshwater sea larger than memory. Suun's navigators charted magnetic currents on fired-clay discs and traded salt glass across six cultures.",
    stat: "31,000",
    label: "estimated inhabitants",
    temp: "+12°",
    season: "HIGH WATER"
  },
  Kheled: {
    kicker: "04 — Sunward Plain",
    title: "Kheled",
    subtitle: "Where stone held the stars",
    text: "Across the dry southern plateau, towers of pale limestone marked the moon's long rhythm. Travelers came to Kheled to settle disputes beneath its open, star-mapped courts.",
    stat: "64,000",
    label: "estimated inhabitants",
    temp: "+27°",
    season: "DRY SUN"
  }
};

const chapters = [
  { year: "20,480", label: "The First Accord", text: "River cities join under a shared calendar." },
  { year: "20,310", label: "Age of Glass", text: "Resonant glass transforms navigation and record keeping." },
  { year: "20,080", label: "The Long Aurora", text: "Unseasonal lights appear across the northern sky." },
  { year: "19,960", label: "The Great Silence", text: "The old world disappears beneath water, ice and ash." }
];

function Icon({ name, size = 18 }) {
  const paths = {
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/></>,
    sound: <><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    down: <><path d="M12 4v15M6 13l6 6 6-6"/></>,
    star: <><circle cx="12" cy="12" r="2"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [region, setRegion] = useState("Orun");
  const [chapter, setChapter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);
  const active = regions[region];

  const toggleSound = () => {
    if (soundOn) {
      if (audioRef.current) audioRef.current.close();
      audioRef.current = null;
      setSoundOn(false);
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const low = ctx.createOscillator();
    const high = ctx.createOscillator();
    low.type = "sine"; low.frequency.value = 54;
    high.type = "sine"; high.frequency.value = 81;
    filter.type = "lowpass"; filter.frequency.value = 180;
    gain.gain.value = 0.018;
    low.connect(filter); high.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    low.start(); high.start();
    audioRef.current = ctx;
    setSoundOn(true);
  };

  const scrollTo = id => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <section className="hero" id="home" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-shade" />
        <header className="topbar">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="Aethel home">
            <span className="brand-mark"><span /></span>
            <span>AETHEL</span>
          </button>
          <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
            <button onClick={() => scrollTo("world")}>The world</button>
            <button onClick={() => scrollTo("chronicle")}>Chronicle</button>
            <button onClick={() => scrollTo("fragments")}>Fragments</button>
            <button onClick={() => scrollTo("about")}>The theory</button>
          </nav>
          <div className="top-actions">
            <button className={soundOn ? "sound active" : "sound"} onClick={toggleSound} aria-label="Toggle ambient sound"><Icon name="sound" /> <span>{soundOn ? "Sound on" : "Sound off"}</span></button>
            <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <Icon name="close"/> : <><i/><i/></>}</button>
          </div>
        </header>

        <div className="hero-content">
          <div className="eyebrow"><span /> A speculative archive · 20,000 BCE</div>
          <h1>Before the<br/><em>world forgot.</em></h1>
          <p>Enter Aethel — a reimagining of human life before the seas rose, the ice withdrew, and history began again.</p>
          <button className="primary-btn" onClick={() => scrollTo("world")}>Explore the old world <Icon name="arrow" /></button>
        </div>
        <div className="hero-bottom">
          <div className="coordinates"><span>58° 41′ N</span><span>12° 08′ W</span></div>
          <button className="scroll-cue" onClick={() => scrollTo("world")}><Icon name="down"/><span>DESCEND INTO MEMORY</span></button>
          <div className="era"><b>ERA</b><span>THE LATE ICE</span></div>
        </div>
      </section>

      <section className="world-section" id="world">
        <div className="section-intro">
          <div>
            <span className="section-no">I.</span>
            <p className="overline">THE WORLD AT 20,000 BCE</p>
          </div>
          <h2>One earth.<br/>A different <em>shape.</em></h2>
          <p className="intro-copy">Sea levels stood lower. Ice sheets held the north. Between them, imagined cultures flourished along coastlines now lost beneath one hundred metres of water.</p>
        </div>

        <div className="atlas">
          <div className="map-panel">
            <div className="map-grid" />
            <span className="map-label ocean">THE WESTERN OCEAN</span>
            <span className="map-label ice">NORTHERN ICE</span>
            <div className="land land-one"/><div className="land land-two"/><div className="land land-three"/>
            {Object.keys(regions).map((name, i) => (
              <button key={name} className={`map-point point-${i + 1} ${region === name ? "selected" : ""}`} onClick={() => setRegion(name)} aria-label={`View ${name}`}>
                <span className="pulse"/><i/><b>{name}</b>
              </button>
            ))}
            <div className="map-scale">0 <span/> 500 KM</div>
            <div className="map-compass"><Icon name="compass" size={26}/><small>N</small></div>
          </div>
          <article className="region-card" key={region}>
            <p className="overline copper">{active.kicker}</p>
            <h3>{active.title}</h3>
            <h4>{active.subtitle}</h4>
            <p className="region-text">{active.text}</p>
            <div className="region-stats">
              <div><strong>{active.stat}</strong><span>{active.label}</span></div>
              <div><strong>{active.temp}</strong><span>{active.season}</span></div>
            </div>
            <div className="region-nav">
              <span>{String(Object.keys(regions).indexOf(region) + 1).padStart(2, "0")} / 04</span>
              <div>{Object.keys(regions).map(name => <button key={name} aria-label={name} className={region === name ? "active" : ""} onClick={() => setRegion(name)}/>)}</div>
            </div>
          </article>
        </div>
      </section>

      <section className="chronicle" id="chronicle">
        <div className="chapter-copy">
          <p className="overline copper">II. THE LAST FIVE CENTURIES</p>
          <h2>A civilization<br/>at its <em>zenith.</em></h2>
          <p>What survives is not a record, but an invitation: four moments reconstructed from climate, landscape and the oldest stories we still carry.</p>
          <div className="chapter-detail" key={chapter}>
            <span>{chapters[chapter].year} BCE</span>
            <h3>{chapters[chapter].label}</h3>
            <p>{chapters[chapter].text}</p>
          </div>
        </div>
        <div className="timeline-art">
          <div className="orbital"><div className="sun"><Icon name="star" size={34}/></div><div className="orbit one"/><div className="orbit two"/><span className="moon m1"/><span className="moon m2"/></div>
          <div className="timeline">
            {chapters.map((item, i) => <button key={item.year} className={chapter === i ? "active" : ""} onClick={() => setChapter(i)}><i/><span>{item.year}</span><small>{item.label}</small></button>)}
          </div>
        </div>
      </section>

      <section className="fragments" id="fragments">
        <div className="fragment-head"><p className="overline">III. FRAGMENTS OF DAILY LIFE</p><h2>Not relics.<br/><em>Reminders.</em></h2></div>
        <div className="artifact-grid">
          <article><span className="artifact-number">F.01</span><div className="artifact-visual disc"><i/><i/><i/></div><h3>The sky disc</h3><p>A pocket calendar of bone and river-shell, worn smooth by a navigator's hand.</p></article>
          <article><span className="artifact-number">F.02</span><div className="artifact-visual vessel"><i/></div><h3>The ember vessel</h3><p>Black clay held coals alive for days, carrying one household's fire to another.</p></article>
          <article><span className="artifact-number">F.03</span><div className="artifact-visual tablet"><i/><b>⋮ 𐩑 ⋰ 𐩕</b></div><h3>The tide tablet</h3><p>Not writing as we know it, but a memory-map read through touch, rhythm and light.</p></article>
        </div>
      </section>

      <section className="theory" id="about">
        <p className="overline copper">A NOTE FROM THE ARCHIVE</p>
        <blockquote>“Every coastline is an archive.<br/>Most of ours lies <em>underwater.</em>”</blockquote>
        <p>Aethel is a work of speculative worldbuilding inspired by Late Pleistocene landscapes, archaeology and oral tradition. It is fiction — built not to replace history, but to awaken curiosity about the deep human past.</p>
        <button className="text-link" onClick={() => scrollTo("home")}>RETURN TO THE SURFACE <Icon name="arrow"/></button>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark"><span /></span><span>AETHEL</span></div>
        <p>AN IMAGINED ARCHIVE OF THE OLD WORLD</p><span>© 2026 · SPECULATIVE FICTION</span>
      </footer>
    </main>
  );
}

export default App;
