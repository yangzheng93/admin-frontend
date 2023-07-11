// import { defineStore } from "pinia";
// import { API_GET_PERMISSIONS } from "@services/permission";
// import { API_GET_ROLE_OF_PERMISSIONS } from "@services/role-permission";
// import { useUserStore } from "@stores/user";

// export const usePermissionStore = defineStore("PermissionStore", {
//   id: "Permissions",
//   state: () => ({
//     permissions: [],
//     roleOfPermissions: [],
//   }),
//   getters: {
//     myPermissions(state) {
//       const userStore = useUserStore();
//       const allRoleIds = userStore?.user?.roles?.ids || [];
//       const allPermissionIds = state.roleOfPermissions.reduce((a, b) => {
//         return allRoleIds.includes(b.role_id) ? a.concat(b.permission_id) : a;
//       }, []);
//       return state.permissions.filter((i) => allPermissionIds.includes(i.id));
//     },
//   },
//   actions: {
//     async fetchPermissions() {
//       this.permissions = await API_GET_PERMISSIONS();
//     },
//     async fethcRoleOfPermissions() {
//       this.roleOfPermissions = await API_GET_ROLE_OF_PERMISSIONS();
//     },
//   },
// });
