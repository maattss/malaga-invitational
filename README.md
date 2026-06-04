# Málaga Invitational 2026 🏌️‍♂️⛳️

Enkel single-page nettside med all praktisk info for golfturen til Costa del Sol,
4.–11. juni 2026: fly, baneprogram med tee-tider og avreisetider, overnatting,
LIV Golf Andalucía og turneringsregler.

## Teknologi

- **Vue 3** + **TypeScript** (Vite)
- **Tailwind CSS** med **shadcn-vue**-stil komponenter
- Klient-side passord-gate (passord: `2026`)
- Deploy på **Vercel**

## Kom i gang

```bash
nvm use            # Node 20
npm install
npm run dev        # utviklingsserver
npm run build      # produksjonsbygg til dist/
npm run preview    # forhåndsvis bygget
```

## Innhold

All turdata ligger samlet i `src/data/trip.ts` - fly, program, baner, avreisetider,
LIV-info, regler og spillere. Rediger der for å oppdatere siden.

> Avreisetidene er estimater (tee-tid minus kjøring + buffer). Juster ved behov i datafila.
