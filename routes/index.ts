const appRoutes = {
  login: {
    name: 'Log in',
    path: '/auth/login',
  },
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
  },
  users: {
    name: 'Users Management',
    path: '/users',
  },
  course: {
    name: 'Course Management',
    path: '/courses',
  },
  settings: {
    name: 'Settings',
    path: '/settings',
  },
};

export function makeRouteNameFromPath(currentPath: string) {
  switch(currentPath) {
    case appRoutes.dashboard.path:
      return appRoutes.dashboard.name;
    case appRoutes.login.path:
      return appRoutes.login.name;
    case appRoutes.users.path:
      return appRoutes.users.name;
    case appRoutes.settings.path:
      return appRoutes.settings.name;
    case appRoutes.course.path:
      return appRoutes.course.name;
    default:
      return '';
  }
}

export default appRoutes;
