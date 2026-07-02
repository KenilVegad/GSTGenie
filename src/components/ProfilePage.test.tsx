import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

vi.mock('../firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  onSnapshot: vi.fn(),
  setDoc: vi.fn(),
}));

describe('ProfilePage', () => {
  it('should toggle notification settings and update firestore', async () => {
    const mockDocRef = {};
    (doc as vi.Mock).mockReturnValue(mockDocRef);
    (onSnapshot as vi.Mock).mockImplementation((_, callback) => {
      callback({ exists: () => true, data: () => ({ notifications: { email: true, sms: false, push: true, whatsapp: false } }) });
      return () => {};
    });

    render(<ProfilePage />);

    // Check initial state
    expect(screen.getByLabelText('Email Notifications')).toBeChecked();
    expect(screen.getByLabelText('SMS Alerts')).not.toBeChecked();

    // Toggle SMS
    fireEvent.click(screen.getByLabelText('SMS Alerts'));

    // Check if UI updates
    expect(screen.getByLabelText('SMS Alerts')).toBeChecked();

    // Check if firestore is updated
    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledWith(mockDocRef, { 
        notifications: { email: true, sms: true, push: true, whatsapp: false } 
      }, { merge: true });
    });
  });
});
