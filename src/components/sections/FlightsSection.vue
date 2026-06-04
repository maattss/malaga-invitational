<script setup lang="ts">
import { PlaneTakeoff, PlaneLanding } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading.vue";
import { flights } from "@/data/trip";

const items = [
  { ...flights.out, icon: PlaneTakeoff, variant: "accent" as const },
  { ...flights.homeEarly, icon: PlaneLanding, variant: "secondary" as const },
  { ...flights.homeLate, icon: PlaneLanding, variant: "default" as const },
];
</script>

<template>
  <section id="fly" class="scroll-mt-20 bg-secondary/40 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Reise"
        title="Flyinfo"
        description="Vi flyr fra Stavanger – med to ulike hjemreiser."
      />
      <div class="grid gap-5 md:grid-cols-3">
        <Card
          v-for="(f, i) in items"
          :key="i"
          v-reveal="i * 80"
          class="overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
        >
          <CardContent class="p-6">
            <div class="flex items-center justify-between">
              <span
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary"
              >
                <component :is="f.icon" class="h-5 w-5" />
              </span>
              <Badge :variant="f.variant">{{ f.time }}</Badge>
            </div>
            <h3
              class="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {{ f.label }}
            </h3>
            <p class="mt-1 text-lg font-bold">{{ f.route }}</p>
            <p class="mt-1 text-sm font-medium text-primary">{{ f.date }}</p>
            <p class="mt-3 text-sm text-muted-foreground">{{ f.note }}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
