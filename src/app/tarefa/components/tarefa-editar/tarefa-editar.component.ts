import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from '../../model';
import { TarefaService } from '../../service';

@Component({
  selector: 'app-tarefa-editar',
  templateUrl: './tarefa-editar.component.html',
  styleUrls: ['./tarefa-editar.component.css'],
})
export class TarefaEditarComponent implements OnInit {
  tarefas: Tarefa[];
  tarefa = {} as Tarefa;

  form: FormGroup;

  idTarefa: string;

  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gerarForm();
    this.idTarefa = this.route.snapshot.paramMap.get('id_tarefa');
    this.carregaTarefas();
    this.carregaTarefa(Number(this.idTarefa));
  }

  carregaTarefa(id: number) {
    this.tarefaService.tarefa(id).subscribe(
      (data) => {
        this.tarefa = data;
        this.populandoFormulario();
      },
      (err) => console.error(err)
    );
  }

  gerarForm() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', []],
    });
  }

  carregaTarefas() {
    this.tarefaService.listarTarefas().subscribe(
      (data) => {
        this.tarefas = data;
      },
      (err) => console.error(err)
    );
  }

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.tarefa.dataAtualizacao = new Date();
    this.tarefa.titulo = this.form.get('titulo').value;
    this.tarefa.descricao = this.form.get('descricao').value;

    this.tarefaService.atualizar(this.tarefa).subscribe(
      (data) => {
        this.carregaTarefas();
        this.router.navigate(['/tarefas']);
      },
      (err) => console.error(err)
    );
  }

  editar(id: number) {
    this.router.navigate(['/tarefas/detalhes' + id]);
  }

  finalizar(id: number) {
    this.tarefaService.tarefa(id).subscribe((data) => {
      this.tarefa = data;
      this.tarefa.status = 0;
      this.tarefa.conclusao = new Date();
      this.atualizarFinalizar(this.tarefa);
    });
  }

  excluir(id: number) {
    this.tarefaService.tarefa(id).subscribe((data) => {
      this.tarefa = data;
      this.tarefa.remocao = new Date();
      this.tarefa.statusRemocao = 1;
      this.atualizarExcluir(this.tarefa);
    });
  }

  atualizarFinalizar(tarefa: Tarefa) {
    this.tarefaService.atualizar(tarefa).subscribe(
      (data) => {
        this.carregaTarefas();
      },
      (err) => console.error(err)
    );
  }

  atualizarExcluir(tarefa: Tarefa) {
    this.tarefaService.atualizar(tarefa).subscribe(
      (data) => {
        this.carregaTarefas();
      },
      (err) => console.error(err)
    );
  }

  populandoFormulario() {
    this.form.patchValue({
      titulo: this.tarefa.titulo,
      descricao: this.tarefa.descricao,
    });
  }
}
