// Internationalization system for resume generator
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'US' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'NL' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'DE' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'ES' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'IT' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', region: 'PT' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'RU' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', region: 'CN' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'JP' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'KR' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'SA' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'IN' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'PL' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', region: 'SE' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', region: 'NO' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', region: 'DK' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', region: 'FI' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'TR' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', region: 'CZ' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', region: 'HU' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', region: 'RO' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', region: 'BG' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', region: 'HR' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', region: 'SK' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', region: 'SI' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', region: 'EE' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', region: 'LV' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', region: 'LT' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', region: 'UA' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', region: 'IL' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', region: 'TH' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'VN' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', region: 'ID' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', region: 'MY' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', region: 'PH' }
];

export interface Translations {
  // Header and navigation
  appTitle: string;
  appSubtitle: string;
  
  // Document types
  resume: string;
  coverLetter: string;
  
  // Form steps
  basicInfo: string;
  workExperience: string;
  education: string;
  skills: string;
  review: string;
  
  // Basic info form
  personalInformation: string;
  fullName: string;
  jobTitle: string;
  age: string;
  country: string;
  yearsOfExperience: string;
  email: string;
  phone: string;
  location: string;
  
  // Work experience form
  jobTitleLabel: string;
  companyName: string;
  startDate: string;
  endDate: string;
  endDateOptional: string;
  keyResponsibilities: string;
  achievements: string;
  achievementsOptional: string;
  addAnotherExperience: string;
  
  // Education form
  degree: string;
  institution: string;
  description: string;
  descriptionOptional: string;
  addAnotherEducation: string;
  
  // Skills form
  skillsAndCompetencies: string;
  technicalSkills: string;
  softSkills: string;
  languageSkills: string;
  motivation: string;
  whyApplying: string;
  whatAttracts: string;
  uniqueQualities: string;
  careerGoals: string;
  
  // Review form
  reviewAndGenerate: string;
  documentSettings: string;
  generateDocument: string;
  generating: string;
  
  // Navigation
  previous: string;
  next: string;
  
  // General
  step: string;
  of: string;
  livePreview: string;
  changeTemplate: string;
  downloadDocument: string;
  present: string;
  
  // Document preview
  professionalSummary: string;
  
  // Countries
  countries: {
    [key: string]: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    appTitle: "ResumeBuilder Pro",
    appSubtitle: "Professional Documents Made Easy",
    
    resume: "Resume/CV",
    coverLetter: "Cover Letter",
    
    basicInfo: "Basic Info",
    workExperience: "Experience",
    education: "Education",
    skills: "Skills",
    review: "Review",
    
    personalInformation: "Personal Information",
    fullName: "Full Name",
    jobTitle: "Job Title",
    age: "Age",
    country: "Country",
    yearsOfExperience: "Years of Experience",
    email: "Email",
    phone: "Phone",
    location: "Location",
    
    jobTitleLabel: "Job Title",
    companyName: "Company Name",
    startDate: "Start Date",
    endDate: "End Date",
    endDateOptional: "End Date (Optional)",
    keyResponsibilities: "Key Responsibilities",
    achievements: "Achievements",
    achievementsOptional: "Achievements (Optional)",
    addAnotherExperience: "Add Another Experience",
    
    degree: "Degree",
    institution: "Institution",
    description: "Description",
    descriptionOptional: "Description (Optional)",
    addAnotherEducation: "Add Another Education",
    
    skillsAndCompetencies: "Skills & Competencies",
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
    languageSkills: "Language Skills",
    motivation: "Motivation (Cover Letter)",
    whyApplying: "Why are you applying for this position?",
    whatAttracts: "What attracts you to this organization?",
    uniqueQualities: "What unique qualities do you bring?",
    careerGoals: "What are your career goals?",
    
    reviewAndGenerate: "Review & Generate",
    documentSettings: "Document Settings",
    generateDocument: "Generate Document",
    generating: "Generating...",
    
    previous: "Previous",
    next: "Next",
    
    step: "Step",
    of: "of",
    livePreview: "Live Preview",
    changeTemplate: "Change Template",
    downloadDocument: "Download Document",
    present: "Present",
    
    professionalSummary: "Professional Summary",
    
    countries: {
      netherlands: "Netherlands",
      belgium: "Belgium",
      germany: "Germany",
      france: "France",
      uk: "United Kingdom",
      spain: "Spain",
      italy: "Italy",
      portugal: "Portugal",
      poland: "Poland",
      sweden: "Sweden",
      norway: "Norway",
      denmark: "Denmark",
      finland: "Finland",
      other: "Other"
    }
  },
  
