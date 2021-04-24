import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "./employee";

@Injectable(
    {
        providedIn:'root'
    }
)

export class EmployeeService{
    public apiServerUrl = environment.baseUrl;

    constructor(private http: HttpClient){}

    public getEmployees(): Observable<Employee[]>{
        return this.http.get<any>(`${this.apiServerUrl}/employee/all`);

    }

    public addEmployee(employee: Employee): Observable<Employee>{
        return this.http.post<any>(`${this.apiServerUrl}/employee/add`,employee);

    }

    public updateEmployee(employee: Employee): Observable<Employee>{
        return this.http.put<any>(`${this.apiServerUrl}/employee/update`,employee);

    }

    public deleteEmployee(employeeId: number): Observable<void>{
        return this.http.delete<any>(`${this.apiServerUrl}/employee/delete/${employeeId}`);

    }


}