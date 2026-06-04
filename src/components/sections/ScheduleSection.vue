<script setup lang="ts">
import { Clock, Car, Flag, Trophy, PlaneTakeoff, Star } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading.vue";
import { schedule } from "@/data/trip";
</script>

<template>
  <section id="program" class="scroll-mt-20 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Golf"
        title="Dag-for-dag program"
        description="Tee-tider og anbefalt avreisetid for hver bane. Avreisetid er et estimat – juster ved behov."
      />

      <div class="mx-auto max-w-3xl space-y-5">
        <Card
          v-for="day in schedule"
          :key="day.id"
          class="overflow-hidden transition-shadow hover:shadow-md"
          :class="day.highlight ? 'ring-2 ring-accent/60' : ''"
        >
          <div class="flex">
            <!-- Date rail -->
            <div
              class="flex w-20 shrink-0 flex-col items-center justify-center border-r border-border bg-secondary/50 px-2 py-5 text-center sm:w-24"
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

            <CardContent class="flex-1 p-5">
              <div class="flex items-start justify-between gap-3">
                <div>
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
                  v-for="(r, i) in day.rounds"
                  :key="i"
                  class="rounded-xl border border-border p-3.5"
                  :class="r.isLiv ? 'border-accent/50 bg-accent/10' : 'bg-card'"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <Trophy v-if="r.isLiv" class="h-4 w-4 text-accent" />
                      <Flag v-else class="h-4 w-4 text-primary" />
                      <span class="font-semibold">{{ r.course }}</span>
                    </div>
                    <Badge :variant="r.isLiv ? 'accent' : 'secondary'">{{
                      r.label
                    }}</Badge>
                  </div>

                  <div
                    class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
                  >
                    <span class="inline-flex items-center gap-1.5 font-medium">
                      <Clock class="h-4 w-4 text-muted-foreground" />
                      <span class="tabular-nums">{{
                        r.times.join(" · ")
                      }}</span>
                    </span>
                    <span
                      v-if="r.departure"
                      class="inline-flex items-center gap-1.5 text-muted-foreground"
                    >
                      <Car class="h-4 w-4" />
                      Dra ca.
                      <strong class="text-foreground">{{ r.departure }}</strong>
                    </span>
                  </div>

                  <p v-if="r.note" class="mt-2.5 text-sm text-muted-foreground">
                    {{ r.note }}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
