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

const biomes = [
  {
    name: "The Blue Shelf", code: "GLACIAL MARGIN", climate: "−18° / −4°", light: "18 weeks of twilight",
    quote: "The ice is never silent. It sighs, cracks, and tolls like a bell beneath the earth.",
    description: "At the northern edge of Aethel, a wall of blue ice rises higher than the city's towers. Summer brings fields of purple saxifrage, silver lichen and knee-high willow. Meltwater cuts turquoise rivers through black gravel; in winter, blown snow erases the horizon until earth and sky become one pale chamber.",
    life: ["Woolly mammoth", "Cave lion", "Musk ox", "Ivory gull"],
    people: "Oruni sound-keepers live in turf-roofed basalt houses. They travel by bone-runner sled and read dangerous fractures by pressing an ear to standing stones sunk deep into the permafrost."
  },
  {
    name: "The Wind Steppe", code: "MAMMOTH GRASSLAND", climate: "−6° / +14°", light: "Knife-bright skies",
    quote: "Grass ran from one end of the world to the other, and the herds moved through it like weather.",
    description: "A cold, dry grassland rolls for thousands of kilometres beneath a sky without haze. Sage, feather grass and wormwood release sharp resin beneath every footstep. Loess dust turns sunsets copper-red. There are few trees, but in sheltered river folds grow birch, juniper and dense islands of berry scrub.",
    life: ["Steppe bison", "Woolly rhinoceros", "Saiga", "Dire wolf"],
    people: "The Roaming Houses follow herd corridors in hide-covered wagons. No family owns pasture; prestige belongs to the person who remembers the safest ford, the oldest song and where rain fell three summers ago."
  },
  {
    name: "The Ember Coast", code: "VOLCANIC TEMPERATE", climate: "+9° / +24°", light: "Amber, rain-softened",
    quote: "Here the ground breathes. Warm mist rises from the terraces before the morning sun.",
    description: "On the western fault, warm currents meet volcanic land. Laurel forest, tree fern and dark pine crowd slopes ribbed with obsidian. Mineral springs steam beneath waterfalls. Ash makes the soil deep and fertile, while offshore kelp forests bend in green cathedrals around drowned lava arches.",
    life: ["Straight-tusked elephant", "Giant auk", "Forest leopard", "Kelp otter"],
    people: "Tavran gardeners cut terraces into the warm stone and feed them with spring-water channels. Their cities smell of cedar smoke, wet earth and citrus peel; every courtyard keeps a communal oven burning."
  },
  {
    name: "Lake Aruun", code: "INLAND FRESHWATER SEA", climate: "+4° / +20°", light: "Silver water-glare",
    quote: "No shore can see the shore opposite. To cross it is to trust a line drawn in memory.",
    description: "Fed by glacial rivers, Aruun fills a continental basin with cold blue water. Its southern margins dissolve into reed marshes where lotus, sedge and willow form floating islands. Autumn storms can raise waves taller than a house; winter paints the northern bays in clear, singing ice.",
    life: ["Great crested seal", "Pygmy hippo", "Crowned crane", "Aruun sturgeon"],
    people: "Suun is a floating commonwealth of reed harbours. Children learn to swim before they walk. Navigators memorize wave intervals and carry clay discs whose iron-rich needles settle toward magnetic north."
  },
  {
    name: "The Sunward Plain", code: "SEMI-ARID PLATEAU", climate: "+12° / +34°", light: "White and immense",
    quote: "At noon there are no shadows. At night, the stars seem near enough to gather.",
    description: "South of the inland sea, pale limestone rises into dry tablelands. Rain comes twice a year in brief violet storms, waking lilies from bare ground overnight. Acacia, wild olive and silver grass hold along seasonal rivers; beyond them stretch salt pans that mirror the sky.",
    life: ["Giant hartebeest", "Long-horned buffalo", "Atlas bear", "Ground hornbill"],
    people: "Kheledi towns gather around deep, cool cisterns. Their astronomer-mediators build roofless courts aligned to the moon, and paint legal histories in ochre bands visible only at sunrise."
  }
];

