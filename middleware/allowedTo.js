import appError from "../utils/appError.js";

export default (...roles) => {
  // console.log("roles",roles)
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create("this role is n.t authorized", 401));
    }
    next();
  };
};
