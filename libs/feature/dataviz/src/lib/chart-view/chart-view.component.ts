import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  BaseReader,
  FieldAggregation,
  getJsonDataItemsProxy,
} from '@geonetwork-ui/data-fetcher'
import { DDChoices } from '@geonetwork-ui/ui/inputs'
import { MetadataLink } from '@geonetwork-ui/util/shared'
import { AggregationTypes } from '@geonetwork-ui/common/domain/data/data-api.model'
import { InputChartType } from '@geonetwork-ui/common/domain/data/dataviz-configuration.model'
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs'
import {
  catchError,
  filter,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators'
import { DataService } from '../service/data.service'

marker('chart.type.bar')
marker('chart.type.barHorizontal')
marker('chart.type.line')
marker('chart.type.lineSmooth')
marker('chart.type.pie')

marker('chart.aggregation.sum')
marker('chart.aggregation.max')
marker('chart.aggregation.min')
marker('chart.aggregation.average')
marker('chart.aggregation.count')

@Component({
  selector: 'gn-ui-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartViewComponent {
  @Input() set link(value: MetadataLink) {
    this.currentLink$.next(value)
  }
  private currentLink$ = new BehaviorSubject<MetadataLink>(null)

  loading = false
  error = null

  typeChoices: DDChoices<InputChartType> = [
    { label: 'chart.type.bar', value: 'bar' },
    { label: 'chart.type.barHorizontal', value: 'bar-horizontal' },
    { label: 'chart.type.line', value: 'line' },
    { label: 'chart.type.lineSmooth', value: 'line-interpolated' },
    { label: 'chart.type.pie', value: 'pie' },
  ]

  get aggregationChoices() {
    if (!this.yProperty$.value) {
      return [{ label: 'chart.aggregation.count', value: 'count' }]
    }
    return [
      { label: 'chart.aggregation.sum', value: 'sum' },
      { label: 'chart.aggregation.max', value: 'max' },
      { label: 'chart.aggregation.min', value: 'min' },
      { label: 'chart.aggregation.average', value: 'average' },
      { label: 'chart.aggregation.count', value: 'count' },
    ] as DDChoices<AggregationTypes>
  }

  dataset$: Observable<BaseReader> = this.currentLink$.pipe(
    filter((link) => !!link),
    switchMap((link) => {
      this.error = null
      this.loading = true
      return this.dataService.getDataset(link).pipe(
        catchError((error) => {
          this.handleError(error)
          return EMPTY
        }),
        finalize(() => {
          this.loading = false
          this.changeDetector.detectChanges()
        })
      )
    }),
    shareReplay(1)
  )
  properties$ = this.dataset$.pipe(
    switchMap((dataset) =>
      dataset.properties.catch((error) => {
        this.handleError(error)
        return []
      })
    ),
    shareReplay(1)
  )
  yChoices$ = this.properties$.pipe(
    map((properties) =>
      properties
        .filter((prop) => prop.type === 'number' || prop.type === 'date')
        .map((prop) => ({ value: prop.name, label: prop.label || prop.name }))
    ),
    tap((choices) => {
      if (!choices.find((choice) => choice.value === this.yProperty$.value)) {
        const newProp = choices[0]?.value || ''
        if (!newProp && this.aggregation$.value !== 'count') {
          this.aggregation$.next('count')
        }
        this.yProperty$.next(newProp)
      }
    })
  )
  xChoices$ = this.properties$.pipe(
    map((properties) =>
      properties
        .filter((prop) => prop.type === 'string')
        .map((prop) => ({
          value: prop.name,
          label: prop.label || prop.name,
        }))
    ),
    tap((choices) => {
      if (!choices.find((choice) => choice.value === this.xProperty$.value)) {
        this.xProperty$.next(choices[0]?.value || '')
      }
    })
  )
  chartType: InputChartType = 'bar'
  xProperty$ = new BehaviorSubject<string>(undefined)
  yProperty$ = new BehaviorSubject<string>(undefined)
  aggregation$ = new BehaviorSubject<FieldAggregation[0]>('sum')

  chartData$ = combineLatest([
    this.dataset$,
    this.xProperty$.pipe(filter((value) => value !== undefined)),
    this.yProperty$.pipe(filter((value) => value !== undefined)),
    this.aggregation$,
  ]).pipe(
    switchMap(([dataset, xProp, yProp, aggregation]) => {
      const fieldAgg: FieldAggregation =
        aggregation === 'count' ? ['count'] : [aggregation, yProp]
      return dataset
        .groupBy(['distinct', xProp])
        .aggregate(fieldAgg)
        .read()
        .catch((error) => {
          this.handleError(error)
          return []
        })
    }),
    map(getJsonDataItemsProxy),
    startWith([]),
    shareReplay(1)
  )

  get labelProperty() {
    if (!this.xProperty$.value) return ''
    return `distinct(${this.xProperty$.value})`
  }
  get valueProperty() {
    if (this.isCountAggregation) return 'count()'
    return `${this.aggregation$.value}(${this.yProperty$.value})`
  }
  get isCountAggregation() {
    return this.aggregation$.value === 'count'
  }

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef
  ) {}

  handleError(error) {
    this.error = error.message
    this.changeDetector.detectChanges()
    console.warn(error.stack || error.message)
  }
}
