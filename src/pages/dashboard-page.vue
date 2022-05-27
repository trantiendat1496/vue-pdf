<template>
  <v-container fluid>
    <v-list class="d-sm-inline-flex flex-sm-nowrap d-flex flex-wrap">
      <v-list-item
        v-for="child in navigations"
        :key="child.link"
        link
        :to="child.link + brandCd"
        class="text-center mr-3 blue lighten-4"
        active-class="blue lighten-1"
      >
        <v-list-item-title>{{ child.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <router-view />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
  brandCd = ''
  @Watch('$route.params.brandCd', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.brandCd = val
    }
  }
  navigations = [
    {
      title: '企業概要',
      link: '/top/brand-top/',
    },
    {
      title: 'ガバナンス',
      link: '/top/brand-governance/',
    },
    {
      title: '役員',
      link: '/top/brand-officers/',
    },
    {
      title: 'レポート情報',
      link: '/top/brand-report-info/',
    },
    {
      title: '開示レポート',
      link: '/top/brand-public-report/',
    },
    {
      title: 'ニュース・プレス',
      link: '/top/brand-news-press/',
    },
  ]
}
</script>

<style scoped></style>
