import { BrandCodeMaster, News } from '@/aws/models'
import { datastoreService } from '@/services/datastore-service'
import { ProducerPaginationInput } from '@aws-amplify/datastore'
import { action, computed, observable } from 'mobx'
import { SortDirection } from 'aws-amplify'

export class BrandNewsPressViewModel {
  @observable brandCode = ''
  @observable currentBrand: BrandCodeMaster | undefined

  //News data
  @observable newsList: News[] = []
  @observable newsCategory = 'scandal'

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

  @computed get displayedNews() {
    switch (this.newsCategory) {
      case 'scandal':
        return this.newsList.filter((item) => item.isScandal)
      case 'press':
        return this.newsList.filter((item) => item.type === 'press')
      case 'news':
        return this.newsList.filter((item) => item.type === 'news')
      default:
        return []
    }
  }

  @action setBrandCode(brandCode: string): void {
    this.brandCode = brandCode
    this.fetchData()
  }

  /**
   * Change displayed news list
   * @param category type of news that need to displayed
   */
  @action.bound onSelectNewsHandler(category: string): void {
    this.newsCategory = category
  }

  /**
   * Fetch 3 type of news from data store
   */
  @action fetchData(): void {
    // Fetch brancd data
    datastoreService
      .get(BrandCodeMaster, (brand) => brand.brandCd('eq', this.brandCode))
      .then((result) => {
        if (result && result.length > 0) this.currentBrand = result[0]
      })

    const paginationProducer: ProducerPaginationInput<News> = {
      sort: (s) => s.datetime(SortDirection.DESCENDING),
    }
    // Fetch all news
    datastoreService
      .get(News, (item) => item.brandCd('eq', this.brandCode), paginationProducer)
      .then((result) => {
        if (result && result.length > 0) this.newsList = result
      })
  }
}
