import { BrandCodeMaster } from '@/aws/models'

export enum BrandSearchItem {
  FILTER = 'filter',
  RECENT = 'recent',
}

export type DefaultSearchItemType = {
  text?: string | number | Record<string, unknown>
  value?: string | number | Record<string, unknown>
  disabled?: boolean
  divider?: boolean
  header?: string
}
export type CustomSearchItemType = BrandSearchItem.FILTER | BrandSearchItem.RECENT | undefined

export interface BrandSearchFilterValue {
  title: string
  color: string
}
export type BrandSearchRecentValue = string

export interface CustomSearchItemModel {
  type: CustomSearchItemType
  value?: BrandSearchFilterValue[] | BrandSearchRecentValue | string
}

export type BrandSearchCodeMaster = BrandCodeMaster

export type BrandSearchItemType = (CustomSearchItemModel | DefaultSearchItemType | BrandSearchCodeMaster)[]
