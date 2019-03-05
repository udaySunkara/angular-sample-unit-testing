import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError } from 'rxjs';
let service: DataService = null;
let httpMock: HttpTestingController = null;

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getItems - success', () => {
    service.getItems('posts').subscribe(
      (items) => {
        expect(items).toBeDefined();
        expect(items.length).toEqual(1);
      }
    );
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush([{a: 1, b: 2}]);
  });

  it('should test getItems - error', () => {
    service.getItems('post').subscribe(
      (items) => {
      }, (error) => {
        expect(error).toEqual('Invald Url');
      }
    );
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/post');
    expect(req.request.method).toBe('GET');
    req.flush(throwError('Invald Url'));
  });
});
