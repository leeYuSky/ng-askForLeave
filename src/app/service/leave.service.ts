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

  public isLogin(){
    const isloginInfo = new HttpParams();
    return this.http.post('http://localhost:8080/leave/auth/islogin', isloginInfo, httpOptions);
  }

  public login(username, password){
    const loginInfo = new HttpParams().set("username", username).set("password", password);
    return this.http.post('http://localhost:8080/leave/auth/login', loginInfo, httpOptions);
  }

  // 必须添加httpOptions, 否则会导致登出时的http请求不添加 cookie, 造成无法传输sessionId
  // 造成原因未明
  public logout(){
    const logoutInfo = new HttpParams();
    return this.http.post('http://localhost:8080/leave/auth/logout', logoutInfo, httpOptions);
  }

  public getUserInfo(username){
    const loginInfo = new HttpParams().set("username", username);
    return this.http.post('http://localhost:8080/leave/apply/info', loginInfo, httpOptions);
  }

  public addLeave (params){
    let queryString = "";
    for (const key in params){
      queryString += key + "=" + params[key] + "&";
    }
    queryString = queryString.substr(0, queryString.length - 1);
    // console.log(queryString);
    const addInfo = new HttpParams({fromString : queryString});
    return this.http.post("http://localhost:8080/leave/apply/add", addInfo, httpOptions);
  }

  public deleteLeave(id){
    const deleteInfo = new HttpParams().set("id", id);
    return this.http.post('http://localhost:8080/leave/apply/delete', deleteInfo, httpOptions);
  }

  public updateLeave(params){
    let queryString = "";
    for (const key in params){
      queryString += key + "=" + params[key] + "&";
    }
    queryString = queryString.substr(0, queryString.length - 1);
    const updateInfo = new HttpParams({fromString : queryString});
    return this.http.post("http://localhost:8080/leave/apply/modify", updateInfo, httpOptions);
  }

  public getLeaveDraft(username, pageIndex = 1, pageSize = 10){
    const getLeaveDraftInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/apply/draftList", getLeaveDraftInfo, httpOptions);
  }

  public getLeaveDone(username, pageIndex = 1, pageSize = 10){
    const getLeaveDoneInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/apply/publishList", getLeaveDoneInfo, httpOptions);
  }

  public getOvertimeDeaft(username, pageIndex = 1, pageSize = 10){
    const getLeaveDraftInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/apply/overtimeDraftList", getLeaveDraftInfo, httpOptions);
  }

  public getOvertimeDone(username, pageIndex = 1, pageSize = 10){
    const getLeaveDraftInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/apply/overtimePublishList", getLeaveDraftInfo, httpOptions);
  }

  public getReviewTodoList(username, pageIndex = 1, pageSize = 10){
    const getReviewTodoListInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/review/todoList", getReviewTodoListInfo, httpOptions);
  }

  public getReviewDoneList(username, pageIndex = 1, pageSize = 10){
    const getReviewDoneListInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/review/doneList", getReviewDoneListInfo, httpOptions);
  }

  public updateReviewLeave(params){
    let queryString = "";
    for (const key in params){
      queryString += key + "=" + params[key] + "&";
    }
    queryString = queryString.substr(0, queryString.length - 1);
    const updateInfo = new HttpParams({fromString : queryString});
    return this.http.post("http://localhost:8080/leave/review/action", updateInfo, httpOptions);
  }

}
