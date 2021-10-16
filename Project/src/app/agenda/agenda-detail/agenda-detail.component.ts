import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.component.html',
  styleUrls: ['./agenda-detail.component.css']
})
export class AgendaDetailComponent implements OnInit {
  agenda: Agenda;
  id: number;

  constructor(private agendaService: AgendaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.agenda = this.agendaService.getPerson(this.id);
      }
    );
  }

  onEditAgendaPerson() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeletePerson() {
    this.agendaService.deletePerson(this.id);
    this.router.navigate(['/agendaPersons']);
  }
}
