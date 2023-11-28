import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [clubName, setClubName] = useState("");
  const [city, setCity] = useState("");
  const [matchInputs, setMatchInputs] = useState([
    { homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 },
  ]);

  const addTeam = () => {
    if (clubName && city) {
      if (
        !teams.find((team) => team.clubName === clubName && team.city === city)
      ) {
        setTeams([
          ...teams,
          {
            clubName,
            city,
            matches: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
          },
        ]);
        setClubName("");
        setCity("");
      } else {
        alert("Klub sudah ada!");
      }
    } else {
      alert("Nama klub dan kota harus diisi!");
    }
  };

  const addMatch = () => {
    const isValidMatch = matchInputs.every(
      (match) =>
        match.homeTeam &&
        match.awayTeam &&
        match.homeScore !== null &&
        match.awayScore !== null
    );

    if (isValidMatch) {
      const newMatches = [...matches, ...matchInputs];
      setMatches(newMatches);

      setMatchInputs([
        { homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 },
      ]);
    } else {
      alert("Semua field pada form harus diisi!");
    }
  };

  const handleMatchInputChange = (index, field, value) => {
    const updatedMatches = [...matchInputs];
    updatedMatches[index][field] = value;
    setMatchInputs(updatedMatches);
  };

  useEffect(() => {
    const updatedTeams = [...teams];

    matches.forEach((match) => {
      const homeTeamIndex = updatedTeams.findIndex(
        (team) => team.clubName === match.homeTeam
      );
      const awayTeamIndex = updatedTeams.findIndex(
        (team) => team.clubName === match.awayTeam
      );

      updatedTeams[homeTeamIndex].matches += 1;
      updatedTeams[awayTeamIndex].matches += 1;

      if (match.homeScore > match.awayScore) {
        updatedTeams[homeTeamIndex].wins += 1;
      } else if (match.homeScore === match.awayScore) {
        updatedTeams[homeTeamIndex].draws += 1;
        updatedTeams[awayTeamIndex].draws += 1;
      } else {
        updatedTeams[awayTeamIndex].wins += 1;
      }

      updatedTeams[homeTeamIndex].goalsFor += match.homeScore;
      updatedTeams[homeTeamIndex].goalsAgainst += match.awayScore;
      updatedTeams[awayTeamIndex].goalsFor += match.awayScore;
      updatedTeams[awayTeamIndex].goalsAgainst += match.homeScore;
    });

    setTeams(updatedTeams);
  }, [matches]);

  return (
    <div className="App">
      <h1>Mini Football App</h1>

      <div>
        <h2>Menu Input Data Klub</h2>
        <form>
          <label>
            Nama Klub :
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Kota Klub :
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={addTeam}>
            Save
          </button>
        </form>
      </div>

      <div>
        <h2>Menu Input Skor</h2>
        {matchInputs.map((match, index) => (
          <form key={index}>
            <label>
              Klub {index * 2 + 1} :
              <input
                type="text"
                value={match.homeTeam}
                onChange={(e) =>
                  handleMatchInputChange(index, "homeTeam", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Klub {index * 2 + 2} :
              <input
                type="text"
                value={match.awayTeam}
                onChange={(e) =>
                  handleMatchInputChange(index, "awayTeam", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Score {index * 2 + 1} :
              <input
                type="number"
                value={match.homeScore}
                onChange={(e) =>
                  handleMatchInputChange(
                    index,
                    "homeScore",
                    Number(e.target.value)
                  )
                }
              />
            </label>
            <br />
            <label>
              Score {index * 2 + 2} :
              <input
                type="number"
                value={match.awayScore}
                onChange={(e) =>
                  handleMatchInputChange(
                    index,
                    "awayScore",
                    Number(e.target.value)
                  )
                }
              />
            </label>
            <br />
          </form>
        ))}
        <button
          type="button"
          onClick={() =>
            setMatchInputs([
              ...matchInputs,
              { homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 },
            ])
          }
          style={{ marginRight: "8px" }}
        >
          Add
        </button>
        <button type="button" onClick={addMatch} style={{ marginLeft: "8px" }}>
          Save
        </button>
      </div>

      <div>
        <h2>View Klasemen</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Klub</th>
              <th>Kota</th>
              <th>Ma</th>
              <th>Me</th>
              <th>S</th>
              <th>K</th>
              <th>GM</th>
              <th>GK</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{team.clubName}</td>
                <td>{team.city}</td>
                <td>{team.matches}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
