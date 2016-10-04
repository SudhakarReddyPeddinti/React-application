// this is a Toolbar reducer
import {DEALER_DATA, GLOBAL_CHART_DATA, CUSTOMER_DATA, CHART_DATA_ID, FILTER_AGENT, DEALER_RESP_DATA, LEAD_DATA, DEALER} from '../constants/ActionTypes';      
import {ENV_DEV} from '../constants/EnvironmentTypes';
import objectAssign from 'object-assign';
import {EditorState} from 'draft-js';

const initialState = {
    filteredAgent: '',
    chartDataID: 0,
    globalChartData: '',
    selectedDealer: 0,
    dealerRespTime: null,
    leadData: []
};

export default function toolbarAppState(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_CHART_DATA:
            return objectAssign({}, state, { globalChartData: action.globalChartData });
        case DEALER_DATA:
            return objectAssign({}, state, { dealerData: action.dealerData, selectedDealer: action.dealerData[0]});
        case CUSTOMER_DATA:
            return objectAssign({}, state, { customerData: action.customerData });
        case CHART_DATA_ID:
            return objectAssign({}, state, { chartDataID: action.id });
        case DEALER:
            return objectAssign({}, state, { selectedDealer: action.dealer });
        case FILTER_AGENT:
            return objectAssign({}, state, { filteredAgent: action.filteredAgent });
        case DEALER_RESP_DATA:
            return objectAssign({}, state, { dealerRespTime: action.dealerRespTime });
        case LEAD_DATA:
            return objectAssign({}, state, {leadData: action.leadData});
       default:
            return state;
    }
}