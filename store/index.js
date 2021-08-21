export const state = () => ({
  snackbar: {},
  menus: [],
})

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = snackbar
  },
  SET_MENUS(state, menus) {
    state.menus = menus
  }
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true
    snackbar.color = snackbar.color || 'success'
    snackbar.timeout = snackbar.timeout || 6000

    commit('SET_SNACKBAR', snackbar)
  },
  setMenus({ state, commit }) {
    const menus = [
      {
          title: "Dashboard",
          items: [
              {
                  title: "Dashboard",
                  to: "/app/dashboard",
                  icon: "mdi-apps",
              },
          ],
      },
      {
          title: "User Management",
          items: [
              {
                  title: "Users",
                  to: "/app/user-management",
                  icon: "mdi-account-circle",
              },
              {
                  title: "Roles",
                  to: "/app/user-management/role",
                  icon: "mdi-key",
              },
          ],
      },
      {
          title: "General",
          items: [
              {
                  title: "Countries",
              },
              {
                  title: "Fiscal Year",
              },
              {
                  title: "Academic Year",
              },
              {
                  title: "Location",
                  to: "/app/location",
              },
          ],
      },
      {
          icon: "mdi-account-group",
          title: "Students",
          items: [
              {
                  title: "List",
                  to: "/app/students/list",
              },
          ],
      },
      {
          icon: "mdi-account-group",
          title: "Classes",
          items: [
              {
                  title: "Class",
                  to: "/app/classroom",
              },
          ],
      },
      {
          icon: "mdi-setting",
          title: "Setting",
          items: [
              {
                  title: "Settings",
                  to: "/app/settings",
              },
          ],
      },
  ];

  commit('SET_MENUS', menus)
  }
}