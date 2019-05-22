const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
        },
      },
      ...(mode === 'PRODUCTION' ? [require.resolve("react-docgen-typescript-loader")] : [])
    ],
  });
  config.module.rules.push({
    test: /\.s?css$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../src"),
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias['@comp'] = path.resolve(__dirname, "../src/components");
  config.resolve.alias['@utils'] = path.resolve(__dirname, "../src/utils");
  // config.resolve.alias = {
  //   '@comp': path.resolve(__dirname, "../src/components"),
  //   '@utils': path.resolve(__dirname, "../src/utils")
  // }
  // console.log(path.resolve(__dirname, "../src/components"));
  return config;
};