import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const DatenschutzPage: React.FC = () => {
  return (
    <div className="datenschutz-page">
      <Container>
        <Row>
          <Col lg={10} className="mx-auto">
            <div className="datenschutz-content">
              <h1 className="page-title">Datenschutzerklärung</h1>
              <p className="last-updated">Stand: {new Date().toLocaleDateString('de-AT')}</p>

              {/* Verantwortlicher */}
              <section className="datenschutz-section">
                <h2>1. Verantwortlicher</h2>
                <p>
                  Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                </p>
                <div className="contact-info">
                  <p><strong>Filip Bonat</strong><br />
                    Finanzdienstleistungen<br />
                    Österreich</p>

                  <p>
                    <strong>E-Mail:</strong> info@filipbonat.com<br />
                    <strong>Website:</strong> www.filipbonat.com
                  </p>
                </div>
              </section>

              {/* Allgemeine Hinweise */}
              <section className="datenschutz-section">
                <h2>2. Allgemeine Hinweise zur Datenverarbeitung</h2>
                <p>
                  Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p>
                  Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten
                  möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name,
                  Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich,
                  stets auf freiwilliger Basis.
                </p>
              </section>

              {/* Datenerhebung */}
              <section className="datenschutz-section">
                <h2>3. Welche Daten wir erheben</h2>

                <h3>3.1 Kontaktformulare und Anfragen</h3>
                <p>Bei der Nutzung unserer Kontaktformulare erheben wir folgende Daten:</p>
                <ul>
                  <li><strong>Name:</strong> Zur persönlichen Ansprache und Identifikation</li>
                  <li><strong>E-Mail-Adresse:</strong> Zur Kontaktaufnahme und Beantwortung Ihrer Anfrage</li>
                  <li><strong>Telefonnummer:</strong> Für telefonische Rückfragen (optional)</li>
                  <li><strong>Nachricht/Anfrage:</strong> Inhalt Ihrer Anfrage oder Ihres Anliegens</li>
                  <li><strong>Kategorie/Unterkategorie:</strong> Art der gewünschten Dienstleistung</li>
                  <li><strong>Unterlagen:</strong> Informationen über benötigte Dokumente</li>
                  <li><strong>Dateien:</strong> Von Ihnen hochgeladene Dokumente oder Bilder</li>
                </ul>

                <h3>3.2 Schadenmeldungen</h3>
                <p>Bei Schadenmeldungen verarbeiten wir zusätzlich:</p>
                <ul>
                  <li><strong>Schadendetails:</strong> Wann, wo und wie der Schaden entstanden ist</li>
                  <li><strong>Schadenbilder:</strong> Von Ihnen hochgeladene Fotos des Schadens</li>
                  <li><strong>Datum des Schadens:</strong> Zeitpunkt des Schadenereignisses</li>
                </ul>

                <h3>3.3 Kreditanfragen</h3>
                <p>Bei Kreditanfragen über unseren Kreditrechner verarbeiten wir:</p>
                <ul>
                  <li><strong>Kreditbetrag:</strong> Gewünschte Kreditsumme</li>
                  <li><strong>Laufzeit:</strong> Gewünschte Kreditlaufzeit in Monaten</li>
                  <li><strong>Zinssatz und Kosten:</strong> Berechnungsgrundlagen</li>
                  <li><strong>Monatliche Rate:</strong> Berechnete Rückzahlungsrate</li>
                </ul>

                <h3>3.4 Technische Daten</h3>
                <p>Automatisch erhobene Informationen:</p>
                <ul>
                  <li>IP-Adresse (anonymisiert nach der Sitzung)</li>
                  <li>Browser-Typ und -Version</li>
                  <li>Betriebssystem</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Referrer-URL</li>
                </ul>
              </section>

              {/* Rechtsgrundlage */}
              <section className="datenschutz-section">
                <h2>4. Rechtsgrundlage der Verarbeitung</h2>
                <p>Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf folgenden Rechtsgrundlagen:</p>

                <h3>4.1 Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</h3>
                <p>
                  Durch das Aktivieren der Datenschutz-Checkbox in unseren Formularen erteilen Sie
                  uns Ihre ausdrückliche Einwilligung zur Verarbeitung Ihrer Daten für den
                  angegebenen Zweck.
                </p>

                <h3>4.2 Vertragsanbahnung (Art. 6 Abs. 1 lit. b DSGVO)</h3>
                <p>
                  Die Verarbeitung ist erforderlich für die Durchführung vorvertraglicher Maßnahmen,
                  die auf Ihre Anfrage hin erfolgen (Beratung, Angebotserstellung).
                </p>

                <h3>4.3 Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)</h3>
                <p>
                  Zur Wahrung unserer berechtigten Interessen an der Bereitstellung unserer
                  Dienstleistungen und der Kommunikation mit Interessenten.
                </p>
              </section>

              {/* Zweck der Datenverarbeitung */}
              <section className="datenschutz-section">
                <h2>5. Zweck der Datenverarbeitung</h2>
                <p>Wir verwenden Ihre Daten ausschließlich für folgende Zwecke:</p>
                <ul>
                  <li>Bearbeitung und Beantwortung Ihrer Anfragen</li>
                  <li>Bereitstellung von Finanzdienstleistungen und Beratung</li>
                  <li>Kommunikation bezüglich Ihrer Anfrage oder Ihres Auftrags</li>
                  <li>Bearbeitung von Schadenmeldungen</li>
                  <li>Erstellung von Kreditangeboten</li>
                  <li>Erfüllung gesetzlicher Aufbewahrungspflichten</li>
                  <li>Verbesserung unserer Website und Dienstleistungen</li>
                </ul>
              </section>

              {/* Datenspeicherung */}
              <section className="datenschutz-section">
                <h2>6. Datenspeicherung und -sicherheit</h2>

                <h3>6.1 Speicherort</h3>
                <p>
                  Ihre Daten werden in einer sicheren MongoDB-Datenbank gespeichert.
                  Hochgeladene Dateien werden über den sicheren Cloud-Service Cloudinary verwaltet.
                </p>

                <h3>6.2 Speicherdauer</h3>
                <ul>
                  <li><strong>Anfragen:</strong> 3 Jahre nach letztem Kontakt</li>
                  <li><strong>Schadenmeldungen:</strong> 10 Jahre (gesetzliche Aufbewahrungspflicht)</li>
                  <li><strong>Kreditanfragen:</strong> 3 Jahre nach Anfrage</li>
                  <li><strong>Technische Logs:</strong> 30 Tage</li>
                </ul>

                <h3>6.3 Sicherheitsmaßnahmen</h3>
                <p>Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen:</p>
                <ul>
                  <li>SSL/TLS-Verschlüsselung für alle Datenübertragungen</li>
                  <li>Sichere Datenbankverbindungen</li>
                  <li>Regelmäßige Sicherheitsupdates</li>
                  <li>Zugriffsbeschränkungen auf autorisierte Personen</li>
                  <li>Regelmäßige Backups</li>
                </ul>
              </section>

              {/* Ihre Rechte */}
              <section className="datenschutz-section">
                <h2>7. Ihre Rechte</h2>
                <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>

                <h3>7.1 Auskunftsrecht (Art. 15 DSGVO)</h3>
                <p>
                  Sie haben das Recht, Auskunft über die von uns verarbeiteten personenbezogenen
                  Daten zu erhalten.
                </p>

                <h3>7.2 Berichtigungsrecht (Art. 16 DSGVO)</h3>
                <p>
                  Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung
                  unvollständiger Daten zu verlangen.
                </p>

                <h3>7.3 Löschungsrecht (Art. 17 DSGVO)</h3>
                <p>
                  Sie haben das Recht auf Löschung Ihrer Daten, sofern keine gesetzlichen
                  Aufbewahrungspflichten entgegenstehen.
                </p>

                <h3>7.4 Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
                <p>
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.
                </p>

                <h3>7.5 Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                <p>
                  Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und
                  maschinenlesbaren Format zu erhalten.
                </p>

                <h3>7.6 Widerspruchsrecht (Art. 21 DSGVO)</h3>
                <p>
                  Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen.
                </p>

                <h3>7.7 Widerruf der Einwilligung</h3>
                <p>
                  Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
                </p>
              </section>

              {/* Cookies */}
              <section className="datenschutz-section">
                <h2>8. Cookies und ähnliche Technologien</h2>
                <p>
                  Unsere Website verwendet Cookies, um die Funktionalität zu gewährleisten und
                  Ihre Nutzererfahrung zu verbessern.
                </p>

                <h3>8.1 Was sind Cookies?</h3>
                <p>
                  Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden,
                  wenn Sie unsere Website besuchen.
                </p>

                <h3>8.2 Arten von Cookies</h3>
                <ul>
                  <li><strong>Technisch notwendige Cookies:</strong> Für die Grundfunktionen der Website</li>
                  <li><strong>Funktionale Cookies:</strong> Für erweiterte Funktionen und Benutzerfreundlichkeit</li>
                  <li><strong>Session-Cookies:</strong> Werden nach dem Schließen des Browsers gelöscht</li>
                </ul>

                <h3>8.3 Cookie-Verwaltung</h3>
                <p>
                  Sie können Cookies in Ihren Browser-Einstellungen verwalten oder deaktivieren.
                  Beachten Sie, dass dies die Funktionalität der Website beeinträchtigen kann.
                </p>
              </section>

              {/* Drittanbieter */}
              <section className="datenschutz-section">
                <h2>9. Drittanbieter-Services</h2>

                <h3>9.1 Cloudinary (Dateispeicherung)</h3>
                <p>
                  Für die Speicherung hochgeladener Dateien nutzen wir Cloudinary.
                  Die Datenverarbeitung erfolgt auf Grundlage unserer berechtigten Interessen
                  an einer sicheren und effizienten Dateiverwaltung.
                </p>
                <p>
                  Weitere Informationen:
                  <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer">
                    https://cloudinary.com/privacy
                  </a>
                </p>

                <h3>9.2 E-Mail-Versand</h3>
                <p>
                  Für den Versand von E-Mails nutzen wir sichere SMTP-Services.
                  Dabei werden Ihre E-Mail-Adresse und der Nachrichteninhalt übertragen.
                </p>
              </section>

              {/* Kontakt */}
              <section className="datenschutz-section">
                <h2>10. Kontakt und Beschwerden</h2>

                <h3>10.1 Datenschutz-Kontakt</h3>
                <p>
                  Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte wenden Sie sich an:
                </p>
                <div className="contact-info">
                  <p>
                    <strong>E-Mail:</strong> datenschutz@filipbonat.com<br />
                    <strong>Betreff:</strong> Datenschutzanfrage
                  </p>
                </div>

                <h3>10.2 Beschwerderecht</h3>
                <p>
                  Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
                  Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
                </p>
                <p>
                  <strong>Österreichische Datenschutzbehörde:</strong><br />
                  Barichgasse 40-42<br />
                  1030 Wien<br />
                  Telefon: +43 1 52 152-0<br />
                  E-Mail: dsb@dsb.gv.at<br />
                  Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a>
                </p>
              </section>

              {/* Änderungen */}
              <section className="datenschutz-section">
                <h2>11. Änderungen dieser Datenschutzerklärung</h2>
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um sie an
                  geänderte Rechtslagen oder bei Änderungen unserer Dienstleistungen anzupassen.
                  Die jeweils aktuelle Datenschutzerklärung finden Sie stets auf dieser Seite.
                </p>
                <p>
                  <strong>Letzte Aktualisierung:</strong> {new Date().toLocaleDateString('de-AT')}
                </p>
              </section>

              {/* Zurück Button */}
              <div className="back-button-container">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    // Si la página se abrió en una nueva pestaña, cerrarla
                    if (window.history.length <= 1) {
                      window.close()
                    } else {
                      // Si hay historial, ir hacia atrás
                      window.history.back()
                    }
                  }}
                >
                  Schließen
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DatenschutzPage
