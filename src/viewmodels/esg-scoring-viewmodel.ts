import { EsgScoreModel, EvalMaster, evalModel, mockEsgScoreData, mockEvalMasterData } from '@/models/esg-score-model'
import { action, computed, observable } from 'mobx'
import moment from 'moment'

export class EsgScoringViewModel {
  //Comprehensive evaluation table
  @observable table1Data = [
    {
      evalName: '総合評価',
      yearScoreList: [
        {
          score: null,
          comment: '',
        },
        {
          score: 42,
          comment: 'comment 2',
        },
        {
          score: 33,
          comment: 'comment 3',
        },
      ],
    },
  ]

  //Scoring table
  @observable esgEvalMaster: EvalMaster[] = []
  @observable esgData: EsgScoreModel[] = []
  
  @computed get esgScoreYears() {
    return this.esgData.map((item) => item.year)
  }

  @computed get esgScoringTableData() {
    const data = this.esgEvalMaster.map((evalMaster) => {
      const year = this.esgData.map((data) => {
        const evalItem: evalModel | undefined = data.evalList.find((evalItem) => evalItem.evalCd === evalMaster.evalCd)
        return {
          score: evalItem ? evalItem.score : null,
          comment: evalItem ? evalItem.comment : '',
          year: data.year,
          evalCd: evalMaster.evalCd,
          maxScore: evalMaster.scoreMax,
        }
      })
      return {
        evalName: evalMaster.evalCategoryCdL1 + '>' + evalMaster.evalCd + '.' + evalMaster.evalName,
        yearScoreList: year,
      }
    })
    return data
  }

  constructor() {
    //
  }

  @action.bound fetchData() {
    const brand = {
      brandCd: '4301',
    }
    this.esgEvalMaster = mockEvalMasterData
    this.esgData = mockEsgScoreData
      .filter((item) => item.brandCd === brand.brandCd)
      .map((item) => {
        return {
          ...item,
          time: moment(`${item.year}`),
        }
      })
      .sort((x, y) => y.time.unix() - x.time.unix())
      .slice(0, 3)
  }
}
