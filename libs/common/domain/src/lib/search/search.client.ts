import { Observable } from 'rxjs'
import { CatalogRecord } from '../metadata'
import { Aggregation, AggregationParams } from './aggregation.model'
import { SearchOptions } from './search.model'

export abstract class SearchClient {
  abstract search(options: SearchOptions): Observable<CatalogRecord[]>
  abstract aggregate(params: AggregationParams): Observable<Aggregation>
}
