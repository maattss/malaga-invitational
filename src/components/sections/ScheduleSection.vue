<script setup lang="ts">
import {
  Clock,
  Car,
  Flag,
  Trophy,
  PlaneTakeoff,
  Star,
  Users,
  Info,
  MapPin,
} from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading.vue";
import { schedule } from "@/data/trip";

function mapsUrl(course: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    course + " golf Spain",
  )}`;
}
</script>

<template>
  <section id="program" class="scroll-mt-20 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Golf"
        title="Dag-for-dag program"
        description="Tee-tider og anbefalt avreisetid for hver bane. Avreisetidene inkluderer 30 min buffer før første tee – juster ved behov."
      />

      <div
        class="mx-auto mb-8 flex max-w-3xl items-start gap-2.5 rounded-xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900"
      >
        <Info class="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          <strong>Merk:</strong> De fleste tee-tidene er bekreftet. Tidene for
          <strong>fredag</strong> (Torrequebrada) og
          <strong>søndag ettermiddag</strong>
          (Santana) er foreløpige estimater (merket «est.»). Selve Málaga
          Invitational teller kun for de fem turneringsrundene (markert med
          <Trophy class="inline h-3 w-3 align-[-1px]" /> – fredag, lørdag,
          søndag og begge på mandag).
        </p>
      </div>

      <div class="mx-auto max-w-3xl space-y-5">
        <Card
          v-for="(day, i) in schedule"
          :key="day.id"
          v-reveal="i * 60"
          class="overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
          :class="day.highlight ? 'ring-2 ring-accent/60' : ''"
        >
          <div class="flex">
            <!-- Date rail -->
            <div
              class="flex w-14 shrink-0 flex-col items-center justify-center border-r border-border bg-secondary/50 px-1 py-5 text-center sm:w-24 sm:px-2"
              :class="day.highlight ? 'bg-accent/15' : ''"
            >
              <span
                class="text-xs font-bold uppercase tracking-wide text-muted-foreground"
              >
                {{ day.short }}
              </span>
              <span class="mt-1 text-2xl font-extrabold leading-none">
                {{ day.date.split(".")[0] }}
              </span>
              <span class="text-xs text-muted-foreground">juni</span>
            </div>

            <CardContent class="min-w-0 flex-1 p-4 sm:p-5">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p
                    class="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {{ day.weekday }}
                  </p>
                  <h3 class="text-lg font-bold leading-tight">
                    {{ day.title }}
                  </h3>
                </div>
                <Badge v-if="day.highlight" variant="accent" class="shrink-0">
                  <Star class="mr-1 h-3 w-3" /> Høydepunkt
                </Badge>
              </div>

              <!-- Travel-only day -->
              <div
                v-if="day.travel"
                class="mt-3 flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-sm"
              >
                <PlaneTakeoff class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{{ day.travel }}</span>
              </div>

              <!-- Rounds -->
              <div v-if="day.rounds.length" class="mt-4 space-y-3">
                <div
                  v-for="(r, ri) in day.rounds"
                  :key="ri"
                  class="rounded-xl border border-border p-3 sm:p-3.5"
                  :class="
                    r.isLiv
                      ? 'border-accent/50 bg-accent/10'
                      : r.tournament
                        ? 'border-primary/40 bg-primary/5'
                        : 'bg-card'
                  "
                >
                  <div
                    class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5"
                  >
                    <div class="flex min-w-0 items-center gap-2">
                      <Trophy
                        v-if="r.isLiv || r.tournament"
                        class="h-4 w-4 shrink-0"
                        :class="r.isLiv ? 'text-accent' : 'text-primary'"
                      />
                      <Flag v-else class="h-4 w-4 shrink-0 text-primary" />
                      <span class="min-w-0 font-semibold">{{ r.course }}</span>
                      <a
                        :href="mapsUrl(r.course)"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="`Vis ${r.course} i kart`"
                        title="Vis i Google Maps"
                        class="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                      >
                        <MapPin class="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <div class="flex shrink-0 items-center gap-1.5">
                      <Badge v-if="r.limited" variant="outline" class="gap-1">
                        <Users class="h-3 w-3" /> Kun 8
                      </Badge>
                      <Badge :variant="r.isLiv ? 'accent' : 'secondary'">{{
                        r.label
                      }}</Badge>
                    </div>
                  </div>

                  <div
                    class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm"
                  >
                    <span class="inline-flex items-center gap-1.5 font-medium">
                      <Clock class="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span class="tabular-nums">{{
                        r.times.join(" · ")
                      }}</span>
                      <span
                        v-if="r.estimate"
                        class="text-xs font-normal text-muted-foreground"
                        >(est.)</span
                      >
                    </span>
                    <span
                      v-if="r.departure || r.driveTime"
                      class="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground"
                    >
                      <Car class="h-4 w-4 shrink-0" />
                      <span v-if="r.departure" class="whitespace-nowrap"
                        >Dra
                        <strong class="text-foreground">{{
                          r.departure
                        }}</strong></span
                      >
                      <span v-if="r.driveTime" class="whitespace-nowrap"
                        >{{ r.driveTime }} kjøretur</span
                      >
                    </span>
                  </div>

                  <p v-if="r.note" class="mt-2.5 text-sm text-muted-foreground">
                    {{ r.note }}
                  </p>

                  <!-- Featured groups -->
                  <div
                    v-if="r.tournament"
                    class="mt-3.5 border-t border-border pt-3"
                  >
                    <p
                      class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      <Users class="h-3.5 w-3.5" /> Featured groups
                    </p>
                    <div v-if="r.flights" class="grid gap-2 sm:grid-cols-3">
                      <div
                        v-for="f in r.flights"
                        :key="f.name"
                        class="rounded-lg bg-secondary/60 p-2.5"
                      >
                        <p class="text-xs font-bold text-foreground">
                          {{ f.name }}
                        </p>
                        <ul class="mt-1 space-y-0.5 text-sm">
                          <li
                            v-for="(p, pi) in f.players"
                            :key="p"
                            :class="
                              pi === 0 ? 'font-medium' : 'text-muted-foreground'
                            "
                          >
                            {{ p
                            }}<span
                              v-if="pi === 0"
                              class="text-xs text-muted-foreground"
                            >
                              (fører score)</span
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p
                      v-if="r.flightsNote"
                      class="mt-2 text-xs italic text-muted-foreground"
                    >
                      {{ r.flightsNote }}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
