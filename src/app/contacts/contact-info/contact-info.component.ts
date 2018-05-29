import { Subscription } from 'rxjs/Subscription';
import { ContactsService } from '../../services/contacts/contacts.service';
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
  public isCreated: boolean;
  public isEdited: boolean;
  public showLoadingSpinner: boolean = false;

  private sub = new Subscription();

  ngOnInit() {
    // if contact info is defined, it means this page is in edit template
    if (this.contactInfo != (null && undefined)) {
      this.model = this.contactInfo;

      this.isEditMode = true;
    }
    else {
      this.isEditMode = false;
    }
  }

  addContact() {
    this.showLoadingSpinner = true;
    this.preventOfWhiteSpaces();

    let addContact$ = this.contactService.addContact(this.model).subscribe(res => {
      if (res === 1) {
        this.isCreated = true;
      }
      else {
        this.isCreated = false;
      }

      this.showLoadingSpinner = false;
    },
      err => {
        this.isCreated = false;
        this.showLoadingSpinner = false;
        console.log(err);
      });

    this.sub.add(addContact$);
  }

  editContact() {
    this.showLoadingSpinner = true;
    this.preventOfWhiteSpaces();

    let updateContact$ = this.contactService.updateContact(this.model)
      .subscribe((res: number) => {
        if (res === 1) {
          this.isEdited = true;
        }
        else {
          this.isEdited = false;
        }

        this.showLoadingSpinner = false;
      },
        err => {
          this.isEdited = false;
          this.showLoadingSpinner = false;
          console.log(err);
        });

    this.sub.add(updateContact$);
  }

  // preventing of whitespaces  
  preventOfWhiteSpaces() {
    this.model.FirstName != undefined ? this.model.FirstName.trim() : this.model.FirstName;
    this.model.LastName != undefined ? this.model.LastName.trim() : this.model.LastName;
    this.model.PhoneNumber != undefined ? this.model.PhoneNumber.trim() : this.model.PhoneNumber;
  }
}
