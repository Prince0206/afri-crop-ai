// lib/advisory.ts

export interface Advisory {
  title: string;
  summary: string;
  symptoms: string[];
  actions: string[];
  prevention: string[];
  titleSw?: string;
  summarySw?: string;
  symptomsSw?: string[];
  actionsSw?: string[];
  preventionSw?: string[];
  severity: "High" | "Medium" | "Low";
}

export const advisoryData: Record<string, Advisory> = {
  "Cassava Bacterial Blight": {
    title: "Cassava Bacterial Blight",
    titleSw: "Ugonjwa wa Bakteria wa Muhogo",
    summary:
      "A bacterial disease causing angular leaf spots and stem dieback, spread by infected cuttings and rain splash.",
    summarySw:
      "Ugonjwa wa bakteria unaosababisha madoa ya pembetatu kwenye majani na kufa kwa shina, unaoenea kupitia vipande vilivyoathirika na mvua.",
    symptoms: [
      "Angular water-soaked leaf spots that turn brown",
      "Wilting and dieback of young shoots",
      "Gummy exudate on infected stems",
    ],
    symptomsSw: [
      "Madoa ya maji yenye pembe kwenye majani yanayogeuka kahawia",
      "Kunyauka na kufa kwa machipukizi mapya",
      "Utomvu wenye nata kwenye mashina yaliyoathirika",
    ],
    actions: [
      "Remove and burn all infected plant parts immediately",
      "Apply copper-based bactericide to affected areas",
      "Disinfect cutting tools between plants",
    ],
    actionsSw: [
      "Ondoa na kuchoma sehemu zote zilizoathirika mara moja",
      "Tumia dawa ya shaba kwenye maeneo yaliyoathirika",
      "Safisha zana za kukatia kati ya mimea",
    ],
    prevention: [
      "Use certified disease-free cuttings for planting",
      "Rotate crops every season to break disease cycle",
      "Avoid working in the field when plants are wet",
    ],
    preventionSw: [
      "Tumia vipande vilivyothibitishwa visivyo na ugonjwa kwa upandaji",
      "Zungusha mazao kila msimu kuvunja mzunguko wa ugonjwa",
      "Epuka kufanya kazi shambani wakati mimea iko na unyevu",
    ],
    severity: "High",
  },

  "Cassava Brown Streak Disease": {
    title: "Cassava Brown Streak Disease",
    titleSw: "Ugonjwa wa Milia Kahawia ya Muhogo",
    summary:
      "A viral disease transmitted by whiteflies causing brown streaks on stems and root necrosis, leading to severe yield loss.",
    summarySw:
      "Ugonjwa wa virusi unaoenezwa na nzi weupe unaosababisha milia kahawia kwenye mashina na kuoza kwa mizizi, na kupoteza mavuno makubwa.",
    symptoms: [
      "Yellow or brown streaks along the stem and leaf veins",
      "Brown necrotic patches inside the storage roots",
      "Chlorotic leaf mottling and distortion",
    ],
    symptomsSw: [
      "Milia ya njano au kahawia kwenye shina na mishipa ya majani",
      "Madoa ya kahawia yaliyokufa ndani ya mizizi ya kuhifadhi",
      "Madoa ya njano na kupinda kwa majani",
    ],
    actions: [
      "Uproot and destroy infected plants to prevent spread",
      "Control whitefly populations with appropriate insecticides",
      "Replace with resistant cassava varieties",
    ],
    actionsSw: [
      "Ng'oa na uharibu mimea iliyoathirika kuzuia kuenea",
      "Dhibiti idadi ya nzi weupe kwa dawa sahihi za wadudu",
      "Badilisha na aina za muhogo zinazostahimili ugonjwa",
    ],
    prevention: [
      "Plant certified virus-free cuttings from reputable sources",
      "Use whitefly-resistant or tolerant cassava varieties",
      "Inspect new planting material before introducing to the field",
    ],
    preventionSw: [
      "Panda vipande vilivyothibitishwa visivyo na virusi kutoka vyanzo vya kuaminika",
      "Tumia aina za muhogo zinazostahimili nzi weupe",
      "Kagua nyenzo mpya za upandaji kabla ya kuleta shambani",
    ],
    severity: "High",
  },

  "Cassava Green Mottle": {
    title: "Cassava Green Mottle",
    titleSw: "Madoa ya Kijani ya Muhogo",
    summary:
      "A viral disease causing green mottling and mild leaf distortion, generally less severe than mosaic but can reduce yields.",
    summarySw:
      "Ugonjwa wa virusi unaosababisha madoa ya kijani na kupinda kidogo kwa majani, kwa ujumla si mkali kama mosaic lakini unaweza kupunguza mavuno.",
    symptoms: [
      "Irregular green mottling or mosaic pattern on leaves",
      "Mild leaf distortion and size reduction",
      "Stunted plant growth in severe cases",
    ],
    symptomsSw: [
      "Madoa ya kijani yasiyo ya kawaida au mchoro wa mosaic kwenye majani",
      "Kupinda kidogo kwa majani na kupungua kwa ukubwa",
      "Ukuaji mdogo wa mmea katika hali kali",
    ],
    actions: [
      "Remove heavily infected plants to reduce virus reservoir",
      "Control insect vectors with appropriate pesticides",
      "Monitor the field regularly for early detection",
    ],
    actionsSw: [
      "Ondoa mimea iliyoathirika sana kupunguza chanzo cha virusi",
      "Dhibiti wadudu wanaoeneza ugonjwa kwa dawa sahihi",
      "Fuatilia shamba mara kwa mara kwa ugunduzi wa mapema",
    ],
    prevention: [
      "Use healthy, certified planting material",
      "Maintain field hygiene by removing crop debris",
    ],
    preventionSw: [
      "Tumia nyenzo za upandaji zenye afya na zilizothibitishwa",
      "Dumisha usafi wa shamba kwa kuondoa mabaki ya mazao",
    ],
    severity: "Medium",
  },

  "Cassava Mosaic Disease": {
    title: "Cassava Mosaic Disease",
    titleSw: "Ugonjwa wa Mosaic wa Muhogo",
    summary:
      "One of the most destructive cassava diseases, caused by begomoviruses and spread by whiteflies, causing severe leaf distortion and yield losses up to 80%.",
    summarySw:
      "Moja ya magonjwa ya muhogo yanayoharibu zaidi, yanayosababishwa na virusi vya begomovirus na kuenezwa na nzi weupe, na kusababisha kupinda kwa majani na kupoteza mavuno hadi 80%.",
    symptoms: [
      "Mosaic yellow and green leaf discolouration",
      "Severe leaf distortion, twisting, and size reduction",
      "Stunted plant growth and reduced root yield",
    ],
    symptomsSw: [
      "Rangi ya njano na kijani ya mosaic kwenye majani",
      "Kupinda sana kwa majani, kupotoka, na kupungua kwa ukubwa",
      "Ukuaji mdogo wa mmea na kupungua kwa mavuno ya mizizi",
    ],
    actions: [
      "Uproot and destroy severely infected plants",
      "Apply systemic insecticides to control whitefly vectors",
      "Replant with mosaic-resistant cassava varieties",
    ],
    actionsSw: [
      "Ng'oa na uharibu mimea iliyoathirika sana",
      "Tumia dawa za wadudu za kimfumo kudhibiti nzi weupe",
      "Panda tena aina za muhogo zinazostahimili mosaic",
    ],
    prevention: [
      "Only use certified mosaic-free cuttings",
      "Plant resistant varieties such as NASE 14 or TME 14",
      "Implement whitefly management through intercropping",
    ],
    preventionSw: [
      "Tumia tu vipande vilivyothibitishwa visivyo na mosaic",
      "Panda aina zinazostahimili kama NASE 14 au TME 14",
      "Tekeleza udhibiti wa nzi weupe kupitia kilimo mseto",
    ],
    severity: "High",
  },

  "Maize Leaf Blight": {
    title: "Maize Leaf Blight",
    titleSw: "Ugonjwa wa Kuungua kwa Majani ya Mahindi",
    summary:
      "A fungal disease causing large tan lesions on maize leaves, leading to premature leaf death and significant yield reduction.",
    summarySw:
      "Ugonjwa wa kuvu unaosababisha vidonda vikubwa vya rangi ya kahawia kwenye majani ya mahindi, na kusababisha kifo cha mapema cha majani na kupungua kwa mavuno.",
    symptoms: [
      "Large elliptical tan or grey-green lesions on leaves",
      "Lesions with wavy, irregular margins that expand rapidly",
      "Premature drying and death of affected leaves",
    ],
    symptomsSw: [
      "Vidonda vikubwa vya mviringo vya rangi ya kahawia au kijani-kijivu kwenye majani",
      "Vidonda vyenye mipaka ya mawimbi isiyokuwa ya kawaida inayopanuka haraka",
      "Kukauka mapema na kufa kwa majani yaliyoathirika",
    ],
    actions: [
      "Apply foliar fungicides such as mancozeb or propiconazole",
      "Remove and destroy heavily infected plant debris",
      "Improve field drainage to reduce humidity",
    ],
    actionsSw: [
      "Tumia dawa za kuvu za majani kama mancozeb au propiconazole",
      "Ondoa na uharibu mabaki ya mimea iliyoathirika sana",
      "Boresha mifereji ya shamba kupunguza unyevu",
    ],
    prevention: [
      "Plant blight-resistant maize hybrids",
      "Rotate maize with non-host crops such as legumes",
      "Avoid overhead irrigation to reduce leaf wetness",
    ],
    preventionSw: [
      "Panda mahindi ya mseto yanayostahimili ugonjwa wa kuungua",
      "Zungusha mahindi na mazao yasiyokuwa mwenyeji kama mikunde",
      "Epuka umwagiliaji wa juu kupunguza unyevu wa majani",
    ],
    severity: "High",
  },

  "Maize Gray Leaf Spot": {
    title: "Maize Gray Leaf Spot",
    titleSw: "Madoa ya Kijivu ya Mahindi",
    summary:
      "A fungal disease causing rectangular grey lesions on maize leaves, favoured by humid conditions and reduced tillage.",
    summarySw:
      "Ugonjwa wa kuvu unaosababisha vidonda vya mstatili vya kijivu kwenye majani ya mahindi, unaopendwa na hali ya unyevu na kulima kidogo.",
    symptoms: [
      "Rectangular grey to tan lesions running parallel to leaf veins",
      "Lesions with distinct yellow halos in early stages",
      "Extensive leaf blighting in severe infections",
    ],
    symptomsSw: [
      "Vidonda vya mstatili vya kijivu hadi kahawia vinavyokimbia sambamba na mishipa ya majani",
      "Vidonda vyenye halos ya njano wazi katika hatua za mapema",
      "Kuungua kwa majani kwa kiasi kikubwa katika maambukizi makali",
    ],
    actions: [
      "Apply fungicides containing azoxystrobin or pyraclostrobin",
      "Improve air circulation by reducing plant density",
      "Remove infected crop residues after harvest",
    ],
    actionsSw: [
      "Tumia dawa za kuvu zenye azoxystrobin au pyraclostrobin",
      "Boresha mzunguko wa hewa kwa kupunguza msongamano wa mimea",
      "Ondoa mabaki ya mazao yaliyoathirika baada ya mavuno",
    ],
    prevention: [
      "Use gray leaf spot-resistant maize varieties",
      "Practice crop rotation with non-maize crops",
    ],
    preventionSw: [
      "Tumia aina za mahindi zinazostahimili madoa ya kijivu",
      "Fanya mzunguko wa mazao na mazao yasiyokuwa mahindi",
    ],
    severity: "Medium",
  },

  "Maize Rust": {
    title: "Maize Rust",
    titleSw: "Kutu ya Mahindi",
    summary:
      "A fungal disease producing orange-brown pustules on maize leaves, reducing photosynthesis and grain fill.",
    summarySw:
      "Ugonjwa wa kuvu unaozalisha vipele vya rangi ya machungwa-kahawia kwenye majani ya mahindi, kupunguza usanisinuru na kujaza nafaka.",
    symptoms: [
      "Small circular to elongated orange-brown pustules on both leaf surfaces",
      "Pustules rupture to release powdery orange spores",
      "Yellowing of leaves around pustule clusters",
    ],
    symptomsSw: [
      "Vipele vidogo vya mviringo hadi virefu vya rangi ya machungwa-kahawia kwenye pande zote za jani",
      "Vipele vinavyopasuka kutoa mbegu za unga wa rangi ya machungwa",
      "Majani kugeuka njano karibu na makundi ya vipele",
    ],
    actions: [
      "Apply triazole or strobilurin fungicides at first sign of infection",
      "Scout fields regularly during the growing season",
      "Harvest early if rust is severe to minimise losses",
    ],
    actionsSw: [
      "Tumia dawa za kuvu za triazole au strobilurin mara ya kwanza kuona maambukizi",
      "Kagua mashamba mara kwa mara wakati wa msimu wa ukuaji",
      "Vuna mapema ikiwa kutu ni kali kupunguza hasara",
    ],
    prevention: [
      "Plant rust-resistant maize varieties",
      "Avoid late planting which increases rust risk",
    ],
    preventionSw: [
      "Panda aina za mahindi zinazostahimili kutu",
      "Epuka kupanda marehemu ambayo huongeza hatari ya kutu",
    ],
    severity: "Medium",
  },

  "Maize Stalk Rot": {
    title: "Maize Stalk Rot",
    titleSw: "Kuoza kwa Shina la Mahindi",
    summary:
      "A complex of fungal diseases causing internal rotting of the maize stalk, leading to lodging and complete crop loss.",
    summarySw:
      "Mchanganyiko wa magonjwa ya kuvu unaosababisha kuoza kwa ndani ya shina la mahindi, na kusababisha kulala chini na kupoteza mazao kabisa.",
    symptoms: [
      "Premature dying of the whole plant (green snap or firing)",
      "Internal pith of the stalk turns brown and disintegrates",
      "Stalk collapses or lodges easily when pushed",
    ],
    symptomsSw: [
      "Kufa mapema kwa mmea wote (kupasuka kwa kijani au kuungua)",
      "Pith ya ndani ya shina inageuka kahawia na kusambaratika",
      "Shina kuanguka au kulala chini kwa urahisi linapopigwa",
    ],
    actions: [
      "Harvest as soon as the crop reaches maturity to prevent further rotting",
      "Apply balanced fertilisation to avoid nitrogen excess",
      "Improve drainage to reduce waterlogging stress",
    ],
    actionsSw: [
      "Vuna mara tu mazao yanapofikia ukomavu kuzuia kuoza zaidi",
      "Tumia mbolea ya usawa kuepuka ziada ya nitrojeni",
      "Boresha mifereji kupunguza msongo wa maji",
    ],
    prevention: [
      "Plant stalk rot-resistant hybrids",
      "Avoid excessive nitrogen fertilisation",
      "Rotate with non-grass crops to reduce pathogen load",
    ],
    preventionSw: [
      "Panda mahindi ya mseto yanayostahimili kuoza kwa shina",
      "Epuka mbolea nyingi za nitrojeni",
      "Zungusha na mazao yasiyokuwa nyasi kupunguza mzigo wa vimelea",
    ],
    severity: "High",
  },

  "Bean Angular Leaf Spot": {
    title: "Bean Angular Leaf Spot",
    titleSw: "Madoa ya Pembetatu ya Maharagwe",
    summary:
      "A fungal disease of beans causing angular brown spots bounded by leaf veins, reducing photosynthesis and pod quality.",
    summarySw:
      "Ugonjwa wa kuvu wa maharagwe unaosababisha madoa ya pembetatu ya kahawia yaliyozingirwa na mishipa ya majani, kupunguza usanisinuru na ubora wa maganda.",
    symptoms: [
      "Angular brown spots on leaves bounded by leaf veins",
      "Spots may have a reddish-brown border with a grey centre",
      "Premature defoliation in severe cases",
    ],
    symptomsSw: [
      "Madoa ya pembetatu ya kahawia kwenye majani yaliyozingirwa na mishipa ya majani",
      "Madoa yanaweza kuwa na mpaka wa kahawia-nyekundu na katikati ya kijivu",
      "Kuanguka mapema kwa majani katika hali kali",
    ],
    actions: [
      "Apply mancozeb or chlorothalonil fungicide at first sign of disease",
      "Remove and destroy infected leaves and plant debris",
      "Avoid overhead irrigation to reduce leaf wetness duration",
    ],
    actionsSw: [
      "Tumia dawa ya kuvu ya mancozeb au chlorothalonil mara ya kwanza kuona ugonjwa",
      "Ondoa na uharibu majani yaliyoathirika na mabaki ya mimea",
      "Epuka umwagiliaji wa juu kupunguza muda wa unyevu wa majani",
    ],
    prevention: [
      "Use certified disease-free bean seed",
      "Rotate beans with non-legume crops for at least two seasons",
    ],
    preventionSw: [
      "Tumia mbegu za maharagwe zilizothibitishwa zisizo na ugonjwa",
      "Zungusha maharagwe na mazao yasiyokuwa mikunde kwa angalau misimu miwili",
    ],
    severity: "Medium",
  },

  "Bean Rust": {
    title: "Bean Rust",
    titleSw: "Kutu ya Maharagwe",
    summary:
      "A fungal disease producing reddish-brown pustules on bean leaves and pods, causing defoliation and reduced yields.",
    summarySw:
      "Ugonjwa wa kuvu unaozalisha vipele vya kahawia-nyekundu kwenye majani na maganda ya maharagwe, na kusababisha kuanguka kwa majani na kupungua kwa mavuno.",
    symptoms: [
      "Small reddish-brown powdery pustules on the underside of leaves",
      "Yellow halos surrounding pustules on the upper leaf surface",
      "Premature leaf drop and pod infection in severe cases",
    ],
    symptomsSw: [
      "Vipele vidogo vya unga wa kahawia-nyekundu chini ya majani",
      "Halos za njano zinazozunguka vipele juu ya uso wa jani",
      "Kuanguka mapema kwa majani na maambukizi ya maganda katika hali kali",
    ],
    actions: [
      "Apply triazole fungicides such as tebuconazole at early infection",
      "Remove heavily infected plants to reduce spore load",
      "Ensure adequate plant spacing for air circulation",
    ],
    actionsSw: [
      "Tumia dawa za kuvu za triazole kama tebuconazole katika maambukizi ya mapema",
      "Ondoa mimea iliyoathirika sana kupunguza mzigo wa mbegu",
      "Hakikisha nafasi ya kutosha kati ya mimea kwa mzunguko wa hewa",
    ],
    prevention: [
      "Plant rust-resistant bean varieties",
      "Avoid dense planting that promotes humid microclimate",
    ],
    preventionSw: [
      "Panda aina za maharagwe zinazostahimili kutu",
      "Epuka upandaji mnene unaokuza hali ya unyevu",
    ],
    severity: "Medium",
  },

  "Tomato Early Blight": {
    title: "Tomato Early Blight",
    titleSw: "Ugonjwa wa Mapema wa Nyanya",
    summary:
      "A fungal disease causing concentric ring lesions on tomato leaves and fruit, leading to defoliation and reduced fruit quality.",
    summarySw:
      "Ugonjwa wa kuvu unaosababisha vidonda vya pete za mzunguko kwenye majani na matunda ya nyanya, na kusababisha kuanguka kwa majani na kupungua kwa ubora wa matunda.",
    symptoms: [
      "Dark brown lesions with concentric rings (target-board pattern) on older leaves",
      "Yellow halo surrounding the lesions",
      "Stem lesions and fruit rot at the stem end",
    ],
    symptomsSw: [
      "Vidonda vya kahawia nyeusi vyenye pete za mzunguko (mchoro wa bodi ya shabaha) kwenye majani ya zamani",
      "Halo ya njano inayozunguka vidonda",
      "Vidonda vya shina na kuoza kwa matunda kwenye ncha ya shina",
    ],
    actions: [
      "Apply chlorothalonil or copper-based fungicide every 7–10 days",
      "Remove and destroy infected lower leaves",
      "Stake plants to improve air circulation and reduce soil splash",
    ],
    actionsSw: [
      "Tumia dawa ya kuvu ya chlorothalonil au ya shaba kila siku 7-10",
      "Ondoa na uharibu majani ya chini yaliyoathirika",
      "Weka nguzo mimea kuboresha mzunguko wa hewa na kupunguza mwagiko wa udongo",
    ],
    prevention: [
      "Use certified disease-free tomato transplants",
      "Mulch around plants to prevent soil splash onto leaves",
      "Rotate tomatoes with non-solanaceous crops for 2–3 seasons",
    ],
    preventionSw: [
      "Tumia miche ya nyanya iliyothibitishwa isiyo na ugonjwa",
      "Weka matandazo karibu na mimea kuzuia mwagiko wa udongo kwenye majani",
      "Zungusha nyanya na mazao yasiyokuwa ya familia ya solanaceae kwa misimu 2-3",
    ],
    severity: "Medium",
  },

  "Tomato Late Blight": {
    title: "Tomato Late Blight",
    titleSw: "Ugonjwa wa Marehemu wa Nyanya",
    summary:
      "A devastating oomycete disease causing rapid collapse of tomato plants in cool, wet conditions, capable of destroying an entire crop within days.",
    summarySw:
      "Ugonjwa wa oomycete unaoharibu sana unaosababisha kuanguka kwa haraka kwa mimea ya nyanya katika hali ya baridi na mvua, unaoweza kuharibu mazao yote ndani ya siku chache.",
    symptoms: [
      "Water-soaked, irregular dark green to brown lesions on leaves",
      "White fluffy sporulation on the underside of leaves in humid conditions",
      "Rapid browning and collapse of stems and fruit",
    ],
    symptomsSw: [
      "Vidonda vya maji visivyo na mpaka wa kijani giza hadi kahawia kwenye majani",
      "Uzalishaji wa mbegu wa unga mweupe chini ya majani katika hali ya unyevu",
      "Kugeuka kahawia haraka na kuanguka kwa mashina na matunda",
    ],
    actions: [
      "Apply metalaxyl or cymoxanil fungicide immediately upon first symptoms",
      "Remove and destroy all infected plant material",
      "Avoid wetting foliage during irrigation",
    ],
    actionsSw: [
      "Tumia dawa ya kuvu ya metalaxyl au cymoxanil mara moja unapoona dalili za kwanza",
      "Ondoa na uharibu nyenzo zote za mimea zilizoathirika",
      "Epuka kulowanisha majani wakati wa umwagiliaji",
    ],
    prevention: [
      "Plant late blight-resistant tomato varieties",
      "Apply preventive fungicide sprays during cool, wet weather",
      "Ensure good field drainage and avoid overhead irrigation",
    ],
    preventionSw: [
      "Panda aina za nyanya zinazostahimili ugonjwa wa marehemu",
      "Tumia dawa za kuvu za kuzuia wakati wa hali ya baridi na mvua",
      "Hakikisha mifereji mizuri ya shamba na epuka umwagiliaji wa juu",
    ],
    severity: "High",
  },

  Healthy: {
    title: "Healthy Plant",
    titleSw: "Mmea Mzima",
    summary: "No disease detected. Your crop appears healthy.",
    summarySw: "Hakuna ugonjwa uliogunduliwa. Zao lako linaonekana kuwa zima.",
    symptoms: [],
    symptomsSw: [],
    actions: [
      "Continue regular monitoring of your crops",
      "Maintain good agricultural practices",
    ],
    actionsSw: [
      "Endelea kufuatilia mazao yako mara kwa mara",
      "Dumisha mazoea mazuri ya kilimo",
    ],
    prevention: [
      "Rotate crops regularly to maintain soil health",
      "Use certified seeds and disease-free planting material",
    ],
    preventionSw: [
      "Zungusha mazao mara kwa mara kudumisha afya ya udongo",
      "Tumia mbegu zilizothibitishwa na nyenzo za upandaji zisizo na ugonjwa",
    ],
    severity: "Low",
  },
};

