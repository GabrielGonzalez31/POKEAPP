import { inject } from '@angular/core';
import { AuthService } from './../servicios/auth.service';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthToken().pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/auth']); // Redirige al login si no está autenticado
        return false;
      }
      return true; // Permite que la ruta coincida
    })
  );
};
