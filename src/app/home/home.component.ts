import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private jwtHelper: JwtHelperService, private router: Router) {}

    isAuthenticated () {
        const token: string = localStorage.getItem('authToken');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        } else {
            return false;
        }
    }

    logOut() {
        localStorage.removeItem('authToken');
        localStorage.removeItem("refreshToken");
        this.router.navigate(["/"]);
    }
}