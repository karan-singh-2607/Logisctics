export const API_ENDPOINTS = {
    USER: {
      ABOUT_US: '/v1/user/about-us',
      LOGIN: '/v1/user/login',
      REGISTER: '/v1/user/register',
      PROFILE: '/v1/user/profile',
      SITE_LABEL: (id: string) => `/v1/user/site-label/${id}`,
      FLIGHTS: '/v1/user/flights',
      PRICING: '/v1/user/price-content',
      REGISTRATION_VALIDATE: "/v1/user/registration-validate",
      REGISTRATION: "/v1/user/registration",
    },
    // Add more endpoint categories as needed
    SHIPPING: {
      CALCULATE: '/v1/shipping/calculate',
      TRACK: '/v1/shipping/track',
    },
  } as const
  
  