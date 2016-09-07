##FAQ
###Why does this exist?
This starter kit implements best practices like testing, minification, bundling, and so on. It codifies a long list of decisions that you no longer have to make to get rolling. It also saves you from the long, painful process of wiring it all together into an automated dev environment.

###What command line should I use?
This kit works on both the Windows DOS command line or in Git Bash on Windows. Git Bash is installed along with Git. 

###How do I keep my app updated with the latest features of the starter kit?
Be sure to clone this repo to get started. Then, anytime you want to get the latest version of this repo, type `git pull` on the command line in the root of your project. This will merge in all updates.

###Can you explain the folder structure?
**Note that the files that start with a dot below will be hidden by default in Windows.** [Here's how to see them](http://windows.microsoft.com/en-us/windows/show-hidden-files#show-hidden-files=windows-7). Or type `ls -la` in Git Bash.
```
.
├── .babelrc                  # Configures Babel
├── .editorconfig             # Configures editor rules
├── .eslintrc                 # Configures ESLint
├── .gitignore                # Tells git which files to ignore
├── .npmrc                    # Configures npm to save exact by default
├── README.md                 # This file.
├── dist                      # Folder where the build script places the built app. Use this in prod.
├── package.json              # Package configuration. The list of 3rd party libraries and utilities
├── src                       # Source code
│   ├── actions               # Flux/Redux actions. List of distinct actions that can occur in the app.  
│   ├── api                   # Centralized place to make AJAX calls. Includes example call. 
│   ├── businessLogic         # Plain old JS objects (POJOs). Pure logic. No framework specific code here.
│   ├── components            # React components
│   ├── constants             # Application constants including constants for Redux
│   ├── containers            # App container for Redux
│   ├── favicon.ico           # favicon to keep your browser from throwing a 404 during dev. Not actually used in prod build.
│   ├── index.html            # Start page 
│   ├── index.js              # Entry point for your app
│   ├── reducers              # Redux reducers. Your state is altered here based on actions
│   ├── store                 # Redux store configuration
│   └── styles                # CSS Styles, typically written in Sass
├── tools                     # Node scripts that run build related tools
│   ├── build.js              # Runs the production build
│   ├── buildHtml.js          # Builds index.html
│   ├── distServer.js         # Starts webserver and opens final built app that's in dist in your default browser
│   ├── srcServer.js          # Starts dev webserver with hot reloading and opens your app in your default browser
└── webpack.config.js         # Configures webpack
```

### What are the dependencies in package.json used for?
| **Dependency** | **Use** |
|----------|-------|
|connect-history-api-fallback  | Support reloading deep links |
|object-assign | Polyfill for Object.assign |
|react|React library |
|react-dom|React library for DOM rendering |
|react-redux|Redux library for connecting React components to Redux |
|react-router|React library for routing |
|redux|Library for unidirectional data flows |
|babel-cli|Babel Command line interface |
|babel-core|Babel Core for transpiling the new JavaScript to old |
|babel-eslint|Connects Babel and ESLint so ES6 code can be linted |
|babel-loader|Adds Babel support to Webpack |
|babel-plugin-react-display-name| Add displayName to React.createClass calls |
|babel-plugin-react-transform| Add support for transforming React code to Babel |
|babel-preset-es2015|Babel preset for ES2015|
|babel-preset-react| Add JSX support to Babel |
|babel-preset-stage-1| Include stage 1 feature support in Babel |
|browser-sync| Supports synchronized testing on multiple devices and serves local app on public URL |
|chai|Assertion library for use with Mocha|
|cheerio|Supports querying DOM with jQuery like syntax - Useful in testing and build process for HTML manipulation|
|colors|Adds color support to terminal |
|cross-env|Cross-environment friendly way to handle environment variables|
|css-loader|Add CSS support to Webpack|
|eslint|Lints JavaScript |
|eslint-loader|Adds ESLint support to Webpack |
|eslint-plugin-react|Adds additional React-related rules to ESLint|
|extract-text-webpack-plugin| Extracts CSS into separate file for production build | 
|file-loader| Adds file loading support to Webpack |
|mocha| JavaScript testing library |
|node-sass| Adds SASS support to Webpack |
|parallelshell| Display results of multiple commands on single command line |
|react-transform-catch-errors| Catches React errors. Necessary for use with redbox-react |
|react-transform-hmr| Transform React components to support hot module reloading |
|redbox-react| Display nicely formatted React errors in browser |
|rimraf|Delete files |
|sass-loader| Adds Sass support to Webpack|
|style-loader| Add Style support to Webpack |
|webpack| Bundler with plugin system and integrated development server |
|webpack-dev-middleware| Used to integrate Webpack with Browser-sync |
|webpack-hot-middleware| Use to integrate Webpack's hot reloading support with Browser-sync |
|yargs| Easily parse command-line arguments |

###Where are the files being served from when I run `npm start`?
Webpack serves your app in memory when you run `npm start`. No physical files are written. However, the web root is /src, so you can reference files under /src in index.html. When the app is built using `npm run build`, physical files are written to /dist and the app is served from /dist.
 
###How is Sass being converted into CSS and landing in the browser?
Magic! Okay, more specifically, we're handling it differently in dev (`npm start`) vs prod (`npm run build`)

When you run `npm start`: 

 1. The sass-loader compiles Sass into CSS
 2. Webpack bundles the compiled CSS into bundle.js. Sounds odd, but it works! 
 3. bundle.js contains code that loads styles into the &lt;head&gt; of index.html via JavaScript. This is why you don't see a stylesheet reference in index.html. In fact, if you disable JavaScript in your browser, you'll see the styles don't load either.
 
The approach above supports hot reloading, which is great for development. However, it also create a flash of unstyled content on load because you have to wait for the JavaScript to parse and load styles before they're applied. So for the production build, we use a different approach:

When you run `npm run build`:

 1. The sass-loader compiles Sass into CSS
 2. The [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) extracts the compiled Sass into styles.css
 3. buildHtml.js adds a reference to the stylesheet to the head of index.html.
 
For both of the above methods, a separate sourcemap is generated for debugging Sass in [compatible browsers](http://thesassway.com/intermediate/using-source-maps-with-sass).
 
###I don't like the magic you just described above. I simply want to use a CSS file.
No problem. Reference your CSS file in index.html, and add a step to the build process to copy your CSS file over to the same relative location /dist as part of the build step. But be forewarned, you lose style hot reloading with this approach.

###How do I call our existing Web APIs?
This starter kit uses a Node based webserver (Webpack's dev server combined with Browsersync). This means you need to enable Cross-origin Resource Sharing (CORS) on any existing IIS hosted APIs so that you can call them from this kit's dev web server. Here's how:  

Add this to your API's Global.asax:
```c#
protected void Application_BeginRequest(object sender, EventArgs e)
{
    EnableCrossOriginRequestsFromLocalhost(HttpContext.Current.Request);
}

/// <summary>
/// Enables calling IIS-based webservices on localhost from a separate webserver.
/// Useful for doing front-end development from a separate webserver such as a Node-based webserver.
/// </summary>
/// <param name="request"></param>
private void EnableCrossOriginRequestsFromLocalhost(HttpRequest request)
{
    if (!HttpContext.Current.Request.IsLocal) return;
    if (request.UrlReferrer == null) return; //can't set Access-Control-Allow-Origin header reliably without a referrer so just return. Referrer should always be set when being called from an app under development because the app under development's URL will be sent as the referrer automatically.
    var response = HttpContext.Current.Response;
    response.AddHeader("Access-Control-Allow-Origin", request.UrlReferrer.GetLeftPart(UriPartial.Authority));
    response.AddHeader("Access-Control-Allow-Credentials", "true");
    if (request.HttpMethod == "OPTIONS")
    {
        response.AddHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE");
        response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
        response.AddHeader("Access-Control-Max-Age", "1728000");
        response.End();
    }
}
```
The example project includes /api/api.js. This file uses Axios to make AJAX calls. It's recommended to centralize your API calls there. See the example in api.js. api.js properly sets the base url based on whether it's running locally, but be sure to add a hosts entry for motosnap.com (as outlined in the initial machine setup) to assure it works properly.

###What do the scripts in package.json do?
Unfortunately, I can't comment the scripts in package.json inline because the JSON spec doesn't support comments, so I'm providing info on what each script in package.json does here.  

| **Script** | **Description** |
|----------|-------|
| prestart | Runs automatically before start. Calls remove-dist script which deletes the dist folder. This helps remind you to run the build script before committing since the dist folder will be deleted if you don't. ;) |
| start | Runs tests, lints, starts dev webserver, and opens the app in your default browser. |
| open | Opens the app in your default browser. |
| lint:tools | Runs ESLint on build related JS files. (eslint-loader lints src files via webpack when `npm start` is run) |
| clean-dist | Removes everything from the dist folder. |
| remove-dist | Deletes the dist folder |
| create-dist | Creates the dist folder and the necessary subfolders. |
| build:html | Adds trackJS tracking script and copies to /dist. |
| build:sass | Compiles SASS, minifies, generates sourcemap, and stores in /dist. |
| prebuild | Runs automatically before build script (due to naming convention). Cleans dist folder, builds html, and builds sass. |
| build | Bundles all JavaScript using webpack and writes it to /dist. |
| test | Runs tests (files ending in .spec.js) using Mocha and outputs results to the command line. Watches all files so tests are re-run upon save. |
| coverage | Displays code coverage data based on the resulting ES5 code that was compiled by Babel. Writes report to /coverage. |
| open-coverage | Runs the code coverage and then opens it in your default browser. |

### I just want an empty starter kit.
This starter kit includes an example app so you can see how everything hangs together on a real app. To create an empty project, you can delete the following:  

 1. Components in src/components  
 2. Styles in src/styles/styles.scss  
 3. Delete files in src/businessLogic  

Don't want to use Redux? See the next question for some steps on removing Redux.

### Do I have to use Redux?
Nope. Redux is useful for applications with more complex data flows. If your app is simple, Redux is overkill. Remove Redux like this:

 1. Delete the following folders and their contents: actions, constants, reducers, containers, store
 2. Uninstall Redux related packages: `npm uninstall redux react-redux redux-thunk`
 3. Remove Redux related imports from /src/index.js: `import configureStore from './store/configureStore';`, `import App from './containers/App';` and `import { Provider } from 'react-redux';`
 4. Remove this line from /src/index.js: `const store = configureStore();`
 5. Delete components in /components and create a new empty component.
 6. Replace the call to `<Provider><App/></Provider>` in /src/index.js with a call to the new top level component you just created in step 5.

### Why are test files placed alongside the file under test (instead of centralized)? 
Streamlined automated testing is a core feature of this starter kit. All tests are placed in files that end in .spec.js. Spec files are placed in the same directory as the file under test. Why?
+ The existence of tests is highly visible. If a corresponding .spec file hasn't been created, it's obvious.
+ Easy to open since they're in the same folder as the file being tested.
+ Easy to create new test files when creating new source files.
+ Short import paths are easy to type and less brittle.
+ As files are moved, it's easy to move tests alongside.

### How do I view code coverage?
Code coverage is calculated and reported via Istanbul. To view your current code coverage, run `npm run open-coverage`. This will open a tab in your default browser which displays code coverage statistics. You can optionally update the npm script config to run your code coverage on the command line each time you hit save.

### How do I debug?
Since browsers don't currently support ES6, we're using Babel to compile our ES6 down to ES5. This means the code that runs in the browser looks different than what we wrote. But good news, a [sourcemap](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) is generated to enable easy debugging. This means your original JS source will be displayed in your browser's dev console. 
*Note:* When you run `npm start`, no JS is minified. Why? Because minifying slows the build. So JS is only minified when you run the `npm run build` script. See [more on building for production below](https://github.com/coryhouse/vin-javascript-starter-kit#how-do-i-deploy-this).

Also note that no actual physical files are written to the filesystem during the dev build. **For performance, all files exist in memory when served from the webpack server.**. Physical files are only written when you run `npm run build`.

**Tips for debugging via sourcemaps:**  

 1. Browsers vary in the way they allow you to view the original source. Chrome automatically shows the original source if a sourcemap is available. Safari, in contrast, will display the minified source and you'll [have to cmd+click on a given line to be taken to the original source](http://stackoverflow.com/questions/19550060/how-do-i-toggle-source-mapping-in-safari-7).  
 2. Do **not** enable serving files from your filesystem in Chrome dev tools. If you do, Chrome (and perhaps other browsers) may not show you the latest version of your code after you make a source code change. Instead **you must close the source view tab you were using and reopen it to see the updated source code**. It appears Chrome clings to the old sourcemap until you close and reopen the source view tab. To clarify, you don't have to close the actual tab that is displaying the app, just the tab in the console that's displaying the source file that you just changed.  
 3. If the latest source isn't displaying the console, force a refresh. Sometimes Chrome seems to hold onto a previous version of the sourcemap which will cause you to see stale code.

### How do I deploy this?
Before committing, type `npm run build`. This will setup the project for production. It does the following:
* Minifies all JS
* Sets NODE_ENV to prod so that React is built in production mode
* Places the resulting built project files into /dist. (This is the folder you'll expose to the world).

### Why does the build use npm scripts instead of Gulp or Grunt?
In short, Gulp is an unnecessary abstraction that creates more problems than it solves. [Here's why](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n).

### Why does package.json reference the exact version?
This assures that the build won't break when some new version is released. Unfortunately, many package authors don't properly honor [Semantic Versioning](http://semver.org), so instead, as new versions are released, I'll test them and then introduce them into the starter kit. But yes, this means when you do `npm update` no new dependencies will be pulled down. You'll have to update package.json with the new version manually.

### I'm getting an error when running npm install: Failed to locate "CL.exe"
On Windows, you need to install extra dependencies for browser-sync to build and install successfully. Follow the getting started steps above to assure you have the necessary dependencies on your machine.

### How do I kill the watch process on the Windows command line?
If you're in Webstorm, click the red x next to the terminal and then hit Alt+F12 to reopen the terminal. Unfortunately, Ctrl+C doesn't seem to work on the windows command line. (Another reason why I recommend using Git Bash).

### I can't access the external URL for Browsersync
To hit the external URL, all devices must be on the same LAN. So this means your dev machine needs to be on Wifi (since you likely can't connect any tablet or phone to Ethernet. If you dev machine is on wired ethernet, it's on a separate LAN from the Wifi so the two devices won't be able to communicate.

##Potential Features Coming Soon...
* Growl support when running tests and linting, plus associated docs  
* Integrate ideas from React Starter Kit such like [separate tool folder for scripts](https://github.com/kriasoft/react-starter-kit/tree/master/tools)
* Integrate Karma for in-browser tests
* Use Yeoman for easy updates and config, or run npm command to delete example app or remove Redux  
* Add coveralls and associated badges  
* Make list of ideas to implement from: [React-starter](https://github.com/webpack/react-starter/blob/master/make-webpack-config.js), Google's [Web Starter Kit](https://developers.google.com/web/tools/starter-kit/), [React Starter Kit](http://www.reactstarterkit.com),  [Webpack React Starter](https://github.com/webpack/react-starter), [Unicorn standard](http://unicornstandard.com/packages/boilerplate.html), [nwb](https://medium.com/@dtinth/quickly-start-a-new-react-application-using-nwb-334db59691d9#.e93hd0oz8), [React Project](https://github.com/ryanflorence/react-project), and HTML5 Boilerplate        
* Integrate [React testing tools](https://twitter.com/_ericelliott/status/677636069366603777?s=03)
* Generate IDs automatically to assist QA automation  
* Istanbul 1.0 Upgrade (to [eliminate Isparta shim](https://github.com/gotwarlost/istanbul/releases))  
* Sass Linting
* Pagespeed
* [Babel 6 upgrade](http://www.2ality.com/2015/11/configuring-babel6.html?utm_source=javascriptweekly&utm_medium=email) when [babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform) 2.0 comes out of beta
* Cache busting bundle naming
* GraphQL and Relay
* Organize with devops to run prod build step
* Bootstrap
* Authentication example  
* Immutable.js  
* Isomorphic Rendering  
