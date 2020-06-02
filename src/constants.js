export const TICK_RATE = 3000;
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = 0.2;
export const SCENES = ["day", "rain"];
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 4;
export const getHungerTime = (time) => ~~(Math.random() * 3) + 5 + time;
export const getPoopTime = (time) => ~~(Math.random() * 2) + 4 + time;
export const getDieTime = (time) => ~~(Math.random() * 5) + 6 + time;
