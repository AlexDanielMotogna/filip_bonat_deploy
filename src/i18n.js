import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'


const resources = {
de: {
    translation: {
      welcome: "Individuelle Finanzberatung",
      privat: "Privat",
      kunden: "Kunden",
      firma: "Firma",
      loading: "Laden...",
      kreditrechner: "Kreditrechner",
      request_cta: "Jetzt unverbindlich Kredit anfragen!",
      Finanz: "Finanz",
      Versicherung: "Versicherung",
      Investment: "Investment",
      Immobilien: "Immobilien",
      Startseite: "Startseite",
      Übermich: "Über mich",
      Leistungen: "Leistungen",
      Kompetenzen: "Kompetenzen",
      Bewertungen: "Bewertungen",
      Kontakt: "Kontakt",
      "Kontakt aufnehmen": "Kontakt aufnehmen",
      "Soziale Netzwerke": "Soziale Netzwerke",
      "Newsletter abonnieren": "Newsletter abonnieren",
      abonnieren: "Abonnieren",
      "Monatliche Rate": "Monatliche Rate",
      "Gesamtrückzahlung": "Gesamtrückzahlung",
      "Davon Zinsen": "Davon Zinsen",
      "Kreditbetrag inkl. Kreditkosten": "Kreditbetrag inkl. Kreditkosten",
      "Kompetente Beratung": "Kompetente Beratung",
      für: "für",
      "Ihre Sicherheit": "Ihre Sicherheit",
      "Vertrauensvolle Beratung": "Vertrauensvolle Beratung",
      "Transparente Kommunikation": "Transparente Kommunikation",
      "Ganzheitlicher Ansatz": "Ganzheitlicher Ansatz",
      "Digitale Kompetenz": "Digitale Kompetenz",
      Berufserfahrung: "Berufserfahrung",
      Ausbildung: "Ausbildung",
      "seit 2020": "seit 2020",
      Versicherungsexperte: "Versicherungsexperte",
      "Beratung in allen Versicherungsfragen": "Beratung in allen Versicherungsfragen",
      "Risikoanalyse und maßgeschneiderte Policen": "Risikoanalyse und maßgeschneiderte Policen",
      "Betreuung von Privat- und Firmenkunden": "Betreuung von Privat- und Firmenkunden",
      "Stay With Me": "Stay With Me",
      "Zertifizierter Versicherungsberater (WKO)": "Zertifizierter Versicherungsberater (WKO)",
      "Österreichische Finanzakademie": "Österreichische Finanzakademie",
      email_placeholder: "E-Mail-Adresse*",
      "Filip Bonat": "Filip Bonat",
      intro_filip: "Ich bin Filip Bonat, Versicherungsexperte mit über 4 Jahren Erfahrung in der Entwicklung maßgeschneiderter Versicherungslösungen für Privatpersonen und Unternehmen.",
      goal_filip: "Mein Ziel ist es, Vertrauen aufzubauen, Risiken transparent zu managen und Sie langfristig abzusichern – unabhängig davon, ob es um Lebens-, Gesundheits-, Sach- oder Unternehmensversicherungen geht.",
      trust_text: "Persönliche Gespräche auf Augenhöhe – ich nehme mir Zeit, um Ihre individuelle Lebenssituation zu verstehen und passende Lösungen zu entwickeln.",
      clear_text: "Ich erkläre Versicherungsoptionen klar und verständlich – ohne Fachchinesisch. Sie wissen jederzeit, wofür Sie sich entscheiden.",
      holistic_text: "Ich betrachte nicht nur einzelne Verträge, sondern Ihr gesamtes Risikoprofil – für eine umfassende und nachhaltige Absicherung.",
      digital_text: "Moderne Tools ermöglichen es mir, Beratung flexibel, ortsunabhängig und effizient zu gestalten – auch komplett digital.",
      "2010 - 2013": "2010 - 2013",
      "2013 - 2015": "2013 - 2015",
      "Individuelle Finanzberatung, die": "Individuelle Finanzberatung, die",
      Vertrauen: "Vertrauen",
      schafft: "schafft",

      skills: {
        title: "Kompetenzen",
        subtitle1: "Die Basis für fundierte",
        subtitle2: "Versicherungsberatung",
        skill1: { alt: "Fachwissen", text: "Fachwissen im Versicherungswesen" },
        skill2: { alt: "Kundenorientierung", text: "Kundenorientierte Beratung" },
        skill3: { alt: "Risikobewertung", text: "Risikobewertung & Analyse" },
        skill4: { alt: "Vertragsmanagement", text: "Vertragsmanagement & Betreuung" },
        skill5: { alt: "Digitale Beratung", text: "Digitale Beratung & Tools" },
        skill6: { alt: "Regulatorisches Wissen", text: "Regulatorisches Wissen" }
      },

      sidebar: {
        description: "Hi, ich bin Filip Bonat, Versicherungsexperte mit über 4 Jahren Erfahrung in der Entwicklung maßgeschneiderter Versicherungslösungen.",
        cta: "Jetzt mit mir sprechen",
        rights: "Alle Rechte vorbehalten."
      },

      anfrage: {
        title: "Anfrage stellen",
        subtitle: "Wir melden uns innerhalb von 24 Stunden bei Ihnen",
        personalInfo: "Persönliche Informationen",
        documents: "Verfügbare Unterlagen (optional)",
        documentsHint: "Hochladen Sie die Unterlagen"
      },
form: {
  name: "Name",
  email: "E-Mail",
  phone: "Telefon",
  message: "Nachricht (optional)",
  messagePlaceholder: "Teilen Sie uns weitere Details mit...",
  submit: "Anfrage senden",
  cancel: "Abbrechen",
  acceptDatenschutz: "Ich akzeptiere die",
  successTitle: "Erfolg!",
  successMessage: "Ihre Anfrage wurde erfolgreich gesendet.",
  submitting: "Wird gesendet...",
  datenschutzRequired: "Bitte akzeptieren Sie die Datenschutzerklärung",
  "Ich akzeptiere die {link}": "Ich akzeptiere die {link}",
},

      services: {
        title: "Leistungen",
        subtitle1: "Versicherungslösungen",
        subtitle2: "für jede",
        subtitle2_span: "Lebenslage",
        box1: {
          title: "Beratung & Analyse",
          text: "Wir analysieren Ihre individuelle Situation und finden die optimale Versicherung."
        },
        box2: {
          title: "Private Versicherungen",
          text: "Lebens-, Unfall-, Hausrat-, Haftpflicht- und Krankenversicherung."
        },
        box3: {
          title: "Gewerbliche Versicherungen",
          text: "Schutz für Unternehmen, Mitarbeiter, Fuhrpark und Betriebshaftpflicht."
        },
        box4: {
          title: "Digitale Vertragsverwaltung",
          text: "Alle Policen übersichtlich, digital & jederzeit zugänglich."
        }
      }, 
      
    }
  },
  en: {
  "translation": {
    "welcome": "Personalized financial advice",
    "privat": "Private",
    "kunden": "Clients",
    "firma": "Company",
    "loading": "Loading...",
    "kreditrechner": "Loan calculator",
    "request_cta": "Request your loan now!",
    "Finanz": "Finance",
    "Versicherung": "Insurance",
    "Investment": "Investment",
    "Immobilien": "Real estate",
    "Startseite": "Home",
    "Übermich": "About me",
    "Leistungen": "Services",
    "Kompetenzen": "Expertise",
    "Bewertungen": "Reviews",
    "Kontakt": "Contact",
    "Kontakt aufnehmen": "Get in touch",
    "Soziale Netzwerke": "Social networks",
    "Newsletter abonnieren": "Subscribe to the newsletter",
    "abonnieren": "Subscribe",
    "Monatliche Rate": "Monthly installment",
    "Gesamtrückzahlung": "Total repayment",
    "Davon Zinsen": "Including interest",
    "Kreditbetrag inkl. Kreditkosten": "Loan amount incl. fees",
    "Kompetente Beratung": "Expert advice",
    "für": "for",
    "Ihre Sicherheit": "Your security",
    "Vertrauensvolle Beratung": "Trustworthy advice",
    "Transparente Kommunikation": "Clear communication",
    "Ganzheitlicher Ansatz": "Holistic approach",
    "Digitale Kompetenz": "Digital expertise",
    "Berufserfahrung": "Work experience",
    "Ausbildung": "Education",
    "seit 2020": "since 2020",
    "Versicherungsexperte": "Insurance expert",
    "Beratung in allen Versicherungsfragen": "Consulting on all insurance matters",
    "Risikoanalyse und maßgeschneiderte Policen": "Risk analysis and tailored policies",
    "Betreuung von Privat- und Firmenkunden": "Support for private and corporate clients",
    "Stay With Me": "Stay With Me",
    "Zertifizierter Versicherungsberater (WKO)": "Certified Insurance Advisor (WKO)",
    "Österreichische Finanzakademie": "Austrian Finance Academy",
    "email_placeholder": "Email address*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "I am Filip Bonat, an insurance expert with over 4 years of experience developing tailored insurance solutions for individuals and businesses.",
    "goal_filip": "My goal is to build trust, manage risks transparently, and provide long-term security – whether in life, health, property, or corporate insurance.",
    "trust_text": "Personal conversations at eye level – I take the time to understand your individual situation and develop suitable solutions.",
    "clear_text": "I explain insurance options in a clear and simple way – without jargon. You always know exactly what you are choosing.",
    "holistic_text": "I don’t just look at single contracts, but at your entire risk profile – for comprehensive and sustainable coverage.",
    "digital_text": "Modern tools allow me to provide advice flexibly, regardless of location, and efficiently – even fully digital.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Personalized financial advice that",
    "Vertrauen": "builds trust",
    "schafft": "",

    "skills": {
      "title": "Expertise",
      "subtitle1": "The foundation for solid",
      "subtitle2": "Insurance consulting",
      "skill1": { "alt": "Expert knowledge", "text": "Insurance expertise" },
      "skill2": { "alt": "Client focus", "text": "Client-oriented advice" },
      "skill3": { "alt": "Risk assessment", "text": "Risk assessment & analysis" },
      "skill4": { "alt": "Contract management", "text": "Contract management & support" },
      "skill5": { "alt": "Digital consulting", "text": "Digital consulting & tools" },
      "skill6": { "alt": "Regulatory knowledge", "text": "Regulatory knowledge" }
    },

    "sidebar": {
      "description": "Hi, I’m Filip Bonat, an insurance expert with over 4 years of experience creating tailored insurance solutions.",
      "cta": "Talk to me now",
      "rights": "All rights reserved."
    },

    "anfrage": {
      "title": "Send request",
      "subtitle": "We will get back to you within 24 hours",
      "personalInfo": "Personal information",
      "documents": "Available documents",
      "documentsHint": "Please mark or upload the documents"
    },

    "form": {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "message": "Message (optional)",
      "messagePlaceholder": "Share additional details with us...",
      "submit": "Send request",
      "cancel": "Cancel"
    },
    "services": {
  "title": "Services",
  "subtitle1": "Insurance solutions",
  "subtitle2": "for every",
  "subtitle2_span": "situation",
  "box1": {
    "title": "Consulting & Analysis",
    "text": "We analyze your individual situation and find the best insurance."
  },
  "box2": {
    "title": "Private Insurance",
    "text": "Life, accident, household, liability, and health insurance."
  },
  "box3": {
    "title": "Business Insurance",
    "text": "Protection for companies, employees, fleet, and liability."
  },
  "box4": {
    "title": "Digital Contract Management",
    "text": "All policies clearly arranged, digital & accessible anytime."
  }
}

  }
},
  es:{
  "translation": {
    "welcome": "Asesoría financiera personalizada",
    "privat": "Privado",
    "kunden": "Clientes",
    "firma": "Empresa",
    "loading": "Cargando...",
    "kreditrechner": "Calculadora de crédito",
    "request_cta": "¡Solicita tu crédito ahora!",
    "Finanz": "Finanzas",
    "Versicherung": "Seguros",
    "Investment": "Inversión",
    "Immobilien": "Bienes raíces",
    "Startseite": "Inicio",
    "Übermich": "Sobre mí",
    "Leistungen": "Servicios",
    "Kompetenzen": "Competencias",
    "Bewertungen": "Opiniones",
    "Kontakt": "Contacto",
    "Kontakt aufnehmen": "Contactar",
    "Soziale Netzwerke": "Redes sociales",
    "Newsletter abonnieren": "Suscríbete al boletín",
    "abonnieren": "Suscribirse",
    "Monatliche Rate": "Cuota mensual",
    "Gesamtrückzahlung": "Devolución total",
    "Davon Zinsen": "Intereses incluidos",
    "Kreditbetrag inkl. Kreditkosten": "Importe del crédito con costes incluidos",
    "Kompetente Beratung": "Asesoría experta",
    "für": "para",
    "Ihre Sicherheit": "su seguridad",
    "Vertrauensvolle Beratung": "Asesoría de confianza",
    "Transparente Kommunikation": "Comunicación transparente",
    "Ganzheitlicher Ansatz": "Enfoque integral",
    "Digitale Kompetenz": "Competencia digital",
    "Berufserfahrung": "Experiencia profesional",
    "Ausbildung": "Formación",
    "seit 2020": "desde 2020",
    "Versicherungsexperte": "Experto en seguros",
    "Beratung in allen Versicherungsfragen": "Asesoría en todas las áreas de seguros",
    "Risikoanalyse und maßgeschneiderte Policen": "Análisis de riesgos y pólizas personalizadas",
    "Betreuung von Privat- und Firmenkunden": "Atención a clientes particulares y empresas",
    "Stay With Me": "Mantente en contacto",
    "Zertifizierter Versicherungsberater (WKO)": "Asesor de seguros certificado (WKO)",
    "Österreichische Finanzakademie": "Academia Financiera de Austria",
    "email_placeholder": "Correo electrónico*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "Soy Filip Bonat, experto en seguros con más de 4 años de experiencia en el diseño de soluciones personalizadas para particulares y empresas.",
    "goal_filip": "Mi objetivo es generar confianza, gestionar riesgos con transparencia y garantizar tu seguridad a largo plazo, ya sea en seguros de vida, salud, patrimonio o empresariales.",
    "trust_text": "Conversaciones personales y cercanas: me tomo el tiempo necesario para comprender tu situación y ofrecerte soluciones adecuadas.",
    "clear_text": "Explico las opciones de seguro de manera clara y sencilla, sin tecnicismos. Siempre sabrás exactamente qué estás eligiendo.",
    "holistic_text": "No me limito a contratos individuales, analizo todo tu perfil de riesgos para ofrecerte una cobertura completa y sostenible.",
    "digital_text": "Las herramientas digitales me permiten asesorarte de manera flexible, eficiente y sin importar el lugar, incluso totalmente en línea.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Asesoría financiera personalizada que",
    "Vertrauen": "genera confianza",
    "schafft": "",

    "skills": {
      "title": "Competencias",
      "subtitle1": "La base para una sólida",
      "subtitle2": "asesoría en seguros",
      "skill1": { "alt": "Conocimiento experto", "text": "Conocimientos en seguros" },
      "skill2": { "alt": "Orientación al cliente", "text": "Asesoría centrada en el cliente" },
      "skill3": { "alt": "Análisis de riesgos", "text": "Evaluación y análisis de riesgos" },
      "skill4": { "alt": "Gestión de contratos", "text": "Gestión y seguimiento de contratos" },
      "skill5": { "alt": "Asesoría digital", "text": "Asesoría digital y herramientas" },
      "skill6": { "alt": "Conocimiento normativo", "text": "Conocimiento regulatorio" }
    },

    "sidebar": {
      "description": "Hola, soy Filip Bonat, experto en seguros con más de 4 años de experiencia en la creación de soluciones personalizadas.",
      "cta": "Habla conmigo ahora",
      "rights": "Todos los derechos reservados."
    },

    "anfrage": {
      "title": "Enviar solicitud",
      "subtitle": "Te responderemos en un plazo de 24 horas",
      "personalInfo": "Información personal",
      "documents": "Documentos disponibles",
      "documentsHint": "Marca o sube los documentos necesarios"
    },

    "form": {
      "name": "Nombre",
      "email": "Correo electrónico",
      "phone": "Teléfono",
      "message": "Mensaje (opcional)",
      "messagePlaceholder": "Compártenos más detalles...",
      "submit": "Enviar solicitud",
      "cancel": "Cancelar"
    }, 
    "services": {
  "title": "Servicios",
  "subtitle1": "Soluciones de seguros",
  "subtitle2": "para cada",
  "subtitle2_span": "situación",
  "box1": {
    "title": "Asesoría y análisis",
    "text": "Analizamos tu situación individual y encontramos el seguro óptimo."
  },
  "box2": {
    "title": "Seguros privados",
    "text": "Seguro de vida, accidentes, hogar, responsabilidad civil y salud."
  },
  "box3": {
    "title": "Seguros empresariales",
    "text": "Protección para empresas, empleados, flota y responsabilidad civil."
  },
  "box4": {
    "title": "Gestión digital de contratos",
    "text": "Todas las pólizas claras, digitales y accesibles en cualquier momento."
  }
}

  }
},
  sk: {
  "translation": {
    "welcome": "Individuálne finančné poradenstvo",
    "privat": "Súkromný",
    "kunden": "Klienti",
    "firma": "Firma",
    "loading": "Načítava sa...",
    "kreditrechner": "Kalkulačka úveru",
    "request_cta": "Požiadajte o úver ešte dnes!",
    "Finanz": "Financie",
    "Versicherung": "Poistenie",
    "Investment": "Investícia",
    "Immobilien": "Nehnuteľnosti",
    "Startseite": "Domov",
    "Übermich": "O mne",
    "Leistungen": "Služby",
    "Kompetenzen": "Kompetencie",
    "Bewertungen": "Hodnotenia",
    "Kontakt": "Kontakt",
    "Kontakt aufnehmen": "Kontaktovať",
    "Soziale Netzwerke": "Sociálne siete",
    "Newsletter abonnieren": "Prihlásiť sa na odber noviniek",
    "abonnieren": "Prihlásiť sa",
    "Monatliche Rate": "Mesačná splátka",
    "Gesamtrückzahlung": "Celková splátka",
    "Davon Zinsen": "Z toho úroky",
    "Kreditbetrag inkl. Kreditkosten": "Výška úveru vrátane nákladov",
    "Kompetente Beratung": "Odborné poradenstvo",
    "für": "pre",
    "Ihre Sicherheit": "vašu bezpečnosť",
    "Vertrauensvolle Beratung": "Poradenstvo založené na dôvere",
    "Transparente Kommunikation": "Transparentná komunikácia",
    "Ganzheitlicher Ansatz": "Komplexný prístup",
    "Digitale Kompetenz": "Digitálna kompetencia",
    "Berufserfahrung": "Pracovné skúsenosti",
    "Ausbildung": "Vzdelanie",
    "seit 2020": "od roku 2020",
    "Versicherungsexperte": "Expert na poistenie",
    "Beratung in allen Versicherungsfragen": "Poradenstvo vo všetkých otázkach poistenia",
    "Risikoanalyse und maßgeschneiderte Policen": "Analýza rizík a poistky šité na mieru",
    "Betreuung von Privat- und Firmenkunden": "Starostlivosť o súkromných aj firemných klientov",
    "Stay With Me": "Zostaňme v kontakte",
    "Zertifizierter Versicherungsberater (WKO)": "Certifikovaný poisťovací poradca (WKO)",
    "Österreichische Finanzakademie": "Rakúska finančná akadémia",
    "email_placeholder": "E-mailová adresa*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "Som Filip Bonat, expert na poistenie s viac ako 4 rokmi skúseností s tvorbou riešení na mieru pre jednotlivcov a firmy.",
    "goal_filip": "Mojím cieľom je budovať dôveru, transparentne riadiť riziká a poskytnúť vám dlhodobú istotu – či už ide o životné, zdravotné, majetkové alebo firemné poistenie.",
    "trust_text": "Osobné stretnutia na rovnakej úrovni – venujem čas pochopeniu vašej situácie a hľadaniu vhodného riešenia.",
    "clear_text": "Možnosti poistenia vysvetľujem jasne a zrozumiteľne – bez odborného žargónu. Vždy presne viete, čo si vyberáte.",
    "holistic_text": "Nepozerám sa iba na jednotlivé zmluvy, ale na celé vaše rizikové portfólio – pre komplexnú a udržateľnú ochranu.",
    "digital_text": "Moderné nástroje mi umožňujú poskytovať poradenstvo flexibilne, efektívne a nezávisle od miesta – dokonca úplne digitálne.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Individuálne finančné poradenstvo, ktoré",
    "Vertrauen": "buduje dôveru",
    "schafft": "",

    "skills": {
      "title": "Kompetencie",
      "subtitle1": "Základ pre kvalitné",
      "subtitle2": "poisťovacie poradenstvo",
      "skill1": { "alt": "Odborné vedomosti", "text": "Odborné vedomosti v oblasti poistenia" },
      "skill2": { "alt": "Orientácia na klienta", "text": "Poradenstvo zamerané na klienta" },
      "skill3": { "alt": "Hodnotenie rizík", "text": "Hodnotenie a analýza rizík" },
      "skill4": { "alt": "Správa zmlúv", "text": "Správa a starostlivosť o zmluvy" },
      "skill5": { "alt": "Digitálne poradenstvo", "text": "Digitálne poradenstvo a nástroje" },
      "skill6": { "alt": "Znalosť regulácií", "text": "Znalosť regulácií" }
    },

    "sidebar": {
      "description": "Ahoj, som Filip Bonat, poisťovací expert s viac ako 4-ročnými skúsenosťami v oblasti riešení na mieru.",
      "cta": "Porozprávajte sa so mnou teraz",
      "rights": "Všetky práva vyhradené."
    },

    "anfrage": {
      "title": "Odoslať žiadosť",
      "subtitle": "Odpovieme vám do 24 hodín",
      "personalInfo": "Osobné údaje",
      "documents": "Dostupné dokumenty",
      "documentsHint": "Označte alebo nahrajte potrebné dokumenty"
    },

    "form": {
      "name": "Meno",
      "email": "E-mail",
      "phone": "Telefón",
      "message": "Správa (voliteľné)",
      "messagePlaceholder": "Podeľte sa s nami o viac detailov...",
      "submit": "Odoslať žiadosť",
      "cancel": "Zrušiť"
    },
    "services": {
  "title": "Služby",
  "subtitle1": "Poistné riešenia",
  "subtitle2": "pre každú",
  "subtitle2_span": "životnú situáciu",
  "box1": {
    "title": "Poradenstvo a analýza",
    "text": "Analyzujeme vašu individuálnu situáciu a nájdeme optimálne poistenie."
  },
  "box2": {
    "title": "Súkromné poistenia",
    "text": "Životné, úrazové, domácnosti, zodpovednosti a zdravotné poistenie."
  },
  "box3": {
    "title": "Firemné poistenia",
    "text": "Ochrana pre firmy, zamestnancov, vozový park a zodpovednosť."
  },
  "box4": {
    "title": "Digitálna správa zmlúv",
    "text": "Všetky poistky prehľadne, digitálne a vždy dostupné."
  }
}

  }
},
  ro: {
  "translation": {
    "welcome": "Consiliere financiară individuală",
    "privat": "Privat",
    "kunden": "Clienți",
    "firma": "Firmă",
    "loading": "Se încarcă...",
    "kreditrechner": "Calculator de credit",
    "request_cta": "Solicită un credit acum!",
    "Finanz": "Finanțe",
    "Versicherung": "Asigurare",
    "Investment": "Investiție",
    "Immobilien": "Imobiliare",
    "Startseite": "Acasă",
    "Übermich": "Despre mine",
    "Leistungen": "Servicii",
    "Kompetenzen": "Competențe",
    "Bewertungen": "Recenzii",
    "Kontakt": "Contact",
    "Kontakt aufnehmen": "Ia legătura",
    "Soziale Netzwerke": "Rețele sociale",
    "Newsletter abonnieren": "Abonează-te la newsletter",
    "abonnieren": "Abonează-te",
    "Monatliche Rate": "Rată lunară",
    "Gesamtrückzahlung": "Rambursare totală",
    "Davon Zinsen": "Dobânzi incluse",
    "Kreditbetrag inkl. Kreditkosten": "Suma creditului inclusiv costuri",
    "Kompetente Beratung": "Consiliere de specialitate",
    "für": "pentru",
    "Ihre Sicherheit": "siguranța ta",
    "Vertrauensvolle Beratung": "Consiliere bazată pe încredere",
    "Transparente Kommunikation": "Comunicare transparentă",
    "Ganzheitlicher Ansatz": "Abordare holistică",
    "Digitale Kompetenz": "Competență digitală",
    "Berufserfahrung": "Experiență profesională",
    "Ausbildung": "Educație",
    "seit 2020": "din 2020",
    "Versicherungsexperte": "Expert în asigurări",
    "Beratung in allen Versicherungsfragen": "Consiliere în toate tipurile de asigurări",
    "Risikoanalyse und maßgeschneiderte Policen": "Analiză de risc și polițe personalizate",
    "Betreuung von Privat- und Firmenkunden": "Asistență pentru persoane fizice și companii",
    "Stay With Me": "Rămâi conectat",
    "Zertifizierter Versicherungsberater (WKO)": "Consultant în asigurări certificat (WKO)",
    "Österreichische Finanzakademie": "Academia Financiară Austriacă",
    "email_placeholder": "Adresă de e-mail*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "Sunt Filip Bonat, expert în asigurări cu peste 4 ani de experiență în dezvoltarea de soluții personalizate pentru persoane și companii.",
    "goal_filip": "Obiectivul meu este să construiesc încredere, să gestionez transparent riscurile și să ofer siguranță pe termen lung – fie că este vorba de asigurări de viață, sănătate, bunuri sau afaceri.",
    "trust_text": "Discuții personale de la egal la egal – îmi fac timp să înțeleg situația ta și să găsesc soluțiile potrivite.",
    "clear_text": "Explic opțiunile de asigurare clar și ușor de înțeles – fără jargon. Vei ști mereu ce alegi.",
    "holistic_text": "Nu privesc doar contracte individuale, ci întregul tău profil de risc – pentru o acoperire completă și sustenabilă.",
    "digital_text": "Instrumentele moderne îmi permit să ofer consiliere flexibilă, eficientă și independentă de locație – chiar și complet digital.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Consiliere financiară individuală care",
    "Vertrauen": "creează încredere",
    "schafft": "",

    "skills": {
      "title": "Competențe",
      "subtitle1": "Baza pentru o",
      "subtitle2": "consiliere solidă în asigurări",
      "skill1": { "alt": "Expertiză", "text": "Cunoștințe în domeniul asigurărilor" },
      "skill2": { "alt": "Orientare către client", "text": "Consiliere orientată spre client" },
      "skill3": { "alt": "Evaluare a riscurilor", "text": "Evaluarea și analiza riscurilor" },
      "skill4": { "alt": "Administrarea contractelor", "text": "Management și asistență pentru contracte" },
      "skill5": { "alt": "Consiliere digitală", "text": "Consiliere digitală și instrumente" },
      "skill6": { "alt": "Cunoștințe legislative", "text": "Cunoștințe despre reglementări" }
    },

    "sidebar": {
      "description": "Salut, sunt Filip Bonat, expert în asigurări cu peste 4 ani de experiență în soluții personalizate.",
      "cta": "Vorbește cu mine acum",
      "rights": "Toate drepturile rezervate."
    },

    "anfrage": {
      "title": "Trimite o cerere",
      "subtitle": "Îți răspundem în 24 de ore",
      "personalInfo": "Informații personale",
      "documents": "Documente disponibile",
      "documentsHint": "Bifează sau încarcă documentele necesare"
    },

    "form": {
      "name": "Nume",
      "email": "E-mail",
      "phone": "Telefon",
      "message": "Mesaj (opțional)",
      "messagePlaceholder": "Adaugă mai multe detalii...",
      "submit": "Trimite cererea",
      "cancel": "Anulează"
    },
    "services": {
  "title": "Servicii",
  "subtitle1": "Soluții de asigurare",
  "subtitle2": "pentru fiecare",
  "subtitle2_span": "situație de viață",
  "box1": {
    "title": "Consultanță și analiză",
    "text": "Analizăm situația ta individuală și găsim asigurarea optimă."
  },
  "box2": {
    "title": "Asigurări private",
    "text": "Asigurări de viață, accidente, locuință, răspundere civilă și sănătate."
  },
  "box3": {
    "title": "Asigurări de afaceri",
    "text": "Protecție pentru companii, angajați, flotă și răspundere civilă."
  },
  "box4": {
    "title": "Administrare digitală a contractelor",
    "text": "Toate polițele clare, digitale și accesibile oricând."
  }
}

  }
},
  hr: {
  "translation": {
    "welcome": "Individualno financijsko savjetovanje",
    "privat": "Privatno",
    "kunden": "Klijenti",
    "firma": "Tvrtka",
    "loading": "Učitavanje...",
    "kreditrechner": "Kalkulator kredita",
    "request_cta": "Zatražite kredit odmah!",
    "Finanz": "Financije",
    "Versicherung": "Osiguranje",
    "Investment": "Investicija",
    "Immobilien": "Nekretnine",
    "Startseite": "Početna stranica",
    "Übermich": "O meni",
    "Leistungen": "Usluge",
    "Kompetenzen": "Kompetencije",
    "Bewertungen": "Recenzije",
    "Kontakt": "Kontakt",
    "Kontakt aufnehmen": "Kontaktirajte me",
    "Soziale Netzwerke": "Društvene mreže",
    "Newsletter abonnieren": "Pretplatite se na newsletter",
    "abonnieren": "Pretplati se",
    "Monatliche Rate": "Mjesečna rata",
    "Gesamtrückzahlung": "Ukupna otplata",
    "Davon Zinsen": "Uključene kamate",
    "Kreditbetrag inkl. Kreditkosten": "Iznos kredita s uključenim troškovima",
    "Kompetente Beratung": "Stručno savjetovanje",
    "für": "za",
    "Ihre Sicherheit": "vašu sigurnost",
    "Vertrauensvolle Beratung": "Savjetovanje od povjerenja",
    "Transparente Kommunikation": "Transparentna komunikacija",
    "Ganzheitlicher Ansatz": "Holistički pristup",
    "Digitale Kompetenz": "Digitalna stručnost",
    "Berufserfahrung": "Radno iskustvo",
    "Ausbildung": "Obrazovanje",
    "seit 2020": "od 2020",
    "Versicherungsexperte": "Stručnjak za osiguranje",
    "Beratung in allen Versicherungsfragen": "Savjetovanje u svim pitanjima osiguranja",
    "Risikoanalyse und maßgeschneiderte Policen": "Analiza rizika i prilagođene police",
    "Betreuung von Privat- und Firmenkunden": "Podrška privatnim i poslovnim klijentima",
    "Stay With Me": "Ostanite u kontaktu",
    "Zertifizierter Versicherungsberater (WKO)": "Ovlašteni savjetnik za osiguranje (WKO)",
    "Österreichische Finanzakademie": "Austrijska financijska akademija",
    "email_placeholder": "E-mail adresa*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "Ja sam Filip Bonat, stručnjak za osiguranje s više od 4 godine iskustva u razvoju prilagođenih rješenja za pojedince i tvrtke.",
    "goal_filip": "Moj je cilj izgraditi povjerenje, transparentno upravljati rizicima i pružiti vam dugoročnu sigurnost – bilo da se radi o životnom, zdravstvenom, imovinskom ili poslovnom osiguranju.",
    "trust_text": "Osobni razgovori ravnopravno – uzimam vrijeme da razumijem vašu situaciju i pronađem najbolje rješenje.",
    "clear_text": "Opcije osiguranja objašnjavam jasno i razumljivo – bez stručnog žargona. Uvijek znate što odabirete.",
    "holistic_text": "Ne gledam samo pojedine ugovore, već cijeli vaš profil rizika – za potpunu i održivu zaštitu.",
    "digital_text": "Moderni alati omogućuju mi savjetovanje fleksibilno, učinkovito i neovisno o lokaciji – čak i potpuno digitalno.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Individualno financijsko savjetovanje koje",
    "Vertrauen": "stvara povjerenje",
    "schafft": "",

    "skills": {
      "title": "Kompetencije",
      "subtitle1": "Temelj za kvalitetno",
      "subtitle2": "savjetovanje o osiguranju",
      "skill1": { "alt": "Stručno znanje", "text": "Stručno znanje u osiguranju" },
      "skill2": { "alt": "Orijentacija na klijenta", "text": "Savjetovanje usmjereno na klijenta" },
      "skill3": { "alt": "Procjena rizika", "text": "Procjena i analiza rizika" },
      "skill4": { "alt": "Upravljanje ugovorima", "text": "Upravljanje i podrška ugovorima" },
      "skill5": { "alt": "Digitalno savjetovanje", "text": "Digitalno savjetovanje i alati" },
      "skill6": { "alt": "Regulatorno znanje", "text": "Poznavanje regulative" }
    },

    "sidebar": {
      "description": "Pozdrav, ja sam Filip Bonat, stručnjak za osiguranje s više od 4 godine iskustva u razvoju prilagođenih rješenja.",
      "cta": "Razgovarajte sa mnom sada",
      "rights": "Sva prava pridržana."
    },

    "anfrage": {
      "title": "Pošaljite upit",
      "subtitle": "Odgovorit ćemo vam u roku od 24 sata",
      "personalInfo": "Osobni podaci",
      "documents": "Dostupni dokumenti",
      "documentsHint": "Označite ili prenesite potrebne dokumente"
    },

    "form": {
      "name": "Ime",
      "email": "E-mail",
      "phone": "Telefon",
      "message": "Poruka (neobavezno)",
      "messagePlaceholder": "Dodajte dodatne detalje...",
      "submit": "Pošaljite upit",
      "cancel": "Odustani"
    },
    "services": {
  "title": "Usluge",
  "subtitle1": "Rješenja osiguranja",
  "subtitle2": "za svaku",
  "subtitle2_span": "životnu situaciju",
  "box1": {
    "title": "Savjetovanje i analiza",
    "text": "Analiziramo vašu situaciju i pronalazimo optimalno osiguranje."
  },
  "box2": {
    "title": "Privatna osiguranja",
    "text": "Životno, nezgodno, kućno, odgovornost i zdravstveno osiguranje."
  },
  "box3": {
    "title": "Poslovna osiguranja",
    "text": "Zaštita za tvrtke, zaposlenike, vozni park i odgovornost."
  },
  "box4": {
    "title": "Digitalno upravljanje ugovorima",
    "text": "Sve police pregledno, digitalno i uvijek dostupno."
  }
}

  }
},
  pl: {
  "translation": {
    "welcome": "Indywidualne doradztwo finansowe",
    "privat": "Prywatny",
    "kunden": "Klienci",
    "firma": "Firma",
    "loading": "Ładowanie...",
    "kreditrechner": "Kalkulator kredytowy",
    "request_cta": "Złóż wniosek o kredyt już teraz!",
    "Finanz": "Finanse",
    "Versicherung": "Ubezpieczenia",
    "Investment": "Inwestycje",
    "Immobilien": "Nieruchomości",
    "Startseite": "Strona główna",
    "Übermich": "O mnie",
    "Leistungen": "Usługi",
    "Kompetenzen": "Kompetencje",
    "Bewertungen": "Opinie",
    "Kontakt": "Kontakt",
    "Kontakt aufnehmen": "Skontaktuj się ze mną",
    "Soziale Netzwerke": "Media społecznościowe",
    "Newsletter abonnieren": "Zapisz się do newslettera",
    "abonnieren": "Zapisz się",
    "Monatliche Rate": "Miesięczna rata",
    "Gesamtrückzahlung": "Całkowita spłata",
    "Davon Zinsen": "W tym odsetki",
    "Kreditbetrag inkl. Kreditkosten": "Kwota kredytu z kosztami",
    "Kompetente Beratung": "Profesjonalne doradztwo",
    "für": "dla",
    "Ihre Sicherheit": "Twojego bezpieczeństwa",
    "Vertrauensvolle Beratung": "Doradztwo oparte na zaufaniu",
    "Transparente Kommunikation": "Przejrzysta komunikacja",
    "Ganzheitlicher Ansatz": "Holistyczne podejście",
    "Digitale Kompetenz": "Kompetencje cyfrowe",
    "Berufserfahrung": "Doświadczenie zawodowe",
    "Ausbildung": "Wykształcenie",
    "seit 2020": "od 2020 roku",
    "Versicherungsexperte": "Ekspert ubezpieczeniowy",
    "Beratung in allen Versicherungsfragen": "Doradztwo we wszystkich sprawach ubezpieczeniowych",
    "Risikoanalyse und maßgeschneiderte Policen": "Analiza ryzyka i dostosowane polisy",
    "Betreuung von Privat- und Firmenkunden": "Obsługa klientów indywidualnych i biznesowych",
    "Stay With Me": "Pozostańmy w kontakcie",
    "Zertifizierter Versicherungsberater (WKO)": "Certyfikowany doradca ubezpieczeniowy (WKO)",
    "Österreichische Finanzakademie": "Austriacka Akademia Finansowa",
    "email_placeholder": "Adres e-mail*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "Nazywam się Filip Bonat i jestem ekspertem ubezpieczeniowym z ponad 4-letnim doświadczeniem w opracowywaniu spersonalizowanych rozwiązań dla osób prywatnych i firm.",
    "goal_filip": "Moim celem jest budowanie zaufania, przejrzyste zarządzanie ryzykiem i zapewnienie długoterminowego bezpieczeństwa – niezależnie od tego, czy chodzi o ubezpieczenia na życie, zdrowotne, majątkowe czy firmowe.",
    "trust_text": "Rozmowy prowadzone na równi – poświęcam czas, aby zrozumieć Twoją sytuację i zaproponować najlepsze rozwiązania.",
    "clear_text": "Wyjaśniam opcje ubezpieczeniowe w sposób jasny i zrozumiały – bez żargonu. Zawsze wiesz, co wybierasz.",
    "holistic_text": "Nie analizuję jedynie pojedynczych polis, lecz cały Twój profil ryzyka – aby zapewnić pełną i trwałą ochronę.",
    "digital_text": "Nowoczesne narzędzia pozwalają mi doradzać elastycznie, efektywnie i niezależnie od miejsca – także w pełni online.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Indywidualne doradztwo finansowe, które",
    "Vertrauen": "buduje zaufanie",
    "schafft": "",

    "skills": {
      "title": "Kompetencje",
      "subtitle1": "Podstawa rzetelnego",
      "subtitle2": "doradztwa ubezpieczeniowego",
      "skill1": { "alt": "Wiedza ekspercka", "text": "Specjalistyczna wiedza w zakresie ubezpieczeń" },
      "skill2": { "alt": "Orientacja na klienta", "text": "Doradztwo ukierunkowane na klienta" },
      "skill3": { "alt": "Ocena ryzyka", "text": "Ocena i analiza ryzyka" },
      "skill4": { "alt": "Zarządzanie umowami", "text": "Zarządzanie i obsługa umów" },
      "skill5": { "alt": "Doradztwo cyfrowe", "text": "Doradztwo cyfrowe i narzędzia" },
      "skill6": { "alt": "Znajomość regulacji", "text": "Znajomość przepisów i regulacji" }
    },

    "sidebar": {
      "description": "Cześć, jestem Filip Bonat, ekspert ubezpieczeniowy z ponad 4-letnim doświadczeniem w tworzeniu rozwiązań dostosowanych do potrzeb.",
      "cta": "Porozmawiaj ze mną teraz",
      "rights": "Wszelkie prawa zastrzeżone."
    },

    "anfrage": {
      "title": "Złóż zapytanie",
      "subtitle": "Skontaktujemy się z Tobą w ciągu 24 godzin",
      "personalInfo": "Dane osobowe",
      "documents": "Dostępne dokumenty",
      "documentsHint": "Zaznacz lub prześlij wymagane dokumenty"
    },

    "form": {
      "name": "Imię i nazwisko",
      "email": "E-mail",
      "phone": "Telefon",
      "message": "Wiadomość (opcjonalnie)",
      "messagePlaceholder": "Dodaj dodatkowe informacje...",
      "submit": "Wyślij zapytanie",
      "cancel": "Anuluj"
    },
    "services": {
  "title": "Usługi",
  "subtitle1": "Rozwiązania ubezpieczeniowe",
  "subtitle2": "na każdą",
  "subtitle2_span": "sytuację życiową",
  "box1": {
    "title": "Doradztwo i analiza",
    "text": "Analizujemy Twoją sytuację i znajdujemy optymalne ubezpieczenie."
  },
  "box2": {
    "title": "Ubezpieczenia prywatne",
    "text": "Na życie, od wypadków, mieszkaniowe, OC i zdrowotne."
  },
  "box3": {
    "title": "Ubezpieczenia firmowe",
    "text": "Ochrona dla firm, pracowników, floty i odpowiedzialności."
  },
  "box4": {
    "title": "Cyfrowe zarządzanie umowami",
    "text": "Wszystkie polisy przejrzyście, cyfrowo i zawsze dostępne."
  }
}

  }
},
  hu: {
  "translation": {
    "welcome": "Egyéni pénzügyi tanácsadás",
    "privat": "Magán",
    "kunden": "Ügyfelek",
    "firma": "Cég",
    "loading": "Betöltés...",
    "kreditrechner": "Hitelkalkulátor",
    "request_cta": "Kérjen most kölcsönt!",
    "Finanz": "Pénzügy",
    "Versicherung": "Biztosítás",
    "Investment": "Befektetés",
    "Immobilien": "Ingatlan",
    "Startseite": "Kezdőlap",
    "Übermich": "Rólam",
    "Leistungen": "Szolgáltatások",
    "Kompetenzen": "Kompetenciák",
    "Bewertungen": "Vélemények",
    "Kontakt": "Kapcsolat",
    "Kontakt aufnehmen": "Kapcsolatfelvétel",
    "Soziale Netzwerke": "Közösségi oldalak",
    "Newsletter abonnieren": "Iratkozzon fel hírlevelünkre",
    "abonnieren": "Feliratkozás",
    "Monatliche Rate": "Havi törlesztőrészlet",
    "Gesamtrückzahlung": "Teljes visszafizetés",
    "Davon Zinsen": "Ebből kamat",
    "Kreditbetrag inkl. Kreditkosten": "Hitelösszeg a költségekkel együtt",
    "Kompetente Beratung": "Szakértői tanácsadás",
    "für": "az Ön",
    "Ihre Sicherheit": "biztonságáért",
    "Vertrauensvolle Beratung": "Megbízható tanácsadás",
    "Transparente Kommunikation": "Átlátható kommunikáció",
    "Ganzheitlicher Ansatz": "Holisztikus megközelítés",
    "Digitale Kompetenz": "Digitális szakértelem",
    "Berufserfahrung": "Szakmai tapasztalat",
    "Ausbildung": "Tanulmányok",
    "seit 2020": "2020 óta",
    "Versicherungsexperte": "Biztosítási szakértő",
    "Beratung in allen Versicherungsfragen": "Tanácsadás minden biztosítási kérdésben",
    "Risikoanalyse und maßgeschneiderte Policen": "Kockázatelemzés és személyre szabott kötvények",
    "Betreuung von Privat- und Firmenkunden": "Magán- és vállalati ügyfelek támogatása",
    "Stay With Me": "Maradjon kapcsolatban",
    "Zertifizierter Versicherungsberater (WKO)": "Minősített biztosítási tanácsadó (WKO)",
    "Österreichische Finanzakademie": "Osztrák Pénzügyi Akadémia",
    "email_placeholder": "E-mail cím*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "Filip Bonat vagyok, biztosítási szakértő, több mint 4 év tapasztalattal a személyre szabott megoldások kidolgozásában magánszemélyek és cégek számára.",
    "goal_filip": "Célom a bizalom kiépítése, a kockázatok átlátható kezelése és a hosszú távú biztonság biztosítása – legyen szó élet-, egészség-, vagyon- vagy vállalati biztosításról.",
    "trust_text": "Személyes beszélgetések egyenrangúan – időt szánok arra, hogy megértsem az Ön helyzetét és a legjobb megoldásokat kínáljam.",
    "clear_text": "A biztosítási lehetőségeket világosan és érthetően magyarázom el – szakzsargon nélkül. Ön mindig tudja, mit választ.",
    "holistic_text": "Nem csak az egyes szerződéseket nézem, hanem az Ön teljes kockázati profilját – a teljes körű és fenntartható védelem érdekében.",
    "digital_text": "A modern eszközök lehetővé teszik számomra, hogy rugalmasan, helytől függetlenül és hatékonyan nyújtsak tanácsadást – akár teljesen digitálisan is.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Egyéni pénzügyi tanácsadás, amely",
    "Vertrauen": "bizalmat",
    "schafft": "épít",

    "skills": {
      "title": "Kompetenciák",
      "subtitle1": "Az alap a megbízható",
      "subtitle2": "biztosítási tanácsadáshoz",
      "skill1": { "alt": "Szakértelem", "text": "Szakértelem a biztosítás terén" },
      "skill2": { "alt": "Ügyfélközpontúság", "text": "Ügyfélközpontú tanácsadás" },
      "skill3": { "alt": "Kockázatértékelés", "text": "Kockázatértékelés és elemzés" },
      "skill4": { "alt": "Szerződéskezelés", "text": "Szerződések kezelése és támogatása" },
      "skill5": { "alt": "Digitális tanácsadás", "text": "Digitális tanácsadás és eszközök" },
      "skill6": { "alt": "Szabályozási ismeretek", "text": "Szabályozási ismeretek" }
    },

    "sidebar": {
      "description": "Üdvözlöm, Filip Bonat vagyok, biztosítási szakértő, több mint 4 éves tapasztalattal a személyre szabott megoldások kidolgozásában.",
      "cta": "Beszéljen velem most",
      "rights": "Minden jog fenntartva."
    },

    "anfrage": {
      "title": "Ajánlatkérés",
      "subtitle": "24 órán belül felvesszük Önnel a kapcsolatot",
      "personalInfo": "Személyes adatok",
      "documents": "Elérhető dokumentumok",
      "documentsHint": "Kérjük, jelölje meg vagy töltse fel a dokumentumokat"
    },

    "form": {
      "name": "Név",
      "email": "E-mail",
      "phone": "Telefon",
      "message": "Üzenet (opcionális)",
      "messagePlaceholder": "Adjon meg további részleteket...",
      "submit": "Ajánlat elküldése",
      "cancel": "Mégse"
    },
    "services": {
  "title": "Szolgáltatások",
  "subtitle1": "Biztosítási megoldások",
  "subtitle2": "minden",
  "subtitle2_span": "életszituációra",
  "box1": {
    "title": "Tanácsadás és elemzés",
    "text": "Elemezzük az Ön helyzetét, és megtaláljuk az optimális biztosítást."
  },
  "box2": {
    "title": "Magánbiztosítások",
    "text": "Élet-, baleset-, lakás-, felelősség- és egészségbiztosítás."
  },
  "box3": {
    "title": "Vállalati biztosítások",
    "text": "Védelem a cégek, alkalmazottak, járműpark és felelősség számára."
  },
  "box4": {
    "title": "Digitális szerződéskezelés",
    "text": "Minden kötvény áttekinthetően, digitálisan és bármikor elérhető."
  }
}

  }
},
  sl: {
  "translation": {
    "welcome": "Individualno finančno svetovanje",
    "privat": "Zasebno",
    "kunden": "Stranke",
    "firma": "Podjetje",
    "loading": "Nalaganje...",
    "kreditrechner": "Kalkulator posojila",
    "request_cta": "Zaprosite za posojilo zdaj!",
    "Finanz": "Finance",
    "Versicherung": "Zavarovanje",
    "Investment": "Naložbe",
    "Immobilien": "Nepremičnine",
    "Startseite": "Domov",
    "Übermich": "O meni",
    "Leistungen": "Storitve",
    "Kompetenzen": "Kompetence",
    "Bewertungen": "Mnenja",
    "Kontakt": "Kontakt",
    "Kontakt aufnehmen": "Stopite v stik",
    "Soziale Netzwerke": "Družbena omrežja",
    "Newsletter abonnieren": "Naročite se na novice",
    "abonnieren": "Naroči se",
    "Monatliche Rate": "Mesečni obrok",
    "Gesamtrückzahlung": "Skupno odplačilo",
    "Davon Zinsen": "Od tega obresti",
    "Kreditbetrag inkl. Kreditkosten": "Znesek posojila z vsemi stroški",
    "Kompetente Beratung": "Strokovno svetovanje",
    "für": "za",
    "Ihre Sicherheit": "vašo varnost",
    "Vertrauensvolle Beratung": "Zanesljivo svetovanje",
    "Transparente Kommunikation": "Jasna komunikacija",
    "Ganzheitlicher Ansatz": "Celosten pristop",
    "Digitale Kompetenz": "Digitalna usposobljenost",
    "Berufserfahrung": "Delovne izkušnje",
    "Ausbildung": "Izobrazba",
    "seit 2020": "od leta 2020",
    "Versicherungsexperte": "Strokovnjak za zavarovanja",
    "Beratung in allen Versicherungsfragen": "Svetovanje o vseh zavarovalnih vprašanjih",
    "Risikoanalyse und maßgeschneiderte Policen": "Analiza tveganj in prilagojene police",
    "Betreuung von Privat- und Firmenkunden": "Podpora zasebnim in poslovnim strankam",
    "Stay With Me": "Ostanite povezani",
    "Zertifizierter Versicherungsberater (WKO)": "Certificiran zavarovalni svetovalec (WKO)",
    "Österreichische Finanzakademie": "Avstrijska finančna akademija",
    "email_placeholder": "E-poštni naslov*",
    "Filip Bonat": "Filip Bonat",

    "intro_filip": "Sem Filip Bonat, strokovnjak za zavarovanja z več kot 4-letnimi izkušnjami pri razvoju prilagojenih rešitev za posameznike in podjetja.",
    "goal_filip": "Moj cilj je graditi zaupanje, pregledno upravljati tveganja in zagotoviti dolgoročno varnost – ne glede na to, ali gre za življenjska, zdravstvena, premoženjska ali poslovna zavarovanja.",
    "trust_text": "Osebni pogovori na enaki ravni – vzamem si čas, da razumem vašo situacijo in ponudim najboljše rešitve.",
    "clear_text": "Možnosti zavarovanja razložim jasno in razumljivo – brez strokovnega žargona. Vedno boste vedeli, kaj izberete.",
    "holistic_text": "Ne obravnavam le posameznih pogodb, ampak celoten vaš profil tveganja – za celovito in trajnostno zaščito.",
    "digital_text": "Sodobna orodja mi omogočajo, da svetujem prilagodljivo, ne glede na lokacijo, učinkovito in po potrebi popolnoma digitalno.",

    "2010 - 2013": "2010 - 2013",
    "2013 - 2015": "2013 - 2015",

    "Individuelle Finanzberatung, die": "Individualno finančno svetovanje, ki",
    "Vertrauen": "zaupanje",
    "schafft": "ustvarja",

    "skills": {
      "title": "Kompetence",
      "subtitle1": "Osnova za kakovostno",
      "subtitle2": "zavarovalno svetovanje",
      "skill1": { "alt": "Strokovno znanje", "text": "Strokovno znanje na področju zavarovanj" },
      "skill2": { "alt": "Usmerjenost k strankam", "text": "Svetovanje, usmerjeno k strankam" },
      "skill3": { "alt": "Ocena tveganj", "text": "Ocena in analiza tveganj" },
      "skill4": { "alt": "Upravljanje pogodb", "text": "Upravljanje pogodb in podpora" },
      "skill5": { "alt": "Digitalno svetovanje", "text": "Digitalno svetovanje in orodja" },
      "skill6": { "alt": "Regulativno znanje", "text": "Znanje o predpisih" }
    },

    "sidebar": {
      "description": "Pozdravljeni, sem Filip Bonat, strokovnjak za zavarovanja z več kot 4 leti izkušenj pri razvoju prilagojenih rešitev.",
      "cta": "Pogovorite se z mano zdaj",
      "rights": "Vse pravice pridržane."
    },

    "anfrage": {
      "title": "Pošljite povpraševanje",
      "subtitle": "Kontaktirali vas bomo v 24 urah",
      "personalInfo": "Osebni podatki",
      "documents": "Razpoložljivi dokumenti",
      "documentsHint": "Označite ali naložite dokumente"
    },

    "form": {
      "name": "Ime",
      "email": "E-pošta",
      "phone": "Telefon",
      "message": "Sporočilo (neobvezno)",
      "messagePlaceholder": "Dodajte več podrobnosti...",
      "submit": "Pošlji povpraševanje",
      "cancel": "Prekliči"
    },
    "services": {
  "title": "Storitve",
  "subtitle1": "Zavarovalne rešitve",
  "subtitle2": "za vsako",
  "subtitle2_span": "življenjsko situacijo",
  "box1": {
    "title": "Svetovanje in analiza",
    "text": "Analiziramo vašo situacijo in najdemo optimalno zavarovanje."
  },
  "box2": {
    "title": "Zasebna zavarovanja",
    "text": "Življenjsko, nezgodno, premoženjsko, odgovornostno in zdravstveno zavarovanje."
  },
  "box3": {
    "title": "Poslovna zavarovanja",
    "text": "Zaščita za podjetja, zaposlene, vozni park in odgovornost."
  },
  "box4": {
    "title": "Digitalno upravljanje pogodb",
    "text": "Vse police pregledno, digitalno in vedno dostopno."
  }
}

  }
}
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    debug: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    }
  })

// Manual language change function
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng)
  localStorage.setItem('i18nextLng', lng)
}

// Detect and set initial language
const savedLanguage = localStorage.getItem('i18nextLng')
if (savedLanguage && resources[savedLanguage]) {
  i18n.changeLanguage(savedLanguage)
} else {
  // Fallback to browser language or default to German
  const browserLng = navigator.language.split('-')[0]
  if (resources[browserLng]) {
    i18n.changeLanguage(browserLng)
  } else {
    i18n.changeLanguage('de')
  }
}

export default i18n
