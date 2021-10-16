import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-edit',
  templateUrl: './agenda-edit.component.html',
  styleUrls: ['./agenda-edit.component.css']
})
export class AgendaEditComponent implements OnInit {
  id: number;
  editMode = false;
  agendaPersonForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private agendaService: AgendaService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      }
    );
  }

  onSubmit() {
  /*  const newagendaPerson = new Agenda(
      this.agendaPersonForm.value['firstname'],
      this.agendaPersonForm.value['lastname'],
      this.agendaPersonForm.value['age'],
      this.agendaPersonForm.value['datatime'],
      this.agendaPersonForm.value['phone'],
      this.agendaPersonForm.value['phonetype'],
      this.agendaPersonForm.value['adresstype'],
      this.agendaPersonForm.value['street'],
      this.agendaPersonForm.value['city'],
      this.agendaPersonForm.value['country'],
      this.agendaPersonForm.value['notes']); */
    if(this.editMode) {
      this.agendaService.updatePerson(this.id, this.agendaPersonForm.value);
    } else {
      this.agendaService.createPerson(this.agendaPersonForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let agendaPersonFirstname = '';
    let agendaPersonLastname = '';
    let agendaPersonAge = '';
    let agendaPersonDatatime = '';
    let agendaPersonPhone = '';
    let agendaPersonPhonetype = '';
    let agendaPersonAdresstype = '';
    let agendaPersonStreet = '';
    let agendaPersonCity = '';
    let agendaPersonCountry = '';
    let agendaPersonNotes = '';

    if(this.editMode) {
      const agendaPerson = this.agendaService.getPerson(this.id);
      agendaPersonFirstname = agendaPerson.firstname;
      agendaPersonLastname = agendaPerson.lastname;
      agendaPersonAge = agendaPerson.age;
      agendaPersonDatatime = agendaPerson.datatime;
      agendaPersonPhone = agendaPerson.phone;
      agendaPersonPhonetype = agendaPerson.phonetype;
      agendaPersonAdresstype = agendaPerson.adresstype;
      agendaPersonStreet = agendaPerson.street;
      agendaPersonCity = agendaPerson.city;
      agendaPersonCountry = agendaPerson.country;
      agendaPersonNotes = agendaPerson.notes;
    }

    this.agendaPersonForm = new FormGroup ({
      'firstname': new FormControl(agendaPersonFirstname, Validators.required),
      'lastname': new FormControl(agendaPersonLastname, Validators.required),
      'age': new FormControl(agendaPersonAge),
      'datatime': new FormControl(agendaPersonDatatime),
      'phone': new FormControl(agendaPersonPhone),
      'phonetype': new FormControl(agendaPersonPhonetype),
      'adresstype': new FormControl(agendaPersonAdresstype),
      'street': new FormControl(agendaPersonStreet),
      'city': new FormControl(agendaPersonCity),
      'country': new FormControl(agendaPersonCountry),
      'notes': new FormControl(agendaPersonNotes)
    });
  }
}
