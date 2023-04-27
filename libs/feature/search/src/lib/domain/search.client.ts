import { CatalogRecord } from '@geonetwork-ui/common/domain/metadata'
import { Observable } from 'rxjs'
import { Aggregation, AggregationParams } from './aggregation.model'
import { SearchOptions } from './search.model'

export abstract class SearchClient {
  abstract search(options: SearchOptions): Observable<CatalogRecord[]>
  abstract aggregate(params: AggregationParams): Observable<Aggregation>
}
