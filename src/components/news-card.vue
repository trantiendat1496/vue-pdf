<template>
  <v-card
    :width="small ? '360px' : ''"
    :height="fillHeight ? '100%' : 'auto'"
    class="pa-4 d-flex flex-column"
    rounded="xl"
    style="box-shadow: 0px 6px 18px rgba(112, 144, 176, 0.2)"
  >
    <div class="mb-4 flex flex-1" v-if="!noImage && item.pdfUrl">
      <v-img :src="item.pdfUrl" height="100%" />
    </div>
    <span class="text-caption">{{ item.datetime }}</span>
    <div class="news-title my-2 overflow-hidden">
      <span class="primary--text text-h6 font-weight-normal">
        <a :href="item.url" target="_blank">{{ item.title }}</a>
      </span>
    </div>
    <div>
      <v-chip label class="mr-3 mt-1 white--text" color="#BC1B1A" v-if="item.brandName">
        {{ item.brandName }}
      </v-chip>
      <v-chip label class="mr-3 mt-1 white--text" color="#9776CE" v-if="item.type">
        {{ item.type === 'press' ? 'プレス' : 'ニュース' }}
      </v-chip>
      <v-chip label class="mr-3 mt-1 white--text" color="#83BE86" v-if="item.tag">
        {{ item.tag }}
      </v-chip>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { News } from '@/aws/models'

@Observer
@Component
export default class FeaturedNews extends Vue {
  @Prop() item!: News
  @Prop({ default: false }) noImage?: boolean
  @Prop() fillHeight!: boolean
  @Prop() small!: boolean
}
</script>
<style scoped>
div.news-title {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 64px;
}
</style>
