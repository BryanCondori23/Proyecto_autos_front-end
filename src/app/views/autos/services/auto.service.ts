
import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AutoModel } from "../models/auto.models";
import { Observable } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class AutoService {
  //url de su api (backend)
  private API_URL = 'http://localhost:8000/autos'
  constructor(private http: HttpClient) {

  }

  getAutos(): Observable<AutoModel[]> {
    return this.http.get<AutoModel[]>(`${this.API_URL}/getAutos`);
  }

  agregarautos(auto: AutoModel) : Observable<AutoModel> {
    return this.http.post<AutoModel>(`${this.API_URL}/agregarautos`, auto);
  }

  editarautos(auto: AutoModel) : Observable<AutoModel> {
    return this.http.put<AutoModel>(`${this.API_URL}/editarautos/${auto._id}`, auto);
  }

  eliminarAuto(idAuto : string) : Observable<AutoModel> {
    console.log(idAuto);
    // return this.http.delete<RecetaModel>(`${this.API_URL}/eliminar/${idReceta}`);
    return this.http.delete<AutoModel>(this.API_URL+'/eliminar/'+idAuto);

  }
}
