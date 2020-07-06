const path = require('path');
module.exports = {
  stories: ['../packages/**/stories/*.stories.[tj]s'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: [path.resolve(__dirname, '../node_modules')]
            }
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    });

    // Return the altered config
    return config;
  }
};
