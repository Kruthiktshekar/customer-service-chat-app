export default function AuthReducer (state , action) {
    switch(action.type){
        case 'LOGIN' : {
            return {...state, isLoggedIn:true , user : action.payload}
        }
        case 'UPDATE_USER' : {
            return{...state , user : action.payload}
        }
    }
}