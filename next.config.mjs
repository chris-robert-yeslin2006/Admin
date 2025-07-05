/** @type {import('next').NextConfig} */
const config = {
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config;
}
};
