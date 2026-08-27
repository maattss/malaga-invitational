<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Flag, Menu, X } from 'lucide-vue-next'

const links = [
  { href: '#oversikt', label: 'Oversikt' },
  { href: '#fly', label: 'Fly' },
  { href: '#bo', label: 'Bo' },
  { href: '#vaer', label: 'Vær' },
  { href: '#program', label: 'Program' },
  { href: '#liv', label: 'LIV Golf' },
  { href: '#turnering', label: 'Turnering' },
  { href: '#spillere', label: 'Spillere' },
]

const scrolled = ref(false)
const open = ref(false)
const active = ref('oversikt')

const ids = links.map((l) => l.href.slice(1))
let observer: IntersectionObserver | undefined

// The observer callback only reports sections whose intersection *changed*, so we
// keep the latest ratio for every section and pick the winner across all of them.
const ratios = new Map<string, number>()

function onScroll() {
  scrolled.value = window.scrollY > 20
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
      }
      let best = ''
      let bestRatio = 0
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          best = id
          bestRatio = ratio
        }
      }
      if (best) active.value = best
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
  )
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})

function go() {
  open.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 bg-[hsl(154_53%_13%)] transition-shadow duration-300"
    style="padding-top: env(safe-area-inset-top)"
    :class="scrolled ? 'border-b border-white/10 shadow-lg shadow-black/20' : ''"
  >
    <div class="container flex h-16 items-center justify-between">
      <a href="#oversikt" class="flex items-center gap-2" @click="go">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <Flag class="h-5 w-5" />
        </span>
        <span class="font-extrabold tracking-tight text-white">
          Málaga <span class="text-accent">'26</span>
        </span>
      </a>

      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="
            active === l.href.slice(1)
              ? 'bg-white/15 text-white'
              : 'text-white/85 hover:bg-white/10 hover:text-white'
          "
        >
          {{ l.label }}
        </a>
      </nav>

      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
        :aria-label="open ? 'Lukk meny' : 'Åpne meny'"
        :aria-expanded="open"
        aria-controls="mi-mobile-nav"
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
        id="mi-mobile-nav"
        class="border-t border-white/10 bg-[hsl(154_53%_13%)] md:hidden"
      >
        <div class="container grid gap-1 py-3">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-white/10"
            :class="active === l.href.slice(1) ? 'bg-white/15 text-white' : 'text-white/90'"
            @click="go"
          >
            {{ l.label }}
          </a>
        </div>
      </nav>
    </transition>
  </header>
</template>
