module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e9cf8bd55ad6d5af465151987d0019ec'),
  },
});
