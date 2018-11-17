

const mutations = {
    UserEmailLogin:(state, data) => {
        localStorage.setItem('userEmail',data);
        state.userEmail = data;
    },
    UserEmailLogout:(state) => {
        localStorage.removeItem('userEmail');
        state.userEmail = '';
    }
}
export default  mutations