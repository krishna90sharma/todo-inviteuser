import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { patternValidator } from "../core/pattern.validator";
import { EmployeeService } from "../_service/employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          patternValidator(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],
      name: ["", [Validators.required]],
      // phone: ['', [Validators.required,Validators.minLength(10)]],
      role: "user"
    });
  }

  get password() {
    return this.registrationForm.get("password");
  }

  get email() {
    return this.registrationForm.get("email");
  }
  get name() {
    return this.registrationForm.get("name");
  }
  // get phone() {
  //   return this.registrationForm.get("phone");
  // }

  loadAPIData() {
    this.registrationForm.setValue({
      email: "Bruce",
      password: "test",
      name: "Bruce"
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    const url = "http://localhost:3000/User/create";
    this.employeeService.service(this.registrationForm.value, url).subscribe(
      response => {
        console.log("Success!", response);
        this.router.navigate(["login"]);
      },
      error => {
        console.error("Error!", error);
      }
    );
  }
}
