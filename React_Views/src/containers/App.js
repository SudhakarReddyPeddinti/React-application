// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import UserPanelApp from '../components/UserPanelApp';

class App extends React.Component {
  render() {
      return (
        <div>
            <UserPanelApp />
            {this.props.children}
        </div>);
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default App;