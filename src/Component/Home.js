import React, { useState, useEffect } from "react";
import Axios from "axios";

function Home() {
  const [Playerdata, setPlayerData] = useState([]);
  const [search, setSearch] = useState("");
  const URL = "https://api.npoint.io/20c1afef1661881ddc9c";
  const fetcher = async () => {
    try {
      const {
        data: { playerList },
      } = await Axios(URL);
      return playerList;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setPlayerData(await fetcher());
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <input
        className="inputbox"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search your favourite player"
        value={search}
      />
      <div className="row">
        {Playerdata.filter((item) => {
          if (search === "") {
            return item;
          } else if (
            item.PFName.toLowerCase().includes(search.toLowerCase()) ||
            item.TName.toLowerCase().includes(search.toLowerCase())
          ) {
            return item;
          }
        }).map((player) => {
          return (
            <div className="col-12 col-lg-4">
              <div key={player.Id} class="card">
                <div class="card-header text-center">{player.PFName}</div>
                <div class="card-body">
                  <img
                    class="card-img-top player-img img-fluid"
                    src={require(`../Images/${player.Id}.jpg`).default}
                    alt="Player-img"
                  />
                  <div class="card-text">
                    <p>Position: {player.SkillDesc}</p>
                    <p>Value: ${player.Value}</p>
                    <p>
                      Upcoming Matches:{" "}
                      {player.UpComingMatchesList[0].CCode
                        ? player.UpComingMatchesList[0].CCode +
                          " vs " +
                          player.UpComingMatchesList[0].VsCCode
                        : "N/A"}
                    </p>
                    <h6>
                      Next Match:{" "}
                      {player.UpComingMatchesList[0].MDate
                        ? new Date(
                            `${player.UpComingMatchesList[0].MDate} UTC`
                          ).toString()
                        : "N/A"}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
