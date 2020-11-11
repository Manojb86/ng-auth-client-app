import { NgModule } from "@angular/core";
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('authToken');
}

const configurations = {
    config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: []
      }
}

@NgModule({
    imports: [JwtModule.forRoot(configurations)],
    exports: [JwtModule]
})
export class AuthJwtModule {}