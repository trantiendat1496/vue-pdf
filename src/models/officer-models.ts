export interface OfficerModel {
  brandCd: string
  brandName: string
  year: string
  month: string
  officerName: string
  attribute: string
  relationship?: string
  relationshipApplicable?: string
  committeeList: string[]
  explanation: string
  reason: string
}

export interface DetailOutsideDirectorModel {
  officerName: string
  committeeList: string[]
  explanation: string
  reason: string
}

export const mockOfficers: OfficerModel[] = [
  {
    brandCd: '6503',
    brandName: '三菱電機',
    year: '2021',
    month: '7',
    officerName: '藤原 健嗣',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '△',
    committeeList: ['指名委員会', '監査委員会', '独立役員'],
    explanation:
      '旭化成株式会社 特別顧問 旭化成株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '6503',
    brandName: '三菱電機',
    year: '2021',
    month: '7',
    officerName: '程 近智',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '△',
    committeeList: ['指名委員会', '監査委員会', '独立役員'],
    explanation:
      'アクセンチュア株式会社 相談役 アクセンチュア株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '6503',
    brandName: '三菱電機',
    year: '2021',
    month: '7',
    officerName: '橘・フクシマ・咲江',
    attribute: '他の会社の出身者',
    committeeList: ['指名委員会', '報酬委員会', '独立役員'],
    explanation:
      'Ｇ＆Ｓグローバル・アドバイザーズ株式会社 代表取締役社長 Ｇ＆Ｓグローバル・アドバイザーズ株式会社と当社の取引関係は、ございません。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '6503',
    brandName: '三菱電機',
    year: '2021',
    month: '7',
    officerName: '佐久間 総一郎',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '△',
    committeeList: ['報酬委員会', '監査委員会', '独立役員'],
    explanation:
      '日本製鉄株式会社 顧問 日本製鉄株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '6503',
    brandName: '三菱電機',
    year: '2021',
    month: '4',
    officerName: '藤原 健嗣',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '△',
    committeeList: ['指名委員会', '監査委員会', '独立役員'],
    explanation:
      '旭化成株式会社 特別顧問 旭化成株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '6503',
    brandName: '三菱電機',
    year: '2021',
    month: '4',
    officerName: '橘・フクシマ・咲江',
    attribute: '他の会社の出身者',
    relationship: 'h',
    committeeList: ['指名委員会', '報酬委員会', '独立役員'],
    explanation:
      'Ｇ＆Ｓグローバル・アドバイザーズ株式会社 代表取締役社長 Ｇ＆Ｓグローバル・アドバイザーズ株式会社と当社の取引関係は、ございません。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '4307',
    brandName: '野村総合研究所',
    year: '2021',
    month: '5',
    officerName: '藤原 健嗣',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '▲',
    committeeList: ['指名委員会', '監査委員会', '独立役員'],
    explanation:
      '旭化成株式会社 特別顧問 旭化成株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '4307',
    brandName: '野村総合研究所',
    year: '2021',
    month: '5',
    officerName: '田中 次郎',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '△',
    committeeList: ['監査委員会', '独立役員'],
    explanation:
      'アクセンチュア株式会社 相談役 アクセンチュア株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '4307',
    brandName: '野村総合研究所',
    year: '2021',
    month: '11',
    officerName: '藤原 健嗣',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '▲',
    committeeList: ['指名委員会', '監査委員会', '独立役員'],
    explanation:
      '旭化成株式会社 特別顧問 旭化成株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
  {
    brandCd: '4307',
    brandName: '野村総合研究所',
    year: '2021',
    month: '11',
    officerName: '田中 次郎',
    attribute: '他の会社の出身者',
    relationship: 'h',
    relationshipApplicable: '△',
    committeeList: ['監査委員会', '独立役員'],
    explanation:
      'アクセンチュア株式会社 相談役 アクセンチュア株式会社と当社の取引関係は、両社において連結売上高の１％未満であります。',
    reason:
      '＜独立役員指定理由＞当社指名委員会が定める独立性基準を満たし、また、左記のとおり、 主要な取引先・主要な株主の業務執行者その他に該当せず、社外取締役の役割において一般株主と利益相反が生じるおそれが無いと判断したため、「独立役員」に指定しております。',
  },
]
