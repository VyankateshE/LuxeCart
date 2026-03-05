import app from './app.js';
import env from './config/env.js';
import initializeDatabase from './sequelize/initDatabase.js';

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error.message);
    process.exit(1);
  }
};

startServer();
