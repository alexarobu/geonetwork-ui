import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from './elasticsearch'
import { Observable } from 'rxjs'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'
import {
  SearchParams,
  SearchResults,
} from '@geonetwork-ui/common/domain/search/search.model'
import {
  Aggregations,
  AggregationsParams,
} from '@geonetwork-ui/common/domain/search'

@Injectable()
export class Gn4Repository implements RecordsRepositoryInterface {
  constructor(
    private gn4SearchApi: SearchApiService,
    private gn4SearchHelper: ElasticsearchService
  ) {}

  search({
    filters,
    fields,
    offset,
    limit,
    sort,
  }: SearchParams): Observable<SearchResults> {
    return this.gn4SearchApi.search(
      'bucket',
      JSON.stringify(
        this.gn4SearchHelper.getSearchRequestBody(
          {},
          limit,
          offset,
          sort,
          fields,
          filters
        )
      )
    )
  }

  aggregate(params: AggregationsParams): Observable<Aggregations> {
    return undefined
  }
}
