import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { EmployeeService } from "../_service/employee.service";
import { patternValidator } from "../core/pattern.validator";

@Component({
  selector: "app-login",

  templateUrl: "./login.component.html",

  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          patternValidator(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      password: ["", [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  loadAPIData() {
    this.loginForm.setValue({
      email: "Bruce",
      password: "test"
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const formData = new FormData();
    formData.append("username", this.loginForm.value.email);
    formData.append("password", this.loginForm.value.password);

    const url = "http://localhost:3000/User/login";
    this.employeeService.service(this.loginForm.value, url).subscribe(
      response => {
        console.log(
          "Success!",
          // response.token,
          // localStorage.setItem("Token", response.token),
          response
        );
        localStorage.setItem("USER", JSON.stringify(response.data));
        this.router.navigate(["dashboard"]);
      },
      error => {
        console.error("Error!", error);
      }
    );
  }
}
