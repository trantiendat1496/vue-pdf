import { action, computed, observable } from 'mobx'
import { sum } from 'lodash-es'
import { datastoreService } from '@/services/datastore-service'
import { BrandCodeMaster, EsgScore, Governance, News, Score } from '@/aws/models'
import { groupBy } from 'lodash'
import { ProducerPaginationInput, SortDirection } from '@aws-amplify/datastore'

interface ChartDataType {
  name: string
  data: number[]
}

interface Cls2DataType {
  cls1: string
  cls2: string
  selected: boolean
}

interface Cls1DataType {
  cls1: string
  selected: boolean
  cls2List: Cls2DataType[]
}

export class BrandTopViewModel {
  @observable brandCode = ''
  @observable currentBrand: BrandCodeMaster | undefined

  //Corporate Governance Summary
  @observable brandGovernance: Governance | undefined

  @observable esgScoreReports: EsgScore[] = []

  @observable newsList: News[] = []
  @observable pressNewsList: News[] = []
  @observable scandalNewsList: News[] = []
  @observable selectedNews: News[] = []

  @observable clsList: Cls1DataType[] = []

  @observable yearList: string[] = ['2021']
  @observable colorList: string[] = [
    '#2E93fA',
    '#66DA26',
    '#C126A0',
    '#546E7A',
    '#E91E63',
    '#FF9800',
    '#D8D8D8',
    '#61984A',
    '#E48080',
    '#1B7F7F',
    '#F1BFBF',
    '#5F785F',
  ]

  //Time series graph
  @observable timeSeriesEvalCategories: Cls1DataType[] = []
  @observable timeSeriesEvalSpecificList: Cls2DataType[] = []
  @observable selectedTimeSeriesStartYear: string = this.yearList[this.yearList.length - 1]
  @observable selectedTimeSeriesEndYear: string = this.yearList[0]
  @observable selectedTimeSeriesCategory: Cls1DataType | null = null

  //Competitive Comparison Graph
  @observable selectedComepetitiveYear: string = this.yearList[0]
  @observable selectedComepetitiveCategory: Cls1DataType | null = null
  @observable selectedComepetitiveBrands: BrandCodeMaster[] = []

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

  /**
   * Start of time series graph computed
   */
  @computed get timeSeriesStartYears() {
    if (this.yearList.length > 0)
      return this.yearList.slice(this.yearList.indexOf(this.selectedTimeSeriesEndYear) + 1, this.yearList.length)
  }

  @computed get timeSeriesEndYears() {
    if (this.yearList.length > 0) return this.yearList.slice(0, this.yearList.indexOf(this.selectedTimeSeriesStartYear))
  }

  @computed get timeSeriesXaxis() {
    return this.yearList
      .slice(
        this.yearList.indexOf(this.selectedTimeSeriesEndYear),
        this.yearList.indexOf(this.selectedTimeSeriesStartYear) + 1
      )
      .reverse()
  }

  @computed get timeSeriesEvalCategoryData() {
    const brandReports = this.esgScoreReports
      .filter((report) => report.brandCd === this.brandCode)
      .sort((report) => -report.year!) // Sort reports descending by year since the year list is sorted descending
    const data: ChartDataType[] = this.timeSeriesEvalCategories.map((cls) => {
      if (cls.selected) {
        const sumScore = brandReports
          .filter(
            (yearlyReport) =>
              Number(yearlyReport.year) >= Number(this.selectedTimeSeriesStartYear) &&
              Number(yearlyReport.year) <= Number(this.selectedTimeSeriesEndYear)
          )
          .map((yearlyReport) => {
            return sum(yearlyReport.scores!.filter((item) => item!.cls1 === cls.cls1).map((item) => item!.score))
          })
        return { name: cls.cls1, data: sumScore }
      } else {
        return { name: cls.cls1, data: [] }
      }
    })

    return data
  }

  @computed get timeSeriesEvalSpecificData() {
    if (!this.selectedTimeSeriesCategory) return null
    const brandReports = this.esgScoreReports
      .filter((report) => report.brandCd === this.brandCode)
      .sort((report) => -report.year!) // Sort reports descending by year since the year list is sorted descending
    const data: ChartDataType[] = this.timeSeriesEvalSpecificList.map((cls) => {
      if (cls.selected) {
        const sumScore = brandReports
          .filter(
            (yearlyReport) =>
              Number(yearlyReport.year) >= Number(this.selectedTimeSeriesStartYear) &&
              Number(yearlyReport.year) <= Number(this.selectedTimeSeriesEndYear)
          )
          .map((yearlyReport) => {
            return sum(
              yearlyReport
                .scores!.filter((item) => item!.cls1 === cls.cls1 && item!.cls2 === cls.cls2)
                .map((item) => item!.score)
            )
          })
        return { name: cls.cls2, data: sumScore }
      } else {
        return { name: cls.cls2, data: [] }
      }
    })
    return data
  }
  /**
   * End of time series graph computed
   */

