require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

app.use(errorHandler);

// Connect to MongoDB
connectDB()
    .then(() => {
        // Start the server
        const port = process.env.PORT || 3500;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });
