module.exports = {
  'development': {
    'username': 'postgres',
    'password': 'postgres',
    'database': 'v_database',
    'host': process.env.DB_HOST || '127.0.0.1',
    'dialect': 'postgres'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'postgres',
    'password': 'postgres',
    'database': 'v_database',
    'host': process.env.DB_HOST || '127.0.0.1',
    'dialect': 'postgres'
  }
}
