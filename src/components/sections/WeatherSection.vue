<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Droplets,
  Loader2,
  type LucideIcon,
} from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import SectionHeading from '@/components/SectionHeading.vue'
import { accommodation } from '@/data/trip'

interface Day {
  date: string
  weekday: string
  day: number
  icon: LucideIcon
  label: string
  max: number
  min: number
  rainText: string
}

const days = ref<Day[]>([])
const loading = ref(true)
const failed = ref(false)
const updatedAt = ref('')

const weekdays = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør']

// Map a MET Norway symbol_code (e.g. "partlycloudy_day") to our icon + Norwegian label.
function describeMet(symbol: string): { icon: LucideIcon; label: string } {
  const s = (symbol || '').replace(/_(day|night|polartwilight)$/, '')
  if (s.includes('thunder')) return { icon: CloudLightning, label: 'Torden' }
  if (s.includes('snow')) return { icon: CloudSnow, label: 'Snø' }
  if (s.includes('sleet')) return { icon: CloudSnow, label: 'Sludd' }
  if (s.includes('showers')) return { icon: CloudRain, label: 'Regnbyger' }
  if (s.includes('rain')) return { icon: CloudRain, label: 'Regn' }
  if (s === 'fog') return { icon: CloudFog, label: 'Tåke' }
  if (s === 'cloudy') return { icon: Cloud, label: 'Skyet' }
  if (s === 'partlycloudy') return { icon: CloudSun, label: 'Delvis skyet' }
  if (s === 'fair') return { icon: CloudSun, label: 'Lettskyet' }
  if (s === 'clearsky') return { icon: Sun, label: 'Klart' }
  return { icon: CloudSun, label: 'Lettskyet' }
}

const madridParts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Madrid',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hour12: false,
})

function madridDateHour(iso: string): { date: string; hour: number } {
  const parts = madridParts.formatToParts(new Date(iso))
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    hour: parseInt(get('hour'), 10) % 24,
  }
}

interface MetEntry {
  time: string
  data: {
    instant: { details: { air_temperature?: number } }
    next_1_hours?: {
      summary?: { symbol_code?: string }
      details?: { precipitation_amount?: number }
    }
    next_6_hours?: {
      summary?: { symbol_code?: string }
      details?: { precipitation_amount?: number }
    }
  }
}

async function fetchMet(signal: AbortSignal): Promise<Day[]> {
  const url =
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${accommodation.lat}` +
    `&lon=${accommodation.lon}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error('met fetch failed')
  const data = await res.json()
  const series: MetEntry[] = data?.properties?.timeseries ?? []

  interface Agg {
    temps: number[]
    rain1h: number
    rain6h: number
    has1h: boolean
    middaySymbol?: string
    firstSymbol?: string
    middayDist: number
    minHour: number
    maxHour: number
  }
  const byDate = new Map<string, Agg>()
  const order: string[] = []

  for (const e of series) {
    const { date, hour } = madridDateHour(e.time)
    let agg = byDate.get(date)
    if (!agg) {
      agg = {
        temps: [],
        rain1h: 0,
        rain6h: 0,
        has1h: false,
        middayDist: 99,
        minHour: 24,
        maxHour: -1,
      }
      byDate.set(date, agg)
      order.push(date)
    }
    if (hour < agg.minHour) agg.minHour = hour
    if (hour > agg.maxHour) agg.maxHour = hour
    const t = e.data.instant.details.air_temperature
    if (typeof t === 'number') agg.temps.push(t)

    const r1 = e.data.next_1_hours?.details?.precipitation_amount
    if (typeof r1 === 'number') {
      agg.rain1h += r1
      agg.has1h = true
    }
    const r6 = e.data.next_6_hours?.details?.precipitation_amount
    if (typeof r6 === 'number') agg.rain6h += r6

    const sym =
      e.data.next_1_hours?.summary?.symbol_code ?? e.data.next_6_hours?.summary?.symbol_code
    if (sym) {
      if (agg.firstSymbol === undefined) agg.firstSymbol = sym
      const dist = Math.abs(hour - 13)
      if (dist < agg.middayDist) {
        agg.middayDist = dist
        agg.middaySymbol = sym
      }
    }
  }

  // The first and last buckets of the series are partial days: a page load at 18:00
  // would otherwise show an evening-only "max". Keep only days we have covered from
  // morning to late afternoon.
  const fullDays = order.filter((date) => {
    const agg = byDate.get(date)!
    return agg.minHour <= 9 && agg.maxHour >= 16
  })

  return fullDays.slice(0, 8).map((date): Day => {
    const agg = byDate.get(date)!
    const dt = new Date(date + 'T12:00:00')
    const meta = describeMet(agg.middaySymbol ?? agg.firstSymbol ?? '')
    const rainMm = agg.has1h ? agg.rain1h : agg.rain6h
    return {
      date,
      weekday: weekdays[dt.getDay()],
      day: dt.getDate(),
      icon: meta.icon,
      label: meta.label,
      max: agg.temps.length ? Math.round(Math.max(...agg.temps)) : 0,
      min: agg.temps.length ? Math.round(Math.min(...agg.temps)) : 0,
      rainText: rainMm >= 0.05 ? `${rainMm.toFixed(rainMm < 1 ? 1 : 0)} mm` : '0 mm',
    }
  })
}

