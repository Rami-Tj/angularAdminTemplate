import {Component, OnDestroy, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {navItems} from '../../_nav';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  constructor(
    private authService: AuthService, @Inject(DOCUMENT) _document?: any,
  ) {

    this.changes = new MutationObserver((mutations) => {
      // console.log(mutations);
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
