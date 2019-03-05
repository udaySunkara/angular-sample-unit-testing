import { DataUrlPipe } from './data-url.pipe';

describe('DataUrlPipe', () => {
  let pipe = null;
  beforeEach(() => {
    pipe = new DataUrlPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return input url', () => {
    expect(pipe.transform('http://my-vmware.com')).toEqual('http://my-vmware.com');
  });

  it('should return fallback url', () => {
    expect(pipe.transform('', 'http://ui.vmware.com')).toEqual('http://ui.vmware.com');
  });

  it('should return fallback url with https', () => {
    expect(pipe.transform('', 'http://ui.vmware.com', true)).toEqual('https://ui.vmware.com');
  });
});
