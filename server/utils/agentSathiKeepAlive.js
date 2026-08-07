const cron = require("node-cron");
const axios = require("axios");

const ENABLED = process.env.AGENT_KEEP_ALIVE === "false";
const URL = process.env.AGENT_SATHI_URL;
const INTERVAL = process.env.AGENT_KEEP_ALIVE_INTERVAL || "*/5 * * * *";

function startAgentSathiKeepAlive() {
  if (!ENABLED) {
    console.log("⚪ AgentSathi Keep Alive is disabled.");
    return;
  }

  if (!URL) {
    console.warn("⚠️ AGENT_SATHI_URL is not configured.");
    return;
  }

  console.log("🚀 ===============================================");
  console.log("🤝 AgentSathi Keep Alive Service Started");
  console.log("🌐 URL      :", URL);
  console.log("⏱️ Schedule :", INTERVAL);
  console.log("🚀 ===============================================");

  cron.schedule(INTERVAL, async () => {
    const startedAt = Date.now();

    try {
      const response = await axios.get(URL, {
        timeout: 30000,
      });

      const duration = Date.now() - startedAt;

      console.log("🩺 ===============================================");
      console.log("🤝 AgentSathi Health Check");
      console.log("⏰ Time     :", new Date().toLocaleString());
      console.log("✅ Status   :", response.status);
      console.log("💚 Health   :", response.data.status || "UNKNOWN");
      console.log("⚡ Duration :", `${duration} ms`);
      console.log("🩺 ===============================================");
    } catch (error) {
      const duration = Date.now() - startedAt;

      console.error("❌ ===============================================");
      console.error("🚨 AgentSathi Health Check Failed");
      console.error("⏰ Time     :", new Date().toLocaleString());
      console.error("⚡ Duration :", `${duration} ms`);
      console.error(
        "💥 Error    :",
        error.response?.status
          ? `${error.response.status} ${error.response.statusText}`
          : error.message,
      );
      console.error("❌ ===============================================");
    }
  });
}

module.exports = startAgentSathiKeepAlive;
