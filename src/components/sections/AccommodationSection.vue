<script setup lang="ts">
import { LogIn, LogOut, ExternalLink, Check, MapPin } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading.vue";
import { accommodation } from "@/data/trip";
</script>

<template>
  <section id="bo" class="scroll-mt-20 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Overnatting"
        title="Hvor vi bor"
        description="Hele gjengen bor samlet i felles villa på Costa del Sol."
      />

      <Card class="mx-auto max-w-3xl overflow-hidden">
        <div class="relative">
          <img
            :src="accommodation.image"
            :alt="accommodation.name"
            class="h-56 w-full object-cover sm:h-72"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
          />
          <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
            <div class="min-w-0 text-white">
              <span class="inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
                <MapPin class="h-3.5 w-3.5" />
                {{ accommodation.location }}
              </span>
              <h3 class="mt-1 text-2xl font-bold leading-tight drop-shadow">
                {{ accommodation.name }}
              </h3>
            </div>
            <Button :href="accommodation.url" variant="accent" class="shrink-0">
              Åpne i Airbnb
              <ExternalLink class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent class="p-6">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="flex items-center gap-3 rounded-xl bg-secondary/60 p-4">
              <LogIn class="h-5 w-5 text-primary" />
              <div>
                <p
                  class="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Innsjekk
                </p>
                <p class="font-semibold">{{ accommodation.checkIn }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 rounded-xl bg-secondary/60 p-4">
              <LogOut class="h-5 w-5 text-primary" />
              <div>
                <p
                  class="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Utsjekk
                </p>
                <p class="font-semibold">{{ accommodation.checkOut }}</p>
              </div>
            </div>
          </div>

          <ul class="mt-5 space-y-2.5">
            <li
              v-for="(n, i) in accommodation.notes"
              :key="i"
              class="flex items-start gap-3 text-sm"
            >
              <Check class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{{ n }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
