using {Dienstreisen as DienstreisenDb, Kommentare as KommentareDb, Status as StatusDb, Attachements as AttachementsDb}  from '../db/Dienstreise';


@(requires:'Angestellter') @(path: '/angestellter')
service AngestelltenService{
    entity Dienstreisen as projection on  DienstreisenDb excluding {flugBuchungscode, hotelBuchungscode};
    entity Kommentare as projection on KommentareDb;
    entity Status as projection on StatusDb;
    entity Attachements  as projection on AttachementsDb;
}
@(requires: 'Backoffice')@(path: '/backoffice')
service BackofficeService{
    entity Dienstreisen as projection on DienstreisenDb;
    entity Status as projection on StatusDb;
    entity Attachement as projection on AttachementsDb;
    entity Kommentare   as projection on KommentareDb;
}

@(requires: 'Admin')@(path: '/admin')
service AdminService {
   entity Dienstreisen as projection on DienstreisenDb;
    entity Status as projection on StatusDb;
}