import { copyinModal } from "../../../DB/model/copyin.modal.js";
import { copyoutModal } from "../../../DB/model/copyout.modal.js";
import asyncWrapper from "../../../middleware/asyncWrapper.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";

export const allCopyin = async (req, res) => {
  const allCopysin = await copyinModal.find({});
  res.json({ message: "Done", allCopysin });
};

export const addCopyout = async (req, res) => {
  try {
    const {
      storage,
      entityIn,
      entityOut,
      subject,
      reciver,
      sendar,
      owner,
      password,
    } = req.body;
    const newCopyout = new copyoutModal({
      storage,
      entityIn,
      entityOut,
      subject,
      reciver,
      sendar,
      owner,
      password,
    });
    const savedCopyout = await newCopyout.save();
    res.json({ message: "Done", savedCopyout });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const allCopyout = async (req, res) => {
  const allCopysout = await copyoutModal.find({});
  res.json({ message: "Done", allCopysout });
};

// Copy IN

export const addCopyin = async (req, res) => {
  try {
    const { storage, far3, entityOut, subject, reciver, writer } = req.body;
    const newCopyin = new copyinModal({
      storage,
      far3,
      entityOut,
      subject,
      reciver,
      writer,
    });
    const savedCopyin = await newCopyin.save();
    res.json({ message: "Done", savedCopyin });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const deleteCopyin = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const copyIn = await copyinModal.deleteOne({ _id: id });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});
export const deleteCopyout = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const copyOut = await copyoutModal.deleteOne({ _id: id });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

export const updateCopyin = async (req, res) => {
  try {
    const { id } = req.params;
    const { storage, far3, entityOut, subject, reciver, writer } = req.body;
    const copyIn = await copyinModal.findOneAndUpdate(
      { _id: id },
      { storage, far3, entityOut, subject, reciver, writer },
      { new: true }
    );
    copyIn
      ? res.json({ message: "Done", copyIn })
      : res.json({ message: "In-valid ID" });
  } catch (error) {
    res.json({ message: "Catch Error", error });
  }
};

export const updateCopyout = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      storage,
      entityIn,
      entityOut,
      subject,
      reciver,
      sendar,
      owner,
      password,
    } = req.body;
    const copyOut = await copyoutModal.findOneAndUpdate(
      { _id: id },
      {
        storage,
        entityIn,
        entityOut,
        subject,
        reciver,
        sendar,
        owner,
        password,
      },
      { new: true }
    );
    copyOut
      ? res.json({ message: "Done", copyOut })
      : res.json({ message: "In-valid ID" });
  } catch (error) {
    res.json({ message: "Catch Error", error });
  }
};
