import { UsersListPage } from './app.po';

describe('users-list App', () => {
  let page: UsersListPage;

  beforeEach(() => {
    page = new UsersListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
