using { cuid, managed } from '@sap/cds/common';


type state: String enum{
    NEU;
    BEREIT;
    BEARBEITUNG;
    GEBUCHT;
    ABGESCHLOSSEN;
    STORNIERT
}

type Transportmittel: String enum{
    AUTO;
    FLUGZEUG;
    RAD;
    ZUG;
    HUBSCHRAUBER
}


entity Dienstreisen: cuid, managed{
    startdate: Date;
    enddate: Date;
    zielort: String;
    transportmittel: Transportmittel;
    abflugort: String;
    abflugdatum: DateTime;
    ankunftsort: String;
    ankunftsdatum: DateTime;
    rueckflugort: String;
    rueckflugdatum: DateTime;
    hotel: Boolean;

    flugBuchungscode: String;
    hotelBuchungscode: String;


    kommentare: Composition of many Kommentare on kommentare.dienstreise =$self;
    status: Composition of many Status on status.dienstreise= $self;
    attachments: Composition of many Attachements on attachments.dienstreise= $self;
}

entity Kommentare: cuid, managed{
    titel: String;
    inhalt: String;
    date: DateTime;
    autor: String;
    dienstreise: Association to one Dienstreisen
}

entity Status: cuid, managed{
    status: state default #NEU;
    date: DateTime;

    dienstreise: Association to one Dienstreisen
}

entity Attachements: cuid, managed{
    type: String;
    title: String(100);
    file: LargeBinary @Core.MediaType: type;
    dienstreise: Association to one Dienstreisen
}

