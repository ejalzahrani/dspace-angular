import { Component, Inject } from '@angular/core';
import { renderElementsFor } from '../../../object-collection/shared/dso-element-decorator';
import { MyDSpaceResultListElementComponent, } from '../my-dspace-result-list-element.component';
import { ViewMode } from '../../../../+search-page/search-options.model';
import { RemoteData } from '../../../../core/data/remote-data';
import { Observable } from 'rxjs/Observable';
import { hasNoUndefinedValue } from '../../../empty.util';
import { ListableObject } from '../../../object-collection/shared/listable-object.model';
import { Workflowitem } from '../../../../core/submission/models/workflowitem.model';
import { ClaimedTask } from '../../../../core/submission/models/tasks/claimed-task-object.model';
import { ClaimedTaskMyDSpaceResult } from '../../../object-collection/shared/claimed-task-my-dspace-result.model';

@Component({
  selector: 'ds-claimtask-my-dspace-result-list-element',
  styleUrls: ['../my-dspace-result-list-element.component.scss'],
  templateUrl: './ct-my-dspace-result-list-element.component.html',
})

@renderElementsFor(ClaimedTaskMyDSpaceResult, ViewMode.List)
@renderElementsFor(ClaimedTask, ViewMode.List)
export class ClaimedTaskMyDSpaceResultListElementComponent extends MyDSpaceResultListElementComponent<ClaimedTaskMyDSpaceResult, ClaimedTask> {
  public workFlow: Workflowitem;
  // public submitter: Eperson;
  // public user: Eperson;

  constructor(
              // private store: Store<AppState>,
              // private ctDataService: ClaimedTaskDataService,
              @Inject('objectElementProvider') public listable: ListableObject) {
    super(listable);
  }

  ngOnInit() {
    this.initItem(this.dso.workflowitem as Observable<RemoteData<Workflowitem[]>>);

    // (this.dso.submitter as Observable<RemoteData<Eperson[]>>)
    //   .filter((rd: RemoteData<any>) => ((!rd.isRequestPending) && hasNoUndefinedValue(rd.payload)))
    //   .first()
    //   .subscribe((rd: RemoteData<any>) => {
    //     // console.log(rd);
    //     this.submitter = rd.payload[0];
    //   });
    //
    // this.store.select(getAuthenticatedUser)
    //   .filter((user: Eperson) => isNotEmpty(user))
    //   .take(1)
    //   .subscribe((user: Eperson) => {
    //     this.user = user;
    //   });

  }

  initItem(wfiObs: Observable<RemoteData<Workflowitem[]>>) {
    wfiObs
      .filter((rd: RemoteData<any>) => ((!rd.isRequestPending) && hasNoUndefinedValue(rd.payload)))
      .first()
      .subscribe((rd: RemoteData<any>) => {
        this.workFlow = rd.payload[0];
      });
  }

}
