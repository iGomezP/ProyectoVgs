import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ProfileComponent } from './users/profile/profile.component';
import { TabViewModule } from 'primeng/tabview';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserInfoComponent } from './users/profile/user-info/user-info.component';
import { GamesComponent } from './games/games/games.component';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { GameCardComponent } from './games/game-card/game-card.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    HealthCheckComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserInfoComponent,
    GamesComponent,
    GameCardComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    SkeletonModule,
    FieldsetModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    PasswordModule,
    DividerModule,
    FormsModule,
    TabViewModule,
    FontAwesomeModule,
    DataViewModule,
    TagModule,
    RatingModule,
    DropdownModule,
    RouterModule,
    CardModule,
    CarouselModule,
    ChipModule,
    ScrollPanelModule,
    DialogModule,
  ],
})
export class MainModule {}
