<template>
  <v-container fluid class="pa-12 background">
    <v-row class="mb-9">
      <v-col>
        <v-row>
          <span class="text-h5">Featured News</span>
        </v-row>
        <v-row>
          <v-col class="px-0 col-8">
            <news-card :item="vm.scandals[0]" :fillHeight="true" v-if="vm.scandals.length > 0" />
          </v-col>
          <v-col class="pr-0 pl-6 col-4 d-flex flex-column">
            <news-card class="mb-4 flex-grow-1" :item="vm.scandals[1]" v-if="vm.scandals.length > 1" />
            <news-card class="flex-grow-1" :item="vm.scandals[2]" v-if="vm.scandals.length > 2" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <news-list :items="vm.selectedNews" @categoryChange="vm.onSelectNewsHandler" />
    <v-divider class="mt-6 mb-10" />
    <portfolio-table :items="vm.selectedPortfolioBrands" />
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { TopViewModel } from '../viewmodels/top-viewmodel'

@Observer
@Component({
  components: {
    NewsList: () => import('../components/news-list.vue'),
    NewsCard: () => import('../components/news-card.vue'),
    PortfolioTable: () => import('../components/portfolio-table.vue'),
  },
})
export default class Dashboard extends Vue {
  @Provide() vm = new TopViewModel()

  beforeDestroy() {
    this.vm.destroy()
  }
}
</script>

<style scoped></style>
