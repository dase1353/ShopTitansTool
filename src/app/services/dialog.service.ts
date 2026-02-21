import { Injectable, signal } from '@angular/core';

export interface DialogState {
    isOpen: boolean;
    type: 'alert' | 'confirm';
    message: string;
    resolve?: (value: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
    state = signal<DialogState>({ isOpen: false, type: 'alert', message: '' });

    alert(message: string): Promise<boolean> {
        return new Promise(resolve => {
            this.state.set({ isOpen: true, type: 'alert', message, resolve });
        });
    }

    confirm(message: string): Promise<boolean> {
        return new Promise(resolve => {
            this.state.set({ isOpen: true, type: 'confirm', message, resolve });
        });
    }

    close(result: boolean) {
        const currentState = this.state();
        if (currentState.resolve) {
            currentState.resolve(result);
        }
        this.state.set({ isOpen: false, type: 'alert', message: '' });
    }
}
