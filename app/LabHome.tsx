"use client";

import Image from "next/image";
import { ArrowRight, EnvelopeSimple, List, PlayCircle, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type Locale = "ko" | "en";

const SITE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const sitePath = (path: string) => `${SITE_BASE_PATH}${path}`;

const publications = [
  { year: "2026", citation: "S Bang, D Choi, S Park, S-E Lee, K Min†, S Hong†. In Vivo real-time monitoring of drought stress responses in plants using microneedle field-effect transistor biosensor. Sensors and Actuators B: Chemical. 451: 139412." },
  { year: "2025", citation: "K Min, A Park. Shape-shifting mechanisms: Integrative multi-omics insights into Candida albicans morphogenesis. Mycobiology. 53(2): 250–257." },
  { year: "2024", citation: "KA Swenson, K Min, JB Konopka. Candida albicans pathways that protect against organic peroxides and lipid peroxidation. PLoS Genetics. 20(10): e1011455." },
  { year: "2024", citation: "J Park, H Jeon, A Hwangbo, K Min, J Ko, J-E Kim, S Kim, JY Shin, Y-H Lee, Y-W Lee, H Son. A winged-helix DNA-binding protein is essential for self-fertility during sexual development of the homothallic fungus Fusarium graminearum. mSphere. 25(9): e0051124." },
  { year: "2024", citation: "H Moon*, K Min*, J Winarto, S Shin, H Jeon, DG Song†, H Son†. Proteomic analysis of cell wall proteins with various linkages in Fusarium graminearum. Journal of Agricultural and Food Chemistry. 72(11): 6028–6039." },
  { year: "2024", citation: "H Jeon*, JW Yang*, D Shin, D Min, BJ Kim, K Min†, H Son†. Development of a selective medium for surveillance of Fusarium head blight disease. The Plant Pathology Journal. DOI: 10.5423/PPJ.OA.12.2023.0173." },
  { year: "2023", citation: "S Shin, H Jeon, S Kim, HJ Noh, JW Jo, K Min†, H Son†. Two previously unrecorded fungal species isolated from Muui island in Korea. Mycobiology. 51(6): 410–416." },
  { year: "2023", citation: "LM Douglas, K Min, JB Konopka. Candida albicans resistance to hypochlorous acid. mBio. e02671-23." },
  { year: "2023", citation: "S Kim, R Lee, H Jeon, N Lee, J Park, H Moon, J Shin, K Min, J-E Kim, J-W Yang, H Son. Identification of essential genes for the establishment of spray-induced gene silencing-based disease control in Fusarium graminearum. Journal of Agricultural and Food Chemistry. 71(49): 19302–19311." },
  { year: "2023", citation: "H Jeon, H Son†, K Min†. Detailed protocol to perform direct PCR using filamentous fungal biomass—tips and considerations. Bio-protocol. 13(21): e4889." },
  { year: "2023", citation: "J Park, H-H Lee, H Moon, N Lee, S Kim, J-E Kim, Y Lee, K Min, H Kim, GJ Choi, Y-W Lee, Y-S Seo, H Son. A combined transcriptomic and physiological approach to understanding the adaptive mechanisms to cope with oxidative stress in Fusarium graminearum. Microbiology Spectrum. e01485-23." },
  { year: "2023", citation: "S Choi, J-W Yang, J-E Kim, H Jeon, S Shin, D Wui, LS Kim, BJ Kim, H Son†, K Min†. Infectivity and stress tolerance traits affect community assembly of plant pathogenic fungi. Frontiers in Microbiology. 14:1234724." },
  { year: "2023", citation: "WK Son, YS Choi, YW Han, DU Shin, K Min, J Shin, MJ Lee, H Son, DH Jeong, SY Kwak. In vivo surface-enhanced Raman scattering nanosensor for the real-time plant monitoring of multiple stress-signaling molecules. Nature Nanotechnology. 18:205–216." },
  { year: "2023", citation: "H Jeon, J-E Kim, J-W Yang, H Son†, K Min†. Application of direct PCR for phylogenetic analysis of Fusarium fujikuroi species complex isolated from rice seeds. Frontiers in Plant Science. 13:1093688." },
  { year: "2022", citation: "N Lee, J Park, JE Kim, JY Shin, K Min, H Son. Genome editing using preassembled CRISPR-Cas9 ribonucleoprotein complexes in Fusarium graminearum. PLoS ONE. 17(6): e0268855." },
  { year: "2021", citation: "K Min, TF Jannace, H Si, KR Veeramah, JD Haley, JB Konopka. Integrative multi-omics profiling reveals cAMP-independent mechanisms regulating hyphal morphogenesis in Candida albicans. PLoS Pathogens. 17(8): e1009861." },
  { year: "2021", citation: "LD Bemena, K Min, JB Konopka, AM Neiman. A conserved machinery underlies the synthesis of a chitosan layer in the Candida chlamydospore cell wall. mSphere. 6(2): e00080-21." },
  { year: "2020", citation: "K Min, AM Neiman, JB Konopka. Fungal pathogens: Shape-shifting invaders. Trends in Microbiology. 28(11): 922–933." },
  { year: "2019", citation: "K Min, S Naseem, JB Konopka. N-acetylglucosamine regulates morphogenesis and virulence pathways in fungi. Journal of Fungi. 6(1):8." },
  { year: "2018", citation: "K Min, A Biermann, DA Hogan, JB Konopka. Genetic analysis of NDT80 family transcription factors in Candida albicans using new CRISPR-Cas9 approaches. mSphere. 3(6): e00545-18." },
  { year: "2017", citation: "S Naseem*, K Min*, D Spitzer, J Gardin, JB Konopka. Regulation of hyphal growth and N-acetylglucosamine catabolism by two transcription factors in Candida albicans. Genetics. 206(1): 299–314." },
  { year: "2016", citation: "K Min, Y Ichikawa, CA Woolford, AP Mitchell. Candida albicans gene deletion with a transient CRISPR-Cas9 system. mSphere. 1(3): e00130-16." },
];

const patents = [
  "Y-W Lee, AR Park, K Min, and H Son. 2012. Gibberella zeae with a deletion of FgFlbA gene and method for overproduction of mycotoxin using thereof. Korea. Patent No. 10-2012-0152584.",
  "Y-W Lee, AR Park, K Min, and H Son. 2012. A mutant substituted on GzGpa2 gene and method for production of mycotoxin using thereof. Korea. Patent No. 10-2012-0152585.",
];

const career = [
  ["2025–", "Assistant Professor", "Department of Microbiology, Pukyong National University"],
  ["2024–2025", "Assistant Professor", "Department of Plant Science, Gangneung-Wonju National University"],
  ["2022–2024", "Principal Researcher", "Department of Agricultural Biotechnology, Seoul National University"],
  ["2016–2022", "Research Scientist", "Renaissance School of Medicine, Stony Brook University"],
  ["2016", "Visiting Scientist", "Department of Biological Sciences, Carnegie Mellon University"],
  ["2014–2016", "Postdoctoral Associate", "Department of Plant Pathology and Microbiology, Texas A&M University"],
  ["2008–2014", "Ph.D.", "Agricultural Biotechnology, Seoul National University"],
  ["2005–2008", "B.S.", "Applied Biology, Seoul National University"],
];

const members = [
  { ko: "장성원", en: "Seongwon Jang", image: "/images/seongwon-jang-profile.jpg", width: 308, height: 391 },
  { ko: "김주빈", en: "Jubin Kim", image: "/images/jubin-kim-profile.jpg", width: 298, height: 389 },
];

const labPhotos = [
  { image: "/images/lab-group.jpg", width: 2200, height: 1466 },
  { image: "/images/lab-culture.jpg", width: 1800, height: 1199 },
  { image: "/images/lab-microscope.jpg", width: 1800, height: 1199 },
];

const copy = {
  ko: {
    nav: [
      ["소개", "#about"], ["연구", "#research"], ["구성원", "#members"], ["논문", "#publications"], ["소식", "#news"], ["연락처", "#contact"],
    ],
    language: "EN",
    languageHref: "/en",
    eyebrow: "부경대학교 미생물학과",
    heroTitle: <>진균을 이해하고,<br />지속가능성을 설계합니다.</>,
    heroIntro: "병원성 진균의 병원성 기작을 규명하고 지속가능한 농업을 위한 혁신 생명공학 기술을 개발합니다.",
    heroPrimary: "연구 분야 보기",
    heroSecondary: "Min Lab 소개",
    heroCaption: "관찰에서 기작으로, 기작에서 해법으로",
    methods: ["통합 멀티오믹스", "유전체 편집", "나노기술", "진화 분석 · AI"],
    aboutLabel: "Welcome to the Min Lab",
    aboutTitle: <>미세한 진균에서<br />커다란 질문을 찾습니다.</>,
    aboutParagraphs: [
      "진균은 생태계의 중요한 분해자이지만, 일부 병원성 진균은 사람에게 치명적인 감염을 일으키고 작물에 막대한 피해를 줍니다. 항진균제 내성의 출현은 치료와 방제를 더욱 어렵게 만들고 있습니다.",
      "Min Lab은 멀티오믹스, 유전체 편집, 나노기술, 진화 분석을 아우르는 융합 연구를 통해 진균 병원성의 분자 기작을 밝히고, 농약 사용을 줄이며 생태계를 보호할 수 있는 지속가능한 생명공학 기술을 개발합니다.",
    ],
    researchKicker: "Research",
    researchTitle: "세 개의 질문, 하나의 방향",
    researchSubtitle: "진균의 병원성과 진화를 이해하고, 그 지식을 사람과 작물을 위한 기술로 연결합니다.",
    researchItems: [
      { title: "병원성과 약제 내성 기작", body: "통합 멀티오믹스 접근으로 병원성 진균의 독성과 약제 내성을 촉진하는 새로운 기작을 탐구합니다. 특히 단백질 번역 조절이 병원성과 내성 관련 유전자 발현을 어떻게 제어하는지 밝힙니다.", image: "/images/research-riboseq-v5.png", width: 1380, height: 1216, alt: "효모-균사 전환, uORF·대체 번역체 조절, RNA-seq과 Ribo-seq 변화량을 함께 보여주는 연구 결과 그림" },
      { title: "식물 실시간 모니터링 나노센서", body: "식물이 가뭄, 상처, 질병에 대응하며 방출하는 신호 물질을 실시간으로 감지하는 나노센서를 개발합니다. 스트레스를 조기에 발견해 작물 피해를 줄이고 자원을 효율적으로 사용하는 농업을 지향합니다.", image: "/images/research-nanosensor-v4.webp", width: 1369, height: 1149, alt: "토마토 식물 조직에 삽입한 마이크로니들 MXene-FET 센서로 ABA에 따른 전도도 변화를 실시간 측정하는 상세 모식도" },
      { title: "AI로 탐구하는 버섯 진화", body: "계통유전체 정보, 형태 이미지, 생태 데이터를 인공지능과 결합해 버섯의 독성, 색, 형태와 같은 핵심 형질이 어떻게 등장하고 다양해졌는지 탐구합니다.", image: "/images/research-mushroom-ai-v4.webp", width: 1782, height: 883, alt: "1만 장 이상의 버섯 이미지를 합성곱 신경망으로 분석해 위장색, 경고색, 흰색 형질을 분류하는 상세 모식도" },
    ],
    piKicker: "Principal Investigator",
    piTitle: "Kyunghun Min",
    piRole: "부경대학교 미생물학과 조교수",
    careerHeading: "경력 및 교육",
    scholar: "Google Scholar",
    membersKicker: "Inside the Lab",
    membersTitle: "함께 연구하고, 함께 성장합니다.",
    labPhotoAlts: [
      "Min Lab 구성원들이 실험실에서 함께 촬영한 단체사진",
      "배양 접시를 살펴보며 토론하는 Min Lab 연구진",
      "현미경 관찰 결과를 함께 확인하는 Min Lab 연구진",
    ],
    labPhotoCaptions: ["Min Lab, 2026", "Min Lab, 2026", "Min Lab, 2026"],
    studentsKicker: "Graduate Students",
    studentsTitle: "대학원생",
    memberEducation: [
      "2026 · 부경대학교 미생물학과 졸업 예정",
      "2026 · 부경대학교 미생물학과 석사과정 입학 예정",
    ],
    pubKicker: "Publications",
    pubTitle: "최근 10년 연구 논문",
    pubNote: "* 공동 제1저자 · † 공동 교신저자",
    more: "나머지 논문 16편 보기",
    less: "논문 접기",
    patentTitle: "특허",
    newsKicker: "News & Events",
    newsTitle: <>새로운 질문을 함께<br />풀어갈 학생을 찾습니다.</>,
    newsBody: "병원성 진균과 혁신 생명공학에 관심 있는 학생의 연락을 기다립니다.",
    newsLink: "연구실 소개 영상 보기",
    contactKicker: "Contact",
    contactTitle: <>함께 질문하고,<br />함께 발견합니다.</>,
    contactBody: "연구 협력, 학생 지원, Min Lab에 관한 문의는 이메일로 연락해 주세요.",
    labAddressTitle: "Min Lab · 시스템생물학 연구실",
    labAddress: "우)48513 부산광역시 남구 용소로 45 부경대학교 대연캠퍼스 자연과학2관(C24) 7417호",
    piAddressTitle: "Kyunghun Min, Ph.D. · 민경훈",
    piAddress: "우)48513 부산광역시 남구 용소로 45 부경대학교 대연캠퍼스 자연과학2관(C24) 7404호",
    footer: "부경대학교 미생물학과 · Min Lab",
  },
  en: {
    nav: [
      ["About", "#about"], ["Research", "#research"], ["Members", "#members"], ["Publications", "#publications"], ["News", "#news"], ["Contact", "#contact"],
    ],
    language: "한국어",
    languageHref: "/",
    eyebrow: "Department of Microbiology · Pukyong National University",
    heroTitle: <><span className="title-line">Decoding fungal virulence.</span><span className="title-line">Designing sustainable futures.</span></>,
    heroIntro: "We study the virulence mechanisms of pathogenic fungi and develop innovative biotechnologies for sustainable agriculture.",
    heroPrimary: "Explore our research",
    heroSecondary: "Welcome to the lab",
    heroCaption: "From observation to mechanism, from mechanism to action",
    methods: ["Integrative multi-omics", "Genome editing", "Nanotechnology", "Evolution · AI"],
    aboutLabel: "Welcome to the Min Lab",
    aboutTitle: "Big questions, found in the microscopic world.",
    aboutParagraphs: [
      "Fungi are crucial decomposers across the planet, yet some pathogenic fungi cause fatal infections in humans and devastating losses in crops. The emergence of antifungal resistance makes treatment and control increasingly difficult.",
      "Through an interdisciplinary approach spanning multi-omics, genome editing, nanotechnology, and evolutionary analysis, the Min Lab investigates the molecular basis of fungal virulence and develops biotechnology that reduces agrochemical use, protects ecosystems, and supports sustainable growth.",
    ],
    researchKicker: "Research",
    researchTitle: "Three questions. One direction.",
    researchSubtitle: "We connect fundamental discoveries in fungal virulence and evolution to technologies that protect people, plants, and ecosystems.",
    researchItems: [
      { title: "Mechanisms of virulence and drug resistance", body: "We employ integrative multi-omics approaches to investigate novel mechanisms that promote virulence and drug resistance in pathogenic fungi. Our work reveals how the regulation of protein translation controls gene expression involved in virulence and resistance.", image: "/images/research-riboseq-v5.png", width: 1380, height: 1216, alt: "Ribo-seq study figure connecting yeast-to-hypha morphogenesis, uORF and alternative isoform regulation, and RNA-seq versus Ribo-seq fold changes" },
      { title: <>Nanosensors for real-time<br />monitoring in plants</>, body: "Plants release signaling molecules to manage drought, wounds, and disease. We develop nanosensors that detect these stress-related molecules in real time, creating opportunities to mitigate stress and prevent disease while using resources more efficiently.", image: "/images/research-nanosensor-v4.webp", width: 1369, height: 1149, alt: "Detailed microneedle MXene-FET biosensor diagram showing insertion into tomato tissue and real-time ABA-dependent conductance changes" },
      { title: "Exploring mushroom evolution with AI", body: "By integrating phylogenomic data, morphological images, and ecological information, we develop AI-based models to understand how toxicity, coloration, morphology, and other traits emerged and diversified across fungal lineages.", image: "/images/research-mushroom-ai-v4.webp", width: 1782, height: 883, alt: "Detailed convolutional neural network diagram classifying more than 10,000 mushroom images by camouflage, conspicuous coloration, and white coloration" },
    ],
    piKicker: "Principal Investigator",
    piTitle: "Kyunghun Min",
    piRole: "Assistant Professor · Department of Microbiology · Pukyong National University",
    careerHeading: "Appointments & education",
    scholar: "Google Scholar",
    membersKicker: "Inside the Lab",
    membersTitle: "Working and growing together.",
    labPhotoAlts: [
      "Members of the Min Lab together in the laboratory",
      "Min Lab researchers discussing fungal cultures",
      "Min Lab researchers reviewing a microscopy experiment",
    ],
    labPhotoCaptions: ["Min Lab, 2026", "Min Lab, 2026", "Min Lab, 2026"],
    studentsKicker: "Lab Members",
    studentsTitle: "Graduate Students",
    memberEducation: [
      "Expected B.S. · Department of Microbiology, Pukyong National University · 2026",
      "Incoming M.S. student · Department of Microbiology, Pukyong National University · 2026",
    ],
    pubKicker: "Publications",
    pubTitle: "Research papers · last 10 years",
    pubNote: "* Co-first authors · † Co-corresponding authors",
    more: "View 16 more papers",
    less: "Show fewer papers",
    patentTitle: "Patents",
    newsKicker: "News & Events",
    newsTitle: "We are looking for curious students.",
    newsBody: "We welcome students interested in pathogenic fungi and innovative biotechnology.",
    newsLink: "Watch our lab introduction",
    contactKicker: "Contact",
    contactTitle: <>Let’s ask better questions<br />together.</>,
    contactBody: "For research collaborations, student opportunities, and inquiries about the Min Lab, please get in touch by email.",
    labAddressTitle: "Min Lab · Systems Biology Laboratory",
    labAddress: "Room 7417, Building C24, 45 Yongso-ro, Nam-Gu, Busan 48513, South Korea",
    piAddressTitle: "Kyunghun Min, Ph.D.",
    piAddress: "Room 7404, Building C24, 45 Yongso-ro, Nam-Gu, Busan 48513, South Korea",
    footer: "Department of Microbiology · Pukyong National University",
  },
} as const;

function ArrowLink({ href, children, className = "", external = false }: { href: string; children: React.ReactNode; className?: string; external?: boolean }) {
  return (
    <a className={`arrow-link ${className}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <span>{children}</span><ArrowRight aria-hidden="true" size={18} />
    </a>
  );
}

export default function LabHome({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className={`locale-${locale}`}>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Min Lab home">MIN LAB</a>
        <nav className="desktop-nav" aria-label={locale === "ko" ? "주요 메뉴" : "Primary navigation"}>
          {t.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a className="language-link" href={sitePath(t.languageHref)}>{t.language}</a>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {t.nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight aria-hidden="true" size={18} /></a>)}
          <a href={sitePath(t.languageHref)}>{t.language}<ArrowRight aria-hidden="true" size={18} /></a>
        </nav>
      )}

      <section className="hero page-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-intro">{t.heroIntro}</p>
          <div className="hero-actions">
            <ArrowLink className="primary-action" href="#research">{t.heroPrimary}</ArrowLink>
            <ArrowLink href="#about">{t.heroSecondary}</ArrowLink>
          </div>
        </div>
        <figure className="hero-visual">
          <Image src={sitePath("/images/hero-evidence.png")} alt="Abstract cobalt-blue data points revealing an underlying pattern" width={760} height={700} priority />
          <figcaption>{t.heroCaption}</figcaption>
        </figure>
      </section>

      <div className="method-strip page-section" aria-label="Research methods">
        {t.methods.map((method, index) => <p key={method}><span>0{index + 1}</span>{method}</p>)}
      </div>

      <section className="about-section page-section" id="about">
        <div className="about-image-wrap">
          <Image src={sitePath("/images/min-lab-welcome.png")} alt="A small researcher reading beside mushrooms and scientific monitors" width={1136} height={768} />
        </div>
        <div className="about-copy">
          <p className="eyebrow blue">{t.aboutLabel}</p>
          <h2>{t.aboutTitle}</h2>
          {t.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="content-section page-section" id="research">
        <div className="section-heading research-heading">
          <span className="section-number">01</span>
          <div><p className="eyebrow blue">{t.researchKicker}</p><h2>{t.researchTitle}</h2></div>
          <p>{t.researchSubtitle}</p>
        </div>
        <div className="research-list">
          {t.researchItems.map((item, index) => (
            <article className="research-card" key={item.image}>
              <div className={`research-card-image${item.image.includes("riboseq") ? " research-card-image--riboseq" : ""}`}>
                <Image src={sitePath(item.image)} alt={item.alt} width={item.width} height={item.height} />
              </div>
              <div className="research-card-copy"><span className="research-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="pi-section page-section" id="members">
        <figure className="pi-portrait">
          <Image src={sitePath("/images/kyunghun-min.png")} alt="Kyunghun Min, principal investigator of the Min Lab" width={1365} height={2048} />
        </figure>
        <div className="pi-intro">
          <p className="eyebrow blue">{t.piKicker}</p>
          <h2>{t.piTitle}</h2>
          <p className="pi-role">{t.piRole}</p>
          <div className="pi-links">
            <ArrowLink href="mailto:k.min@pknu.ac.kr">k.min@pknu.ac.kr</ArrowLink>
            <ArrowLink href="https://scholar.google.com/citations?hl=en&user=APGMOYkAAAAJ&view_op=list_works&sortby=pubdate" external>{t.scholar}</ArrowLink>
          </div>
        </div>
        <div className="career-block">
          <p className="eyebrow">{t.careerHeading}</p>
          {career.map(([year, role, place]) => <div className="career-row" key={`${year}-${role}`}><time>{year}</time><strong>{role}</strong><span>{place}</span></div>)}
        </div>
      </section>

      <section className="members-section page-section" aria-labelledby="members-section-title">
        <div className="members-heading">
          <p className="eyebrow blue">{t.membersKicker}</p>
          <h2 id="members-section-title">{t.membersTitle}</h2>
        </div>
        <div className="lab-gallery">
          {labPhotos.map((photo, index) => (
            <figure className={index === 0 ? "lab-gallery-primary" : "lab-gallery-secondary"} key={photo.image}>
              <Image src={sitePath(photo.image)} alt={t.labPhotoAlts[index]} width={photo.width} height={photo.height} />
              <figcaption>{t.labPhotoCaptions[index]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="students-heading">
          <p className="eyebrow blue">{t.studentsKicker}</p>
          <h2 id="graduate-students-title">{t.studentsTitle}</h2>
        </div>
        <div className="member-list">
          {members.map((member, index) => (
            <article className="member-card" key={member.en}>
              <span className="member-number">0{index + 1}</span>
              <div className="member-portrait">
                <img src={sitePath(member.image)} alt={`${locale === "ko" ? member.ko : member.en} ${locale === "ko" ? "학생" : "portrait"}`} width={member.width} height={member.height} loading="lazy" />
              </div>
              <div className="member-name">
                <h3>{locale === "ko" ? member.ko : member.en}</h3>
                <p>{locale === "ko" ? member.en : member.ko}</p>
              </div>
              <div className="member-education">
                {t.memberEducation.map((item) => <p key={item}>{item}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section page-section" id="publications">
        <div className="section-heading publication-heading">
          <span className="section-number">02</span>
          <div><p className="eyebrow blue">{t.pubKicker}</p><h2>{t.pubTitle}</h2></div>
          <p>{t.pubNote}</p>
        </div>
        <ol className="publication-list">
          {(showAll ? publications : publications.slice(0, 6)).map((publication) => (
            <li className="publication-row" key={publication.citation}>
              <time>{publication.year}</time><p>{publication.citation}</p>
            </li>
          ))}
        </ol>
        <button className="publication-toggle" type="button" onClick={() => setShowAll((visible) => !visible)} aria-expanded={showAll}>
          {showAll ? t.less : t.more}<ArrowRight aria-hidden="true" size={18} />
        </button>
        <div className="patents-block">
          <h3>{t.patentTitle}</h3>
          <ol>{patents.map((patent) => <li key={patent}>{patent}</li>)}</ol>
        </div>
      </section>

      <section className="news-section page-section" id="news">
        <div>
          <p className="eyebrow blue">{t.newsKicker}</p>
          <h2>{t.newsTitle}</h2>
        </div>
        <div className="news-copy">
          <p>{t.newsBody}</p>
          <a className="video-link" href="https://youtu.be/-KcD2v7EaWQ" target="_blank" rel="noreferrer">
            <PlayCircle aria-hidden="true" size={32} weight="regular" />{t.newsLink}<ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <section className="contact-section page-section" id="contact">
        <div>
          <p className="eyebrow blue">{t.contactKicker}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <a className="contact-email" href="mailto:k.min@pknu.ac.kr"><EnvelopeSimple aria-hidden="true" size={24} />k.min@pknu.ac.kr</a>
        </div>
        <div className="address-list">
          <address><strong>{t.labAddressTitle}</strong>{t.labAddress}</address>
          <address><strong>{t.piAddressTitle}</strong>{t.piAddress}<br />+82-51-629-5616</address>
        </div>
      </section>

      <footer className="site-footer page-section">
        <p>© 2026 MIN LAB</p><p>{t.footer}</p><a href={sitePath(t.languageHref)}>{t.language}</a>
      </footer>
    </main>
  );
}
