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
            axios.post('https://4j9r3i1x9c.execute-api.us-east-1.amazonaws.com/dev/vindatabucket', dealerData),
            axios.post('https://4j9r3i1x9c.execute-api.us-east-1.amazonaws.com/dev/vindatabucket', userData)
        ]).then(
            axios.spread(function (dealerResponse, userResponse) {
                //... This callback will be executed only when both requests are complete.
                let response = {
                    "MinValue": dealerResponse.data.Minimum,
                    "MaxValue": dealerResponse.data.Maximum,
                    "Mean": dealerResponse.data.Mean,
                    "StandardDeviation": dealerResponse.data.StandardDeviation,
                    "DealerID": dealerResponse.data.Dealer,
                    "UserID": userResponse.data.User,
                    "UserAverage": userResponse.data.Average
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