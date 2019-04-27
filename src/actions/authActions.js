import { AsyncStorage } from "react-native";

export const getToken = (token) => ({
    type: "GET_TOKEN",
    token,
});

export const saveToken = token => ({
    type: "SAVE_TOKEN",
    token
});

export const removeToken = () => ({
    type: "REMOVE_TOKEN",
});

export const loading = bool => ({
    // console.log('loading dispatching');
    type: "LOADING",
    isLoading: bool,
});

export const error = error => ({
    type: "ERROR",
    error,
});



export const getUserToken = () => dispatch =>

 AsyncStorage.getItem("userToken")
        .then((data) => {
            dispatch(loading(false));
            dispatch(getToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || "ERROR"));
        });


export const saveUserToken = (data, dispatch) => {
    console.log("save UserTOken", data);
     AsyncStorage.setItem("userToken", data)
             .then((d) => {
            console.log("saving token on action");
            dispatch(loading(false));
            dispatch(saveToken("token saved"));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || "ERROR"));
        });
};

export const _retrieveData = async (dispatch) => {
    console.log("_retrieveData");
    try {
        const value = await AsyncStorage.getItem("userToken");
        if (value !== null) {
            // We have data!!
            console.log(value);
            console.log(JSON.parse(value).email);
            dispatch(loading(false));
            dispatch(saveToken(value));
        }else{
            console.log('value on else', value);
            dispatch(loading(false));
            dispatch(saveToken({}));
        }
    } catch (error) {
        console.log(error);
        dispatch(loading(false));
        // Error retrieving data
    }
};

export const _removeUserToken = async (dispatch) =>  {
    console.log("_removeUser");

    try {
        await AsyncStorage.removeItem("userToken")
        .then((d)=> {
            console.log("removed");
            dispatch(loading(false));
            dispatch(saveToken({}));
        })
    } catch(error) {
        console.log("error");
        dispatch(loading(false));
    }
}


export const _storeData = async (data, dispatch) => {
    console.log("_storeData");
    try {
        await AsyncStorage.setItem("userToken", JSON.stringify(data)).
        then((d)=>{
            console.log("saved", d);
            dispatch(loading(false));
            // dispatch(saveToken(JSON.stringify(data)));
        });
    } catch (error) {
        console.log("error");
        dispatch(loading(false));
    }
};

// export const saveUserToken = (data) => dispatch => {
//     console.log('saveUserToekn action');
//     return AsyncStorage.setItem("userToken", "abc")
//         .then((data) => {
//             console.log('saving token on action');
//             dispatch(loading(false));
//             dispatch(saveToken("token saved"));
//         })
//         .catch((err) => {
//             dispatch(loading(false));
//             dispatch(error(err.message || "ERROR"));
//         })
// }
export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem("userToken")
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || "ERROR"));
        });
