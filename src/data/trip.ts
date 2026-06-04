export interface Flight {
  name: string
  players: string[]
}

export interface TeeTime {
  course: string
  label: string
  times: string[]
  note?: string
  departure?: string
  isLiv?: boolean
  limited?: boolean
  tournament?: boolean
  estimate?: boolean
  flights?: Flight[]
  flightsNote?: string
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
    time: '16:50',
    note: '4 av gjengen reiser hjem på tirsdag med 16:50-flyet.',
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
  name: 'Villa Luz de Verano',
  location: 'Las Lagunas, Mijas · Andalucía',
  image: '/airbnb.jpg',
  url: 'https://www.airbnb.no/rooms/23209897',
  checkIn: 'Torsdag 4. juni (sen kveld etter landing)',
  checkOut: 'Torsdag 11. juni',
  notes: [
    'Adresse og innsjekk-detaljer finner du i Airbnb-appen.',
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
    title: 'Turneringsrunde 1 – Torrequebrada',
    rounds: [
      {
        course: 'Torrequebrada Golf Club',
        label: 'Turneringsrunde 1',
        times: ['15:00'],
        departure: '13:00',
        tournament: true,
        estimate: true,
        note: 'Eventyret starter her. Rolig oppstart etter ankomst – tonen settes.',
        flights: [
          { name: 'Flight 1', players: ['Solstrand', 'Sander', 'Torbjørn', 'Jørgen'] },
          { name: 'Flight 2', players: ['Victor', 'Mats', 'Andreas', 'Håkon'] },
          { name: 'Flight 3', players: ['Fjelde', 'Joa', 'Mikka', 'Pål'] },
        ],
      },
    ],
  },
  {
    id: 'sat-06',
    date: '6. juni',
    weekday: 'Lørdag',
    short: 'LØR',
    title: 'Turneringsrunde 2 – La Hacienda + LIV Golf',
    highlight: true,
    rounds: [
      {
        course: 'La Hacienda Links (Alcaidesa)',
        label: 'Turneringsrunde 2',
        times: ['08:00', '08:12', '08:24'],
        departure: '06:00',
        tournament: true,
        note: 'Tidlig start – linksbane helt vest mot Sotogrande. Nærmest hjemmebane for Håkon.',
        flights: [
          { name: 'Flight 1', players: ['Joa', 'Pål', 'Jørgen', 'Andreas'] },
          { name: 'Flight 2', players: ['Solstrand', 'Victor', 'Torbjørn', 'Fjelde'] },
          { name: 'Flight 3', players: ['Mats', 'Håkon', 'Mikka', 'Sander'] },
        ],
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
    title: 'Los Lagos + Turneringsrunde 3 (Santana)',
    rounds: [
      {
        course: 'Los Lagos (La Cala Resort)',
        label: 'Morgenrunde (sosial)',
        times: ['10:10', '10:20'],
        departure: '08:40',
        limited: true,
        note: 'Frivillig ekstrarunde – kun de 8 mest ivrige spiller. Teller ikke i turneringen.',
      },
      {
        course: 'Santana Golf Club',
        label: 'Turneringsrunde 3',
        times: ['16:30'],
        departure: '14:45',
        tournament: true,
        estimate: true,
        note: 'Kjente trakter for de fleste – her er det mulig å hente inn det tapte.',
        flights: [
          { name: 'Flight 1', players: ['Mats', 'Victor', 'Sander', 'Fjelde'] },
          { name: 'Flight 2', players: ['Håkon', 'Andreas', 'Solstrand', 'Pål'] },
          { name: 'Flight 3', players: ['Mikka', 'Jørgen', 'Joa', 'Torbjørn'] },
        ],
      },
    ],
  },
  {
    id: 'mon-08',
    date: '8. juni',
    weekday: 'Mandag',
    short: 'MAN',
    title: 'Turneringsrunde 4 & 5 – Rio Real',
    rounds: [
      {
        course: 'Rio Real (Marbella)',
        label: 'Turneringsrunde 4',
        times: ['08:30', '08:40', '08:50'],
        departure: '06:55',
        tournament: true,
        flightsNote: 'Gruppene avgjøres basert på leaderboarden etter de tre innledende rundene.',
      },
      {
        course: 'Rio Real (Marbella)',
        label: 'Turneringsrunde 5',
        times: ['14:00', '14:10', '14:20'],
        departure: 'På banen',
        tournament: true,
        note: 'To runder, én dag, null nåde – her avgjøres det hele. Bli på Rio Real mellom rundene.',
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
        departure: '06:15',
        note: 'Mulig playoff: står to eller flere likt etter de fem turneringsrundene, avgjøres det med matchplay head-to-head over 18 hull her tirsdag morgen.',
      },
      {
        course: 'Santana Golf',
        label: 'Ettermiddagsrunde',
        times: ['14:10', '14:20'],
        departure: '12:30',
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
        departure: '07:25',
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
        departure: '06:15',
        note: 'Rekk flyet – pakk kvelden før og lever leiebil etter runden.',
      },
    ],
  },
]

export const liv = {
  event: 'LIV Golf Andalucía 2026',
  venue: 'Real Club Valderrama, Sotogrande',
  dates: '4.–7. juni 2026 (tor–søn)',
  ourDay: 'Lørdag 6. juni (runde 3)',
  purse: '20 mill. USD',
  website: 'https://www.livgolf.com/tournaments/andalucia',
  format: '72 hull · 4 runder · shotgun-start · 54 spillere · ingen cut',
  ticket: {
    type: 'Ground Pass Plus',
    summary: 'Vi har kjøpt Ground Pass Plus-billetter til gjengen.',
    includes: [
      'Full tilgang til hele banen og fan-områdene gjennom hele dagen.',
      'Tilgang til Ground Pass Plus-loungen med skjermet sitteareal og skygge.',
      'Egne bar- og serveringsområder (mat og drikke kjøpes i tillegg).',
      'Tilgang til scene-/konsertområdet etter siste putt.',
    ],
  },
  facts: [
    'En av verdens mest ikoniske baner – vertskap for Ryder Cup 1997.',
    'Spanske stjerner i feltet: Jon Rahm, Sergio García og David Puig.',
    'Shotgun-start betyr at alle lagene starter samtidig – mye action overalt.',
    'Nytt i år: 72 hull over 4 dager – vi ser runde 3 (lørdag) live.',
    'Finaledagen er søndag 7. juni (runde 4) – da avgjøres det hele.',
    'Konsert/show på området etter spillet – sjekk dagens artist i LIV-appen.',
  ],
  tips: [
    'Ha billetter/QR-koder klare i LIV Golf-appen før dere drar fra Hacienda.',
    'Kom tidlig for parkering – følg shuttle-anvisninger fra arrangøren.',
    'Bruk Ground Pass Plus-loungen som base og møtepunkt utover dagen.',
    'Følg en gruppe noen hull, og finn et godt punkt ved 18. green til finishen.',
    'Ta med solkrem, vann og lett tursko – mye gåing i kupert terreng.',
  ],
}

export const tournament = {
  intro:
    'Málaga Invitational er vår egen turnering – 90 hulls slagspill over fem runder og fire baner. Turneringen avgjøres fredag ettermiddag (Torrequebrada), lørdag morgen (La Hacienda), søndag ettermiddag (Santana) og begge rundene mandag (Rio Real). Øvrige runder i uka er sosiale.',
  format: [
    { label: 'Spillere', value: '12 stk' },
    { label: 'Format', value: 'Slagspill · 90 hull / 5 runder' },
    { label: 'Baner', value: '4 baner over 4 dager' },
    { label: 'Handicap', value: '75 % av spillehandicap' },
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

export interface Player {
  name: string
  hcp: number
  seed: string
  funFact: string
  leader?: boolean
}

export const players: Player[] = [
  {
    name: 'Victor Gabrielsen',
    hcp: 3.0,
    seed: 'Victor-G',
    leader: true,
    funFact: 'Turens reiseleder og lavest i handicap – sjefen både i bussen og på fairway. Det han sier, gjelder (helt til neste putt).',
  },
  {
    name: 'Joachim Boxill Knutsen',
    hcp: 7.7,
    seed: 'Joachim-BK',
    funFact: 'Én av tre Boxill-brødre på turen – laveste handicap av brødrene og lar dem aldri glemme det.',
  },
  {
    name: 'Torbjørn Berge',
    hcp: 11.2,
    seed: 'Torbjorn-B',
    funFact: 'Stødig som et fjell på fairway – derav etternavnet.',
  },
  {
    name: 'Joakim Solstrand',
    hcp: 11.4,
    seed: 'Joakim-S',
    funFact: 'Regjerende rekordholder med 2 napp i vandretrofeet – jakter nappet for evig eierskap.',
  },
  {
    name: 'Andreas Boxill Knutsen',
    hcp: 12.0,
    seed: 'Andreas-BK',
    funFact: 'Bror nummer to i Boxill-trioen – kjemper en evig kamp mot Joachim og Michael om familiens bragging rights.',
  },
  {
    name: 'Sander Bjørnå',
    hcp: 13.0,
    seed: 'Sander-B',
    funFact: 'Fjorårets vinner og vert for Champions Dinner – tittelforsvarer i Málaga.',
  },
  {
    name: 'Anders Fjelde',
    hcp: 16.3,
    seed: 'Anders-F',
    funFact: 'Spiller best når det står en cerveza og venter på 19. hull.',
  },
  {
    name: 'Paal Lilleås',
    hcp: 18.0,
    seed: 'Paal-L',
    funFact: 'Eksakt 18 i handicap – én bogey per hull er planen, og den funker.',
  },
  {
    name: 'Michael Boxill',
    hcp: 19.0,
    seed: 'Michael-B',
    funFact: 'Den tredje Boxill-broren – høyest handicap av de tre, men hevder bestemt at han er den med mest stil.',
  },
  {
    name: 'Håkon Høiland',
    hcp: 22.5,
    seed: 'Hakon-H',
    funFact: 'Lengst driver i gjengen … når den treffer fairway.',
  },
  {
    name: 'Mats Tyldum',
    hcp: 23.3,
    seed: 'Mats-T',
    funFact: 'Turens webmaster – laget hele denne siden mellom rundene (og bruker det som unnskyldning for hver bogey).',
  },
  {
    name: 'Jørgen Håstø Borgenvik',
    hcp: 26.0,
    seed: 'Jorgen-HB',
    funFact: 'Høyest handicap betyr flest slag for pengene – maks valuta for greenfee.',
  },
]
