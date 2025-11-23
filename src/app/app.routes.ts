import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { loggedInGuard } from './guards/logged-in-guard';
import { adminGuardGuard } from './guards/admin-guard/admin-guard-guard';
import { userGuard } from './guards/user-guard/user-guard';

export const routes: Routes = [
    { path: '', title: 'Login Page', component: Login, canActivate: [loggedInGuard] },
    { path: 'register', title: 'Register Page', component: Register },
    {
        path: 'admin',
        loadComponent: () =>
            import('./admin/admin-layout/admin-layout.component/admin-layout.component')
                .then(m => m.AdminLayoutComponent),

        children: [
            { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
            {
                path: 'admindashboard',
                title: 'Admin Dashboard',
                canActivate: [adminGuardGuard],
                loadComponent: () =>
                    import('./admin/admin-dashboard/admin-dashboard')
                        .then(m => m.AdminDashboard)
            },
            {
                path: 'posts',
                title: 'Posts',
                canActivate: [adminGuardGuard],
                loadComponent: () =>
                    import('./posts/post/post')
                        .then(m => m.Post)
            }, {
                path: 'post/:id',
                title: 'Post Details',
                canActivate: [adminGuardGuard],
                loadComponent: () =>
                    import('./posts/post-detail/post-detail')
                        .then(m => m.PostDetail)
            },

        ]
    },
    {
        path: 'userdashboard',
        title: 'User Dashboard',
        canActivate: [userGuard],
        loadComponent: () =>
            import('./user/user-dashboard/user-dashboard')
                .then(m => m.UserDashboard)
    },
];
