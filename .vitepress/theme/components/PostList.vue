<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as essays } from '../essays.data'

const props = defineProps<{ limit?: number }>()
const posts = props.limit ? essays.slice(0, props.limit) : essays
</script>

<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.url">
      <a :href="withBase(post.url)">
        <div class="post-meta">
          <span v-if="post.category">{{ post.category }}</span>
          <span v-if="post.readTime">{{ post.readTime }}</span>
          <span v-if="post.status" class="tag">{{ post.status }}</span>
        </div>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
      </a>
    </li>
  </ul>
</template>
