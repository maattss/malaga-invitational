<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariants } from ".";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    as?: string;
    href?: string;
    class?: string;
  }>(),
  { as: "button" },
);

const tag = computed(() => (props.href ? "a" : props.as));
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </component>
</template>
