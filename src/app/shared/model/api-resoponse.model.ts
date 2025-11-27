export interface ApiResponse<T = any> {
  code: number;
  message: string;
  status: string;
  data?: T;
  timestamp: string;
}
