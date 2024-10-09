import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
    {
        path: '',
        component : ListComponent,
        title: 'List'
    },
    {
        path: 'form',
        component : FormComponent,
        title: 'Add'
    },
    {
        path: 'form/:id',
        component : FormComponent,
        title: 'Edit'
    }
];
