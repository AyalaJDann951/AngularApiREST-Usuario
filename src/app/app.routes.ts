import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Empleados } from './componentes/empleados/empleados';
import { Paises } from './componentes/paises/paises';
import { Usuarios } from './componentes/usuarios/usuarios';

export const routes: Routes = [
    {path: 'listEmp', component: Empleados},
    {path: 'listUs', component: Usuarios},
    {path: 'listPais', component: Paises}
];
