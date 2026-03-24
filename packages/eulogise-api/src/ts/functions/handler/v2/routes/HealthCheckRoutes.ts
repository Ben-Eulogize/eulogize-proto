const getHealthCheck = () => {
  console.log('getHealthCheck request received')
  return {
    message: 'OK: Hello from Eulogize API!',
  }
}

export default {
  '/healthcheck': {
    GET: getHealthCheck,
  },
}
