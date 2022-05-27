export interface EsgTemplateModel {
  id: string
  templateName: string
  canUpdate: boolean
  default: boolean
  permission: string
  correspond: EsgTemplateDetailModel[]
}

export interface EsgTemplateDetailModel {
  id: string
  displayOrder: number
  cls1: string
  cls2: string
  item: string
  nriId: string
  nriCls1: string
  nriCls2: string
  nriItem: string
  nriPerspective: string
  nriReferenceCd: string
}

export const mockEsgTemplate: EsgTemplateModel[] = [
  {
    id: '90',
    templateName: '90_自社評価・表示/登録用項目',
    canUpdate: false,
    default: true,
    permission: '全社',
    correspond: [
      {
        id: '1',
        displayOrder: 1,
        cls1: 'G',
        cls2: 'G1.経営トップ（経営陣の評価）',
        item: '経営トップメッセージ（産業・事業ビジョン）',
        nriId: '1',
        nriCls1: '1.企業概要',
        nriCls2: '01.経営メッセージ',
        nriItem: '01.自社が置かれている産業の長期ビジョンや自社の将来ビジョンに関する経営メッセージ',
        nriPerspective:
          '・自社が置かれている産業の中長期ビジョンについて示されているか？\n・その中で自社の将来ビジョンを語っているか？',
        nriReferenceCd: '102-14',
      },
      {
        id: '1',
        displayOrder: 1,
        cls1: 'G',
        cls2: 'G1.経営トップ（経営陣の評価）',
        item: '経営トップメッセージ（産業・事業ビジョン）',
        nriId: '2',
        nriCls1: '1.企業概要',
        nriCls2: '02.価値観',
        nriItem: '01.価値観、企業理念、パーパス、行動原則',
        nriPerspective:
          '・自社の社会使命や存在意義を意識した、企業理念、価値観、パーパス等が示されているか？\n・自社の企業理念等を実現するために必要な、各ステークホルダーとの関係性を表す行動原則等が示されているか？\n※価値共創ガイダンス参照',
        nriReferenceCd: '102-16',
      },
    ],
  },
  {
    id: '91',
    templateName: '91_自社評価・表示/登録用項目',
    canUpdate: false,
    default: true,
    permission: '全社',
    correspond: [
      {
        id: '1',
        displayOrder: 1,
        cls1: 'G',
        cls2: 'G1.経営トップ（経営陣の評価）',
        item: '経営トップメッセージ（産業・事業ビジョン）',
        nriId: '1',
        nriCls1: '1.企業概要',
        nriCls2: '01.経営メッセージ',
        nriItem: '01.自社が置かれている産業の長期ビジョンや自社の将来ビジョンに関する経営メッセージ',
        nriPerspective:
          '・自社が置かれている産業の中長期ビジョンについて示されているか？\n・その中で自社の将来ビジョンを語っているか？',
        nriReferenceCd: '102-14',
      },
      {
        id: '1',
        displayOrder: 1,
        cls1: 'G',
        cls2: 'G1.経営トップ（経営陣の評価）',
        item: '経営トップメッセージ（産業・事業ビジョン）',
        nriId: '2',
        nriCls1: '1.企業概要',
        nriCls2: '02.価値観',
        nriItem: '01.価値観、企業理念、パーパス、行動原則',
        nriPerspective:
          '・自社の社会使命や存在意義を意識した、企業理念、価値観、パーパス等が示されているか？\n・自社の企業理念等を実現するために必要な、各ステークホルダーとの関係性を表す行動原則等が示されているか？\n※価値共創ガイダンス参照',
        nriReferenceCd: '102-16',
      },
      {
        id: '1',
        displayOrder: 1,
        cls1: 'G',
        cls2: 'G1.経営トップ（経営陣の評価）',
        item: '経営トップメッセージ（産業・事業ビジョン）',
        nriId: '3',
        nriCls1: '1.企業概要',
        nriCls2: '02.価値観',
        nriItem: '02.価値観、企業理念、パーパス、行動原則',
        nriPerspective:
          '・自社の社会使命や存在意義を意識した、企業理念、価値観、パーパス等が示されているか？\n・自社の企業理念等を実現するために必要な、各ステークホルダーとの関係性を表す行動原則等が示されているか？\n※価値共創ガイダンス参照',
        nriReferenceCd: '102-16',
      },
      {
        id: '2',
        displayOrder: 2,
        cls1: 'G',
        cls2: 'G1.経営トップ（経営陣の評価）',
        item: '経営トップメッセージ（産業・事業ビジョン）',
        nriId: '2',
        nriCls1: '1.企業概要',
        nriCls2: '02.価値観',
        nriItem: '02.価値観、企業理念、パーパス、行動原則',
        nriPerspective:
          '・自社の社会使命や存在意義を意識した、企業理念、価値観、パーパス等が示されているか？\n・自社の企業理念等を実現するために必要な、各ステークホルダーとの関係性を表す行動原則等が示されているか？\n※価値共創ガイダンス参照',
        nriReferenceCd: '102-16',
      },
    ],
  },
]
