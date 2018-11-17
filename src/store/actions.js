
export default{
    UserEmailLogin:({commit},data) => {
        commit("UserEmailLogin", data);
    },
    UserEmailLogout: ({commit}) => {
        commit("UserEmailLogout");
    }
}