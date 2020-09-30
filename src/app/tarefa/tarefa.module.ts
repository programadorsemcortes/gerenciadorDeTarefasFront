import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaComponent, GerenciadorComponent, TarefaEditarComponent } from './components';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TarefaService } from './service';

@NgModule({
  declarations: [TarefaComponent, GerenciadorComponent, TarefaEditarComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [TarefaService],
})
export class TarefaModule {}
