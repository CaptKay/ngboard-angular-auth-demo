import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth-service";
import { UserRole } from "../models/auth.models";



export const roleGuard: CanActivateFn = (route, state): boolean | UrlTree => {
    const auth = inject(AuthService)
    const router = inject(Router)

    const allowedRoles = route.data['roles'] as UserRole[] | undefined

    if(!auth.isLoggedIn()){
        return router.createUrlTree(['/login'])
    }

    if(!allowedRoles || allowedRoles.length === 0){
        return true
    }

    if(auth.hasAnyRole(allowedRoles)){
        return true
    }

return router.createUrlTree(['/dashboard'])

}