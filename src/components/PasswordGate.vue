<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { Lock, Flag } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const PASSWORD = "2026";
const STORAGE_KEY = "mi26-unlocked";

const emit = defineEmits<{ unlocked: [] }>();

const value = ref("");
const error = ref(false);
const inputEl = ref<HTMLInputElement | null>(null);

onMounted(() => {
  nextTick(() => inputEl.value?.focus());
});

function submit() {
  if (value.value.trim() === PASSWORD) {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    emit("unlocked");
  } else {
    error.value = true;
    value.value = "";
    nextTick(() => inputEl.value?.focus());
  }
}
</script>

<template>
  <div
    class="hero-gradient fixed inset-0 z-50 flex items-center justify-center p-6"
  >
    <div
      class="fairway-texture pointer-events-none absolute inset-0 opacity-40"
    />
    <div
      class="animate-fade-in relative w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl"
    >
      <div
        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg"
      >
        <Flag class="h-8 w-8" />
      </div>
      <h1 class="text-2xl font-extrabold tracking-tight text-white">
        Málaga Invitational
      </h1>
      <p class="mt-1 text-sm text-white/70">
        Skriv inn passordet for å komme inn
      </p>

      <form class="mt-6 space-y-3" @submit.prevent="submit">
        <div class="relative">
          <label for="mi-password" class="sr-only">Passord</label>
          <Lock
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
          />
          <input
            id="mi-password"
            ref="inputEl"
            v-model="value"
            type="password"
            inputmode="numeric"
            autocomplete="current-password"
            placeholder="••••"
            aria-label="Passord"
            class="h-12 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 text-center text-lg font-semibold tracking-[0.3em] text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
            @input="error = false"
          />
        </div>
        <p v-if="error" class="text-sm font-medium text-red-300">
          Feil passord – prøv igjen.
        </p>
        <Button type="submit" variant="accent" size="lg" class="w-full">
          Lås opp
        </Button>
      </form>
    </div>
  </div>
</template>
