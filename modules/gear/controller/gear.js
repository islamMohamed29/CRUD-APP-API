import { far3Model } from "../../../DB/model/far3.model.js";
import { sarfPaperModel } from "../../../DB/model/sarfPaperModel.model.js";
import asyncWrapper from "../../../middleware/asyncWrapper.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";

export const addFar3 = async (req, res) => {
  try {
    const { far3Name } = req.body;
    const newFar3 = new far3Model({
      far3Name,
    });
    const savedFar3 = await newFar3.save();
    res.json({ message: "Done", savedFar3 });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const allFar3 = async (req, res) => {
  const all = await far3Model.find({});
  res.json({ message: "Done", all });
};

export const deleteFar3 = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const far3 = await far3Model.deleteOne({ _id: id });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

export const updateFar3 = async (req, res) => {
  try {
    const { id } = req.params;
    const { far3Name } = req.body;
    const far3 = await far3Model.findOneAndUpdate(
      { _id: id },
      { far3Name },
      { new: true }
    );
    far3
      ? res.json({ message: "Done", far3 })
      : res.json({ message: "In-valid ID" });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const sarfPaper = async (req, res) => {
  try {
    const { numberSarf } = req.body;
    const newSarf = new sarfPaperModel({
      numberSarf,
    });
    const savedSarf = await newSarf.save();
    res.json({ message: "Done", savedSarf });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const allSarfPaper = async (req, res) => {
  const all = await sarfPaperModel.find({});
  res.json({ message: "Done", all });
};
