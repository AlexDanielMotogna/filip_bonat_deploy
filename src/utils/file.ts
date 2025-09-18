export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      console.log(`🔍 File to Base64: ${file.name}`)
      console.log(`📄 Original MIME: ${file.type}`)
      console.log(`📊 Base64 header: ${result.substring(0, 50)}...`)

      // Asegurar que el header tenga el tipo MIME correcto
      if (file.type && !result.includes(file.type)) {
        console.log(`⚠️ MIME type mismatch detected, correcting...`)
        const base64Data = result.split(',')[1]
        const correctedResult = `data:${file.type};base64,${base64Data}`
        console.log(`✅ Corrected header: ${correctedResult.substring(0, 50)}...`)
        resolve(correctedResult)
      } else {
        resolve(result)
      }
    }
    reader.onerror = reject
  })
}