  nl: {
    appTitle: "CV Builder Pro",
    appSubtitle: "Professionele Documenten Gemakkelijk Gemaakt",
    
    resume: "CV",
    coverLetter: "Motivatiebrief",
    
    basicInfo: "Basisinfo",
    workExperience: "Ervaring",
    education: "Opleiding",
    skills: "Vaardigheden",
    review: "Controleren",
    
    personalInformation: "Persoonlijke Informatie",
    fullName: "Volledige Naam",
    jobTitle: "Functietitel",
    age: "Leeftijd",
    country: "Land",
    yearsOfExperience: "Jaren Ervaring",
    email: "E-mail",
    phone: "Telefoon",
    location: "Locatie",
    
    jobTitleLabel: "Functietitel",
    companyName: "Bedrijfsnaam",
    startDate: "Startdatum",
    endDate: "Einddatum",
    endDateOptional: "Einddatum (Optioneel)",
    keyResponsibilities: "Hoofdverantwoordelijkheden",
    achievements: "Prestaties",
    achievementsOptional: "Prestaties (Optioneel)",
    addAnotherExperience: "Nog Een Ervaring Toevoegen",
    
    degree: "Diploma",
    institution: "Instelling",
    description: "Beschrijving",
    descriptionOptional: "Beschrijving (Optioneel)",
    addAnotherEducation: "Nog Een Opleiding Toevoegen",
    
    skillsAndCompetencies: "Vaardigheden & Competenties",
    technicalSkills: "Technische Vaardigheden",
    softSkills: "Zachte Vaardigheden",
    languageSkills: "Taalvaardigheden",
    motivation: "Motivatie (Motivatiebrief)",
    whyApplying: "Waarom solliciteer je voor deze functie?",
    whatAttracts: "Wat trekt je aan in deze organisatie?",
    uniqueQualities: "Welke unieke kwaliteiten breng je mee?",
    careerGoals: "Wat zijn je carrièredoelen?",
    
    reviewAndGenerate: "Controleren & Genereren",
    documentSettings: "Document Instellingen",
    generateDocument: "Document Genereren",
    generating: "Genereren...",
    
    previous: "Vorige",
    next: "Volgende",
    
    step: "Stap",
    of: "van",
    livePreview: "Live Voorbeeld",
    changeTemplate: "Template Wijzigen",
    downloadDocument: "Document Downloaden",
    present: "Huidig",
    
    professionalSummary: "Professionele Samenvatting",
    
    countries: {
      netherlands: "Nederland",
      belgium: "België",
      germany: "Duitsland",
      france: "Frankrijk",
      uk: "Verenigd Koninkrijk",
      spain: "Spanje",
      italy: "Italië",
      portugal: "Portugal",
      poland: "Polen",
      sweden: "Zweden",
      norway: "Noorwegen",
      denmark: "Denemarken",
      finland: "Finland",
      other: "Andere"
    }
  },
  
  fr: {
    appTitle: "CV Builder Pro",
    appSubtitle: "Documents Professionnels Facilités",
    
    resume: "CV",
    coverLetter: "Lettre de Motivation",
    
    basicInfo: "Info de Base",
    workExperience: "Expérience",
    education: "Formation",
    skills: "Compétences",
    review: "Révision",
    
    personalInformation: "Informations Personnelles",
    fullName: "Nom Complet",
    jobTitle: "Titre du Poste",
    age: "Âge",
    country: "Pays",
    yearsOfExperience: "Années d'Expérience",
    email: "E-mail",
    phone: "Téléphone",
    location: "Lieu",
    
    jobTitleLabel: "Titre du Poste",
    companyName: "Nom de l'Entreprise",
    startDate: "Date de Début",
    endDate: "Date de Fin",
    endDateOptional: "Date de Fin (Optionnel)",
    keyResponsibilities: "Responsabilités Clés",
    achievements: "Réalisations",
    achievementsOptional: "Réalisations (Optionnel)",
    addAnotherExperience: "Ajouter une Autre Expérience",
    
    degree: "Diplôme",
    institution: "Institution",
    description: "Description",
    descriptionOptional: "Description (Optionnel)",
    addAnotherEducation: "Ajouter une Autre Formation",
    
    skillsAndCompetencies: "Compétences & Aptitudes",
    technicalSkills: "Compétences Techniques",
    softSkills: "Compétences Relationnelles",
    languageSkills: "Compétences Linguistiques",
    motivation: "Motivation (Lettre de Motivation)",
    whyApplying: "Pourquoi postulez-vous pour ce poste?",
    whatAttracts: "Qu'est-ce qui vous attire dans cette organisation?",
    uniqueQualities: "Quelles qualités uniques apportez-vous?",
    careerGoals: "Quels sont vos objectifs de carrière?",
    
    reviewAndGenerate: "Réviser & Générer",
    documentSettings: "Paramètres du Document",
    generateDocument: "Générer le Document",
    generating: "Génération...",
    
    previous: "Précédent",
    next: "Suivant",
    
    step: "Étape",
    of: "sur",
    livePreview: "Aperçu en Direct",
    changeTemplate: "Changer le Modèle",
    downloadDocument: "Télécharger le Document",
    present: "Présent",
    
    professionalSummary: "Résumé Professionnel",
    
    countries: {
      netherlands: "Pays-Bas",
      belgium: "Belgique",
      germany: "Allemagne",
      france: "France",
      uk: "Royaume-Uni",
      spain: "Espagne",
      italy: "Italie",
      portugal: "Portugal",
      poland: "Pologne",
      sweden: "Suède",
      norway: "Norvège",
      denmark: "Danemark",
      finland: "Finlande",
      other: "Autre"
    }
  },
  
  de: {
    appTitle: "Lebenslauf Builder Pro",
    appSubtitle: "Professionelle Dokumente Leicht Gemacht",
    
    resume: "Lebenslauf",
    coverLetter: "Anschreiben",
    
    basicInfo: "Grundinfo",
    workExperience: "Erfahrung",
    education: "Bildung",
    skills: "Fähigkeiten",
    review: "Überprüfung",
    
    personalInformation: "Persönliche Informationen",
    fullName: "Vollständiger Name",
    jobTitle: "Stellenbezeichnung",
    age: "Alter",
    country: "Land",
    yearsOfExperience: "Jahre Erfahrung",
    email: "E-Mail",
    phone: "Telefon",
    location: "Standort",
    
    jobTitleLabel: "Stellenbezeichnung",
    companyName: "Firmenname",
    startDate: "Startdatum",
    endDate: "Enddatum",
    endDateOptional: "Enddatum (Optional)",
    keyResponsibilities: "Hauptverantwortlichkeiten",
    achievements: "Errungenschaften",
    achievementsOptional: "Errungenschaften (Optional)",
    addAnotherExperience: "Weitere Erfahrung Hinzufügen",
    
    degree: "Abschluss",
    institution: "Institution",
    description: "Beschreibung",
    descriptionOptional: "Beschreibung (Optional)",
    addAnotherEducation: "Weitere Bildung Hinzufügen",
    
    skillsAndCompetencies: "Fähigkeiten & Kompetenzen",
    technicalSkills: "Technische Fähigkeiten",
    softSkills: "Soziale Kompetenzen",
    languageSkills: "Sprachkenntnisse",
    motivation: "Motivation (Anschreiben)",
    whyApplying: "Warum bewerben Sie sich für diese Position?",
    whatAttracts: "Was zieht Sie zu dieser Organisation?",
    uniqueQualities: "Welche einzigartigen Qualitäten bringen Sie mit?",
    careerGoals: "Was sind Ihre Karriereziele?",
    
    reviewAndGenerate: "Überprüfen & Generieren",
    documentSettings: "Dokument Einstellungen",
    generateDocument: "Dokument Generieren",
    generating: "Generieren...",
    
    previous: "Zurück",
    next: "Weiter",
    
    step: "Schritt",
    of: "von",
    livePreview: "Live-Vorschau",
    changeTemplate: "Vorlage Ändern",
    downloadDocument: "Dokument Herunterladen",
    present: "Gegenwart",
    
    professionalSummary: "Professionelle Zusammenfassung",
    
    countries: {
      netherlands: "Niederlande",
      belgium: "Belgien",
      germany: "Deutschland",
      france: "Frankreich",
      uk: "Vereinigtes Königreich",
      spain: "Spanien",
      italy: "Italien",
      portugal: "Portugal",
      poland: "Polen",
      sweden: "Schweden",
      norway: "Norwegen",
      denmark: "Dänemark",
      finland: "Finnland",
      other: "Andere"
    }
  },
  
