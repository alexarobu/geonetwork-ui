import { FieldFilter } from './filter.model'

export type FieldSort = ['desc' | 'asc', FieldName]
export type FieldName = string

export interface SearchParams {
  filters: FieldFilter
  offset: number
  limit: number
  sort: FieldSort
  fields: FieldName[]
}
