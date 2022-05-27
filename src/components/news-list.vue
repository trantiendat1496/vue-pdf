<template>
  <v-row>
    <v-col>
      <v-row>
        <span class="text-h5 mb-3">All News</span>
      </v-row>
      <v-row>
        <v-col class="pl-0">
          <v-chip-group>
            <v-chip
              color="primary"
              class="mr-3"
              v-for="category in newsCategories"
              :outlined="activeCategory !== category.value"
              :key="category.value"
              @click="setActiveCategory(category.value)"
              >{{ category.title }}</v-chip
            >
          </v-chip-group>
        </v-col>
        <v-col cols="auto">
          <router-link class="text-decoration-none" to="/all-news">全て参照</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-0" style="position: relative">
          <v-hover v-slot="{ hover }">
            <v-slide-group class="news-slide" show-arrows ref="slideGr">
              <v-slide-item class="mr-3 news" v-for="item in items" :id="item.id" :key="item.id" v-slot="{ vSlot }">
                <v-card :class="vSlot">
                  <news-card :item="item" :noImage="true" :key="item.id" :small="true" :fillHeight="true" />
                </v-card>
              </v-slide-item>
              <template v-slot:prev>
                <div
                  class="d-flex align-center"
                  :style="{
                    height: '100%',
                    width: '100%',
                    background: 'linear-gradient(90deg, #F7F7FA 28.85%, rgba(247, 247, 250, 0) 100%)',
                  }"
                  v-if="hover && showPrevButton"
                  @click="decreaseSlideCount()"
                >
                  <v-btn fab color="white primary--text">
                    <chevron-left />
                  </v-btn>
                </div>
              </template>
              <template v-slot:next>
                <div
                  class="d-flex align-center"
                  :style="{
                    height: '100%',
                    width: '100%',
                    background: 'linear-gradient(270deg, #F7F7FA 28.85%, rgba(247, 247, 250, 0) 100%)',
                  }"
                  v-if="hover"
                  @click="increaseSlideCount()"
                >
                  <v-btn fab color="white primary--text">
                    <chevron-right />
                  </v-btn>
                </div>
              </template>
              <div class="offset next" :style="{ height: '100%' }" />
            </v-slide-group>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { News } from '@/aws/models'
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { NewsCategory } from '../models/news-model'

@Observer
@Component({
  components: {
    NewsCard: () => import('./news-card.vue'),
    ChevronLeft: () => import('./icons/chevron-left.vue'),
    ChevronRight: () => import('./icons/chevron-right.vue'),
  },
})
export default class NewsList extends Vue {
  activeCategory: NewsCategory = 'scandal'
  @Prop({ default: [] }) items!: News[]
  @Ref('slideGr') ref: any
  setActiveCategory(category: NewsCategory) {
    this.activeCategory = category
    this.ref.scrollOffset = 0

    this.$emit('categoryChange', category)
  }

  newsCategories = [
    {
      value: 'scandal',
      title: '不祥事情報',
    },
    {
      value: 'press',
      title: 'プレスリリース',
    },
    {
      value: 'news',
      title: 'ニュース',
    },
  ]
  showPrevButton = false
  slideCount = 0
  increaseSlideCount() {
    this.slideCount < this.items.length && this.slideCount++
  }
  decreaseSlideCount() {
    this.slideCount > 0 && this.slideCount--
  }
  @Watch('slideCount')
  onSlideCountChange(count: number) {
    if (count === 0) {
      this.showPrevButton = false
    } else if (!this.showPrevButton) {
      this.showPrevButton = true
    }
  }
}
</script>
<style scoped>
.news-slide::v-deep .v-slide-group__prev {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.news-slide::v-deep .v-slide-group__next {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.news-slide.v-slide-group--is-overflowing::v-deep .offset.prev {
  width: 70px;
}
.news-slide.v-slide-group--is-overflowing::v-deep .offset.next {
  width: 56px;
}
.news-slide::v-deep .v-slide-group__content {
  padding-bottom: 16px !important;
}
</style>
