import { ContactsService } from './../../services/contacts.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../models/contact';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit, OnDestroy {

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute
  ) { this.getContactInfo(this.contactId)}

  private contactId: string = this.route.snapshot.params.id;
  public contact: Contact = new Contact();
  private sub: Subscription = new Subscription();
  public isLoadedContact: boolean = false;

  ngOnInit() {
    this.getContactInfo(this.contactId);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getContactInfo(id: string) {
    this.sub = this.contactService.getContactById(id)
      .subscribe((res: Contact) => {
        this.contact = res;
        this.isLoadedContact = true;
      })
  }

}
