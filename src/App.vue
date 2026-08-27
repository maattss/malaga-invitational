<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PasswordGate from '@/components/PasswordGate.vue'
import SeasonEndedOverlay from '@/components/SeasonEndedOverlay.vue'
import SiteNav from '@/components/SiteNav.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import FlightsSection from '@/components/sections/FlightsSection.vue'
import AccommodationSection from '@/components/sections/AccommodationSection.vue'
import WeatherSection from '@/components/sections/WeatherSection.vue'
import ScheduleSection from '@/components/sections/ScheduleSection.vue'
import LivSection from '@/components/sections/LivSection.vue'
import TournamentSection from '@/components/sections/TournamentSection.vue'
import PlayersSection from '@/components/sections/PlayersSection.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
import BackToTop from '@/components/BackToTop.vue'
import { inject as injectAnalytics } from '@vercel/analytics'

const unlocked = ref(false)

// Sett til false når neste års program er klart
const seasonEnded = ref(true)

onMounted(() => {
  injectAnalytics()
  try {
    if (localStorage.getItem('mi26-unlocked') === 'true') {
      unlocked.value = true
    }
  } catch {
    /* ignore */
  }
})
</script>

<template>
  <SeasonEndedOverlay v-if="seasonEnded" />

  <PasswordGate v-else-if="!unlocked" @unlocked="unlocked = true" />

  <template v-else>
    <a
      href="#innhold"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-foreground"
    >
      Hopp til innhold
    </a>
    <SiteNav />
    <main id="innhold">
      <HeroSection />
      <FlightsSection />
      <AccommodationSection />
      <WeatherSection />
      <ScheduleSection />
      <LivSection />
      <TournamentSection />
      <PlayersSection />
    </main>
    <SiteFooter />
    <BackToTop />
  </template>
</template>
