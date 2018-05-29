import { Contact } from '../../models/contact';
import { Injectable } from '@angular/core';
import { MappingApi } from '../../mappings/mapping-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContactList() {
    const url: string = MappingApi.get_contacts;

    return this.http.get(url);
  }

  getContactById(id: string) {
    let url: string = MappingApi.get_contacts_by_id;
    url = url.replace('{id}', id);

    return this.http.get(url);
  }

  addContact(contactInfo: Contact) {
    const url: string = MappingApi.create_contacts;

    return this.http.post(url, contactInfo);
  }

  deleteContact(contactId: number) {
    let url: string = MappingApi.delete_contact;
    url = url.replace('{id}', contactId.toString());

    return this.http.get(url);
  }

  deleteAllContact() {
    let url: string = MappingApi.delete_all_contact;

    return this.http.get(url);
  }

  updateContact(contactInfo: Contact) {
    const url: string = MappingApi.update_contacts;

    return this.http.post(url, contactInfo);
  }
}