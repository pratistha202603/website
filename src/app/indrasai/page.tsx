"use client";

import { useState, useEffect } from "react";

const PAGE_PASSWORD = "indra@123"; // 🔐 Change this

export default function TradeCalc() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  // ---------- TRADE STATES ----------
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");

  const [entry, setEntry] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);

  const [rrInput, setRrInput] = useState<number>(2);
  const [riskAmount, setRiskAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const [charges, setCharges] = useState<number>(45);
  const [leverage, setLeverage] = useState<number>(5);

  // ---------- PASSWORD CHECK ----------
  const handleLogin = () => {
    if (inputPassword === PAGE_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("tradeAuth", "true");
    } else {
      alert("Incorrect Password");
    }
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("tradeAuth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // ---------- STOP DISTANCES ----------
  const stopDistance =
    tradeType === "BUY" ? entry - stop : stop - entry;

  const targetDistance =
    tradeType === "BUY" ? target - entry : entry - target;

  // Auto target from RR
  useEffect(() => {
    if (entry > 0 && stop > 0 && stopDistance > 0) {
      const newTarget =
        tradeType === "BUY"
          ? entry + stopDistance * rrInput
          : entry - stopDistance * rrInput;

      setTarget(Number(newTarget.toFixed(2)));
    }
  }, [entry, stop, rrInput, tradeType]);

  // Risk including charges
  const effectiveRisk =
    riskAmount > charges ? riskAmount - charges : 0;

  const calculatedQty =
    stopDistance > 0 && effectiveRisk > 0
      ? Math.floor(effectiveRisk / stopDistance)
      : 0;

  const finalQty = quantity > 0 ? quantity : calculatedQty;

  const grossLoss = finalQty * stopDistance;
  const grossProfit = finalQty * targetDistance;

  const netLoss = finalQty > 0 ? grossLoss + charges : 0;
  const netProfit = finalQty > 0 ? grossProfit - charges : 0;

  const rr =
    stopDistance > 0
      ? (targetDistance / stopDistance).toFixed(2)
      : "0";

  const fullTradeValue = finalQty * entry;
  const intradayCapitalRequired =
    leverage > 0 ? fullTradeValue / leverage : 0;

  // ---------- PASSWORD SCREEN ----------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
        <div className="bg-slate-900 p-6 rounded-xl w-full max-w-sm space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">
            🔒 Private Access
          </h2>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 rounded bg-slate-800"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-cyan-500 rounded font-semibold"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  // ---------- MAIN CALCULATOR ----------
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pt-24">
      <div className="max-w-md mx-auto bg-slate-900 rounded-2xl p-6 shadow-xl space-y-5">

        <h1 className="text-2xl font-bold text-cyan-400">
          Intraday Trade Calculator
        </h1>

        {/* Trade Type */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Trade Type
          </label>
          <div className="flex">
            <button
              onClick={() => setTradeType("BUY")}
              className={`flex-1 p-2 rounded-l-lg ${
                tradeType === "BUY"
                  ? "bg-green-500"
                  : "bg-slate-700"
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setTradeType("SELL")}
              className={`flex-1 p-2 rounded-r-lg ${
                tradeType === "SELL"
                  ? "bg-red-500"
                  : "bg-slate-700"
              }`}
            >
              SELL
            </button>
          </div>
        </div>

        {/* Entry */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Entry Price
          </label>
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setEntry(Number(e.target.value))}
          />
        </div>

        {/* Stop */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Stop Loss Price
          </label>
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setStop(Number(e.target.value))}
          />
        </div>

        {/* RR */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Risk Reward (Example: 2 = 1:2)
          </label>
          <input
            type="number"
            step="0.1"
            value={rrInput}
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setRrInput(Number(e.target.value))}
          />
        </div>

        {/* Target */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Target Price
          </label>
          <input
            type="number"
            value={target}
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </div>

        {/* Risk */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Total Risk Amount (₹ Including Charges)
          </label>
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setRiskAmount(Number(e.target.value))}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Quantity (Optional)
          </label>
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        {/* Charges */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Total Charges (₹)
          </label>
          <input
            type="number"
            value={charges}
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setCharges(Number(e.target.value))}
          />
        </div>

        {/* Leverage */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Intraday Leverage (e.g., 5 = 5x)
          </label>
          <input
            type="number"
            value={leverage}
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setLeverage(Number(e.target.value))}
          />
        </div>

        {/* Results */}
        <div className="pt-4 border-t border-slate-700 space-y-2 text-sm">

          <p>Stop Distance: {stopDistance.toFixed(2)}</p>
          <p>Risk/Reward Ratio: {rr}</p>

          <p>Suggested Quantity: <span className="text-cyan-400">{calculatedQty}</span></p>

          <p>📦 Full Trade Value: ₹{fullTradeValue.toFixed(2)}</p>

          <p className="text-cyan-400">
            ⚡ Intraday Margin Required: ₹{intradayCapitalRequired.toFixed(2)}
          </p>

          <p className="text-red-400">
            ❌ Total Loss (Including Charges): ₹{netLoss.toFixed(2)}
          </p>

          <p className="text-green-400">
            ✅ Total Profit (After Charges): ₹{netProfit.toFixed(2)}
          </p>

        </div>
      </div>
    </div>
  );
}