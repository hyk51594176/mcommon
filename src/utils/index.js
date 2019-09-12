
export const getType = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1)
}
export const isDiff = (o1 = null, o2 = null, key = null) => {
  if (o1 === o2) return false
  if (getType(o1) !== getType(o2)) return true
  if (o1 === null || o2 === null) return true
  if (getType(o1) === 'Array') {
    if (o1.length !== o2.length) return true
    return o1.some((item, index) => isDiff(item, o2[index], key))
  }
  if (getType(o1) === 'Object') {
    return key ? o1[key] !== o2[key] : Object.keys(o1).some((k) => isDiff(o1[k], o2[k], key))
  }
  if (getType(o1) === 'Date') return o1.getTime() !== o2.getTime()
  return true
}

export const currency = (value = 0, currency = '¥', decimals = 2) => {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = value < 0 ? ' -' : ' '
  return (
    currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  )
}
