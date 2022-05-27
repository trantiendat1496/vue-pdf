<template>
  <v-row>
    <v-col>
      <v-card class="py-6 px-5 rounded-xl" :style="{ boxShadow: '0px 6px 18px rgba(112, 144, 176, 0.2)' }">
        <v-row>
          <v-col>
            <span class="text-h5 font-weight-normal">ポートフォリオ銘柄</span>
          </v-col>
          <v-col cols="auto">
            <router-link class="text-decoration-none" to="/all-news">全て参照</router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table dense :headers="headers" :items="items" hide-default-header hide-default-footer>
              <template v-slot:header="{ props, on }">
                <thead>
                  <th
                    v-for="header in props.headers"
                    :class="{
                      'text-left': header.align !== 'end',
                      'text-right': header.align === 'end',
                    }"
                    :key="header.value"
                    @click="on.sort(header.value)"
                  >
                    <div class="d-inline-flex text-left text-h6 align-center">
                      {{ header.text }}
                      <sort-active-icon
                        :class="{ 'primary--text': true, down: props.options.sortDesc[0] }"
                        v-if="props.options.sortBy.includes(header.value)"
                      />
                      <sort-inactive-icon v-else />
                    </div>
                    <span class=""> </span>
                  </th>
                </thead>
              </template>
              <template v-slot:[`item.brandName`]="{ item }">
                <router-link :to="`top/brand-top/${item.brandCd}`">{{ item.brandName }}</router-link>
                <v-icon v-if="item.increasing" color="red">mdi-menu-up</v-icon>
                <v-icon v-else color="green">mdi-menu-down</v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Brand } from '@/aws/models'
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    SortActiveIcon: () => import('../components/icons/sort-active.vue'),
    SortInactiveIcon: () => import('../components/icons/sort-inactive.vue'),
  },
})
export default class PortfolioTable extends Vue {
  @Prop({ default: [] }) items!: Brand[]

  headers = [
    { text: '会社名', value: 'brandName' },
    {
      text: '銘柄',
      value: 'brandCd',
      align: 'end',
    },
    { text: '業界', value: 'industryName' },
    {
      text: '企業価値',
      value: 'corporateValue',
      align: 'end',
    },
    { text: '時価総額', value: 'market', align: 'end' },
    { text: 'PER･予', value: 'per', align: 'end' },
    { text: 'ROE', value: 'roe', align: 'end' },
    { text: '自資本比', value: 'ratio', align: 'end' },
  ]
}
</script>
<style scoped>
.v-data-table::v-deep tbody td {
  border-bottom: 0 !important;
}
.v-data-table::v-deep thead th {
  color: #6e7894 !important;
  border-bottom: 0 !important;
  font-size: 18px !important;
  font-weight: 400 !important;
}
.v-data-table::v-deep tbody tr:nth-of-type(odd) {
  background-color: rgba(225, 226, 236, 0.5);
}
.v-data-table::v-deep .down {
  transform: rotate(180deg);
}
.v-data-table::v-deep tbody tr {
  font-size: 16px !important;
}
</style>
