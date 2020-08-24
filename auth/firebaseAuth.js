import * as firebase from 'firebase';

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};
export const onSignIn = googleUser => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(({ additionalUserInfo, user }) => {
          const { profile, isNewUser } = additionalUserInfo;
          const { picture, locale, given_name, family_name } = profile;
          return isNewUser
            ? firebase
                .database()
                .ref(`/users/${user.uid}`)
                .set({
                  gmail: user.email,
                  profile_picture: picture,
                  locale: locale,
                  first_name: given_name,
                  last_name: family_name ? family_name : '',
                  created_at: Date.now(),
                })
            : firebase.database().ref(`/users/${user.uid}`).update({
                last_logged_in: Date.now(),
              });
        })
        .catch(function (err) {
          alert(err.message);
        });
    } else {
      alert('User already signed-in Google.');
    }
  });
};
