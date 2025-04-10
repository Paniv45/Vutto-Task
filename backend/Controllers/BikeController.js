import Bike from "../models/Bike.js";

export const GetAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const AddBike = async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const DeleteBike = async (req, res) => {
  try {
    const result = await Bike.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Bike not found" });
    res.status(200).json({ message: "Bike deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const UpdateBike = async (req, res) => {
  try {
    const updatedBike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBike)
      return res.status(404).json({ message: "Bike not found" });
    res.status(200).json(updatedBike);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const GetSingleBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.status(200).json(bike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const ShortlistedBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });

    bike.shortlisted = !bike.shortlisted;
    await bike.save();

    res.status(200).json({ message: "Shortlist status updated", bike });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
