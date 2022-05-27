export type NewsCategory = 'scandal' | 'press' | 'news'
export interface NewsTag {
  title: string
  color?: string
}

export interface NewsModel {
  id: number
  brandCd: string
  brandName: string
  industryCd: string
  industryName: string
  datetime: string
  category: string
  isScandal: boolean
  source?: string
  title: string
  url: string
  mediaUrl?: string
  tags?: NewsTag[]
  priority: number
  isTimelyDisclosure: boolean
}
export const mockNews: NewsModel[] = [
  {
    id: 10000,
    brandCd: '1234',
    brandName: '銘柄名A',
    industryCd: '1234',
    industryName: '業種名A',
    datetime: '2020-01-20',
    category: 'プレスリリース',
    isScandal: true,
    source: 'press',
    title: '銘柄名社個人情報流出',
    url: 'https://www.foobar.com/foobar.html',
    tags: [
      { title: '三菱電機', color: 'accent1' },
      { title: 'プレス', color: 'accent6' },
      { title: '情報漏洩', color: 'accent4' },
    ],
    priority: 5,
    isTimelyDisclosure: true,
    mediaUrl: 'https://i.pinimg.com/originals/a5/d5/90/a5d5907b44cdbcf3691ecb54016979a3.jpg',
  },
  {
    id: 10001,
    brandCd: '3421',
    brandName: '銘柄名B',
    industryCd: '4321',
    industryName: '業種名B',
    datetime: '2020-01-20',
    category: 'ニュース',
    isScandal: false,
    title: '銘柄名社ニュース',
    url: 'https://www.foobar.com/foobar.html',
    priority: 5,
    isTimelyDisclosure: false,
  },
  {
    id: 10002,
    brandCd: '1234',
    brandName: '銘柄名C',
    industryCd: '1234',
    industryName: '業種名C',
    datetime: '2020-01-20',
    category: 'プレスリリース',
    isScandal: false,
    title: '銘柄名社個人情報流出',
    url: 'https://www.foobar.com/foobar.html',
    priority: 5,
    isTimelyDisclosure: true,
  },
  {
    id: 10003,
    brandCd: '3421',
    brandName: '銘柄名D',
    industryCd: '4321',
    industryName: '業種名D',
    datetime: '2020-01-20',
    category: 'ニュース',
    isScandal: true,
    source: 'news',
    title: '銘柄名社ニュース',
    url: 'https://www.foobar.com/foobar.html',
    tags: [{ title: '労務問題', color: 'accent5' }],
    priority: 5,
    isTimelyDisclosure: false,
    mediaUrl:
      'https://cdn.vox-cdn.com/thumbor/0fgfu2FK6oMTSwOU0YArD95zks0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19257554/DBOX_FCRC_OneWilloughby_Office_Atrium.jpg',
  },
  {
    id: 10004,
    brandCd: '3421',
    brandName: '銘柄名E',
    industryCd: '4321',
    industryName: '業種名E',
    datetime: '2020-01-20',
    category: 'ニュース',
    isScandal: true,
    source: 'news',
    title: '光害対策型の防犯灯・道路灯が、国内メーカー初「星空に優',
    url: 'https://www.foobar.com/foobar.html',
    tags: [
      { title: '三菱電機', color: 'accent1' },
      { title: 'プレス', color: 'accent6' },
      { title: '労務問題', color: 'accent5' },
    ],
    priority: 5,
    isTimelyDisclosure: false,
    mediaUrl:
      'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6033ddf2b858e0115ff2b495%2FYoung-people-with-face-masks-back-at-work-or-school-in-office-after-lockdown-%2F960x0.jpg',
  },
  {
    id: 10005,
    brandCd: '3421',
    brandName: '銘柄名E',
    industryCd: '4321',
    industryName: '業種名E',
    datetime: '2020-01-20',
    category: 'ニュース',
    isScandal: true,
    source: 'news',
    title: '光害対策型の防犯灯・道路灯が、国内メーカー初「星空に優',
    url: 'https://www.foobar.com/foobar.html',
    tags: [
      { title: '三菱電機', color: 'accent1' },
      { title: 'プレス', color: 'accent6' },
      { title: '労務問題', color: 'accent5' },
    ],
    priority: 5,
    isTimelyDisclosure: false,
    mediaUrl:
      'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6033ddf2b858e0115ff2b495%2FYoung-people-with-face-masks-back-at-work-or-school-in-office-after-lockdown-%2F960x0.jpg',
  },
]
