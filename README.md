# Making Fetch Happen

It was a Wednesday, I was wearing pink.

**Please visit [makefetchhappen.xyz](makefetchhappen.xyz) to view the project in action!**

## Getting Started

 - Make sure your computer has `npm`, if your computer does not have this, please go to the github repo for [nvm](https://github.com/nvm-sh/nvm) and install this package manager.
 - Next, you will need to make sure you have `yarn` installed.  The yarn [website](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) will get that process started for you.
 - Next, you will need to clone this project locally
 - Finally, you will need to run `npm install` to download the needed packages in both the main `makefetchhappen` directory and in the FE directory `./src/frontend`

### Running locally
   First run `yarn start:dev:api` followed by `yarn start:dev:fe` in a new tab, both commands under the main directory, `makefetchhappen`. The app can then be tested [locally](http://localhost:8080) or through Insmonia or Postman on port `3000` (An Insmonia collection is included in the source code). 

### Running tests
   Tests can be run by typing `yarn test` in the main directory `makefetchhappen`
   
## Work I didn't finish

 - The Frontend is awful, just awful, but I wasn't actually supposed to build one, so I don't feel bad
	 -- My modals are copy pasta, they should have been more generic
	 -- `AvailableFunds` should be a subscription, instead I'm just calling it willy nilly
	 -- My css is just spaghetti
	 -- etc
- The backend doesn't do a ton to prevent you from breaking the app. Specifically if you try to spend more points than you have, the app will just break.  Because I'm modifying state directly without storing it, if you go negative, the app errors out.  I can fix this by doing all of my data manipulation in shallow copies of the data before "saving" it if the transaction is valid.  I got distracted by pictures of dogs before completing this work.
- I wanted to have actual data storage and user logins, but I've already spent more than 2 hours on this, so I'm just going to leave it as is.  I removed the `id` fields that I had added initially.  Should have known it was YAGNI from the start.
- I only have tests for the basic `balance`, `addTransaction`, and `spendPoints` end points.  `reset` and `getTransactions` are only needed for the frontend and aren't very interesting, but for thoroughness I should have added tests.
