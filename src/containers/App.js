// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import UserPanelApp from '../components/UserPanelApp';

class App extends React.Component {
  render() {
    console.log("Loc:App render:");
      return (
        <div>
            <UserPanelApp />
            {this.props.children}
        </div>);
  }
}

export default App;


