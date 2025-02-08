export interface ApiResponse<T> {
    status: boolean
    data: T
    message?: string
  }
  
  export interface AboutUsData {
    title: string
    sub_title: string
    description: string
    short_description: string
    meta_title: string | null
    meta_keyword: string | null
    meta_description: string | null
  }
  
  // Add more interfaces as needed
  export interface LoginData {
    token: string
    user: {
      id: number
      email: string
      name: string
    }
  }
  
  export interface SiteLabelItem {
    title: string
    media: string | null
    description: string | null
  }
  
  export interface SiteLabelResponse {
    status: boolean
    data: SiteLabelItem[]
  }
  
  export const SITE_LABEL_IDS = {
    WHY_USA2GEORGIA: '10',
    WHAT_WE_OFFER: '11',
    HOW_IT_WORKS: '13',
  } as const
  
  export interface FlightData {
    vehicle_type: string
    route_type: 'Flight' | 'Truck'
    vehicle_number: string
    arrival_time: string
    departure_time: string
    remark: string | null
  }
  
  export interface FlightsResponse {
    status: boolean
    data: {
      [country: string]: FlightData[]
    }
  }

  export interface PricingContent {
    title: string
    sub_title: string | null
    description: string
    short_description: string
    meta_title: string | null
    meta_keyword: string | null
    meta_description: string | null
  }
  
  export interface PricingResponse {
    status: boolean
    data: PricingContent
  }

  
export enum CustomerRole {
  LOCAL = 1,
  FOREIGNER = 2,
  LEGAL_PERSON = 3,
}
export enum FormSteps {
  TYPE = 10,
  PERSONAL = 11,
  DOCUMENTS = 12,
  AGREEMENT=13,
  PASSWORD=14
}

export interface RegistrationValidateData {
  type: CustomerRole
  first_name: string
  last_name: string
  document: string
  mobile: string
  email: string
}

export interface RegistrationData extends RegistrationValidateData {
  password: string
  password_confirmation: string
}

export interface RegistrationResponse {
  status: boolean
  message: string
  data?: any
}