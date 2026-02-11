const pool = require('./database');

const checkDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

const initializeDatabase = async () => {
  try {
    console.log('🔄 Checking database tables...');
    
    // List of tables to check
    const tables = [
      'users',
      'queries',
      'marketplace_products',
      'orders',
      'notifications',
      'alerts',
      'knowledge_articles',
      'feedback',
      'saved_tips',
      'notification_preferences',
    ];

    const result = await pool.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`
    );

    const existingTables = result.rows.map((row) => row.table_name);
    const missingTables = tables.filter((table) => !existingTables.includes(table));

    if (missingTables.length > 0) {
      console.warn(
        '⚠️  Missing tables detected:',
        missingTables.join(', ')
      );
      console.log('Run: npm run migrate');
      return false;
    }

    console.log('✅ All required database tables exist');
    return true;
  } catch (error) {
    console.error('Error checking database tables:', error.message);
    return false;
  }
};

module.exports = {
  checkDatabaseConnection,
  initializeDatabase,
};
