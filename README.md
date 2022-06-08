# WorkStats

Currently under development. Please contact us if you are interested.

## Table of contents

- [WorkStats](#workstats)
  - [Table of contents](#table-of-contents)
  - [Description](#description)
  - [Landing Page](#landing-page)
  - [Let's get started](#lets-get-started)
    - [For first time visitors](#for-first-time-visitors)
    - [Procedures for development](#procedures-for-development)
  - [Directory structure](#directory-structure)
    - [components/](#components)
    - [pages/](#pages)
    - [services/](#services)
    - [models/](#models)
    - [libs/](#libs)
    - [utils/](#utils)
  - [Style Guide](#style-guide)
  - [End-to-End Test / Integration Test](#end-to-end-test--integration-test)

## Description

WorkStats is a dashboard tool to visualize the production and activity of your team and members. Specifically, you can get the following numbers from the tool.

- Number of commit from GitHub
- Number of review from GitHub
- Number of task completed from Asana
- Number of task opened from Asana
- Number of message mentioned from Slack
- Number of message sent from Slack etc...

## Landing Page

Landing page for this site is here. If you don't mind, please let me know your contact so that I could inform you when this site is ready. This page is written by English and Japanese as well.

[Landing Page](https://www.suchica.com)

## Let's get started

### For first time visitors

The procedure for creating a local repository and checking the site on the local host is as follows.

- Install Node.js (LTS) from [the official node web site](https://nodejs.org/en/download/) by clicking the link or just searching like `install node for mac`
- Open Terminal (for mac)
- Change the current working directory to the location where you want the cloned directory (like home directory `~`)
- `git clone https://github.com/Suchica/workstats.git` to clone WorkStats repository
- `code .` to open the repository in VSCode or you can use your favorite editor
- `npm install` to install necessary packages
- ask admin to give you `secrets.json` and `.env.local`
- `npm run dev` to open this web site on local host

### Procedures for development

- First, `pwd` to check if you are in a root directory in your project.
- `git branch --contain` to check if the current local branch is the `master` local branch.
- `git pull origin master` or just `git pull` to pull, which means fetch and merge, the latest changes from the main remote branch to the main local branch.
- Then `git checkout -b <feature/branch-name>` e.g. `checkout -b feature/top-page` to create a new feature local branch with the latest changes and switch the current branch to it. `git checkout -b xxx` is the same as `git branch xxx` and `git checkout xxx`.
- Develop the feature.
- Once it is done, before making any commit, `git checkout master` to switch back to the main local branch and `git pull origin master` to pull the latest changes other members made from the main remote branch to the main local branch.
- And `git checkout <feature/branch-name>` to switch back to the feature local branch and `git merge master` to merge the latest changes from the main local branch to the feature local branch. If there is no conflict, it will be merged successfully.
- Then `git add .` to stage changes in `<feature/branch-name>` in local repository.
- Then `git commit -m "message"` to commit the changes to the feature branch in the local repository.
- Then `git push origin <feature/branch-name>` to push the changes to the feature branch in the remote repository.
- Create a pull request to the main branch with reviewer on GitHub in a browser.
- The pull request will be approved and merged by the reviewer on GitHub.
- Finally, `git checkout master` and `git pull origin master` to merge the latest changes from the remote main branch to the local main branch.

## Directory structure

A brief description of how to use each directory is given below. The following will give you some idea of what kind of code is placed in each directory.

### components/

It is the UI layer in layered architecture and the View in MVC. All page-shared components and page-specific components are separated to some extent appropriately. If the number of files increases, we will organize them accordingly, but in that case, the reference path will be complementarily changed by VSCode, so there is no problem in that respect.

### pages/

It is responsible for the connection between the UI layer and the Application layer in layered architecture, and the Controller in MVC. This is a directory specific to Next.js.

### services/

It is the Application layer in a layered architecture.

A set of codes is placed to process the data (join, aggregate, etc.) according to the user's action. It can be said to be the layer that performs CRUD and ELT for requests from the UI layer. It is implemented in such a way that it does not need to know the technology of the UI layer from its dependencies.

### models/

It is the Domain layer in layered architecture, and the Model in MVC.

The domain layer is an optional layer that sits between the UI layer and the data layer. Representation of the business model, such as use cases and user stories. Direct operations such as rewriting domain information.

The domain layer is responsible for encapsulating complex business logic, or simple business logic that is reused by multiple ViewModels. This layer is optional because not all apps will have these requirements. We should only use it when needed-for example, to handle complexity or favor reusability.

### libs/

The code specific to the library we are using and not related to data acquisition, such as initialization and configuration code, is placed here. There is a possibility that each library will be completely switched.

### utils/

We plan to place useful functions that can be used globally (ex. string processing, etc.).

## Style Guide

Basically follow the style guide below:

- [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/)
- [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/)
- [W3 JavaScript Style Guide](https://www.w3schools.com/js/js_conventions.asp)

## End-to-End Test / Integration Test

The steps to run the test are as follows.

1. `npm run build` to build the site.
2. And `npm run start` to start the site.
3. Then `npm run cypress` in another terminal to run the test.
