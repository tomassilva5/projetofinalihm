import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  // TODO: Implement your authentication logic here
  const isAuthenticated = false; // Replace with actual auth check
  
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}; 