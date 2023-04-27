import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { EditorService } from '@geonetwork-ui/feature/editor'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Injectable({
  providedIn: 'root',
})
export class EditRecordResolver implements Resolve<CatalogRecord> {
  constructor(private editorService: EditorService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CatalogRecord> {
    return this.editorService.loadRecordByUuid(route.paramMap.get('uuid'))
  }
}
