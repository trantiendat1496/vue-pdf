import { globalStore } from '@/stores/global-store'
import { action, computed, observable } from 'mobx'
import { uniqBy } from 'lodash'
import { Portfolio, Report, EsgTemplate, EsgScore, BrandCodeMaster } from '@/aws/models'
import { ZenObservable } from 'zen-observable-ts'
import { datastoreService } from '@/services/datastore-service'

export class BrandReportInfoViewModel {
  subcriptions$: (ZenObservable.Subscription | undefined)[] = []
  disposers$: any[] = []
  reportTypes = [
    { text: '統合報告書', value: 'ar' },
    { text: 'サステナビリティレポート', value: 'sr' },
    { text: '環境報告書', value: 'er' },
    { text: 'コーポレートガバナンス報告書', value: 'cg' },
  ]
  @observable portfolioList: Portfolio[] = []
  @observable yearList: (number | undefined)[] = []
  @observable templateList: EsgTemplate[] = []
  @observable reports: Report[] = []
  @observable esgScores: EsgScore[] = []
  @observable brand: BrandCodeMaster | undefined = undefined
  @observable selectedView = 0
  @observable selectedYear: number | undefined = undefined
  @observable selectedPortfolio: Portfolio | undefined = undefined
  @observable selectedTemplate: EsgTemplate | undefined = undefined

  constructor() {
    this.observeData()
  }

  @computed get brandName() {
    return this.brand
      ? '【' + this.brand.brandCd + '】' + this.brand.brandName + ' (' + this.brand.industryName + ')'
      : ''
  }

  @computed get selectedType() {
    return this.reportTypes[this.selectedView - 1]
  }

  @computed get portfolioSelectionList() {
    return this.portfolioList.map((portfolio) => {
      return {
        text: portfolio.portfolioName,
        value: portfolio.id,
      }
    })
  }

  @computed get templateSelectionList() {
    return this.templateList.map((template) => {
      return {
        text: template.templateName,
        value: template.id,
      }
    })
  }

  @computed get displayedReports(): Report[] {
    let reports: Report[] = []
    if (this.selectedView === 0) {
      this.reportTypes.forEach((type) => {
        const report = this.reports.find(
          (report) =>
            report.brandCd === this.brand?.brandCd && report.type === type.value && report.year === this.selectedYear
        )
        if (report) {
          reports = [...reports, report]
        }
      })
    } else {
      this.selectedPortfolio?.brands?.forEach((brand) => {
        const report = this.reports.find(
          (report) =>
            report.brandCd === brand?.brandCd &&
            report.type === this.selectedType.value &&
            report.year === this.selectedYear
        )
        if (report) {
          reports = [...reports, report]
        }
      })
    }
    return reports
  }

