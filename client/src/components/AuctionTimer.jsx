import React, { useState, useEffect } from 'react';

const calculateTimeRemaining = (endTime) => {
  const now = Date.now();
  const end = endTime; // Assuming endTime is already in milliseconds

  const timeDifference = end - now;

  if (timeDifference <= 0) {
    return 'Auction Ended';
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

const renderTimeRemaining = (timeRemaining) => {
  if (typeof timeRemaining === 'string') {
    return timeRemaining;
  }

  const { hours, minutes, seconds } = timeRemaining;
  let remainingTime = '';

  if (hours > 0) remainingTime += `${hours}h `;
  if (minutes > 0) remainingTime += `${minutes}m `;
  if (seconds > 0) remainingTime += `${seconds}s`;

  return remainingTime.trim() || 'Auction ended';
};

const AuctionTimer = ({ item }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(item.endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(item.endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [item.endTime]);

  const formattedTimeRemaining = renderTimeRemaining(timeRemaining);

  return (
    <div className="mini-item-timer">
      <p className="" >⏳: {formattedTimeRemaining}</p>
    </div>
  );
};

export default AuctionTimer;