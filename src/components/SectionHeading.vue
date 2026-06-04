<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div v-reveal class="mx-auto mb-10 max-w-2xl text-center">
    <span
      class="text-sm font-semibold uppercase tracking-widest text-accent-strong"
    >
      {{ eyebrow }}
    </span>
    <h2 class="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-3 text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
