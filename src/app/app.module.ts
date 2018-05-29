import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactInfoComponent } from './contacts/contact-info/contact-info.component';
import { ContactsService } from './services/contacts/contacts.service';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'edit-contact/:id', component: EditContactComponent },
  {
    path: 'contact-list',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: ContactListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactInfoComponent,
    AddContactComponent,
    EditContactComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
