import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }),
  withCredentials: true
};

@Injectable()
export class LeaveService implements OnInit{

  results: string[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public firstCall(){
    const loginInfo = new HttpParams().set("username", "Jack").set("password", "123456");
    const a = {username : "Jack", password: "123456"};
    return this.http.post('http://localhost:8081/leave/auth/login', loginInfo, httpOptions);
  }

  public login(username, password){
    const loginInfo = new HttpParams().set("username", username).set("password", password);
    return this.http.post('http://localhost:8081/leave/auth/login', loginInfo, httpOptions);
  }

  public getUserInfo(username){
    const loginInfo = new HttpParams().set("username", username);
    return this.http.post('http://localhost:8081/leave/apply/info', loginInfo, httpOptions);
  }

  public addLeave (params){
    let queryString = "";
    for (const key in params){
      queryString += key + "=" + params[key] + "&";
    }
    queryString = queryString.substr(0, queryString.length - 1);
    // console.log(queryString);
    const addInfo = new HttpParams({fromString : queryString});
    return this.http.post("http://localhost:8081/leave/apply/add", addInfo, httpOptions);
  }

  public deleteLeave(id){
    const deleteInfo = new HttpParams().set("id", id);
    return this.http.post('http://localhost:8081/leave/apply/delete', deleteInfo, httpOptions);
  }

  public updateLeave(params){
    let queryString = "";
    for (const key in params){
      queryString += key + "=" + params[key] + "&";
    }
    queryString = queryString.substr(0, queryString.length - 1);
    const updateInfo = new HttpParams({fromString : queryString});
    return this.http.post("http://localhost:8081/leave/apply/modify", updateInfo, httpOptions);
  }

  public getLeaveDraft(username, pageIndex = 1, pageSize = 10){
    const getLeaveDraftInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8081/leave/apply/draftList", getLeaveDraftInfo, httpOptions);
  }

  public getLeaveDone(username, pageIndex = 1, pageSize = 10){
    const getLeaveDoneInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8081/leave/apply/publishList", getLeaveDoneInfo, httpOptions);
  }

  public getReviewTodoList(username, pageIndex = 1, pageSize = 10){
    const getReviewTodoListInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8081/leave/review/todoList", getReviewTodoListInfo, httpOptions);
  }

  public getReviewDoneList(username, pageIndex = 1, pageSize = 10){
    const getReviewDoneListInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8081/leave/review/doneList", getReviewDoneListInfo, httpOptions);
  }

  public updateReviewLeave(params){
    let queryString = "";
    for (const key in params){
      queryString += key + "=" + params[key] + "&";
    }
    queryString = queryString.substr(0, queryString.length - 1);
    const updateInfo = new HttpParams({fromString : queryString});
    return this.http.post("http://localhost:8081/leave/review/action", updateInfo, httpOptions);
  }

}
