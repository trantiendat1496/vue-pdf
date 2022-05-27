<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" lg="6">
        <v-sheet elevation="0" class="mr-5">
          <v-card v-for="brand in vm.mockBrandCodeMasters" :key="brand.brandCd" tile elevation="0">
            <v-card height="135" v-for="report in brand.reports" :key="report.id" tile elevation="0" class="mb-3 bt-1">
              <v-row no-gutters>
                <v-col cols="3" class="d-flex align-center justify-center" @click="vm.reportSelectedChange(report)">
                  <canvas :id="`thumbnail_${report.id}`"></canvas>
                </v-col>
                <v-col cols="9">
                  <v-row no-gutters>
                    <v-col cols="6" class="pr-1">
                      <v-col cols="12" class="pa-1"> ID: {{ report.id }} </v-col>
                      <v-col cols="12" class="pa-1"> Title: {{ report.title }} </v-col>
                      <v-col cols="12" class="pa-1"> Description: {{ report.description }} </v-col>
                    </v-col>
                    <v-col cols="6" class="pl-1">
                      <v-col cols="12" class="pa-1"> Brand Cd: {{ brand.brandCd }} </v-col>
                      <v-col cols="12" class="pa-1"> Brand Name: {{ brand.brandName }} </v-col>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="12" lg="6">
        <v-sheet elevation="4" class="ml-5">
          <v-card v-for="data in vm.datas" :key="data.sid" class="pa-4 bt-1" tile elevation="0">
            <canvas :id="data.sid" @click="highlightPDF(data.sid)"></canvas>
          </v-card>
        </v-sheet>
      </v-col>
      <v-dialog v-model="isShowPDF">
        <v-card tile :width="vm.viewport.width" :height="vm.viewport.height">
          <div id="pdfViewer"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { BrandPDFViewModel } from '@/viewmodels/brand-pdf-viewmodel'

@Observer
@Component
export default class BrandPDF extends Vue {
  @Provide() vm = new BrandPDFViewModel()

  isShowPDF = false

  mounted() {
    this.vm.renderReportThumbnails()
    this.vm.renderReportSelected()
  }

  async highlightPDF(sid: string) {
    this.isShowPDF = true
    await this.vm.highLightPdfByPosition(sid)
  }

  beforeDestroy() {
    this.vm.destroy()
  }
}
</script>

<style scoped>
.bt-1 {
  border-bottom: 1px solid gray;
}
</style>