  /**
   * Start of comparison graph computed
   */

  // X - axis for comparison chart
  @computed get competitiveEvalCategoryXAxis() {
    return this.clsList.map((clsItem) => clsItem.cls1)
  }

  @computed get competitiveEvalCategorySumScore() {
    const data: ChartDataType[] = this.esgScoreReports
      .filter(
        (report) =>
          this.selectedComepetitiveBrands.some((brand) => brand.brandCd === report.brandCd) &&
          report.year!.toString() === this.selectedComepetitiveYear.toString()
      )
      .map((report) => {
        const sumScore = this.clsList.map((cls) => {
          return sum(
            report.scores!.filter((scoreItem) => scoreItem!.cls1 === cls.cls1).map((scoreItem) => scoreItem!.score)
          )
        })
        return { name: report.brandName!, data: sumScore }
      })
    return data
  }

  @computed get competitiveEvalSpecificXAxis() {
    if (!this.selectedComepetitiveCategory) return null
    const selectedEvalMasterItem = this.clsList.find(
      (evalMasterItem) => evalMasterItem.cls1 === this.selectedComepetitiveCategory?.cls1
    )
    const evalMasterSpecificNameList = selectedEvalMasterItem!.cls2List.map((evalItem) => evalItem.cls2)
    return evalMasterSpecificNameList
  }

  @computed get competitiveEvalSpecificScore() {
    if (!this.selectedComepetitiveCategory) return null
    const data: ChartDataType[] = this.esgScoreReports
      .filter(
        (report) =>
          this.selectedComepetitiveBrands.some((brand) => brand.brandCd === report.brandCd) &&
          report.year!.toString() === this.selectedComepetitiveYear.toString()
      )
      .map((report) => {
        const sumScore = this.selectedComepetitiveCategory!.cls2List.map((cls2) => {
          return sum(
            report
              .scores!.filter((scoreItem) => scoreItem!.cls1 === cls2.cls1 && scoreItem!.cls2 === cls2.cls2)
              .map((scoreItem) => scoreItem!.score)
          )
        })
        return { name: report.brandName!, data: sumScore }
      })
    return { evalCateName: this.selectedComepetitiveCategory.cls1, data }
  }
  /**
   * End of comparison graph computed
   */

  /**
   * Computed for governance summary
   */
  @computed get governanceSummary() {
    if (!this.brandGovernance) return []
    const cg11 = this.brandGovernance.cg11!
    const cg21 = this.brandGovernance.cg21!
    const cg51 = this.brandGovernance.cg51!
    return [
      { title: '組織形態', data: cg21.organizationalForm },
      {
        title: '外国人株式保有比率',
        data: cg11.foreignShareholdingRatio,
      },
      {
        title: '取締役(独立/社外/全体)',
        data: cg21.numberOfIndependent + '名/' + cg21.numberOfOutsideDirector + '名/' + cg21.numberOfDirectors + '名',
      },
      {
        title: '取締役会の議長',
        data: cg21.chairperson,
      },
      {
        title: '親会社/支配株主',
        data: (cg11.parentName ?? 'なし') + '/' + (cg11.controlShareholderName ?? 'なし'),
      },
      {
        title: '買収防衛篠の導入有無',
        data: cg51.hasTakeoverDefenseMeasure ? '参加' : 'なし',
      },
      {
        title: '国連グロールルトコンパクト',
        // data: summary.unGlobalCompact ? '参加' : 'なし',
        data: 'なし',
      },
    ]
  }

  /**
   * Set data for esgScoreReports, get yearList and clsList
   * @param data array of esg score reports
   */
  @action.bound setEsgScoreReport(data: EsgScore[]): void {
    this.esgScoreReports = data

    const yearList: number[] = []
    let scores: Score[] = []
    const temporaryClsList: { cls1: string; cls2: string }[] = []
    const clsList: any[] = []

    // Loop through all Esg score report to get list of year and list of all scores
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      scores = [...scores, ...(element.scores?.filter((x) => !!x) as Score[])]
      if (!yearList.includes(element.year!)) yearList.push(element.year!)
    }

    this.yearList = yearList.sort((a, b) => b - a).map((year) => year.toString()) // Sort year list descending
    this.selectedTimeSeriesStartYear = this.yearList[this.yearList.length - 1]
    this.selectedTimeSeriesEndYear = this.selectedComepetitiveYear = this.yearList[0]

    // Loop through all score record to get list of cls2
    scores.forEach((score) => {
      if (temporaryClsList.findIndex((item) => item.cls1 === score.cls1 && item.cls2 === score.cls2) === -1)
        if (score.cls1 && score.cls2) temporaryClsList.push({ cls1: score.cls1, cls2: score.cls2 })
    })

    const groupByCls1Obj = groupBy(temporaryClsList, (item) => item.cls1) // Group all cls2 by cls1
    for (const key in groupByCls1Obj) {
      if (Object.prototype.hasOwnProperty.call(groupByCls1Obj, key)) {
        const element = groupByCls1Obj[key]
        clsList.push({ selected: true, cls1: key, cls2List: element })
      }
    }

