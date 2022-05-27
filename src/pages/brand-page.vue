<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="8" lg="6">
        <v-text-field value="銘柄コード、銘柄名で検索" dense readonly></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="4" lg="3">
        <brand-search @itemSelected="onSelectedItem" />
      </v-col>
    </v-row>
    <v-row class="mt-16" no-gutters>
      <v-col cols="12" md="8" lg="6">
        <v-text-field value="業種から銘柄一覧を検索" dense readonly></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="8" lg="6">
        <!-- <v-chip-group v-model="vm.selected" column multiple @change="vm.brandActive">
          <v-chip filter outlined v-for="item in vm.mockData" :key="item.industryCd">
            {{ item.industryName }}
          </v-chip>
        </v-chip-group> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { globalStore } from '@/stores/global-store'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    BrandSearch: () => import('../components/brand-search.vue'),
  },
})
export default class BrandPage extends Vue {
  onSelectedItem(item) {
    globalStore.router.push({ path: `/top/brand-top/${item.brandCd}` })
  }
}
</script>

<style scoped></style>
