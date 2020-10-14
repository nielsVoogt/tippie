# Just the tip

My take on a non social network where users can exchange tips with their friends. No chat, no commenting, no community, just the tip...
Uses `Vue`, `Firebase`, `Vue Router` and `Vuex`.

### Run the project locally

Create a new firebase project. Make sure to enable Email/Password authentication and firestore in this project.

```
VUE_APP_FIREBASE_API_KEY=your_api_key
VUE_APP_FIREBASE_AUTHDOMAIN=your_authdomain
VUE_APP_FIREBASE_DATABASEURL=your_database_url
VUE_APP_FIREBASE_PROJECTID=your_project_id
VUE_APP_FIREBASE_STORAGEBUCKET=your_storagebucket
VUE_APP_FIREBASE_MESSAGINGSENDERID=your_messagingsender_id
VUE_APP_FIREBASE_APPID=your_app_id
VUE_APP_MEASUREMENTID=your_measurement_id
```

Then run the following commands:

```
$ npm install
$ npm run serve
```

### Seed (wip)

You can run seed commands to populate the users (collections are coming soon). To seed the users run the following command:

```
$ npm run seed
```

### Reset (wip)

If you want to delete all users run:

```
$ npm run reset
```
