const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB().then(() => {
    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});