async function withTimeout(
  fn: (signal: AbortSignal) => Promise<Day[]>,
  ms: number,
): Promise<Day[]> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fn(ctrl.signal)
  } finally {
    clearTimeout(timer)
  }
}

function stampUpdated() {
  updatedAt.value = new Intl.DateTimeFormat('no-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(new Date())
}

async function load() {
  loading.value = true
  failed.value = false

  // MET Norway (yr.no) – stable, CORS-enabled. Time out and retry a few times.
  const attempts = 3
  for (let i = 0; i < attempts; i++) {
    try {
      days.value = await withTimeout(fetchMet, 8000)
      stampUpdated()
      loading.value = false
      return
    } catch {
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1200))
    }
  }

  failed.value = true
  loading.value = false
}

onMounted(load)
</script>

<template>
  <section id="vaer" class="scroll-mt-20 bg-secondary/40 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Vær"
        title="Værmelding"
        description="Live varsel for Costa del Sol (Mijas) gjennom uka."
      />

      <div v-if="loading" class="flex items-center justify-center py-10 text-muted-foreground">
        <Loader2 class="h-5 w-5 animate-spin" />
        <span class="ml-2 text-sm">Henter værmelding …</span>
      </div>

      <div
        v-else-if="failed"
        class="mx-auto max-w-md rounded-xl border border-border bg-card p-6 text-center"
      >
        <p class="text-sm text-muted-foreground">
          Fikk ikke hentet værmeldingen akkurat nå. Sjekk yr.no eller Met-appen for oppdatert
          varsel.
        </p>
        <button
          type="button"
          class="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          @click="load"
        >
          Prøv igjen
        </button>
      </div>

      <div v-else class="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        <Card
          v-for="(d, i) in days"
          :key="d.date"
          v-reveal="i * 60"
          class="transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
        >
          <CardContent class="flex flex-col items-center p-3 text-center">
            <p class="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {{ d.weekday }} {{ d.day }}
            </p>
            <component :is="d.icon" class="my-2 h-8 w-8 text-accent" />
            <p class="text-lg font-extrabold leading-none tabular-nums">{{ d.max }}°</p>
            <p class="text-xs text-muted-foreground tabular-nums">{{ d.min }}°</p>
            <p
              class="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground tabular-nums"
            >
              <Droplets class="h-3 w-3" /> {{ d.rainText }}
            </p>
          </CardContent>
        </Card>
      </div>

      <p class="mt-4 text-center text-xs text-muted-foreground">
        Kilde: met.no (yr) · nedbør i mm<template v-if="updatedAt">
          · sist oppdatert {{ updatedAt }}</template
        >
      </p>
    </div>
  </section>
</template>
