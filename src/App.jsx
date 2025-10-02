import React, { useState, useEffect } from 'react';
import { Smartphone, Car, Shirt, Laptop, Sun, Wind, MapPin, Factory, Droplets, Flame, Users, Globe, ArrowLeft, ChevronRight, X, Play, Pause, SkipForward, Sparkles, Loader } from 'lucide-react';

// Complete database of hero objects and their metals
const objectsDatabase = {
  smartphone: {
    name: "Smartphone",
    icon: Smartphone,
    tagline: "You are holding 62 different metals and minerals",
    description: "When you hold a smartphone, you hold the condensed story of half the planet. Each swipe, tap, and ping is powered by elements that once lay buried in mountain seams, riverbeds, and desert crust.",
    heroImage: "ai-generated",
    metals: [
      {
        name: "Indium",
        symbol: "In",
        emoji: "⚡",
        function: "Enables your touchscreen. A thin film of indium tin oxide is transparent and conductive, making glass respond to your fingers.",
        journey: "Mined as a byproduct of zinc ore in China and Canada. Never found alone—requires processing 1,000 tons of ore to yield just 1 kilogram.",
        impact: "Critically scarce; reserves may be depleted within decades. Mining disturbs fragile ecosystems and creates supply vulnerabilities.",
        wonder: "Every touch on your screen is really the touch of indium—without it, glass would remain silent.",
        locations: ["China", "South Korea", "Canada"],
        visualImage: "ai-generated"
      },
      {
        name: "Cobalt",
        symbol: "Co",
        emoji: "🩸",
        function: "Stabilizes lithium-ion batteries, preventing overheating and extending lifespan. Without it, batteries would degrade quickly or catch fire.",
        journey: "70% of global cobalt comes from the Democratic Republic of Congo, often extracted by artisanal miners including children in hand-dug tunnels.",
        impact: "Linked to widespread child labor—some miners as young as 7. Tunnel collapses kill dozens annually. Toxic tailings contaminate rivers, poisoning communities.",
        wonder: "Your phone's heartbeat is cobalt, but it comes at a human cost that pulses far away from your pocket.",
        locations: ["DR Congo", "China", "Australia"],
        visualImage: "ai-generated"
      },
      {
        name: "Lithium",
        symbol: "Li",
        emoji: "🔋",
        function: "Powers the rechargeable battery. Lithium ions shuttle back and forth thousands of times, storing and releasing energy.",
        journey: "Extracted from brine pools in the 'Lithium Triangle' (Chile, Argentina, Bolivia). Brine extraction pumps ancient underground water to evaporation ponds—a process taking 12-18 months.",
        impact: "Each ton requires 500,000 gallons of water, devastating arid ecosystems. Indigenous communities face water shortages. Mining disrupts flamingo breeding grounds.",
        wonder: "Lithium is ancient water made electric. It is the element that unshackled us from wall outlets.",
        locations: ["Chile", "Argentina", "Australia"],
        visualImage: "ai-generated"
      },
      {
        name: "Tantalum",
        symbol: "Ta",
        emoji: "🛡️",
        function: "Forms tiny capacitors that regulate voltage and prevent electrical surges—protecting delicate circuits from self-destruction.",
        journey: "Extracted from coltan ore in Central Africa, Brazil, and Australia. The Congo supplies about 25% of global tantalum.",
        impact: "Coltan mining has fueled armed conflicts in the Congo, financing militias. Mining destroys rainforests and threatens gorilla habitats.",
        wonder: "Tantalum is the silent protector, the metal that stands between your phone and chaos.",
        locations: ["DR Congo", "Brazil", "Australia"],
        visualImage: "ai-generated"
      },
      {
        name: "Gold",
        symbol: "Au",
        emoji: "✨",
        function: "Coats connectors and circuit board contacts. Gold's perfect conductivity ensures signals pass without resistance or degradation.",
        journey: "Mined in South Africa, Peru, China, Australia. Refined using cyanide heap leaching or mercury amalgamation.",
        impact: "One of the most environmentally destructive industries. Cyanide spills poison rivers. One gold ring generates 20 tons of mining waste.",
        wonder: "0.034 grams of gold in your phone—$2 worth—allows your voice to travel continents without loss.",
        locations: ["South Africa", "Peru", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Neodymium",
        symbol: "Nd",
        emoji: "🔊",
        function: "Powers the speaker and vibration motor. These tiny magnets convert electrical signals into sound waves and kinetic pulses.",
        journey: "85% of rare earth elements mined and processed in China. Extracted from bastnasite ore through flotation and acid treatment.",
        impact: "Processing produces radioactive thorium waste—stored in vast toxic lakes. Local populations face cancer clusters and birth defects.",
        wonder: "That gentle buzz when you receive a message is neodymium vibrating against itself.",
        locations: ["China", "USA", "Australia"],
        visualImage: "ai-generated"
      }
    ],
    footprint: {
      countries: 27,
      water: "13,000 liters",
      co2: "55 kg",
      laborHours: 58,
      conflictMinerals: 3,
      recyclable: "80% by weight—but only 20% currently recovered"
    }
  },
  
  ev: {
    name: "Electric Vehicle",
    icon: Car,
    tagline: "Your clean energy future weighs half a ton in metals",
    description: "An electric vehicle is marketed as the solution to fossil fuels. Yet beneath its zero-emission promise lies an extraction footprint more metal-intensive than any car in history. This is the paradox of green technology.",
    heroImage: "ai-generated",
    metals: [
      {
        name: "Lithium",
        symbol: "Li",
        emoji: "⚡",
        function: "The heart of the battery pack. A single EV contains 63 kg of lithium—enough for 10,000 smartphones. This mass determines range and power.",
        journey: "Same sources as phone batteries but at industrial scale. The Atacama Desert in Chile is being drained to meet EV demand.",
        impact: "EV boom has intensified water conflicts. Lithium extraction in Chile uses 65% of the region's water. Indigenous communities protest as wells run dry.",
        wonder: "Lithium is the element that makes electric mobility possible—but it extracts its cost in water from the driest place on Earth.",
        locations: ["Chile", "Australia", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Cobalt",
        symbol: "Co",
        emoji: "🔋",
        function: "Prevents battery fires and extends lifespan. A Tesla Model 3 battery contains 4.5 kg of cobalt—1,000 times more than a phone.",
        journey: "Same Congolese mines supply both phone and EV batteries. Demand from EVs has tripled cobalt mining intensity in the past decade.",
        impact: "The EV revolution has not improved Congo's labor conditions—it has intensified them. More children in mines, more tunnels, more deaths.",
        wonder: "The transition to electric is built on the backs of the same children whose futures climate action claims to protect.",
        locations: ["DR Congo", "Cuba", "Russia"],
        visualImage: "ai-generated"
      },
      {
        name: "Nickel",
        symbol: "Ni",
        emoji: "🏭",
        function: "Increases energy density in battery cathodes. High-nickel batteries allow EVs to travel farther on a single charge.",
        journey: "Mined primarily in Indonesia, Philippines, Russia. Indonesia has become the world's largest supplier through massive deforestation.",
        impact: "Nickel mining has razed rainforests in Sulawesi. Red toxic runoff flows into coral reefs. Indigenous Bajau people displaced from ancestral waters.",
        wonder: "Every mile of electric range is a mile of Indonesian rainforest converted to moonscape.",
        locations: ["Indonesia", "Philippines", "Russia"],
        visualImage: "ai-generated"
      },
      {
        name: "Copper",
        symbol: "Cu",
        emoji: "🔌",
        function: "Forms the wiring, motor coils, and charging infrastructure. An EV contains 83 kg of copper—4× more than a combustion car.",
        journey: "Chile's Atacama mines supply 30% of global copper. Open-pit mining creates craters visible from space.",
        impact: "Copper mining in water-scarce regions creates cascading crises. Chile's mines consume as much water as a city of 2 million people.",
        wonder: "Copper has powered every electrical revolution. Now it powers the revolution that might save us—or break us trying.",
        locations: ["Chile", "Peru", "USA"],
        visualImage: "ai-generated"
      },
      {
        name: "Rare Earths",
        symbol: "REE",
        emoji: "🧲",
        function: "Neodymium magnets in motors provide torque without mechanical transmission. 1 kg per EV enables instant acceleration and regenerative braking.",
        journey: "Mined in China's Bayan Obo, leaving radioactive lakes. Separation requires 17-step acid process generating toxic waste.",
        impact: "China controls 90% of rare earth refining. Environmental regulations are lax. Cancer rates in mining regions are 5× national average.",
        wonder: "The magnets that make EVs feel futuristic are mined from an environmental catastrophe zone.",
        locations: ["China", "USA", "Myanmar"],
        visualImage: "ai-generated"
      },
      {
        name: "Graphite",
        symbol: "C",
        emoji: "⚫",
        function: "Forms the battery's anode—where lithium ions are stored during charging. A single EV battery needs 50 kg of graphite.",
        journey: "China produces 80% of battery-grade graphite through energy-intensive purification. Mining in Africa often involves child labor.",
        impact: "Graphite dust causes respiratory disease in mining communities. Processing requires toxic hydrofluoric acid that pollutes waterways.",
        wonder: "Graphite—pencil lead elevated to power storage. Ancient carbon enabling the post-carbon future.",
        locations: ["China", "Mozambique", "Madagascar"],
        visualImage: "ai-generated"
      }
    ],
    footprint: {
      countries: 38,
      water: "380,000 liters",
      co2: "6,000 kg (battery production alone)",
      laborHours: 4200,
      conflictMinerals: 4,
      recyclable: "95% by weight—but current recycling infrastructure handles <5%"
    }
  },
  
  tshirt: {
    name: "Fast Fashion T-Shirt",
    icon: Shirt,
    tagline: "This $5 shirt cost the planet far more",
    description: "A cotton t-shirt seems natural, organic, harmless. But modern fast fashion has industrialized even the simplest garment into a globally distributed extraction process—metal hardware, synthetic dyes, and polyester blends that tell a hidden story.",
    heroImage: "ai-generated",
    metals: [
      {
        name: "Copper",
        symbol: "Cu",
        emoji: "🎨",
        function: "Forms the base of many textile dyes. Copper phthalocyanine creates vibrant blues and greens that won't fade in the wash.",
        journey: "Copper for dyes comes from the same Chilean and Peruvian mines supplying electronics. Refined into pigment compounds in China and India.",
        impact: "Dye factories discharge copper-laden wastewater into rivers. In Bangladesh and India, textile wastewater turns rivers black and toxic.",
        wonder: "The color of your shirt may have been the color of someone else's drinking water.",
        locations: ["Chile", "Peru", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Chromium",
        symbol: "Cr",
        emoji: "🌈",
        function: "Creates dyes and mordants that fix color to fabric. Chromium makes blacks deeper, reds more vibrant, and prevents fading.",
        journey: "Mined in South Africa and Kazakhstan. Processed into chromium salts in China and India for textile industry.",
        impact: "Hexavalent chromium (Cr-VI) is a known carcinogen. Tannery and textile workers have elevated cancer rates. Runoff contaminates groundwater.",
        wonder: "That perfect black t-shirt is chromium—an element that makes colors permanent and cancers more likely.",
        locations: ["South Africa", "Kazakhstan", "India"],
        visualImage: "ai-generated"
      },
      {
        name: "Zinc",
        symbol: "Zn",
        emoji: "🔘",
        function: "Forms the buttons, zippers, and rivets. Zinc alloys resist corrosion and are cheap to mass-produce.",
        journey: "Mined in China, Peru, and Australia. Cast into hardware in Chinese and Bangladeshi factories.",
        impact: "Zinc mining produces acid mine drainage. Smelting releases cadmium and lead. Low-wage workers in unsafe conditions cast the hardware.",
        wonder: "The zipper you pull a thousand times was forged in conditions you wouldn't want to think about.",
        locations: ["China", "Peru", "Australia"],
        visualImage: "ai-generated"
      },
      {
        name: "Titanium Dioxide",
        symbol: "TiO₂",
        emoji: "⚪",
        function: "Creates the bright whites in cotton and polyester. Also used in prints and finishes to make colors pop.",
        journey: "Extracted from ilmenite ore in Australia, South Africa, and Canada. Refined through the chloride process in industrial facilities.",
        impact: "TiO₂ production generates sulfuric acid waste. Nanoparticles in wastewater harm aquatic life. Workers face respiratory exposure.",
        wonder: "The brilliant white of fast fashion is titanium—mined from black sand beaches half a world away.",
        locations: ["Australia", "South Africa", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Aluminum",
        symbol: "Al",
        emoji: "✨",
        function: "Creates metallic prints and heat-transfer designs. Aluminum pastes give that shiny, reflective graphic on cheap shirts.",
        journey: "Bauxite mined in Guinea, Australia, Brazil. Smelted in China using coal power—one of the most energy-intensive processes in manufacturing.",
        impact: "Aluminum production creates 'red mud'—toxic alkaline waste that has caused environmental disasters. Smelting is a massive carbon emitter.",
        wonder: "That glittery slogan on your chest cost more in energy than keeping it lit with LEDs for a year.",
        locations: ["Guinea", "Australia", "China"],
        visualImage: "ai-generated"
      }
    ],
    footprint: {
      countries: 15,
      water: "2,700 liters (cotton growing + production)",
      co2: "7 kg",
      laborHours: 0.6,
      conflictMinerals: 0,
      recyclable: "Metal hardware: yes. Fabric: theoretically, but most ends up in landfills. Only 1% of textiles are recycled into new clothes."
    }
  },
  
  laptop: {
    name: "Laptop Computer",
    icon: Laptop,
    tagline: "Your portable office contains metals from 25 countries",
    description: "A laptop is a smartphone amplified—more powerful, more complex, and requiring more of everything. What fits in your backpack represents an intensified version of every extraction network that built your phone.",
    heroImage: "ai-generated",
    metals: [
      {
        name: "Aluminum",
        symbol: "Al",
        emoji: "💻",
        function: "Forms the chassis and heat sink. Aluminum's lightness and thermal conductivity make portable computing possible.",
        journey: "Bauxite mined in Guinea, Jamaica, Australia. Smelted in China and Iceland (using geothermal power). Machined into unibody designs.",
        impact: "Smelting is energy-intensive. Red mud waste from bauxite processing is caustic and sometimes radioactive. One ton of aluminum = 4 tons of red mud.",
        wonder: "The sleek metal shell that makes your laptop feel premium is made from rock that destroys communities when it's mined.",
        locations: ["Guinea", "Australia", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Cobalt",
        symbol: "Co",
        emoji: "🔋",
        function: "Battery stabilization, same as phones but 3× the quantity. A laptop battery contains 15 grams of cobalt.",
        journey: "Same Congolese artisanal mines. Same child labor. Same hand-dug tunnels and same brutal economics.",
        impact: "Every laptop battery carries the same moral weight as three smartphones. The scale of laptop production means more Congolese children underground.",
        wonder: "Your productivity is powered by someone else's childhood.",
        locations: ["DR Congo", "Russia", "Cuba"],
        visualImage: "ai-generated"
      },
      {
        name: "Tantalum",
        symbol: "Ta",
        emoji: "⚡",
        function: "Capacitors in motherboard and power circuits. More computational power = more capacitors = more tantalum.",
        journey: "Coltan from Congo, Rwanda, Brazil. Often mined in conflict zones where profits fund armed groups.",
        impact: "The smartphone's tantalum problem, multiplied. Laptop demand intensifies pressure on remaining gorilla habitats in virunga region.",
        wonder: "Every stable electrical current in your computer flows through metal that destabilizes human communities.",
        locations: ["DR Congo", "Rwanda", "Brazil"],
        visualImage: "ai-generated"
      },
      {
        name: "Gallium",
        symbol: "Ga",
        emoji: "💡",
        function: "Creates LEDs for keyboard backlighting and screen illumination. Gallium nitride also enables fast charging.",
        journey: "Byproduct of aluminum and zinc refining. China controls 95% of global gallium production.",
        impact: "Processing generates arsenic-contaminated waste. China's near-monopoly creates geopolitical leverage over tech supply chains.",
        wonder: "The glow of your keyboard at night is gallium—a metal that melts in your hand but requires industrial heat to purify.",
        locations: ["China", "Germany", "Ukraine"],
        visualImage: "ai-generated"
      },
      {
        name: "Rare Earths",
        symbol: "REE",
        emoji: "🔊",
        function: "Neodymium in speakers and hard drive motors. Terbium in screen phosphors. Europium for red pixels.",
        journey: "Bayan Obo mine in Inner Mongolia. Radioactive thorium and uranium contaminate extraction process.",
        impact: "Rare earth mining leaves toxic lakes. Villages near mines have cancer rates 5× higher. Children born with severe deformities.",
        wonder: "The colors you see on screen—true reds, vivid greens—come from elements mined in a zone of birth defects.",
        locations: ["China", "USA", "Myanmar"],
        visualImage: "ai-generated"
      },
      {
        name: "Silver",
        symbol: "Ag",
        emoji: "🪙",
        function: "Solders, coatings, and conductive adhesives. Silver is a better conductor than copper for sensitive connections.",
        journey: "Mined in Mexico, Peru, China as primary ore or byproduct. Refined through electrolysis and chemical processes.",
        impact: "Silver mining uses cyanide leaching similar to gold. Mercury amalgamation in artisanal mines poisons miners and ecosystems.",
        wonder: "Silver—once currency, now coursing through circuits, conducting the information economy.",
        locations: ["Mexico", "Peru", "China"],
        visualImage: "ai-generated"
      }
    ],
    footprint: {
      countries: 25,
      water: "19,000 liters",
      co2: "210 kg",
      laborHours: 160,
      conflictMinerals: 4,
      recyclable: "75% by weight—current recovery rate ~20%"
    }
  },
  
  solar: {
    name: "Solar Panel",
    icon: Sun,
    tagline: "Clean energy has a dirty origin story",
    description: "Solar panels represent hope—a future powered by starlight instead of ancient carbon. Yet the journey from silicon to sunlight converter involves some of the same extraction networks, refining processes, and moral contradictions as every other technology.",
    heroImage: "ai-generated",
    metals: [
      {
        name: "Silicon",
        symbol: "Si",
        emoji: "☀️",
        function: "The photovoltaic heart. Pure silicon wafers convert photons into electrons—sunlight into electricity. A solar cell is 90% silicon by composition.",
        journey: "Quartzite mined in USA, Norway, Brazil. Refined to 99.9999999% purity in China (70% of global polysilicon). Requires enormous heat and electricity.",
        impact: "Silicon purification is energy-intensive. In China, often powered by coal. Toxic tetrachloride waste from processing. Xinjiang produces half of China's polysilicon—raising forced labor concerns.",
        wonder: "Silicon transforms sunlight into power, but its refinement burns fossil fuels. The solar future is powered by the coal present.",
        locations: ["China", "USA", "Germany"],
        visualImage: "ai-generated"
      },
      {
        name: "Silver",
        symbol: "Ag",
        emoji: "⚡",
        function: "Forms the grid lines on solar cells—conducting electricity from silicon to wires. Each panel uses 20 grams of silver.",
        journey: "Same Mexican and Peruvian mines. Silver paste is applied in thin lines through screen printing.",
        impact: "Silver mining devastates local ecosystems. Solar industry consumes 10% of global silver—creating competition with industrial and monetary uses.",
        wonder: "The metal that once backed currency now backs our energy future. Silver catches the sun's electrons and leads them home.",
        locations: ["Mexico", "Peru", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Copper",
        symbol: "Cu",
        emoji: "🔌",
        function: "Wiring, junction boxes, inverters, and grid connections. Copper's conductivity is essential for transporting solar electricity.",
        journey: "Chilean Atacama copper, again. Every solar installation is also a copper extraction project.",
        impact: "Copper mining in Chile uses 126 liters of water per kilogram—in one of Earth's driest regions. Solar's promise of clean water conflicts with its thirst for copper.",
        wonder: "Copper connects the solar panel to the grid, the home, the future. But it does so at the cost of present water scarcity.",
        locations: ["Chile", "Peru", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Aluminum",
        symbol: "Al",
        emoji: "🏗️",
        function: "Forms the frame that holds panels. Lightweight, corrosion-resistant, and structurally strong for outdoor mounting.",
        journey: "Bauxite to alumina to aluminum—same energy-intensive process. Frames are extruded in China and USA.",
        impact: "Aluminum production is one of the most carbon-intensive industrial processes. The 'green' solar panel rests in a frame forged with coal power.",
        wonder: "The structure that holds solar hope is made from the same material that helped build the fossil fuel age.",
        locations: ["Guinea", "China", "Russia"],
        visualImage: "ai-generated"
      },
      {
        name: "Tellurium",
        symbol: "Te",
        emoji: "🎯",
        function: "Used in cadmium telluride (CdTe) thin-film solar panels—an alternative to silicon. Improves efficiency in certain conditions.",
        journey: "Byproduct of copper refining, mostly from China, Peru, and Japan. Extremely rare—one of the scarcest stable elements.",
        impact: "Supply is limited by copper production rates. Cadmium is toxic; CdTe panels require careful end-of-life handling to prevent contamination.",
        wonder: "Tellurium is so rare that if we covered the Earth in CdTe panels, we'd run out. Solar has material limits written in elemental scarcity.",
        locations: ["China", "Japan", "Peru"],
        visualImage: "ai-generated"
      },
      {
        name: "Indium",
        symbol: "In",
        emoji: "📱",
        function: "Used in CIGS (copper indium gallium selenide) thin-film panels. Creates transparent conducting layers in some panel designs.",
        journey: "Same zinc ore byproduct as phones. Solar and touchscreens compete for the same rare element.",
        impact: "Indium scarcity is accelerating as both solar and consumer electronics demand increases. Estimates suggest supply constraints by 2030s.",
        wonder: "The element that makes your phone's glass responsive also makes certain solar panels possible. We're in a race between our gadgets and our grid.",
        locations: ["China", "South Korea", "Canada"],
        visualImage: "ai-generated"
      }
    ],
    footprint: {
      countries: 22,
      water: "65 liters per watt capacity",
      co2: "50 kg per panel (production), but offset within 2-4 years of operation",
      laborHours: 45,
      conflictMinerals: 1,
      recyclable: "95% by weight—but recycling infrastructure is immature. Most decommissioned panels end up in landfills."
    }
  },
  
  windturbine: {
    name: "Wind Turbine",
    icon: Wind,
    tagline: "Renewable energy built from 200 tons of extraction",
    description: "A single wind turbine promises clean, infinite energy from moving air. Yet standing 300 feet tall, each turbine requires more metal, concrete, and rare earth magnets than a small building—a massive material investment for the carbon-free future.",
    heroImage: "ai-generated",
    metals: [
      {
        name: "Neodymium",
        symbol: "Nd",
        emoji: "🧲",
        function: "Creates the permanent magnets in direct-drive generators. One turbine uses 600 kg of neodymium—enabling magnetic generation without mechanical gearboxes.",
        journey: "Same toxic rare earth mining in China's Bayan Obo as phones and EVs. Scaled to industrial quantities for each turbine.",
        impact: "600 kg means 6,000 times the neodymium of a smartphone. Radioactive thorium waste, toxic lakes, cancer clusters—all multiplied by the scale of wind farms.",
        wonder: "The silent spin that powers cities is built on the same contaminated ground that poisons mining villages.",
        locations: ["China", "USA", "Myanmar"],
        visualImage: "ai-generated"
      },
      {
        name: "Copper",
        symbol: "Cu",
        emoji: "🔌",
        function: "Forms the generator coils, transformers, and miles of transmission cables. Each turbine contains 4.5 tons of copper.",
        journey: "Chilean Atacama mines, again. Wind energy is also copper-intensive energy. A wind farm is a copper extraction project.",
        impact: "4.5 tons per turbine. A 100-turbine farm = 450 tons of copper = 56 million liters of water from the driest desert on Earth.",
        wonder: "Wind power and solar power compete for the same Chilean water, both promising to save the climate while draining ancient aquifers.",
        locations: ["Chile", "Peru", "USA"],
        visualImage: "ai-generated"
      },
      {
        name: "Iron",
        symbol: "Fe",
        emoji: "⚙️",
        function: "The structural steel that forms the tower, nacelle housing, and internal frame. Each turbine uses 200-300 tons of iron and steel.",
        journey: "Iron ore mined in Australia, Brazil, China. Smelted in blast furnaces—among the most carbon-intensive industrial processes.",
        impact: "Wind turbines require massive steel foundations and towers. Producing 1 ton of steel generates 1.8 tons of CO₂. Each turbine = 360-540 tons of CO₂ before it produces any clean energy.",
        wonder: "The carbon payback period for a wind turbine is 6-18 months. After that, it's clean. But that first year is fossil-fueled steel.",
        locations: ["Australia", "Brazil", "China"],
        visualImage: "ai-generated"
      },
      {
        name: "Fiberglass",
        symbol: "SiO₂",
        emoji: "💨",
        function: "Forms the massive blades—each 150 feet long. Fiberglass composite is lightweight, strong, and can withstand hurricane-force winds.",
        journey: "Made from silica sand, petroleum-based resins, and chemical hardeners. Blade manufacturing is specialized, done in massive facilities.",
        impact: "Fiberglass blades are not recyclable. When turbines are decommissioned (20-25 year lifespan), blades are cut up and landfilled. Tens of thousands of blades reach end-of-life in the 2020s.",
        wonder: "The wind turbine blade graveyard is real—acres of 150-foot sections buried in Wyoming and Texas. Clean energy with a 20-year expiration date.",
        locations: ["USA", "China", "Europe"],
        visualImage: "ai-generated"
      },
      {
        name: "Rare Earths",
        symbol: "REE",
        emoji: "🌏",
        function: "Dysprosium, praseodymium, and other rare earths enhance magnet strength and high-temperature performance in generators.",
        journey: "Extracted alongside neodymium from Chinese rare earth mines. Separation requires hydrofluoric acid and generates radioactive waste.",
        impact: "Wind turbines accelerated rare earth demand alongside EVs and electronics. China's monopoly on refining gives geopolitical leverage over the entire renewable transition.",
        wonder: "Every green energy revolution passes through China's toxic rare earth refineries. There is no clean path that doesn't run through contaminated ground.",
        locations: ["China", "USA", "Australia"],
        visualImage: "ai-generated"
      },
      {
        name: "Zinc",
        symbol: "Zn",
        emoji: "🛡️",
        function: "Galvanizes steel components to prevent corrosion. Offshore wind turbines are constantly exposed to saltwater and require heavy zinc coating.",
        journey: "Mined as sphalerite ore in China, Peru, Australia. Refined through roasting and electrolysis.",
        impact: "Zinc mining produces sulfuric acid waste and heavy metal contamination. Smelting releases sulfur dioxide. Offshore wind's corrosion demands mean massive zinc consumption.",
        wonder: "The invisible armor that keeps wind turbines from rusting into the sea is zinc—mined, refined, and applied in toxic processes so the turbine can spin cleanly for decades.",
        locations: ["China", "Peru", "Australia"],
        visualImage: "ai-generated"
      }
    ],
    footprint: {
      countries: 32,
      water: "2.1 million liters (per turbine, mostly in steel and copper production)",
      co2: "500 tons (per turbine production, offset within 6-18 months)",
      laborHours: 8500,
      conflictMinerals: 2,
      recyclable: "85% by weight (steel, copper)—but blades are not recyclable and end up in landfills"
    }
  }
};

const App = () => {
  const [view, setView] = useState('home');
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [dissolveAnimation, setDissolveAnimation] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [customObjects, setCustomObjects] = useState({});

  useEffect(() => {
    if (selectedObject && view === 'object') {
      setTimeout(() => setDissolveAnimation(true), 500);
    } else {
      setDissolveAnimation(false);
    }
  }, [selectedObject, view]);

  const selectObject = (objectKey) => {
    const allObjects = { ...objectsDatabase, ...customObjects };
    setSelectedObject(allObjects[objectKey]);
    setView('object');
  };

  const addCustomObject = (objectKey, objectData) => {
    setCustomObjects(prev => ({
      ...prev,
      [objectKey]: objectData
    }));
  };

  const resetApp = () => {
    setView('home');
    setSelectedObject(null);
    setSelectedMetal(null);
    setDissolveAnimation(false);
    setShowSlideshow(false);
  };

  const startSlideshow = () => {
    setShowSlideshow(true);
  };

  const exitSlideshow = () => {
    setShowSlideshow(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {showSlideshow ? (
        <SlideshowView object={selectedObject} exitSlideshow={exitSlideshow} />
      ) : (
        <>
          {view === 'home' && (
            <HomeView 
              selectObject={selectObject} 
              addCustomObject={addCustomObject}
              customObjects={customObjects}
            />
          )}
          {view === 'object' && (
            <ObjectView 
              object={selectedObject} 
              dissolveAnimation={dissolveAnimation}
              setView={setView}
              setSelectedMetal={setSelectedMetal}
              resetApp={resetApp}
              startSlideshow={startSlideshow}
            />
          )}
          {view === 'metal' && (
            <MetalDetail 
              metal={selectedMetal} 
              objectName={selectedObject.name}
              setView={setView}
            />
          )}
          {view === 'map' && (
            <WorldMapView 
              object={selectedObject}
              setView={setView}
            />
          )}
          {view === 'reflection' && (
            <ReflectionView 
              object={selectedObject}
              resetApp={resetApp}
            />
          )}
        </>
      )}
    </div>
  );
};

const SlideshowView = ({ object, exitSlideshow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fadeState, setFadeState] = useState('in');

  const slides = [
    {
      type: 'opening',
      content: {
        icon: object.icon,
        title: object.name,
        tagline: object.tagline,
        description: object.description,
        heroImage: object.heroImage
      }
    },
    ...object.metals.slice(0, 4).map(metal => ({
      type: 'metal',
      content: metal
    })),
    {
      type: 'impact',
      content: object.footprint
    },
    ...object.metals.slice(4).map(metal => ({
      type: 'metal',
      content: metal
    })),
    {
      type: 'global',
      content: {
        countries: object.footprint.countries,
        locations: [...new Set(object.metals.flatMap(m => m.locations))]
      }
    },
    {
      type: 'closing',
      content: {
        name: object.name,
        footprint: object.footprint
      }
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setFadeState('out');
      setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          exitSlideshow();
        }
        setFadeState('in');
      }, 1500);
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, slides.length]);

  const nextSlide = () => {
    setFadeState('out');
    setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        exitSlideshow();
      }
      setFadeState('in');
    }, 1500);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={exitSlideshow}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
            <span className="text-sm">Exit Presentation</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={nextSlide}
              className="text-white/80 hover:text-white transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div 
        className={`flex-1 flex items-center justify-center transition-opacity duration-[1500ms] ease-in-out ${
          fadeState === 'in' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {currentSlideData.type === 'opening' && (
          <OpeningSlide content={currentSlideData.content} />
        )}
        {currentSlideData.type === 'metal' && (
          <MetalSlide content={currentSlideData.content} />
        )}
        {currentSlideData.type === 'impact' && (
          <ImpactSlide content={currentSlideData.content} />
        )}
        {currentSlideData.type === 'global' && (
          <GlobalSlide content={currentSlideData.content} />
        )}
        {currentSlideData.type === 'closing' && (
          <ClosingSlide content={currentSlideData.content} />
        )}
      </div>

      <div className="absolute bottom-6 right-6 text-white/50 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

const OpeningSlide = ({ content }) => {
  const IconComponent = content.icon;
  return (
    <div className="max-w-4xl px-8 text-center space-y-8 relative">
      {content.heroImage === "ai-generated" && (
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl" />
        </div>
      )}
      <IconComponent className="w-32 h-32 mx-auto text-cyan-400" />
      <h1 className="text-7xl font-bold tracking-tight">{content.title}</h1>
      <p className="text-3xl text-cyan-400">{content.tagline}</p>
      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        {content.description}
      </p>
    </div>
  );
};

const MetalSlide = ({ content }) => {
  return (
    <div className="max-w-5xl px-8 space-y-8 relative">
      {content.visualImage === "ai-generated" && (
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-3xl" />
        </div>
      )}
      
      <div className="flex items-center justify-center gap-6 mb-12">
        <div className="text-8xl">{content.emoji}</div>
        <div>
          <h2 className="text-6xl font-bold">{content.name}</h2>
          <p className="text-2xl text-gray-400">{content.symbol}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-cyan-900/30 border-2 border-cyan-600/50 rounded-xl p-8 backdrop-blur">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">The Function</h3>
          <p className="text-lg leading-relaxed">{content.function}</p>
        </div>

        <div className="bg-red-900/30 border-2 border-red-600/50 rounded-xl p-8 backdrop-blur">
          <h3 className="text-2xl font-bold mb-4 text-red-400">The Cost</h3>
          <p className="text-lg leading-relaxed">{content.impact}</p>
        </div>
      </div>

      <div className="bg-purple-900/30 border-2 border-purple-600/50 rounded-xl p-8 text-center backdrop-blur">
        <p className="text-2xl italic text-purple-300 leading-relaxed">
          {content.wonder}
        </p>
      </div>
    </div>
  );
};

const ImpactSlide = ({ content }) => {
  return (
    <div className="max-w-5xl px-8">
      <h2 className="text-6xl font-bold text-center mb-16">The True Cost</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-blue-900/30 border-2 border-blue-600/50 rounded-xl p-12 text-center backdrop-blur">
          <Droplets className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <div className="text-5xl font-bold mb-4">{content.water}</div>
          <div className="text-xl text-gray-300">Water consumed</div>
        </div>

        <div className="bg-orange-900/30 border-2 border-orange-600/50 rounded-xl p-12 text-center backdrop-blur">
          <Flame className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <div className="text-5xl font-bold mb-4">{content.co2}</div>
          <div className="text-xl text-gray-300">CO₂ emissions</div>
        </div>

        <div className="bg-purple-900/30 border-2 border-purple-600/50 rounded-xl p-12 text-center backdrop-blur">
          <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <div className="text-5xl font-bold mb-4">{content.laborHours}</div>
          <div className="text-xl text-gray-300">Human labor hours</div>
        </div>

        <div className="bg-red-900/30 border-2 border-red-600/50 rounded-xl p-12 text-center backdrop-blur">
          <Factory className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <div className="text-5xl font-bold mb-4">{content.conflictMinerals}</div>
          <div className="text-xl text-gray-300">Conflict minerals</div>
        </div>
      </div>
    </div>
  );
};

const GlobalSlide = ({ content }) => {
  return (
    <div className="max-w-5xl px-8 text-center space-y-12">
      <Globe className="w-32 h-32 mx-auto text-cyan-400" />
      <h2 className="text-6xl font-bold">A Global Network</h2>
      <p className="text-4xl text-cyan-400">
        {content.countries} countries. {content.locations.length} mining regions.
      </p>
      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
        {content.locations.map((location, idx) => (
          <div
            key={idx}
            className="bg-cyan-900/30 border border-cyan-600/50 rounded-lg p-4 backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-cyan-400" />
              <span className="font-semibold">{location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ClosingSlide = ({ content }) => {
  return (
    <div className="max-w-4xl px-8 text-center space-y-12">
      <h2 className="text-6xl font-bold">This {content.name} Contains:</h2>
      <div className="space-y-6 text-2xl text-gray-300 leading-relaxed">
        <p>Underground reserves from {content.footprint.countries} countries</p>
        <p>Water that communities will never drink</p>
        <p>Labor that carries both innovation and exploitation</p>
        <p>The ingenuity of thousands of engineers</p>
        <p>A material promise of the future built on the costs of the present</p>
      </div>
      <div className="pt-12 space-y-6">
        <p className="text-3xl text-cyan-400 italic">
          "Knowing this, how do you see this object now?"
        </p>
        <p className="text-2xl text-gray-400 italic">
          "What would it mean to truly value what you hold?"
        </p>
      </div>
    </div>
  );
};

const HomeView = ({ selectObject, addCustomObject, customObjects }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold tracking-tight">
            The <span className="text-cyan-400">Hidden</span> Map
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Revealing the elemental stories inside everything. Choose an object to begin your journey into the invisible networks of extraction, labor, and consequence.
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-purple-300">AI-Powered Object Discovery</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Don't see your object? Type anything you own, and AI will reveal its hidden material story—metals, mining, and global impact.
          </p>
          <button
            onClick={() => setShowPrompt(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-6 py-4 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="w-5 h-5" />
            Generate Custom Object Story
          </button>
        </div>

        {showPrompt && (
          <ObjectPromptModal 
            onClose={() => setShowPrompt(false)}
            onGenerate={(objectKey, objectData) => {
              addCustomObject(objectKey, objectData);
              selectObject(objectKey);
            }}
          />
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Featured Objects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(objectsDatabase).map(([key, obj]) => (
              <button
                key={key}
                onClick={() => selectObject(key)}
                className="group relative bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8 hover:border-cyan-500 transition-all duration-300 hover:bg-gray-800/70 hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-4">
                  <obj.icon className="w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <h3 className="text-xl font-semibold">{obj.name}</h3>
                  <p className="text-sm text-gray-400 text-center leading-relaxed">
                    {obj.tagline}
                  </p>
                </div>
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 rounded-xl transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {Object.keys(customObjects).length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              Your Generated Objects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(customObjects).map(([key, obj]) => (
                <button
                  key={key}
                  onClick={() => selectObject(key)}
                  className="group relative bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur border border-purple-500/30 rounded-xl p-8 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <Sparkles className="w-16 h-16 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <h3 className="text-xl font-semibold">{obj.name}</h3>
                    <p className="text-sm text-gray-400 text-center leading-relaxed">
                      {obj.tagline}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 pt-8">
          <p>An educational experience by artists, for artists.</p>
          <p className="mt-2">Every object is a portal. Every material is a story.</p>
          <p className="mt-4 text-xs text-purple-400">
            Powered by Together.ai for infinite object discovery
          </p>
        </div>
      </div>
    </div>
  );
};

const ObjectPromptModal = ({ onClose, onGenerate }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('input');

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setStage('generating');

    try {
      const response = await fetch('/api/generate-object', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objectName: input.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const objectData = await response.json();

      setLoading(false);
      setStage('complete');

      // Add icon for rendering (AI-generated objects use Sparkles icon)
      objectData.icon = Sparkles;

      const objectKey = input.toLowerCase().replace(/\s+/g, '_');
      onGenerate(objectKey, objectData);

    } catch (error) {
      console.error('Error generating object:', error);
      setLoading(false);
      setStage('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="bg-gray-900 border border-purple-500/30 rounded-xl max-w-2xl w-full p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Generate Object Story</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {stage === 'input' && (
          <>
            <p className="text-gray-400 leading-relaxed">
              Type any object you own, and AI will analyze its material composition, trace the metals to their mining origins, and reveal the hidden environmental and human costs.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="e.g., coffee maker, headphones, bicycle..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-6 py-4 text-lg focus:outline-none focus:border-purple-500 transition-colors"
                autoFocus
              />

              <div className="flex gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={!input.trim() || loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-8 py-4 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Material Story
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <p className="text-sm text-gray-400">
                <strong className="text-purple-400">Note:</strong> Generation uses Together.ai's LLM to analyze material composition and generate real data. First generation may take 5-10 seconds.
              </p>
            </div>
          </>
        )}

        {stage === 'generating' && (
          <div className="py-12 text-center space-y-6">
            <Loader className="w-16 h-16 mx-auto text-purple-400 animate-spin" />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Analyzing {input}...</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  Identifying material composition
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  Tracing supply chains
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  Calculating environmental impact
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
                  Generating visualizations
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              AI is analyzing material databases, mining records, and supply chain data...
            </p>
          </div>
        )}

        {stage === 'error' && (
          <div className="py-12 text-center space-y-6">
            <X className="w-16 h-16 mx-auto text-red-400" />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-red-400">Generation Failed</h3>
              <p className="text-gray-400">
                There was an error generating the material breakdown. This could be due to:
              </p>
              <ul className="text-sm text-gray-500 space-y-1 max-w-md mx-auto text-left">
                <li>• Missing or invalid Together.ai API key</li>
                <li>• Network connectivity issues</li>
                <li>• Rate limit exceeded</li>
              </ul>
            </div>
            <button
              onClick={() => setStage('input')}
              className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ObjectView = ({ object, dissolveAnimation, setView, setSelectedMetal, resetApp, startSlideshow }) => {
  return (
    <div className="min-h-screen p-8">
      <button
        onClick={resetApp}
        className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <div className="max-w-6xl mx-auto space-y-16">
        <div className={`text-center space-y-6 transition-all duration-1000 ${dissolveAnimation ? 'opacity-100' : 'opacity-0'}`}>
          <object.icon className="w-24 h-24 mx-auto text-cyan-400" />
          <h1 className="text-5xl font-bold">{object.name}</h1>
          <p className="text-2xl text-gray-300">{object.tagline}</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {object.description}
          </p>

          <button
            onClick={startSlideshow}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
          >
            <Play className="w-6 h-6" />
            Watch Presentation
          </button>
        </div>

        <div className="relative h-64 flex items-center justify-center">
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ${
              dissolveAnimation ? 'opacity-20 blur-sm' : 'opacity-100'
            }`}
          >
            <object.icon className="w-48 h-48 text-gray-600" />
          </div>
          
          {dissolveAnimation && (
            <div className="relative z-10 grid grid-cols-3 gap-8">
              {object.metals.slice(0, 6).map((metal, idx) => (
                <div
                  key={idx}
                  className="animate-pulse"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl">
                    {metal.emoji}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`space-y-4 transition-all duration-1000 delay-500 ${dissolveAnimation ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-center mb-8">The Elemental Anatomy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {object.metals.map((metal, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedMetal(metal);
                  setView('metal');
                }}
                className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 hover:bg-gray-800/70 text-left group relative overflow-hidden"
              >
                {metal.visualImage === "ai-generated" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="text-4xl">{metal.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                      {metal.name} <span className="text-gray-500 text-sm">({metal.symbol})</span>
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{metal.function}</p>
                    <div className="mt-3 flex items-center text-cyan-400 text-sm">
                      <span>Explore deeper</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`flex gap-4 justify-center transition-all duration-1000 delay-700 ${dissolveAnimation ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => setView('map')}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 px-8 py-4 rounded-lg transition-colors font-semibold"
          >
            <Globe className="w-5 h-5" />
            View Global Map
          </button>
          <button
            onClick={() => setView('reflection')}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg transition-colors font-semibold"
          >
            See The Full Impact
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MetalDetail = ({ metal, objectName, setView }) => {
  return (
    <div className="min-h-screen p-8">
      <button
        onClick={() => setView('object')}
        className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to {objectName}
      </button>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 relative">
          {metal.visualImage === "ai-generated" && (
            <div className="absolute inset-0 -z-10 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-3xl" />
            </div>
          )}
          <div className="text-7xl">{metal.emoji}</div>
          <h1 className="text-5xl font-bold">{metal.name}</h1>
          <p className="text-xl text-gray-400">{metal.symbol}</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-700/30 rounded-xl p-8">
          <div className="flex items-start gap-4 mb-4">
            <Factory className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3 text-cyan-400">The Function</h2>
              <p className="text-lg leading-relaxed text-gray-300">{metal.function}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-xl p-8">
          <div className="flex items-start gap-4 mb-4">
            <MapPin className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3 text-amber-400">The Journey</h2>
              <p className="text-lg leading-relaxed text-gray-300 mb-4">{metal.journey}</p>
              <div className="flex flex-wrap gap-2">
                {metal.locations.map((location, idx) => (
                  <span key={idx} className="bg-amber-900/30 px-3 py-1 rounded-full text-sm">
                    📍 {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-700/30 rounded-xl p-8">
          <div className="flex items-start gap-4 mb-4">
            <Flame className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3 text-red-400">The Cost</h2>
              <p className="text-lg leading-relaxed text-gray-300">{metal.impact}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-700/30 rounded-xl p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl flex-shrink-0">✨</div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-purple-400">The Wonder</h2>
              <p className="text-lg leading-relaxed text-gray-300 italic">{metal.wonder}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorldMapView = ({ object, setView }) => {
  const allLocations = [...new Set(object.metals.flatMap(m => m.locations))];
  
  return (
    <div className="min-h-screen p-8">
      <button
        onClick={() => setView('object')}
        className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to {object.name}
      </button>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">The Global Network</h1>
          <p className="text-xl text-gray-400">
            Your {object.name.toLowerCase()} connects {object.footprint.countries} countries across {allLocations.length} mining regions
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Globe className="w-full h-full" />
          </div>
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allLocations.map((location, idx) => (
              <div
                key={idx}
                className="bg-cyan-900/30 border border-cyan-600/50 rounded-lg p-4 hover:bg-cyan-900/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold">{location}</span>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {object.metals.filter(m => m.locations.includes(location)).map(m => m.name).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6">
            <Droplets className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-3xl font-bold mb-2">{object.footprint.water}</div>
            <div className="text-sm text-gray-400">Water consumed in production</div>
          </div>
          
          <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-6">
            <Flame className="w-8 h-8 text-orange-400 mb-3" />
            <div className="text-3xl font-bold mb-2">{object.footprint.co2}</div>
            <div className="text-sm text-gray-400">CO₂ emissions</div>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6">
            <Users className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-3xl font-bold mb-2">{object.footprint.laborHours}</div>
            <div className="text-sm text-gray-400">Human labor hours</div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setView('reflection')}
            className="bg-cyan-600 hover:bg-cyan-500 px-8 py-4 rounded-lg transition-colors font-semibold inline-flex items-center gap-2"
          >
            Continue to Reflection
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReflectionView = ({ object, resetApp }) => {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold">The Full Picture</h1>
          <p className="text-2xl text-gray-400">Your {object.name.toLowerCase()}'s true footprint</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Geographic Reach</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Countries of origin:</span>
                <span className="font-bold">{object.footprint.countries}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Environmental Cost</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Water consumed:</span>
                <span className="font-bold">{object.footprint.water}</span>
              </div>
              <div className="flex justify-between">
                <span>CO₂ emissions:</span>
                <span className="font-bold">{object.footprint.co2}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Human Labor</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Labor hours:</span>
                <span className="font-bold">{object.footprint.laborHours}</span>
              </div>
              <div className="flex justify-between">
                <span>Conflict minerals:</span>
                <span className="font-bold">{object.footprint.conflictMinerals}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Circularity</h3>
            <div className="space-y-3 text-gray-300">
              <div className="text-sm">{object.footprint.recyclable}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-700/50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">This {object.name.toLowerCase()} contains:</h2>
          <div className="space-y-3 text-lg text-gray-300 leading-relaxed">
            <p>• {object.metals[0].locations[0]}'s underground reserves</p>
            <p>• The ingenuity of thousands of engineers</p>
            <p>• Water that communities will never drink</p>
            <p>• Labor that carries both innovation and exploitation</p>
            <p>• The desire of billions of consumers</p>
            <p>• A material promise of the future built on the costs of the present</p>
          </div>
        </div>

        <div className="text-center space-y-6 py-8">
          <p className="text-2xl text-gray-300 italic">
            "Knowing this, how do you see this object now?"
          </p>
          <p className="text-xl text-gray-400">
            "What would it mean to truly value what you hold?"
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={resetApp}
            className="bg-cyan-600 hover:bg-cyan-500 px-8 py-4 rounded-lg transition-colors font-semibold"
          >
            Explore Another Object
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-800">
          <p className="mb-2">Every object is a portal. Every material is a story.</p>
          <p>Share this experience. Start conversations. Demand transparency.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
