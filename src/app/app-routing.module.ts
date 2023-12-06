import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageApiComponent } from './image-api/image-api.component';
import { ATMMachineComponent } from './atm-machine/atm-machine.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'image-api', component:ImageApiComponent},
  {path:'atm',component:ATMMachineComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
