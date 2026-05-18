export interface LocationData {
  country: string
  countryCode: string
  region: string
  city: string
  postalCode: string
  street: string
  fullAddress: string
  latitude?: number
  longitude?: number
  timezone?: string
}

export interface CountryDefinition {
  name: string
  code: string
  regions: string[]
  cities: string[]
  postalFormatter: () => string
}

const streetNames = [
  'Maple',
  'Elm',
  'Cedar',
  'Oak',
  'Pine',
  'Willow',
  'Birch',
  'Sunset',
  'River',
  'Harvest',
  'Liberty',
  'Cherry',
  'King',
  'Mill',
  'Park',
]

const streetSuffixes = ['St', 'Ave', 'Blvd', 'Ln', 'Way', 'Dr', 'Court', 'Terrace']

const countries: CountryDefinition[] = [
  {
    name: 'United States',
    code: 'US',
    regions: ['California', 'New York', 'Texas', 'Florida', 'Washington', 'Illinois', 'Colorado'],
    cities: ['Los Angeles', 'New York', 'Miami', 'Austin', 'Seattle', 'Chicago', 'Denver'],
    postalFormatter: () => `${randInt(10000, 99999)}`,
  },
  {
    name: 'Canada',
    code: 'CA',
    regions: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Nova Scotia', 'Manitoba'],
    cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Halifax'],
    postalFormatter: () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const digit = '0123456789'
      return `${randChar(letters)}${randChar(digit)}${randChar(letters)} ${randChar(digit)}${randChar(letters)}${randChar(digit)}`
    },
  },
  {
    name: 'United Kingdom',
    code: 'UK',
    regions: ['Greater London', 'Greater Manchester', 'West Midlands', 'West Yorkshire', 'Surrey', 'Kent'],
    cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Liverpool'],
    postalFormatter: () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const digit = '0123456789'
      return `${randChar(letters)}${randChar(letters)}${randInt(1, 9)}${Math.random() > 0.5 ? randChar(digit) : ''} ${randInt(1, 9)}${randChar(letters)}${randChar(letters)}`
    },
  },
  {
    name: 'Germany',
    code: 'DE',
    regions: ['Bavaria', 'Berlin', 'North Rhine-Westphalia', 'Hesse', 'Saxony', 'Hamburg'],
    cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart'],
    postalFormatter: () => `${randInt(10000, 99999)}`,
  },
  {
    name: 'Australia',
    code: 'AU',
    regions: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'],
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    postalFormatter: () => `${randInt(1000, 9999)}`,
  },
  {
    name: 'Japan',
    code: 'JP',
    regions: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Fukuoka'],
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Fukuoka', 'Yokohama'],
    postalFormatter: () => `${randInt(100, 999)}-${randInt(1000, 9999)}`,
  },
]

export function getCountryOptions() {
  return countries.map((country) => country.name)
}

export function generateLocation(countryName: string): LocationData {
  const country = countries.find((entry) => entry.name === countryName) ?? countries[0]
  const region = randomItem(country.regions)
  const city = randomItem(country.cities)
  const street = `${randInt(100, 9999)} ${randomItem(streetNames)} ${randomItem(streetSuffixes)}`
  const postalCode = country.postalFormatter()
  const apartment = Math.random() < 0.4 ? ` Apt ${randInt(2, 999)}` : ''
  const fullAddress = `${street}${apartment}, ${city}, ${region} ${postalCode}, ${country.name}`

  const { latitude, longitude, timezone } = randomCoordinatesAndTimezone(country.code)

  return {
    country: country.name,
    countryCode: country.code,
    region,
    city,
    postalCode,
    street: `${street}${apartment}`,
    fullAddress,
    latitude,
    longitude,
    timezone,
  }
}

function randomCoordinatesAndTimezone(countryCode: string) {
  // Provide plausible coordinate boxes and a representative timezone per country code.
  switch (countryCode) {
    case 'US':
      return {
        latitude: +(randRange(25, 49) + Math.random()).toFixed(5),
        longitude: +(-1 * (randRange(67, 125) + Math.random())).toFixed(5),
        timezone: 'America/Los_Angeles',
      }
    case 'CA':
      return {
        latitude: +(randRange(43, 60) + Math.random()).toFixed(5),
        longitude: +(-1 * (randRange(53, 141) + Math.random())).toFixed(5),
        timezone: 'America/Toronto',
      }
    case 'UK':
      return {
        latitude: +(randRange(50, 58) + Math.random()).toFixed(5),
        longitude: +(-1 * (randRange(1, 6) + Math.random())).toFixed(5),
        timezone: 'Europe/London',
      }
    case 'DE':
      return {
        latitude: +(randRange(47, 55) + Math.random()).toFixed(5),
        longitude: +(randRange(5, 15) + Math.random()).toFixed(5),
        timezone: 'Europe/Berlin',
      }
    case 'AU':
      return {
        latitude: +(-1 * (randRange(10, 43) - Math.random())).toFixed(5),
        longitude: +(randRange(113, 153) + Math.random()).toFixed(5),
        timezone: 'Australia/Sydney',
      }
    case 'JP':
      return {
        latitude: +(randRange(30, 43) + Math.random()).toFixed(5),
        longitude: +(randRange(129, 145) + Math.random()).toFixed(5),
        timezone: 'Asia/Tokyo',
      }
    default:
      return {
        latitude: +(randRange(-20, 60) + Math.random()).toFixed(5),
        longitude: +(randRange(-170, 170) + Math.random()).toFixed(5),
        timezone: 'UTC',
      }
  }
}

function randRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randChar(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)]
}
