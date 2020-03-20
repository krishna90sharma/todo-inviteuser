import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dashboard } from "../_models/dashboard";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  service(userData, _url) {
    console.log(userData);
    return this._http.post<any>(_url, userData);
  }

  getData(_url): Observable<any> {
    // console.log(JSON.stringify(option));
    // console.log(_url);
    return this._http.get<any>(_url);
  }

  deleteContact(contact) {
    const url = "http://localhost:3000/User/" + contact.id + "/deleteContact";
    return this._http.delete<any>(url);
  }
  updateContact(contact, id) {
    const url = "http://localhost:3000/User/" + id + "/updateContact";
    return this._http.patch<any>(url, contact);
  }
  createContact(contact) {
    const url = "http://localhost:3000/User/createContact";
    return this._http.post<any>(url, contact);
  }
  getUser(user) {
    const url = "http://localhost:3000/User/getUser";
    return this._http.post<any>(url, user);
  }
  updateUser(user, id) {
    const url = "http://localhost:3000/User/" + id + "/update";
    return this._http.patch<any>(url, user);
  }
}
