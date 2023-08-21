import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlideMenuModule } from 'primeng/slidemenu';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    MenubarModule,
    FontAwesomeModule,
    SidebarModule,
    SlideMenuModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
