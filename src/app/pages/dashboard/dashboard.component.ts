import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/Operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  items: any = [];
  userInput = '';
  destroy$ = new Subject();
  notifyError = '';
  exampleForm = new FormGroup({
      sample: new FormControl('', Validators.required),
  });
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }
  resetForm() {
      this.exampleForm.reset();
  }

  submit() {
    this.userInput = this.exampleForm.controls.sample.value;
    this.dataService.getItems(this.userInput).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (items) => {
        if (items) {
          this.items = this.getFirstTenRecords(items);
        }
      },
      (error) => {
        this.notifyError = error;
      }
    );
      // ...
  }

  getFirstTenRecords(items) {
    if (items.constructor.name === 'Array') {
      return items.slice(0, 10);
    } else {
      return items;
    }

  }

ngOnDestroy() {
  this.destroy$.next(true);
}
}
