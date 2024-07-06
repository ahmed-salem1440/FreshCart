import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', canActivate:[AuthGuard],component:HomeComponent,title:'Home'},
  {path:'about',canActivate:[AuthGuard],component:AboutComponent,title:'About'},
  {path:'categories',canActivate:[AuthGuard],component:CategoriesComponent,title:'Categories'},
  {path:'cart',canActivate:[AuthGuard],component:CartComponent,title:'Cart'},
  {path:'brands',canActivate:[AuthGuard],component:BrandsComponent,title:'Brands'},
  {path:'orders',canActivate:[AuthGuard],component:AllordersComponent,title:'Brands'},
  {path:'allorders',canActivate:[AuthGuard],component:AllordersComponent},
  {path:'checkout/:cartId/:payOption',canActivate:[AuthGuard],component:CheckoutComponent,title:'Checkout'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'forgetPassword',component:ForgetPasswordComponent,title:'Forget Password'},
  {path:'register',component:RegisterComponent,title:'Register'},
  {path:'products',canActivate:[AuthGuard],component:ProductsComponent,title:'Products'},
  {path:'productdetails/:id',canActivate:[AuthGuard],component:ProductDetailsComponent,title:'Product Details'},
  {path:'settings/:action',canActivate:[AuthGuard],loadChildren:()=> import('./settings/settings.module').then((m)=> m.SettingsModule),title:''},
  {path:'**',component:NotFoundComponent,title:'Not Found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
