import { CatalogRecord } from '@geonetwork-ui/util/types/metadata'
import { FieldFilter } from './filter.model'
import { Observable } from 'rxjs'

type Aggregations = unknown

export type FieldSort = ['desc' | 'asc', FieldName]
export type FieldName = string

export interface SearchOptions {
  filters: FieldFilter
  offset: number
  limit: number
  sort: FieldSort
  fields: FieldName[]
}

export abstract class SearchClient {
  abstract search(options: SearchOptions): Observable<CatalogRecord[]>

  abstract getAggregations(): Observable<Aggregations>
}
