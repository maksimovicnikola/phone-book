export abstract class MappingApi {
    private static base_url = 'http://localhost:59267/';

    public static get_contacts = MappingApi.base_url + 'phonebook/contacts';
    public static get_contacts_by_id = MappingApi.base_url + 'phonebook/contacts/{id}';
    public static delete_contact = MappingApi.base_url + 'phonebook/delete/{id}';
    public static delete_all_contact = MappingApi.base_url + 'phonebook/deleteall';
    public static update_contacts = MappingApi.base_url + 'phonebook/update';
    public static create_contacts = MappingApi.base_url + 'phonebook/create';
}
