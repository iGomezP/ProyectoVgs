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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserButtonsComponent } from './components/user-buttons/user-buttons.component';
import { LoginFailedComponent } from './components/login-failed/login-failed.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    UserButtonsComponent,
    LoginFailedComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    MenubarModule,
    FontAwesomeModule,
    SidebarModule,
    SlideMenuModule,
  ],
  exports: [HeaderComponent, FooterComponent, NotFoundComponent],
})
export class SharedModule {}
