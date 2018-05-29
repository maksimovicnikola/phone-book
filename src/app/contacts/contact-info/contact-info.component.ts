import { ContactsService } from './../../services/contacts.service';
import { Contact } from './../../models/contact';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  constructor(
    private contactService: ContactsService
  ) { }

  // getting contactInfo as input from parent component
  @Input('contactInfo') contactInfo: Contact;

  public model: Contact = new Contact();
  public isEditMode: boolean = false;
  public isCreated: boolean ;
  public isEdited: boolean;

  ngOnInit() {
    // if contact info is defined, it means this page is in edit template
    if (this.contactInfo != ( null && undefined) ) {
      this.model = this.contactInfo;

      this.isEditMode = true;
    }
    else {
      this.isEditMode = false;
    }
  }

  addContact() {
    this.preventOfWhiteSpaces();

    this.contactService.addContact(this.model).subscribe(res => {
      if (res === 1) {
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

  editContact() {
    this.preventOfWhiteSpaces();

    this.contactService.updateContact(this.model)
      .subscribe((res: number) => {
        if (res === 1) {  
          this.isEdited = true;
        }
        else {
          this.isEdited = false;
        }
      },
        err => {
          this.isEdited = false;
          console.log(err);
        });
  }

  preventOfWhiteSpaces() {
    // preventing of whitespaces
    this.model.FirstName = this.model.FirstName.trim();
    this.model.LastName = this.model.LastName.trim();
    this.model.PhoneNumber = this.model.PhoneNumber.trim();
  }
}
