// Cost-of-living index by city, New York City = 100.
// Values are an overall cost of living INCLUDING housing, calibrated to published
// cost-of-living indices (mid-2020s). They are illustrative/educational, not a live feed.
// Higher = more expensive than New York; lower = cheaper.
//
// To upgrade to a live/licensed data source later, replace getColIndex() with an API call
// that returns the same NYC=100 basis — nothing else in the app needs to change.

export const CITY_COL_INDEX = {
  // ---------- North America: United States (primary selector) ----------
  'New York': 100, 'Los Angeles': 79, 'San Francisco': 97, 'Chicago': 74,
  'Boston': 85, 'Seattle': 84, 'Austin': 71, 'Miami': 76, 'Denver': 73, 'Portland': 74,
  // Additional US cities (states selector)
  'San Diego': 82, 'San Jose': 95, 'Sacramento': 72,
  'Birmingham': 55, 'Montgomery': 53, 'Mobile': 54,
  'Anchorage': 78, 'Fairbanks': 76, 'Juneau': 80,
  'Phoenix': 66, 'Tucson': 60, 'Mesa': 65,
  'Little Rock': 54, 'Fort Smith': 51, 'Fayetteville': 55,
  'Colorado Springs': 66, 'Aurora': 70,
  'Hartford': 68, 'New Haven': 69, 'Stamford': 84,
  'Wilmington': 66, 'Dover': 61, 'Newark': 78,
  'Orlando': 66, 'Tampa': 66, 'Jacksonville': 62,
  'Atlanta': 68, 'Augusta': 55, 'Columbus': 60,
  'Honolulu': 92, 'Hilo': 82, 'Kailua': 90,
  'Boise': 63, 'Meridian': 62, 'Nampa': 59,
  'Naperville': 72,
  'Indianapolis': 58, 'Fort Wayne': 54, 'Evansville': 53,
  'Des Moines': 58, 'Cedar Rapids': 55, 'Davenport': 54,
  'Wichita': 53, 'Overland Park': 60, 'Kansas City': 58,
  'Louisville': 57, 'Lexington': 57, 'Bowling Green': 54,
  'New Orleans': 62, 'Baton Rouge': 57, 'Shreveport': 53,
  'Lewiston': 61, 'Bangor': 60,
  'Baltimore': 72, 'Frederick': 74, 'Rockville': 82,
  'Worcester': 70, 'Springfield': 60,
  'Detroit': 58, 'Grand Rapids': 60, 'Warren': 58,
  'Minneapolis': 67, 'Saint Paul': 66, 'Rochester': 61,
  'Jackson': 52, 'Gulfport': 53, 'Southaven': 54,
  'Saint Louis': 58,
  'Billings': 62, 'Missoula': 66, 'Great Falls': 59,
  'Omaha': 58, 'Lincoln': 57, 'Bellevue': 58,
  'Las Vegas': 68, 'Henderson': 70, 'Reno': 71,
  'Manchester': 72, 'Nashua': 72, 'Concord': 70,
  'Jersey City': 86, 'Paterson': 74,
  'Albuquerque': 60, 'Las Cruces': 56, 'Rio Rancho': 59,
  'Buffalo': 62,
  'Charlotte': 66, 'Raleigh': 66, 'Greensboro': 58,
  'Fargo': 60, 'Bismarck': 61, 'Grand Forks': 59,
  'Cleveland': 58, 'Cincinnati': 59,
  'Oklahoma City': 55, 'Tulsa': 54, 'Norman': 55,
  'Salem': 66, 'Eugene': 68,
  'Philadelphia': 72, 'Pittsburgh': 64, 'Allentown': 66,
  'Providence': 72, 'Warwick': 70, 'Cranston': 70,
  'Charleston': 63, 'Columbia': 58, 'North Charleston': 62,
  'Sioux Falls': 60, 'Rapid City': 61, 'Aberdeen': 57,
  'Nashville': 66, 'Memphis': 56, 'Knoxville': 57,
  'Houston': 63, 'San Antonio': 60, 'Dallas': 67,
  'Salt Lake City': 70, 'West Valley City': 66, 'Provo': 66,
  'Burlington': 72, 'South Burlington': 71, 'Rutland': 64,
  'Virginia Beach': 68, 'Norfolk': 66, 'Chesapeake': 67,
  'Spokane': 66, 'Tacoma': 74,
  'Huntington': 53, 'Morgantown': 56,
  'Milwaukee': 62, 'Madison': 66, 'Green Bay': 58,
  'Cheyenne': 62, 'Casper': 61, 'Laramie': 60,

  // ---------- North America: Canada ----------
  'Toronto': 71, 'Vancouver': 72, 'Montreal': 61, 'Calgary': 62, 'Ottawa': 63, 'Edmonton': 58,

  // ---------- North America: Mexico ----------
  'Mexico City': 42, 'Guadalajara': 37, 'Monterrey': 40, 'Cancun': 38, 'Tijuana': 39,

  // ---------- Europe: United Kingdom ----------
  'London': 86, 'Edinburgh': 67, 'Birmingham (UK)': 61, 'Bristol': 66,

  // ---------- Europe: Germany ----------
  'Berlin': 70, 'Munich': 76, 'Frankfurt': 72, 'Hamburg': 71, 'Cologne': 68,

  // ---------- Europe: France ----------
  'Paris': 82, 'Lyon': 66, 'Marseille': 61, 'Toulouse': 62, 'Nice': 70,

  // ---------- Europe: Spain ----------
  'Madrid': 62, 'Barcelona': 64, 'Valencia': 54, 'Seville': 53, 'Bilbao': 58,

  // ---------- Europe: Italy ----------
  'Rome': 66, 'Milan': 72, 'Florence': 65, 'Venice': 66, 'Naples': 57,

  // ---------- Europe: Netherlands ----------
  'Amsterdam': 78, 'Rotterdam': 68, 'The Hague': 69, 'Utrecht': 71,

  // ---------- Europe: Switzerland ----------
  'Zurich': 101, 'Geneva': 99, 'Basel': 92, 'Bern': 90,

  // ---------- Europe: Sweden ----------
  'Stockholm': 71, 'Gothenburg': 66, 'Malmo': 63,

  // ---------- Europe: Norway ----------
  'Oslo': 82, 'Bergen': 79, 'Trondheim': 77,

  // ---------- Europe: Denmark ----------
  'Copenhagen': 80, 'Aarhus': 73, 'Odense': 70,

  // ---------- Europe: Ireland ----------
  'Dublin': 76, 'Cork': 66, 'Galway': 64,

  // ---------- Europe: Portugal ----------
  'Lisbon': 55, 'Porto': 50, 'Faro': 48,

  // ---------- Europe: Austria ----------
  'Vienna': 68, 'Salzburg': 66, 'Innsbruck': 67,

  // ---------- Europe: Belgium ----------
  'Brussels': 69, 'Antwerp': 66, 'Ghent': 64,

  // ---------- Europe: Poland ----------
  'Warsaw': 48, 'Krakow': 44, 'Wroclaw': 43,

  // ---------- Europe: Czech Republic ----------
  'Prague': 52, 'Brno': 47, 'Ostrava': 44,

  // ---------- Asia: Japan ----------
  'Tokyo': 82, 'Osaka': 72, 'Kyoto': 70, 'Yokohama': 74, 'Fukuoka': 66,

  // ---------- Asia: China ----------
  'Shanghai': 66, 'Beijing': 64, 'Shenzhen': 62, 'Guangzhou': 55, 'Hong Kong': 88,

  // ---------- Asia: Singapore ----------
  'Singapore': 92,

  // ---------- Asia: South Korea ----------
  'Seoul': 78, 'Busan': 66, 'Incheon': 64,

  // ---------- Asia: India ----------
  'Mumbai': 33, 'Delhi': 30, 'Bangalore': 32, 'Hyderabad': 28, 'Chennai': 28, 'Pune': 29,

  // ---------- Asia: Thailand ----------
  'Bangkok': 48, 'Chiang Mai': 40, 'Phuket': 46,

  // ---------- Asia: Vietnam ----------
  'Ho Chi Minh City': 40, 'Hanoi': 38, 'Da Nang': 36,

  // ---------- Asia: Malaysia ----------
  'Kuala Lumpur': 42, 'Penang': 38, 'Johor Bahru': 39,

  // ---------- Asia: Indonesia ----------
  'Jakarta': 42, 'Bali': 44, 'Surabaya': 38,

  // ---------- Asia: Philippines ----------
  'Manila': 42, 'Cebu': 38, 'Davao': 36,

  // ---------- Asia: Taiwan ----------
  'Taipei': 62, 'Kaohsiung': 55, 'Taichung': 56,

  // ---------- Asia: UAE ----------
  'Dubai': 70, 'Abu Dhabi': 68,

  // ---------- Asia: Israel ----------
  'Tel Aviv': 88, 'Jerusalem': 76, 'Haifa': 72,

  // ---------- Oceania: Australia ----------
  'Sydney': 83, 'Melbourne': 75, 'Brisbane': 73, 'Perth': 71, 'Adelaide': 69,

  // ---------- Oceania: New Zealand ----------
  'Auckland': 74, 'Wellington': 72, 'Christchurch': 68,

  // ---------- South America: Brazil ----------
  'São Paulo': 44, 'Rio de Janeiro': 43, 'Brasília': 42, 'Salvador': 37,

  // ---------- South America: Argentina ----------
  'Buenos Aires': 40, 'Córdoba': 35, 'Rosario': 35,

  // ---------- South America: Chile ----------
  'Santiago': 47, 'Valparaíso': 43, 'Concepción': 42,

  // ---------- South America: Colombia ----------
  'Bogotá': 38, 'Medellín': 35, 'Cartagena': 36,

  // ---------- South America: Peru ----------
  'Lima': 40, 'Cusco': 34, 'Arequipa': 33,

  // ---------- Africa: South Africa ----------
  'Cape Town': 45, 'Johannesburg': 43, 'Durban': 41,

  // ---------- Africa: Kenya ----------
  'Nairobi': 42, 'Mombasa': 37,

  // ---------- Africa: Egypt ----------
  'Cairo': 33, 'Alexandria': 30,

  // ---------- Africa: Morocco ----------
  'Casablanca': 40, 'Marrakech': 38, 'Rabat': 39,

  // ---------- Africa: Nigeria ----------
  'Lagos': 40, 'Abuja': 39
};

