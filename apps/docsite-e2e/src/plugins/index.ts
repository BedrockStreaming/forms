import * as webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { getWebpackConfig } from '@nrwl/cypress/plugins/preprocessor';

export default async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config);

  const wpConfig = getWebpackConfig(config);
  wpConfig.module.rules.push({
    test: /\.feature$/,
    exclude: [/node_modules/],
    loader: '@badeball/cypress-cucumber-preprocessor/webpack',
    options: config,
  });

  on('file:preprocessor', webpack({ webpackOptions: wpConfig }));

  return config;
};
