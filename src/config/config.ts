export default () => ({
  session: {
    jwt_secret: process.env['JWT_SECRET'] || null,
    session_time: process.env['SESSION_TIME'] || 600000
  }
})
