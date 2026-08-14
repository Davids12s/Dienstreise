entity Dienstreisen {
    key id: UUID;
    startdate: Date;
    enddate: Date;
    zielort: String;
    transportmittel: String;
    istFlugzeug: Boolean;
    abflugort: String;
    abflugdatum: DateTime;
    ankunftsort: String;
    ankunftsdatum: DateTime;
    rückflugort: String;
    rückflugdatum: DateTime;
    hotel: Boolean;
}

