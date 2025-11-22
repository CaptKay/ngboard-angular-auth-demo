import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './auth/guards/auth-guard';
import { roleGuard } from './auth/guards/role-guard';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
    {
        path: 'login',
        loadComponent: ()=> import('./auth/login-page/login-page').then((m)=> m.LoginPage), 
        data: {animation: 'LoginPage'},
    },
    // {
    //     path: 'register',
    //     loadComponent: () => import('./auth/register-page/register-page').then((m)=> m.RegisterPage),
    //     data: {animation: 'RegisterPage'}
    // },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],
        data: {animation: 'DashboardPage'}
    },
    {
        path: 'tasks',
        loadComponent: () => import('./tasks/tasks-page/tasks-page/tasks-page').then((m) => m.TasksPage),
         canActivate: [authGuard],
    data: { animation: 'TasksPage' },
    },
    {

        path: 'tasks/:id',
        loadComponent: () => import('./tasks/task-detail-page/task-detail-page').then((m) => m.TaskDetailPage),
        canActivate: [authGuard],
    data: { animation: 'TaskDetailPage' },
    },
   
    {
        path: 'profile',
        loadComponent: ()=> import('./components/profile/profile').then((m)=> m.Profile),
         canActivate: [authGuard],
    data: { animation: 'ProfilePage' },
    },
    {
        path: 'settings',
        loadComponent: ()=> import('./settings/settings').then((m)=> m.Settings),
         canActivate: [authGuard, roleGuard],
    data: { animation: 'SettingsPage', roles: ['admin'] },
    },
    {
        path: '**',
        loadComponent: ()=> import('./not-found/not-found').then((m)=> m.NotFound),
        data: { animation: 'NotFoundPage' },
    },
];
