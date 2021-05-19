export interface Demande {
    id : string ,
    owner : any,
    ownerName : string,
    ownerPhoto : string,
    ownerPhone : string,
    ownerEmail : string,
    originAddress :string,
    deliveryAddress : string,
    wantedArrivalDate : Date,
    item : string,
    itemShipped : boolean,
    itemDelivered : boolean,
    provider: any,
    listedProviders : any
  }
  