import { AfterViewInit, Component, Inject } from '@angular/core';

import { AppConfig, APP_CONFIG, FaviconService, PortalService } from '@cima/commons';


@Component({
  selector: 'reporter-app-container',
  templateUrl: './reporter-app-container.component.html',
  styleUrls: ['./reporter-app-container.component.scss'],
})
export class ReporterAppContainerComponent  implements AfterViewInit{
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private faviconService: FaviconService,
    private portalService: PortalService
  ) {}

  ngAfterViewInit() {
    this.faviconService.setAppFavicon(this.config.name);
    this.portalService.setTitle(this.config.description);
  }
}
