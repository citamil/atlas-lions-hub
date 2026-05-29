import { useEffect, useState } from "react";

export default function AtlasLionsHub() {

  const [team, setTeam] = useState(null);

  useEffect(() => {

    async function getMoroccoTeam() {

      const response = await fetch(
        "https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=136139"
      );

      const data = await response.json();

      console.log(data);

      setTeam(data.teams[0]);
    }

    getMoroccoTeam();

  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      {team ? (
        <div>

          <img
            src={team.strBadge}
            alt="Morocco Badge"
            width="200"
          />

          <h1>{team.strTeam}</h1>

          <p>{team.strCountry}</p>

          <p>{team.strLeague}</p>

        </div>
      ) : (
        <h2>Loading...</h2>
      )}

    </div>
  );
}
