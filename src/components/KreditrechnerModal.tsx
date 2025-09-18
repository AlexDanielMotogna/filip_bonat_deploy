import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  parseATNumber,
  formatCurrency,
  calculateMonthlyPayment,
  formatNumber,
} from "../utils/kreditUtils";
import KreditAnfrageModal from "./KreditAnfrageModal";

interface KreditrechnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KreditrechnerModal: React.FC<KreditrechnerModalProps> = ({ isOpen, onClose }) => {
  const [kreditbetrag, setKreditbetrag] = useState<number>(75000);
  const [laufzeit, setLaufzeit] = useState<number>(60);
  const [zinssatz, setZinssatz] = useState<number>(5);
  const [kreditkosten, setKreditkosten] = useState<number>(3);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showKreditAnfrage, setShowKreditAnfrage] = useState(false);

  // Raw input values for fields that need comma support
  const [zinssatzInput, setZinssatzInput] = useState<string>("");
  const [kreditkostenInput, setKreditkostenInput] = useState<string>("");

  const { t } = useTranslation();

  const kreditbetragInkl = kreditbetrag * (1 + kreditkosten / 100);
  const monatlicheRate = calculateMonthlyPayment(kreditbetragInkl, laufzeit, zinssatz);
  const gesamtrueckzahlung = monatlicheRate * laufzeit;
  const zinsen = gesamtrueckzahlung - kreditbetragInkl;

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2>{t("kreditrechner")}</h2>
            <p>Berechne einfach deinen Kredit: Stelle Kreditbetrag, Laufzeit, Zinssatz und Kosten ein.</p>
          </div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="modal-body">
          <div className="form-section">
            <p style={{ marginBottom: "30px", fontSize: "14px", fontWeight: 400 }}>
              Berechne einfach deinen Kredit: Stelle Kreditbetrag, Laufzeit, Zinssatz und Kosten ein.
              Sofort siehst du die monatliche Rate, die Gesamtrückzahlung und die Zinsen.
              Zufrieden? Dann stelle direkt eine unverbindliche Anfrage.
            </p>

            {/* Kreditbetrag */}
            <div className="form-group">
              <label htmlFor="kreditbetrag">{t("Kreditbetrag")}</label>
              <div className="kredit-input-group">
                <input
                  id="kreditbetrag"
                  type="text"
                  className="form-input"
                  value={
                    editingField === "kreditbetrag"
                      ? kreditbetrag.toString().replace(".", ",")
                      : kreditbetrag === 0
                        ? ""
                        : formatNumber(kreditbetrag, 2)
                  }
                  onFocus={() => setEditingField("kreditbetrag")}
                  onBlur={() => setEditingField(null)}
                  onChange={(e) => {
                    // Only allow numbers and comma
                    const filteredValue = e.target.value.replace(/[^0-9,]/g, "");
                    setKreditbetrag(parseATNumber(filteredValue));
                  }}
                />
                <input
                  type="range"
                  className="kredit-range"
                  value={kreditbetrag}
                  onChange={(e) => setKreditbetrag(Number(e.target.value))}
                  min="1"
                  max="1500000"
                  step="10"
                />
              </div>
            </div>

            {/* Laufzeit */}
            <div className="form-group">
              <label htmlFor="laufzeit">{t("Laufzeit in Monaten")}</label>
              <div className="kredit-input-group">
                <input
                  id="laufzeit"
                  type="text"
                  className="form-input"
                  value={laufzeit.toString()}
                  onChange={(e) => {
                    // Only allow numbers and comma
                    const filteredValue = e.target.value.replace(/[^0-9,]/g, "");
                    setLaufzeit(parseATNumber(filteredValue));
                  }}
                />
                <input
                  type="range"
                  className="kredit-range"
                  value={laufzeit}
                  onChange={(e) => setLaufzeit(Number(e.target.value))}
                  min="1"
                  max="120"
                  step="1"
                />
              </div>
            </div>

            {/* Zinssatz */}
            <div className="form-group">
              <label htmlFor="zinssatz">{t("Zinssatz")}</label>
              <div className="kredit-input-group">
                <input
                  id="zinssatz"
                  type="text"
                  className="form-input"
                  value={
                    editingField === "zinssatz"
                      ? zinssatzInput
                      : formatNumber(zinssatz, 2)
                  }
                  onFocus={() => {
                    setEditingField("zinssatz");
                    setZinssatzInput(zinssatz.toString().replace(".", ","));
                  }}
                  onBlur={(e) => {
                    const parsed = parseATNumber(e.target.value);
                    setZinssatz(parsed ?? 0);
                    setEditingField(null);
                  }}
                  onChange={(e) => {
                    // Only allow numbers and comma
                    const filteredValue = e.target.value.replace(/[^0-9,]/g, "");
                    setZinssatzInput(filteredValue);
                    const parsed = parseATNumber(filteredValue);
                    if (parsed !== null) {
                      setZinssatz(parsed);
                    }
                  }}
                />
                <input
                  type="range"
                  className="kredit-range"
                  value={zinssatz}
                  onChange={(e) => setZinssatz(Number(e.target.value))}
                  min="0"
                  max="15"
                  step="0.1"
                />
              </div>
            </div>

            {/* Kreditkosten */}
            <div className="form-group">
              <label htmlFor="kreditkosten">{t("Kreditkosten")}</label>
              <div className="kredit-input-group">
                <input
                  id="kreditkosten"
                  type="text"
                  className="form-input"
                  value={
                    editingField === "kreditkosten"
                      ? kreditkostenInput
                      : formatNumber(kreditkosten, 2)
                  }
                  onFocus={() => {
                    setEditingField("kreditkosten");
                    setKreditkostenInput(kreditkosten.toString().replace(".", ","));
                  }}
                  onBlur={(e) => {
                    const parsed = parseATNumber(e.target.value);
                    setKreditkosten(parsed ?? 0);
                    setEditingField(null);
                  }}
                  onChange={(e) => {
                    // Only allow numbers and comma
                    const filteredValue = e.target.value.replace(/[^0-9,]/g, "");
                    setKreditkostenInput(filteredValue);
                    const parsed = parseATNumber(filteredValue);
                    if (parsed !== null) {
                      setKreditkosten(parsed);
                    }
                  }}
                />
                <input
                  type="range"
                  className="kredit-range"
                  value={kreditkosten}
                  onChange={(e) => setKreditkosten(Number(e.target.value))}
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>

            {/* Results */}
            <div className="kredit-results">
              <div className="result-item">
                <p className="result-label">{t("Monatliche Rate")}</p>
                <h3 className="result-value">{formatCurrency(monatlicheRate)}</h3>
              </div>
              <div className="result-item">
                <p className="result-label">{t("Gesamtrückzahlung")}</p>
                <h3 className="result-value">{formatCurrency(gesamtrueckzahlung)}</h3>
              </div>
              <div className="result-item">
                <p className="result-label">{t("Davon Zinsen")}</p>
                <h3 className="result-value">{formatCurrency(zinsen)}</h3>
              </div>
              <div className="result-summary">
                <small>
                  {t("Kreditbetrag inkl. Kreditkosten")} {formatCurrency(kreditbetragInkl)}
                </small>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              onClick={() => setShowKreditAnfrage(true)}
              className="btn-primary"
            >
              Jetzt Kredit anfragen
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Schließen
            </button>
          </div>
        </div>

        {/* KreditAnfrage Modal */}
        {showKreditAnfrage && (
          <KreditAnfrageModal
            show={showKreditAnfrage}
            onClose={() => setShowKreditAnfrage(false)}
            kreditDetails={{
              kreditbetrag,
              laufzeit,
              zinssatz,
              kreditkosten,
              monatlicheRate,
              gesamtrueckzahlung,
              zinsen
            }}
          />
        )}
      </div>
    </div>
  );
};

export default KreditrechnerModal;
