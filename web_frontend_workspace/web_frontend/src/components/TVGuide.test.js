import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TVGuide from './TVGuide';

// Mock the fetchTVGuideData async method to resolve instantly with example data
jest.mock('./TVGuide', () => {
  const original = jest.requireActual('./TVGuide');
  const dummySchedule = [
    {
      id: 1,
      sport: "Football",
      match: "Real Madrid vs. Barcelona",
      time: "6:00 PM",
      channel: "ESPN",
      league: "La Liga",
    },
  ];
  // Patch fetchTVGuideData to return our custom data fast
  return {
    __esModule: true,
    ...original,
    default: original.default,
    fetchTVGuideData: jest.fn().mockResolvedValue(dummySchedule),
  };
});

describe('TVGuide', () => {
  test('renders loading state initially', () => {
    render(<TVGuide />);
    expect(screen.getByText(/loading schedule/i)).toBeInTheDocument();
  });

  test('renders schedule table with mock data after loading', async () => {
    render(<TVGuide />);
    // Header
    expect(screen.getByText(/tv sports guide/i)).toBeInTheDocument();

    // Simulate load
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    // Table headings
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Match')).toBeInTheDocument();
    expect(screen.getByText('League')).toBeInTheDocument();
    expect(screen.getByText('Channel')).toBeInTheDocument();

    // Table row mock
    expect(screen.getByText('6:00 PM')).toBeInTheDocument();
    expect(screen.getByText(/Real Madrid vs\. Barcelona/)).toBeInTheDocument();
    expect(screen.getByText('La Liga')).toBeInTheDocument();
    expect(screen.getByText('ESPN')).toBeInTheDocument();

    // Icon and sport label in schedule
    const icons = screen.getAllByText('⚽️');
    expect(icons.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Football/)).toBeInTheDocument();
  });
});
