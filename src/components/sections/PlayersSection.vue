<script setup lang="ts">
import { ref } from 'vue'
import { Users, Sparkles } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SectionHeading from '@/components/SectionHeading.vue'
import { players } from '@/data/trip'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function avatar(seed: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    seed,
  )}&backgroundColor=c0e8d5,b6e3c5,d1f0e0&radius=50`
}

const failed = ref<Record<string, boolean>>({})
function onError(seed: string) {
  failed.value[seed] = true
}
</script>

<template>
  <section id="spillere" class="scroll-mt-20 bg-secondary/40 py-20">
    <div class="container">
      <SectionHeading
        eyebrow="Laget"
        title="Spillere"
        description="12 spillere kjemper om heder, ære og vandretrofeet – sortert etter handicap."
      />

      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="p in players"
          :key="p.name"
          class="overflow-hidden transition-shadow hover:shadow-md"
        >
          <CardContent class="p-5">
            <div class="flex items-center gap-3">
              <img
                v-if="!failed[p.seed]"
                :src="avatar(p.seed)"
                :alt="p.name"
                loading="lazy"
                class="h-14 w-14 shrink-0 rounded-full border border-border bg-secondary object-cover"
                @error="onError(p.seed)"
              />
              <span
                v-else
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground"
              >
                {{ initials(p.name) }}
              </span>

              <div class="min-w-0 flex-1">
                <p class="truncate font-semibold leading-tight">{{ p.name }}</p>
                <p class="text-xs text-muted-foreground">Handicap</p>
              </div>
              <Badge variant="secondary" class="shrink-0 tabular-nums">
                {{ p.hcp.toFixed(1) }}
              </Badge>
            </div>

            <div
              class="mt-4 flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-sm"
            >
              <Sparkles class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span class="text-muted-foreground">{{ p.funFact }}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <p
        class="mx-auto mt-6 flex max-w-4xl items-center justify-center gap-2 text-center text-sm text-muted-foreground"
      >
        <Users class="h-4 w-4" />
        Spilles med 75 % av handicap. Startlister og puljer settes i Golf Gamebook før hver runde.
      </p>
    </div>
  </section>
</template>
