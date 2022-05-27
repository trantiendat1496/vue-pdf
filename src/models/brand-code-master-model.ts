export type ReportType = 'integration2020' | 'integration2019' | 'sustainability2020' | 'sustainability2019'

export interface Report {
  id: number
  title: string
  description: string
  pdf: string
  data: string
  type: ReportType
}
export interface BrandCodeMasterModel {
  brandCd: string
  brandName: string
  brandNameKana: string
  brandShortName: string
  industryCd: string
  industryName: string
  listedMarketCds: string
  marketCd: string
  reports: Report[]
}
export const mockBrandCodeMasters: BrandCodeMasterModel[] = [
  {
    brandCd: '4301',
    brandName: '野村総合研究所',
    brandNameKana: 'ノムラソウゴウケンキュウショ',
    brandShortName: 'ＮＲＩ',
    industryCd: '5250',
    industryName: '情報・通信業',
    listedMarketCds: 'TKY',
    marketCd: 'TKY',
    reports: [
      {
        id: 1,
        title: '花王_統合レポート2020.pdf',
        description: '',
        pdf: '花王_統合レポート2020.pdf',
        data: '花王_統合レポート2020.pdf.json',
        type: 'integration2020',
      },
      {
        id: 2,
        title: '花王_統合報告書2019.pdf',
        description: '',
        pdf: '花王_統合報告書2019.pdf',
        data: '花王_統合報告書2019.pdf.json',
        type: 'integration2019',
      },
      {
        id: 3,
        title: '花王_サステナビリティ報告書2020.pdf',
        description: '',
        pdf: '花王_サステナビリティ報告書2020.pdf',
        data: '花王_サステナビリティ報告書2020.pdf.json',
        type: 'sustainability2020',
      },
      {
        id: 4,
        title: '花王_サステナビリティデー報告書2019.pdf',
        description: '',
        pdf: '花王_サステナビリティデー報告書2019.pdf',
        data: '花王_サステナビリティデー報告書2019.pdf.json',
        type: 'sustainability2019',
      },
    ],
  },
  {
    brandCd: '4302',
    brandName: 'Jストリーム2',
    brandNameKana: 'ノムラソウゴウケンキュウショ2',
    brandShortName: 'ＮＲＩ2',
    industryCd: '5259',
    industryName: '情報・通信業2',
    listedMarketCds: 'TKY2',
    marketCd: 'TKY2',
    reports: [
      {
        id: 5,
        title: '花王_統合レポート2020.pdf',
        description: '',
        pdf: '花王_統合レポート2020.pdf',
        data: '花王_統合レポート2020.pdf.json',
        type: 'integration2020',
      },
      {
        id: 6,
        title: '花王_統合報告書2019.pdf',
        description: '',
        pdf: '花王_統合報告書2019.pdf',
        data: '花王_統合報告書2019.pdf.json',
        type: 'integration2019',
      },
      {
        id: 7,
        title: '花王_サステナビリティ報告書2020.pdf',
        description: '',
        pdf: '花王_サステナビリティ報告書2020.pdf',
        data: '花王_サステナビリティ報告書2020.pdf.json',
        type: 'sustainability2020',
      },
      {
        id: 8,
        title: '花王_サステナビリティデー報告書2019.pdf',
        description: '',
        pdf: '花王_サステナビリティデー報告書2019.pdf',
        data: '花王_サステナビリティデー報告書2019.pdf.json',
        type: 'sustainability2019',
      },
    ],
  },
  {
    brandCd: '4303',
    brandName: 'Jストリーム3',
    brandNameKana: 'ノムラソウゴウケンキュウショ3',
    brandShortName: 'ＮＲＩ3',
    industryCd: '5259',
    industryName: '情報・通信業3',
    listedMarketCds: 'TKY3',
    marketCd: 'TKY3',
    reports: [
      {
        id: 9,
        title: '花王_統合レポート2020.pdf',
        description: '',
        pdf: '花王_統合レポート2020.pdf',
        data: '花王_統合レポート2020.pdf.json',
        type: 'integration2020',
      },
      {
        id: 10,
        title: '花王_統合報告書2019.pdf',
        description: '',
        pdf: '花王_統合報告書2019.pdf',
        data: '花王_統合報告書2019.pdf.json',
        type: 'integration2019',
      },
      {
        id: 11,
        title: '花王_サステナビリティ報告書2020.pdf',
        description: '',
        pdf: '花王_サステナビリティ報告書2020.pdf',
        data: '花王_サステナビリティ報告書2020.pdf.json',
        type: 'sustainability2020',
      },
      {
        id: 12,
        title: '花王_サステナビリティデー報告書2019.pdf',
        description: '',
        pdf: '花王_サステナビリティデー報告書2019.pdf',
        data: '花王_サステナビリティデー報告書2019.pdf.json',
        type: 'sustainability2019',
      },
    ],
  },
]
