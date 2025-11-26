import {
  EngineType,
  LoadCharacter,
  LubricationMode,
  SupportLocation
} from "./types";

// Таблица 4.4: Kд(load, engine)
export const kdTable: Record<
  LoadCharacter,
  Record<EngineType, number>
> = {
  calm: {
    ice_hydraulic: 1.0,
    motor_or_turbine: 1.0,
    ice_mechanical: 1.2
  },
  moderate: {
    ice_hydraulic: 1.2,
    motor_or_turbine: 1.3,
    ice_mechanical: 1.4
  },
  heavy: {
    ice_hydraulic: 1.4,
    motor_or_turbine: 1.5,
    ice_mechanical: 1.7
  }
};

// Таблица 4.5: частные эксплуатационные коэффициенты

export function calcKp(angleDeg: number): number {
  // до 70° включительно — 1; свыше 70° — 1.25
  return angleDeg <= 70 ? 1.0 : 1.25;
}

export function calcKr(location: SupportLocation): number {
  switch (location) {
    case "moving_supports":
      return 1.0;
    case "tension_sprocket":
      return 1.15;
    case "fixed_distance":
      return 1.25;
  }
}

export function calcKc(mode: LubricationMode): number {
  switch (mode) {
    case "abundant":
      return 0.8;
    case "optimal":
      return 1.0;
    case "permissible":
      return 1.5;
  }
}
