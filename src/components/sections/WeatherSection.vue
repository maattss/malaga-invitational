<script setup lang="ts">
import { ref, onMounted } from "vue";
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
} from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading.vue";
import { accommodation } from "@/data/trip";

interface Day {
  date: string;
  weekday: string;
  day: number;
  icon: LucideIcon;
  label: string;
  max: number;
  min: number;
  rain: number;
}

const days = ref<Day[]>([]);
const loading = ref(true);
const failed = ref(false);
const updatedAt = ref("");

const weekdays = ["søn", "man", "tir", "ons", "tor", "fre", "lør"];

function describe(code: number): { icon: LucideIcon; label: string } {
  if (code === 0) return { icon: Sun, label: "Klart" };
  if (code <= 2) return { icon: CloudSun, label: "Lettskyet" };
  if (code === 3) return { icon: Cloud, label: "Skyet" };
  if (code <= 48) return { icon: CloudFog, label: "Tåke" };
  if (code <= 67) return { icon: CloudRain, label: "Regn" };
  if (code <= 77) return { icon: CloudSnow, label: "Sludd" };
  if (code <= 82) return { icon: CloudRain, label: "Regnbyger" };
  if (code <= 86) return { icon: CloudSnow, label: "Snøbyger" };
  return { icon: CloudLightning, label: "Torden" };
}

async function fetchWeather(signal: AbortSignal) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${accommodation.lat}` +
    `&longitude=${accommodation.lon}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=Europe%2FMadrid&forecast_days=8`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("weather fetch failed");
  return res.json();
}

async function withTimeout(ms: number) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetchWeather(ctrl.signal);
  } finally {
    clearTimeout(timer);
  }
}

async function load() {
  loading.value = true;
  failed.value = false;
  // The Open-Meteo API can be slow/flaky; time out and retry a couple of times.
  const attempts = 3;
  for (let i = 0; i < attempts; i++) {
    try {
      const data = await withTimeout(8000);
      const d = data.daily;
      days.value = d.time.map((iso: string, idx: number) => {
        const dt = new Date(iso + "T12:00:00");
        const meta = describe(d.weather_code[idx]);
        return {
          date: iso,
          weekday: weekdays[dt.getDay()],
          day: dt.getDate(),
          icon: meta.icon,
          label: meta.label,
          max: Math.round(d.temperature_2m_max[idx]),
          min: Math.round(d.temperature_2m_min[idx]),
          rain: d.precipitation_probability_max?.[idx] ?? 0,
        };
      });
      updatedAt.value = new Intl.DateTimeFormat("no-NO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid",
      }).format(new Date());
      loading.value = false;
      return;
    } catch {
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1200));
    }
  }
  failed.value = true;
  loading.value = false;
}

onMounted(load);
</script>

<template>
  <section id="vaer" class="scroll-mt-20 bg-secondary/40 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Vær"
        title="Værmelding"
        description="Live varsel for Costa del Sol (Mijas) gjennom uka."
      />

      <div
        v-if="loading"
        class="flex items-center justify-center py-10 text-muted-foreground"
      >
        <Loader2 class="h-5 w-5 animate-spin" />
        <span class="ml-2 text-sm">Henter værmelding …</span>
      </div>

      <div
        v-else-if="failed"
        class="mx-auto max-w-md rounded-xl border border-border bg-card p-6 text-center"
      >
        <p class="text-sm text-muted-foreground">
          Fikk ikke hentet værmeldingen akkurat nå. Sjekk yr.no eller Met-appen
          for oppdatert varsel.
        </p>
        <button
          type="button"
          class="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          @click="load"
        >
          Prøv igjen
        </button>
      </div>

      <div
        v-else
        class="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
      >
        <Card
          v-for="(d, i) in days"
          :key="d.date"
          v-reveal="i * 60"
          class="transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
        >
          <CardContent class="flex flex-col items-center p-3 text-center">
            <p
              class="text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              {{ d.weekday }} {{ d.day }}
            </p>
            <component :is="d.icon" class="my-2 h-8 w-8 text-accent" />
            <p class="text-lg font-extrabold leading-none tabular-nums">
              {{ d.max }}°
            </p>
            <p class="text-xs text-muted-foreground tabular-nums">
              {{ d.min }}°
            </p>
            <p
              class="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground tabular-nums"
            >
              <Droplets class="h-3 w-3" /> {{ d.rain }}%
            </p>
          </CardContent>
        </Card>
      </div>

      <p class="mt-4 text-center text-xs text-muted-foreground">
        Kilde: open-meteo.com · oppdateres automatisk<template v-if="updatedAt">
          · sist oppdatert {{ updatedAt }} (lokal tid Spania)</template
        >
      </p>
    </div>
  </section>
</template>
