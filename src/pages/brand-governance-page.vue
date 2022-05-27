<template>
  <v-container fluid>
    <h1 class="mb-8 mt-2">{{ vm.brandName }}</h1>
    <div class="col-md-12 px-0">
      <v-btn
        class="mr-3 blue lighten-4"
        v-for="(date, index) in vm.dateList"
        :class="vm.selectedDate == date ? 'blue lighten-1' : ''"
        :key="index"
        @click="vm.onSelectDateHandler(date)"
        >{{ date | yymm }}
      </v-btn>
    </div>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">
          コーポレート・ガバナンスに関する基本的な考え方
        </div>
      </v-col>
    </v-row>

    <v-card rounded elevation="0">
      <v-tabs
        rounded
        v-model="tab"
        background-color="blue lighten-4"
        color="black"
        grow
        active-class="blue lighten-1"
        hide-slider
      >
        <v-tab class="border" v-for="(item, index) in items" :key="index">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-sheet>
            <v-textarea flat solo auto-grow readonly rows="2" :value="vm.governanceBasicConcept"> </v-textarea>
            <div :class="vm.isConceptExpand ? 'flex-column-reverse' : 'flex-column'">
              <div class="d-flex justify-center">{{ vm.isConceptExpand ? '閉じる' : '続きを読む' }}</div>
              <div class="mb-3 d-flex justify-center">
                <v-btn class="white" elevation="0" width="50" @click="vm.onToggleConceptExpand">
                  <v-icon>{{ vm.isConceptExpand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-sheet>
        </v-tab-item>
        <v-tab-item>
          <v-sheet>
            <v-textarea flat solo auto-grow readonly rows="2" :value="vm.governanceReasonsNotFollow"> </v-textarea>
            <div :class="vm.isReasonsNotFollowExpand ? 'flex-column-reverse' : 'flex-column'">
              <div class="d-flex justify-center">{{ vm.isReasonsNotFollowExpand ? '閉じる' : '続きを読む' }}</div>
              <div class="mb-3 d-flex justify-center">
                <v-btn class="white" elevation="0" @click="vm.onToggleReasonsNotFollow">
                  <v-icon>{{ vm.isReasonsNotFollowExpand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-sheet>
        </v-tab-item>
        <v-tab-item>
          <v-sheet>
            <v-textarea flat solo auto-grow readonly :value="vm.governancePrincipleNoList"> </v-textarea>
            <div :class="vm.isPrincipleExpand ? 'flex-column-reverse' : 'flex-column'">
              <div class="d-flex justify-center">{{ vm.isPrincipleExpand ? '閉じる' : '続きを読む' }}</div>
              <div class="mb-3 d-flex justify-center">
                <v-btn class="white" elevation="0" @click="vm.onTogglePrinciple">
                  <v-icon>{{ vm.isPrincipleExpand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-sheet>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-row no-gutters class="mt-5">
      <v-col cols="12" md="6">
        <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">機関構成・組織運営等に係る事項</div>
      </v-col>
      <v-col cols="12">
        <v-sheet :elevation="11" class="mx-auto overflow-x-scroll">
          <table class="col-12 pa-0">
            <tr>
              <th class="blue lighten-4"></th>
              <th class="blue lighten-4 text-center pt-1" v-for="(date, i) in vm.dateList" :key="i">
                {{ date | yyyymm }}
              </th>
            </tr>
            <tr>
              <td>組織形態</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.organizationalForm }}
              </td>
            </tr>
            <tr>
              <td colspan="100%" class="blue-grey lighten-4">取締役関係</td>
            </tr>

            <tr>
              <td>定款上の取締役の員数</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.numberOfDirectorsStipulated }}
              </td>
            </tr>

            <tr>
              <td>定款上の取締役の任期</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.termStipulated }}
              </td>
            </tr>
            <tr>
              <td>取締役会の議長</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.chairperson }}
              </td>
            </tr>

            <tr>
              <td>取締役の人数</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.numberOfDirectors }}
              </td>
            </tr>

            <tr>
              <td>社外取締役の選任状況</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.electionOfOutsideDirector }}
              </td>
            </tr>
            <tr>
              <td>社外取締役の人数</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.numberOfOutsideDirector }}
              </td>
            </tr>
            <tr>
              <td>社外取締役のうち独立役員に指定されている人数</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.numberOfIndependentAmongOutside }}
              </td>
            </tr>

            <tr>
              <td colspan="100%" class="blue-grey lighten-4">監査役関係</td>
            </tr>
            <tr>
              <td>監査役会の設置の有無</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.hasAuditor }}
              </td>
            </tr>
            <tr>
              <td>定款上の監査役の員数</td>
              <td v-for="(item, i) in vm.governances" :key="i" class="text-center">
                {{ item.cg21.numberOfAuditorStipulated }}
              </td>
            </tr>
          </table>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-10">
      <v-col cols="12" md="6">
        <div class="h6 primary lighten-1 rounded-tr-lg d-inline-block px-4">社外取締役の選任</div>
      </v-col>
      <v-col cols="12" class="overflow-x-scroll">
        <v-sheet :elevation="11">
          <v-data-table
            :headers="committeeHeader"
            :items="vm.committeeData"
            item-key="id"
            class="elevation-0"
            hide-default-footer
            mobile-breakpoint="0"
          >
            <template v-slot:[`item.committeeName`]="{ item }">
              <td>
                {{ item.committeeName }}
              </td>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { BrandGovernanceViewmodel } from '@/viewmodels/brand-governance-viewmodel'
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'

@Observer
@Component
export default class BrandGovernancePage extends Vue {
  brandCd = ''
  // Watch change of brand code on url to fetch new data
  @Watch('$route.params.brandCd', { immediate: true }) onBrandCdChanged(val: string) {
    if (val) {
      this.vm.setBrandCd(val)
    }
  }
  @Provide() vm = new BrandGovernanceViewmodel()
  tab = null
  items = ['基本的な考え方', 'CGCの各原則を実施しない理由', 'CGCの各原則に基づく開示']
  committeeHeader = [
    {
      text: '委員会',
      value: 'committeeName',
      sortable: false,
      align: 'center',
      width: 11,
      class: 'blue lighten-4',
    },
    {
      text: '全委員',
      value: 'numberOfAll',
      sortable: false,
      align: 'center',
      width: 11,
      class: 'blue lighten-4',
    },
    {
      text: '常勤委員',
      value: 'numberOfFullTime',
      sortable: false,
      align: 'center',
      width: 11,
      class: 'blue lighten-4',
    },
    {
      text: '社内取締役',
      value: 'numberOfInside',
      sortable: false,
      align: 'center',
      width: 11,
      class: 'blue lighten-4',
    },
    {
      text: '社外取締役',
      value: 'numberOfOutside',
      sortable: false,
      align: 'center',
      width: 11,
      class: 'blue lighten-4',
    },
    {
      text: '委員長（議長）',
      value: 'chairperson',
      sortable: false,
      align: 'center',
      width: 23,
      class: 'blue lighten-4',
    },
  ]

  beforeDestroy() {
    this.vm.destroy()
  }
}
</script>

<style scoped>
.v-sheet {
  border: 1px solid black;
}
.border {
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>
