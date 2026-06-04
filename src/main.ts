import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vReveal } from './lib/reveal'

createApp(App).directive('reveal', vReveal).mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
