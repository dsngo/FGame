import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getHungerTime,
  getDieTime,
  getPoopTime,
} from "./constants";
import { modFox, modScene, togglePoopBag, writeModal } from "./ul";

const gameState = {
  _clock: 1,
  _current: "INIT",
  _scene: 0,
  onCelebratingEnd() {
    this.timeCelebratingEnd = -1;
    this._current = "IDLING";
    this.onDetermineFoxState();
    togglePoopBag(false);
  },
  onCelebratingStart() {
    this._current = "CELEBRATING";
    modFox("celebrate");
    this.timeCelebrating = -1;
    this.timeCelebratingEnd = this._clock + 2;
  },
  onDeath() {
    this._current = "DEAD";
    this.onReset();

    modFox("dead");
    modScene("dead");

    writeModal("The fox died! </br> Press the middle button to start.");
  },
  onDetermineFoxState() {
    if (this._current === "IDLING") {
      if (SCENES[this._scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
  onFeed() {
    if (this._current !== "HUNGRY") {
      return;
    }

    this._current = "FEEDING";
    this.timeDie = -1;
    this.timePoop = getPoopTime(this._clock);

    this.timeCelebrating = this._clock + 2;
    modFox("eating");
  },
  onHungry() {
    this._current = "HUNGRY";
    this.timeDie = getDieTime(this._clock);
    this.timeHungry = -1;
    modFox("hungry");
  },
  onPoop() {
    this._current = "POOPING";
    this.poopTime = -1;
    this.getDieTime = getDieTime(this._clock);
    modFox("pooping");
  },
  onPoopClean() {
    if (this._current !== "POOPING") {
      return;
    }

    togglePoopBag(true);
    this.timeDie = -1;
    this.onCelebratingStart();
    this.timeHungry = getHungerTime(this._clock);
  },
  onReset() {
    this.timeCelebrating = -1;
    this.timeCelebratingEnd = -1;
    this.timeDie = -1;
    this.timeHungry = -1;
    this.timePoop = -1;
    this.timeSleep = -1;
    this.timeWake = -1;
  },
  onSleep() {
    this.state = "SLEEP";
    this.timeSleep = -1;
    this.onReset();
    this.timeWake = this._clock + NIGHT_LENGTH;

    modFox("sleep");
    modScene("night");
  },
  onStartGame() {
    this._current = "HATCHING";
    this.timeWake = this._clock + 3;

    modFox("egg");
    modScene("day");
    writeModal("");
  },
  onTick() {
    this._clock++;
    console.log(this._clock);

    if (this._clock === this.timeWake) {
      this.onWake();
    } else if (this._clock === this.timeSleep) {
      this.onSleep();
    } else if (this._clock === this.timeHungry) {
      this.onHungry();
    } else if (this._clock === this.timePoop) {
      this.onPoop();
    } else if (this._clock === this.timeDie) {
      this.onDeath();
    } else if (this._clock === this.timeCelebrating) {
      this.onCelebratingStart();
    } else if (this._clock === this.timeCelebratingEnd) {
      this.onCelebratingEnd();
    }

    return this._clock;
  },
  onUserAction(icon) {
    if (["SLEEP", "CELEBRATING", "FEEDING", "HATCHING"].includes(this._current)) {
      return;
    }

    if (["INIT", "DEAD"].includes(this._current)) {
      this.onStartGame();

      return;
    }

    switch (icon) {
      case "weather":
        this.onWeatherChange();
        break;
      case "poop":
        this.onPoopClean();
        break;
      case "fish":
        this.onFeed();
        break;
    }
  },
  onWake() {
    this._current = "IDLING";
    this.timeWake = -1;
    this._scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    this.timeSleep = this._clock + DAY_LENGTH;
    this.timeHungry = getHungerTime(this._clock);
    this.onDetermineFoxState();
  },
  onWeatherChange() {
    this._scene = (1 + this._scene) % SCENES.length;
    modScene(SCENES[this._scene]);
    this.onDetermineFoxState();
  },
  timeCelebrating: -1,
  timeCelebratingEnd: -1,
  timeDie: -1,
  timeHungry: -1,
  timePoop: -1,
  timeSleep: -1,
  timeWake: -1,
};

export default gameState;
