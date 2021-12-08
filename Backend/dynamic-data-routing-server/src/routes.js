import express from "express";

const router = express.Router();

router.get("/liveness", async (req, res, next) => {
  res.status(200).json({});
});

export default router;
