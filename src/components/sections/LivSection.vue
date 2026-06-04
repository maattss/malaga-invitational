<script setup lang="ts">
import {
  Trophy,
  MapPin,
  CalendarDays,
  Banknote,
  Check,
  Lightbulb,
  Ticket,
  ExternalLink,
} from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading.vue";
import { liv } from "@/data/trip";

const formatParts = liv.format.split(" · ");

const meta = [
  { icon: MapPin, label: "Bane", value: liv.venue },
  { icon: CalendarDays, label: "Turnering", value: liv.dates },
  { icon: Trophy, label: "Vi går", value: liv.ourDay },
  { icon: Banknote, label: "Premiepott", value: liv.purse },
];
</script>

<template>
  <section id="liv" class="scroll-mt-20 bg-secondary/40 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Høydepunkt"
        title="LIV Golf Andalucía"
        description="Lørdag bytter vi ut egen runde mot å se verdensstjernene live på legendariske Valderrama."
      />

      <div class="mx-auto max-w-4xl">
        <Card class="overflow-hidden" v-reveal>
          <div class="hero-gradient relative p-8 text-white">
            <div
              class="fairway-texture pointer-events-none absolute inset-0 opacity-30"
            />
            <div class="relative">
              <h3 class="text-3xl font-extrabold">{{ liv.event }}</h3>
              <p class="mt-1 text-white/80">{{ liv.venue }}</p>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <span
                  v-for="part in formatParts"
                  :key="part"
                  class="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur"
                >
                  {{ part }}
                </span>
              </div>
            </div>
          </div>

          <CardContent class="p-6">
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="m in meta"
                :key="m.label"
                class="rounded-xl bg-secondary/60 p-4"
              >
                <component :is="m.icon" class="h-5 w-5 text-primary" />
                <p
                  class="mt-2 text-xs uppercase tracking-wide text-muted-foreground"
                >
                  {{ m.label }}
                </p>
                <p class="font-semibold leading-tight">{{ m.value }}</p>
              </div>
            </div>

            <div
              class="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-5"
            >
              <div class="flex items-center gap-2">
                <Ticket class="h-5 w-5 text-accent" />
                <h4 class="font-bold">Billetter – {{ liv.ticket.type }}</h4>
              </div>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ liv.ticket.summary }}
              </p>
              <ul class="mt-3 grid gap-2 sm:grid-cols-2">
                <li
                  v-for="(inc, i) in liv.ticket.includes"
                  :key="i"
                  class="flex items-start gap-2 text-sm"
                >
                  <Check class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{{ inc }}</span>
                </li>
              </ul>
              <a
                :href="liv.website"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong hover:underline"
              >
                Mer info på livgolf.com
                <ExternalLink class="h-3.5 w-3.5" />
              </a>
            </div>

            <div class="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 class="mb-3 font-semibold">Verdt å vite</h4>
                <ul class="space-y-2.5">
                  <li
                    v-for="(f, i) in liv.facts"
                    :key="i"
                    class="flex items-start gap-3 text-sm"
                  >
                    <Check class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{{ f }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="mb-3 font-semibold">Praktiske tips</h4>
                <ul class="space-y-2.5">
                  <li
                    v-for="(t, i) in liv.tips"
                    :key="i"
                    class="flex items-start gap-3 text-sm"
                  >
                    <Lightbulb class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{{ t }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
