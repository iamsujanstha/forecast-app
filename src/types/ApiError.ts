export interface ApiError {
  status: number;
  data: {
    error: {
      code: number;
      message: string;
    };
  };
}
