// Utility function to group documents into sections for better UX
export const groupDocuments = (unterlagen: string[]) => {
  const sections = [
    {
      title: 'ALLGEMEIN',
      documents: unterlagen.filter(doc =>
        doc.includes('Ausweiskopien') ||
        doc.includes('Finanzierungsantrag') ||
        doc.includes('Kontoauszüge der letzten 6 Monate') ||
        doc.includes('Meldezettel')
      )
    },
    {
      title: 'UNSELBSTSTÄNDIG',
      documents: unterlagen.filter(doc =>
        doc.includes('Lohnzettel der letzten 6 Monate') ||
        doc.includes('Lohnzettel Monat') ||
        doc.includes('Karenzgeldbescheid') ||
        doc.includes('Sozialversicherungsdatenauszug')
      )
    },
    {
      title: 'SELBSTSTÄNDIG',
      documents: unterlagen.filter(doc =>
        doc.includes('Bilanzen') ||
        doc.includes('ESt-Erklärungen') ||
        doc.includes('Saldenliste') ||
        doc.includes('Bestätigung Sozialversicherung und Finanz')
      )
    },
    {
      title: 'VERBINDLICHKEITEN',
      documents: unterlagen.filter(doc =>
        doc.includes('Kreditverträge') ||
        doc.includes('Kreditvertrag') ||
        doc.includes('Restsaldenbestätigungen')
      )
    },
    {
      title: 'EIGENMITTEL',
      documents: unterlagen.filter(doc =>
        doc.includes('Eigenmittelnachweise') ||
        doc.includes('Sparbuch') ||
        doc.includes('Kontoauszug') ||
        doc.includes('Lebensversicherung') ||
        doc.includes('Depotauszug') ||
        doc.includes('Bausparvertrag') ||
        doc.includes('Festgeldnachweis') ||
        doc.includes('Eigenkapitalnachweise') ||
        doc.includes('Geschäftssparbuch') ||
        doc.includes('Geschäftskontoauszug') ||
        doc.includes('Betriebliche Lebensversicherung') ||
        doc.includes('Geschäftsdepotauszug') ||
        doc.includes('Betrieblicher Bausparvertrag') ||
        doc.includes('Geschäftsfestgeldnachweis')
      )
    }
  ].filter(section => section.documents.length > 0) // Only show sections with documents

  // Add ungrouped documents to a general section
  const groupedDocs = sections.flatMap(section => section.documents)
  const ungroupedDocs = unterlagen.filter(doc => !groupedDocs.includes(doc))

  if (ungroupedDocs.length > 0) {
    sections.push({
      title: 'WEITERE DOKUMENTE',
      documents: ungroupedDocs
    })
  }

  return sections
}

// Type definition for document sections
export interface DocumentSection {
  title: string
  documents: string[]
}
