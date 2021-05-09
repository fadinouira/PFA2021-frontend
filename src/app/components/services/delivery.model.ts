export interface Delivery {
    id : string ,
    ownerName : string,
    ownerPhoto : string,
    ownerPhone : string,
    ownerEmail : string,
    originAddress :string,
    deliveryAddress : string,
    departDate : Date,
    expectedArrivalDate : Date,
    owner : any,
    onRoad : boolean,
    onDestination : boolean,
    acceptedItems : any ,
    listedItems : any ,
  }
  