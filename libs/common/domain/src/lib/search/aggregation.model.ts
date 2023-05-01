import { FieldName } from './search.model'
import { FieldFilter } from './filter.model'

export interface TermsAggregationParams {
  type: 'terms'
  field: FieldName
  limit: number
  sort: AggregationSort
  filter?: string
}
export interface HistogramAggregationParams {
  type: 'histogram'
  field: FieldName
  interval: number
}
export interface FiltersAggregationParams {
  type: 'filters'
  filters: Record<string, FieldFilter>
}
export type AggregationParams =
  | TermsAggregationParams
  | HistogramAggregationParams
  | FiltersAggregationParams
export type AggregationsParams = Record<FieldName, AggregationParams>

interface TermBucket {
  term: string
  count: number
}
interface HistogramBucket {
  lowValue: number
  highValue: number
  count: number
}
interface FiltersBucket {
  name: string
  count: number
}

export type Bucket = TermBucket | HistogramBucket | FiltersBucket

export type AggregationSort = ['desc' | 'asc', 'key' | 'count']

interface AggregationBuckets {
  buckets: Bucket[]
}
type AggregationCounts = Record<string, number>
export type Aggregation = AggregationBuckets | AggregationCounts
export type Aggregations = Record<FieldName, Aggregation>