const creatures = [
  { mark: "M", name: "Woolly mammoth", range: "BLUE SHELF · WIND STEPPE", text: "Matriarchal herds travel ancestral river roads, breaking snow with tusks and leaving warm, dung-rich clearings where spring plants begin." },
  { mark: "R", name: "Woolly rhinoceros", range: "WIND STEPPE", text: "Solitary and near-sighted, it sweeps snow aside with a flattened horn. Steppe people give it the right of way and read its tracks for approaching blizzards." },
  { mark: "L", name: "Cave lion", range: "NORTHERN REACH", text: "Long-legged, maneless and pale as dry grass. Family groups hunt reindeer at dusk; Oruni masks show the lion as guardian of thresholds and winter sleep." },
  { mark: "S", name: "Aruun sturgeon", range: "INLAND SEA", text: "An armoured fish that can outlive three human generations. Its spring arrival is announced by drums beaten through the hulls of Suun boats." },
  { mark: "E", name: "Forest elephant", range: "EMBER COAST", text: "Smaller than its steppe cousins and stained red by volcanic soil. It opens paths through laurel forest that later become human roads and water channels." },
  { mark: "A", name: "Atlas bear", range: "SUNWARD PLAIN", text: "A dark, broad-faced forager of high ravines. Kheledi beekeepers leave the first honeycomb outside the walls to keep an old peace." }
];

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
  const [biome, setBiome] = useState(0);
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
            <button onClick={() => scrollTo("biomes")}>Biomes</button>
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

      <section className="biomes" id="biomes">
        <header className="biome-header">
          <div><span className="section-no">II.</span><p className="overline">THE LIVING WORLD</p></div>
          <h2>Five lands.<br/><em>Five ways to live.</em></h2>
          <p>Cold does not mean empty. Aethel is a mosaic shaped by altitude, ocean currents, ice and rain — each landscape alive with its own sounds, scents and ancient negotiations.</p>
        </header>
        <div className="biome-tabs" role="tablist">
          {biomes.map((item, i) => <button role="tab" aria-selected={biome === i} className={biome === i ? "active" : ""} key={item.name} onClick={() => setBiome(i)}><span>0{i + 1}</span>{item.name}</button>)}
        </div>
        <article className={`biome-stage biome-${biome + 1}`} key={biome}>
          <div className="biome-sky"><span className="distant-sun"/><i className="ridge back"/><i className="ridge front"/><div className="animal-silhouette"><i/><b/><span/></div></div>
          <div className="biome-body">
            <div className="biome-title"><p className="overline">{biomes[biome].code}</p><h3>{biomes[biome].name}</h3><blockquote>“{biomes[biome].quote}”</blockquote></div>
            <div className="biome-copy">
              <p>{biomes[biome].description}</p>
              <div className="conditions"><span><small>ANNUAL RANGE</small>{biomes[biome].climate}</span><span><small>QUALITY OF LIGHT</small>{biomes[biome].light}</span></div>
            </div>
            <div className="biome-life"><p className="overline">SIGNATURE LIFE</p>{biomes[biome].life.map(x => <span key={x}>{x}</span>)}</div>
            <div className="biome-people"><p className="overline">HUMAN ADAPTATION</p><p>{biomes[biome].people}</p></div>
          </div>
        </article>
      </section>

      <section className="bestiary" id="creatures">
        <header><p className="overline copper">III. A FIELD GUIDE TO THE OLD WORLD</p><h2>The ones who<br/><em>walk beside us.</em></h2><p>Animals are never scenery in Aethel. They make roads, open forests, carry seed, predict weather and enter human law as neighbouring nations.</p></header>
        <div className="creature-grid">
          {creatures.map((animal, i) => <article key={animal.name}><div className="creature-mark"><span>{animal.mark}</span><i className={`creature-shape shape-${i + 1}`}/></div><p className="overline">{animal.range}</p><h3>{animal.name}</h3><p>{animal.text}</p></article>)}
        </div>
      </section>

      <section className="people" id="people">
        <div className="people-lead">
          <p className="overline copper">IV. THE HUMAN TAPESTRY</p>
          <h2>No kings.<br/>No single <em>truth.</em></h2>
          <p>Aethel is not an empire. Its four great cultures are tied together by marriage, pilgrimage, fosterage and the First Accord, while remaining profoundly different in language, dress, belief and what they consider a life well lived.</p>
        </div>
        <div className="culture-rows">
          <article><span>ORUN</span><h3>Memory is a duty</h3><p>Oruni belong to hearth-groups rather than bloodlines. At seven, every child chooses an elder outside their family to become their “second memory.” Clothing is layered reindeer wool, waterproof gut and blue glass beads. The dead are returned to glacial caves, where names are sung only during the long night.</p><small>VALUES · PATIENCE, ACCURACY, SHELTER</small></article>
          <article><span>TAVRA</span><h3>Abundance must circulate</h3><p>In Tavra, hoarded food is considered a sickness. Garden terraces belong to neighbourhood ovens, and meals are eaten from a common copper table. Adults tattoo their forearms with the plants they know how to cultivate. Music is percussive and communal, built from water drums and struck obsidian.</p><small>VALUES · GENEROSITY, CRAFT, RENEWAL</small></article>
          <article><span>SUUN</span><h3>A promise is a vessel</h3><p>Suun identity travels with boats, not places. Households lash their reed homes into flotillas that separate and reunite with the seasons. Agreements are spoken over bowls of lake water; to break one is to “pierce the hull.” Their indigo garments are hung with shell chimes that make every harbour audible in fog.</p><small>VALUES · TRUST, CURIOSITY, ADAPTATION</small></article>
          <article><span>KHELED</span><h3>Disagreement is sacred</h3><p>Kheledi children are taught to argue both sides before giving an opinion. Councils meet in roofless moon courts where no speaker may stand in another's shadow. Pale linen, ochre geometry and braided silver identify a person's teachers rather than their rank. Hospitality lasts exactly three nights and can never be refused.</p><small>VALUES · BALANCE, ELOQUENCE, HOSPITALITY</small></article>
        </div>
        <aside className="day-in-life"><p className="overline">ONE ORDINARY MORNING · TAVRA</p><div><span>05:10</span><p>Before sunrise, Nara wakes to the mineral smell of warm rain on basalt. She folds away a wool sleeping mat and adds yesterday's embers to the courtyard oven.</p></div><div><span>06:25</span><p>Her brother opens the copper light-shutters above the cavern gardens. A blade of dawn travels down four polished mirrors; orange trees emerge from darkness one terrace at a time.</p></div><div><span>08:40</span><p>The neighbourhood eats barley cakes with fermented plum. A Suun boat has arrived overnight, so the table is loud with lake stories, new songs and an argument about the price of salt glass.</p></div></aside>
      </section>

      <section className="chronicle" id="chronicle">
        <div className="chapter-copy">
          <p className="overline copper">V. THE LAST FIVE CENTURIES</p>
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
        <div className="fragment-head"><p className="overline">VI. FRAGMENTS OF DAILY LIFE</p><h2>Not relics.<br/><em>Reminders.</em></h2></div>
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
