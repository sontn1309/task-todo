import auth0 from 'auth0-js';
import { originUrl, authConfig } from '../config';
import Swal from 'sweetalert2'

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    redirectUri: authConfig.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor(history) {
    this.history = history

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'Error: Check the console for further details.',
        })
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    try {
      if (!sessionStorage.getItem('id_token')) {
        this.login();
      }
      return String(sessionStorage.getItem('id_token'));
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    sessionStorage.setItem('is_loggedIn', 'true');
    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    sessionStorage.setItem("id_token", authResult.idToken);
    sessionStorage.setItem("expires_at", expiresAt);
    sessionStorage.setItem("access_token", authResult.accessToken);
    // navigate to the home route
    this.history.replace('/');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: `Could not get a new token (${err.error}: ${err.error_description}).`,
        })
      }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    sessionStorage.setItem('is_loggedIn', 'false');
    sessionStorage.removeItem("id_token");
    this.auth0.logout({
      return_to: originUrl
    });

    // navigate to the home route
    this.history.replace('/');
  }

  isAuthenticated() {
    try {
      let expiresAt = parseInt(sessionStorage.getItem("expires_at"));
      if (!sessionStorage.getItem("id_token")) {
        return false;
      }
      return new Date().getTime() < expiresAt;
    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