// Country-average index, used only as a fallback if a city is ever missing.
export const COUNTRY_AVG_COL = {
  'United States': 66, 'Canada': 64, 'Mexico': 39,
  'United Kingdom': 68, 'Germany': 71, 'France': 68, 'Spain': 58, 'Italy': 65,
  'Netherlands': 72, 'Switzerland': 96, 'Sweden': 67, 'Norway': 79, 'Denmark': 74,
  'Ireland': 69, 'Portugal': 51, 'Austria': 67, 'Belgium': 66, 'Poland': 45, 'Czech Republic': 48,
  'Japan': 73, 'China': 67, 'Singapore': 92, 'South Korea': 69, 'India': 30,
  'Thailand': 45, 'Vietnam': 38, 'Malaysia': 40, 'Indonesia': 41, 'Philippines': 39,
  'Taiwan': 58, 'UAE': 69, 'Israel': 79,
  'Australia': 74, 'New Zealand': 71,
  'Brazil': 42, 'Argentina': 37, 'Chile': 44, 'Colombia': 36, 'Peru': 36,
  'South Africa': 43, 'Kenya': 40, 'Egypt': 32, 'Morocco': 39, 'Nigeria': 40
};

// Return the NYC=100 cost-of-living index for a city, falling back to the country
// average, then to a neutral 60 if truly unknown.
export function getColIndex(city, country) {
  if (city && Object.prototype.hasOwnProperty.call(CITY_COL_INDEX, city)) {
    return CITY_COL_INDEX[city];
  }
  if (country && Object.prototype.hasOwnProperty.call(COUNTRY_AVG_COL, country)) {
    return COUNTRY_AVG_COL[country];
  }
  return 60;
}
