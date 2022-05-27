import { action, computed, observable } from 'mobx'

export class CorporateSearchViewModel {
  @observable items = ['TEST 1', 'TEST 2']
  private readonly numberItemDisplayed = 7

  @observable corparationsMock = [
    {
      id: '1',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2000'),
      ESG_info: 'ESG information',
    },
    {
      id: '2',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2021'),
      ESG_info: '',
    },
    {
      id: '3',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2021'),
      ESG_info: 'ESG information',
    },
    {
      id: '4',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2021'),
      ESG_info: 'ESG information',
    },
    {
      id: '5',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2021'),
      ESG_info: 'ESG information',
    },
    {
      id: '6',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2021'),
      ESG_info: 'ESG information',
    },
    {
      id: '7',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2021'),
      ESG_info: 'ESG information',
    },
    {
      id: '8',
      name: 'Name',
      industry: 'industry',
      market: 'market',
      fiscal_year: new Date('12/31/2021'),
      ESG_info: 'ESG information',
    },
  ]

  constructor() {
    //
  }

  /// FEATURE SEARCH
  @observable private keySearch = ''
  @observable private isSearching = false

  @action search() {
    if (!this.keySearch || this.isSearching) return
    // TODO
  }

  @action.bound changeKeySearch(val: string) {
    this.keySearch = val
  }

  ///FEATURE NEXT AND PREV
  @observable private page = 0
  @action next() {
    if (!this.page || (this.page + 1) * this.numberItemDisplayed < this.corparationsMock.length) {
      this.page++
    }
  }

  @action prev() {
    if (this.page) {
      this.page--
    }
  }

  @computed get displayCorporations() {
    return this.corparationsMock.slice(this.page * this.numberItemDisplayed, (this.page + 1) * this.numberItemDisplayed)
  }
}
