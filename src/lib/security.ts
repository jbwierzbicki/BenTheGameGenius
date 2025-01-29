// Helper function to convert string to Uint8Array
const str2ab = (str: string): Uint8Array => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

// Helper function to convert ArrayBuffer to string
const ab2str = (buf: ArrayBuffer): string => {
  const decoder = new TextDecoder();
  return decoder.decode(buf);
};

// Generate a key from a password string
const getKey = async (password: string): Promise<CryptoKey> => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    str2ab(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: str2ab('fixed-salt'), // In production, use a random salt
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

// Encryption functions
export const encrypt = async (data: string, password: string): Promise<string> => {
  try {
    const key = await getKey(password);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedContent = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      str2ab(data)
    );

    // Combine IV and encrypted content
    const combined = new Uint8Array(iv.length + new Uint8Array(encryptedContent).length);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedContent), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};

export const decrypt = async (encryptedData: string, password: string): Promise<string> => {
  try {
    const key = await getKey(password);
    const combined = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );

    // Extract IV and encrypted content
    const iv = combined.slice(0, 12);
    const encryptedContent = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      encryptedContent
    );

    return ab2str(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};

// Secure storage implementation
export const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      const item = localStorage.getItem(key);
      return item;
    } catch (error) {
      console.error('Secure storage get error:', error);
      return null;
    }
  },
  
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Secure storage set error:', error);
    }
  },
  
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}; 