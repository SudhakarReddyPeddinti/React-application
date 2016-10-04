import * as types from '../constants/ActionTypes';
import api from '../api/api';



export function handleFilterUserInput(filteredAgent) {
    return {
        type: types.FILTER_AGENT, filteredAgent
    };
}

export function chartDataID(id) {
    return {
        type: types.CHART_DATA_ID,
        id
    };
}

export function selectedDealer(dealer) {
    return {
        type: types.DEALER,
        dealer
    };
}

export function receiveDealerData(dealerData) {
    return { type: types.DEALER_DATA, dealerData };
}

export function fetchDealerData() {
    return function (dispatch) {
        // let data = {
        //     "folder": "DealerAverages",
        //     "bucket": "vindatabucket",
        //     "type": "Dealer",
        //     "id": "5836"
        // };
        return api.getMSDealerData().then(
            function (response) {
                const dealerData = response.data;
                //console.log("AWS Dealer data",dealerData);
                dispatch(receiveDealerData(dealerData));
            });
    };
}

export function receiveCustomerData(customerData) {
    return {
        type: types.CUSTOMER_DATA, customerData
    }
}

export function fetchCustomerData() {
    return function (dispatch) {
        return api.getMSCustomerData().then(
            function (response) {
                const customerData = response.data;
                //console.log("AWS customer", customerData);
                dispatch(receiveCustomerData(customerData));
            }
        );
    };
}

export function receiveLeadData(leadData) {
    //console.log("Received Lead Data:");
    //console.log(leadData);
    return {
        type: types.LEAD_DATA, leadData
    }
}

export function fetchLeadData() {
    return function (dispatch) {
        return api.getMSLeadData().then(
            function (response) {
                const leadData = response.data;
                dispatch(receiveLeadData(leadData));
            }
        );
    };
}

export function fetchGlobalChartData() {
    return function (dispatch) {
        let RequestPayload = {
            "folder": "AllDealerDataStd"
        }
        return api.getAWSGlboalChartData(RequestPayload).then(
            (response) => {
                const globalChartData = response.data;
                console.log("AWS", globalChartData);
                dispatch(receiveGlobalChartData(globalChartData));
            }
        );
    };
}

export function receiveGlobalChartData(globalChartData) {
    return {
        type: types.GLOBAL_CHART_DATA, globalChartData
    }
}