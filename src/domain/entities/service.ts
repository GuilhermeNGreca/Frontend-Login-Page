export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    avatar: {
      id: number;
      high: string;
      medium: string;
      low: string;
    };
    type: string;
    created: string;
    modified: string;
    role: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface ProfileData {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  avatar: {
    id: number;
    high: string;
    medium: string;
    low: string;
  };
  type: string;
  created: string;
  modified: string;
  role: string;
}
