import type { Category } from '../types/categories'

export const firmaCategories: Category[] = [
  {
    id: 'betrieblich',
    title: 'Betriebliche Absicherung',
    icon: '',
    description: 'Schutz für Ihr Unternehmen',
    subcategories: [
      {
        id: 'betriebshaftpflicht',
        name: 'Betriebshaftpflicht',
        tabs: [
          {
            id: 'standard',
            name: 'Standard',
            unterlagen: ['Handelsregisterauszug', 'Gewerbeanmeldung', 'Jahresabschluss']
          },
          {
            id: 'erweitert',
            name: 'Erweitert',
            unterlagen: ['Betriebsbeschreibung', 'Mitarbeiterzahl', 'Umsatzprognose']
          }
        ]
      },
      {
        id: 'gebaeudeversicherung',
        name: 'Gebäudeversicherung',
        tabs: [
          {
            id: 'feuer',
            name: 'Feuerversicherung',
            unterlagen: ['Grundbuchauszug', 'Gebäudewert', 'Baupläne']
          },
          {
            id: 'elementar',
            name: 'Elementarschäden',
            unterlagen: ['Lageplan', 'Risikoanalyse', 'Versicherungswert']
          }
        ]
      }
    ]
  },
  {
    id: 'mitarbeiter',
    title: 'Mitarbeitervorsorge',
    icon: '',
    description: 'Benefits für Ihre Angestellten',
    subcategories: [
      {
        id: 'betriebliche-altersvorsorge',
        name: 'Betriebliche Altersvorsorge',
        tabs: [
          {
            id: 'direktversicherung',
            name: 'Direktversicherung',
            unterlagen: ['Mitarbeiterliste', 'Gehaltsstruktur', 'Versorgungsordnung']
          },
          {
            id: 'pensionskasse',
            name: 'Pensionskasse',
            unterlagen: ['Betriebsvereinbarung', 'Durchschnittsgehälter', 'Altersstruktur']
          }
        ]
      },
      {
        id: 'gruppenunfall',
        name: 'Gruppenunfallversicherung',
        tabs: [
          {
            id: 'basis',
            name: 'Basis-Schutz',
            unterlagen: ['Mitarbeiterzahl', 'Tätigkeitsbeschreibungen', 'Gefährdungsbeurteilung']
          },
          {
            id: 'premium',
            name: 'Premium-Schutz',
            unterlagen: ['Erweiterte Risikoanalyse', 'Unfallstatistik', 'Präventionsmaßnahmen']
          }
        ]
      }
    ]
  },
  {
    id: 'transport',
    title: 'Transport & Logistik',
    icon: '',
    description: 'Absicherung für Waren und Fahrzeuge',
    subcategories: [
      {
        id: 'transportversicherung',
        name: 'Transportversicherung',
        tabs: [
          {
            id: 'national',
            name: 'National',
            unterlagen: ['Transportvolumen', 'Warenarten', 'Transportwege']
          },
          {
            id: 'international',
            name: 'International',
            unterlagen: ['Exportlizenz', 'Zolldokumente', 'Incoterms']
          }
        ]
      },
      {
        id: 'fuhrpark',
        name: 'Fuhrparkversicherung',
        tabs: [
          {
            id: 'pkw',
            name: 'PKW-Flotte',
            unterlagen: ['Fahrzeugliste', 'Fahrerliste', 'Kilometerleistung']
          },
          {
            id: 'lkw',
            name: 'LKW-Flotte',
            unterlagen: ['Fahrzeugscheine', 'ADR-Bescheinigungen', 'Wartungsnachweise']
          }
        ]
      }
    ]
  },
  {
    id: 'cyber',
    title: 'Cyber & IT',
    icon: '',
    description: 'Digitale Risiken absichern',
    subcategories: [
      {
        id: 'cyberversicherung',
        name: 'Cyberversicherung',
        tabs: [
          {
            id: 'basis',
            name: 'Basis-Schutz',
            unterlagen: ['IT-Infrastruktur', 'Datenschutzkonzept', 'Notfallplan']
          },
          {
            id: 'komplett',
            name: 'Komplett-Schutz',
            unterlagen: ['Sicherheitsaudit', 'Compliance-Nachweis', 'Incident-Response-Plan']
          }
        ]
      },
      {
        id: 'elektronik',
        name: 'Elektronikversicherung',
        tabs: [
          {
            id: 'hardware',
            name: 'Hardware',
            unterlagen: ['Inventarliste', 'Anschaffungswerte', 'Wartungsverträge']
          },
          {
            id: 'software',
            name: 'Software & Lizenzen',
            unterlagen: ['Lizenzübersicht', 'Software-Inventar', 'Update-Politik']
          }
        ]
      }
    ]
  },
  {
    id: 'immobilien',
    title: 'Immobilien',
    icon: '',
    description: 'Gewerbeimmobilien für Unternehmen',
    subcategories: [
      {
        id: 'kaufen',
        name: 'Kaufen',
        tabs: [
          {
            id: 'standard',
            name: 'Gewerbeimmobilie kaufen',
            unterlagen: [
              'Handelsregisterauszug',
              'Gewerbeanmeldung',
              'Jahresabschluss (letzte 3 Jahre)',
              'BWA (letzte 12 Monate)',
              'Eigenkapitalnachweise (eines oder mehrere der folgenden Dokumente):',
              'Geschäftssparbuch',
              'Geschäftskontoauszug',
              'Betriebliche Lebensversicherung',
              'Geschäftsdepotauszug',
              'Betrieblicher Bausparvertrag',
              'Geschäftsfestgeldnachweis',
              'Finanzierungsbestätigung',
              'Grundbuchauszug (falls vorhanden)',
              'Exposé der gewünschten Immobilie',
              'Nutzungskonzept',
              'Gesellschaftervertrag',
              'Steuerliche Unbedenklichkeitsbescheinigung'
            ]
          }
        ]
      },
      {
        id: 'verkaufen',
        name: 'Verkaufen',
        tabs: [
          {
            id: 'standard',
            name: 'Gewerbeimmobilie verkaufen',
            unterlagen: [
              'Handelsregisterauszug',
              'Grundbuchauszug',
              'Energieausweis',
              'Grundriss und Lagepläne',
              'Baubeschreibung',
              'Flächenberechnung',
              'Teilungserklärung (falls vorhanden)',
              'Nebenkostenabrechnungen (letzte 3 Jahre)',
              'Mietverträge (bei vermieteten Objekten)',
              'Instandhaltungsnachweis',
              'Brandschutznachweis',
              'Umweltgutachten (falls erforderlich)',
              'Verkehrswertgutachten'
            ]
          }
        ]
      }
    ]
  }
]
