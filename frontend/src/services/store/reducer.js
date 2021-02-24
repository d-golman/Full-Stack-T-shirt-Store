const initialState = {
    products: null,
    error: false
}

const reducer = (state = initialState, action) =>{
    switch (action.type){

        case 'EDIT_PRODUCTS':
            return{
                ...state,
                products: action.payload
            }
        case 'SET_ERROR':
            return{
                ...state,
                error: action.payload
            }
        
        default:
            return state;
            
    }
}

export default reducer