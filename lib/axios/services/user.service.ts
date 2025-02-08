import axiosInstance from "../config";
import { API_ENDPOINTS } from "../endpoints";
import { cacheManager } from "../../cache/cache-manager";
import { CACHE_CONFIG } from "../../constants/cache";
import {
  type ApiResponse,
  type AboutUsData,
  type LoginData,
  type SiteLabelItem,
  type SiteLabelResponse,
  SITE_LABEL_IDS,
  FlightData,
  FlightsResponse,
  PricingContent,
  PricingResponse,
  RegistrationValidateData,
  RegistrationResponse,
  RegistrationData,
  LoginRequest,
  LoginResponse,
} from "../types";

export const userService = {
  getAboutUs: async () => {
    const cacheKey = API_ENDPOINTS.USER.ABOUT_US;

    return cacheManager.dedupRequest<AboutUsData>(
      cacheKey,
      async () => {
        const response = await axiosInstance.get<any, ApiResponse<AboutUsData>>(
          API_ENDPOINTS.USER.ABOUT_US
        );
        return response.data;
      },
      CACHE_CONFIG.TTL.LONG // Cache for 24 hours
    );
  },

  getSiteLabel: async (id: string): Promise<SiteLabelItem[]> => {
    const cacheKey = `site-label-${id}`;

    return cacheManager.dedupRequest<SiteLabelItem[]>(
      cacheKey,
      async () => {
        const response = await axiosInstance.get<any, SiteLabelResponse>(
          API_ENDPOINTS.USER.SITE_LABEL(id)
        );
        return response.data;
      },
      CACHE_CONFIG.TTL.LONG // Cache for 24 hours
    );
  },
  // Helper method to get all site labels at once
  getAllSiteLabels: async () => {
    const [whyUs, whatWeOffer, howItWorks] = await Promise.all([
      userService.getSiteLabel(SITE_LABEL_IDS?.WHY_USA2GEORGIA),
      userService.getSiteLabel(SITE_LABEL_IDS?.WHAT_WE_OFFER),
      userService.getSiteLabel(SITE_LABEL_IDS?.HOW_IT_WORKS),
    ]);

    return {
      whyUs,
      whatWeOffer,
      howItWorks,
    };
  },

  getFlights: async () => {
    const cacheKey = API_ENDPOINTS.USER.FLIGHTS
    
    return cacheManager.dedupRequest<{ [country: string]: FlightData[] }>(
      cacheKey,
      async () => {
        const response = await axiosInstance.get<any, FlightsResponse>(
          API_ENDPOINTS.USER.FLIGHTS
        )
        return response.data
      },
      CACHE_CONFIG.TTL.SHORT // Cache for 5 minutes since this is time-sensitive data
    )
  },

  getPricing: async () => {
    const cacheKey = API_ENDPOINTS.USER.PRICING
    
    return cacheManager.dedupRequest<PricingContent>(
      cacheKey,
      async () => {
        const response = await axiosInstance.get<any, PricingResponse>(
          API_ENDPOINTS.USER.PRICING
        )
        return response.data
      },
      CACHE_CONFIG.TTL.MEDIUM // Cache for 30 minutes
    )
  },
  // Example of another cached endpoint
  getUserProfile: async (userId: string) => {
    const cacheKey = `${API_ENDPOINTS.USER.PROFILE}-${userId}`;

    return cacheManager.dedupRequest(
      cacheKey,
      async () => {
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.USER.PROFILE}/${userId}`
        );
        return response.data;
      },
      CACHE_CONFIG.TTL.SHORT // Cache for 5 minutes
    );
  },

  // Method to invalidate user-related caches
  invalidateUserCache: async () => {
    await Promise.all([
      cacheManager.delete(API_ENDPOINTS.USER.PROFILE),
      // Add other user-related cache keys as needed
    ]);
  },

  validateRegistration: async (data: RegistrationValidateData): Promise<RegistrationResponse> => {
    const response = await axiosInstance.post<any, RegistrationResponse>(API_ENDPOINTS.USER.REGISTRATION_VALIDATE, data)
    return response
  },

  register: async (data: RegistrationData): Promise<RegistrationResponse> => {
    const response = await axiosInstance.post<any, RegistrationResponse>(API_ENDPOINTS.USER.REGISTRATION, data)
    return response
  },
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<any, LoginResponse>(API_ENDPOINTS.USER.LOGIN, data)
      return response
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || "An error occurred during login",
      }
    }
  },
};
