<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as pitches } from '../pitches.data'
</script>

<template>
  <ul class="pitch-list">
    <li v-for="pitch in pitches" :key="pitch.url">
      <a :href="withBase(pitch.url)">
        <span class="ticker">{{ pitch.ticker }}</span>
        <strong>{{ pitch.title }}</strong>
        <span class="excerpt">{{ pitch.excerpt }}</span>
        <span class="arrow" aria-hidden="true">→</span>
      </a>
    </li>
  </ul>
</template>
