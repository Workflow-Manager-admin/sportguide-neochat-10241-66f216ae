import React from "react";

/**
 * TVGuide panel visually displays sports TV schedules
 * in a modern, responsive card/table style layout.
 * Uses placeholder/mock data for now.
 */
/**
 * Simulate async data fetching for sports TV guide schedule.
 * Replace this with real Gracenote API/Neo4j integration when endpoints and keys are available.
 */
// PUBLIC_INTERFACE
async function fetchTVGuideData() {
  // Simulated API example: resolve dummy data after a network-like delay
  const dummySchedule = [
    {
      id: 1,
      sport: "Football",
      match: "Real Madrid vs. Barcelona",
      time: "6:00 PM",
      channel: "ESPN",
      league: "La Liga",
    },
    {
      id: 2,
      sport: "Tennis",
      match: "Wimbledon Semifinal",
      time: "7:30 PM",
      channel: "Star Sports",
      league: "Wimbledon",
    },
    {
      id: 3,
      sport: "Basketball",
      match: "Lakers vs. Celtics",
      time: "8:00 PM",
      channel: "Fox Sports",
      league: "NBA",
    },
    {
      id: 4,
      sport: "Baseball",
      match: "Yankees vs. Red Sox",
      time: "9:00 PM",
      channel: "MLB Network",
      league: "MLB",
    },
    {
      id: 5,
      sport: "Soccer",
      match: "Manchester Utd vs. Liverpool",
      time: "10:30 PM",
      channel: "NBC Sports",
      league: "Premier League",
    },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(dummySchedule), 650));
}

// PUBLIC_INTERFACE
function TVGuide() {
  // State for schedule data (simulate async data fetching)
  const [schedule, setSchedule] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    fetchTVGuideData().then((data) => {
      if (isSubscribed) {
        setSchedule(data);
        setLoading(false);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <aside className="tv-guide">
      <div className="tv-guide-header">TV Sports Guide</div>
      <div className="tv-guide-content" style={{ padding: 0 }}>
        <div
          style={{
            overflowX: "auto",
            margin: 0,
            padding: "12px 0",
          }}
        >
          {loading ? (
            <div style={{ textAlign: "center", color: "#7c72dd", fontWeight: 500, margin: "2.3em 1em 2.3em 1em" }}>
              Loading schedule...
            </div>
          ) : (
            <>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  minWidth: "350px",
                  background: "none",
                  marginBottom: 0,
                  fontSize: "0.98rem",
                }}
              >
                <thead>
                  <tr style={{ background: "#eff9f1" }}>
                    <th style={thStyle}>Time</th>
                    <th style={thStyle}>Match</th>
                    <th style={thStyle}>League</th>
                    <th style={thStyle}>Channel</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((game) => (
                    <tr key={game.id} style={{ borderBottom: "1px solid #e9ecef" }}>
                      <td style={tdTimeStyle}>{game.time}</td>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 600 }}>{game.match}</span>
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: "0.96em",
                            color: "var(--text-secondary)",
                            fontWeight: 500,
                          }}
                        >
                          {sportIcon(game.sport)}{" "}
                          <span style={{ color: "var(--text-primary)", opacity: 0.70 }}>
                            {game.sport}
                          </span>
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ color: "var(--tv-guide-league-color)", fontWeight: 600 }}>
                          {game.league}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            background: "var(--chat-bot-bg)",
                            color: "var(--primary)",
                            borderRadius: 6,
                            fontSize: "0.97em",
                            padding: "2px 10px",
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                            border: "1px solid var(--border-color)",
                          }}
                        >
                          {game.channel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: "0.7em", color: "#b3b3b3", fontSize: "0.97em", textAlign: "center" }}>
                *All times shown are local timezone.
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

// Reusable header style
const thStyle = {
  padding: "9px 5px",
  borderBottom: "2px solid #e2e8f0",
  textAlign: "left",
  color: "#1e3a8a",
  fontWeight: 600,
  letterSpacing: "0.01em",
  fontSize: "1em",
  background: "#eff9f1",
};

// Table cell style
const tdStyle = {
  padding: "10px 5px",
  fontWeight: 500,
  color: "#282c34",
  borderBottom: "1px solid #f2f2f2",
  verticalAlign: "middle",
  background: "#fff",
};

const tdTimeStyle = {
  ...tdStyle,
  color: "#10b981",
  fontWeight: 600,
  background: "#f6fef8",
};

function sportIcon(sport) {
  switch (sport) {
    case "Football":
    case "Soccer":
      return "⚽️";
    case "Basketball":
      return "🏀";
    case "Tennis":
      return "🎾";
    case "Baseball":
      return "⚾️";
    default:
      return "🏟️";
  }
}

export default TVGuide;
