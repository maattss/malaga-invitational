<script setup lang="ts">
import { Flag, Download } from 'lucide-vue-next'
</script>

<template>
  <footer
    class="hero-gradient relative overflow-hidden text-white"
    style="padding-bottom: env(safe-area-inset-bottom)"
  >
    <div class="fairway-texture pointer-events-none absolute inset-0 opacity-25" />
    <div class="container relative py-12 text-center">
      <span
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur"
      >
        <Flag class="h-6 w-6" />
      </span>
      <p class="mt-4 text-xl font-extrabold">Málaga Invitational 2026</p>
      <p class="mt-1 text-sm text-white/70">Costa del Sol · 4.–11. juni · 12 spillere</p>
      <a
        href="/Malaga-Invitational-2026.pdf"
        download
        target="_blank"
        class="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/20 hover:text-white"
      >
        <Download class="h-4 w-4" />
        Infoskriv (PDF)
      </a>
    </div>
  </footer>
</template>
