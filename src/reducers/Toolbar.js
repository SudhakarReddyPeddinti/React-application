// this is a Toolbar reducer
import {DEALER_DATA, CUSTOMER_DATA, CHART_DATA_ID, FILTER_AGENT, DEALER_RESP_DATA} from '../constants/ActionTypes';      
import {ENV_DEV} from '../constants/EnvironmentTypes';  
import objectAssign from 'object-assign';
import {EditorState} from 'draft-js';

const initialState = {
    filteredAgent: '',
    chartDataID: null,
    dealerRespTime: null
};

export default function toolbarAppState(state = initialState, action) {
    switch (action.type) {        
        case DEALER_DATA:                
            return objectAssign({}, state, {dealerData: action.dealerData});
        case CUSTOMER_DATA:
            return objectAssign({}, state, {customerData: action.customerData});
        case CHART_DATA_ID:
            return objectAssign({}, state, {chartDataID: action.id}); 
        case FILTER_AGENT:
            return objectAssign({}, state, {filteredAgent: action.filteredAgent});
        case DEALER_RESP_DATA:
            return objectAssign({}, state, {dealerRespTime: action.dealerRespTime});
        default:
            return state;
    }
}