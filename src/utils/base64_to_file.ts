export interface FileConfig {
  name: string
  type: string
}

export default (b64Data: string, fileConfig: FileConfig) => {
  const bstr = atob(b64Data)
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], fileConfig.name, { type: fileConfig.type })
}
