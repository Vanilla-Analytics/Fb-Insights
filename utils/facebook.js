// utils/facebook.js
class FacebookSDK {
  constructor() {
    this.isInitialized = false;
    this.initPromise = null;
  }

  async init() {
    if (this.isInitialized) {
      return window.FB;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      // Load Facebook SDK
      if (!window.FB) {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          window.fbAsyncInit = () => {
            window.FB.init({
              appId: import.meta.env.VITE_FACEBOOK_APP_ID,
              cookie: true,
              xfbml: true,
              version: import.meta.env.VITE_API_VERSION || 'v18.0'
            });
            
            this.isInitialized = true;
            resolve(window.FB);
          };
        };
        
        script.onerror = () => {
          reject(new Error('Failed to load Facebook SDK'));
        };
        
        document.head.appendChild(script);
      } else {
        // FB is already loaded
        if (!this.isInitialized) {
          window.FB.init({
            appId: import.meta.env.VITE_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: import.meta.env.VITE_API_VERSION || 'v18.0'
          });
          this.isInitialized = true;
        }
        resolve(window.FB);
      }
    });

    return this.initPromise;
  }

  async login() {
    const FB = await this.init();
    
    return new Promise((resolve, reject) => {
      FB.login((response) => {
        if (response.authResponse) {
          resolve(response);
        } else {
          reject(new Error('Facebook login failed or was cancelled'));
        }
      }, {
        scope: 'pages_show_list,pages_read_engagement,read_insights,business_management'
      });
    });
  }

  async getLoginStatus() {
    const FB = await this.init();
    
    return new Promise((resolve) => {
      FB.getLoginStatus((response) => {
        resolve(response);
      });
    });
  }

  async getUserAccounts(accessToken) {
    const FB = await this.init();
    
    return new Promise((resolve, reject) => {
      FB.api('/me/accounts', 'GET', {
        access_token: accessToken,
        fields: 'id,name,access_token,category,picture'
      }, (response) => {
        if (response.error) {
          reject(new Error(response.error.message));
        } else {
          resolve(response.data || []);
        }
      });
    });
  }

  async logout() {
    const FB = await this.init();
    
    return new Promise((resolve) => {
      FB.logout((response) => {
        resolve(response);
      });
    });
  }
}

export const facebookSDK = new FacebookSDK();