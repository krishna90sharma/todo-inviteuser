import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "../login/login.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RegisterComponent } from "../register/register.component";
import { ProfileComponent } from "../profile/profile.component";
import { EditProfileComponent } from "../profile/edit-profile/edit-profile.component";
import { AuthGuard } from "../_service/auth.gaurd";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "editProfile", component: EditProfileComponent },
  { path: "", component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
