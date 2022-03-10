import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration);

export const makeTime = (minute : number, second : number = 0) => {
    return dayjs().minute(minute).second(second).toJSON();
}

export const nowPlus = (seconds : number) => {
    return dayjs().add(seconds, 'second').toJSON();
}

export const getDateDiff = (date1 : string, date2 : string) => {
    const d1 = dayjs(date1);
    const d2 = dayjs(date2);

    return d1.diff(d2, 'second');
}

export const formatTime = (second : number) => {
    return dayjs().minute(0).second(second).toJSON()
}

export const getNow = () => {
    return dayjs().toJSON();
}
