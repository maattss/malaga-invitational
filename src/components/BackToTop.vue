<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "lucide-vue-next";

const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 600;
}
function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-if="visible"
      type="button"
      aria-label="Til toppen"
      title="Til toppen"
      class="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/5 transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      @click="toTop"
    >
      <ArrowUp class="h-5 w-5" />
    </button>
  </transition>
</template>
