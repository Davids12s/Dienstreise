using { BackofficeService } from './service';

annotate BackofficeService.Dienstreisen with @(
  UI.HeaderInfo: {
    TypeName: 'Dienstreise',
    TypeNamePlural: 'Dienstreisen',
    Title: { Value: zielort },
    Description: { Value: transportmittel }
  },

  UI.LineItem: [
    { Value: zielort,         Label: 'Zielort' },
    { Value: startdate,       Label: 'Start' },
    { Value: enddate,         Label: 'Ende' },
    { Value: transportmittel, Label: 'Transportmittel' },
    { Value: hotel,           Label: 'Hotel benötigt' }
  ],

  UI.SelectionFields: [ zielort, transportmittel ],

  UI.FieldGroup #Allgemein: {
    Data: [
      { Value: zielort },
      { Value: startdate },
      { Value: enddate },
      { Value: transportmittel },
      { Value: hotel },
      { Value: hinweise }
    ]
  },

  UI.FieldGroup #Flugdetails: {
    Data: [
      { Value: abflugort },
      { Value: abflugdatum },
      { Value: ankunftsort },
      { Value: ankunftsdatum },
      { Value: rueckflugort },
      { Value: rueckflugdatum }
    ]
  },

  UI.Facets: [
    { $Type: 'UI.ReferenceFacet', Label: 'Allgemein',     Target: '@UI.FieldGroup#Allgemein' },
    { $Type: 'UI.ReferenceFacet', Label: 'Flugdetails',   Target: '@UI.FieldGroup#Flugdetails' }
  ]
);