  pt: {
    appTitle: "Construtor de CV Pro",
    appSubtitle: "Documentos Profissionais Facilitados",
    
    resume: "CV",
    coverLetter: "Carta de Apresentação",
    
    basicInfo: "Info Básica",
    workExperience: "Experiência",
    education: "Educação",
    skills: "Competências",
    review: "Revisão",
    
    personalInformation: "Informações Pessoais",
    fullName: "Nome Completo",
    jobTitle: "Título do Cargo",
    age: "Idade",
    country: "País",
    yearsOfExperience: "Anos de Experiência",
    email: "E-mail",
    phone: "Telefone",
    location: "Localização",
    
    jobTitleLabel: "Título do Cargo",
    companyName: "Nome da Empresa",
    startDate: "Data de Início",
    endDate: "Data de Fim",
    endDateOptional: "Data de Fim (Opcional)",
    keyResponsibilities: "Responsabilidades Principais",
    achievements: "Conquistas",
    achievementsOptional: "Conquistas (Opcional)",
    addAnotherExperience: "Adicionar Outra Experiência",
    
    degree: "Diploma",
    institution: "Instituição",
    description: "Descrição",
    descriptionOptional: "Descrição (Opcional)",
    addAnotherEducation: "Adicionar Outra Educação",
    
    skillsAndCompetencies: "Competências e Habilidades",
    technicalSkills: "Competências Técnicas",
    softSkills: "Competências Interpessoais",
    languageSkills: "Competências Linguísticas",
    motivation: "Motivação (Carta de Apresentação)",
    whyApplying: "Por que está se candidatando a esta posição?",
    whatAttracts: "O que o atrai nesta organização?",
    uniqueQualities: "Que qualidades únicas você traz?",
    careerGoals: "Quais são seus objetivos de carreira?",
    
    reviewAndGenerate: "Revisar e Gerar",
    documentSettings: "Configurações do Documento",
    generateDocument: "Gerar Documento",
    generating: "Gerando...",
    
    previous: "Anterior",
    next: "Próximo",
    
    step: "Passo",
    of: "de",
    livePreview: "Visualização ao Vivo",
    changeTemplate: "Alterar Modelo",
    downloadDocument: "Baixar Documento",
    present: "Presente",
    
    professionalSummary: "Resumo Profissional",
    
    countries: {
      netherlands: "Países Baixos",
      belgium: "Bélgica",
      germany: "Alemanha",
      france: "França",
      uk: "Reino Unido",
      spain: "Espanha",
      italy: "Itália",
      portugal: "Portugal",
      poland: "Polônia",
      sweden: "Suécia",
      norway: "Noruega",
      denmark: "Dinamarca",
      finland: "Finlândia",
      other: "Outro"
    }
  },
  
  zh: {
    appTitle: "简历生成器专业版",
    appSubtitle: "轻松制作专业文档",
    
    resume: "简历",
    coverLetter: "求职信",
    
    basicInfo: "基本信息",
    workExperience: "工作经验",
    education: "教育背景",
    skills: "技能",
    review: "审查",
    
    personalInformation: "个人信息",
    fullName: "姓名",
    jobTitle: "职位",
    age: "年龄",
    country: "国家",
    yearsOfExperience: "工作年限",
    email: "邮箱",
    phone: "电话",
    location: "地址",
    
    jobTitleLabel: "职位",
    companyName: "公司名称",
    startDate: "开始日期",
    endDate: "结束日期",
    endDateOptional: "结束日期（可选）",
    keyResponsibilities: "主要职责",
    achievements: "成就",
    achievementsOptional: "成就（可选）",
    addAnotherExperience: "添加其他经验",
    
    degree: "学位",
    institution: "院校",
    description: "描述",
    descriptionOptional: "描述（可选）",
    addAnotherEducation: "添加其他教育",
    
    skillsAndCompetencies: "技能与能力",
    technicalSkills: "技术技能",
    softSkills: "软技能",
    languageSkills: "语言技能",
    motivation: "动机（求职信）",
    whyApplying: "为什么申请这个职位？",
    whatAttracts: "这个组织吸引您的是什么？",
    uniqueQualities: "您带来了什么独特的品质？",
    careerGoals: "您的职业目标是什么？",
    
    reviewAndGenerate: "审查与生成",
    documentSettings: "文档设置",
    generateDocument: "生成文档",
    generating: "生成中...",
    
    previous: "上一步",
    next: "下一步",
    
    step: "步骤",
    of: "的",
    livePreview: "实时预览",
    changeTemplate: "更改模板",
    downloadDocument: "下载文档",
    present: "至今",
    
    professionalSummary: "专业总结",
    
    countries: {
      netherlands: "荷兰",
      belgium: "比利时",
      germany: "德国",
      france: "法国",
      uk: "英国",
      spain: "西班牙",
      italy: "意大利",
      portugal: "葡萄牙",
      poland: "波兰",
      sweden: "瑞典",
      norway: "挪威",
      denmark: "丹麦",
      finland: "芬兰",
      other: "其他"
    }
  },
  
