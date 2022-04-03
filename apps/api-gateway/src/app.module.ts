import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { BuildServiceModule } from './build-service/build-service.module';
import { validateEnv } from './config/env.validator';
import { formatGqlApiGatewayError } from './graphql/format-api-gateway-error';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.api-gateway.env`,
      validationSchema: validateEnv,
    }),
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        server: {
          cors: true,
          uploads: false,
          engine: {
            apiKey: process.env.APOLLO_KEY,
            graphVariant: process.env.GRAPH_VARIANT,
          },
          context: ({ req }) => ({ headers: req.headers }),
          formatError: formatGqlApiGatewayError,
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
