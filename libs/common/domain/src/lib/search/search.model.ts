import { FieldFilters } from './filter.model'
import { CatalogRecord } from '../record'
import { Geometry } from 'geojson'

type FieldSort = ['desc' | 'asc', FieldName]
export type SortByField = FieldSort | FieldSort[] // several sort criteria can be used!
export type FieldName = string

export interface SearchParams {
  filters?: FieldFilters
  offset: number
  limit: number
  sort?: SortByField
  fields?: FieldName[]
  filterIds?: string[]
  filterGeometry?: Geometry
}

export interface SearchResults {
  records: CatalogRecord[]
  count: number
}
