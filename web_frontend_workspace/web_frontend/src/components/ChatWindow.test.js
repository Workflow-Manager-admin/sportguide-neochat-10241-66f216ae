import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWindow from './ChatWindow';

// Helper: advance timers for async UI simulation
function advanceTimers(ms = 1200) {
  jest.advanceTimersByTime(ms);
}

describe('ChatWindow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders initial UI and default bot welcome message', () => {
    render(<ChatWindow />);
    expect(screen.getByText(/Sports TV Guide bot/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /type your message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    expect(screen.getByText(/Conversation/)).toBeInTheDocument();
  });

  test('enables user to type and send a message, then shows bot reply', async () => {
    render(<ChatWindow />);
    
    // Simulate user typing
    const input = screen.getByRole('textbox', { name: /type your message/i });
    fireEvent.change(input, { target: { value: 'Who won the football match?' } });
    expect(input).toHaveValue('Who won the football match?');
    
    // Simulate form submit
    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    // After send, input should clear and user message should appear
    await waitFor(() => {
      expect(screen.getByText('Who won the football match?')).toBeInTheDocument();
    });
    expect(input).toHaveValue('');
    
    // Bot "Typing..." indicator appears as async runs
    expect(screen.getByText(/typing\.\.\./i)).toBeInTheDocument();

    // Fast-forward timers to complete fetch & streaming
    advanceTimers(1900); // Initial loading
    await waitFor(() => {
      expect(screen.queryByText(/typing\.\.\./i)).not.toBeInTheDocument();
    });
    advanceTimers(2000); // Streaming chunk

    // Bot reply (mocked) should eventually be shown
    await waitFor(() => {
      // Chatbot responds with the sports-based canned answer.
      expect(screen.getByText(/Lakers vs. Celtics on ESPN/i)).toBeInTheDocument();
    });
  });

  test('shows error if send pressed with empty input', async () => {
    render(<ChatWindow />);
    const input = screen.getByRole('textbox', { name: /type your message/i });
    fireEvent.change(input, { target: { value: '' } });
    const sendButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.click(sendButton);

    expect(await screen.findByText(/please enter a message/i)).toBeInTheDocument();
  });
});
