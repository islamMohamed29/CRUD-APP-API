import { categoryModel } from "../../../DB/model/category.modal.js";
import { mokatbatModel } from "../../../DB/model/mokatbat.model.js";
import asyncWrapper from "../../../middleware/asyncWrapper.js";
import { paginate } from "../../../services/pagination.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";

export const addMokatba = asyncWrapper(async (req, res, next) => {
  const { type, regNum, entity, subject, category, savedFile } = req.body;

  const newMokatba = new mokatbatModel({
    type,
    regNum,
    entity,
    subject,
    category,
    savedFile,
  });
  const savedMokatba = await newMokatba.save();
  res.json({ message: "Done", savedMokatba });
});

export const getMokatbaByID = async (req, res) => {
  const { id } = req.params;
  const mokatba = await mokatbatModel.findOne({ _id: id });
  res.json({ message: "Mokatba Module", mokatba });
};
export const allMokatbat = asyncWrapper(async (req, res) => {
  const { page = "1", size } = req.query;
  const { limit, skip } = paginate(page, size);

  let all = await mokatbatModel.aggregate([
    {
      $match: {},
    },
    {
      $facet: {
        metaData: [
          {
            $count: "totalDocuments",
          },
          {
            $addFields: {
              counter: skip,
              pageNumber: page,
              totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } },
            },
          },
        ],
        data: [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],
        fullData: [
          {
            $skip: skip,
          },
        ],
      },
    },
  ]);
  all = all[0];
  all.metaData = { ...all.metaData[0], count: all.data.length };

  return res.json({ message: "Mokatbat Module", all });
});

export const updateMokatbat = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, regNum, entity, subject, category, savedFile } = req.body;
    const mokatba = await mokatbatModel.findOneAndUpdate(
      { _id: id },
      { type, regNum, entity, subject, category, savedFile },
      { new: true }
    );
    mokatba
      ? res.json({ message: "Done", mokatba })
      : res.json({ message: "In-valid ID" });
  } catch (error) {
    res.json({ message: "regNum is n.t a number", error });
  }
};

export const deletaMokatbat = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const mokatba = await mokatbatModel.deleteOne({ _id: id });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

export const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const newCategory = new categoryModel({
      categoryName,
    });
    const savedCategory = await newCategory.save();
    res.json({ message: "Done", savedCategory });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const allCategory = async (req, res) => {
  const allcategorys = await categoryModel.find({});
  res.json({ message: "Done", allcategorys });
};
export const deleteCategory = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.deleteOne({ _id: id });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const category = await categoryModel.findOneAndUpdate(
      { _id: id },
      { categoryName },
      { new: true }
    );
    category
      ? res.json({ message: "Done", category })
      : res.json({ message: "In-valid ID" });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
