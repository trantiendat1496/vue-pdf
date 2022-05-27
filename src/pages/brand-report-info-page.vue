<template>
  <v-container fluid>
    <pdf-dialog :show="pdfDialog" :pdf="reportPdf" :position="thumbnailPosition" @close="onClosePdfDialog"></pdf-dialog>
    <v-col class="d-flex pa-0" cols="12">
      <v-sheet class="font-weight-black text-h5 pr-3" v-text="vm.brandName"></v-sheet>
      <v-btn
        class="font-weight-black black--text"
        color="primary lighten-1"
        elevation="0"
        @click="vm.onClickEsgScoringBtnHandler"
      >
        スコア管理画面を開く
      </v-btn>
    </v-col>
    <v-col class="pa-0" cols="12">
      <v-row no-gutters>
        <v-col class="pa-0" cols="12">
          <v-btn
            v-for="(view, index) in views"
            class="font-weight-black black--text mr-3 mt-3"
            elevation="0"
            min-width="150"
            :key="index"
            :color="(vm.selectedView === index && 'primary') || 'primary lighten-1'"
            @click="vm.onSelectViewHandler(index)"
          >
            {{ view }}
          </v-btn>
        </v-col>
        <v-col class="d-flex pa-0 mt-3" cols="12">
          <v-sheet class="row pa-0 ma-0" height="36">
            <v-sheet class="col-4 primary lighten-1 d-flex align-center pa-0 px-3">年</v-sheet>
            <v-sheet class="col-8 pa-0" height="100%" outlined>
              <v-select
                hide-details
                dense
                solo
                flat
                :items="vm.yearList"
                :value="vm.selectedYear"
                @change="vm.onSelectYearHandler"
              >
              </v-select>
            </v-sheet>
          </v-sheet>
          <v-sheet class="row pa-0 ma-0" height="36">
            <v-sheet class="col-4 primary lighten-1 d-flex align-center pa-0 px-3">銘柄</v-sheet>
            <v-sheet class="col-8 pa-0" height="100%" outlined>
              <v-select
                hide-details
                solo
                dense
                flat
                :disabled="vm.selectedView === 0"
                :items="vm.portfolioSelectionList"
                :value="vm.selectedPortfolio ? vm.selectedPortfolio.id : undefined"
                @change="vm.onSelectPortfolioHandler"
              >
              </v-select>
            </v-sheet>
          </v-sheet>
          <v-sheet class="row pa-0 ma-0" height="36">
            <v-sheet class="col-4 primary lighten-1 d-flex align-center pa-0 px-3">評価項目</v-sheet>
            <v-sheet class="col-8 pa-0" height="100%" outlined>
              <v-select
                hide-details
                dense
                solo
                flat
                :disabled="vm.selectedView === 0"
                :items="vm.templateSelectionList"
                :value="vm.selectedTemplate ? vm.selectedTemplate.id : undefined"
                @change="vm.onSelectTemplateHandler"
              >
              </v-select>
            </v-sheet>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="pa-0 mt-5" cols="12">
      <v-sheet outlined color="black">
        <v-data-table
          class="subtitle-2 elevation-0 rounded-0"
          :headers="reportTableHeaders"
          :items="vm.reportTableData"
          item-key="id"
          dense
          :hide-default-footer="true"
          item-class="pa-0"
        >
          <template v-for="(header, index) in reportTableHeaders" v-slot:[header.slot]>
            <v-sheet :key="index" height="100%" min-height="50" outlined color="black">
              <v-sheet
                class="d-flex flex-column justify-center text-no-wrap px-4"
                height="100%"
                color="primary lighten-1"
              >
                <v-sheet class="text-center" color="primary lighten-1">
                  {{ header.text }}
                </v-sheet>
                <v-sheet v-if="header.subText" class="text-center" color="primary lighten-1">
                  {{ header.subText }}
                </v-sheet>
              </v-sheet>
            </v-sheet>
          </template>
          <template v-slot:[`item`]="{ item }">
            <tr>
              <td class="pa-0">
                <v-sheet height="100%" color="black" outlined>
                  <v-sheet class="d-flex flex-column pa-3" height="100%">
                    <v-sheet v-for="(name, index) in item.correspondNames" :key="index" :class="index > 0 && 'pt-3'">
                      {{ name }}
                    </v-sheet>
                  </v-sheet>
                </v-sheet>
              </td>
              <td class="pa-0">
                <v-sheet height="100%" color="black" outlined>
                  <v-sheet class="d-flex justify-center align-center px-3" height="100%">
                    {{ item.score }}
                  </v-sheet>
                </v-sheet>
              </td>
              <td class="pa-0">
                <v-sheet class="d-flex flex-column" height="100%">
                  <v-sheet
                    v-for="(correspond, index) in item.nriCorresponds"
                    :key="index"
                    height="100%"
                    color="black"
                    outlined
                  >
                    <v-sheet class="d-flex flex-column pa-3" height="100%" min-height="200">
                      <v-sheet>
                        {{ correspond.nriCls1 }}
                      </v-sheet>
                      <v-sheet>
                        {{ '>' + correspond.nriCls2 }}
                      </v-sheet>
                      <v-sheet class="pt-3">
                        {{ correspond.nriItem }}
                      </v-sheet>
                    </v-sheet>
                  </v-sheet>
                </v-sheet>
              </td>
              <td class="pa-0">
                <v-sheet class="d-flex flex-column" height="100%">
                  <v-sheet
                    v-for="(correspond, index) in item.nriCorresponds"
                    :key="index"
                    height="100%"
                    color="black"
                    outlined
                  >
                    <v-sheet class="d-flex justify-center align-center" height="100%">
                      <v-tooltip v-if="correspond.nriReferenceCd" bottom>
                        <template v-slot:activator="{ on }">
                          <v-sheet class="text-center pa-3" v-on="on">
                            {{ correspond.nriReferenceCd }}
                          </v-sheet>
                        </template>
                        <v-sheet class="white--text" max-width="200" color="rgb(0, 0, 0, 0)">{{
                          correspond.nriPerspective
                        }}</v-sheet>
                      </v-tooltip>
                    </v-sheet>
                  </v-sheet>
                </v-sheet>
              </td>
              <td v-for="(pdfs, rowIndex) in item.pdfs" :key="rowIndex" class="pa-0">
                <v-sheet class="d-flex flex-column" height="100%">
                  <v-sheet v-for="(pdf, colIndex) in pdfs" :key="colIndex" height="100%" color="black" outlined>
                    <v-sheet class="d-flex justify-center align-center px-3" height="100%">
                      <pdf-thumbnail
                        v-if="pdf"
                        :key="rowIndex + colIndex + pdf.thumbnailPosition + pdf.url"
                        :url="pdf.url"
                        :index="rowIndex"
                        :pdf="reportPdfs[rowIndex]"
                        :position="pdf.thumbnailPosition"
                        @click="onClickThumbnail"
                      ></pdf-thumbnail>
                      <v-sheet v-else>No report</v-sheet>
                    </v-sheet>
                  </v-sheet>
                </v-sheet>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { autorun } from 'mobx'
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { BrandReportInfoViewModel } from '../viewmodels/brand-report-info-viewmodel'
import { Position } from '@/aws/models'
import { pdfHelper } from '@/helpers/pdf.helper'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

