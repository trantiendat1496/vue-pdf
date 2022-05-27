export interface EvalMaster {
  id: string
  evalCategoryCdL1: string
  evalCategoryNameL1: string
  evalCategoryCdL2: string
  evalCategoryNameL2: string
  evalCd: string
  evalName: string
  scoreMax: number
  displayOrder: number
}
export const mockEvalMasterData: EvalMaster[] = [
  {
    id: 'G1001',
    evalCategoryCdL1: 'G',
    evalCategoryNameL1: 'G',
    evalCategoryCdL2: 'G1',
    evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
    evalCd: 'G1001',
    evalName: '経営トップメッセージ（産業・事業ビジョン）',
    scoreMax: 2,
    displayOrder: 1,
  },
  {
    id: 'G1002',
    evalCategoryCdL1: 'G',
    evalCategoryNameL1: 'G',
    evalCategoryCdL2: 'G1',
    evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
    evalCd: 'G1002',
    evalName: '事業環境やビジネスモデル',
    scoreMax: 2,
    displayOrder: 2,
  },
  {
    id: 'G2001',
    evalCategoryCdL1: 'G',
    evalCategoryNameL1: 'G',
    evalCategoryCdL2: 'G2',
    evalCategoryNameL2: 'G2.取締役会の評価',
    evalCd: 'G2001',
    evalName: '役員報酬制度',
    scoreMax: 2,
    displayOrder: 11,
  },
  {
    id: 'G2002',
    evalCategoryCdL1: 'G',
    evalCategoryNameL1: 'G',
    evalCategoryCdL2: 'G2',
    evalCategoryNameL2: 'G2.取締役会の評価',
    evalCd: 'G2002',
    evalName: '取締役会の実効性と多様性',
    scoreMax: 2,
    displayOrder: 7,
  },
]
export interface EsgScoreModel {
  id: string
  brandCd: string
  brandName: string
  industryCd: string
  industryName: string
  year: string
  evalList: evalModel[]
}
export interface evalModel {
  evalCategoryCdL1: string
  evalCategoryNameL1: string
  evalCategoryCdL2: string
  evalCategoryNameL2: string
  evalCd: string
  evalName: string
  evalCdNri: string
  evalNameNri: string
  score: number
  scoreMax: number
  comment: string
}
export const mockEsgScoreData: EsgScoreModel[] = [
  {
    id: '4301',
    brandCd: '4301',
    brandName: '野村総合研究所',
    industryCd: '5250',
    industryName: '情報・通信業',
    year: '2021',
    evalList: [
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G1',
        evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
        evalCd: 'G1001',
        evalName: '経営トップメッセージ（産業・事業ビジョン）',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 1,
        scoreMax: 2,
        comment: 'This is comment 1',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G1',
        evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
        evalCd: 'G1002',
        evalName: '事業環境やビジネスモデル',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 2,
        scoreMax: 2,
        comment: 'This is comment 2',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G2',
        evalCategoryNameL2: 'G2.取締役会の評価',
        evalCd: 'G2001',
        evalName: '役員報酬制度',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 2,
        scoreMax: 2,
        comment: 'This is comment 3',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G2',
        evalCategoryNameL2: 'G2.取締役会の評価',
        evalCd: 'G2002',
        evalName: '取締役会の実効性と多様性',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 2,
        scoreMax: 2,
        comment: 'This is comment 4',
      },
    ],
  },
  {
    id: '4301',
    brandCd: '4301',
    brandName: '野村総合研究所',
    industryCd: '5250',
    industryName: '情報・通信業',
    year: '2020',
    evalList: [
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G1',
        evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
        evalCd: 'G1001',
        evalName: '経営トップメッセージ（産業・事業ビジョン）',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 0,
        scoreMax: 2,
        comment: 'This is comment 5',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G1',
        evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
        evalCd: 'G1002',
        evalName: '事業環境やビジネスモデル',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 2,
        scoreMax: 2,
        comment: 'This is comment 6',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G2',
        evalCategoryNameL2: 'G2.取締役会の評価',
        evalCd: 'G2001',
        evalName: '役員報酬制度',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 1,
        scoreMax: 2,
        comment: 'This is comment 7',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G2',
        evalCategoryNameL2: 'G2.取締役会の評価',
        evalCd: 'G2002',
        evalName: '取締役会の実効性と多様性',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 0,
        scoreMax: 2,
        comment: 'This is comment 8',
      },
    ],
  },
  {
    id: '4301',
    brandCd: '4301',
    brandName: '野村総合研究所',
    industryCd: '5250',
    industryName: '情報・通信業',
    year: '2019',
    evalList: [
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G1',
        evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
        evalCd: 'G1001',
        evalName: '経営トップメッセージ（産業・事業ビジョン）',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 2,
        scoreMax: 2,
        comment: 'This is comment 9',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G1',
        evalCategoryNameL2: 'G1.経営トップ（経営陣の評価）',
        evalCd: 'G1002',
        evalName: '事業環境やビジネスモデル',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 1,
        scoreMax: 2,
        comment: 'This is comment 10',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G2',
        evalCategoryNameL2: 'G2.取締役会の評価',
        evalCd: 'G2001',
        evalName: '役員報酬制度',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 2,
        scoreMax: 2,
        comment: 'This is comment 11',
      },
      {
        evalCategoryCdL1: 'G',
        evalCategoryNameL1: 'G',
        evalCategoryCdL2: 'G2',
        evalCategoryNameL2: 'G2.取締役会の評価',
        evalCd: 'G2002',
        evalName: '取締役会の実効性と多様性',
        evalCdNri: '101',
        evalNameNri: 'NRI評価項目101',
        score: 1,
        scoreMax: 2,
        comment: 'This is comment 12',
      },
    ],
  },
]
