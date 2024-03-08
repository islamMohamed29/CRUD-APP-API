import { paperModel } from "../../../DB/model/paper.model.js";

export const addPaper = async (req, res) => {
  try {
    const { type, count, far3, reciver } = req.body;
    const newPaper = new paperModel({
      type,
      count,
      far3,
      reciver,
    });
    const savedPaper = await newPaper.save();
    res.json({ message: "Done", savedPaper });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const allPaper = async (req, res) => {
  const allPapers = await paperModel.find({});
  res.json({ message: "Paper Module", allPapers });
};

export const deletaPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const paper = await paperModel.deleteOne({ _id: id });
    paper
      ? res.json({ message: "Done", paper })
      : res.json({ message: "in-valid ID" });
  } catch (error) {
    res.json({ message: "here is error", error });
  }
};
export const updatePaper = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, count, far3, reciver } = req.body;
    const paper = await paperModel.findOneAndUpdate(
      { _id: id },
      { type, count, far3, reciver },
      { new: true }
    );
    paper
      ? res.json({ message: "Done", paper })
      : res.json({ message: "In-valid ID" });
  } catch (error) {
    res.json({ message: "Catch Error", error });
  }
};

export const getLast = async (req, res) => {
  let data = await paperModel.aggregate([
    { $sort: { item: 1, date: 1 } },
    {
      $group: {
        _id: "$far3",
        lastAdd: { $last: "$updatedAt" },
      },
    },
  ]);
  res.json({ message: "Done", data });
};
export const totalty = async (req, res) => {
  let data = await paperModel.aggregate([
    {
      $match: {},
    },
    { $sort: { item: 1, date: 1 } },
    {
      $group: {
        _id: "$far3",
        total: { $sum: "$count" },
        lastAdd: { $last: "$updatedAt" },
      },
    },

    // {$match:{}},
    // {$group:{_id:"$far3",total:{$sum:"$count"}}}
  ]);

  res.json({ message: "Total Count", data });
};
