import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ChatWindow from './ChatWindow';

// Helper: advance timers for async UI simulation
function advanceTimers(ms = 1200) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
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
    
    // Bot "Typing..." indicator appears for a moment
    expect(screen.getByText(/typing\.\.\./i)).toBeInTheDocument();

    // Fast-forward timers to complete fetch & streaming
    advanceTimers(3000); // Ensure async behavior and streaming are completed

    // Bot reply (mocked) should eventually be shown (partial match ok)
    await waitFor(() => {
      expect(
        screen.getByText(/Lakers vs\. Celtics.*ESPN/, { exact: false })
      ).toBeInTheDocument();
    });
  });

  test('shows error if user tries to send with empty input while input is enabled', async () => {
    render(<ChatWindow />);
    const input = screen.getByRole('textbox', { name: /type your message/i });
    expect(input).toHaveValue('');

    // Enable input: the button should be enabled if not loading/streaming and input is empty, so add a character and clear to reset
    fireEvent.change(input, { target: { value: ' ' } }); // triggers state update to empty after trim
    fireEvent.change(input, { target: { value: '' } });

    // Send button should be disabled, so simulate as close as possible
    const sendButton = screen.getByRole('button', { name: /send message/i });

    // Since the send button is disabled for empty input, simulate click and check no error yet
    expect(sendButton).toBeDisabled();

    // Direct call the form submit event when input is not empty to force the error message code
    fireEvent.change(input, { target: { value: 'a' } });
    expect(sendButton).not.toBeDisabled();
    fireEvent.change(input, { target: { value: '' } }); // back to empty
    // If we try now, we want to see the error
  
    // As a workaround for the logic, fire the submit event directly (form submit), not just click the disabled button
    fireEvent.submit(input.closest('form'));
    expect(await screen.findByText(/please enter a message/i)).toBeInTheDocument();
  });
});
