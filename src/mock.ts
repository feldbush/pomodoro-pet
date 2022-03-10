import dayjs from "dayjs"
// import objectSupport from 'dayjs/plugin/objectSupport';
// dayjs.extend(objectSupport);

export const taskList = [
    {
        id:1,
        name: 'Сделай красиво',
        totalTime: dayjs().set({minute:30 * 4}),
        numberTimeSegments: 4,
        currentTimeSegments: 1,
        intervalSize: dayjs().set({minutes: 25}),
        breaklSize: dayjs().set({minutes: 5})
    },
    {
        id:14,
        name: 'Сделай красиво',
        totalTime: dayjs().set({minute:30 * 4}),
        numberTimeSegments: 4,
        currentTimeSegments: 1,
        intervalSize: dayjs().set({minutes: 25}),
        breaklSize: dayjs().set({minutes: 5})
    },
    {
        id:11,
        name: 'Сделай красиво',
        totalTime: dayjs().set({minute:30 * 4}),
        numberTimeSegments: 4,
        currentTimeSegments: 1,
        intervalSize: dayjs().set({minutes: 25}),
        breaklSize: dayjs().set({minutes: 5})
    },
    {
        id:19,
        name: 'Сделай красиво',
        totalTime: dayjs().set({minute:30 * 4}),
        numberTimeSegments: 4,
        currentTimeSegments: 1,
        intervalSize: dayjs().set({minutes: 25}),
        breaklSize: dayjs().set({minutes: 5})
    },
]
