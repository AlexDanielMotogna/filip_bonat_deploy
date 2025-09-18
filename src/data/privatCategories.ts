import type { Category } from '../types/categories'

export const privatCategories: Category[] = [
  {
    id: 'finanz',
    title: 'Finanz',
    icon: '',
    description: 'Finanzielle Lösungen für Privatkunden',
    subcategories: [
      {
        id: 'hypothek',
        name: 'Hypothek',
        tabs: [
          {
            id: 'standard',
            name: 'Hypothek',
            unterlagen: [
              'Einkommensnachweis',
              'Personalausweis',
              'Grundbuchauszug',
              'Kreditwürdigkeit (Schufa-Auskunft)'
            ]
          }
        ]
      },
      {
        id: 'konsum',
        name: 'Konsumkredit',
        tabs: [
          {
            id: 'standard',
            name: 'Konsumkredit',
            unterlagen: [
              'Einkommensnachweis',
              'Personalausweis',
              'Bankverbindung',
              'Bestehende Kredite'
            ]
          }
        ]
      },
      {
        id: 'leasing',
        name: 'Leasing',
        tabs: [
          {
            id: 'standard',
            name: 'Leasingvertrag',
            unterlagen: [
              'Personalausweis',
              'Einkommensnachweis',
              'Fahrzeugschein / Leasingobjekt-Daten'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'versicherung',
    title: 'Versicherung',
    icon: '',
    description: 'Umfassender Schutz für Ihr Leben und Eigentum',
    subcategories: [
      {
        id: 'auto',
        name: 'Autoversicherung',
        tabs: [
          {
            id: 'standard',
            name: 'KFZ-Versicherung',
            unterlagen: ['Fahrzeugschein', 'Führerschein', 'Schadensfreiheitsrabatt']
          }
        ]
      },
      {
        id: 'rechtsschutz',
        name: 'Rechtsschutz',
        tabs: [
          {
            id: 'standard',
            name: 'Rechtsschutzversicherung',
            unterlagen: ['Personalausweis', 'Berufsnachweis']
          }
        ]
      },
      {
        id: 'unfall',
        name: 'Unfallversicherung',
        tabs: [
          {
            id: 'standard',
            name: 'Unfallversicherung',
            unterlagen: ['Personalausweis', 'Gesundheitsfragebogen']
          }
        ]
      },
      {
        id: 'haushalt',
        name: 'Haushaltsversicherung',
        tabs: [
          {
            id: 'standard',
            name: 'Haushaltversicherung',
            unterlagen: ['Wohnsitznachweis', 'Inventarliste']
          }
        ]
      },
      {
        id: 'beruf',
        name: 'Berufsfähigkeit',
        tabs: [
          {
            id: 'standard',
            name: 'Berufsunfähigkeitsversicherung',
            unterlagen: ['Einkommensnachweis', 'Gesundheitsfragebogen']
          }
        ]
      },
      {
        id: 'kranken',
        name: 'Krankenversicherung',
        tabs: [
          {
            id: 'gesetzlich',
            name: 'Gesetzlich',
            unterlagen: ['Sozialversicherungsausweis', 'Arbeitgeberbescheinigung']
          },
          {
            id: 'privat',
            name: 'Privat',
            unterlagen: ['Gesundheitsprüfung', 'Vorversicherungsnachweis']
          }
        ]
      },
      {
        id: 'ableben',
        name: 'Ablebensversicherung',
        tabs: [
          {
            id: 'standard',
            name: 'Ablebensversicherung',
            unterlagen: ['Personalausweis', 'Gesundheitsprüfung']
          }
        ]
      }
    ]
  },
  {
    id: 'investment',
    title: 'Investment',
    icon: '',
    description: 'Kapitalanlagen für Privatkunden',
    subcategories: [
      {
        id: 'depot',
        name: 'Depot',
        tabs: [
          {
            id: 'standard',
            name: 'Wertpapierdepot',
            unterlagen: ['Personalausweis', 'Steuer-ID', 'Bankverbindung']
          }
        ]
      },
      {
        id: 'fonds',
        name: 'Fonds',
        tabs: [
          {
            id: 'standard',
            name: 'Investmentfonds',
            unterlagen: ['Personalausweis', 'Anlageprofil']
          }
        ]
      },
      {
        id: 'anlegerwohnungen',
        name: 'Anlegerwohnungen',
        tabs: [
          {
            id: 'standard',
            name: 'Immobilieninvestition',
            unterlagen: ['Einkommensnachweis', 'Finanzierungsnachweis']
          }
        ]
      }
    ]
  },
  {
    id: 'immobilien',
    title: 'Immobilien',
    icon: '',
    description: 'Wohn- und Gewerbeimmobilien',
    subcategories: [
      {
        id: 'kaufen',
        name: 'Kaufen',
        tabs: [
          {
            id: 'standard',
            name: 'Immobilie kaufen',
            unterlagen: [
              'Ausweiskopien',
              'Finanzierungsantrag',
              'Kontoauszüge der letzten 6 Monate',
              'Meldezettel',
              'Lohnzettel der letzten 6 Monate:',
              'Lohnzettel Monat 1 (aktuellster)',
              'Lohnzettel Monat 2',
              'Lohnzettel Monat 3',
              'Lohnzettel Monat 4',
              'Lohnzettel Monat 5',
              'Lohnzettel Monat 6 (ältester)',
              'Karenzgeldbescheid (optional)',
              'Sozialversicherungsdatenauszug (optional)',
              'Kreditverträge (optional):',
              'Kreditvertrag 1 (optional)',
              'Kreditvertrag 2 (optional)',
              'Kreditvertrag 3 (optional)',
              'Kreditvertrag 4 (optional)',
              'Kreditvertrag 5 (optional)',
              'Restsaldenbestätigungen',
              'Eigenmittelnachweise (eines oder mehrere der folgenden Dokumente):',
              'Sparbuch',
              'Kontoauszug',
              'Lebensversicherung',
              'Depotauszug',
              'Bausparvertrag',
              'Festgeldnachweis'
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
            name: 'Immobilie verkaufen',
            unterlagen: [
              'Personalausweis',
              'Grundbuchauszug',
              'Energieausweis',
              'Grundriss',
              'Lageplan',
              'Baubeschreibung',
              'Wohnflächenberechnung',
              'Teilungserklärung (bei Eigentumswohnung)',
              'Hausgeld-/Nebenkostenabrechnungen (letzte 3 Jahre)',
              'Mietverträge (bei vermieteten Objekten)',
              'Reparatur- und Modernisierungsnachweise'
            ]
          }
        ]
      }
    ]
  }
]
