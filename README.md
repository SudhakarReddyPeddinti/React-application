# Vin React Starter Kit
React is a lightweight library, so to build real apps, you need more. This starter kit provides a comprehensive framework for building fast, testable applications with React. It offers a rich development experience including:

| **Tech** | **Description** |**Learn More**|
|----------|-------|---|
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components    |[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) [Pluralsight Courses](https://www.pluralsight.com/search?q=react&categories=course)  |
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable stores. Useful on larger apps with complex data flows. Alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).| [Tutorial Video](https://egghead.io/series/getting-started-with-redux) [Code-based tutorial](https://github.com/happypoulp/redux-tutorial)   |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today     | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](http://www.pluralsight.com/courses/javascript-fundamentals-es6)    |
| [Webpack](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Supports hot reloading. | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals)|
| [BrowserSync](http://www.browsersync.com) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. | [Intro vid](https://www.youtube.com/watch?time_continue=1&v=heNWfzc7ufQ)|
| [Mocha](http://mochajs.org) | Automated tests with [Chai](http://chaijs.com/) for assertions and [Cheerio](https://www.npmjs.com/package/cheerio) for DOM testing without a browser using Node. | [Pluralsight Course](https://www.pluralsight.com/courses/testing-javascript) |
|[TrackJS](http://www.trackjs.com) | JavaScript error tracking. Reports available at TrackJS.com. See Cory for credentials | |  
|[Istanbul](https://github.com/gotwarlost/istanbul) | Code coverage data | | | 
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. | |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. | [Pluralsight Course](https://www.pluralsight.com/courses/better-css)|
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). | [IDE Plugins](http://editorconfig.org/#download) |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | [Pluralsight course](https://www.pluralsight.com/courses/npm-build-tool-introduction) [Why not Gulp?](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n)  |

The starter kit includes a working example app that puts all of the above to use.

## Get Started
 1. **Initial Machine Setup**  
First time running the starter kit? Then complete the [Initial Machine Setup](https://github.com/coryhouse/vin-javascript-starter-kit#initial-machine-setup).
 2. **Clone the project**  
Open the command line of your choice and change to the directory where you'd like to start your project. Then clone the project: `git clone https://github.com/coryhouse/vin-react-starter-kit.git your-project-name`.  
 3. **Change directory**  
`cd your-project-name`. - Change directories into your project's root directory (the project name you chose in step 2):
 4. **Install Node packages**   
`npm install`
 5. **Run the example app**  
`npm start`
This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this kit, you'll want to keep the command line open at all times so that your code is rebuilt and tests run automatically every time you hit save. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.
 6. **Review the example app.** This starter kit includes a working example app that calculates fuel savings. Note how all source code is placed under /src. Tests are placed alongside the file under test. The final built app is placed under /dist. These are the files you run in production.
 7. **Delete the example app files.** Once you're comfortable with how the example app works, you can [delete those files and begin creating your own app](https://github.com/coryhouse/vin-javascript-starter-kit#i-just-want-an-empty-starter-kit). You can always refer to this repo for the example app code that you deleted.
 8. **Plop these files inside your .NET solution.** - However, important note: **DO NOT** add node_modules to your solution. Just like Nuget, these files shouldn't be checked in. 
 9. **[Enable CORS on the APIs](https://github.com/coryhouse/vin-react-starter-kit#how-do-i-call-our-existing-web-apis) you need to call** 

##Initial Machine Setup
 1. **Install [the newest version of Node.js](https://nodejs.org)**
 2. **Install the newest version of [Git](https://git-scm.com/downloads)**.  The recommended defaults are fine.
 3. **Install [Python 2.7](https://www.python.org/downloads/)**. Browser-sync (and various other Node modules) rely on node-gyp, which requires Python on Windows.  
 4. **Install C++ Compiler**. Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).
 5. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome. (Optional, but helpful)
 6. **Configure your Editor for React**. [Install the appropriate plugin](https://github.com/facebook/react/wiki/Complementary-Tools#jsx-integrations) and [configure your editor](https://github.com/kriasoft/react-starter-kit/blob/master/docs/how-to-configure-text-editors.md).
 7. **Add two lines to your [Windows hosts file](https://www.rackspace.com/knowledge_center/article/modify-your-hosts-file)** for motosnap.com: 
```
127.0.0.1 motosnap.com
127.0.0.1 www.motosnap.com
```
The api configuration example (in /src/api/api.js) assumes that you're running VinConnect and its APIs locally at motosnap.com, so these host entries make sure cross origin calls like this succeed: `motosnap.com/CarDashboard/API/CRMServiceBase/v1/customers/attachments/list?customerId=212746634`

## Questions?
Check out the [FAQ](/docs/FAQ.md)
