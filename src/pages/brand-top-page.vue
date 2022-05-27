<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex pa-0" cols="12">
        <v-sheet class="font-weight-black text-h5 pr-3" v-text="vm.brandName"></v-sheet>
      </v-col>
      <v-col cols="12" md="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-container class="row">
              <div class="col-9 pa-0 fx-10">
                <v-row no-gutters>
                  <v-col cols="3" class="border-right-top">
                    <div class="text-middle text-center primary lighten-1">時系列比較</div>
                  </v-col>
                  <v-col cols="2 border-right-top">
                    <div class="text-middle text-center primary lighten-1">
                      &#160;
                      {{ vm.selectedTimeSeriesCategory ? vm.selectedTimeSeriesCategory.cls1 : '' }}
                    </div>
                  </v-col>
                  <v-col cols="3" class="border-right-top">
                    <div class="text-middle">
                      <v-select
                        :items="vm.timeSeriesStartYears"
                        :value="vm.selectedTimeSeriesStartYear"
                        @change="vm.selectTimeSeriesStartYear"
                        solo
                        hide-details
                        dense
                        flat
                      >
                      </v-select>
                    </div>
                  </v-col>
                  <v-col cols="1 border-right-top">
                    <div class="text-middle text-center primary lighten-1">~</div>
                  </v-col>
                  <v-col cols="3" class="border-right-top">
                    <div class="text-middle">
                      <v-select
                        :items="vm.timeSeriesEndYears"
                        :value="vm.selectedTimeSeriesEndYear"
                        @change="vm.selectTimeSeriesEndYear"
                        solo
                        hide-details
                        dense
                        flat
                      >
                      </v-select>
                    </div>
                  </v-col>
                </v-row>
                <apexchart
                  type="line"
                  height="350"
                  :options="timeSeriesOptions"
                  :series="timeSeries"
                  class="apx_chart"
                ></apexchart>
              </div>
              <div class="col-3 pr-0 py-0">
                <v-btn
                  v-if="vm.selectedTimeSeriesCategory"
                  class="primary lighten-1 rounded"
                  icon
                  outlined
                  @click="vm.onTimeSeriesBackButtonClick"
                >
                  <v-icon>mdi-arrow-left-thick</v-icon>
                </v-btn>
                <div v-if="!vm.selectedTimeSeriesCategory" class="pt-10">
                  <div
                    v-for="(item, index) in this.vm.timeSeriesEvalCategories"
                    :key="index"
                    class="d-flex justify-space-between align-center mt-3 w-100"
                  >
                    <v-chip
                      class="text-center white--text w-100 px-3 ma-0"
                      :color="item.selected ? vm.colorList[index] : '#7f7f7f'"
                      @click="vm.onToggleEvalCategoriesHandler(item)"
                    >
                      {{ item.cls1 }}
                    </v-chip>
                    <v-btn
                      class="primary lighten-1 rounded ml-2"
                      height="100%"
                      icon
                      outlined
                      @click="vm.onSelectTimeSeriesEvalCategoryHandler(item)"
                    >
                      <v-icon>mdi-arrow-right-thick</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div v-if="vm.selectedTimeSeriesCategory">
                  <v-chip
                    v-for="(item, index) in vm.timeSeriesEvalSpecificList"
                    :key="index"
                    class="text-center white--text w-100 px-3 mt-3 ma-0"
                    :color="item.selected ? vm.colorList[index] : '#7f7f7f'"
                    @click="vm.onToggleEvalSpecificHandler(item)"
                  >
                    {{ item.cls2 }}
                  </v-chip>
                </div>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-container class="row">
              <div class="col-9 pa-0">
                <v-row no-gutters>
                  <v-col cols="3" class="border-right-top">
                    <div class="text-middle text-center primary lighten-1 px-3">競合比較</div>
                  </v-col>
                  <v-col cols="6 border-right-top">
                    <div class="text-middle text-start primary lighten-1 px-3">
                      <span v-if="vm.competitiveEvalSpecificScore">
                        {{ vm.competitiveEvalSpecificScore.evalCateName }}</span
                      >&#160;
                    </div>
                  </v-col>
                  <v-col cols="3" class="border-right-top">
                    <div class="text-middle">
                      <v-select
                        solo
                        hide-details
                        dense
                        flat
                        :items="vm.yearList"
                        :value="vm.selectedComepetitiveYear"
                        @change="vm.onSelectCompetitiveYearHandler"
                      >
                      </v-select>
                    </div>
                  </v-col>
                </v-row>
                <apexchart
                  ref="competitiveChart"
                  class="apx_chart"
                  type="line"
                  height="350"
                  :options="competitiveComparisonOptions"
                  :series="competitiveComparison"
                ></apexchart>
              </div>
              <div class="col-3 pa-0">
                <v-btn v-if="vm.competitiveEvalSpecificScore" depressed @click="vm.onCompetitiveBackButtonClick">
                  &lt;
                </v-btn>
                <brand-search @itemSelected="vm.onSelectCompetitiveBrandHandler" />
                <div class="text-center">
                  <v-chip
                    class="mt-3 text-right white--text"
                    v-for="(brand, index) in vm.selectedComepetitiveBrands"
                    v-bind:key="brand.brandCd"
                    :color="vm.colorList[index]"
                    close
                    @click:close="vm.onCloseCompetitiveBrandHandler(brand.brandCd)"
                    >{{ brand.brandName }}</v-chip
                  >
                </div>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <news-list :items="vm.selectedNews" @categoryChange="vm.onSelectNewsHandler" />
      </v-col>
      <v-col cols="12" md="6">
        <v-col class="ma-0 pa-0" cols="12" xl="4" lg="5" sm="12">
          <div class="h6 primary lighten-1 rounded-tr-lg text-center">{{ governanceSummaryTitle }}</div>
        </v-col>
        <v-col class="ma-0 pa-0" cols="12">
          <v-row v-for="(item, index) in vm.governanceSummary" :key="index" no-gutters>
            <v-sheet class="col px-3 py-1" outlined>
              {{ item.title }}
            </v-sheet>
            <v-sheet class="col px-3 py-1" outlined>
              {{ item.data }}
            </v-sheet>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { BrandTopViewModel } from '../viewmodels/brand-top-viewmodel'
