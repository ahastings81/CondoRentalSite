const express = require('express');
const path = require('path');
const app = express();
const bookingRoutes = require('./routes/bookingRoutes');

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/bookings', bookingRoutes);

// Fallback to index.html for direct browser navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
