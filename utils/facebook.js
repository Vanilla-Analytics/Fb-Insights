// utils/facebook.js - Alternative Approach
class FacebookSDK {
  constructor() {
    this.isInitialized = false;
    this.initPromise = null;
    this.FB = null;
  }

  async init() {
    if (this.isInitialized && this.FB) {
      return this.FB;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      //const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
      const appId = import.meta.env.VITE_FACEBOOK_APP_ID || '1979669235739095';
      
      if (!appId) {
        reject(new Error('VITE_FACEBOOK_APP_ID is not set in environment variables'));
        return;
      }

      console.log('Initializing Facebook SDK...');

      // Set up the async init function FIRST
      window.fbAsyncInit = () => {
        console.log('fbAsyncInit called');
        try {
          if (!window.FB) {
            reject(new Error('FB object not available after SDK load'));
            return;
          }

          window.FB.init({
            appId: appId,
            cookie: true,
            xfbml: true,
            version: import.meta.env.VITE_API_VERSION || 'v18.0'
          });

          // Wait for FB to be ready
          window.FB.getLoginStatus((response) => {
            console.log('FB.getLoginStatus called, SDK is ready:', response.status);
            this.FB = window.FB;
            this.isInitialized = true;
            resolve(window.FB);
          });

        } catch (error) {
          console.error('Error in fbAsyncInit:', error);
          reject(error);
        }
      };

      // Load the SDK script
      if (!document.getElementById('facebook-jssdk')) {
        const js = document.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        js.async = true;
        js.defer = true;
        
        js.onerror = () => {
          reject(new Error('Failed to load Facebook SDK'));
        };

        const fjs = document.getElementsByTagName('script')[0];
        fjs.parentNode.insertBefore(js, fjs);
      } else if (window.FB) {
        // SDK already loaded, call fbAsyncInit manually
        window.fbAsyncInit();
      }

      // Timeout fallback
      setTimeout(() => {
        if (!this.isInitialized) {
          reject(new Error('Facebook SDK initialization timeout'));
        }
      }, 15000);
    });

    return this.initPromise;
  }

  async login() {
    try {
      console.log('Attempting Facebook login...');
      
      const FB = await this.init();
      
      if (!FB || !this.isInitialized) {
        throw new Error('Facebook SDK not initialized');
      }

      console.log('SDK ready, calling FB.login...');

      return new Promise((resolve, reject) => {
        FB.login((response) => {
          console.log('FB.login response:', response);
          
          if (response.authResponse) {
            console.log('Login successful');
            resolve(response);
          } else {
            console.log('Login cancelled or failed');
            reject(new Error('Facebook login was cancelled or failed'));
          }
        }, {
          //scope: 'pages_show_list,pages_read_engagement,read_insights,business_management'
          //scope: 'read_insights, pages_read_engagement'
          scope:'ads_read,read_insights,pages_read_engagement'
          //scope: 'public_profile'
        });
      });
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getLoginStatus() {
    const FB = await this.init();
    
    return new Promise((resolve) => {
      FB.getLoginStatus((response) => {
        console.log('Current login status:', response);
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
        console.log('User accounts response:', response);
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
        console.log('Logout response:', response);
        this.isInitialized = false;
        this.FB = null;
        this.initPromise = null;
        resolve(response);
      });
    });
  }
}

export const facebookSDK = new FacebookSDK();