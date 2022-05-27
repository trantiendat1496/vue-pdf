import { News, Portfolio } from '@/aws/models'
import { datastoreService } from '@/services/datastore-service'
import { action, computed, observable } from 'mobx'
import moment from 'moment'
import { ZenObservable } from 'zen-observable-ts'

export class TopViewModel {
  @observable portfolioList: Portfolio[] = []
  @observable selectedPortfolio: Portfolio | undefined = undefined

  @observable newsList: News[] = []
  @observable selectedNews: News[] = []

  subcriptions$: (ZenObservable.Subscription | undefined)[] = []

  constructor() {
    this.addObserveQueryListener()
  }

  @action addObserveQueryListener() {
    this.subcriptions$ = [
      // observeQuery Portfolio
      datastoreService.observeQuery(Portfolio)?.subscribe((snapshot) => {
        this.portfolioList = snapshot.items
        if (this.portfolioList.length) {
          this.selectedPortfolio = this.portfolioList[0]
        }
      }),
      // observeQuery News
      datastoreService.observeQuery(News)?.subscribe((snapshot) => {
        this.newsList = snapshot.items
        if (this.newsList.length) {
          this.selectedNews = this.scandals
        }
      }),
    ]
  }

  @action.bound onSelectPortfolioHandler(id: string): void {
    this.selectedPortfolio = this.portfolioList.find((portfolio) => portfolio.id === id)!
  }
  @action.bound onSelectNewsHandler(category: string): void {
    switch (category) {
      case 'scandal':
        this.selectedNews = this.scandals
        break
      case 'press':
        this.selectedNews = this.presses
        break
      case 'news':
        this.selectedNews = this.news
        break
    }
  }

  // Portfilio
  @computed get portfolioSelectionList() {
    return this.portfolioList.map((portfolio) => {
      return {
        text: portfolio.portfolioName,
        value: portfolio.id,
      }
    })
  }

  @computed get selectedPortfolioBrands() {
    return this.selectedPortfolio?.brands ?? []
  }

  @computed get portfolioNameSelected() {
    return this.selectedPortfolio?.id ?? ''
  }

  // News
  @computed get scandals() {
    const newsList = this.newsList.filter(
      (news) => news.isScandal && this.selectedPortfolioBrands.some((brand) => brand?.brandCd === news.brandCd)
    )

    return this.sortByDateTimeNearest(newsList)
  }

  @computed get presses() {
    const newsList = this.newsList.filter(
      (news) =>
        news.type &&
        news.type === 'press' &&
        this.selectedPortfolioBrands.some((brand) => brand?.brandCd === news.brandCd)
    )
    return this.sortByDateTimeNearest(newsList)
  }
  @computed get news() {
    const newsList = this.newsList.filter(
      (news) =>
        news.type &&
        news.type === 'news' &&
        this.selectedPortfolioBrands.some((brand) => brand?.brandCd === news.brandCd)
    )
    return this.sortByDateTimeNearest(newsList)
  }

  sortByDateTimeNearest(data) {
    return data.sort(
      (x, y) => moment(y.datetime, 'YYYY/MM/DD hh:mm:ss').unix() - moment(x.datetime, 'YYYY/MM/DD hh:mm:ss').unix()
    )
  }

  destroy() {
    this.subcriptions$.forEach((subcription) => subcription?.unsubscribe())
  }
}
