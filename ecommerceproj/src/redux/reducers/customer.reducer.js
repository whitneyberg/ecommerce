let customerState = {};

function customerInfo( state = customerState, action ){
    switch( action.type ) {
        case "UPDATE_CUSTOMER":
            return Object.assign( action.payload );

        default:
        return state;
    }
}

export default customerInfo;