export interface Parking {
  lat: { type: number; required: true };
  lon: { type: number; required: true };
  carModel: { type: string; required: true };
  carColor: { type: string; required: true };
  minutesToLeave?: number;
  expireAt?: { type: Date };
  localTime?: { type: string };
  licensePlate: { type: string; required: false };
  phoneNumber: { type: string; required: false };
  username: { type: string; required: true };
}
