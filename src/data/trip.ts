export interface TeeTime {
  course: string
  label: string
  times: string[]
  note?: string
  departure?: string
  isLiv?: boolean
}

export interface TripDay {
  id: string
  date: string
  weekday: string
  short: string
  title: string
  rounds: TeeTime[]
  travel?: string
  highlight?: boolean
}

export const trip = {
  title: 'Málaga Invitational',
  year: 2026,
  subtitle: 'Costa del Sol · Andalucía',
  start: '2026-06-04T20:45:00+02:00',
  playerCount: 12,
}

export const flights = {
  out: {
    label: 'Utreise',
    route: 'Stavanger (SVG) → Málaga (AGP)',
    date: 'Torsdag 4. juni 2026',
    time: '20:45',
    note: 'Alle 12 reiser sammen. Møt opp i god tid – sjekk inn køller som spesialbagasje.',
  },
  homeEarly: {
    label: 'Hjemreise – gruppe 1 (4 stk)',
    route: 'Málaga (AGP) → Stavanger (SVG)',
    date: 'Tirsdag 9. juni 2026',
    time: 'Ettermiddag',
    note: '4 av gjengen reiser hjem på tirsdag.',
  },
  homeLate: {
    label: 'Hjemreise – gruppe 2 (8 stk)',
    route: 'Málaga (AGP) → Stavanger (SVG)',
    date: 'Torsdag 11. juni 2026',
    time: '16:25',
    note: '8 av gjengen blir til torsdag. Siste runde spilles på morgenen – pakk kvelden før.',
  },
}

export const accommodation = {
  name: 'Felles Airbnb – Costa del Sol',
  url: 'https://www.airbnb.no/rooms/23209897',
  checkIn: 'Torsdag 4. juni (sen kveld etter landing)',
  checkOut: 'Torsdag 11. juni',
  notes: [
    'Hele gjengen bor samlet – perfekt base mellom rundene.',
    'Adresse og innsjekk-detaljer finner du i Airbnb-appen.',
    'Leiebil(er) anbefales – banene ligger spredt langs kysten.',
  ],
}

export const schedule: TripDay[] = [
  {
    id: 'thu-04',
    date: '4. juni',
    weekday: 'Torsdag',
    short: 'TOR',
    title: 'Avreise fra Stavanger',
    travel: 'Fly SVG → AGP kl. 20:45. Hent leiebil og kjør til huset.',
    rounds: [],
  },
  {
    id: 'fri-05',
    date: '5. juni',
    weekday: 'Fredag',
    short: 'FRE',
    title: 'Runde 1 – Santana Golf',
    rounds: [
      {
        course: 'Santana Golf',
        label: 'Runde 2 (offisiell start)',
        times: ['15:00'],
        departure: '13:50',
        note: 'Rolig oppstart etter ankomst. Lunsj før avreise.',
      },
    ],
  },
  {
    id: 'sat-06',
    date: '6. juni',
    weekday: 'Lørdag',
    short: 'LØR',
    title: 'La Hacienda Links + LIV Golf',
    highlight: true,
    rounds: [
      {
        course: 'La Hacienda Links (Alcaidesa)',
        label: 'Morgenrunde',
        times: ['08:00', '08:12', '08:24'],
        departure: '06:30',
        note: 'Tidlig start – linksbane helt vest mot Sotogrande.',
      },
      {
        course: 'Real Club Valderrama',
        label: 'LIV Golf Andalucía',
        times: ['Ettermiddag'],
        isLiv: true,
        note: 'Vi går rett fra Hacienda til LIV Golf på Valderrama. Se eget kort under.',
      },
    ],
  },
  {
    id: 'sun-07',
    date: '7. juni',
    weekday: 'Søndag',
    short: 'SØN',
    title: 'Los Lagos + Torrequebrada',
    rounds: [
      {
        course: 'Los Lagos (La Cala Resort)',
        label: 'Morgenrunde',
        times: ['10:10', '10:20'],
        departure: '09:00',
      },
      {
        course: 'Torrequebrada',
        label: 'Ettermiddagsrunde',
        times: ['16:30'],
        departure: '15:15',
        note: 'Dobbel golfdag – ta med nok mat og drikke.',
      },
    ],
  },
  {
    id: 'mon-08',
    date: '8. juni',
    weekday: 'Mandag',
    short: 'MAN',
    title: 'Rio Real – dobbel runde',
    rounds: [
      {
        course: 'Rio Real (Marbella)',
        label: 'Morgenrunde',
        times: ['08:30', '08:40', '08:50'],
        departure: '07:25',
      },
      {
        course: 'Rio Real (Marbella)',
        label: 'Ettermiddagsrunde',
        times: ['14:00', '14:10', '14:20'],
        departure: 'På banen',
        note: 'Bli værende på Rio Real mellom rundene – lunsj i klubbhuset.',
      },
    ],
  },
  {
    id: 'tue-09',
    date: '9. juni',
    weekday: 'Tirsdag',
    short: 'TIR',
    title: 'Torrequebrada + Santana',
    rounds: [
      {
        course: 'Torrequebrada',
        label: 'Morgenrunde',
        times: ['08:00', '08:12', '08:24'],
        departure: '06:45',
      },
      {
        course: 'Santana Golf',
        label: 'Ettermiddagsrunde',
        times: ['14:10', '14:20'],
        departure: '13:00',
        note: '4 av gjengen reiser hjem i dag.',
      },
    ],
  },
  {
    id: 'wed-10',
    date: '10. juni',
    weekday: 'Onsdag',
    short: 'ONS',
    title: 'Los Naranjos – dobbel runde',
    rounds: [
      {
        course: 'Los Naranjos (Nueva Andalucía)',
        label: 'Morgenrunde',
        times: ['09:00', '09:10'],
        departure: '07:55',
      },
      {
        course: 'Los Naranjos (Nueva Andalucía)',
        label: 'Ettermiddagsrunde',
        times: ['14:50', '15:00'],
        departure: 'På banen',
      },
    ],
  },
  {
    id: 'thu-11',
    date: '11. juni',
    weekday: 'Torsdag',
    short: 'TOR',
    title: 'Siste runde + hjemreise',
    travel: 'Fly AGP → SVG kl. 16:25 for de siste 8.',
    rounds: [
      {
        course: 'Santana Golf',
        label: 'Avslutningsrunde',
        times: ['08:00', '08:10'],
        departure: '06:45',
        note: 'Rekk flyet – pakk kvelden før og lever leiebil etter runden.',
      },
    ],
  },
]

