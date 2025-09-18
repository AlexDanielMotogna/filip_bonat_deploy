import React from "react"

interface FileUploadItemProps {
  unterlage: string
  index: number
  fileUploaded?: { file: File }
  progress?: { progress: number; status: string; error?: string }
  onFileChange: (file: File | null) => void
  t: (key: string) => string
}

const FileUploadItem: React.FC<FileUploadItemProps> = ({ unterlage, index, fileUploaded, progress, onFileChange, t }) => {
  // Check if this is a header (ends with ":")
  const isHeader = unterlage.endsWith(":")

  // If it's a header, show only the text without upload functionality
  if (isHeader) {
    return (
      <div className="upload-item header-item">
        <span className="upload-label header-label">{unterlage}</span>
      </div>
    )
  }

  // Normal upload item
  return (
    <div className="upload-item">
      <span className="upload-label">{unterlage}</span>
      <div className="upload-wrapper">
        <input
          id={`file-${index}`}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        />
        <label htmlFor={`file-${index}`} className="file-upload-btn">
          📂 {t("Hochladen")}
        </label>
        <span className="file-name">
          {fileUploaded ? fileUploaded.file.name : t("Keine Datei")}
        </span>
        {progress && (
          <div className="upload-progress">
            <div
              className={`progress-bar ${progress.status}`}
              style={{ width: `${progress.progress}%` }}
            >
              {progress.status === "error"
                ? progress.error
                : `${progress.progress}% ${progress.status}`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUploadItem
