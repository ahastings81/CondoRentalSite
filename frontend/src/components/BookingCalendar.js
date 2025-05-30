import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './BookingCalendar.css';

const BACKEND_URL = 'https://condo-backend-0dex.onrender.com';

function BookingCalendar() {
  const [value, setValue] = useState([null, null]); // [startDate, endDate]
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [pricePerNight] = useState(150); // Static price (you can make dynamic later)

  // Fetch unavailable dates from backend
  useEffect(() => {
    axios.get(`${BACKEND_URL}/unavailable-dates`)
      .then(res => setUnavailableDates(res.data))
      .catch(err => console.error('Error fetching unavailable dates:', err));
  }, []);

  // Disable dates that are booked
  const tileDisabled = ({ date }) => {
    return unavailableDates.some(disabled =>
      new Date(disabled).toDateString() === date.toDateString()
    );
  };

  const onChange = (range) => {
    setValue(range);
  };

  // Calculate nights and price
  const getBookingSummary = () => {
    if (!value[0] || !value[1]) return null;
    const nights = (value[1] - value[0]) / (1000 * 60 * 60 * 24);
    return (
      <div className="summary">
        <p><strong>Check-in:</strong> {value[0].toDateString()}</p>
        <p><strong>Check-out:</strong> {value[1].toDateString()}</p>
        <p><strong>Nights:</strong> {nights}</p>
        <p><strong>Total:</strong> ${nights * pricePerNight}</p>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <h2>Book Your Stay</h2>
      <Calendar
        selectRange
        onChange={onChange}
        value={value}
        tileDisabled={tileDisabled}
      />
      {getBookingSummary()}
    </div>
  );
}

export default BookingCalendar;
