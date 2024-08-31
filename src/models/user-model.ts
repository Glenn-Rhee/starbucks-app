export interface ResponsePayload {
  status: "success" | "failed";
  statusCode: number;
  message: string;
  data?: any;
  error?: any;
}

export interface SignupRequest {
  fullname: string;
  username: string;
  email: string;
  password: string;
  mobilePhone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface EditRequest {
  fullname?: string;
  username?: string;
  mobilePhone?: string;
  email?: string;
}
