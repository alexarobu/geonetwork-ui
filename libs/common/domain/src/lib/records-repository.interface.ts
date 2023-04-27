import { Observable } from 'rxjs'
import { CatalogRecord } from './record'
import { Aggregation, AggregationParams, SearchParams } from './search'

export abstract class RecordsRepositoryInterface {
  abstract search(params: SearchParams): Observable<CatalogRecord[]>
  abstract aggregate(params: AggregationParams): Observable<Aggregation>
}
