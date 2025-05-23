import { ErrorType } from "../error/ErrorType";

export interface SuccessResult {
  success: true;
}

export interface ErrorResult {
  success: false;
  error: ErrorType;
  message: string;
}

export type ApiResult = SuccessResult | ErrorResult;
