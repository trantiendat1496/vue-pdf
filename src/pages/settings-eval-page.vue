<template>
  <v-container>
    <h1 class="mb-6 mt-2">評価項目紐づけ登録</h1>
    <v-row align="center">
      <v-col cols="4" class="pt-0">
        <div class="px-3 primary lighten-1 d-inline-flex">競合比較</div>
        <v-select
          class="d-inline-flex eve"
          solo
          hide-details
          dense
          flat
          :items="vm.templateNameList"
          @change="changeSelectedTemplate"
          :value="selectedTemplateId"
        />
      </v-col>
      <v-col>
        <v-btn class="mr-3 mb-3 blue darken-4 white--text" v-for="index in btnList" :key="index" rounded>
          {{ index }}
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="tableRecordItems"
      hide-default-footer
      hide-default-header
      class="mt-3 pa-0"
      dense
      item-class="pa-10"
      disable-sort
    >
      <template v-slot:header>
        <thead>
          <tr>
            <th :colspan="4" class="custom-header">自社評価項目</th>
            <th :colspan="4" class="custom-header">NRI評価項目</th>
          </tr>
          <tr>
            <th v-for="item in headers" :key="item.value" class="custom-header text-no-wrap">
              {{ item.text }}
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="`${item.id.value},${item.nriId.value}`">
            <template v-for="propertyKey in displayedValues">
              <td
                v-if="item[propertyKey].rowspan !== -1"
                :key="`${item.id.value},${item.nriId.value},${propertyKey}`"
                :rowspan="item[propertyKey].rowspan"
              >
                {{ item[propertyKey].value }}
              </td>
            </template>
            <td class="font-weight-bold" @click="vm.deleteDisplayedCorrespondRecord(item.id.value, item.nriId.value)">
              <v-icon>mdi-minus</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <v-row no-gutters>
      <v-col>
        <v-btn icon color="black" class="my-1">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-btn class="blue darken-4 white--text" rounded> 登録 </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { SettingsEvalViewModel } from '@/viewmodels/settings-eval-viewmodel'
import { EsgTemplateDetailModel } from '@/models/esg-template-model'
import { IReactionDisposer, reaction } from 'mobx'

// Data type for table cell
interface TableCellDataType {
  rowspan: number
  value: number | string
}

// Data type for table record
interface TableRecordDataType {
  [key: string]: TableCellDataType | undefined
  id?: TableCellDataType
  displayOrder?: TableCellDataType
  cls1?: TableCellDataType
  cls2?: TableCellDataType
  item?: TableCellDataType
  nriId?: TableCellDataType
  nriCls1?: TableCellDataType
  nriCls2?: TableCellDataType
  nriItem?: TableCellDataType
  nriPerspective?: TableCellDataType
  nriReferenceCd?: TableCellDataType
}

@Component
export default class SettingsEvalPage extends Vue {
  @Provide() vm = new SettingsEvalViewModel()
  btnList = ['新規作成', 'CSV取込', 'CSV出力', '削除']

  private readonly headers = [
    {
      text: '表示順',
      value: 'id',
    },
    {
      text: '大分類',
      value: 'cls1',
    },
    {
      text: '中分類',
      value: 'cls2',
    },
    {
      text: '項目',
      value: 'item',
    },
    {
      text: '大分類',
      value: 'nriCls1',
    },
    {
      text: '小分類',
      value: 'nriCls2',
    },
    {
      text: '評価項目名',
      value: 'nriItem',
    },
    {
      text: '参照情報',
      value: 'nriReferenceCd',
    },
  ]
  private readonly nonmergedCols = ['nriItem', 'nriReferenceCd']
  private readonly displayedValues = [
    'displayOrder',
    'cls1',
    'cls2',
    'item',
    'nriCls1',
    'nriCls2',
    'nriItem',
    'nriReferenceCd',
  ]
  private _disposer: IReactionDisposer[] = []

  selectedTemplateId = ''
  tableRecordItems: TableRecordDataType[] = []

  convertOriginalDataToTableRecordData(originalObj: EsgTemplateDetailModel) {
    let destinationObj: TableRecordDataType = {}
    // Loop through all properties in original data object
    for (const key in originalObj) {
      if (Object.prototype.hasOwnProperty.call(originalObj, key)) {
        const value = originalObj[key]
        destinationObj[key] = { rowspan: 1, value } // Convert original value to TableCellDataType
      }
    }
    return destinationObj
  }

  /**
   * Convert correspond data array to table record items
   */
  getTableRecordItems() {
    this.tableRecordItems = [] // Reset list of table record items

    const originalDataArr = this.vm.displayedCorrespondData
    // If original data array is empty
    if (!originalDataArr || originalDataArr.length === 0) {
      return
    }

    /**
     * Convert the last element of the original data array to TableRecordDataType
     * then unshift TableRecordDataType object to top of the tableRecordItems
     */
    const lastEl = originalDataArr[originalDataArr.length - 1]
    let lastCellObj = this.convertOriginalDataToTableRecordData(lastEl)
    this.tableRecordItems.unshift(lastCellObj)

    // Loop from the second-to-last element to start element of the original data array
    for (let index = originalDataArr.length - 2; index >= 0; index--) {
      const currentEl = originalDataArr[index]
      const prevEl = originalDataArr[index + 1]
      const newCellObj = this.convertOriginalDataToTableRecordData(currentEl)
      // Loop through all properties in current element
      for (const key in currentEl) {
        if (Object.prototype.hasOwnProperty.call(currentEl, key)) {
          const currentValue = currentEl[key]
          const prevValue = prevEl[key]
          // If current key is non merged then continue
          if (this.nonmergedCols.includes(key)) {
            continue
          }
          // If current key value equal value of the previous element
          else if (currentValue === prevValue) {
            // Increase rowspan of the current element key value
            newCellObj[key] = {
              rowspan: lastCellObj[key]!.rowspan + 1,
              value: currentValue,
            }
            // Set rowspan of previous object key value to -1 so that it will not be rendered
            lastCellObj[key]!.rowspan = -1
          } else if (this.displayedValues.includes(key)) break // Break the properties loop if counter different element value
        }
      }
      lastCellObj = newCellObj
      this.tableRecordItems.unshift(newCellObj) // Unshift current element to top of the record items
    }
  }

  /**
   * Change selected template by template id
   */
  changeSelectedTemplate(templateId: string) {
    this.selectedTemplateId = templateId
    this.vm.setDisplayedTemplateById(templateId)
  }

  mounted() {
    this._disposer = [
      reaction(
        () => this.vm.displayedCorrespondData,
        () => this.getTableRecordItems()
      ),
    ]
    if (this.vm.templateNameList.length > 0) this.changeSelectedTemplate(this.vm.templateNameList[0].value)
  }

  beforeDestroy() {
    this._disposer.forEach((d) => d)
  }
}
</script>

<style scoped>
table td {
  border: thin solid rgba(0, 0, 0, 0.12);
  border-collapse: collapse;
}
table td:last-child {
  border: none !important;
}
.custom-header {
  border: thin solid rgba(0, 0, 0, 0.12);
  background-color: #dae3f3;
}
</style>
