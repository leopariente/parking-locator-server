export interface Parking {
    lat: { type: Number; required: true };
    lon: { type: Number; required: true };
    carModel: { type: String; required: true };
    carColor: { type: String; required: true };
    minutesToLeave?: Number,
    expireAt?: { type: Date };
    localTime?: { type: String };
    licensePlate: { type: String; required: false };
    phoneNumber: { type: String; required: false };
    username: { type: String; required: true }
  }

  export interface User {
    username: { type: String; required: true };
    password: { type: String; required: true };
  }