import { useState } from "react";

import {
  Gauge,
  RotateCcw,
  Route,
  Settings2,
  CheckCircle2,
} from "lucide-react";

function ExhaustManifold() {
  const [pipeDiameter, setPipeDiameter] = useState(50);
  const [bendRadius, setBendRadius] = useState(80);
  const [bendCount, setBendCount] = useState(3);

  const [optimized, setOptimized] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate a local preview score
  const calculateScore = () => {
    const score =
      100 -
      Math.abs(pipeDiameter - 50) * 0.5 -
      Math.abs(bendRadius - 80) * 0.2 -
      Math.abs(bendCount - 3) * 4;

    return Math.max(0, Math.min(100, score)).toFixed(0);
  };

  // Call Azure Function
  const optimizeRoute = async () => {
    setLoading(true);
    setOptimized(false);
    setError("");

    try {
      const response = await fetch(
        "https://exhaust-routing-api-2026-brdkd2dsgfgwfmh7.eastasia-01.azurewebsites.net/api/optimizeRoute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pipeDiameter,
            bendRadius,
            bendCount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Azure Function request failed.");
      }

      const data = await response.json();

      setOptimizationScore(Math.round(data.score));
      setOptimized(true);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to Azure Function. Make sure the API is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset all values
  const reset = () => {
    setPipeDiameter(50);
    setBendRadius(80);
    setBendCount(3);
    setOptimized(false);
    setOptimizationScore(null);
    setError("");
  };

  /*
    Generate a dynamic SVG routing path.

    The path changes according to bendCount.
    Supported values: 1 to 6.
  */

  const getRoutingPath = () => {
    const paths = {
      1: `
        M 70 110
        L 190 110
        Q 220 110 220 80
        L 220 60
        Q 220 35 250 35
        L 440 35
      `,

      2: `
        M 70 110
        L 140 110
        Q 165 110 165 80
        L 165 55
        Q 165 30 190 30
        L 300 30
        Q 325 30 325 55
        L 325 80
        Q 325 110 350 110
        L 440 110
      `,

      3: `
        M 70 110
        L 130 110
        Q 155 110 155 80
        L 155 55
        Q 155 30 180 30
        L 240 30
        Q 265 30 265 55
        L 265 95
        Q 265 120 290 120
        L 350 120
        Q 375 120 375 95
        L 375 65
        Q 375 40 400 40
        L 440 40
      `,

      4: `
        M 70 110
        L 115 110
        Q 140 110 140 85
        L 140 55
        Q 140 30 165 30
        L 210 30
        Q 235 30 235 55
        L 235 105
        Q 235 130 260 130
        L 300 130
        Q 325 130 325 105
        L 325 55
        Q 325 30 350 30
        L 390 30
        Q 415 30 415 55
        L 415 80
        Q 415 110 440 110
      `,

      5: `
        M 70 110
        L 105 110
        Q 130 110 130 85
        L 130 55
        Q 130 30 155 30
        L 190 30
        Q 215 30 215 55
        L 215 105
        Q 215 130 240 130
        L 270 130
        Q 295 130 295 105
        L 295 55
        Q 295 30 320 30
        L 350 30
        Q 375 30 375 55
        L 375 105
        Q 375 130 400 130
        L 430 130
        Q 450 130 450 110
      `,

      6: `
        M 70 110
        L 100 110
        Q 120 110 120 90
        L 120 55
        Q 120 30 140 30
        L 165 30
        Q 185 30 185 55
        L 185 105
        Q 185 125 205 125
        L 230 125
        Q 250 125 250 105
        L 250 55
        Q 250 30 270 30
        L 295 30
        Q 315 30 315 55
        L 315 105
        Q 315 125 335 125
        L 360 125
        Q 380 125 380 105
        L 380 55
        Q 380 30 400 30
        L 425 30
        Q 445 30 445 50
        L 445 80
      `,
    };

    return paths[bendCount] || paths[3];
  };

  const routingPath = getRoutingPath();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {/* HEADER */}

        <h1
          style={{
            marginBottom: "5px",
          }}
        >
          Exhaust Manifold Routing
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Exhaust manifold with bent tube routing — Azure-powered optimization
          interface.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {/* INPUT PANEL */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>
              <Settings2
                size={20}
                style={{
                  verticalAlign: "middle",
                }}
              />{" "}
              Routing Parameters
            </h2>

            {/* PIPE DIAMETER */}

            <label>
              Pipe Diameter: <strong>{pipeDiameter} mm</strong>
            </label>

            <input
              type="range"
              min="30"
              max="80"
              value={pipeDiameter}
              onChange={(e) => setPipeDiameter(Number(e.target.value))}
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />

            {/* BEND RADIUS */}

            <label>
              Bend Radius: <strong>{bendRadius} mm</strong>
            </label>

            <input
              type="range"
              min="40"
              max="150"
              value={bendRadius}
              onChange={(e) => setBendRadius(Number(e.target.value))}
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />

            {/* BEND COUNT */}

            <label>
              Number of Bends: <strong>{bendCount}</strong>
            </label>

            <input
              type="range"
              min="1"
              max="6"
              value={bendCount}
              onChange={(e) => setBendCount(Number(e.target.value))}
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={optimizeRoute}
                disabled={loading}
                style={{
                  padding: "12px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  background: "#111827",
                  color: "white",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <Route
                  size={17}
                  style={{
                    verticalAlign: "middle",
                    marginRight: "5px",
                  }}
                />

                {loading ? "Optimizing..." : "Optimize Route"}
              </button>

              <button
                onClick={reset}
                style={{
                  padding: "12px 18px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: "white",
                }}
              >
                <RotateCcw
                  size={17}
                  style={{
                    verticalAlign: "middle",
                    marginRight: "5px",
                  }}
                />

                Reset
              </button>
            </div>

            {/* ERROR */}

            {error && (
              <p
                style={{
                  color: "red",
                  marginTop: "15px",
                  fontWeight: "bold",
                }}
              >
                {error}
              </p>
            )}
          </div>

          {/* RESULT PANEL */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>
              <Gauge
                size={20}
                style={{
                  verticalAlign: "middle",
                }}
              />{" "}
              Routing Result
            </h2>

            {/* DYNAMIC ROUTING VISUALIZATION */}

            <div
              style={{
                height: "220px",
                border: "2px dashed #aaa",
                borderRadius: "10px",
                margin: "20px 0",
                position: "relative",
                overflow: "hidden",
                background: "#fafafa",
              }}
            >
              {/* ENGINE */}

              <div
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "98px",
                  fontWeight: "bold",
                  fontSize: "13px",
                  zIndex: 2,
                }}
              >
                Engine
              </div>

              {/* SVG */}

              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 160"
                preserveAspectRatio="none"
              >
                {/* MAIN PIPE */}

                <path
                  d={routingPath}
                  fill="none"
                  stroke="#374151"
                  strokeWidth={Math.max(
                    8,
                    Math.min(16, pipeDiameter / 4)
                  )}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* INNER FLOW LINE */}

                <path
                  d={routingPath}
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="3"
                  strokeDasharray="9 7"
                  strokeLinecap="round"
                />

                {/* FLOW ARROW */}

                <text x="245" y="145" fontSize="16" fontWeight="bold">
                  →
                </text>
              </svg>

              {/* EXHAUST */}

              <div
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "22px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                Exhaust
              </div>

              {/* ROUTING INFO */}

              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  color: "#777",
                  whiteSpace: "nowrap",
                }}
              >
                {bendCount}-Bend Tube Routing
              </div>
            </div>

            {/* SCORE */}

            <p>
              Route Optimization Score:{" "}
              <strong>
                {optimizationScore !== null
                  ? `${optimizationScore}%`
                  : `${calculateScore()}%`}
              </strong>
            </p>

            {/* SUCCESS MESSAGE */}

            {optimized && (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                <CheckCircle2
                  size={18}
                  style={{
                    verticalAlign: "middle",
                    marginRight: "5px",
                  }}
                />

                Route optimization completed using Azure Function.
              </p>
            )}

            {/* PARAMETERS */}

            <p>
              Diameter: <strong>{pipeDiameter} mm</strong>
            </p>

            <p>
              Bend Radius: <strong>{bendRadius} mm</strong>
            </p>

            <p>
              Bends: <strong>{bendCount}</strong>
            </p>
          </div>
        </div>

        {/* FOOTER */}

        <p
          style={{
            marginTop: "25px",
            color: "#777",
            fontSize: "13px",
          }}
        >
          Optimization requests are processed through the Azure Functions API.
        </p>
      </div>
    </div>
  );
}

export default ExhaustManifold;