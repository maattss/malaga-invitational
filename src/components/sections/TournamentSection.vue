<script setup lang="ts">
import { ScrollText, Award, ListChecks } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
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
        <div class="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card
            v-for="(f, i) in tournament.format"
            :key="f.label"
            v-reveal="i * 70"
            class="transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
          >
            <CardContent class="p-4 text-center">
              <p class="text-xs uppercase tracking-wide text-muted-foreground">
                {{ f.label }}
              </p>
              <p class="mt-1 font-bold leading-tight">{{ f.value }}</p>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <Card v-reveal>
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

          <Card class="overflow-hidden" v-reveal="80">
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
