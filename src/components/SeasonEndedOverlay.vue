<script setup lang="ts">
import { Flag } from "lucide-vue-next";
</script>

<template>
  <div
    class="hero-gradient fixed inset-0 z-50 flex items-center justify-center p-6"
  >
    <div
      class="fairway-texture pointer-events-none absolute inset-0 opacity-40"
    />
    <div
      class="animate-fade-in relative w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl"
    >
      <div
        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg"
      >
        <Flag class="h-8 w-8" />
      </div>
      <h1 class="text-2xl font-extrabold tracking-tight text-white">
        Málaga Invitational
      </h1>
      <p class="mt-4 text-lg font-semibold text-white">
        Malaga Invitational er ferdig for i år.
      </p>
      <p class="mt-2 text-sm text-white/80">
        Planleggingen for neste år har allerede begynt. Stay tuned!
      </p>
    </div>
  </div>
</template>
