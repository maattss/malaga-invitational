<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Flag, Menu, X } from "lucide-vue-next";

const links = [
  { href: "#oversikt", label: "Oversikt" },
  { href: "#fly", label: "Fly" },
  { href: "#bo", label: "Bo" },
  { href: "#program", label: "Program" },
  { href: "#liv", label: "LIV Golf" },
  { href: "#turnering", label: "Turnering" },
  { href: "#spillere", label: "Spillere" },
];

const scrolled = ref(false);
const open = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 20;
}
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

function go() {
  open.value = false;
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
    :class="
      scrolled
        ? 'border-b border-border bg-background/85 backdrop-blur-lg'
        : 'bg-transparent'
    "
  >
    <div class="container flex h-16 items-center justify-between">
      <a href="#oversikt" class="flex items-center gap-2" @click="go">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <Flag class="h-5 w-5" />
        </span>
        <span
          class="font-extrabold tracking-tight transition-colors"
          :class="scrolled ? 'text-foreground' : 'text-white'"
        >
          Málaga <span class="text-accent">'26</span>
        </span>
      </a>

      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          :class="
            scrolled
              ? 'text-foreground/80 hover:text-foreground'
              : 'text-white/85 hover:bg-white/10 hover:text-white'
          "
        >
          {{ l.label }}
        </a>
      </nav>

      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
        :class="
          scrolled
            ? 'text-foreground hover:bg-secondary'
            : 'text-white hover:bg-white/10'
        "
        :aria-label="open ? 'Lukk meny' : 'Åpne meny'"
        @click="open = !open"
      >
        <X v-if="open" class="h-6 w-6" />
        <Menu v-else class="h-6 w-6" />
      </button>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="open"
        class="border-b border-border bg-background/95 backdrop-blur-lg md:hidden"
      >
        <div class="container grid gap-1 py-3">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-secondary"
            @click="go"
          >
            {{ l.label }}
          </a>
        </div>
      </nav>
    </transition>
  </header>
</template>
