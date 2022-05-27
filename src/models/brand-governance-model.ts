export interface BrandGovernanceModel {
  brandCd: string
  brandName: string
  year: string
  month: string
  summary: BrandGovernanceSummaryModel
  governance: BrandGovernanceDetailModel
}
export interface BrandGovernanceSummaryModel {
  orgForm: string
  foreignShareholdingRatio: string
  directorsIndependent: string
  directorsOutside: string
  directorsAll: string
  chairman: string
  parent?: string
  controllingShareholder?: string
  takeoverDefenseMeasures: boolean
  unGlobalCompact: boolean
}
export interface BrandGovernanceDetailModel {
  basicConcept: string
  reasonsNotFollow: string
  principleNoList: {
    principleNo: string
    text: string
  }[]
  orgMgmt: {
    category: string
    valueList: {
      name: string
      value: string
    }[]
  }[]
}

const go = {
  basicConcept:
    '１．基本的な考え方\\n2015年9月に制定した当社の「コーポレートガバナンス基本方針」において、コーポレートガバナンスに関する基本的な考え方を定めております。\\n「コーポレートガバナンス基本方針」\\n＜基本的な考え方＞\\n当社は、持続的な成長及び中長期的な企業価値の向上に資するコーポレートガバナンスには、経営の執行における適切なリスクテイクを促す一方、執行に対する実効性の高い監督機能を確立し運用することが必要と考え、監督側の視点からコーポレートガバナンスの仕組みを構築した。会社法上の機関設計としては、「委員会等設置会社」（現「指名委員会等設置会社」）を2003年に選択するとともに、属人性を排したシステムとして、コニカミノルタ流のガバナンスをこれまで追求してきた。\\n当社のガバナンス体制に関する基本的な考え方は以下のとおりである。\\n・経営の監督と執行を分離し、企業価値向上に資するべく経営の監督機能を確保する。\\n・株主の目線からの監督を担うことができる独立社外取締役を選任する。\\n・これらにより経営の透明性・健全性・効率性を向上させる。\\n具体的に、取締役会及び三委員会の構成は、次のとおりである。\\n\\n（１）取締役会\\n・独立社外取締役を取締役総数の３分の１以上にするとともに、執行役を兼務しない取締役を取締役総数の過半数とする。\\n・執行役を兼務しない取締役から取締役会議長を選定する。\\n\\n（２）指名・監査・報酬の各委員会\\n・各委員会は、５名前後の委員で構成し、過半数を社外取締役とする。\\n・各委員会の委員長は、社外取締役の中から選定する。\\n・代表執行役社長は、指名委員、監査委員又は報酬委員のいずれにも選定しない。',
  reasonsNotFollow:
    '当社は、上記の基本的な考え方に基づき、コーポレートガバナンス・コード（2018年６月1日付改訂版）の各原則の内、以下を除く全ての原則を実施しております。\\n\\n【原則4-11 取締役会・監査役会の実効性確保のための前提条件】について実施しない理由\\n＜ジェンダーや国際性の面を含む多様性と適正規模＞について\\n原則に規定されているところの「取締役会は、その役割・責務を実効的に果たすための知識・経験・能力を全体としてバランス良く備え」、「多様性と適正規模を両立させる形で構成されるべき」は、当社がこれまで、まさに留意してきたことであります。多様性としてジェンダーや国際性を考慮するのは当然ですが、当社の候補者選定においては、適正規模の取締役会を構成する上で、知識・経験・能力の全体バランスと、当社の中期的経営課題に関する適切な監督者という二つの要件とのマッチングを最優先にしております。',
  principleNoList: [
    {
      principleNo: '1',
      text: '【原則1-4 政策保有株式】\\n当社は、政策保有株式に関する方針（縮減方針及び議決権行使基準）を策定、開示しています。\\n\\n（１）政策保有株式に関する考え方\\n当社は、保有の意義・合理性が認められる場合を除き、原則として上場株式を政策保有株式として保有しません。保有の意義・合理性については、発行会社との企業連携や事業シナジーが見込めるか、また保有に伴う便益やリスクが資本コストに見合っているかを毎年個別銘柄ごとに検証した上で判断します。その結果、保有の意義・合理性が乏しいと判断される株式については、適宜株価や市場動向その他の事情を考慮しつつ売却します。\\n2021年3月末時点の政策保有株式に対する検証結果は以下のとおりです。なお、当社は、個別銘柄ごとの経済合理性の検証及び保有意義の確認を、毎年、経営審議会で行い、結果を取締役会に報告しています。\\n経済合理性は、個別銘柄ごとに、配当金や関連取引の収益が当社の資本コストを上回っているか否かを検証していますが、検証対象の大半の銘柄の関連収益が当社の資本コストを上回っていることが確認されました。\\n上記に加え定性的な保有意義についても確認し、このうち継続して保有するとした銘柄については、投資先との取引関係の維持・強化や企業連携・事業シナジーが見込めることなどを保有目的としていることが確認されました。\\n併せて、保有の意義・合理性が希薄化してきたことなどから、売却を検討していく銘柄も確認されました。なお、2020年度は、保有意義の希薄化が認められた9銘柄（みなし保有株式を除く）について売却を実施し、売却金額は8,615百万円でした。\\n\\n（２）政策保有株式に係る議決権行使について\\n議決権行使は投資先との対話の重要な一手段であり、当社はすべての政策保有株式について議決権を行使します。議決権の行使にあたっては、定型的・短期的な基準で画一的に賛否を判断するのではなく、当該投資先企業の経営方針・戦略等を十分検討した上で、当社及び投資先企業の持続的な成長と中長期的な企業価値向上につながるかどうか等の視点に立って判断し、議案ごとに確認を行います。特に株主利益に大きな影響を及ぼしうる以下の項目については、慎重に検討した上で賛否を判断します。\\n①重要な資産の譲渡\\n②合併または完全子会社等による株式の異動\\n③有利発行による第三者割当増資\\n④敵対的買収防衛策の導入\\n\\n【原則1-7 関連当事者間の取引】\\n当社は、役員（取締役又は執行役）との間で、万一会社法に定める利益相反取引を行う場合は、会社法及び取締役会規則に基づき取締役会の承認決議を得ることとしております。また、役員による利益相反取引を把握すべく、役員及びその近親者（二親等内）と当社グループとの間の取引（役員報酬を除く）の有無等を毎年定期的に役員各々に確認しております。このほか、当社と主要株主や子会社・関連会社等の関連当事者との取引については、当社及び株主共同の利益を害することのないよう、第三者との取引と同様に権限規程に基づき社内承認手続きを実施することとしております。',
    },
    {
      principleNo: '2',
      text: '【原則2-6 企業年金のアセットオーナーとしての機能発揮】\\n当社は、財務担当執行役、人事部長、経理部長、財務部長、労働組合等で構成される年金資産運用委員会を設置し、企業年金の適切な運用及び管理を行っています。\\nまた、企業年金が運用の専門性を高めてアセットオーナーとして期待される機能を発揮できるよう、経理・財務部門での業務経験を有する適切な資質を持った人材を運用担当者に配置しています。なお、2021年3月に、当社は企業年金として日本版スチュワードシップ・コードの受入れを表明しました。国内上場株式については、日本版スチュワードシップ・コードの受入れを表明している運用機関に運用を委託し、そのスチュワードシップ活動のモニタリングを実施しています。\\n企業年金の受益者と会社との間に生じ得る利益相反については、①運用機関の選定において運用実績などの定量面のみならず、運用機関の投資方針、運用体制、コンプライアンス等の定性面からも総合的に評価を行う ②運用機関における利益相反管理に係る方針の策定・公表を求める ③議決権行使の判断は委託先運用機関の判断に一任し当社の介入の余地を排除する等により、適切に管理しています。',
    },
    {
      principleNo: '3',
      text: '【原則3-1 情報開示の充実】\\n当社は、法令に基づく開示を適切に行うことに加え、当社の意思決定の透明性、公正性を確保し、実効的なコーポレート・ガバナンスを実現するとの観点から以下の事項について開示し、主体的な情報発信を行っております。具体的には、当社ウェブサイト、統合報告書、CSRレポート、コーポレート・ガバナンス報告書、事業報告\\nその他の報告書、及び株主総会参考書類等において情報開示し、加えて「経営方針説明会」、「個人投資家向け会社説明会」などにおいても主体的な情報発信を行っております。\\n\\n（１）経営理念及び経営計画\\n経営理念及び経営計画は、統合報告書及び当社ウェブサイトで開示しております。また「経営方針説明会」 「個人投資家向け会社説明会」などにおいても積極的に説明しております。本コーポレート・ガバナンス報告書では、以下のとおりリンクを設けております。\\n経営理念・・・当社ウェブサイトにおいて開示しておりますコニカミノルタフィロソフィーをご参照ください。\\n https://www.konicaminolta.com/jp-ja/corporate/vision.html\\n経営計画・・・当社ウェブサイトにおいて開示しております中期経営戦略をご参照ください。\\n https://www.konicaminolta.com/jp-ja/investors/management/midterm_plan_presentations/index.html',
    },
  ],
  orgMgmt: [
    {
      category: '組織形態',
      valueList: [
        {
          name: '組織形態',
          value: '指名委員会等設置会社',
        },
      ],
    },
    {
      category: '取締役関係',
      valueList: [
        {
          name: '定款上の取締役の員数',
          value: '15',
        },
        {
          name: '定款上の取締役の任期',
          value: '1',
        },
        {
          name: '取締役会の議長',
          value: 'その他の取締役',
        },
        {
          name: '取締役の人数',
          value: '12',
        },
        {
          name: '社外取締役の選任状況',
          value: '〇',
        },
        {
          name: '社外取締役の人数',
          value: '5',
        },
        {
          name: '社外取締役のうち独立役員に指定されている人数',
          value: '5',
        },
      ],
    },
    {
      category: '監査役関係',
      valueList: [
        {
          name: '監査役会設置の有無',
          value: '〇',
        },
        {
          name: '定款上の監査役の員数',
          value: '3',
        },
      ],
    },
  ],
}
export const mockBrandGovernanceData: BrandGovernanceModel[] = [
  {
    brandCd: '4301',
    brandName: '三菱電機',
    year: '2021',
    month: '7',
    summary: {
      orgForm: '指名委員会等設置会社',
      foreignShareholdingRatio: '30%以上',
      directorsIndependent: '5',
      directorsOutside: '5',
      directorsAll: '12',
      chairman: '会長',
      parent: '親会社A',
      controllingShareholder: '支配株主A',
      takeoverDefenseMeasures: false,
      unGlobalCompact: true,
    },
    governance: go,
  },
  {
    brandCd: '4302',
    brandName: '三菱電機',
    year: '2021',
    month: '4',
    summary: {
      orgForm: '指名委員会等設置会社',
      foreignShareholdingRatio: '40%以上',
      directorsIndependent: '5',
      directorsOutside: '5',
      directorsAll: '12',
      chairman: '会長',
      parent: '親会社A',
      controllingShareholder: '支配株主A',
      takeoverDefenseMeasures: false,
      unGlobalCompact: true,
    },
    governance: go,
  },
  {
    brandCd: '4303',
    brandName: '野村総合研究所',
    year: '2021',
    month: '5',
    summary: {
      orgForm: '指名委員会等設置会社',
      foreignShareholdingRatio: '50%以上',
      directorsIndependent: '5',
      directorsOutside: '5',
      directorsAll: '12',
      chairman: '会長',
      parent: '親会社A',
      controllingShareholder: '支配株主A',
      takeoverDefenseMeasures: false,
      unGlobalCompact: true,
    },
    governance: go,
  },
  {
    brandCd: '4301',
    brandName: '三菱電機',
    year: '2022',
    month: '12',
    summary: {
      orgForm: '指名委員会等設置会社',
      foreignShareholdingRatio: '30%以上',
      directorsIndependent: '5',
      directorsOutside: '5',
      directorsAll: '12',
      chairman: '会長',
      parent: '親会社A',
      controllingShareholder: '支配株主A',
      takeoverDefenseMeasures: false,
      unGlobalCompact: true,
    },
    governance: go,
  },
  {
    brandCd: '4301',
    brandName: '三菱電機',
    year: '2021',
    month: '9',
    summary: {
      orgForm: '指名委員会等設置会社',
      foreignShareholdingRatio: '30%以上',
      directorsIndependent: '5',
      directorsOutside: '5',
      directorsAll: '12',
      chairman: '会長',
      parent: '親会社A',
      controllingShareholder: '支配株主A',
      takeoverDefenseMeasures: false,
      unGlobalCompact: true,
    },
    governance: go,
  },
]
