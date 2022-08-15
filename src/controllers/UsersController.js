import UserRoles from "supertokens-node/recipe/userroles";

export default class UsersController {
  async createRole() {
    const admin = await UserRoles.createNewRoleOrAddPermissions(
      "admin",
      ["read"],
      ["write"]
    );
    const user = await UserRoles.createNewRoleOrAddPermissions("user", [
      "read",
    ]);

    if (response.createdNewRole === false) {
      // The role already exists
    }
  }
  async addRoleToUser(userId) {
    const response = await UserRoles.addRoleToUser(userId, "user");

    if (response.status === "UNKNOWN_ROLE_ERROR") {
      // No such role exists
      return;
    }

    if (response.didUserAlreadyHaveRole === true) {
      // The user already had the role
    }
  }

  async removeRoleFromUser(userId) {
    const response = await UserRoles.removeUserRole(userId, "user");

    if (response.status === "UNKNOWN_ROLE_ERROR") {
      // No such role exists
      return;
    }

    if (response.didUserHaveRole === false) {
      // The user was never assigned the role
    }
  }

  async getRolesForUser(userId) {
    const response = await UserRoles.getRolesForUser(userId);
    const roles = response.roles;
  }

  async getUsersThatHaveRole(role) {
    const response = await UserRoles.getUsersThatHaveRole(role);

    if (response.status === "UNKNOWN_ROLE_ERROR") {
      // No such role exists
      return;
    }

    const users = response.users;
  }
}
