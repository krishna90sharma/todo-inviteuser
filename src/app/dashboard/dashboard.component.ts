import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { EmployeeService } from "../_service/employee.service";

interface detail {
  email: string;
  name: string;
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  contacts: any[];
  detail: detail;
  role: boolean = true;
  selectedContact: any;
  constructor(private employeeService: EmployeeService) {
    const user = JSON.parse(localStorage.getItem("USER"));
    console.log("user", user.role);
    if (user.role !== "admin") {
      this.role = false;
    }
  }
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    const url = "http://localhost:3000/User/getContact";
    this.employeeService.getData(url).subscribe(
      data => {
        console.log(data);
        this.contacts = data;
      },
      error => console.error("Error!", error)
    );
  }
  deleteContact() {
    console.log("delete", this.selectedContact);
    this.employeeService.deleteContact(this.selectedContact).subscribe(
      res => {
        console.log("res", res);
        this.refresh();
      },
      err => {
        console.log("err", err);
      }
    );
  }
  updateContact(form) {
    console.log("update", form);
    this.employeeService
      .updateContact(form.value, this.selectedContact.id)
      .subscribe(
        res => {
          console.log("res", res);
          form.reset();
          this.refresh();
        },
        err => {
          console.log("err", err);
        }
      );
    this.refresh();
  }
  createContact(form) {
    console.log("update", form);
    this.employeeService.createContact(form.value).subscribe(
      res => {
        console.log("res", res);
        form.reset();
        this.refresh();
      },
      err => {
        console.log("err", err);
      }
    );
    this.refresh();
  }
  setContact(contact) {
    console.log("contact", contact);
    this.selectedContact = contact;
  }
  invite(form) {
    console.log("contact", form);

    this.employeeService.getUser(form.value).subscribe(
      res => {
        console.log("res", res);
        const status = {
          access: true
        };
        this.employeeService.updateUser(status, res.data.id).subscribe(
          res => {
            console.log("res", res);
            form.reset();
            this.refresh();
          },
          err => {
            console.log("err", err);
          }
        );
      },
      err => {
        console.log("error", err);
      }
    );

    // this.refresh();
  }
}
