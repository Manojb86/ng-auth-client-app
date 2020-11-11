import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {

    constructor(private httpClient: HttpClient) {}

    httpGet = (route: string) => {
        return this.httpClient.get(this.createFullRoute(route));
    };

    httpPost = (route: string, body) => {
        return this.httpClient.post(this.createFullRoute(route), body, this.getHttpHeaders())
    };

    httpPut = (route: string, body) => {
        return this.httpClient.put(this.createFullRoute(route), body, this.getHttpHeaders())
    };

    httpDelete = (route: string) => {
        return this.httpClient.delete(this.createFullRoute(route))
    };

    createFullRoute= (route: string) : string => {
        return `${environment.apiBaseUrl}/${route}`;
    };

    getHttpHeaders = () => {
        return {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
    };

}