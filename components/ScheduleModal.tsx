
import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import Button from './Button';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSchedule: (date: Date) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onConfirmSchedule }) => {
  const today = new Date();
  
  // Default to tomorrow at 10:00 AM
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const [date, setDate] = useState(tomorrow.toISOString().split('T')[0]); // YYYY-MM-DD
  const [time, setTime] = useState('10:00');

  const minDate = useMemo(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }, []);

  const handleSubmit = () => {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    // Note: month is 0-indexed in JS Date
    const scheduledDate = new Date(year, month - 1, day, hours, minutes);
    
    if (scheduledDate < new Date()) {
        alert("Cannot schedule a post in the past.");
        return;
    }
    
    onConfirmSchedule(scheduledDate);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Schedule Post</h3>
            <p className="mt-1 text-sm text-gray-500">
                Choose a future date and time to publish this post.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <label htmlFor="schedule-date" className="block text-sm font-medium text-gray-700">
                    Date
                </label>
                <input
                    type="date"
                    id="schedule-date"
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="schedule-time" className="block text-sm font-medium text-gray-700">
                    Time
                </label>
                <input
                    type="time"
                    id="schedule-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={onClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Confirm Schedule
            </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleModal;
