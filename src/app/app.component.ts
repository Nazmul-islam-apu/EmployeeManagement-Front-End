import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmployeeManagement';
  public employees: Employee[] = [];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void{
  
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onEditEmployee(employee: Employee): void{
    this.employeeService.editEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(keyword: string): void{
    const searchResult: Employee[] = [];
    for(const employee of this.employees){
      if((employee.name.toLowerCase().indexOf(keyword.toLowerCase())!==-1) 
      || (employee.email.toLowerCase().indexOf(keyword.toLowerCase())!==-1)
      || (employee.designation.toLowerCase().indexOf(keyword.toLowerCase())!==-1)
      || (employee.contact.toLowerCase().indexOf(keyword.toLowerCase())!==-1)){
        searchResult.push(employee);
      }
      }
      this.employees = searchResult;
      if(searchResult.length===0 || !keyword){
        this.getEmployees();
    }
  }



  public onOpenModal(employee: Employee, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode ==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }

    if (mode ==='edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#editEmployeeModal');
    }

    if (mode ==='delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();

  }


}