  es: {
    appTitle: "Constructor de CV Pro",
    appSubtitle: "Documentos Profesionales Hechos Fáciles",
    
    resume: "CV",
    coverLetter: "Carta de Presentación",
    
    basicInfo: "Info Básica",
    workExperience: "Experiencia",
    education: "Educación",
    skills: "Habilidades",
    review: "Revisión",
    
    personalInformation: "Información Personal",
    fullName: "Nombre Completo",
    jobTitle: "Título del Trabajo",
    age: "Edad",
    country: "País",
    yearsOfExperience: "Años de Experiencia",
    email: "Correo Electrónico",
    phone: "Teléfono",
    location: "Ubicación",
    
    jobTitleLabel: "Título del Trabajo",
    companyName: "Nombre de la Empresa",
    startDate: "Fecha de Inicio",
    endDate: "Fecha de Fin",
    endDateOptional: "Fecha de Fin (Opcional)",
    keyResponsibilities: "Responsabilidades Clave",
    achievements: "Logros",
    achievementsOptional: "Logros (Opcional)",
    addAnotherExperience: "Agregar Otra Experiencia",
    
    degree: "Título",
    institution: "Institución",
    description: "Descripción",
    descriptionOptional: "Descripción (Opcional)",
    addAnotherEducation: "Agregar Otra Educación",
    
    skillsAndCompetencies: "Habilidades y Competencias",
    technicalSkills: "Habilidades Técnicas",
    softSkills: "Habilidades Blandas",
    languageSkills: "Habilidades Lingüísticas",
    motivation: "Motivación (Carta de Presentación)",
    whyApplying: "¿Por qué solicitas este puesto?",
    whatAttracts: "¿Qué te atrae de esta organización?",
    uniqueQualities: "¿Qué cualidades únicas aportas?",
    careerGoals: "¿Cuáles son tus objetivos profesionales?",
    
    reviewAndGenerate: "Revisar y Generar",
    documentSettings: "Configuración del Documento",
    generateDocument: "Generar Documento",
    generating: "Generando...",
    
    previous: "Anterior",
    next: "Siguiente",
    
    step: "Paso",
    of: "de",
    livePreview: "Vista Previa en Vivo",
    changeTemplate: "Cambiar Plantilla",
    downloadDocument: "Descargar Documento",
    present: "Presente",
    
    professionalSummary: "Resumen Profesional",
    
    countries: {
      netherlands: "Países Bajos",
      belgium: "Bélgica",
      germany: "Alemania",
      france: "Francia",
      uk: "Reino Unido",
      spain: "España",
      italy: "Italia",
      portugal: "Portugal",
      poland: "Polonia",
      sweden: "Suecia",
      norway: "Noruega",
      denmark: "Dinamarca",
      finland: "Finlandia",
      other: "Otro"
    }
  }
};

export function getTranslation(language: string): Translations {
  return translations[language] || translations.en;
}

export function getLanguageByCode(code: string): Language | undefined {
  return supportedLanguages.find(lang => lang.code === code);
}

export function getLanguageOptions() {
  return supportedLanguages.map(lang => ({
    value: lang.code,
    label: `${lang.flag} ${lang.nativeName}`,
    region: lang.region
  }));
}