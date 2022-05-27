import { BrandCodeMaster, Report } from '@/aws/models'
import { datastoreService } from '@/services/datastore-service'
import { uniq } from 'lodash'
import { action, computed, observable } from 'mobx'
import { Storage } from '@aws-amplify/storage'
import { asyncAction } from 'mobx-utils'

// Data type for a table cell
interface ReportRecordDataType {
  fileName: string
  reportUrl: string
}

export class BrandPublicReport {
  @observable brandCd = ''
  @observable currentBrand: BrandCodeMaster | undefined
  @observable tableData = new Map()
  @observable yearList: number[] = []

  constructor() {
    //
  }

  /**
   * Compute for brand name
   */
  @computed get brandName() {
    if (!this.currentBrand) return ''
    return `[${this.currentBrand.brandCd}] ${this.currentBrand.brandName} (${this.currentBrand.industryName})`
  }

  @action fetchData() {
    // Fetch brand data
    datastoreService
      .get(BrandCodeMaster, (brand) => brand.brandCd('eq', this.brandCd))
      .then((brands) => {
        if (brands && brands.length > 0) this.currentBrand = brands[0]
      })

    // Fetch related report data
    datastoreService
      .get(Report, (report) => report.brandCd('eq', this.brandCd))
      .then((reports) => {
        if (reports) this.processReportData(reports)
      })
  }

  /**
   * Set brand code then fetch data
   * @param brandCode brand code
   */
  @action setBrandCode(brandCode: string) {
    this.brandCd = brandCode
    this.fetchData()
  }

  /**
   * Process reports data to get yearList and convert to table record data
   * @param reports reports data
   */
  @asyncAction *processReportData(reports: Report[]) {
    this.yearList = uniq(reports.map((report) => report.year) as number[]).sort() // Get all years in report data
    const emptyArr: ReportRecordDataType[] = []
    const tableData = new Map<
      number,
      {
        ar: ReportRecordDataType[]
        esg: ReportRecordDataType[]
        cg: ReportRecordDataType[]
        other: ReportRecordDataType[]
      }
    >()

    // Initial data for tableData
    this.yearList.forEach((year) => tableData.set(year, { ar: emptyArr, esg: emptyArr, cg: emptyArr, other: emptyArr }))
    yield reports.forEach(async (report) => {
      if (report.year) {
        const yearReports = tableData.get(report.year) // Get all report in with the same year from tableData Map
        const currentType = report.type
        if (yearReports && currentType) {
          const httpUrl = await this.getReportHttpUrl(report.reportUrl) // Convert reportUrl to HttpUrl to open on browser
          yearReports[currentType] = [...yearReports[currentType], { fileName: report.fileName, reportUrl: httpUrl }] // Append report to correct array
          tableData.set(report.year, yearReports) // Change data in the map
        }
        this.tableData = tableData
        console.log(this.tableData)
      }
    })
  }

  /**
   * Convert report url to http url that can be open on browser
   * @param reportUrl report url from database
   * @returns http url to open on browser
   */
  async getReportHttpUrl(reportUrl): Promise<string> {
    if (!reportUrl) return '#'
    const result = await Storage.get(`reports-pdf/${reportUrl}`, {
      level: 'public',
    })
    return result
  }
}
