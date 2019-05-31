// tslint:disable:quotemark
import { Component, OnInit } from "@angular/core";
import { HeroeModel } from "src/app/models/heroe.model";
import { NgForm, NgModel } from "@angular/forms";
import { HeroesService } from "src/app/services/heroes.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();

  constructor(
    public heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    // the condition to make this logic is if i have the id value of nuevo, we will keep the fields clear
    // and if we have an id, we will pass the values
    console.log(id);
    if (id !== "nuevo") {
      this.heroesService.getHeroe(id).subscribe((resp: HeroeModel) => {
        console.log(` ${resp} this is the response of getHeroe`);
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("formulario no válido");
    }
    console.log(form);
    console.log(this.heroe);

    Swal.fire({
      title: "Espere",
      text: "Guardando información",
      type: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    // decide if we will create or update
    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: "Se actualizó correctamente",
        type: "success"
        // tslint:disable-next-line:no-shadowed-variable
      }).then(resp => {
        if (resp.value) {
          this.router.navigate(["/"]);
        }
      });
    });
  }
}
