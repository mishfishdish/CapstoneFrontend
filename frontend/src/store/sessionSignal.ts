import {signal} from '@preact/signals-react';

// Get initial value from sessionStorage if it exists
const storedUserId = sessionStorage.getItem('userId');
const storedClubId = sessionStorage.getItem('clubId');

export const userIdSignal = signal<string | null>(storedUserId);
export const clubIdSignal = signal<string | null>(storedClubId);

// Keep sessionStorage in sync with signal values
userIdSignal.subscribe((val) => {
    if (val) sessionStorage.setItem('userId', val);
    else sessionStorage.removeItem('userId');
});

clubIdSignal.subscribe((val) => {
    if (val) sessionStorage.setItem('clubId', val);
    else sessionStorage.removeItem('clubId');
});