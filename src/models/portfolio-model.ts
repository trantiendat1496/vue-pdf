export interface PortfolioModel {
  id: string
  userId: string
  portfolioId: string
  portfolioName: string
  isDisplayedOnTop: boolean
  brandList: PortfolioBrandModel[]
  increasing?: boolean
}
export interface PortfolioBrandModel {
  brandCd: string
  brandName: string
  industryCd: string
  industryName: string
}
export const mockPortfolioData = [
  {
    id: '1',
    userId: '1',
    portfolioId: '1',
    portfolioName: 'The Anh',
    isDisplayedOnTop: true,
    brandList: [
      {
        brandCd: '4301',
        brandName: '野村総123合研究所',
        industryCd: '5250',
        industryName: '情報・通信業',
        increasing: true,
      },
      {
        brandCd: '4302',
        brandName: 'YAEHASDFAS123DF',
        industryCd: '5250',
        industryName: '情報・123通信業',
        increasing: false,
      },
      {
        brandCd: '4303',
        brandName: '野村総合研究所123',
        industryCd: '5250',
        industryName: '情報・123通信業',
        increasing: true,
      },
      {
        brandCd: '4304',
        brandName: 'YAEHASDFASDF123',
        industryCd: '5250',
        industryName: '情報・通信業',
        increasing: true,
      },
      {
        brandCd: '4305',
        brandName: '野村総合123研究所123',
        industryCd: '5250',
        industryName: '情報・通123信業',
        increasing: false,
      },
      {
        brandCd: '4306',
        brandName: 'YAEHASDF123ASDF',
        industryCd: '5250',
        industryName: '情123123報・通信業',
        increasing: true,
      },
    ],
  },
  {
    id: '2',
    userId: '2',
    portfolioId: '2',
    portfolioName: 'Tu Anh',
    isDisplayedOnTop: true,
    brandList: [
      {
        brandCd: '4301',
        brandName: '野村123総合研究所',
        industryCd: '5250',
        industryName: '情報・123通信業',
      },
      {
        brandCd: '4302',
        brandName: 'YAEHAS123DFASDF',
        industryCd: '5250',
        industryName: '情報123・通信業',
      },
      {
        brandCd: '4303',
        brandName: '1231232112123',
        industryCd: '5250',
        industryName: '情報123・通信業',
      },
    ],
  },
  {
    id: '3',
    userId: '3',
    portfolioId: '3',
    portfolioName: 'Duc',
    isDisplayedOnTop: true,
    brandList: [
      {
        brandCd: '4301',
        brandName: '野村123123総合研究所',
        industryCd: '5250',
        industryName: '情報・123123通信業',
      },
      {
        brandCd: '4302123',
        brandName: 'YAEHAS112323DFASDF',
        industryCd: '5250',
        industryName: '情報121233・通信業',
      },
      {
        brandCd: '4303',
        brandName: '1231231232112123',
        industryCd: '5250',
        industryName: '情報123・通信業',
      },
    ],
  },
]
