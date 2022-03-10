export enum TimeInterval {
    POMODOR = 'pomodor',
    BREAK = 'break',
    LONG_BREAK = 'longBreak'
}

export const DEFAULT_POMODORO_DURATION = 25;
export const DEFAULT_BREAK_DURATION = 5;
export const DEFAULT_LONG_BREAK_DURATION = 10;
export const SECONDS_PER_MINUTE = 60;
export const DEFAULT_SEQUENCE = [TimeInterval.POMODOR, TimeInterval.BREAK, TimeInterval.POMODOR, TimeInterval.BREAK, TimeInterval.LONG_BREAK];

export const TIME_INTERVALT_TO_TIME = {
    [TimeInterval.POMODOR]: SECONDS_PER_MINUTE * DEFAULT_POMODORO_DURATION,
    [TimeInterval.BREAK]: SECONDS_PER_MINUTE * DEFAULT_BREAK_DURATION,
    [TimeInterval.LONG_BREAK]: SECONDS_PER_MINUTE * DEFAULT_LONG_BREAK_DURATION,
}
