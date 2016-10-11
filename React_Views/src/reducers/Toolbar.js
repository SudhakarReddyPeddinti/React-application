// this is a Toolbar reducer
import {DEALER_DATA, DEALER_AVG, DEALER_SPC_DATA, GLOBAL_CHART_DATA, FILTER_AGENT, LEAD_DATA, DEALER} from '../constants/ActionTypes';
import {ENV_DEV} from '../constants/EnvironmentTypes';
import objectAssign from 'object-assign';
import {EditorState} from 'draft-js';

const initialState = {
    filteredAgent: '',
    // chartDataID: 0,
    dealerAvgData: {},
    globalChartData: {},
    selectedAgent: {},
    dealerSpecificGraph: {},
    leadData: []
};

export default function toolbarAppState(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_CHART_DATA:
            return objectAssign({}, state, { globalChartData: action.globalChartData });
        case DEALER_AVG:
            return objectAssign({}, state, { dealerAvgData: action.dealerAvgData });
        case DEALER_DATA:
            return objectAssign({}, state, { dealerData: action.dealerData, selectedAgent: action.dealerData[0] });
        // case CUSTOMER_DATA:
        //     return objectAssign({}, state, { customerData: action.customerData });
        // case CHART_DATA_ID:
        //     return objectAssign({}, state, { chartDataID: action.id });
        case DEALER:
            return objectAssign({}, state, { selectedAgent: action.dealer });
        case FILTER_AGENT:
            return objectAssign({}, state, { filteredAgent: action.filteredAgent });
        // case DEALER_RESP_DATA:
        //     return objectAssign({}, state, { dealerRespTime: action.dealerRespTime });
        case LEAD_DATA:
            return objectAssign({}, state, { leadData: action.leadData });
        case DEALER_SPC_DATA:
            return objectAssign({}, state, { dealerSpecificGraph: action.DealerSpecificData });
        default:
            return state;
    }
}