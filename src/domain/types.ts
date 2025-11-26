export type LoadCharacter = "calm" | "moderate" | "heavy";
export type EngineType =
  | "ice_hydraulic"
  | "motor_or_turbine"
  | "ice_mechanical";

export type SupportLocation =
  | "moving_supports"
  | "tension_sprocket"
  | "fixed_distance";

export type LubricationMode =
  | "abundant"
  | "optimal"
  | "permissible"

export interface InputParams {
  // эмпирические/задаваемые параметры
  i: number;
  sop: number;      // мм², проекция опорной поверхности
  km: number;       // коэффициент рядности цепи
  m: number;        // число рядов цепи

  n1: number;       // об/мин
  z1: number;
  at: number;       // межосевое расстояние в шагах
  u: number;        // передаточное число

  N: number;        // кВт
  v: number;        // м/с

  q: number;        // кг/м
  tTotal: number;   // ч — общее время работы передачи
  dtOverT: number;  // Δt / t (допускаемое относительное удлинение)

  loadCharacter: LoadCharacter;
  engineType: EngineType;
  supportLocation: SupportLocation;
  lubricationMode: LubricationMode;
  angleDegrees: number;
}
