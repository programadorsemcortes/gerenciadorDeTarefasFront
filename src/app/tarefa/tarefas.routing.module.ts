import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarefaComponent, GerenciadorComponent } from './components';
export const TarefaRoutes: Routes = [
  {
    path: 'tarefas',
    component: GerenciadorComponent,
    children: [{ path: '', component: TarefaComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(TarefaRoutes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}
