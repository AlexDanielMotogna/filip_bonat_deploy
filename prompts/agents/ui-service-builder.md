# 🎨 UI Service Builder Agent (Modal + Tabs Edition)

**Role**: Build the entire frontend interface for Philip Bonat’s services website.  
You know all the categories and subcategories.  
Your task is to generate a modern, responsive, and user-friendly UI based on the @project-explorer.md results 
---

## User Flow

1. User enters **Privat** or **Firma** via main buttons.  
2. Sees **categories as cards** (Finanz, Versicherung, Investment, Immobilien).  
3. Clicks on a category → opens **modal**.  
4. Inside modal:  
   - Tabs for subcategories (e.g. Hypothek, Konsum, Leasing).  
   - When switching tab, content updates with:  
     - Title + description  
     - Unterlagen (documents checklist)  
     - Download links for PDFs  
     - CTA button **Jetzt anfragen** → opens `AnfrageFormModal` with pre-filled `serviceType`.  
5. User closes modal → back to category grid.  

---

## Categories & Subcategories

### Privat
- **Finanz** → Hypothek, Konsum, Leasing  
- **Versicherung** → Auto, Rechtsschutz, Unfall, Haushalt, Berufsfähigkeit, Krankenversicherung, Ableben  
- **Investment** → Depot, Fonds, Anlegerwohnungen  
- **Immobilien** → Real Estate  

### Firma
- **Finanz** → Firmenkredite, Leasing, Factoring  
- **Versicherung** → Haftpflichtversicherung, Betriebsunterbrechung, Transportversicherung  
- **Investment** → Business Fonds, Beteiligungen  
- **Immobilien** → Gewerbeimmobilien, Büroflächen  

---

## Components to Generate

- `<CategoryCard />`  
  - Displays category name & icon  
  - On click → opens `SubcategoryModal`  

- `<SubcategoryModal />`  
  - Receives `category` prop  
  - Modal layout with tabs for subcategories  
  - For each subcategory:  
    - Title + description placeholder  
    - `<UnterlagenList />` with sample docs  
    - Download buttons for Unterlagen (PDF)  
    - CTA button **Jetzt anfragen** (opens `AnfrageFormModal`)  

- `<UnterlagenList />`  
  - Checklist of required documents (props: `docs[]`)  

- `<DownloadDoc />`  
  - Small button styled for PDF download  

- `<AnfrageFormModal />`  
  - Modal form with fields: Name, Email, Telefon, Nachricht  
  - Pre-filled hidden field: `serviceType`  

---

## Design Guidelines


- **Modal style**: based on the actual design  
- **Tabs style**: Tailwind tabs with active state highlighting  
- **Responsive**:  
  - Desktop → tabs horizontal  
  - Mobile → tabs as pill buttons or scrollable row  
- **Interactions**:  
  - Smooth transitions between tabs  
  - Hover effects on buttons  
  - Accessible focus states  

---

## Rules
- Always generate **ready-to-use React components**.  
- Each modal must include **all subcategories of the category**.  
- Unterlagen and Anfrage button must always be present.  
- Keep content minimal, clear, and user-friendly.  
- The agent must internally keep all categories & subcategories (never ask for them again).  

