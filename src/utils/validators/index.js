import {
  CON,
  VIH,
  SSR,
  MAC,
  LPI,
  DC,
  TEEN,
  AUTOCOMPLETE,
  GEOLOCATE,
  RATE,
  DISTANCE,
  ES,
  PT,
  EN,
  AR,
  CL,
  UY,
  BR,
  PY,
  BO,
  PE,
  EC,
  CO,
  VE,
  GY,
  FG,
  SR
} from '../../constants/action-types'

export const availiableServices = [CON, VIH, SSR, MAC, LPI, DC, TEEN]
export const availiableCountries = [AR, CL, UY, BR, PY, BO, PE, EC, CO, VE, GY, FG, SR]
export const availiableLangs = [ES, PT, EN]
export const availiableSortEngines = [RATE, DISTANCE]
export const availiableSearchEngines = [AUTOCOMPLETE, GEOLOCATE, TEEN]