  @computed get reportTableData() {
    const templateCorresponds = this.selectedTemplate?.correspond
      ?.filter((x) => x?.displayOrder && x.nriDisplayOrder)
      .sort((x, y) => x!.displayOrder! - y!.displayOrder!)
    if (this.selectedView === 0) {
      const data = uniqBy(
        templateCorresponds,
        (correspond) => `${correspond?.cls1}${correspond?.cls2}${correspond?.item}`
      ).map((uniqCorrespond) => {
        const score = this.esgScores
          .find((esgScore) => esgScore.brandCd === this.brand?.brandCd && esgScore.year === this.selectedYear)
          ?.scores?.find((score) => score?.amId === uniqCorrespond?.id)
        const nriCorresponds = templateCorresponds
          ?.filter(
            (correspond) =>
              correspond?.cls1 === uniqCorrespond?.cls1 &&
              correspond?.cls2 === uniqCorrespond?.cls2 &&
              correspond?.item === uniqCorrespond?.item
          )
          .sort((x, y) => x!.displayOrder! - y!.displayOrder!)
        const pdfs = this.displayedReports.map((report) => {
          return nriCorresponds?.map((nriCorrespond, index) => {
            const positions = report?.position?.filter((position) => position?.label === nriCorrespond?.nriId)
            const thumbnail = positions ? positions[0] : null
            return {
              url: 'reports-pdf/' + report.reportUrl,
              positions: positions || [],
              thumbnailPosition: thumbnail,
            }
          })
        })
        return {
          id: uniqCorrespond?.nriItem,
          correspondNames: [uniqCorrespond?.cls1 + ' > ' + uniqCorrespond?.cls2, uniqCorrespond?.item],
          score: score ? score.score + '/' + score.scoreMax : '',
          nriCorresponds: nriCorresponds,
          pdfs: pdfs,
        }
      })
      return data
    } else {
      const data = uniqBy(
        templateCorresponds,
        (correspond) => `${correspond?.cls1}${correspond?.cls2}${correspond?.item}`
      ).map((uniqCorrespond) => {
        const score = this.esgScores
          .find((esgScore) => esgScore.brandCd === this.brand?.brandCd && esgScore.year === this.selectedYear)
          ?.scores?.find((score) => score?.amId === uniqCorrespond?.id)
        const nriCorresponds = templateCorresponds
          ?.filter(
            (correspond) =>
              correspond?.cls1 === uniqCorrespond?.cls1 &&
              correspond?.cls2 === uniqCorrespond?.cls2 &&
              correspond?.item === uniqCorrespond?.item
          )
          .sort((x, y) => x!.displayOrder! - y!.displayOrder!)
        const pdfs = this.displayedReports.map((report) => {
          return nriCorresponds?.map((nriCorrespond, index) => {
            const positions = report?.position?.filter((position) => position?.label === nriCorrespond?.nriId)
            const thumbnail = positions ? positions[0] : null
            return report
              ? {
                  url: 'reports-pdf/' + report.reportUrl,
                  positions: positions || [],
                  thumbnailPosition: thumbnail,
                }
              : undefined
          })
        })
        return {
          id: uniqCorrespond?.nriItem,
          correspondNames: [uniqCorrespond?.cls1 + ' > ' + uniqCorrespond?.cls2, uniqCorrespond?.item],
          score: score ? score.score + '/' + score.scoreMax : '',
          nriCorresponds: nriCorresponds,
          pdfs: pdfs,
        }
      })
      return data
    }
  }

  @action.bound onSelectViewHandler(viewIndex) {
    this.selectedView = viewIndex
  }

  @action.bound onSelectYearHandler(year: number) {
    this.selectedYear = year
  }

  @action.bound onSelectTemplateHandler(id: string): void {
    this.selectedTemplate = this.templateList.find((template) => template.id === id)!
  }

  @action.bound onSelectPortfolioHandler(id: string): void {
    this.selectedPortfolio = this.portfolioList.find((portfolio) => portfolio.id === id)!
  }

  @action.bound observeData() {
    this.subcriptions$.push(
      datastoreService.observeQuery(BrandCodeMaster)?.subscribe((res) => {
        const brandCd = globalStore.router.currentRoute.params.brandCd
        this.brand = res.items.find((brand) => brand.brandCd === brandCd)
      })
    )
    this.subcriptions$.push(
      datastoreService.observeQuery(Report)?.subscribe((res) => {
        this.reports = res.items
        this.yearList = uniqBy(this.reports, (report) => report.year)
          .sort((x, y) => y.year! - x.year!)
          .map((report) => report.year)
        if (this.yearList.length > 0 && !this.selectedYear) {
          this.selectedYear = this.yearList[0]
        }
      })
    )
    this.subcriptions$.push(
      datastoreService.observeQuery(EsgScore)?.subscribe((res) => {
        this.esgScores = res.items
      })
    )
    this.subcriptions$.push(
      datastoreService.observeQuery(Portfolio)?.subscribe((res) => {
        this.portfolioList = res.items
        this.onSelectPortfolioHandler(res.items[0]?.id)
      })
    )
    this.subcriptions$.push(
      datastoreService.observeQuery(EsgTemplate)?.subscribe((res) => {
        this.templateList = res.items
        this.onSelectTemplateHandler(res.items[0]?.id)
      })
    )
  }

  onClickEsgScoringBtnHandler() {
    globalStore.router.push({ path: `/esg-scoring` })
  }

  destroy() {
    this.subcriptions$.forEach((subscription) => {
      subscription?.unsubscribe()
    })
    this.disposers$.forEach((disposer) => disposer())
  }
}
