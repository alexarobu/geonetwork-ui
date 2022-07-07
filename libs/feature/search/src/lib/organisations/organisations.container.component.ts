import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { GroupsApiService } from '@geonetwork-ui/data-access/gn4'
import { Organisation } from '@geonetwork-ui/util/shared'
import { combineLatest, Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'gn-ui-organisations-container',
  templateUrl: './organisations.container.component.html',
  styleUrls: ['./organisations.container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsContainerComponent implements OnInit {
  constructor(
    private searchfacade: SearchFacade,
    private groupsApiService: GroupsApiService
  ) {}
  orgAggregation$: Observable<any>
  groups$: Observable<any[]>
  organisations$: Observable<Organisation[]>

  ngOnInit(): void {
    this.searchfacade.setConfigAggregations({
      org: {
        terms: {
          size: 1000,
          field: 'Org',
          order: {
            _key: 'asc',
          },
          exclude: '',
        },
      },
    })
    this.searchfacade.requestMoreResults()
    this.groups$ = this.groupsApiService.getGroups()
    // .pipe(tap(console.log))
    this.orgAggregation$ = this.searchfacade.resultsAggregations$.pipe(
      filter((aggs) => aggs.org)
    )
    this.organisations$ = combineLatest([
      this.orgAggregation$,
      this.groups$,
    ]).pipe(
      map(([aggs, groups]) =>
        aggs.org.buckets
          .map(
            (organisation) =>
              ({
                name: organisation.key,
                description: null,
                logoUrl: groups.find(
                  (group) => group.name === organisation.name
                )?.logo,
                recordCount: organisation.doc_count,
              } as Organisation)
          )
          //filter duplicates
          .filter(
            (org, i, orgs) =>
              orgs.findIndex(
                (firstOrg) =>
                  firstOrg.name.toLowerCase() === org.name.toLowerCase()
              ) === i
          )
      )
      // tap(console.log)
    )
  }
}
