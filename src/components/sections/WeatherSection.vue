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

onMounted(async () => {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${accommodation.lat}` +
      `&longitude=${accommodation.lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&timezone=Europe%2FMadrid&forecast_days=8`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("weather fetch failed");
    const data = await res.json();
    const d = data.daily;
    days.value = d.time.map((iso: string, i: number) => {
      const dt = new Date(iso + "T12:00:00");
      const meta = describe(d.weather_code[i]);
      return {
        date: iso,
        weekday: weekdays[dt.getDay()],
        day: dt.getDate(),
        icon: meta.icon,
        label: meta.label,
        max: Math.round(d.temperature_2m_max[i]),
        min: Math.round(d.temperature_2m_min[i]),
        rain: d.precipitation_probability_max?.[i] ?? 0,
      };
    });
  } catch {
    failed.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section id="vaer" class="scroll-mt-20 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Vær"
        title="Værmelding"
        description="Live varsel for Costa del Sol (Mijas) gjennom uka – planlegg antrekk og soldekk deretter."
      />

      <div v-if="loading" class="flex items-center justify-center py-10 text-muted-foreground">
        <Loader2 class="h-5 w-5 animate-spin" />
        <span class="ml-2 text-sm">Henter værmelding …</span>
      </div>

      <p
        v-else-if="failed"
        class="mx-auto max-w-md rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground"
      >
        Fikk ikke hentet værmeldingen akkurat nå. Sjekk yr.no eller Met-appen for
        oppdatert varsel.
      </p>

      <div
        v-else
        class="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
      >
        <Card
          v-for="d in days"
          :key="d.date"
          class="transition-shadow hover:shadow-md"
        >
          <CardContent class="flex flex-col items-center p-3 text-center">
            <p class="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {{ d.weekday }} {{ d.day }}
            </p>
            <component :is="d.icon" class="my-2 h-8 w-8 text-accent" />
            <p class="text-lg font-extrabold leading-none tabular-nums">
              {{ d.max }}°
            </p>
            <p class="text-xs text-muted-foreground tabular-nums">{{ d.min }}°</p>
            <p
              class="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground tabular-nums"
            >
              <Droplets class="h-3 w-3" /> {{ d.rain }}%
            </p>
          </CardContent>
        </Card>
      </div>

      <p class="mt-4 text-center text-xs text-muted-foreground">
        Kilde: open-meteo.com · oppdateres automatisk
      </p>
    </div>
  </section>
</template>
