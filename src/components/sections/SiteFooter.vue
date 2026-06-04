<script setup lang="ts">
import { Flag } from "lucide-vue-next";
</script>

<template>
  <footer class="hero-gradient relative overflow-hidden text-white">
    <div
      class="fairway-texture pointer-events-none absolute inset-0 opacity-25"
    />
    <div class="container relative py-12 text-center">
      <span
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur"
      >
        <Flag class="h-6 w-6" />
      </span>
      <p class="mt-4 text-xl font-extrabold">Málaga Invitational 2026</p>
      <p class="mt-1 text-sm text-white/70">
        Costa del Sol · 4.–11. juni · 12 spillere
      </p>
      <p class="mt-6 text-xs text-white/50">
        Ha en fantastisk golftur, gutta! 🏌️‍♂️⛳️🇪🇸
      </p>
      <a
        href="/Malaga-Invitational-2026.pdf"
        download
        target="_blank"
        class="mt-4 inline-block text-[11px] text-white/40 underline-offset-2 transition hover:text-white/70 hover:underline"
      >
        Infoskriv (PDF)
      </a>
    </div>
  </footer>
</template>
