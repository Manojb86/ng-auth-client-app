import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    invalidLogin: boolean;

    constructor(private router: Router, private repo: RepositoryService) {}

    login(form: NgForm) {
        const credentials = JSON.stringify(form.value);

        this.repo.httpPost('api/auth/login', credentials)
        .subscribe(response => {
            const token = (<any>response).accessToken;
            const refreshToken = (<any>response).refreshToken;
            localStorage.setItem("authToken", token);
            localStorage.setItem("refreshToken", refreshToken);

            this.invalidLogin = false;
            this.router.navigate(["/"]);
        }, error => {
            this.invalidLogin = true;
        });

    }
}