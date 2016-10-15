import * as types from '../constants/ActionTypes';
import api from '../api/api';

export function handleFilterUserInput(filteredAgent) {
    return {
        type: types.FILTER_AGENT, filteredAgent
    };
}

export function selectedAgent(dealer) {
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
        return api.getMSDealerData().then(
            function (response) {
                const dealerData = response.data;
                dispatch(receiveDealerData(dealerData));
            });
    };
}

export function receiveLeadData(leadData) {
    return {
        type: types.LEAD_DATA, leadData
    };
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
        };
        return api.getAWSGlboalChartData(RequestPayload).then(
            (response) => {
                const globalChartData = response.data;
                dispatch(receiveGlobalChartData(globalChartData));
            }
        );
    };
}

export function receiveGlobalChartData(globalChartData) {
    return {
        type: types.GLOBAL_CHART_DATA, globalChartData
    };
}

export function receiveDealerAvg(dealerAvgData) {
    return {
        type: types.DEALER_AVG,
        dealerAvgData
    };
}

export function fetchDealerAvgData(dealerID) {
    return function (dispatch) {
        let RequestPayload = {
            "folder": "DealerAverages",
            "dealerID": dealerID.toString()
        };
        return api.getAWSDealerAvgData(RequestPayload).then(
            (response) => {
                const dealerAvgData = response.data;
                dispatch(receiveDealerAvg(dealerAvgData));
            }
        );
    };
}