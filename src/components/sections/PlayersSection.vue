<script setup lang="ts">
import { Users } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading.vue";
import { players } from "@/data/trip";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
</script>

<template>
  <section id="spillere" class="scroll-mt-20 bg-secondary/40 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Laget"
        title="Spillere"
        description="12 spillere kjemper om heder, ære og vandretrofeet."
      />

      <div
        class="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        <Card
          v-for="(p, i) in players"
          :key="p"
          class="transition-shadow hover:shadow-md"
        >
          <CardContent class="flex items-center gap-3 p-4">
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
            >
              {{ initials(p) }}
            </span>
            <div class="min-w-0">
              <p class="truncate font-semibold leading-tight">{{ p }}</p>
              <p class="text-xs text-muted-foreground">Spiller {{ i + 1 }}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <p
        class="mx-auto mt-6 flex max-w-4xl items-center justify-center gap-2 text-center text-sm text-muted-foreground"
      >
        <Users class="h-4 w-4" />
        Startlister og puljer settes i Golf Gamebook før hver runde.
      </p>
    </div>
  </section>
</template>
