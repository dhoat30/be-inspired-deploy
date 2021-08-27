const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        url: "http://localhost:3000"
      },
      reactStrictMode: true,
      images: {
        domains: ['inspiry.co.nz']
      }
    }
  }
  return {
    env: {
      url: "http://localhost:3000"
    },
    reactStrictMode: true,
    images: {
      domains: ['inspiry.co.nz']
    }
  }

}
