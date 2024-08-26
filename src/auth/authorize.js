import { User } from "../repositories/index.js";
import { AppError } from "../utils/errorHandle.js";

const authorization = (resource, action) => {
  return async (req, res, next) => {
    const user = await User.findOne({
      where: { username: req.user.username },
    });

    const employee = await user.getEmployee();
    const jobTitle = employee.jobTitle;

    const permission = {
      President: {
        employees: ["Read", "Create", "Update", "Delete"],
        customers: ["Read", "Create", "Update", "Delete"],
      },
      Manage: {
        employees: ["Read", "Create", "Update"],
        customers: ["Read", "Create", "Update", "Delete"],
      },
      Leader: {
        employees: ["Read"],
        customers: ["Read", "Create", "Update", "Delete"],
      },
      Staff: {
        employees: [],
        customers: ["Read", "Create"],
      },
    };

    const allowActions = permission[jobTitle]?.[resource];

    if (allowActions.includes(action)) {
      next();
    } else {
      next(
        new AppError({
          message: "No permission to access this data",
          statusCode: 403,
          errorCode: "ACCESS_DENIED",
        })
      );
    }
  };
};

export default authorization;
