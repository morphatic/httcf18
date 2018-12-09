# Harrisonburg Technical Training Center (HTTC) App for Fall 2018

A demo app to show how to build apps. This app was used to demonstrate the process of building software to beginner programming students in fall of 2018. It is not likely to be actively maintained or updated. Unfortunately, due to time constraints, there was not time to teach students to use TDD (test-driven development) to build this project from beginning to end. Normally, I would consider TDD critically essential to the software development process, and I will be covering it in future classes.

## How to Install this Project Locally

Follow these instructions **CAREFULLY**:

1. Open up a terminal/console window
2. Navigate to the place on your hard drive where you want to download the project, e.g. `mkdir ~/dev && cd ~/dev`
3. Clone the repo: `git clone https://github.com/morphatic/httcf18.git`
4. Navigate to the `frontend` directory: `cd httcf18/frontend`
5. Run npm install to install 3rd party packages for the **frontend** part: `npm i`
6. Navigate to the `backend` direcory: `cd ../backend`
7. Run npm install again to install 3rd party packages for the **backend** part: `npm i`
8. Start up the FeathersJS backend server: `npm start`
9. Confirm that it is running by visiting [http://localhost:3030](http://localhost:3030) in a browser. You should see a splash screen with the FeathersJs logo on it.
10. Minimize the terminal window. **DO NOT CLOSE IT OR STOP THE FEATHERS SERVER!!**
11. Open up a **SECOND** terminal/console window
12. Navigate to the `frontend` directory: `cd ~/dev/httcf18/frontend`
13. Start up the VueJs dev server: `npm run serve`
14. Visit the frontend project in a browser at [http://localhost:8080](http://localhost:8080)
15. Feel free to play around with it. All of the data you are modifying is stored in a **local** copy of the dabase (in `~/dev/httcf18/backend/httc.sqlite3`) so you won't mess anybody or anything up if you add/edit/delete any of the records there. You can always re-clone the database if you want it to go back to the way it was when you started.
16. Play around with the code (if you've got the VSCode `code` command installed on your system: [mac](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) | [windows](https://code.visualstudio.com/docs/editor/command-line#_launching-from-command-line)). You can open the full project (frontend AND backend) from the command line using: `code ~/dev/httcf18` (assumes you cloned it where I directed in steps 2 and 3). If you make changes to the **backend** code, you'll have to restart Feathers before the changes will take effect. If you make changes in the **frontend** code, they should automatically be recompiled and displayed in your browser.

## Helpful Documentation

Here are the 3rd party libraries/tools used to create this project:

* [FeathersJS](https://docs.feathersjs.com/): runs the backend
  * [knex](https://knexjs.org/): database driver for SQLite
  * [feathers-knex](https://github.com/feathersjs-ecosystem/feathers-knex): adapter that allows you to use `knex` with `feathersjs`
  * [SQLite](https://www.sqlite.org/index.html): lightweight, portable, relational database (Their docs are not the best for total beginners--I recommend googling for a better tutorial. The [W3Schools SQL tutorial](https://www.w3schools.com/sql/default.asp) should apply to everything you might need to do with SQLite.)
  * [DB Browser for SQLite](https://sqlitebrowser.org/): this is not strictly part of the code, but it was very helpful for creating the database initially and it can be used to inspect/edit what's actually being put in the DB by our app
* [VueJS](https://vuejs.org/v2/guide/index.html): runs the frontend
  * [VueJS Router](https://router.vuejs.org/): for creating/managing navigation and the URL structure for the frontend app
  * [Vuetify](https://vuetifyjs.com/en/getting-started/quick-start): UI (user interface) framework that supplies all of the components that make the app look great
  * [VeeValidate](https://baianat.github.io/vee-validate/guide/getting-started.html): a library for validating user input on forms which is critical for making sure that users are easily able to interact with the app without corrupting their data
  * [@feathersjs/client](https://github.com/feathersjs/feathers/tree/master/packages/client): a bundle of Feathers-related packages that allows the **frontend** to more easily interact with the **backend**
  * [Axios](https://www.npmjs.com/package/axios): a library for making HTTP requests. we use this in conjunction with `@feathersjs/client` to make REST API requests against our backend server
  * [vue-async-computed](https://www.npmjs.com/package/vue-async-computed): this is a little package to make it easier for Vue to manage [`computed` properties](https://vuejs.org/v2/guide/computed.html) that rely on asynchronous data sources (like the REST API)

## Tutorials

There are A LOT of skills needed to build a project like this. As I've said in class many, many, many times, the list of skills and knowledge necessary to do development is changing constantly. As a budding developer, your **most important task** is NOT writing code, but developing the discipline and practice of teaching yourself all of the new knowledge and skills needed to build something. So, here are some tutorials I would recommend:

* [**The "official" VueJs tutorial**](https://vuejs.org/v2/guide/index.html):
Pitched toward people who already have some experience, but you should **absolutely** read through this whole site, and familiarize yourself with its structure so that you can refer back to it when you need it.
* [**Vue Mastery**](https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance):
This is an **excellent** resource. My business partner and former student Adam Maas referred this site to me. It is what he used to learn Vue. (Please note, there are many, many tutorials online and you would do well to try out a bunch of them until you find the one that "clicks" best with you. The same goes for all of the tutorials I'm recommending.)
* [**The "official" Feathers tutorial**](https://docs.feathersjs.com/guides/basics/readme.html):
This, and the "chat" application tutorial that is on the same site are good introductions to Feathers, but they assume you are already at least a minimally experienced developer.
* **Introduction to REST API Development**:
This is a critical piece of understanding for modern data architectures as **almost all** of the data in the world right now lives in the cloud and is accessible via some sort of REST API. I haven't had a chance to really go through these in detail, but here are several tutorials I found by googling:
  * [Lynda.com's REST API course](https://www.lynda.com/Web-Development-tutorials/Learning-REST-APIs/651230-2.html): Please note that [**JMU has a site license for Lynda.com**](https://sites.jmu.edu/lynda/) so you can access ALL of their content for **FREE!!!** I would highly recommend searching their courses for other topics in this class 
  * [A Beginner's Tutorial for Understanding REST APIs](https://mlsdev.com/blog/81-a-beginner-s-tutorial-for-understanding-restful-api)
  * [REST API Tutorial](https://www.restapitutorial.com/index.html)
  * [How to design a REST API](https://restfulapi.net/rest-api-design-tutorial-with-example/)

## Step-By-Step Instructions on How to Build a Similar Project

If you want to build your own project that is structured in the same way as this one, here are the steps to follow to get you started (**the order of these steps is IMPORTANT**):

1. Install the software necessary to create a development environment on your machine:
  1. [VSCode](https://visualstudio.microsoft.com/): once installed open it up and install useful extensions and tools:
    1. Hit `[command/ctrl]+[shift]+[p]` to open up the command inspector
    2. Type "shell" and select the option to "Shell Command: Install 'code' command in PATH", next
    3. Hit `[command/ctrl]+[shift]+[p]` to open up the command inspector
    4. Type "install" and hit `[enter]` to pull up the Extensions search bar. Search for "Vetur" and install it. Follow the same procedure to install "Prettier-Code formatter"
  2. [Git](https://git-scm.com): If you are on Windows and are going through the installation process, I recommend selecting "VS Code" as the default text editor, and MinTTY as the shell program (i.e. Git Bash). Install it to use the Unix style commands. Otherwise you can accept all of the default options
  3. [NodeJs](https://nodejs.org/en/): instal the current LTS version  (10.14.1 LTS at the moment)
  4. [DB Browser for SQLite](https://sqlitebrowser.org/)
  5. [Postman](https://www.getpostman.com/): an **amazing** utility that you can use to help build and debug your REST API
2. Create a new GitHub repo to house your project. Make sure you use ALL LOWERCASE letters in the name, and I recommend avoiding special characters in the name. Select the option to add a README.md. Also, I recommend choosing the `.gitignore` for Node projects. This will keep some extranneous files out of your repo.
3. Open up a terminal/console window. Create a `dev` directory in your `$HOME` directory (i.e. `~`) and navigate there: `mkdir ~/dev && cd ~/dev`
4. Clone the repo locally, e.g.: `git clone https://github.com/yourusername/myproject.git`
5. Navigate (`cd`) into the newly cloned directory: `cd myproject`
6. Install **global** packages necessary to build this project: `npm i -g @feathersjs/cli @vue/cli`. (**NOTE: If you run into problems at any stage, I recommend googling the _exact_ error message and looking at places like [StackOverflow](https://stackoverflow.com/) for answers.**)
7. Set up your backend
  1. Create a directory for it and navigage there: `mkdir backend && cd backend`
  2. Do your database analysis, use the DB Browser for SQLite and save the file in the `backend` folder you just created.
  3. Initialize a new feathers project: `feathers generate app`
    1. It will ask you what you want to name it and suggest "backend." You don't have to accept this suggestion (it gets it from the folder name) and I would suggest using the same name as your overall app, again all lowercase, no special characters.
    2. You can accept all of the defaults except for testing, choose `Jest` (although we won't really have time get into testing and TDD)
    3. Wait for it to finish installing everything
  4. Install 3rd-party packages necessary for the backend: `npm i -S sqlite knex feathers-knex`
  5. Create your services: `feathers generate service`
    1. For "what kind of service" choose: `KnexJS`
    2. For the name of the service, type the all-lowercase, plural noun name of one of th entities in your project (consult your database analysis document), e.g. `users`
    3. Accept the default path for that service, e.g. `/users`
    4. When it asks what database to connect to, choose `SQLite`
    5. When it asks the connection string, you need to use the name of the SQLite database file you created in step 7.2 above. The connection string should end up being something like: `sqlite://myprojdb.sqlite3` where `myprojdb.sqlite3` is the actual name of the SQLite file you created and stored in the `backend` directory
    6. Repeat this process for your other services. ONLY do this for entities, and not for every table in your database (i.e. you don't need to do this for join tables). For subsequent services, it will automatically use the DB connection you created with the first service, so you don't need to specify that again.
  6. If you haven't been doing this all along, whenever you complete a significant step like just now, you should `add`, `commit`, and `push` your changes to your GitHub repo.
  7. At this point, you should be basically done with the backend, although you may need to edit your service hooks later to support many-to-many relationships.
8. Set up your frontend
  1. Navigate back to the root project folder (i.e. the one that contains the `backend` folder), e.g.: `cd ..` or `cd ~/dev/myproject`
  2. Use the Vue cli to generate a new project: `vue create myproject` (where `myproject` is the same name you used for your repo)
    1. Select "Manually select features" and make the following choices:
    2. Features: `Babel`, `PWA`, `Router`, `CSS Pre-processors`, `Linter`
    3. Yes, use history mode for Router
    4. Use `Stylus` as the CSS pre-processor
    5. Use `ESLint + Prettier` for the linter/formatter
    6. `Lint on Save` is sufficient
    7. I like putting config info in `package.json` rather than in separate config files, but this is personal preference
    8. If you think you might like to re-use this configuration later, you can store it on your system, but it doesn't really matter one way or the other
  3. Rename your `myproject` folder to `frontend` (for consistency with other teams): `mv myproject frontend`
  4. Navigate into the `frontend` directory: `cd frontend`
  5. Install 3rd party libraries: `npm i -S axios @feathersjs/client vee-validate vue-async-computed`
  6. Setup your UI framework: `vue add vuetify` (you can accept the default configuration options)
  7. Run and test your frontend: `npm run serve` and visit in a browser
9. OK!!! At this point you have the skeleton of what you need to get started. You can refer to the code in THIS project for ideas on how to begin customizing your app to do what it is you want to do.