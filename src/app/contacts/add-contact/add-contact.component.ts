import { ContactsService } from './../../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  constructor(private contactService: ContactsService) { }

  public model: Contact = new Contact();
  public isCreated: boolean;
  ngOnInit() {
  }

  addContact() {
    this.contactService.addContact(this.model).subscribe(res => {
      if (res == 1) {
        this.isCreated = true;
      }
      else {
        this.isCreated = false;
      }
    },
      err => {
        this.isCreated = false;
        console.log(err);
      });
  }

}
