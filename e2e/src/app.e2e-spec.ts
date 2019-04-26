import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title Header', () => {
    page.navigateTo();

    expect(page.getTitle()).toEqual('CAPE Web');
  });
});
