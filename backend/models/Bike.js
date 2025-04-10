import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  year: Number,
  mileage: Number,
  image: String,
  shortlisted: { type: Boolean, default: false },
});

const Bike = mongoose.model('Bike', bikeSchema);
export default Bike;
