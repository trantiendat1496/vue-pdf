import { action, computed, observable } from 'mobx'
import { groupBy } from 'lodash'
import moment from 'moment'
import { datastoreService } from '@/services/datastore-service'
import { BrandCodeMaster, Governance } from '@/aws/models'
import { SortDirection } from 'aws-amplify'

export class BrandOfficerViewModel {
  @observable brandCd = ''
  @observable governancesData: Governance[] = []
  @observable currentBrand: BrandCodeMaster | null = null

  @observable officerAppearanceRecords: any[] = []
  @observable dateList: string[] = []

  constructor() {
    //
  }

  @computed get brandName() {
    if (!this.currentBrand) return ''
    return this.currentBrand
      ? '【' +
          this.currentBrand.brandCd +
          '】' +
          this.currentBrand.brandName +
          ' (' +
          this.currentBrand.industryName +
          ')'
      : ''
  }

  // table 2
  @computed get independenceOutsideDirectorItems() {
    if (!this.governancesData.length || !this.governancesData[0]) return []
    return this.governancesData[0].cg22d1
  }
  // Table 3
  @computed get outsideDirectors() {
    if (!this.governancesData || !this.governancesData[0]) return []
    return this.governancesData[0].cg22d2
  }

  // Process data for table 1
  @action.bound processOfficerAppearanceData(): void {
    const data = this.governancesData
    const officerNameList: { name: string; date: string }[] = []
    const officerRecordList: any[] = []
    const dateList: string[] = []

    for (let index = 0; index < data.length; index++) {
      const governanceData = data[index]
      const date = moment(governanceData.pressDate).format('YY/MM').toString()
      if (!dateList.includes(date)) dateList.push(date)
      governanceData.cg22d1?.forEach((officer) => {
        if (officer?.name) officerNameList.push({ name: officer?.name, date })
      })
    }

    // Group by officer name
    const officerRecordRawObject = groupBy(officerNameList, (officer) => officer.name)
    for (const nameProp in officerRecordRawObject) {
      if (Object.prototype.hasOwnProperty.call(officerRecordRawObject, nameProp)) {
        const appearedDateList = officerRecordRawObject[nameProp]
        let officerRecord = { name: nameProp }
        // Assign all date in the date list to object
        dateList.forEach((el) => (officerRecord = Object.assign(officerRecord, { [el]: '-' })))
        // Mark dates that officer appear in records
        for (let index = 0; index < appearedDateList.length; index++) {
          const { date: appearedDate } = appearedDateList[index]
          officerRecord[appearedDate] = '〇'
        }
        officerRecordList.push(officerRecord)
      }
    }
    this.dateList = dateList
    this.officerAppearanceRecords = officerRecordList
  }

  @action.bound setBrandCode(brandCd: string): void {
    this.brandCd = brandCd
    this.fetchData()
  }

  @action.bound fetchData(): void {
    datastoreService
      .get(BrandCodeMaster, (brand) => brand.brandCd('eq', this.brandCd))
      .then((result) => {
        if (result && result.length > 0) this.currentBrand = result[0]
      })

    datastoreService
      .get(Governance, (governance) => governance.brandCd('eq', this.brandCd), {
        sort: (s) => s.pressDate(SortDirection.DESCENDING),
      })
      ?.then((result) => {
        if (result) {
          this.governancesData = result
          this.processOfficerAppearanceData()
        }
      })
  }
}
