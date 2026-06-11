import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import BlogHome from './components/BlogHome.vue'
import PostList from './components/PostList.vue'
import PitchList from './components/PitchList.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogHome', BlogHome)
    app.component('PostList', PostList)
    app.component('PitchList', PitchList)
  },
} satisfies Theme
