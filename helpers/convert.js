const Convert = {
  stringToColor(str) {
    if (str == null) return '#eee'

    let hash = 0
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'
    for (var i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF
      color += ('00' + value.toString(16)).substr(-2)
    }
    return color
  },
  hexToRgb(hex, alpha) {
    hex = hex.replace('#', '')
    const r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16)
    const g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16)
    const b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16)
    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')'
    }
  },
  stringToHex: function (str) {
    return Array.from(str).map(c =>
      c.charCodeAt(0) < 128
        ? c.charCodeAt(0).toString(16).padStart(2, '0')
        : encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
    ).join('')
  },
  hexToString: function (hex) {
    try {
      return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'))
    }
    catch (err) {
      return false
    }
  },
  formatId(number) {
    return new Intl.NumberFormat('ID').format(number)
  },
  formatRupiah(value) {
    const locale = 'id-ID'
    const currency = 'IDR'
    const symbol = (0)
      .toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      .replace(/\d/g, '')
      .trim()

    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(value)
    return formatted.replace(symbol, '').trim()
  },
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  },
  generateUniqueString() {
    const ts = String(new Date().getTime())
    let i = 0
    let out = ''

    for (i = 0; i < ts.length; i += 2) {
      out += Number(ts.substr(i, 2)).toString(36)
    }

    return (out)
  },
  toWhatsappMarkup(text) {
    // bold
    text = text.replace(/\*(.*?)\*/g, "<strong> $1 </strong>");
    // italic
    text = text.replace(/_(.*?)_/g, "<i> $1 </i>");
    // Strikethrough
    text = text.replace(/~(.*?)~/g, "<s>$1</s>");
    // Monospace
    text = text.replace(/```(.*?)```/g, "<tt>$1</tt>");
    return text;
  },
}

export default Convert
