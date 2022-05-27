<template>
  <v-container fluid>
    <v-col class="pa-0" cols="12">
      <v-sheet class="text-h5 font-weight-black px-3" v-text="'三菱電機 (6503)'"></v-sheet>
    </v-col>
    <v-col class="pa-0 mt-5" cols="12">
      <v-sheet outlined color="black">
        <v-data-table
          class="elevation-0 rounded-0"
          :headers="esgScoreHeaders"
          :items="vm.table1Data"
          item-key="id"
          dense
          :hide-default-footer="true"
          item-class="pa-0"
        >
          <template v-slot:[`header.evalName`]="{ header }">
            <v-sheet height="100%" outlined color="black">
              <v-sheet class="d-flex justify-center align-center" height="100%" color="primary lighten-1">{{
                header.text
              }}</v-sheet>
            </v-sheet>
          </template>
          <template v-for="slot in headerSlots" v-slot:[slot.slotName]="{ header }">
            <v-sheet :key="slot.value" width="100%" height="100%">
              <v-row no-gutters>
                <v-col>
                  <v-sheet outlined color="black">
                    <v-sheet
                      class="d-flex align-center justify-center"
                      width="100%"
                      height="100%"
                      color="primary lighten-1"
                    >
                      {{ header.text }}
                    </v-sheet>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col md="2" cols="3">
                  <v-sheet outlined color="black">
                    <v-sheet
                      class="d-flex align-center justify-center"
                      width="100%"
                      height="100%"
                      color="primary lighten-1"
                    >
                      評点
                    </v-sheet>
                  </v-sheet>
                </v-col>
                <v-col md="10" cols="9">
                  <v-sheet outlined color="black">
                    <v-sheet
                      class="d-flex align-center justify-center"
                      width="100%"
                      height="100%"
                      color="primary lighten-1"
                    >
                      コメント
                    </v-sheet>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
          </template>
          <template v-slot:[`item`]="{ item }">
            <tr>
              <td class="pa-0">
                <v-sheet height="100%" outlined color="black">
                  <v-sheet class="px-3" height="100%">
                    {{ item.evalName }}
                  </v-sheet>
                </v-sheet>
              </td>
              <td v-for="(year, index) in item.yearScoreList" :key="index" class="ma-0 pa-0">
                <v-sheet class="row ma-0 pa-0" height="100%">
                  <v-sheet class="col-md-2 col-3 pa-0" outlined color="black">
                    <v-sheet class="text-center" width="100%" height="100%">
                      {{ year.score }}
                    </v-sheet>
                  </v-sheet>
                  <v-sheet class="col-md-10 col-9 pa-0" outlined color="black">
                    <v-sheet class="px-3" width="100%" height="100%">
                      {{ year.comment }}
                    </v-sheet>
                  </v-sheet>
                </v-sheet>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>
    <v-col class="pa-0 mt-5" cols="12">
      <v-sheet outlined color="black">
        <v-data-table
          class="elevation-0 rounded-0"
          :headers="esgScoreHeaders"
          :items="vm.esgScoringTableData"
          item-key="id"
          dense
          :hide-default-footer="true"
          item-class="pa-0"
        >
          <template v-slot:[`header.evalName`]="{ header }">
            <v-sheet height="100%" outlined color="black">
              <v-sheet class="d-flex justify-center align-center" height="100%" color="primary lighten-1">
                {{ header.text }}
              </v-sheet>
            </v-sheet>
          </template>
          <template v-for="slot in headerSlots" v-slot:[slot.slotName]="{ header }">
            <v-sheet :key="slot.value" width="100%" height="100%">
              <v-row no-gutters>
                <v-col>
                  <v-sheet outlined color="black">
                    <v-sheet
                      class="d-flex align-center justify-center"
                      width="100%"
                      height="100%"
                      color="primary lighten-1"
                    >
                      {{ header.text }}
                    </v-sheet>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col md="2" cols="3">
                  <v-sheet outlined color="black">
                    <v-sheet
                      class="d-flex align-center justify-center"
                      width="100%"
                      height="100%"
                      color="primary lighten-1"
                    >
                      評点
                    </v-sheet>
                  </v-sheet>
                </v-col>
                <v-col md="10" cols="9">
                  <v-sheet outlined color="black">
                    <v-sheet
                      class="d-flex align-center justify-center"
                      width="100%"
                      height="100%"
                      color="primary lighten-1"
                    >
                      コメント
                    </v-sheet>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
          </template>
          <template v-slot:[`item`]="{ item }">
            <tr>
              <td class="pa-0">
                <v-sheet height="100%" outlined color="black">
                  <v-sheet class="px-3" height="100%">
                    <a href="#/dashboard" target="_blank">
                      {{ item.evalName }}
                    </a>
                  </v-sheet>
                </v-sheet>
              </td>
              <td v-for="(year, index) in item.yearScoreList" :key="index" class="ma-0 pa-0">
                <v-sheet class="row ma-0 pa-0" height="100%">
                  <v-sheet class="col-md-2 col-3 rounded-0 pa-0" outlined color="black">
                    <v-text-field
                      class="rounded-0 pa-0"
                      :value="year.score"
                      solo
                      flat
                      hide-details
                      single-line
                      type="number"
                      min="0"
                      :max="year.maxScore"
                    />
                  </v-sheet>
                  <v-sheet class="col-md-10 col-9 rounded-0 pa-0" outlined color="black">
                    <v-text-field class="rounded-0 pa-0" :value="year.comment" solo flat hide-details single-line />
                  </v-sheet>
                </v-sheet>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>
    <v-col class="pa-0 mt-5 text-end" cols="12">
      <v-btn class="rounded-lg mr-3" elevation="0" color="primary" outlined> CSV取込 </v-btn>
      <v-btn class="rounded-lg mr-3" elevation="0" color="primary" outlined> 登録 </v-btn>
      <v-btn class="rounded-lg" elevation="0" color="primary" outlined> CSV出カ </v-btn>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { EsgScoringViewModel } from '@/viewmodels/esg-scoring-viewmodel'
import { reaction } from 'mobx'

@Observer
@Component
export default class EsgScoringPage extends Vue {
  @Provide() vm = new EsgScoringViewModel()

  //Comprehensive evaluation table
  table1Headers = [
    {
      text: '',
      value: 'col1',
      sortable: false,
      class: 'pa-0 subtitle-1',
    },
    {
      text: '2021年',
      value: 'col2',
      sortable: false,
      class: 'pa-0 subtitle-1',
    },
    {
      text: '2020年',
      value: 'col2',
      sortable: false,
      class: 'pa-0 subtitle-1',
    },
    {
      text: '2019年',
      value: 'col2',
      sortable: false,
      class: 'pa-0 subtitle-1',
    },
  ]

  //Scoring table
  esgScoreHeaders: any[] = []
  headerSlots: any[] = []
  
  mounted() {
    reaction(
      () => this.vm.esgScoreYears,
      () => {
        let headers = [
          {
            text: '自社評価項目',
            value: 'evalName',
            sortable: false,
            class: 'pa-0 subtitle-1',
          },
        ]
        let slots: any[] = []
        this.vm.esgScoreYears.map((year, index) => {
          headers = [
            ...headers,
            {
              text: year + '年',
              value: year,
              sortable: false,
              class: 'pa-0 subtitle-1',
            },
          ]
          slots = [
            ...slots,
            {
              id: index,
              slotName: 'header.' + year,
            },
          ]
        })
        this.esgScoreHeaders = headers
        this.headerSlots = slots
      }
    )
    this.vm.fetchData()
  }
}
</script>

<style scoped></style>
