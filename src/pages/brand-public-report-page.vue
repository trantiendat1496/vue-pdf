<template>
  <v-container fluid>
    <h1 class="mb-8 mt-2">{{ vm.brandName }}</h1>
    <v-container fluid>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="vm.yearList"
        item-key="code"
        dense
        :hide-default-footer="true"
        mobile-breakpoint="0"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="year in items" :key="year">
              <td>{{ year }}</td>
              <td>
                <a
                  :href="item.reportUrl"
                  target="_blank"
                  class="text-decoration-none d-block"
                  v-for="item in vm.tableData.get(year).ar"
                  :key="item.fileName"
                >
                  {{ item.fileName }}
                </a>
              </td>
              <td>
                <a
                  :href="item.reportUrl"
                  target="_blank"
                  class="text-decoration-none d-block"
                  v-for="item in vm.tableData.get(year).esg"
                  :key="item.fileName"
                >
                  {{ item.fileName }}
                </a>
              </td>
              <td>
                <a
                  :href="item.reportUrl"
                  target="_blank"
                  class="text-decoration-none d-block"
                  v-for="item in vm.tableData.get(year).cg"
                  :key="item.fileName"
                >
                  {{ item.fileName }}
                </a>
              </td>
              <td>
                <a
                  :href="item.reportUrl"
                  target="_blank"
                  class="text-decoration-none d-block"
                  v-for="item in vm.tableData.get(year).other"
                  :key="item.fileName"
                >
                  {{ item.fileName }}
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { BrandPublicReport } from '@/viewmodels/brand-public-report-viewmodel'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'

@Component
export default class BrandPublicReportPage extends Vue {
  @Watch('$route.params.brandCd', { immediate: true }) onBrandCdChanged(val: string) {
    if (val) {
      this.vm.setBrandCode(val)
    }
  }

  @Provide() vm = new BrandPublicReport()
  private readonly headers: any[] = [
    {
      text: '',
      value: 'year',
      width: 20,
      class: 'blue lighten-4 col-1',
      align: 'center',
      sortable: false,
    },
    {
      text: '統合報告書・アニュアルレポート',
      value: 'ar',
      width: 150,
      class: 'blue lighten-4',
      align: 'center',
      sortable: false,
    },
    {
      text: 'サステナビリティレポート・環境報告書等',
      value: 'esg',
      width: 150,
      class: 'blue lighten-4',
      align: 'center',
      sortable: false,
    },
    {
      text: 'コーポレートガバナンス報告書',
      value: 'cg',
      width: 200,
      class: 'blue lighten-4',
      align: 'center',
      sortable: false,
    },
    {
      text: 'その他',
      value: 'other',
      width: 200,
      class: 'blue lighten-4',
      align: 'center',
      sortable: false,
    },
  ]
}
</script>

<style scoped>
table td {
  border: thin solid rgba(0, 0, 0, 0.12);
  border-collapse: collapse;
}
</style>
