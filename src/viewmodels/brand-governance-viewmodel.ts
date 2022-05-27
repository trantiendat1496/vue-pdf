import { action, computed, observable } from 'mobx'
import { uniq, uniqBy } from 'lodash-es'
import moment from 'moment'
import { BrandCodeMaster, Governance } from '@/aws/models'
import { datastoreService } from '@/services/datastore-service'
import { ZenObservable } from 'zen-observable-ts'

export interface CommitteeItem {
  committeeName?: string
  numberOfAll?: number
  numberOfFullTime?: number
  numberOfInside?: number
  numberOfOutside?: number
  chairperson?: string
}

export class BrandGovernanceViewmodel {
  @observable governances: Governance[] = []
  @observable brandCd = ''

  @observable selectedDate: string | undefined = undefined
  @observable isConceptExpand = false
  @observable isReasonsNotFollowExpand = false
  @observable isPrincipleExpand = false
  @observable currentBrand: BrandCodeMaster | undefined
  @observable organizationItems: any[] = []
  subcription_governances$: ZenObservable.Subscription | undefined = undefined

  constructor() {
    //
  }

  @action observeQuery() {
    this.subcription_governances$ = datastoreService
      .observeQuery(Governance, (governance) => governance.brandCd('eq', this.brandCd))
      ?.subscribe((governances) => {
        this.governances = governances.items

        if (this.dateList.length) {
          this.selectedDate = this.dateList[this.dateList.length - 1]
        }
      })
  }

  @action.bound setBrandCd(brandCd: string): void {
    this.destroy()
    this.observeQuery()
    this.brandCd = brandCd
    datastoreService
      .get(BrandCodeMaster, (brand) => brand.brandCd('eq', this.brandCd))
      .then((result) => {
        if (result && result.length > 0) this.currentBrand = result[0]
      })
  }

  /**
   * Compute for brand name
   */
  @computed get brandName() {
    if (!this.currentBrand) return ''
    return `[${this.currentBrand.brandCd}] ${this.currentBrand.brandName} (${this.currentBrand.industryName})`
  }

  @computed get dateList() {
    const pressDates = this.governances.map((item) => moment(item.pressDate, 'YYYY-MM').toISOString())
    return uniq(pressDates).sort()
  }

  @computed get governanceBasicConcept() {
    if (!this.selectedDate) return ''
    const date = new Date(this.selectedDate).toISOString()
    const concept = this.governances.find((item) => moment(item.pressDate, 'YYYY-MM').toISOString() === date)
    const data = concept?.cg11?.basicConcept

    return this.isConceptExpand ? data : data?.substring(0, 200)
  }

  @computed get governanceReasonsNotFollow() {
    if (!this.selectedDate) return ''
    const date = new Date(this.selectedDate).toISOString()
    const reason = this.governances.find((item) => moment(item.pressDate, 'YYYY-MM').toISOString() === date)
    const data = reason?.cg11?.reasonsNotFollow

    return this.isReasonsNotFollowExpand ? data : data?.substring(0, 200)
  }

  @computed get governancePrincipleNoList() {
    if (!this.selectedDate) return ''
    const date = new Date(this.selectedDate).toISOString()
    const concept = this.governances.find((item) => moment(item.pressDate, 'YYYY-MM').toISOString() === date)
    const data = concept?.cg11?.principle

    return this.isPrincipleExpand ? data : data?.substring(0, 200)
  }

  // Table 3
  @computed get committeeData() {
    if (!this.governances.length) return this.governances
    let list: CommitteeItem[] = []
    this.governances.forEach((item) => {
      const cg21 = item.cg21
      for (let i = 0; i < 3; i++) {
        let item: CommitteeItem
        if (i === 0) {
          item = {
            committeeName: '指名委員会',
            numberOfAll: cg21?.numberOfAllNominator,
            numberOfFullTime: cg21?.numberOfFullTimeNominator,
            numberOfInside: cg21?.numberOfInsideNominator,
            numberOfOutside: cg21?.numberOfOutsideNominator,
            chairperson: cg21?.chairpersonOfNominator,
          }
        }
        if (i === 1) {
          item = {
            committeeName: '報酬委員会',
            numberOfAll: cg21?.numberOfAllCompensation,
            numberOfFullTime: cg21?.numberOfFullTimeCompensation,
            numberOfInside: cg21?.numberOfInsideCompensation,
            numberOfOutside: cg21?.numberOfOutsideCompensation,
            chairperson: cg21?.chairpersonOfCompensation,
          }
        }
        if (i === 2) {
          item = {
            committeeName: '監査委員会',
            numberOfAll: cg21?.numberOfAllAudit,
            numberOfFullTime: cg21?.numberOfFullTimeAudit,
            numberOfInside: cg21?.numberOfInsideAudit,
            numberOfOutside: cg21?.numberOfOutsideAudit,
            chairperson: cg21?.chairpersonOfAudit,
          }
        }

        list = [...list, item!]
      }
    })

    return list
  }

  @action.bound onToggleConceptExpand() {
    this.isConceptExpand = !this.isConceptExpand
  }

  @action.bound onToggleReasonsNotFollow() {
    this.isReasonsNotFollowExpand = !this.isReasonsNotFollowExpand
  }

  @action.bound onTogglePrinciple() {
    this.isPrincipleExpand = !this.isPrincipleExpand
  }

  @action onSelectDateHandler(date) {
    this.selectedDate = date
  }

  /**
   * Replace all line break character to html <br>
   * @param originalString original data string
   * @returns new string that replace all line break character to <br>
   */

  destroy() {
    this.subcription_governances$?.unsubscribe()
  }
}
