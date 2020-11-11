import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit{

    employees: Employee[];

    constructor(private repo: RepositoryService) {}

    ngOnInit(){
        this.repo.httpGet("api/employee").subscribe(response => {
            console.log(response);
            this.employees = <Employee[]>response;
            console.log(this.employees);

        }, error => {
            console.log(error);
        });
    }
}