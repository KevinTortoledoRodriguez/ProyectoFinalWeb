import { Component, OnInit } from '@angular/core';
import { ClimasService } from '../climas.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {
  constructor(private climaApi: ClimasService) { }
  carga = false;
  ciudad: any;
  clima: any;
  tiempo = '';
  fecha = new Date();

  ngOnInit() {
    this.ips()
  }

  ips(){
    this.climaApi.myIp().subscribe(
      data => {
        console.log(data.ip)
        this.information(data.ip);
      },
      error => {
        alert(error);
      }
    )
  }

  information(ip){
    this.climaApi.geolocalizacion(ip).subscribe(
      data => {
        this.carga = true;
        this.ciudad = data.loc;
        this.tiempo = this.fecha.toTimeString().slice(0,5);
        this.clima = data.clima.dataseries;
        this.trataclima();
        console.log(this.ciudad,this.clima)
      },
      error =>{
        alert(error);
      }
    )
  }

  trataclima(){
    this.clima.map((cli) =>{
      cli.weather= "../../assets/png/"+cli.weather+".png"
      const fech = cli.date.toString()
      cli.date= fech.substring(6,8)+ "-" + fech.substring(4,6) + "-" + fech.substring(0,4)
    })
  }
}