import { autorun, IReactionDisposer } from 'mobx'
import { Observer } from 'mobx-vue'

@Observer
@Component({
  components: {
    BrandSearch: () => import('../components/brand-search.vue'),
    NewsList: () => import('../components/news-list.vue'),
  },
})
export default class TopBrand extends Vue {
  @Provide() vm = new BrandTopViewModel()

  // Watch change of brand code on url to fetch new data
  @Watch('$route.params.brandCd', { immediate: true }) onBrandCdChanged(val: string) {
    if (val) {
      this.vm.setBrandCode(val)
    }
  }

  private readonly governanceSummaryTitle = 'コーポレートガナンス概要'

  timeSeriesOptions = {
    chart: {
      width: '100%',
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    markers: {
      size: 4,
    },
    xaxis: {
      categories: [''],
      labels: {
        style: {
          fontSize: '9px',
        },
      },
    },
    yaxis: {
      min: 0,
    },
    legend: {
      show: false,
    },
    grid: {
      padding: {
        left: 30, // or whatever value that works
        right: 30, // or whatever value that works
      },
    },
  }
  timeSeries = []
  competitiveComparisonOptions = {
    chart: {
      width: '100%',
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      events: {
        markerClick: (event, chartContext, { dataPointIndex }) => {
          if (!this.vm.competitiveEvalSpecificScore) this.vm.onSelectCompetitiveEvalCateHandler(dataPointIndex)
        },
      },
    },
    colors: [],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    markers: {
      size: 4,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: '9px',
        },
      },
    },
    yaxis: {},
    legend: {
      show: false,
    },
    grid: {
      padding: {
        left: 30,
        right: 30,
      },
    },
  }
  competitiveComparison = []
  _disposers: IReactionDisposer[] = []

  buildCompetitiveChartOption(dataList, xAxisList, yAxisList) {
    this.competitiveComparisonOptions = {
      ...this.competitiveComparisonOptions,
      colors: this.vm.colorList as never[],
      xaxis: {
        ...this.competitiveComparisonOptions.xaxis,
        categories: xAxisList,
      },
      yaxis: yAxisList,
    }
    this.competitiveComparison = dataList
  }

  buildTimeSeriesChartOption(dataList, xAxisList, yAxisList) {
    this.timeSeriesOptions = {
      ...this.timeSeriesOptions,
      colors: this.vm.colorList as never[],
      xaxis: {
        ...this.timeSeriesOptions.xaxis,
        categories: xAxisList,
      },
      yaxis: yAxisList,
    }
    this.timeSeries = dataList
  }

  mounted() {
    this._disposers = [
      autorun(() => {
        if (!this.vm.selectedTimeSeriesCategory) {
          const evalCategoryDataList = this.vm.timeSeriesEvalCategoryData
          const evalCategoryXAxisList = this.vm.timeSeriesXaxis
          const evalCategoryYAxis = { min: 0, max: 100 }
          this.buildTimeSeriesChartOption(evalCategoryDataList, evalCategoryXAxisList, evalCategoryYAxis)
        } else {
          const evalSpecificDataList = this.vm.timeSeriesEvalSpecificData
          const evalSpecificXAxisList = this.vm.timeSeriesXaxis
          const evalSpecificYAxis = { min: 0, max: 100 }
          this.buildTimeSeriesChartOption(evalSpecificDataList, evalSpecificXAxisList, evalSpecificYAxis)
        }
      }),
      autorun(() => {
        if (!this.vm.competitiveEvalSpecificScore) {
          const evalXAxisList = this.vm.competitiveEvalCategoryXAxis
          const evalYAxis = { min: 0, max: 100 }
          const evalDataList = this.vm.competitiveEvalCategorySumScore
          this.buildCompetitiveChartOption(evalDataList, evalXAxisList, evalYAxis)
        } else {
          const evalXAxisList = this.vm.competitiveEvalSpecificXAxis
          const evalYAxis = { min: 0, max: 100 }
          const evalDataList = this.vm.competitiveEvalSpecificScore.data
          this.buildCompetitiveChartOption(evalDataList, evalXAxisList, evalYAxis)
        }
      }),
    ]
  }

  beforeDestroy() {
    this._disposers.forEach((d) => d())
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
.text-middle {
  width: 100%;
  line-height: 2.5;
}
.apx_chart {
  width: 100%;
  min-height: 350px !important;
  border: 1px solid #d8d8d8;
}
.border-right-top {
  border-right: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
}
</style>