export const liv = {
  event: 'LIV Golf Andalucía 2026',
  venue: 'Real Club Valderrama, Sotogrande',
  dates: '5.–7. juni 2026',
  ourDay: 'Lørdag 6. juni (runde 2)',
  purse: '20 mill. USD',
  format: '54 hull · shotgun-start · 54 spillere, 12 lag · ingen cut',
  facts: [
    'En av verdens mest ikoniske baner – vertskap for Ryder Cup 1997.',
    'Spanske stjerner i feltet: Jon Rahm, Sergio García og David Puig.',
    'Shotgun-start betyr at alle lagene starter samtidig – mye action overalt.',
    'Ta med solkrem, vann og lett tursko. Det blir mye gåing i kupert terreng.',
  ],
  tips: [
    'Kom tidlig for parkering – følg shuttle-anvisninger fra arrangøren.',
    'Sjekk billetter/akkreditering i appen før dere drar fra Hacienda.',
    'Følg en gruppe noen hull, og finn et godt punkt ved 18. green til finishen.',
  ],
}

export const tournament = {
  intro:
    'Málaga Invitational er vår egen turnering som spilles parallelt med golfrundene. 12 spillere kjemper om vandretrofeet over uka.',
  format: [
    { label: 'Spillere', value: '12 stk' },
    { label: 'Format', value: 'Stableford / slagspill' },
    { label: 'Handicap', value: '75 % av spillehandicap' },
    { label: 'Scoring', value: 'Golf Gamebook (live leaderboard)' },
  ],
  rules: [
    'OB og vann: 1 straffeslag og slipp ved nærmeste punkt.',
    'Ingen «jungle-drops» – ballen spilles som den ligger, eller standard pliktdrop.',
    'Ingen gimmies – alt skal puttes ut.',
    'Maks score per hull: netto par + 3.',
    'Én mulligan per spiller – kun på utslaget på hull 1.',
  ],
  trophy: [
    'Vinneren blir forvalter av vandretrofeet frem til neste år.',
    'Joakim Solstrand har 2 napp – 3 napp gir permanent eierskap til ballen.',
    'Champions Dinner arrangeres av fjorårsvinneren Sander Bjørnå.',
  ],
}

export const players: string[] = [
  'Joakim Solstrand',
  'Sander Bjørnå',
  'Torbjørn',
  'Jørgen',
  'Victor',
  'Mats',
  'Andreas',
  'Håkon',
  'Anders',
  'Joa',
  'Mikka',
  'Pål',
]
