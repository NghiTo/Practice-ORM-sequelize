import { User, Customer, Employee } from "../repositories/index.js";
import { AppError } from "../utils/errorHandle.js";

async function getEmployeeFromUser(username) {
  const user = await User.findOne({ where: { username } });
  return user.getEmployee();
}

async function getEmployeeNumbersInSameOffice(officeCode) {
  const employeesInSameOffice = await Employee.findAll({
    where: { officeCode },
    attributes: ["employeeNumber"],
  });
  return employeesInSameOffice.map((emp) => emp.employeeNumber);
}

async function checkRoleGetAll(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );
    const customers = await Customer.findAll({
      where: {
        salesRepEmployeeNumber: employeeNumbers,
      },
    });

    return res.json(customers);
  }

  if (employee.jobTitle === "Staff") {
    const customers = await Customer.findAll({
      where: {
        salesRepEmployeeNumber: employee.employeeNumber,
      },
    });

    return res.json(customers);
  }
}

async function checkRoleGetId(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return next(
      new AppError({
        message: "Customer is not found",
        statusCode: 404,
        errorCode: "NOT_FOUND",
      })
    );
  }

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );
    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "No access to this customer",
          statusCode: 403,
          errorCode: "ACCESS_DENIED",
        })
      );
    } else {
      return res.json(customer);
    }
  }

  if (employee.jobTitle === "Staff") {
    if (customer.salesRepEmployeeNumber !== employee.employeeNumber) {
      return next(
        new AppError({
          message: "No access to this customer",
          statusCode: 403,
          errorCode: "ACCESS_DENIED",
        })
      );
    } else {
      return next();
    }
  }
}

async function checkRoleCreate(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );

    const customer = req.body;
    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "Can not create customer with diferent employeeNumber",
          statusCode: 400,
          errorCode: "BAD_REQUEST",
        })
      );
    } else {
      return next();
    }
  }

  if (employee.jobTitle === "Staff") {
    const customer = req.body;
    if (customer.salesRepEmployeeNumber !== employee.employeeNumber) {
      return next(
        new AppError({
          message: "Can not create customer with diferent employeeNumber",
          statusCode: 400,
          errorCode: "BAD_REQUEST",
        })
      );
    } else {
      return next();
    }
  }
}

async function checkRoleUpdate(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return next(
      new AppError({
        message: "Customer is not found",
        statusCode: 404,
        errorCode: "NOT_FOUND",
      })
    );
  }

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );

    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "No access to this customer",
          statusCode: 403,
          errorCode: "ACCESS_DENIED",
        })
      );
    } else {
      return next();
    }
  }
}

async function checkRoleDelete(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);
  const customer = await Customer.findByPk(req.params.id);

  if (!customer) {
    return next(
      new AppError({
        message: "Customer is not found",
        statusCode: 404,
        errorCode: "NOT_FOUND",
      })
    );
  }

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );

    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "No access to this customer",
          statusCode: 403,
          errorCode: "ACCESS_DENIED",
        })
      );
    } else {
      return next();
    }
  }
}

export {
  checkRoleCreate,
  checkRoleDelete,
  checkRoleGetAll,
  checkRoleGetId,
  checkRoleUpdate,
};
