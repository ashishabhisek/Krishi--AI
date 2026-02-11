// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const cropDropdown = document.getElementById('crop-dropdown');
const cropDetails = document.getElementById('crop-details');
const seasonModal = document.getElementById('season-modal');
const guidelineModal = document.getElementById('guideline-modal');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Language Selector
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});

// Language Selection
document.querySelectorAll('.lang-dropdown a').forEach(langOption => {
    langOption.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLanguage = e.target.getAttribute('data-lang');
        selectedLang.textContent = selectedLanguage;
        langDropdown.classList.remove('active');
        
        console.log('Language changed to:', selectedLanguage);
        showNotification(`Language changed to ${selectedLanguage}`, 'success');
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Crop Data
const cropData = {
    rice: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Clay loam to silty clay loam soils</li>
                    <li><strong>pH Range:</strong> 5.5 to 7.0 (slightly acidic to neutral)</li>
                    <li><strong>Drainage:</strong> Good water retention capacity with controlled drainage</li>
                    <li><strong>Organic Matter:</strong> Rich in organic content (2-3%)</li>
                    <li><strong>Depth:</strong> Minimum 15-20 cm of puddled layer</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 60 kg N + 30 kg P₂O₅ + 30 kg K₂O per hectare</li>
                    <li><strong>First Top Dressing:</strong> 30 kg N at tillering stage (20-25 days)</li>
                    <li><strong>Second Top Dressing:</strong> 30 kg N at panicle initiation (45-50 days)</li>
                    <li><strong>Micronutrients:</strong> Zinc sulfate 25 kg/ha, Iron sulfate if deficient</li>
                    <li><strong>Organic:</strong> 5-10 tons FYM or compost per hectare</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 1200-1500 mm during crop season</li>
                    <li><strong>Transplanting:</strong> Maintain 2-3 cm standing water</li>
                    <li><strong>Vegetative Stage:</strong> 5-7 cm water depth</li>
                    <li><strong>Reproductive Stage:</strong> Continuous submergence critical</li>
                    <li><strong>Maturity:</strong> Drain field 10-15 days before harvest</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Brown Plant Hopper:</strong> Use resistant varieties, neem oil spray</li>
                    <li><strong>Stem Borer:</strong> Pheromone traps, Trichogramma release</li>
                    <li><strong>Blast Disease:</strong> Tricyclazole fungicide, resistant varieties</li>
                    <li><strong>Bacterial Blight:</strong> Copper-based fungicides, seed treatment</li>
                    <li><strong>Sheath Blight:</strong> Propiconazole spray, proper spacing</li>
                </ul>
            `
        }
    },
    wheat: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Well-drained loamy soils preferred</li>
                    <li><strong>pH Range:</strong> 6.0 to 7.5 (slightly acidic to neutral)</li>
                    <li><strong>Drainage:</strong> Good drainage essential, avoid waterlogging</li>
                    <li><strong>Organic Matter:</strong> 1.5-2.5% organic carbon content</li>
                    <li><strong>Depth:</strong> Deep soils (>75 cm) for better root development</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 80 kg N + 40 kg P₂O₅ + 40 kg K₂O per hectare</li>
                    <li><strong>First Top Dressing:</strong> 40 kg N at crown root initiation (20-25 days)</li>
                    <li><strong>Second Top Dressing:</strong> 40 kg N at jointing stage (45-50 days)</li>
                    <li><strong>Micronutrients:</strong> Zinc sulfate 20 kg/ha if deficient</li>
                    <li><strong>Organic:</strong> 8-10 tons FYM per hectare</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 450-650 mm during crop season</li>
                    <li><strong>Critical Stages:</strong> Crown root initiation, tillering, flowering</li>
                    <li><strong>Irrigation Schedule:</strong> 4-6 irrigations depending on rainfall</li>
                    <li><strong>Method:</strong> Furrow irrigation or sprinkler system</li>
                    <li><strong>Timing:</strong> Early morning irrigation preferred</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Aphids:</strong> Imidacloprid spray, encourage natural predators</li>
                    <li><strong>Rust Diseases:</strong> Resistant varieties, propiconazole fungicide</li>
                    <li><strong>Termites:</strong> Chlorpyrifos soil treatment, organic matter</li>
                    <li><strong>Loose Smut:</strong> Seed treatment with systemic fungicides</li>
                    <li><strong>Powdery Mildew:</strong> Sulfur dusting, proper ventilation</li>
                </ul>
            `
        }
    },
    cotton: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Deep black cotton soils (Vertisols) preferred</li>
                    <li><strong>pH Range:</strong> 5.8 to 8.2 (wide tolerance range)</li>
                    <li><strong>Drainage:</strong> Well-drained soils, avoid salinity</li>
                    <li><strong>Organic Matter:</strong> 0.5-1.0% minimum organic carbon</li>
                    <li><strong>Depth:</strong> Deep soils (>100 cm) for taproot development</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 60 kg N + 30 kg P₂O₅ + 30 kg K₂O per hectare</li>
                    <li><strong>First Top Dressing:</strong> 60 kg N at square formation (45 days)</li>
                    <li><strong>Second Top Dressing:</strong> 60 kg N at flowering stage (75 days)</li>
                    <li><strong>Micronutrients:</strong> Boron, zinc, and iron as per soil test</li>
                    <li><strong>Organic:</strong> 5-7 tons FYM per hectare</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 700-1300 mm during crop season</li>
                    <li><strong>Critical Stages:</strong> Flowering, boll formation, boll development</li>
                    <li><strong>Irrigation Schedule:</strong> 8-12 irrigations depending on rainfall</li>
                    <li><strong>Method:</strong> Drip irrigation most efficient</li>
                    <li><strong>Frequency:</strong> 10-15 days interval during peak growth</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Bollworm:</strong> Bt cotton varieties, pheromone traps</li>
                    <li><strong>Aphids:</strong> Neem oil spray, predatory insects</li>
                    <li><strong>Whitefly:</strong> Yellow sticky traps, imidacloprid spray</li>
                    <li><strong>Wilt Disease:</strong> Resistant varieties, soil solarization</li>
                    <li><strong>Red Cotton Bug:</strong> Malathion spray, field sanitation</li>
                </ul>
            `
        }
    },
    sugarcane: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Deep, fertile, well-drained loamy soils</li>
                    <li><strong>pH Range:</strong> 6.5 to 7.5 (neutral to slightly alkaline)</li>
                    <li><strong>Drainage:</strong> Good drainage with water retention capacity</li>
                    <li><strong>Organic Matter:</strong> High organic matter content (>2%)</li>
                    <li><strong>Depth:</strong> Very deep soils (>150 cm) preferred</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 150 kg N + 60 kg P₂O₅ + 60 kg K₂O per hectare</li>
                    <li><strong>First Top Dressing:</strong> 75 kg N at 45 days after planting</li>
                    <li><strong>Second Top Dressing:</strong> 75 kg N at 90 days after planting</li>
                    <li><strong>Micronutrients:</strong> Zinc, iron, and manganese as required</li>
                    <li><strong>Organic:</strong> 15-20 tons FYM per hectare</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 1500-2500 mm during crop season</li>
                    <li><strong>Critical Stages:</strong> Germination, tillering, grand growth period</li>
                    <li><strong>Irrigation Schedule:</strong> 15-20 irrigations per crop season</li>
                    <li><strong>Method:</strong> Furrow irrigation or drip irrigation</li>
                    <li><strong>Frequency:</strong> 7-10 days interval during summer</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Early Shoot Borer:</strong> Resistant varieties, pheromone traps</li>
                    <li><strong>Top Borer:</strong> Trichogramma release, clean cultivation</li>
                    <li><strong>Red Rot:</strong> Resistant varieties, roguing infected plants</li>
                    <li><strong>Smut Disease:</strong> Hot water treatment of setts</li>
                    <li><strong>Scale Insects:</strong> Malathion spray, biological control</li>
                </ul>
            `
        }
    },
    maize: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Well-drained sandy loam to clay loam</li>
                    <li><strong>pH Range:</strong> 6.0 to 7.5 (slightly acidic to neutral)</li>
                    <li><strong>Drainage:</strong> Good drainage essential, avoid waterlogging</li>
                    <li><strong>Organic Matter:</strong> 1.5-2.0% organic carbon content</li>
                    <li><strong>Depth:</strong> Deep soils (>75 cm) for root development</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 60 kg N + 60 kg P₂O₅ + 40 kg K₂O per hectare</li>
                    <li><strong>First Top Dressing:</strong> 60 kg N at knee-high stage (30 days)</li>
                    <li><strong>Second Top Dressing:</strong> 60 kg N at tasseling stage (60 days)</li>
                    <li><strong>Micronutrients:</strong> Zinc sulfate 25 kg/ha if deficient</li>
                    <li><strong>Organic:</strong> 8-10 tons FYM per hectare</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 500-800 mm during crop season</li>
                    <li><strong>Critical Stages:</strong> Tasseling, silking, grain filling</li>
                    <li><strong>Irrigation Schedule:</strong> 4-6 irrigations depending on rainfall</li>
                    <li><strong>Method:</strong> Furrow irrigation or sprinkler system</li>
                    <li><strong>Timing:</strong> Avoid water stress during flowering</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Fall Armyworm:</strong> Bt maize varieties, pheromone traps</li>
                    <li><strong>Stem Borer:</strong> Trichogramma release, carbofuran granules</li>
                    <li><strong>Downy Mildew:</strong> Resistant varieties, metalaxyl seed treatment</li>
                    <li><strong>Common Rust:</strong> Resistant hybrids, mancozeb spray</li>
                    <li><strong>Aphids:</strong> Imidacloprid spray, encourage natural enemies</li>
                </ul>
            `
        }
    },
    potato: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Well-drained sandy loam soils preferred</li>
                    <li><strong>pH Range:</strong> 5.0 to 6.5 (acidic to slightly acidic)</li>
                    <li><strong>Drainage:</strong> Excellent drainage essential</li>
                    <li><strong>Organic Matter:</strong> High organic matter content (>2%)</li>
                    <li><strong>Depth:</strong> Deep, loose soils for tuber development</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 120 kg N + 80 kg P₂O₅ + 100 kg K₂O per hectare</li>
                    <li><strong>Top Dressing:</strong> 60 kg N at earthing up (30-35 days)</li>
                    <li><strong>Micronutrients:</strong> Boron, zinc as per soil test</li>
                    <li><strong>Organic:</strong> 20-25 tons FYM per hectare</li>
                    <li><strong>Calcium:</strong> Gypsum application if calcium deficient</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 400-600 mm during crop season</li>
                    <li><strong>Critical Stages:</strong> Tuber initiation, tuber bulking</li>
                    <li><strong>Irrigation Schedule:</strong> 8-10 light irrigations</li>
                    <li><strong>Method:</strong> Drip irrigation or sprinkler system</li>
                    <li><strong>Frequency:</strong> 7-10 days interval, avoid overwatering</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Late Blight:</strong> Resistant varieties, metalaxyl + mancozeb</li>
                    <li><strong>Potato Tuber Moth:</strong> Pheromone traps, proper storage</li>
                    <li><strong>Aphids:</strong> Yellow sticky traps, imidacloprid spray</li>
                    <li><strong>Common Scab:</strong> Maintain soil pH below 5.5</li>
                    <li><strong>Colorado Beetle:</strong> Hand picking, Bt spray</li>
                </ul>
            `
        }
    },
    tomato: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Well-drained loamy soils with good structure</li>
                    <li><strong>pH Range:</strong> 6.0 to 7.0 (slightly acidic to neutral)</li>
                    <li><strong>Drainage:</strong> Excellent drainage, avoid waterlogging</li>
                    <li><strong>Organic Matter:</strong> Rich in organic matter (>2.5%)</li>
                    <li><strong>Depth:</strong> Deep soils (>60 cm) for root development</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 100 kg N + 100 kg P₂O₅ + 60 kg K₂O per hectare</li>
                    <li><strong>First Top Dressing:</strong> 50 kg N at flowering (30 days)</li>
                    <li><strong>Second Top Dressing:</strong> 50 kg N at fruit setting (50 days)</li>
                    <li><strong>Micronutrients:</strong> Calcium, boron, magnesium as required</li>
                    <li><strong>Organic:</strong> 15-20 tons FYM per hectare</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 600-800 mm during crop season</li>
                    <li><strong>Critical Stages:</strong> Flowering, fruit setting, fruit development</li>
                    <li><strong>Irrigation Schedule:</strong> 2-3 days interval in summer</li>
                    <li><strong>Method:</strong> Drip irrigation most suitable</li>
                    <li><strong>Mulching:</strong> Use plastic mulch to conserve moisture</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Tomato Leaf Curl Virus:</strong> Resistant varieties, whitefly control</li>
                    <li><strong>Early Blight:</strong> Mancozeb spray, crop rotation</li>
                    <li><strong>Fruit Borer:</strong> Pheromone traps, Bt spray</li>
                    <li><strong>Whitefly:</strong> Yellow sticky traps, neem oil</li>
                    <li><strong>Bacterial Wilt:</strong> Resistant varieties, soil solarization</li>
                </ul>
            `
        }
    },
    onion: {
        soil: {
            title: "Soil Requirements",
            content: `
                <ul>
                    <li><strong>Soil Type:</strong> Well-drained sandy loam to clay loam</li>
                    <li><strong>pH Range:</strong> 6.0 to 7.5 (slightly acidic to neutral)</li>
                    <li><strong>Drainage:</strong> Good drainage essential for bulb development</li>
                    <li><strong>Organic Matter:</strong> High organic matter content (>2%)</li>
                    <li><strong>Depth:</strong> Medium deep soils (50-75 cm)</li>
                </ul>
            `
        },
        fertilizer: {
            title: "Fertilizer Schedule",
            content: `
                <ul>
                    <li><strong>Basal Application:</strong> 100 kg N + 50 kg P₂O₅ + 50 kg K₂O per hectare</li>
                    <li><strong>First Top Dressing:</strong> 50 kg N at 30 days after transplanting</li>
                    <li><strong>Second Top Dressing:</strong> 50 kg N at 60 days after transplanting</li>
                    <li><strong>Micronutrients:</strong> Sulfur 40 kg/ha for better bulb quality</li>
                    <li><strong>Organic:</strong> 15-20 tons FYM per hectare</li>
                </ul>
            `
        },
        water: {
            title: "Watering Needs",
            content: `
                <ul>
                    <li><strong>Water Requirement:</strong> 350-550 mm during crop season</li>
                    <li><strong>Critical Stages:</strong> Bulb initiation, bulb development</li>
                    <li><strong>Irrigation Schedule:</strong> 7-10 days interval</li>
                    <li><strong>Method:</strong> Furrow irrigation or drip irrigation</li>
                    <li><strong>Maturity:</strong> Stop irrigation 2-3 weeks before harvest</li>
                </ul>
            `
        },
        pest: {
            title: "Common Pests & Management",
            content: `
                <ul>
                    <li><strong>Purple Blotch:</strong> Mancozeb spray, proper spacing</li>
                    <li><strong>Thrips:</strong> Blue sticky traps, imidacloprid spray</li>
                    <li><strong>Onion Maggot:</strong> Soil treatment with chlorpyrifos</li>
                    <li><strong>Stemphylium Blight:</strong> Resistant varieties, fungicide spray</li>
                    <li><strong>Basal Rot:</strong> Trichoderma seed treatment, crop rotation</li>
                </ul>
            `
        }
    }
};

// Season Details Data
const seasonData = {
    kharif: {
        title: "Kharif Season Detailed Guide",
        content: `
            <h4>Overview</h4>
            <p>Kharif season is the monsoon cropping season in India, typically from June to October. It relies heavily on monsoon rains and is characterized by warm and humid conditions.</p>
            
            <h4>Major Crops</h4>
            <ul>
                <li><strong>Rice:</strong> The most important kharif crop, grown in areas with high rainfall</li>
                <li><strong>Cotton:</strong> Major cash crop requiring warm climate and moderate rainfall</li>
                <li><strong>Sugarcane:</strong> Long duration crop requiring high water availability</li>
                <li><strong>Maize:</strong> Versatile crop adaptable to various agro-climatic conditions</li>
                <li><strong>Pulses:</strong> Arhar, Moong, Urad for protein and soil fertility</li>
            </ul>
            
            <h4>Soil Preparation</h4>
            <ul>
                <li>Deep ploughing during summer to expose soil to sun</li>
                <li>Addition of organic matter (FYM/compost) before monsoon</li>
                <li>Proper drainage systems to handle excess water</li>
                <li>Land leveling for uniform water distribution</li>
            </ul>
            
            <h4>Water Management</h4>
            <ul>
                <li>Primarily dependent on monsoon rainfall</li>
                <li>Supplementary irrigation during dry spells</li>
                <li>Proper drainage to prevent waterlogging</li>
                <li>Rainwater harvesting for future use</li>
            </ul>
            
            <h4>Key Challenges</h4>
            <ul>
                <li>Irregular monsoon patterns</li>
                <li>Pest and disease pressure due to humidity</li>
                <li>Waterlogging in heavy rainfall areas</li>
                <li>Post-harvest losses due to weather</li>
            </ul>
        `
    },
    rabi: {
        title: "Rabi Season Detailed Guide",
        content: `
            <h4>Overview</h4>
            <p>Rabi season is the winter cropping season in India, from November to April. Crops are sown after monsoon and harvested in spring, requiring irrigation support.</p>
            
            <h4>Major Crops</h4>
            <ul>
                <li><strong>Wheat:</strong> The most important rabi crop, staple food grain</li>
                <li><strong>Barley:</strong> Hardy crop suitable for marginal lands</li>
                <li><strong>Gram:</strong> Important pulse crop for protein and soil health</li>
                <li><strong>Peas:</strong> Vegetable crop with good market demand</li>
                <li><strong>Mustard:</strong> Oilseed crop for cooking oil production</li>
                <li><strong>Potato:</strong> Important vegetable crop with high yield potential</li>
            </ul>
            
            <h4>Soil Preparation</h4>
            <ul>
                <li>Fine tilth preparation for small seeded crops</li>
                <li>Residue management from previous kharif crop</li>
                <li>Basal fertilizer application before sowing</li>
                <li>Seed bed preparation with proper moisture</li>
            </ul>
            
            <h4>Water Management</h4>
            <ul>
                <li>Regular irrigation required throughout season</li>
                <li>Critical irrigation at specific growth stages</li>
                <li>Efficient water use through modern irrigation methods</li>
                <li>Scheduling based on crop growth stages</li>
            </ul>
            
            <h4>Key Advantages</h4>
            <ul>
                <li>Favorable weather conditions for crop growth</li>
                <li>Lower pest and disease pressure</li>
                <li>Better grain quality due to dry weather at harvest</li>
                <li>Higher market prices for fresh produce</li>
            </ul>
        `
    },
    summer: {
        title: "Summer Season Detailed Guide",
        content: `
            <h4>Overview</h4>
            <p>Summer season farming (March to June) is challenging due to high temperatures and water scarcity. Focus is on water-efficient crops and conservation techniques.</p>
            
            <h4>Suitable Crops</h4>
            <ul>
                <li><strong>Watermelon:</strong> High water content fruit with good market demand</li>
                <li><strong>Muskmelon:</strong> Heat-tolerant crop with short duration</li>
                <li><strong>Cucumber:</strong> Quick growing vegetable crop</li>
                <li><strong>Fodder Crops:</strong> Sorghum, maize for livestock feed</li>
                <li><strong>Green Manure:</strong> Dhaincha, sunhemp for soil improvement</li>
            </ul>
            
            <h4>Water Conservation Techniques</h4>
            <ul>
                <li>Drip irrigation for efficient water use</li>
                <li>Mulching to reduce evaporation</li>
                <li>Shade nets to reduce heat stress</li>
                <li>Early morning irrigation to minimize losses</li>
            </ul>
            
            <h4>Soil Management</h4>
            <ul>
                <li>Mulching with organic materials</li>
                <li>Soil conservation practices</li>
                <li>Selection of heat-resistant varieties</li>
                <li>Minimum tillage to conserve moisture</li>
            </ul>
            
            <h4>Special Considerations</h4>
            <ul>
                <li>Heat stress management for crops</li>
                <li>Water availability assessment before sowing</li>
                <li>Market planning for perishable crops</li>
                <li>Alternative income through value addition</li>
            </ul>
        `
    }
};

// Government Guidelines Data
const guidelineData = {
    'pm-kisan': {
        title: "PM-KISAN Scheme Details",
        content: `
            <h4>Scheme Overview</h4>
            <p>The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme launched in 2019 to provide income support to farmer families across the country.</p>
            
            <h4>Eligibility Criteria</h4>
            <ul>
                <li>Small and marginal farmer families with cultivable land</li>
                <li>Land holding up to 2 hectares</li>
                <li>Farmer families as per land records of 2011</li>
                <li>Both husband and wife considered as separate beneficiaries if both are farmers</li>
            </ul>
            
            <h4>Benefits</h4>
            <ul>
                <li>₹6,000 per year in three equal installments of ₹2,000 each</li>
                <li>Direct Benefit Transfer (DBT) to bank accounts</li>
                <li>Payment every four months (April-July, August-November, December-March)</li>
            </ul>
            
            <h4>Application Process</h4>
            <ul>
                <li>Online registration through PM-KISAN portal</li>
                <li>Visit Common Service Centers (CSCs)</li>
                <li>Contact local agriculture officers</li>
                <li>Required documents: Aadhaar, bank account details, land records</li>
            </ul>
            
            <h4>Exclusions</h4>
            <ul>
                <li>Institutional land holders</li>
                <li>Farmer families with income tax paying members</li>
                <li>Government employees and pensioners</li>
                <li>Professionals like doctors, engineers, lawyers</li>
            </ul>
        `
    },
    'pmfby': {
        title: "Pradhan Mantri Fasal Bima Yojana Details",
        content: `
            <h4>Scheme Overview</h4>
            <p>PMFBY is a comprehensive crop insurance scheme providing financial support to farmers in case of crop loss due to natural calamities, pests, and diseases.</p>
            
            <h4>Coverage</h4>
            <ul>
                <li>All food crops, oilseeds, and annual commercial/horticultural crops</li>
                <li>Pre-sowing to post-harvest losses</li>
                <li>Localized calamities like hailstorm, landslide, inundation</li>
                <li>Post-harvest losses due to cyclones and unseasonal rains</li>
            </ul>
            
            <h4>Premium Rates</h4>
            <ul>
                <li>Kharif crops: 2% of sum insured</li>
                <li>Rabi crops: 1.5% of sum insured</li>
                <li>Annual commercial and horticultural crops: 5% of sum insured</li>
                <li>Government subsidy on premium: 50% for general farmers, 55% for SC/ST farmers</li>
            </ul>
            
            <h4>Sum Insured</h4>
            <ul>
                <li>Based on scale of finance for the crop</li>
                <li>Covers cost of cultivation including family labor</li>
                <li>District-wise sum insured notified by state governments</li>
            </ul>
            
            <h4>Claim Settlement</h4>
            <ul>
                <li>Based on Crop Cutting Experiments (CCEs)</li>
                <li>Technology solutions like smartphones, drones, satellites</li>
                <li>Quick settlement within 60 days of harvest</li>
                <li>Individual assessment for localized calamities</li>
            </ul>
        `
    },
    'mechanization': {
        title: "Sub-Mission on Agricultural Mechanization Details",
        content: `
            <h4>Scheme Overview</h4>
            <p>The Sub-Mission on Agricultural Mechanization (SMAM) promotes farm mechanization through financial assistance and creating awareness among farmers.</p>
            
            <h4>Components</h4>
            <ul>
                <li>Promotion of agricultural mechanization through subsidies</li>
                <li>Establishment of Custom Hiring Centers (CHCs)</li>
                <li>Hi-Tech Hubs for high-value equipment</li>
                <li>Training and demonstration programs</li>
            </ul>
            
            <h4>Financial Assistance</h4>
            <ul>
                <li>40-50% subsidy on agricultural equipment for individual farmers</li>
                <li>Up to 80% subsidy for Custom Hiring Centers</li>
                <li>Special rates for SC/ST and women farmers</li>
                <li>Maximum subsidy limit varies by equipment category</li>
            </ul>
            
            <h4>Eligible Equipment</h4>
            <ul>
                <li>Tractors and power tillers</li>
                <li>Harvesting and threshing equipment</li>
                <li>Seed drills and planters</li>
                <li>Irrigation equipment</li>
                <li>Post-harvest machinery</li>
            </ul>
            
            <h4>Custom Hiring Centers</h4>
            <ul>
                <li>Provide rental services for expensive equipment</li>
                <li>Managed by FPOs, SHGs, or individual entrepreneurs</li>
                <li>Focus on small and marginal farmers</li>
                <li>Include maintenance and repair facilities</li>
            </ul>
        `
    },
    'organic': {
        title: "Organic Farming Promotion Details",
        content: `
            <h4>National Mission Overview</h4>
            <p>The National Mission for Sustainable Agriculture (NMSA) promotes organic farming as part of climate-resilient agriculture and sustainable farming practices.</p>
            
            <h4>Key Components</h4>
            <ul>
                <li>Paramparagat Krishi Vikas Yojana (PKVY)</li>
                <li>Mission Organic Value Chain Development for North Eastern Region (MOVCDNER)</li>
                <li>Organic certification support</li>
                <li>Market linkage and value addition</li>
            </ul>
            
            <h4>Financial Support</h4>
            <ul>
                <li>₹50,000 per hectare over 3 years for organic conversion</li>
                <li>Cluster-based approach with 50 farmers per cluster</li>
                <li>Support for organic inputs, certification, and marketing</li>
                <li>Additional incentive of ₹500 per quintal for organic produce</li>
            </ul>
            
            <h4>Certification Support</h4>
            <ul>
                <li>Participatory Guarantee System (PGS) certification</li>
                <li>Third-party certification support</li>
                <li>Residue testing and quality assurance</li>
                <li>Traceability systems for organic products</li>
            </ul>
            
            <h4>Benefits of Organic Farming</h4>
            <ul>
                <li>Improved soil health and fertility</li>
                <li>Reduced input costs over time</li>
                <li>Premium prices for organic produce</li>
                <li>Environmental sustainability</li>
                <li>Better human and animal health</li>
            </ul>
        `
    }
};

// Crop Details Function
function showCropDetails() {
    const selectedCrop = cropDropdown.value;
    
    if (selectedCrop && cropData[selectedCrop]) {
        const crop = cropData[selectedCrop];
        
        // Update soil requirements
        document.getElementById('soil-requirements').innerHTML = crop.soil.content;
        
        // Update fertilizer schedule
        document.getElementById('fertilizer-schedule').innerHTML = crop.fertilizer.content;
        
        // Update watering needs
        document.getElementById('watering-needs').innerHTML = crop.water.content;
        
        // Update pest management
        document.getElementById('pest-management').innerHTML = crop.pest.content;
        
        // Show the crop details section
        cropDetails.style.display = 'block';
        
        // Smooth scroll to crop details
        cropDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        showNotification(`Showing details for ${selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}`, 'success');
    } else {
        cropDetails.style.display = 'none';
    }
}

// Season Details Modal Functions
function showSeasonDetails(season) {
    const seasonInfo = seasonData[season];
    if (seasonInfo) {
        document.getElementById('season-modal-title').textContent = seasonInfo.title;
        document.getElementById('season-detail-content').innerHTML = seasonInfo.content;
        seasonModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSeasonModal() {
    seasonModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Guideline Modal Functions
function openGuideline(guidelineId) {
    const guideline = guidelineData[guidelineId];
    if (guideline) {
        document.getElementById('guideline-modal-title').textContent = guideline.title;
        document.getElementById('guideline-detail-content').innerHTML = guideline.content;
        guidelineModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGuidelineModal() {
    guidelineModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modals when clicking overlay
seasonModal.addEventListener('click', (e) => {
    if (e.target === seasonModal) {
        closeSeasonModal();
    }
});

guidelineModal.addEventListener('click', (e) => {
    if (e.target === guidelineModal) {
        closeGuidelineModal();
    }
});

// Resource Links Function
function visitResource(website) {
    showNotification(`Opening ${website}...`, 'info');
    // In a real application, this would open the actual website
    console.log(`Visiting: https://${website}`);
    // window.open(`https://${website}`, '_blank');
}

// Download Guide Function
function downloadGuide(filename) {
    showNotification(`Downloading ${filename}...`, 'success');
    // In a real application, this would trigger actual file download
    console.log(`Downloading: ${filename}`);
    
    // Simulate download progress
    setTimeout(() => {
        showNotification(`${filename} downloaded successfully!`, 'success');
    }, 2000);
}

// Notification Function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        max-width: 350px;
    `;
    
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4a7c59';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#000';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Card hover effects
document.querySelectorAll('.seasonal-card, .guideline-card, .resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('Advisory & Resources page initialized successfully');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        if (seasonModal.classList.contains('active')) {
            closeSeasonModal();
        }
        if (guidelineModal.classList.contains('active')) {
            closeGuidelineModal();
        }
        if (langDropdown.classList.contains('active')) {
            langDropdown.classList.remove('active');
        }
    }
});

console.log('KrishiAI Advisory & Resources Page - Loaded successfully');
console.log('Features: Seasonal Advisory, Crop Practices, Government Guidelines, Resource Links, Downloadable Guides');