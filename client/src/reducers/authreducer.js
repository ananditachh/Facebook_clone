/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isAuthenticated:false,
    user:{}
}

export default function (state=initialState,action){
    switch(action.type){
        default:
            return state
    }
}