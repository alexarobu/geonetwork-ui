import { SearchClient } from '../domain/search.client'
import { FieldFilter } from '../domain/filter.model'
import { FieldSort } from '../domain/sort.model'
import { FieldName } from '../domain/field.model'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'

@Injectable()
class Gn4SearchClient extends SearchClient {
  constructor(
    private gn4SearchApi: SearchApiService,
    private gn4SearchHelper: ElasticsearchService
  ) {
    super()
  }

  getAggregations(): Observable<Aggregations> {
    return undefined
  }

  search(
    filters: FieldFilter,
    offset: number,
    limit: number,
    sort: FieldSort,
    fields: FieldName[]
  ): Observable<CatalogRecord[]> {
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
}
