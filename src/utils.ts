export function max (n: number[]): number {
  return Math.max(...n)
}

export function min (n: number[]): number {
  return Math.min(...n)
}

export function round (n: number, precision = 0): number {
  if (precision <= 0) {
    return Math.round(n)
  }
  return Math.ceil((n - precision / 2) / precision) * precision
}

export function roundUp (n: number, precision: number = 0): number {
  if (precision <= 0) {
    return Math.ceil(n)
  }
  return Math.ceil(n / precision) * precision
}

export function roundDown (n: number, precision = 0): number {
  if (precision <= 0) {
    return Math.floor(n)
  }
  return Math.floor(n / precision) * precision
}

const CARDINAL_DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

const NAMED_CARDINAL_DIRECTIONS: Record<string, string> = {
  n: 'N',
  north: 'N',
  nne: 'NE',
  northnortheast: 'NE',
  ne: 'NE',
  northeast: 'NE',
  ene: 'E',
  eastnortheast: 'E',
  e: 'E',
  east: 'E',
  ese: 'SE',
  eastsoutheast: 'SE',
  se: 'SE',
  southeast: 'SE',
  sse: 'S',
  southsoutheast: 'S',
  s: 'S',
  south: 'S',
  ssw: 'SW',
  southsouthwest: 'SW',
  sw: 'SW',
  southwest: 'SW',
  wsw: 'W',
  westsouthwest: 'W',
  w: 'W',
  west: 'W',
  wnw: 'NW',
  westnorthwest: 'NW',
  nw: 'NW',
  northwest: 'NW',
  nnw: 'N',
  northnorthwest: 'N'
}

export function toCardinalDirection (state: string): string | null {
  const trimmed = state.trim()
  if (trimmed === '' || trimmed === 'unknown' || trimmed === 'unavailable' || trimmed === 'none') {
    return null
  }

  const numericText = trimmed.replace(/°/g, '').trim()
  if (/^-?\d+(\.\d+)?$/.test(numericText)) {
    const degrees = Number(numericText)
    const normalized = ((degrees % 360) + 360) % 360
    return CARDINAL_DIRECTIONS[Math.round(normalized / 45) % 8]
  }

  const key = trimmed.toLowerCase().replace(/[\s_-]+/g, '')
  return NAMED_CARDINAL_DIRECTIONS[key] ?? null
}

export function roundIfNotNull (number: number | null): number | null {
  if (number === null) {
    return null
  }

  return Math.round(number)
}
// from https://stackoverflow.com/a/1053865
export function extractMostOccuring<T extends string | number | symbol> (elements: T[]): T {
  const modeMap = new Map<T, number>()
  let maxEl = elements[0]
  let maxCount = 1
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    if (modeMap.get(el) === undefined) {
      modeMap.set(el, 1)
    } else {
      const n = modeMap.get(el) ?? 0
      modeMap.set(el, n + 1)
      if ((modeMap.get(el) ?? 0) > maxCount) {
        maxEl = el
        maxCount = modeMap.get(el) ?? 0
      }
    }
  }
  return maxEl
}
