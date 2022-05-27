<template>
  <v-container fluid>
    <v-col class="pa-0 mb-8" cols="12">
      <div class="text-h5 font-weight-black px-3">{{ vm.brandName }}</div>
    </v-col>
    <v-col cols="12">
      <news-list :items="vm.displayedNews" @categoryChange="vm.onSelectNewsHandler" />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { BrandNewsPressViewModel } from '@/viewmodels/brand-news-press-viewmodel'

@Observer
@Component({
  components: {
    NewsList: () => import('../components/news-list.vue'),
  },
})
export default class BrandNewsPressPage extends Vue {
  @Watch('$route.params.brandCd', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.vm.setBrandCode(val)
    }
  }
  @Provide() vm = new BrandNewsPressViewModel()
}
</script>

<style scoped></style>
