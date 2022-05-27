import { mockOfficers, OfficerModel } from '@/models/officer-models'
import { uniq, uniqBy } from 'lodash'
import { action, computed, observable } from 'mobx'
import moment from 'moment'

export class BrandOfficerInfoViewmodel {
  @observable brandOfficers: OfficerModel[] = mockOfficers
  officerId: number = parseInt(new URL(location.href.replace('#', '')).searchParams.get('id')!)
  @observable officerName = this.brandOfficers[this.officerId].officerName

  @observable independenceOutsideDirectors = [
    { text: '企業', value: 'brandName' },
    { text: '発表月', value: 'year' },
    { text: '属性', value: 'attribute' },
    { text: 'a' },
    { text: 'b' },
    { text: 'c' },
    { text: 'd' },
    { text: 'e' },
    { text: 'f' },
    { text: 'g' },
    { text: 'h' },
    { text: 'i' },
    { text: 'j' },
    { text: 'k' },
  ]

  @observable concurrentStatusExternalDirectorItems = this.initConcurrentStatusExternalDirectorItems()

  constructor() {
    //
  }

  // get brands uniq and sort
  @computed get outsideDirectorHeaders() {
    const brandOfficersClone = this.brandOfficers
      .map((brandOfficer) => {
        return {
          ...brandOfficer,
          time: moment(`${brandOfficer.year}-${brandOfficer.month}`, `YYYY-MM`).toISOString(),
        }
      })
      .sort()
    return brandOfficersClone
  }

  // Table 1
  // get data table 1

  initConcurrentStatusExternalDirectorItems() {
    const brandOfficersClone = this.brandOfficers
      .filter((brandOfficer) => brandOfficer.officerName == this.officerName)
      .map((brandOfficer) => {
        const years = this.brandOfficers
          .filter((officer) => officer.brandName == brandOfficer.brandName && officer.officerName == this.officerName)
          .map((officer) => {
            return moment(`${officer.year}-${officer.month}`, 'YYYY-MM').toISOString()
          })
          .sort()
        return {
          enterprise: brandOfficer.brandName,
          years: years,
          activeDate: years[years.length - 1],
        }
      })
    return uniqBy(brandOfficersClone, 'enterprise')
  }
  //  End Table 1

  // Table 2
  @computed get independenceOutsideDirectorItems() {
    const brandOfficersFilter = this.brandOfficers
      .filter((brandOfficer) => {
        return brandOfficer.officerName == this.officerName
      })
      .sort((x, y) => new Date(x.year + '-' + x.month).getTime() - new Date(y.year + '-' + y.month).getTime())

    const brandsSort = uniqBy(brandOfficersFilter, (b) => `${b.year}${b.month}`)
      .map((brandDetail) => {
        return {
          ...brandDetail,
          time: moment(`${brandDetail.year}-${brandDetail.month}`, `YYYY-MM`),
        }
      })
      .sort((x, y) => x.time.unix() - y.time.unix())

    const data = this.concurrentStatusExternalDirectorItems.map((concurrent) => {
      const brandsFilter = brandsSort.filter(
        (brandDetail) =>
          brandDetail.officerName == this.officerName &&
          brandDetail.brandName == concurrent.enterprise &&
          brandDetail.time.toISOString() == concurrent.activeDate
      )

      let newBrand: {
        [key: string]: any
      } = {}
      for (let index = 2; index < this.independenceOutsideDirectors.length; index++) {
        const text: string = this.independenceOutsideDirectors[index].text
        newBrand[text] = text
      }

      brandsFilter.forEach((brandDetail) => {
        for (const key in newBrand) {
          if (Object.prototype.hasOwnProperty.call(newBrand, key)) {
            newBrand[key] = newBrand[key] === brandDetail.relationship ? brandDetail.relationshipApplicable : ''
          }
        }

        newBrand = {
          ...brandDetail,
          ...newBrand,
        }
      })
      return newBrand
    })
    return data
  }

  // Table 3
  @computed get committees() {
    const brandsOfficers = this.concurrentStatusExternalDirectorItems.map((concurrentStatus) => {
      const brandSameName = this.outsideDirectorHeaders.find(
        (brandDetail) =>
          brandDetail.officerName == this.officerName &&
          brandDetail.brandName == concurrentStatus.enterprise &&
          brandDetail.time == concurrentStatus.activeDate
      )
      return brandSameName
    })

    // render officerNames
    let committees: any[] = []
    brandsOfficers.forEach((brandsOfficer) => {
      committees = committees.concat(brandsOfficer?.committeeList)
    })

    return uniq(committees)
  }

  @computed get detailOutsideDirectors() {
    const concurrentStatusExternalDirectorsData = this.concurrentStatusExternalDirectorItems.map((brandBodyDetail) => {
      const brandSameName = this.outsideDirectorHeaders.find((brandHeaderDetail) => {
        return (
          brandHeaderDetail.officerName == this.officerName &&
          brandHeaderDetail.brandName == brandBodyDetail.enterprise &&
          brandHeaderDetail.time == brandBodyDetail.activeDate
        )
      })!
      const brandDetail = this.brandOfficers
        .filter(
          (brandDetal) =>
            brandDetal.officerName === brandSameName.officerName &&
            moment(`${brandDetal.year}-${brandDetal.month}`, 'YYYY-MM').toISOString() === brandSameName.time
        )
        .sort((x, y) => new Date(y.year + '-' + y.month).getTime() - new Date(x.year + '-' + x.month).getTime())[0]
      const committeesItem = this.committees.map((committee) => {
        return brandDetail.committeeList.find((detail) => detail == committee) ? '〇' : '-'
      })
      const detailOutsideDirectorItem = {
        date: brandBodyDetail.activeDate,
        enterprise: brandBodyDetail.enterprise,
        committeeList: committeesItem,
        explanation: brandDetail.explanation,
        reason: brandDetail.reason,
      }
      return detailOutsideDirectorItem
    })
    return concurrentStatusExternalDirectorsData
  }

  //  Action
  // Table 1
  @action toggleSelectTime(enterprise, date) {
    this.concurrentStatusExternalDirectorItems = this.concurrentStatusExternalDirectorItems.map((concurrentStatus) => {
      const newYearStatus = concurrentStatus.years.map((yearItem) => {
        if (enterprise === concurrentStatus.enterprise) {
          concurrentStatus.activeDate = date
          return yearItem
        }
        return yearItem
      })
      return {
        ...concurrentStatus,
        years: newYearStatus,
      }
    })
  }
  //  End Table 1
}
