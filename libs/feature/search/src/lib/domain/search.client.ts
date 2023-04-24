import { CatalogRecord } from '@geonetwork-ui/util/types/metadata'
import { FieldFilter } from './filter.model'
import { FieldSort } from './sort.model'
import { FieldName } from './field.model'
import { Observable } from 'rxjs'

type Aggregations = unknown

export abstract class SearchClient {
  abstract search(
    filters: FieldFilter,
    offset: number,
    limit: number,
    sort: FieldSort,
    fields: FieldName[]
  ): Observable<CatalogRecord[]>

  abstract getAggregations(): Observable<Aggregations>
}
