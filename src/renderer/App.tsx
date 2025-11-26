import React, { useState } from "react";
import { InputParams } from "@domain/types";
import { calculateAll } from "@domain/formulas";

const defaultInput: InputParams = {
  i: 1,
  sop: 120,       // мм²
  km: 1,
  m: 1,
  n1: 600,
  z1: 25,
  at: 40,
  u: 3,
  N: 5,           // кВт
  v: 6,           // м/с
  q: 3,           // кг/м
  tTotal: 10000,  // ч
  dtOverT: 0.03,  // 3 %
  loadCharacter: "calm",
  engineType: "motor_or_turbine",
  supportLocation: "moving_supports",
  lubricationMode: "optimal",
  angleDegrees: 60
};

// названия для сообщений об ошибке
const fieldLabels: Record<keyof InputParams, string> = {
  i: "Число передач, i",
  sop: "Sоп — проекция опорной поверхности",
  km: "Kм — коэффициент рядности цепи",
  m: "m — число рядов цепи",
  n1: "n₁ — частота вращения меньшего шкива",
  z1: "z₁ — число зубьев меньшего шкива",
  at: "aₜ — межосевое расстояние",
  u: "u — передаточное число передачи",
  N: "N — мощность",
  v: "vц — скорость цепи",
  q: "q — линейная плотность цепи",
  tTotal: "tₙ — общее время работы передачи",
  dtOverT: "Δt / t — допускаемое относительное удлинение",
  loadCharacter: "Характер нагрузки",
  engineType: "Тип двигателя",
  supportLocation: "Расположение опор / натяжных устройств",
  lubricationMode: "Условие смазки",
  angleDegrees: "Угол наклона линии центров"
};

