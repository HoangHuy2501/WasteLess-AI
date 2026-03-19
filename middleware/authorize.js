const ApiError = require("../utils/ApiError");
const { UserModel, Role, Permission } = require("../models/index");
module.exports = function authorize(requiredPermissions = []) {
  return async function (req, res, next) {
    try {
      const userID = req.params.id;
      if (!userID) {
        return next(ApiError.Unauthorized());
      }

      if (requiredPermissions.length === 0) {
        return next(); // Không yêu cầu quyền cụ thể → cho qua
      }

      // Lấy quyền của user từ DB
      const result = await UserModel.findByPk(id=userID, {
        include: [
          {
            model: Role,
            include: [{ model: Permission, attributes: ["name"] }],
          },
        ],
      });
      if (!result) {
        return next(ApiError.Unauthorized());
      }
      // lấy tất cả tên quyền
      const userPermissions = result.Role?.Permissions?.map(p => p.name) || []

      // Kiểm tra quyền
      const hasPermission = requiredPermissions.every((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasPermission) {
        return next(ApiError.Forbidden());
      }
      next();
    } catch (err) {
      console.error(err);
      return next(ApiError.Internal());
    }
  };
};
