import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Istudent } from '../models/studentInterface';
import { Observable, Subject, map } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
  public stdUrl : string = `${environment.baseUrl}/stdInfo.json`
  private stdObj$ : Subject<Istudent> = new Subject<Istudent>();
  private stdUpdateInfo$ : Subject<Istudent> = new Subject<Istudent>();
  public getStudentInfo$ = this.stdUpdateInfo$.asObservable()
  public stdData$ = this.stdObj$.asObservable()
  constructor(private _http : HttpClient,
                private _snackBar : SnackBarService) { }

  getAllStudentList(): Observable<Istudent[]>{
    return this._http.get<Istudent[]>(this.stdUrl)
    .pipe(
      map((res) =>{
        let stdArray : Array<Istudent> = [];
        for(const key in res){
          stdArray.push({...res[key], id : key})
        }
        return stdArray;
      })
    )
  }


  createNewStdInfo(info : Istudent){
    return this._http.post(this.stdUrl, info)
  }
  
  sendData(std : Istudent){
    this.stdObj$.next(std)
  }

  getUpdateData(std : Istudent):Observable<Istudent>{
    let singleStdUrl = `${environment.baseUrl}/stdInfo/${std.id}.json`;
    return this._http.patch<Istudent>(singleStdUrl,std);
  }

  sendUpdateStudent(data : Istudent){
    this.stdUpdateInfo$.next(data);
  }

  onDeleteStudent(id : Istudent):Observable<null>{
    let deleteUrl = `${environment.baseUrl}/stdInfo/${id}.json`;
    return this._http.delete<null>(deleteUrl);
  }
}
