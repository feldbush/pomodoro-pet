import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { formatTime, getDateDiff, getNow, nowPlus } from "../../helpers/dayJS";

export enum TimeInterval {
    POMODOR = 'pomodor',
    BREAK = 'break',
    LONG_BREAK = 'longBreak'
}

const DEFAULT_POMODORO_DURATION = 25;
const DEFAULT_BREAK_DURATION = 5;
const DEFAULT_LONG_BREAK_DURATION = 10;
const SECONDS_PER_MINUTE = 60;
const DEFAULT_SEQUENCE = [TimeInterval.POMODOR, TimeInterval.BREAK, TimeInterval.POMODOR, TimeInterval.BREAK, TimeInterval.LONG_BREAK];

const TIME_INTERVALT_TO_TIME = {
    [TimeInterval.POMODOR]: SECONDS_PER_MINUTE * DEFAULT_POMODORO_DURATION,
    [TimeInterval.BREAK]: SECONDS_PER_MINUTE * DEFAULT_BREAK_DURATION,
    [TimeInterval.LONG_BREAK]: SECONDS_PER_MINUTE * DEFAULT_LONG_BREAK_DURATION,
}

type TimeIntervalMap = typeof TIME_INTERVALT_TO_TIME

type timerInitialState = {
    isRun: boolean
    isPaused: boolean

    idTimerRunning?: ReturnType<typeof setTimeout>
    tillEnd: string
    timerEndDate: any
    leftSeconds: number

    sequence: Array<string>
    currentInterval: number
    currentIntervalType: string

    pomodoroCounter: number
    pomodorNumberInCycle: number
}

const initialState : timerInitialState = {
    isRun: false,
    isPaused: false,

    idTimerRunning: undefined,
    timerEndDate: '',
    leftSeconds: 0,
    tillEnd: '',
    sequence: DEFAULT_SEQUENCE,
    currentInterval: 0,
    currentIntervalType: '',

    pomodoroCounter: 0,
    pomodorNumberInCycle: 0,
}

const getCurrentTimeInterval = (map : TimeIntervalMap, sequence : Array<string>, currentInterval : number) => {
    return {
        name: sequence[currentInterval],
        timeInSeconds: map[sequence[currentInterval] as TimeInterval],
    }
}

export const setDocumentTitle = (time: string, currentIntervalType: string) => {
    document.title = dayjs(time).format('mm:ss') + ' - ' + currentIntervalType;
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        init(state) {
            const timeInterval = getCurrentTimeInterval(TIME_INTERVALT_TO_TIME, state.sequence, state.currentInterval);
            state.currentIntervalType = timeInterval.name;
            state.timerEndDate = nowPlus(timeInterval.timeInSeconds);
            state.tillEnd = formatTime(timeInterval.timeInSeconds);
        },

        run(state) {
            if(!state.isPaused) {
                const time = getCurrentTimeInterval(TIME_INTERVALT_TO_TIME, state.sequence, state.currentInterval).timeInSeconds;
                state.timerEndDate = nowPlus(time);
            } else {
                state.timerEndDate = nowPlus(state.leftSeconds);
            }
            
            state.isRun = true;
            state.isPaused = false;
        },

        tick(state) {
            if(!state.isRun) return;

            const tillEndInSeconds = getDateDiff(state.timerEndDate, getNow());
            state.tillEnd = formatTime(tillEndInSeconds);
            
            if (tillEndInSeconds === 0) {
                state.isRun = false;
                // Беру следующий этап из очереди и выставляю соотвествующие флаги
                if (state.sequence.length - 1 === state.currentInterval) {
                    state.currentInterval = 0;
                } else {
                    state.currentInterval += 1
                }

                const nextInterval = getCurrentTimeInterval(TIME_INTERVALT_TO_TIME, state.sequence, state.currentInterval);
                state.currentIntervalType = nextInterval.name;
    
                state.timerEndDate = nowPlus(nextInterval.timeInSeconds);
                const nextTillEndInSeconds = getDateDiff(state.timerEndDate, getNow());
                state.tillEnd = formatTime(nextTillEndInSeconds);
            }
        },
        
        pause(state) {
            state.isRun = false;
            state.isPaused = true;

            let t1 = new Date(state.timerEndDate);
            let t2 = new Date();
            let dif = t1.getTime() - t2.getTime();

            let Seconds_from_T1_to_T2 = dif / 1000;
            let Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

            state.leftSeconds = Seconds_Between_Dates;
        },

        stop(state) {
            state.isRun = false;
            state.isPaused = false;
            state.tillEnd = formatTime(getCurrentTimeInterval(TIME_INTERVALT_TO_TIME, state.sequence, state.currentInterval).timeInSeconds);
        },

        setTimerId(state, action : PayloadAction<ReturnType<typeof setTimeout>> ) {
            if(!state.isRun) {
                clearTimeout(action.payload);
                state.idTimerRunning = undefined;
                return;
            }
            state.idTimerRunning = action.payload;
        },
    }
});

export default timerSlice.reducer;
export const {run, setTimerId, tick, pause, stop, init} = timerSlice.actions;
