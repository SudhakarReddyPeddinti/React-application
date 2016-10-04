import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS, REQUEST_CUSTOMERS, RECEIVE_CUSTOMERS} from '../constants/ActionTypes';
import objectAssign from 'object-assign';
import calculator from '../businessLogic/fuelSavingsCalculator';
import dateHelper from '../businessLogic/dateHelper';

const initialState = {
  newMpg: null,
  tradeMpg: null,
  newPpg: null,
  tradePpg: null,
  milesDriven: null,
  milesDrivenTimeframe: 'week',
  displayResults: false,
  dateModified: null,
  necessaryDataIsProvidedToCalculateSavings: false,
  ajaxCallInProgress: false,
  customers: [],
  savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
  }
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
// This function is wired up in with the top level component in /containers.App.js
export default function operatorPanelAppState(state = initialState, action) {
	switch (action.type) {
		case SAVE_FUEL_SAVINGS:
			//in a real app we'd trigger an AJAX call here. For this example, just simulating a save by changing date modified.
			return objectAssign({}, state, { dateModified: dateHelper.getFormattedDateTime(new Date()) });

		case CALCULATE_FUEL_SAVINGS:
    { //added block to make ESLint no-case-declarations happy.
      let newState = objectAssign({}, state);
      newState[action.fieldName] = action.value;
      let calc = calculator();
      newState.necessaryDataIsProvidedToCalculateSavings = calc.necessaryDataIsProvidedToCalculateSavings(newState);
      newState.dateModified = dateHelper.getFormattedDateTime(new Date());

      if (newState.necessaryDataIsProvidedToCalculateSavings) {
        newState.savings = calc.calculateSavings(newState);
      }

      return newState;
    }
    case REQUEST_CUSTOMERS:
      return objectAssign({}, state, { ajaxCallInProgress: true });

    case RECEIVE_CUSTOMERS:
      return objectAssign({}, state, { ajaxCallInProgress: false, customers: action.customers } );

		default:
			return state;
	}
}
