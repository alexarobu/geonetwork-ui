import { Observable } from 'rxjs'
import {
  Aggregations,
  AggregationsParams,
  SearchParams,
  SearchResults,
} from './search'

export abstract class RecordsRepositoryInterface {
  abstract search(params: SearchParams): Observable<SearchResults>
  abstract aggregate(params: AggregationsParams): Observable<Aggregations>
}
