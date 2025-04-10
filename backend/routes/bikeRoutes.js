import express from "express";
import {
  AddBike,
  GetAllBikes,
  DeleteBike,
  UpdateBike,
  GetSingleBike,
  ShortlistedBike
} from "../Controllers/BikeController.js";

const router = express.Router();

router.post("/addbike", AddBike);
router.get("/getbikes", GetAllBikes);
router.delete("/deletebike/:id", DeleteBike);
router.put("/updatebike/:id", UpdateBike);
router.get("/getbike/:id", GetSingleBike);
router.put("/shortlist/:id", ShortlistedBike);

export default router;
