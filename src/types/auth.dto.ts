export interface ResetPasswordRequestDto {
  password: string;
  accessToken: string;
}

export interface ResetPasswordResponseDto {
  isDone: boolean;
}
