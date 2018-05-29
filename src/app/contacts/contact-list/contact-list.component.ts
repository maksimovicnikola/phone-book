import { Contact } from './../../models/contact';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MappingApi } from '../../mappings/mapping-api';
import { ContactsService } from '../../services/contacts/contacts.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  public contacts: Contact[];
  private sub = new Subscription();

  private closeResult: string;
  public showLoadingSpinner: boolean = true;

  ngOnInit() {
    let contactList$ = this.contactsService.getContactList()
      .subscribe((res: Contact[]) => {
        this.contacts = res;
        this.showLoadingSpinner = false;
      },
    err => {
      console.log(err);
      this.showLoadingSpinner = false;
    })

    this.sub.add(contactList$)
  }

  deleteContact(contactId: number) {
    this.showLoadingSpinner = true;

    let contactRemove$ = this.contactsService.deleteContact(contactId)
      .subscribe((res: Contact[]) => {
        if (res != null) {
          this.contacts = res;
          this.showLoadingSpinner = false;
        }
      },
        err => {
          this.showLoadingSpinner = false;
          console.log(err);
        });

    this.sub.add(contactRemove$);
  }

  removeAllContacts() {
    this.showLoadingSpinner = true;

    let removeAllContacts$ = this.contactsService.deleteAllContact()
      .subscribe((res: number) => {
        if (res === 1) {
          this.contacts = [];
          this.showLoadingSpinner = false;
        }
        else {
          this.showLoadingSpinner = false;
          console.log('Some error occured!');
        }
      },
        err => {
          this.showLoadingSpinner = false;
        })

      this.sub.add(removeAllContacts$);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  open(content: any, modalType?: string, rowId?: number) {
    this.modalService.open(content).result.then((result) => {
      if (result) {
        if (modalType === 'removeAll') {
          this.removeAllContacts();
        }
        else {
          this.deleteContact(rowId)
        }
      }
    })
  }
}
