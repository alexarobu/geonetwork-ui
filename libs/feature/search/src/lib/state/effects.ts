import { Inject, Injectable, Optional } from '@angular/core'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { EsSearchResponse } from '@geonetwork-ui/util/shared'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { combineLatestWith, from, of } from 'rxjs'
import {
  catchError,
  map,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators'
import {
  AddResults,
  ClearError,
  ClearPagination,
  ClearResults,
  PatchResultsAggregations,
  REQUEST_MORE_ON_AGGREGATION,
  REQUEST_MORE_RESULTS,
  RequestMoreOnAggregation,
  RequestMoreResults,
  SCROLL,
  SearchActions,
  SET_FAVORITES_ONLY,
  SET_FILTERS,
  SET_INCLUDE_ON_AGGREGATION,
  SET_SEARCH,
  SET_SORT_BY,
  SET_SPATIAL_FILTER_ENABLED,
  SetError,
  SetIncludeOnAggregation,
  SetResultsAggregations,
  SetResultsHits,
  UPDATE_FILTERS,
  UPDATE_REQUEST_AGGREGATION_TERM,
  UpdateRequestAggregationTerm,
} from './actions'
import { SearchState, SearchStateSearch } from './reducer'
import { getSearchStateSearch } from './selectors'
import { HttpErrorResponse } from '@angular/common/http'
import { switchMapWithSearchId } from '../utils/operators/search.operator'
import { FavoritesService } from '../favorites/favorites.service'
import { Geometry } from 'geojson'
import { FILTER_GEOMETRY } from '../feature-search.module'
import { Gn4Repository } from '@geonetwork-ui/api/repository/gn4'

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<SearchState>,
    private recordsRepository: Gn4Repository,
    private authService: AuthService,
    private favoritesService: FavoritesService,
    @Optional()
    @Inject(FILTER_GEOMETRY)
    private filterGeometry: Promise<Geometry>
  ) {}

  clearResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SET_SORT_BY,
        SET_FILTERS,
        UPDATE_FILTERS,
        SET_SEARCH,
        SET_FAVORITES_ONLY,
        SET_SPATIAL_FILTER_ENABLED
      ),
      switchMap((action: SearchActions) =>
        of(
          new ClearResults(action.id),
          new ClearPagination(action.id),
          new RequestMoreResults(action.id)
        )
      )
    )
  )

  scroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SCROLL),
      map((action: SearchActions) => new RequestMoreResults(action.id))
    )
  )

  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REQUEST_MORE_RESULTS),
      switchMapWithSearchId((action: SearchActions) =>
        this.authService.authReady().pipe(
          withLatestFrom(
            this.store$.pipe(select(getSearchStateSearch, action.id))
          ),
          // Note: this could have been integrated in withLatestFrom above but
          // I could not get this to work (maybe a bug in rxjs?)
          switchMap(([, state]) =>
            this.favoritesService.myFavoritesUuid$.pipe(
              take(1),
              map(
                (favorites) =>
                  [state, favorites] as [SearchStateSearch, string[]]
              )
            )
          ),
          switchMap(([state, favorites]) => {
            if (!state.params.useSpatialFilter || !this.filterGeometry) {
              return of([state, favorites, null])
            }
            return from(this.filterGeometry).pipe(
              map((geom) => [state, favorites, geom]),
              catchError(() => of([state, favorites, null])) // silently opt out of spatial filter if an error happens
            )
          }),
          switchMap(
            ([state, favorites, geometry]: [
              SearchStateSearch,
              string[],
              Geometry | null
            ]) => {
              const { offset, limit, sort } = state.params
              const filters = {
                ...state.config.filters,
                ...state.params.filters,
              }
              const results$ = this.recordsRepository.search({
                filters,
                offset,
                limit,
                sort,
              })
              const aggregations$ = this.recordsRepository.aggregate(
                state.config.aggregations
              )
              // FIXME: favorites, geometry
              return results$.pipe(combineLatestWith(aggregations$))
            }
          ),
          switchMap(([results, aggregations]) => {
            return [
              new AddResults(results.records, action.id),
              new SetResultsAggregations(aggregations, action.id),
              new SetResultsHits(results.count, action.id),
              new ClearError(action.id),
            ]
          }),
          catchError((error: HttpErrorResponse | Error) => {
            if ('status' in error) {
              return of(new SetError(error.status, error.message, action.id))
            } else {
              return of(new SetError(0, error.message, action.id))
            }
          })
        )
      )
    )
  )

  loadMoreOnAggregation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<RequestMoreOnAggregation>(REQUEST_MORE_ON_AGGREGATION),
      switchMap((action: RequestMoreOnAggregation) =>
        of(
          new UpdateRequestAggregationTerm(
            action.aggregationName,
            {
              increment: action.increment,
            },
            action.id
          )
        )
      )
    )
  })

  setIncludeOnAggregation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<SetIncludeOnAggregation>(SET_INCLUDE_ON_AGGREGATION),
      switchMap((action) =>
        of(
          new UpdateRequestAggregationTerm(
            action.aggregationName,
            {
              include: action.include,
            },
            action.id
          )
        )
      )
    )
  })

  updateRequestAggregationTerm$ = createEffect(() => {
    const updateTermAction$ = this.actions$.pipe(
      ofType<UpdateRequestAggregationTerm>(UPDATE_REQUEST_AGGREGATION_TERM)
    )

    return updateTermAction$.pipe(
      switchMap((action) =>
        this.authService.authReady().pipe(
          withLatestFrom(
            this.store$.pipe(select(getSearchStateSearch, action.id))
          ),
          switchMap(([, state]) =>
            this.searchService.search(
              'bucket',
              JSON.stringify(
                this.esService.buildMoreOnAggregationPayload(
                  state.config.aggregations,
                  action.aggregationName,
                  state.params.filters,
                  state.config.filters
                )
              )
            )
          ),
          map((response: EsSearchResponse) => {
            const aggregations = response.aggregations
            return new PatchResultsAggregations(
              action.aggregationName,
              aggregations,
              action.id
            )
          })
        )
      ) // wait for auth to be known
    )
  })
}
