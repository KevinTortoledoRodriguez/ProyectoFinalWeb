import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClimasService {
  baseURL = 'http://api.ipstack.com/';
  key = '9c94b931b39db746edb10b25adb0525c';

  constructor( private http: HttpClient) { }

  myIp(){
    console.log("llegue aqui")
    return this.http.get(this.baseURL+'check?access_key='+this.key)
  }

  geolocalizacion(ip){
    return this.http.get(this.baseURL+ip+"?access_key="+this.key).pipe(
      mergeMap((loc: any) => {
        const params = {
          lon:loc.longitude,
          lat:loc.latitude,
          product:'civillight',
          output:'json'
        };
        return this.http.get('http://www.7timer.info/bin/api.pl',{params}).pipe(
          map(clima => ({clima, loc}))
        );
      })
    );
  }
}