@Observer
@Component({
  components: {
    PdfThumbnail: () => import('../components/pdf-thumbnail.vue'),
    PdfDialog: () => import('../components/pdf-dialog.vue'),
  },
})
export default class BrandReportInfoPage extends Vue {
  @Provide() vm = new BrandReportInfoViewModel()
  views = ['デフォルト表示', '統合報告書', 'サステナビリティ', '環境報告書', 'コーポレートガバナンス']
  defaultHeaders: any[] = [
    {
      text: '評価項目',
      value: 'correspondNames',
      sortable: false,
      class: 'pa-0 subtitle-1',
      slot: 'header.correspondNames',
    },
    {
      text: '評点',
      value: 'score',
      sortable: false,
      class: 'pa-0 subtitle-1',
      slot: 'header.score',
    },
    {
      text: 'NRI評価項目',
      value: 'nriName',
      sortable: false,
      class: 'pa-0 subtitle-1',
      slot: 'header.nriName',
    },
    {
      text: '参照情報',
      value: 'nriCd',
      sortable: false,
      class: 'pa-0 subtitle-1',
      slot: 'header.nriCd',
    },
  ]
  reportTableHeaders: any[] = []
  reportNameHeader = ''
  pdfDialog = false
  thumbnailPosition: Position | null = null

  reportPdfs: Promise<PDFDocumentProxy>[] = []
  reportPdf: Promise<PDFDocumentProxy> | null = null
  reportDisposers$: any[] = []

  mounted() {
    this.reportDisposers$ = [
      ...this.reportDisposers$,
      autorun(() => {
        this.reportPdfs = []
        if (this.vm.selectedView === 0) {
          let headers = this.defaultHeaders
          this.vm.displayedReports.forEach(async (report) => {
            this.reportPdfs = [...this.reportPdfs, pdfHelper.getPdf('reports-pdf/' + report.reportUrl)]
            const type = this.vm.reportTypes.find((type) => type.value === report.type)!
            headers = [
              ...headers,
              {
                text: type.text,
                subText: report.type === 'cg' ? report.date : report.year,
                value: type.value,
                sortable: false,
                class: 'pa-0 subtitle-1',
                slot: 'header.' + type.value,
              },
            ]
          })
          this.reportTableHeaders = headers as never[]
          this.reportNameHeader = ''
        } else {
          let headers = this.defaultHeaders
          this.vm.displayedReports?.forEach((report) => {
            this.reportPdfs = [...this.reportPdfs, pdfHelper.getPdf('reports-pdf/' + report.reportUrl)]
            headers = [
              ...headers,
              {
                text: report.brandName + '(' + report.brandCd + ')',
                subText: report.type === 'cg' ? report.date : report.year,
                value: report.brandCd,
                sortable: false,
                class: 'pa-0 subtitle-1',
                slot: 'header.' + report.brandCd,
              },
            ]
          })
          this.reportTableHeaders = headers as never[]
          this.reportNameHeader = this.vm.selectedType.text
        }
      }),
    ]
  }
  onClickThumbnail(index: number, position: Position) {
    this.pdfDialog = true
    this.reportPdf = this.reportPdfs[index]
    this.thumbnailPosition = position ?? {
      label: '1',
      pageNo: 1,
      top: 0,
      left: 0,
      width: 500,
      height: 500,
    }
  }

  onClosePdfDialog() {
    this.pdfDialog = false
  }

  destroyed() {
    this.reportDisposers$.forEach((d) => d())
    this.vm.destroy()
  }
}
</script>

<style scoped></style>
