import * as types from '../constants/ActionTypes';
import axios from 'axios';
import api from '../api/api';

export function fetchDealerSpecificData(userID, dealerID) {
    return function (dispatch) {
        let dealerData = {
            "folder": "DealerSpecificData",
            "bucket": "vindatabucket",
            "dealerID": dealerID.toString(),
            "userID": userID.toString()
        };
        let userData = {
            "folder": "UserAverages",
            "bucket": "vindatabucket",
            "dealerID": dealerID.toString(),
            "userID": userID.toString()
        };
        return axios.all([
            // axios.post('https://4j9r3i1x9c.execute-api.us-east-1.amazonaws.com/dev/vindatabucket', dealerData),
            // axios.post('https://4j9r3i1x9c.execute-api.us-east-1.amazonaws.com/dev/vindatabucket', userData)
            axios.post('http://localhost:8080/JAX-RS/rest/DealerSpecificData/data', dealerData),
            axios.post('http://localhost:8080/JAX-RS/rest/UserAverages/data', userData)
        ]).then(
            axios.spread(function (dealerResponse, userResponse) {
                //... This callback will be executed only when both requests are complete.
                let response = {
                    "MinValue": Number((dealerResponse.data.Minimum).toFixed(2)),
                    "MaxValue": Number((dealerResponse.data.Maximum).toFixed(2)),
                    "Mean": Number((dealerResponse.data.Mean).toFixed(2)),
                    "StandardDeviation": Number((dealerResponse.data.StandardDeviation).toFixed(2)),
                    "DealerID": Number((dealerResponse.data.Dealer).toFixed(2)),
                    "UserID": Number((userResponse.data.User).toFixed(2)),
                    "UserAverage": Number((userResponse.data.Average).toFixed(2))
                };
                dispatch(receiveDealerSpecificData(response));
            }));
    };
}

export function receiveDealerSpecificData(DealerSpecificData) {
    return {
        type: types.DEALER_SPC_DATA,
        DealerSpecificData
    };
}

// export function fetchGlobalChartDataAndAvg(dealerID) {
//     return function (dispatch) {
//         let globalData = {
//             "folder": "AllDealerDataStd",
//             "bucket": "vindatabucket"
//         };
//         let dealerData = {
//             "folder": "DealerAverages",
//             "bucket": "vindatabucket",
//             "dealerID": dealerID.toString()
//         };
//         return axios.all([
//             axios.post('https://4j9r3i1x9c.execute-api.us-east-1.amazonaws.com/dev/vindatabucket', globalData),
//             axios.post('https://4j9r3i1x9c.execute-api.us-east-1.amazonaws.com/dev/vindatabucket', dealerData)
//         ]).then(
//             axios.spread(function (globalDataResponse, dealerDataResponse) {
//                 //... This callback will be executed only when both requests are complete.
//                 let response = {
//                     "MinValue": globalDataResponse.data.MinValue,
//                     "MaxValue": globalDataResponse.data.MaxValue,
//                     "Mean": globalDataResponse.data.Mean,
//                     "StandardDeviation": globalDataResponse.data.StandardDeviation,
//                     "DealerID": dealerDataResponse.data.Dealer,
//                     "DealerAverage": dealerDataResponse.data.Average
//                 };
//                 dispatch(receiveGlobalChartData(response));
//             }));
//     };
// }

// export function receiveGlobalChartData(globalChartData) {
//     return {
//         type: types.GLOBAL_CHART_DATA,
//         globalChartData
//     };
// }