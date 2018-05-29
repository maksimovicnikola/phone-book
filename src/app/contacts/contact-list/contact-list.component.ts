import { Contact } from './../../models/contact';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MappingApi } from '../../mappings/mapping-api';
import { ContactsService } from '../../services/contacts.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) { }

  contacts: Contact[];
  private sub = new Subscription();

  ngOnInit() {
    let contactList$ = this.contactsService.getContactList()
      .subscribe((res: Contact[]) => {
        this.contacts = res;
      })

    this.sub.add(contactList$)
  }

  deleteContact(contactId: number) {
    let contactRemove$ = this.contactsService.deleteContact(contactId)
      .subscribe((res: Contact[]) => {
        if (res != null) {
          this.contacts = res;
        }
      },
      err => {
        console.log(err);
      });
    
      this.sub.add(contactRemove$);
  }

  removeAllContacts() {
    let removeAllContacts$ = this.contactsService.deleteAllContact()
      .subscribe((res: number) => {
        if(res === 1) {
          this.contacts = [];
        }
        else {
          console.log('Some error occured!');
        }
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
