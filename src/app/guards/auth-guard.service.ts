import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(private jwtHelper: JwtHelperService, private router: Router, private httpClient: HttpClient){}

    async canActivate() {
        const token = localStorage.getItem('authToken');        
        if(token && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }

        const isRefreshTokenSuccess = await this.tryRefreshingTokens(token);
        if (!isRefreshTokenSuccess) {
            this.router.navigate(['login']);            
        }

        return isRefreshTokenSuccess;
    }

    private async tryRefreshingTokens(token: string): Promise<boolean>{
        const refreshToken = localStorage.getItem('refreshToken');
        const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

        let isRefreshTokenSuccess: boolean;
        try {
            let route = 'api/auth/refresh';
            let url = `${environment.apiBaseUrl}/${route}`;
            const response = await this.httpClient.post(url, credentials, {
                                                    headers: new HttpHeaders({
                                                        "Content-Type": "application/json"
                                                    }),
                                                    observe: 'response'
                                                }).toPromise();

            // If token refresh is successful, set new tokens in local storage.
            const newToken = (<any>response).body.accessToken;
            const newRefreshToken = (<any>response).body.refreshToken;
            localStorage.setItem("authToken", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            isRefreshTokenSuccess = true;
        } catch (error) {
            isRefreshTokenSuccess = false;
        }

        return isRefreshTokenSuccess;
    }
}