import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ContactForm from '../ContactForm';

const mockFetch = vi.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    // Reset and setup mock fetch for Web3Forms
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders form inputs correctly', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Identity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Frequency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Transmission Data/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/Identity/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Frequency/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Transmission Data/i) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello World' } });

    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
    expect(messageInput.value).toBe('Hello World');
  });

  it('handles successful form submission', async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/Identity/i);
    const emailInput = screen.getByLabelText(/Frequency/i);
    const messageInput = screen.getByLabelText(/Transmission Data/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello World' } });

    fireEvent.click(submitButton);

    // Should show processing state
    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();

    // Wait for success message
    expect(await screen.findByText(/Transmission Sent/i, {}, { timeout: 3000 })).toBeInTheDocument();

    // Inputs should be cleared
    expect((nameInput as HTMLInputElement).value).toBe('');
    expect((emailInput as HTMLInputElement).value).toBe('');
    expect((messageInput as HTMLTextAreaElement).value).toBe('');

    // Verify fetch was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
    );
  });

  // ==========================================
  // ADDITIONAL TESTS FOR ROBUSTNESS
  // ==========================================

  describe('API Error Handling', () => {
    it('handles network failure gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Hello' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Should show error state
      expect(await screen.findByText(/Error/i, {}, { timeout: 3000 })).toBeInTheDocument();
    });

    it('handles API error response (success: false)', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: false, message: 'Rate limit exceeded' }),
      });

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Hello' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Should show error state when API returns success: false
      expect(await screen.findByText(/Error/i, {}, { timeout: 3000 })).toBeInTheDocument();
    });

    it('handles malformed JSON response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Hello' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Should show error state for malformed response
      expect(await screen.findByText(/Error/i, {}, { timeout: 3000 })).toBeInTheDocument();
    });
  });

  describe('Request Payload Validation', () => {
    it('sends correct payload structure to Web3Forms', async () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Test message content' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      // Verify the request body structure
      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody).toEqual({
        access_key: expect.any(String),
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message content',
        subject: 'Portfolio Contact: John Doe',
      });

      // Ensure access_key exists and is not empty
      expect(requestBody.access_key).toBeTruthy();
      expect(requestBody.access_key.length).toBeGreaterThan(0);
    });

    it('includes proper headers in request', async () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Msg' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.web3forms.com/submit',
          expect.objectContaining({
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          })
        );
      });
    });
  });

  describe('Button States', () => {
    it('disables submit button during submission', async () => {
      // Make fetch hang to test loading state
      mockFetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({
        json: () => Promise.resolve({ success: true })
      }), 500)));

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Msg' } });

      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      fireEvent.click(submitButton);

      // Button should be disabled during processing
      await waitFor(() => {
        const processingButton = screen.getByRole('button');
        expect(processingButton).toBeDisabled();
      });
    });

    it('disables submit button after success', async () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Msg' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Wait for success state
      await screen.findByText(/Transmission Sent/i, {}, { timeout: 3000 });

      // Button should still be disabled in success state
      const successButton = screen.getByRole('button');
      expect(successButton).toBeDisabled();
    });
  });

  describe('Form Validation', () => {
    it('requires name field', () => {
      render(<ContactForm />);
      const nameInput = screen.getByLabelText(/Identity/i);
      expect(nameInput).toHaveAttribute('required');
    });

    it('requires email field', () => {
      render(<ContactForm />);
      const emailInput = screen.getByLabelText(/Frequency/i);
      expect(emailInput).toHaveAttribute('required');
    });

    it('requires message field', () => {
      render(<ContactForm />);
      const messageInput = screen.getByLabelText(/Transmission Data/i);
      expect(messageInput).toHaveAttribute('required');
    });

    it('validates email format via input type', () => {
      render(<ContactForm />);
      const emailInput = screen.getByLabelText(/Frequency/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });
  });

  describe('State Recovery', () => {
    it('returns to idle state after success timeout', async () => {
      vi.useFakeTimers();
      
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Msg' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Fast-forward past the success message and timeout
      await vi.runAllTimersAsync();

      // Should return to idle state with Send Message button
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();

      vi.useRealTimers();
    });

    it('returns to idle state after error timeout', async () => {
      vi.useFakeTimers();
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Identity/i), { target: { value: 'Test' } });
      fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByLabelText(/Transmission Data/i), { target: { value: 'Msg' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Fast-forward past the error message and timeout
      await vi.runAllTimersAsync();

      // Should return to idle state
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();

      vi.useRealTimers();
    });
  });
});
