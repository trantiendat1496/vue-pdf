<template>
  <v-container fluid>
    <h1 class="mb-8 mt-2">{{ vm.officerName }}</h1>
    <v-col cols="12" class="ma-0">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">社外取締役の兼任状況</div>
        </v-col>
        <v-col cols="12">
          <v-sheet :elevation="11" class="mx-auto overflow-x-scroll">
            <v-simple-table class="d-inline">
              <thead>
                <tr>
                  <th class="text-center blue lighten-4">企業</th>
                  <th
                    :colspan="concurrentStatusExternalDirectors.length + 1"
                    class="text-center blue lighten-4"
                    width="auto"
                  >
                    発表月
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in vm.concurrentStatusExternalDirectorItems" :key="i">
                  <th class="text-decoration-underline primary--text">
                    <router-link to="/top/brand-officers"> {{ item.enterprise }}</router-link>
                  </th>
                  <td v-for="(yearDetal, x) in item.years" v-bind:key="x" class="text-center">
                    <v-btn
                      class="mr-3 blue lighten-4"
                      :class="yearDetal == item.activeDate ? 'blue lighten-1' : ''"
                      @click="vm.toggleSelectTime(item.enterprise, yearDetal)"
                      >{{ yearDetal | yymm }}
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
    <!-- table2 -->
    <v-col cols="12" class="ma-0">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">社外取締役の選任</div>
        </v-col>
        <v-col cols="12">
          <v-sheet :elevation="11" class="mx-auto overflow-x-scroll">
            <v-data-table
              :headers="independenceOutsideDirectorHeaders"
              :items="independenceOutsideDirectorItems"
              item-key="id"
              class="elevation-0 min-w-1000"
              mobile-breakpoint="0"
              hide-default-footer
            >
              <template v-slot:[`item.brandName`]="{ item }">
                <tr>
                  <td>
                    {{ item.brandName }}
                  </td>
                </tr>
              </template>
              <template v-slot:[`item.year`]="{ item }">
                <td class="text-center">{{ item.year }}/{{ item.month }}</td>
              </template>
            </v-data-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
    <!-- Table 3 -->
    <v-col cols="12" class="col-12 ma-0">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">社外取締役の選任</div>
        </v-col>
        <v-col cols="12">
          <v-sheet :elevation="11" class="mx-auto overflow-x-scroll">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="blue lighten-4 vertical-top text-center pt-1 col-2">企業</th>
                    <th class="blue lighten-4 vertical-top text-center pt-1">発表月</th>
                    <th class="blue lighten-4 vertical-top text-center pt-1" v-for="item in vm.committees" :key="item">
                      {{ item }}
                    </th>
                    <th class="blue lighten-4 vertical-top text-center pt-1 col-3">適合項目に関する補足説明</th>
                    <th class="blue lighten-4 vertical-top text-center pt-1 col-3">選任の理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, x) in vm.detailOutsideDirectors" :key="x">
                    <td class="text-center">{{ item.enterprise }}</td>
                    <td class="text-center">{{ item.date | yyyymm }}</td>
                    <td class="text-center" v-for="(item, x) in item.committeeList" :key="x">
                      <span>{{ item }}</span>
                    </td>
                    <td>
                      {{ item.explanation }}
                    </td>
                    <td>
                      {{ item.reason }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { BrandOfficerInfoViewmodel } from '@/viewmodels/brand-officer-infor-viewmodel'
import { autorun } from 'mobx'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'

@Component
export default class BrandOfficerInfoPage extends Vue {
  brandCd = ''
  @Watch('$route.params.brandCd', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.brandCd = val
    }
  }
  @Provide() vm = new BrandOfficerInfoViewmodel()
  _disposers: any[] = []
  independenceOutsideDirectorHeaders: any[] = []
  independenceOutsideDirectorItems: any[] = []

  // Table 1
  concurrentStatusExternalDirectors = [
    { text: '企業', value: 'enterprise' },
    { text: '発表月', value: 'years' },
  ]

  mounted() {
    this._disposers = [
      autorun(() => {
        // Table 2
        this.independenceOutsideDirectorHeaders = this.vm.independenceOutsideDirectors.map(
          (independenceOutsideDirector, index) => ({
            ...independenceOutsideDirector,
            class: 'blue lighten-4',
            align: 'center',
            sortable: false,
            value: index > 2 ? independenceOutsideDirector.text : independenceOutsideDirector.value,
          })
        )

        this.independenceOutsideDirectorItems = this.vm.independenceOutsideDirectorItems
      }),
    ]
  }

  destroyed() {
    this._disposers.forEach((d) => d())
  }
}
</script>

<style scoped></style>