export const DEFAULT_ADVISORY: Advisory = {
  title: "Unknown Disease",
  titleSw: "Ugonjwa Usiojulikana",
  summary:
    "The detected condition could not be identified. Please consult a local agronomist for accurate diagnosis and treatment advice.",
  summarySw:
    "Hali iliyogunduliwa haiwezi kutambuliwa. Tafadhali wasiliana na mtaalamu wa kilimo wa eneo lako kwa utambuzi sahihi na ushauri wa matibabu.",
  symptoms: [
    "Symptoms could not be determined for this condition",
    "Consult a local agronomist for detailed symptom assessment",
  ],
  symptomsSw: [
    "Dalili hazikuweza kuamuliwa kwa hali hii",
    "Wasiliana na mtaalamu wa kilimo wa eneo lako kwa tathmini ya kina ya dalili",
  ],
  actions: [
    "Consult a local agronomist for accurate diagnosis",
    "Take clear photos of affected plants for expert review",
  ],
  actionsSw: [
    "Wasiliana na mtaalamu wa kilimo wa eneo lako kwa utambuzi sahihi",
    "Piga picha wazi za mimea iliyoathirika kwa ukaguzi wa mtaalamu",
  ],
  prevention: [
    "Maintain good agricultural practices and field hygiene",
    "Use certified seeds and disease-free planting material",
  ],
  preventionSw: [
    "Dumisha mazoea mazuri ya kilimo na usafi wa shamba",
    "Tumia mbegu zilizothibitishwa na nyenzo za upandaji zisizo na ugonjwa",
  ],
  severity: "Low",
};

/**
 * Returns the advisory for the given label.
 * When locale is "sw", Swahili fields replace English fields where available.
 * Falls back to DEFAULT_ADVISORY for unrecognised labels — never returns null.
 */
export function getAdvisory(label: string, locale?: string): Advisory {
  const base = Object.hasOwn(advisoryData, label)
    ? advisoryData[label]
    : DEFAULT_ADVISORY;

  if (locale === "sw") {
    return {
      ...base,
      title: base.titleSw ?? base.title,
      summary: base.summarySw ?? base.summary,
      symptoms: base.symptomsSw ?? base.symptoms,
      actions: base.actionsSw ?? base.actions,
      prevention: base.preventionSw ?? base.prevention,
    };
  }

  return base;
}

/**
 * Pre-populates the IndexedDB offline cache with all advisory records.
 * Called once on app init so advisory data is available without network access.
 * Fails silently if IndexedDB is unavailable (e.g. private browsing).
 */
export async function cacheAdvisoryData(): Promise<void> {
  try {
    const { set } = await import("idb-keyval");
    await set("africrop-advisory-cache", advisoryData);
  } catch {
    // IndexedDB unavailable — in-memory advisoryData is always the fallback
  }
}
