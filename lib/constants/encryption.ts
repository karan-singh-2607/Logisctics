export const ENCRYPTION_CONFIG = {
    SECRET_KEY: process.env.NEXT_PUBLIC_STORAGE_KEY || 'fallback-key-do-not-use-in-production',
    PREFIX: 'usa2georgia_',
    ENCODING_TYPE: 'aes' as const,
    ENABLE_COMPRESSION: true,
  } as const
  
  