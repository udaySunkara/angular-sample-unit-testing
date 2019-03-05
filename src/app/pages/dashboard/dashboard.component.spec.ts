import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../data.service';
import { BehaviorSubject, throwError } from 'rxjs';
// import {} from 'jasmine';
class MockdataService {
  getItems() {
    return new BehaviorSubject([{a: 1, b: 2}]);
  }
}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ClarityModule, ReactiveFormsModule, HttpClientModule],
      providers: [ {provide: DataService, useClass: MockdataService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check resetForm', () => {
    spyOn(component.exampleForm, 'reset');
    component.resetForm();
    expect(component.exampleForm.reset).toHaveBeenCalled();
  });

  it('should check submit - success', inject([DataService], (dataService) => {
    // spyOn(dataService, 'getItems').and.returnValue(new BehaviorSubject([{a: 1, b: 2}]));
    component.exampleForm.controls.sample.setValue('posts');
    component.submit();
    dataService.getItems('posts').subscribe((items) => {
      expect(items.length).toEqual(1);
      expect(component.items).toEqual([{a: 1, b: 2}]);
    });
    expect(component.userInput).toEqual('posts');
  }));
  it('should check submit - Error', inject([DataService], (dataService) => {
    // spyOn(dataService, 'getItems').and.returnValue(throwError('Invalid url'));
    dataService.getItems = () => {
      return throwError('Invalid url');
    };
    component.exampleForm.controls.sample.setValue('post');
    component.submit();
    dataService.getItems('post').subscribe((items) => {
    }, (error) => {
      expect(error).toEqual('Invalid url');
      expect(component.notifyError).toEqual(error);
    });
    expect(component.userInput).toEqual('post');
  }));
});
