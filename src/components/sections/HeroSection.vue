<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Plane, MapPin, CalendarDays, Users } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { trip } from "@/data/trip";

const now = ref(Date.now());
let timer: number | undefined;

onMounted(() => {
  timer = window.setInterval(() => (now.value = Date.now()), 1000);
});
onUnmounted(() => {
  if (timer) window.clearInterval(timer);
});

const target = new Date(trip.start).getTime();

const countdown = computed(() => {
  const diff = Math.max(0, target - now.value);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, started: diff === 0 };
});

const units = computed(() => [
  { v: countdown.value.d, l: "dager" },
  { v: countdown.value.h, l: "timer" },
  { v: countdown.value.m, l: "min" },
  { v: countdown.value.s, l: "sek" },
]);

const countdownText = computed(() => {
  const { d, h, m, started } = countdown.value;
  if (started) return "Turen er i gang – nyt Spania!";
  return `${d} dager, ${h} timer og ${m} minutter til avreise fra Stavanger.`;
});

const facts = [
  { icon: CalendarDays, label: "4.–11. juni 2026" },
  { icon: MapPin, label: "Costa del Sol" },
  { icon: Users, label: "12 spillere" },
  { icon: Plane, label: "Fra Stavanger" },
];
</script>

<template>
  <section
    id="oversikt"
    class="hero-gradient relative flex min-h-[100svh] items-center overflow-hidden"
    style="
      margin-top: calc(-1 * env(safe-area-inset-top));
      padding-top: calc(4rem + env(safe-area-inset-top));
    "
  >
    <div
      class="fairway-texture pointer-events-none absolute inset-0 opacity-30"
    />
    <div
      class="pointer-events-none absolute -bottom-48 left-1/2 h-56 w-[120%] -translate-x-1/2 rounded-[100%] bg-background/90 blur-2xl sm:-bottom-32 sm:h-72 sm:bg-background/95"
    />

    <div class="container relative z-10 py-16">
      <div class="animate-fade-in mx-auto max-w-3xl text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur"
        >
          <span class="h-2 w-2 rounded-full bg-accent" />
          {{ trip.subtitle }}
        </span>

        <h1
          class="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl"
        >
          Málaga
          <span class="block text-accent">Invitational</span>
          <span class="block text-3xl font-bold text-white/80 sm:text-4xl"
            >2026</span
          >
        </h1>

        <p class="mx-auto mt-5 max-w-xl text-lg text-white/80">
          All praktisk info for golfturen samlet på ett sted – fly,
          bane-program, overnatting og LIV Golf Andalucía.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="#program" variant="accent" size="lg"
            >Se golf-programmet</Button
          >
          <Button
            href="#liv"
            size="lg"
            class="border border-white/25 bg-white/10 text-white hover:bg-white/20"
          >
            LIV Golf info
          </Button>
        </div>

        <div
          class="mx-auto mt-12 grid max-w-md grid-cols-4 gap-2 sm:gap-3"
          aria-hidden="true"
        >
          <div
            v-for="u in units"
            :key="u.l"
            class="rounded-xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur"
          >
            <div
              class="text-2xl font-extrabold text-white sm:text-3xl tabular-nums"
            >
              {{ String(u.v).padStart(2, "0") }}
            </div>
            <div class="text-[11px] uppercase tracking-wide text-white/70">
              {{ u.l }}
            </div>
          </div>
        </div>
        <p class="sr-only">{{ countdownText }}</p>
        <p class="mt-3 text-xs text-white/70" aria-hidden="true">
          {{
            countdown.started
              ? "Turen er i gang – nyt Spania! 🇪🇸"
              : "til avreise fra Stavanger ✈️"
          }}
        </p>

        <div
          class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          <div
            v-for="f in facts"
            :key="f.label"
            class="inline-flex items-center gap-2 text-sm text-white/80"
          >
            <component :is="f.icon" class="h-4 w-4 text-accent" />
            {{ f.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
