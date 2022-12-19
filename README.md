# Simple React App with User Profiles using Firebase Auth + Firestore

This repository is a React (v18) app that uses a simple, *reusable* pattern for connecting to Firebase services and leveraging Firebase Authentication and Firestore for user registration, login, logout and "dynamically watching" user profile data in real-time.

This project was created with `npx create-react-app` but includes some tweaks to `index.js` based on the new React 18 [createRoot](https://github.com/reactwg/react-18/discussions/5).

## &lt;FirebaseProvider /&gt;

This component configures the app with your Firebase project's configuration information (the *firebaseConfig*), and gets the various Firebase services available for the rest of the app to use.  The component uses React's Context API to make the services available.

## &lt;AuthProvider /&gt;

This component uses the Auth service (it gets from the &lt;FirebaseProvider /&gt;) to enable the AuthStateChanged listener, makes available functions: `login()`, `logout()` and `register()`, upon successful registration stores "user profile" data to Firestore, and upon a successful login fetches the "user profile" data for the currently logged in user.

## To Run This Project

1. `git clone https://github.com/gregfenton/react-and-firebase-auth-and-firestore.git`
1. `cd react-firebase-auth-and-firestore`
1. `npm install`  to install the NPM dependencies
1. Open your favourite code editor (e.g. `code .` to run VSCode on this project)
1. Ensure your Firebase project has enabled the Email/Password sign-in provider:
   - Firebase Console >> YOUR_PROJECT >> Authentication >> Sign-In Method
   - If "Email/Password" is not listed under Sign-In Providers, click *Add New Provider* and add it
   - Ensure that Email/Password is *Enabled*
1. Ensure your Firebase project has enabled the Firestore Database:
   - Firebase Console >> YOUR_PROJECT >> Firestore Database
   - if you see a *Create Database* button, click it
1. Edit the file `FirebaseProvider.js` and update the values in `firebaseConfig` with those of your Firebase project (see comments in the code)
1. `npm run start`

Now your browser should automatically open to http://localhost:3000/
1. If you have an existing account in your Firebase Authentication the enter the email, password and click the Login button.
1. If you'd like to register a new account, click the Register New Account button.
1. Once logged in, you will be presented with the `displayName` and `email` values that are in Firestore >> `users` >> [the UID from Firebase Auth]

You might also keep the "Hello" page showing and use Firebase Console >> Firestore to change the `displayName` of the user document.  You will see the React app update its UI in real-time.

## To Use This Project In Your Own React App

The main parts of this app that is *reusable* are `FirebaseProvider` and `AuthProvider`.

To use them, copy these two files into your React app, and somewhere near the top of your app's component tree "wrap" the parts of your app you want to use Firebase in with these two providers.

From `App.js`:

```js
  return (
    <FirebaseProvider>
      <AuthProvider>
    
        <RestOfTheApp />

      </AuthProvider>
    </FirebaseProvider>
  );
```

where `<RestOfTheApp />` represents the rest of your app (could be one component, or it could be a long list of JSX code).
