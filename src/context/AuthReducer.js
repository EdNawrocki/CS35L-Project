// SEE '../pages/login.js' AND '../pages/logout.js' AND '../App.js' FOR EXAMPLE USES

// This reducer allows changes to global storage of the user. It works in conjunction with './AuthContext.js'
// This is just plumbing for AuthContext; you probably shouldn't be here!

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                currentUser: action.payload,
            };
        }
        case "LOGOUT": {
            return {
                currentUser: null,
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;