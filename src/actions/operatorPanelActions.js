import * as types from '../constants/ActionTypes';
import api from '../api/api';

export function handleDealerRespTimeData(dealerRespTime) {
    return {
        type: types.DEALER_RESP_DATA, dealerRespTime
    };
}

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

export function receiveDealerData(dealerData) {
    return { type: types.DEALER_DATA, dealerData };
}

export function fetchDealerData() {
    return function (dispatch) {
        console.log('Fetch Dealer data call made..');
        return api.getMSDealerData().then( function(response){
            console.log('Dealer data Response received..');
            const dealerData = response.data;
            console.log(dealerData);
            dispatch(receiveDealerData(dealerData));
        });
    };
}

export function receiveCustomerData(customerData){
    console.log("Received DealaerData:");
    console.log(customerData);
    return {
        type: types.CUSTOMER_DATA, customerData 
    }
}
export function fetchCustomerData(){
    return function(dispatch){
        return api.getMSCustomerData().then(
            function(response){
                const customerData = response.data;
                dispatch(receiveCustomerData(customerData));
            }
        );
    };
}
