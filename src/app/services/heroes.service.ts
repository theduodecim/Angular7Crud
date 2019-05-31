// tslint:disable:quotemark
import { Injectable } from "@angular/core";
import { HeroeModel } from "../models/heroe.model";
import { HttpClient } from "@angular/common/http";
import { map, delay } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class HeroesService {
  private url = "https://angular7crud-84f97.firebaseio.com";
  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        console.log(resp);
        heroe.id = resp.name;
        console.log(heroe.id);
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map(res => {
        return this.crearArreglo(res);
      }),
      delay(1000)
    );
  }

  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];
    console.log(heroesObj);

    Object.keys(heroesObj).forEach(key => {
      console.log(key);
      const heroe: HeroeModel = heroesObj[key];

      // assigning a value to the property id of the model, to each assosiative index of this array
      heroe.id = key;
      heroes.push(heroe);
      console.log(heroes);
    });

    // validation this will prevent any data that not come from the database
    if (heroesObj === null) {
      return [];
    }
    return heroes;
  }
}
