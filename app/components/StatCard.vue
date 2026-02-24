<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  highlight?: boolean
}>()
</script>

<template>
  <div class="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-1">
    <span class="text-xs text-white uppercase tracking-wide">{{ label }}</span>
    <span class="text-3xl font-bold" :class="highlight ? 'text-ttt-orange' : 'text-white'">
        {{ value }}
    </span>
  </div>
</template>