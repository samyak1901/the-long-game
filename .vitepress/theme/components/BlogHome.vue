<script setup lang="ts">
import { data as essays } from '../essays.data'
import { data as pitches } from '../pitches.data'

const withBase = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + p

const featured = essays[0]
const rest = essays.slice(1, 5)
const pitchPreview = pitches.slice(0, 6)
</script>

<template>
  <div class="blog-home">
    <section class="hero">
      <p class="eyebrow">The Long Game · Samyak Jain</p>
      <h1>Investing notes, stock research, and the occasional football thought.</h1>
      <p class="lede">
        I write to make my thinking sharper: why businesses compound, how incentives shape
        outcomes, what makes a stock interesting, and why football still feels like strategy
        with a heartbeat.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" :href="withBase('/essays/')">Start with the essays</a>
        <a class="btn btn-ghost" :href="withBase('/about')">About me</a>
      </div>
      <p class="hero-stats">
        {{ essays.length }} essays · {{ pitches.length }} pitch notes · football
      </p>
    </section>

    <section class="home-block" v-if="featured">
      <div class="home-block-head">
        <h2>Latest essay</h2>
        <a :href="withBase('/essays/')">All essays →</a>
      </div>

      <a class="featured" :href="withBase(featured.url)">
        <div class="post-meta">
          <span v-if="featured.category">{{ featured.category }}</span>
          <span v-if="featured.readTime">{{ featured.readTime }}</span>
          <span v-if="featured.status" class="tag">{{ featured.status }}</span>
        </div>
        <h3>{{ featured.title }}</h3>
        <p class="featured-kicker" v-if="featured.kicker">{{ featured.kicker }}</p>
        <p class="featured-excerpt">{{ featured.excerpt }}</p>
        <span class="read-more">Read essay →</span>
      </a>

      <ul class="post-list" v-if="rest.length">
        <li v-for="post in rest" :key="post.url">
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
    </section>

    <section class="home-block">
      <div class="home-block-head">
        <h2>Stock pitches</h2>
        <a :href="withBase('/pitches/')">All {{ pitches.length }} pitches →</a>
      </div>
      <ul class="pitch-grid">
        <li v-for="pitch in pitchPreview" :key="pitch.url">
          <a :href="withBase(pitch.url)">
            <span class="ticker">{{ pitch.ticker }}</span>
            <strong>{{ pitch.title }}</strong>
            <span class="excerpt">{{ pitch.excerpt }}</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="home-cards">
      <a class="home-card" :href="withBase('/football/')">
        <span class="card-label">Football</span>
        <p>
          One of the clearest examples of patterns under pressure: every pass, press, and run
          is a small edge created before the opponent closes it.
        </p>
        <span class="read-more">Read the football notes →</span>
      </a>
      <a class="home-card" :href="withBase('/about')">
        <span class="card-label">About</span>
        <p>
          Why I write, how I think about businesses, and what you'll find across the site.
        </p>
        <span class="read-more">About this site →</span>
      </a>
    </section>
  </div>
</template>
