import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../_service/employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    const user = JSON.parse(localStorage.getItem("USER"));
    let data = {
      email: user.email
    };
    employeeService.getUser(data).subscribe(
      res => {
        localStorage.setItem("USER", JSON.stringify(res.data));
        router.navigate(["dashboard"]);
        console.log("res", res);
      },
      err => {
        console.log("Error", err);
      }
    );
  }

  ngOnInit() {}
}
