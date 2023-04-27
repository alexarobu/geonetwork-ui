import { FieldName } from './search.model'
import { FieldFilter } from './filter.model'

export type AggregationParams =
  | {
      type: 'terms'
      field: FieldName
      limit: number
      sort: AggregationSort
    }
  | {
      type: 'histogram'
      field: FieldName
      interval: number
    }
  | {
      type: 'filters'
      filters: { name: string; filter: FieldFilter }[]
    }

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

export interface Aggregation {
  buckets: Bucket[]
}
