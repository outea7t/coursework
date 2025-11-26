import { InputParams, LoadCharacter, EngineType } from "./types";
import { kdTable, calcKc, calcKp, calcKr } from "./tables";

export interface CalculatedParams {
  kd: number;
  kp: number;
  kr: number;
  kc: number;
  ke: number;      // Kэ = Kп * Kр * Kс
  kv: number;
  kz1: number;
  ka: number;
  ku: number;
  kR: number;

  FeConst: number;
  Fc: number;
  pc: number;
  C: number;

  pActual: number;
  pAllow: number;
  isDurable: boolean;
}

export function calcKd(
  load: LoadCharacter,
  engine: EngineType
): number {
  return kdTable[load][engine];
}

// Kv = ³√( (n1 / 10)² )
export function calcKv(n1: number): number {
  const ratio = n1 / 10;
  return Math.cbrt(ratio * ratio);
}

// Частные коэффициенты
export function calcKz1(z1: number): number {
  return 25 / z1;
}

export function calcKa(at: number): number {
  // 4-я корень из (40 / at)
  return Math.pow(40 / at, 0.25);
}

export function calcKu(u: number): number {
  return 1 / Math.sqrt(u);
}

// Fэ при постоянном режиме: F = 1000 * N / v (N — кВт, v — м/с)
export function calcFeConst(powerKw: number, speed: number): number {
  return (1000 * powerKw) / speed;
}

// Центробежное натяжение: Fc = q * v² / 1000 (кН) → переведём в Н
export function calcFc(qKgPerM: number, speed: number): number {
  // q * v² / 1000 [кН]; умножим на 1000 => Н, в итоге Fc = q * v²
  return qKgPerM * speed * speed;
}

// Среднее давление от центробежных сил: pc = Fc / (Sоп * m)
export function calcPc(Fc: number, sop: number, m: number): number {
  return Fc / (sop * m);
}

// Коэффициент работоспособности: C = 1.33·10^6 * (Δt / t)
export function calcC(dtOverT: number): number {
  return 1.33e6 * dtOverT;
}

// Фактическое среднее давление в шарнире: p = Fэ * Kд / (Sоп * Kм)
export function calcPactual(
  Fe: number,
  kd: number,
  sop: number,
  km: number
): number {
  return (Fe * kd) / (sop * km);
}

// Расчёт допускаемого давления: [p] = C / (tч * Kд * K_R * Kэ) - 2 pc
export function calcPallow(
  C: number,
  tTotal: number,
  kd: number,
  kR: number,
  ke: number,
  pc: number
): number {
  return C / (tTotal * kd * kR * ke) - 2 * pc;
}

export function calculateAll(input: InputParams): CalculatedParams {
  const kd = calcKd(input.loadCharacter, input.engineType);
  const kp = calcKp(input.angleDegrees);
  const kr = calcKr(input.supportLocation);
  const kc = calcKc(input.lubricationMode);
  const ke = kp * kr * kc;

  const kv = calcKv(input.n1);
  const kz1 = calcKz1(input.z1);
  const ka = calcKa(input.at);
  const ku = calcKu(input.u);
  const kR = kz1 * ka * ku;

  const FeConst = calcFeConst(input.N, input.v);
  const Fc = calcFc(input.q, input.v);
  const pc = calcPc(Fc, input.sop, input.m);
  const C = calcC(input.dtOverT);

  const pActual = calcPactual(FeConst, kd, input.sop, input.km);
  const pAllow = calcPallow(C, input.tTotal, kd, kR, ke, pc);

  return {
    kd,
    kp,
    kr,
    kc,
    ke,
    kv,
    kz1,
    ka,
    ku,
    kR,
    FeConst,
    Fc,
    pc,
    C,
    pActual,
    pAllow,
    isDurable: pActual <= pAllow
  };
}
