
export default function AdminReducer (state,action) {
    switch(action.type){
        case 'SET_USERS' : {
            return {...state , users : action.payload}
        }
        case 'ADD_USER' : {
            return {...state , users : [...state.users , action.payload]}
        }
        case 'REMOVE_USER' : {
            return {...state , users : state.users.filter(ele => ele._id !== action.payload.data._id)}
        }
        case 'UPDATE_ROLE' : {
            return {...state , users : state.users.filter(ele=>ele._id !== action.payload.user._id) , agents : [...state.agents , action.payload.user]}
        }
        case 'SET_AGENTS' : {
            return {...state , agents : action.payload}
        }
        case 'ADD_AGENT' : {
            return {...state , agents : [...state.agents , action.payload]}
        }
        case 'REMOVE_AGENT' : {
            return {...state , agents : state.agents.filter(ele=> ele._id !== action.payload.data._id)}
        }
        case 'SET_PROMPTS' : {
            return {...state , prompts : action.payload}
        }
        case 'ADD_PROMPTS' : {
            return {...state , prompts : [...state.prompts , action.payload]}
        }
        case 'REMOVE_PROMPT' : {
            return {...state , prompts :  state.prompts.filter(ele => ele._id !== action.payload._id)}
        }case 'UPDATE_PROMPT' : {
            return {...state , prompts : state.prompts.map((ele)=>{
                if(ele._id == action.payload._id){
                    return {...action.payload}
                }else{
                   return {...ele}
                }
            }) }
        }
    }
}