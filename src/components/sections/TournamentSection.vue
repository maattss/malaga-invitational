<script setup lang="ts">
import { ScrollText, Award, ListChecks, Radio, Smartphone } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading.vue";
import { tournament } from "@/data/trip";
</script>

<template>
  <section id="turnering" class="scroll-mt-20 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Konkurranse"
        title="Turneringen"
        :description="tournament.intro"
      />

      <div class="mx-auto max-w-4xl">
        <Card class="mb-5 overflow-hidden">
          <div class="hero-gradient relative px-6 py-5 text-white">
            <div class="fairway-texture pointer-events-none absolute inset-0 opacity-30" />
            <div class="relative flex items-center gap-2">
              <Radio class="h-5 w-5 text-accent" />
              <h3 class="font-bold">Live-resultater i Golf GameBook</h3>
            </div>
          </div>
          <CardContent class="p-6">
            <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div class="space-y-2">
                <p class="text-sm text-muted-foreground">
                  Vi fører alle rundene live i Golf GameBook-appen. Last ned appen,
                  trykk «Bli med i spill» / «Join game» og skriv inn koden under for
                  å følge leaderboardet i sanntid.
                </p>
                <div class="flex items-center gap-3">
                  <span class="text-xs uppercase tracking-wide text-muted-foreground">Spillkode</span>
                  <span
                    class="rounded-lg bg-secondary px-3 py-1.5 font-mono text-lg font-bold tracking-widest text-primary"
                  >
                    {{ tournament.gamebookCode }}
                  </span>
                </div>
              </div>
              <Button as-child class="shrink-0">
                <a
                  href="https://golfgamebook.go.link/guYxH"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center gap-2"
                >
                  <Smartphone class="h-4 w-4" />
                  Last ned appen
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div class="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card v-for="f in tournament.format" :key="f.label">
            <CardContent class="p-4 text-center">
              <p class="text-xs uppercase tracking-wide text-muted-foreground">
                {{ f.label }}
              </p>
              <p class="mt-1 font-bold leading-tight">{{ f.value }}</p>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center gap-2">
                <ListChecks class="h-5 w-5 text-primary" />
                <h3 class="font-bold">Lokale regler</h3>
              </div>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="(r, i) in tournament.rules"
                  :key="i"
                  class="flex gap-3 text-sm"
                >
                  <span
                    class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary"
                  >
                    {{ i + 1 }}
                  </span>
                  <span>{{ r }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card class="overflow-hidden">
            <div class="hero-gradient relative px-6 py-5 text-white">
              <div
                class="fairway-texture pointer-events-none absolute inset-0 opacity-30"
              />
              <div class="relative flex items-center gap-2">
                <Award class="h-5 w-5 text-accent" />
                <h3 class="font-bold">Vandretrofeet</h3>
              </div>
            </div>
            <CardContent class="p-6">
              <ul class="space-y-3">
                <li
                  v-for="(t, i) in tournament.trophy"
                  :key="i"
                  class="flex gap-3 text-sm"
                >
                  <ScrollText class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{{ t }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
