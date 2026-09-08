/**
 * Global Form State Manager
 * Synchronizes submission status across all form components.
 */

type Listener = (submitted: boolean) => void;

class FormStateManager {
    private isSubmitted: boolean = false;
    private listeners: Set<Listener> = new Set();

    constructor() {
        // Check if already submitted in this session (optional, but good for UX)
        // For now, we'll just keep it in memory as requested ("until user manually refreshed")
    }

    public setSubmitted(value: boolean) {
        this.isSubmitted = value;
        this.notify();
    }

    public getSubmitted(): boolean {
        return this.isSubmitted;
    }

    public subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notify() {
        this.listeners.forEach(listener => listener(this.isSubmitted));
    }
}

export const formState = new FormStateManager();
