export interface Delivery {
    id : string ,
    originAddress :string,
    deliveryAddress : string,
    expectedArrivalDate : Date,
    owner : any,
    onRoad : boolean,
    onDestination : boolean,
  }
  