    this.timeSeriesEvalCategories = this.clsList = clsList
  }

  @action.bound selectTimeSeriesStartYear(val: string): void {
    this.selectedTimeSeriesStartYear = val
  }

  @action.bound selectTimeSeriesEndYear(val: string): void {
    this.selectedTimeSeriesEndYear = val
  }

  @action onToggleEvalCategoriesHandler(item): void {
    this.timeSeriesEvalCategories = this.timeSeriesEvalCategories.map((cate) => {
      if (cate.cls1 === item.cls1) cate.selected = !cate.selected
      return cate
    })
  }

  @action onToggleEvalSpecificHandler(item): void {
    this.timeSeriesEvalSpecificList = this.timeSeriesEvalSpecificList.map((specific) => {
      if (specific.cls2 === item.cls2) specific.selected = !specific.selected
      return specific
    })
  }

  @action onSelectTimeSeriesEvalCategoryHandler(item): void {
    this.selectedTimeSeriesCategory = item
    const cls2ObjList: Cls2DataType[] = []
    const cls2List = this.timeSeriesEvalCategories.find((clsItem) => clsItem.cls1 === item.cls1)!.cls2List
    cls2List.forEach((element) => {
      cls2ObjList.push({ ...element, selected: true })
    })
    this.timeSeriesEvalSpecificList = cls2ObjList
  }

  @action.bound onTimeSeriesBackButtonClick(): void {
    this.selectedTimeSeriesCategory = null
  }

  @action.bound onSelectCompetitiveBrandHandler(item: BrandCodeMaster): void {
    if (!this.selectedComepetitiveBrands.some((brand) => brand.brandCd === item.brandCd)) {
      this.selectedComepetitiveBrands = [...this.selectedComepetitiveBrands, item]
    }
  }

  @action onCloseCompetitiveBrandHandler(brandCd: string): void {
    this.selectedComepetitiveBrands = this.selectedComepetitiveBrands.filter((brand) => brand.brandCd !== brandCd)
  }

  @action.bound onSelectCompetitiveYearHandler(year: string): void {
    this.selectedComepetitiveYear = year
  }

  @action onSelectCompetitiveEvalCateHandler(clsIndex: number): void {
    this.selectedComepetitiveCategory = this.clsList.at(clsIndex)!
  }

  @action.bound onCompetitiveBackButtonClick(): void {
    this.selectedComepetitiveCategory = null
  }

  /**
   * Change displayed news list
   * @param category type of news that need to displayed
   */
  @action.bound onSelectNewsHandler(category: string): void {
    switch (category) {
      case 'scandal':
        this.selectedNews = this.scandalNewsList
        break
      case 'press':
        this.selectedNews = this.pressNewsList
        break
      case 'news':
        this.selectedNews = this.newsList
        break
    }
  }

  /**
   * Fetch 3 type of news from data store
   */
  @action fetchNewsData(): void {
    const paginationProducer: ProducerPaginationInput<News> = {
      sort: (s) => s.datetime(SortDirection.DESCENDING),
    }

    // Fetch all scandal news of current brand
    datastoreService
      .get(News, (item) => item.brandCd('eq', this.brandCode) && item.isScandal('eq', true), paginationProducer)
      .then((result) => {
        if (result && result?.length > 0) {
          this.selectedNews = this.scandalNewsList = result
        }
      })

    // Fetch all press news of current brand
    datastoreService
      .get(News, (item) => item.brandCd('eq', this.brandCode) && item.type('eq', 'press'), paginationProducer)
      .then((result) => {
        if (result && result?.length > 0) this.pressNewsList = result
      })

    // Fetch all news of type 'news' of current brand
    datastoreService
      .get(News, (item) => item.brandCd('eq', this.brandCode) && item.type('eq', 'news'), paginationProducer)
      .then((result) => {
        if (result && result!.length > 0) this.newsList = result
      })
  }

  /**
   * Fetch necessary data from data store
   */
  @action fetchDataFromDataStore(): void {
    // Fetch governance data
    datastoreService
      .get(Governance, (item) => item.brandCd('eq', this.brandCode))
      .then((result) => {
        if (result && result.length > 0) this.brandGovernance = result[0]
      })

    // Fetch all esg score reports data
    datastoreService.get(EsgScore).then((result) => {
      if (result) this.setEsgScoreReport(result)
    })

    // Fetch brancd data
    datastoreService
      .get(BrandCodeMaster, (brand) => brand.brandCd('eq', this.brandCode))
      .then((result) => {
        if (result && result.length > 0) this.currentBrand = result[0]
      })

    // Fetch news data
    this.fetchNewsData()
  }

  @action setBrandCode(brandCode: string): void {
    this.brandCode = brandCode
    this.fetchDataFromDataStore()
  }
}
