import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { loggedInGuard } from './guards/logged-in-guard';
import { adminGuardGuard } from './guards/admin-guard/admin-guard-guard';
import { userGuard } from './guards/user-guard/user-guard';
import { postGuard } from './guards/post-guard/post-guard';

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
            },
            {
                path: 'status/:status',
                title: 'Posts by Status',
                loadComponent: () =>
                    import('./posts/post/post')
                        .then(m => m.Post),
                canActivate: [adminGuardGuard],
            },
            {
                path: 'post/:id',
                title: 'Post Details',
                canActivate: [adminGuardGuard],
                loadComponent: () =>
                    import('./posts/post-detail/post-detail')
                        .then(m => m.PostDetail)
            },
            {
                path: 'users',
                title: 'Users',
                canActivate: [adminGuardGuard],
                loadComponent: () =>
                    import('./user/users/user')
                        .then(m => m.User)
            },

        ]
    },
    {
        path: 'create-post',
        title: 'Create Post',
        canActivate: [postGuard], // or a general logged-in guard
        loadComponent: () =>
            import('./posts/create-post/create-post/create-post')
                .then(m => m.CreatePost)
    },
    {
        path: 'edit-post/:id',
        title: 'Edit Post',
        canActivate: [postGuard],
        loadComponent: () =>
            import('./posts/edit-post/edit-post/edit-post')
                .then(m => m.EditPost)
    },
    //for user
    {
        path: 'user',
        loadComponent: () =>
            import('./user/user-layout/user-layout')
                .then(m => m.UserLayout),
        children: [
            { path: '', redirectTo: 'posts', pathMatch: 'full' },
            {
                path: 'userdashboard',
                title: 'User Dashboard',
                canActivate: [userGuard],
                loadComponent: () =>
                    import('./user/user-dashboard/user-dashboard')
                        .then(m => m.UserDashboard)
            },
            {
                path: 'posts',
                title: 'Posts',
                canActivate: [userGuard],
                loadComponent: () =>
                    import('./posts/post/post')
                        .then(m => m.Post)
            },
            {
                path: 'my-posts',
                title: 'Posts',
                canActivate: [userGuard],
                loadComponent: () =>
                    import('./posts/post/post')
                        .then(m => m.Post)
            },



            {
                path: 'my-posts/status/:status',
                title: 'Posts by Status',
                loadComponent: () =>
                    import('./posts/post/post')
                        .then(m => m.Post),
                canActivate: [userGuard],
            },
            {
                path: 'post/:id',
                title: 'Post Details',
                canActivate: [userGuard],
                loadComponent: () =>
                    import('./posts/post-detail/post-detail')
                        .then(m => m.PostDetail)
            },

        ]
    },


];
