<template>
  <v-container fluid>
    <h1 class="mb-8 mt-2">{{ vm.brandName }}</h1>
    <v-container class="ma-0">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">社外取締役の選任</div>
        </v-col>
        <v-col cols="12">
          <v-sheet :elevation="11" class="mx-auto overflow-x-scroll">
            <v-data-table
              :headers="outsideDirectorHeaders"
              :items="vm.officerAppearanceRecords"
              item-key="id"
              class="elevation-0"
              hide-default-footer
              mobile-breakpoint="0"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-center">
                    <router-link
                      :to="{
                        path: 'brand-officers-info',
                        query: { id: item.index },
                      }"
                    >
                      {{ item.name }}
                    </router-link>
                  </td>
                  <template v-for="(property, name) in item">
                    <td :key="(item.name, name)" class="text-center" v-if="name !== 'name'">
                      {{ property }}
                    </td>
                  </template>
                </tr>
              </template>
            </v-data-table>
          </v-sheet>
        </v-col>
      </v-row>
      <hr class="indigo darken-4 my-5" />
    </v-container>
    <!-- Table2 -->
    <v-container class="ma-0">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">社外取締役の独立性</div>
        </v-col>
        <v-col cols="12">
          <v-sheet :elevation="11" class="mx-auto overflow-x-scroll">
            <v-data-table
              :headers="independenceOutsideDirectorsHeader"
              :items="independenceOutsideDirectorItems"
              item-key="id"
              class="elevation-0 min-w-1000"
              mobile-breakpoint="0"
              hide-default-footer
            >
            </v-data-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <!-- Table 3 -->
    <v-container class="col-12 ma-0">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">社外取締役の選任</div>
        </v-col>
        <v-col cols="12">
          <v-sheet :elevation="11" class="mx-auto overflow-x-scroll">
            <v-data-table
              :headers="table3Headers"
              :items="outsideDirectors"
              item-key="id"
              class="elevation-0 min-w-1000"
              mobile-breakpoint="0"
              hide-default-footer
            >
            </v-data-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { BrandOfficerViewModel } from '@/viewmodels/brand-officer-viewmodel'
import { autorun } from 'mobx'
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'

@Observer
@Component
export default class BrandOfficersPage extends Vue {
  @Provide() vm = new BrandOfficerViewModel()

  @Watch('$route.params.brandCd', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.vm.setBrandCode(val)
    }
  }
  _disposers: any[] = []
  outsideDirectorHeaders: any[] = []
  independenceOutsideDirectorsData: any[] = []
  outsideDirectors: any[] = []
  independenceOutsideDirectorItems: any[] = []
  independenceOutsideDirectorsHeader: any[] = []

  table3Headers = [
    {
      text: '氏名',
      value: 'name',
    },
    {
      text: ' 指名委員会',
      value: 'isNominate',
    },
    {
      text: '報酬委員会',
      value: 'isRemuneration',
    },
    {
      text: '監査委員会',
      value: 'isAudit',
    },
    {
      text: '独立役員',
      value: 'isIndependent',
    },
    {
      text: '適合項目に関する補足説明',
      value: 'explanation',
      width: 300,
    },
    {
      text: '選任の理由',
      value: 'reason',
      width: 400,
    },
  ]

  setupDataTable = {
    class: 'blue lighten-4',
    align: 'center',
    sortable: false,
  }

  independenceOutsideDirectorsHeaderModel = [
    { text: '氏名', value: 'name' },
    { text: '属性', value: 'attribute', width: 100 },
    { text: 'a' },
    { text: 'b' },
    { text: 'c' },
    { text: 'd' },
    { text: 'e' },
    { text: 'f' },
    { text: 'g' },
    { text: 'h' },
    { text: 'i' },
    { text: 'j' },
    { text: 'k' },
  ]

  mounted() {
    this._disposers = [
      autorun(() => {
        this.outsideDirectorHeaders = this.vm.dateList.map((month) => {
          return {
            month,
            text: month,
            ...this.setupDataTable,
          }
        })
        this.outsideDirectorHeaders.unshift({
          text: '氏名',
          ...this.setupDataTable,
        })
        // Table 2
        this.independenceOutsideDirectorsHeader = this.independenceOutsideDirectorsHeaderModel.map((data, index) => ({
          ...data,
          ...this.setupDataTable,
          value: index > 1 ? data.text : data.value,
        }))

        // Table 3
        this.table3Headers = this.table3Headers.map((data) => ({
          ...data,
          ...this.setupDataTable,
        }))
      }),
      autorun(() => {
        // render office sort by Recent times
        this.outsideDirectors = this.vm.outsideDirectors!.map((governanceDetail) => ({
          ...governanceDetail,
          isAudit: governanceDetail?.isAudit ? '〇' : '-',
          isIndependent: governanceDetail?.isIndependent ? '〇' : '-',
          isNominate: governanceDetail?.isNominate ? '〇' : '-',
          isRemuneration: governanceDetail?.isRemuneration ? '〇' : '-',
        }))
      }),
      autorun(() => {
        this.independenceOutsideDirectorItems = this.vm.independenceOutsideDirectorItems!.map((governance) => ({
          ...governance,
          a: governance?.a === '○' ? '〇' : governance?.a,
          b: governance?.b === '○' ? '〇' : governance?.b,
          c: governance?.c === '○' ? '〇' : governance?.c,
          d: governance?.d === '○' ? '〇' : governance?.d,
          e: governance?.e === '○' ? '〇' : governance?.e,
          f: governance?.f === '○' ? '〇' : governance?.f,
          g: governance?.g === '○' ? '〇' : governance?.g,
          h: governance?.h === '○' ? '〇' : governance?.h,
          i: governance?.i === '○' ? '〇' : governance?.i,
          j: governance?.j === '○' ? '〇' : governance?.j,
          k: governance?.k === '○' ? '〇' : governance?.k,
        }))
      }),
    ]
  }

  destroyed() {
    this._disposers.forEach((d) => d())
  }
}
</script>

<style scoped>
.overflow-x-scroll {
  overflow-x: scroll;
}
td.vertical-top {
  vertical-align: top;
}
.min-w-1000 {
  min-width: 1000px;
}
</style>
