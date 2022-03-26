import { registerAs } from '@nestjs/config';

export interface HttpClientConfig {
  timeout: number;
}

export default registerAs(
  'http-client',
  (): HttpClientConfig => ({
    timeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT) || 3500,
  }),
);