export const App: React.FC = () => {
  const [input, setInput] = useState<InputParams>(defaultInput);
  const [dirty, setDirty] = useState(false);

  const calc = calculateAll(input);

  const handleChangeNumber =
    (field: keyof InputParams) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(",", ".");
      const value = parseFloat(raw);

      // если число валидное и отрицательное — выдаём ошибку и не меняем state
      if (Number.isFinite(value) && value < 0) {
        window.alert(`Параметр «${fieldLabels[field]}» не может быть отрицательным.`);
        // ничего не обновляем контролируемый инпут вернётся к прошлому значению
        return;
      }

      setDirty(true);
      setInput((prev) => ({
        ...prev,
        [field]: Number.isFinite(value) ? value : 0
      }));
    };

  const handleChangeSelect =
    <K extends keyof InputParams>(field: K) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDirty(true);
      setInput((prev) => ({
        ...prev,
        [field]: e.target.value as any
      }));
    };

  return (
    <div className="app-shell">
      <section className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Исходные данные</div>
            <div className="card-subtitle">
              Введите эмпирические параметры и выберите условия работы передачи
            </div>
          </div>
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Число передач, i</label>
            <input
              type="number"
              value={input.i}
              onChange={handleChangeNumber("i")}
            />
          </div>

          <div className="field">
            <label>Sоп — проекция опорной поверхности, мм²</label>
            <input
              type="number"
              value={input.sop}
              onChange={handleChangeNumber("sop")}
            />
          </div>

          <div className="field">
            <label>Kм — коэффициент рядности цепи</label>
            <input
              type="number"
              value={input.km}
              onChange={handleChangeNumber("km")}
            />
          </div>

          <div className="field">
            <label>m — число рядов цепи</label>
            <input
              type="number"
              value={input.m}
              onChange={handleChangeNumber("m")}
            />
          </div>

          <div className="field">
            <label>n₁ — частота вращения меньшего шкива, об/мин</label>
            <input
              type="number"
              value={input.n1}
              onChange={handleChangeNumber("n1")}
            />
          </div>

          <div className="field">
            <label>z₁ — число зубьев меньшего шкива</label>
            <input
              type="number"
              value={input.z1}
              onChange={handleChangeNumber("z1")}
            />
          </div>

          <div className="field">
            <label>aₜ — межосевое расстояние, шагов</label>
            <input
              type="number"
              value={input.at}
              onChange={handleChangeNumber("at")}
            />
          </div>

          <div className="field">
            <label>u — передаточное число передачи</label>
            <input
              type="number"
              value={input.u}
              onChange={handleChangeNumber("u")}
            />
          </div>

          <div className="field">
            <label>N — мощность, кВт</label>
            <input
              type="number"
              value={input.N}
              onChange={handleChangeNumber("N")}
            />
          </div>

          <div className="field">
            <label>vц — скорость цепи, м/с</label>
            <input
              type="number"
              value={input.v}
              onChange={handleChangeNumber("v")}
            />
          </div>

          <div className="field">
            <label>q — линейная плотность цепи, кг/м</label>
            <input
              type="number"
              value={input.q}
              onChange={handleChangeNumber("q")}
            />
          </div>

          <div className="field">
            <label>tₙ — общее время работы передачи, ч</label>
            <input
              type="number"
              value={input.tTotal}
              onChange={handleChangeNumber("tTotal")}
            />
          </div>

          <div className="field">
            <label>Δt / t — допускаемое относительное удлинение</label>
            <input
              type="number"
              value={input.dtOverT}
              onChange={handleChangeNumber("dtOverT")}
            />
          </div>

          <div className="field">
            <label>Характер нагрузки</label>
            <select
              value={input.loadCharacter}
              onChange={handleChangeSelect("loadCharacter")}
            >
              <option value="calm">Спокойная</option>
              <option value="moderate">Умеренная</option>
              <option value="heavy">Тяжёлые толчки и удары</option>
            </select>
          </div>

          <div className="field">
            <label>Тип двигателя</label>
            <select
              value={input.engineType}
              onChange={handleChangeSelect("engineType")}
            >
              <option value="ice_hydraulic">
                ДВС с гидравлическим приводом
              </option>
              <option value="motor_or_turbine">
                Электродвигатель / турбина
              </option>
              <option value="ice_mechanical">
                ДВС с механическим приводом
              </option>
            </select>
          </div>

          <div className="field">
            <label>Расположение опор / натяжных устройств</label>
            <select
              value={input.supportLocation}
              onChange={handleChangeSelect("supportLocation")}
            >
              <option value="moving_supports">Передвигающиеся опоры</option>
              <option value="tension_sprocket">
                Оттяжные звёздочки / нажимной ролик
              </option>
              <option value="fixed_distance">
                Нерегулируемое постоянное расстояние
              </option>
            </select>
          </div>

          <div className="field">
            <label>Условие смазки</label>
            <select
              value={input.lubricationMode}
              onChange={handleChangeSelect("lubricationMode")}
            >
              <option value="abundant">Обильная (циркуляционная)</option>
              <option value="optimal">Оптимальная (по рекомендациям)</option>
              <option value="permissible">Допустимая</option>
            </select>
          </div>

          <div className="field">
            <label>Угол наклона линии центров, °</label>
            <input
              type="number"
              value={input.angleDegrees}
              onChange={handleChangeNumber("angleDegrees")}
            />
          </div>
        </div>

        <button
          className="button-primary"
          onClick={() => setDirty(true)}
        >
          Пересчитать
        </button>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Результаты расчёта</div>
            <div className="card-subtitle">
              Параметры долговечности шарниров и эксплуатационные коэффициенты
            </div>
          </div>
        </div>

        <div>
          <div className="results-list">
            <Result label="Kд — коэффициент динамичности нагрузки" value={calc.kd} />
            <Result label="Kп" value={calc.kp} />
            <Result label="Kр" value={calc.kr} />
            <Result label="Kс" value={calc.kc} />
            <Result label="Kэ = Kп · Kр · Kс" value={calc.ke} />

            <Result label="Kz₁" value={calc.kz1} />
            <Result label="Ka" value={calc.ka} />
            <Result label="Ku" value={calc.ku} />
            <Result label="KR = Kz₁ · Ka · Ku" value={calc.kR} />

            <Result label="Kv — скоростной коэффициент" value={calc.kv} />
            <Result label="Fэ.и (постоянный режим), Н" value={calc.FeConst} />
            <Result label="Fc — натяжение от центробежных сил, Н" value={calc.Fc} />
            <Result label="pc — давление от центробежных сил, МПа" value={calc.pc} />
            <Result label="C — коэффициент работоспособности" value={calc.C} />
            <Result label="p — фактическое среднее давление, МПа" value={calc.pActual} />
            <Result label="[p] — допускаемое давление, МПа" value={calc.pAllow} />
          </div>
          <div className="badge-container">
            {calc.isDurable ? (
              <span className="badge badge-ok">p ≤ [p] — износ допустим</span>
            ) : (
              <span className="badge badge-bad">p &gt; [p] — износ недопустим</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

interface ResultProps {
  label: string;
  value: number;
}

const Result: React.FC<ResultProps> = ({ label, value }) => (
  <div className="result-item">
    <span className="result-label">{label}</span>
    <span className="result-value">
      {Number.isFinite(value) ? value.toFixed(3) : "—"}
    </span>
  </div>
);
