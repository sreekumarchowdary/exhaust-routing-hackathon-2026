const { app } = require("@azure/functions");

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

app.http("optimizeRoute", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",

  handler: async (request, context) => {
    // Handle browser CORS preflight request
    if (request.method === "OPTIONS") {
      return {
        status: 204,
        headers: corsHeaders,
      };
    }

    const body = await request.json();

    const pipeDiameter = Number(body.pipeDiameter);
    const bendRadius = Number(body.bendRadius);
    const bendCount = Number(body.bendCount);

    const score =
      100 -
      Math.abs(pipeDiameter - 50) * 0.5 -
      Math.abs(bendRadius - 80) * 0.2 -
      Math.abs(bendCount - 3) * 4;

    return {
      status: 200,
      headers: corsHeaders,
      jsonBody: {
        success: true,
        message: "Route optimization completed.",
        score: Math.max(0, Math.min(100, score)),
        pipeDiameter,
        bendRadius,
        bendCount,
      },
    };
  },
});