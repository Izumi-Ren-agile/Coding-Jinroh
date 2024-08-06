import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InsertData from "../database/UpdateData";
import { CountData } from "../database/CountData";
import { SelectData } from "../database/SelectData";
import NonhookCountData from "../database/NonhookCountData";

export const InputPlayer = () => {
  const [gameObject, setGameObject] = useState({ property: "default" });
  const navigate = useNavigate();
  const handleConfirmPlayer = () => {
    navigate("/confirmPlayerPage");
  };

  const gameObjectfileRead = () => {
    fetch("/read-gameObject")
      .then((response) => response.json())
      .then((data) => {
        if (gameObject.property === "default") {
          setGameObject(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    gameObjectfileRead();
  }, []);

  useEffect(() => {
    console.log("ゲームオブジェクト:", gameObject);
  }, [gameObject]);

  return (
    <>
      <body>
        <div>
          <header>
            <h1>プレイヤーを入力してください</h1>
          </header>
          <div class="player-input">
            <label for="player1">Player 1:</label>
            <input type="text" id="player1" name="player1" />
          </div>
          <div class="player-input">
            <label for="player2">Player 2:</label>
            <input type="text" id="player2" name="player2" />
          </div>
          <div class="player-input">
            <label for="player3">Player 3:</label>
            <input type="text" id="player3" name="player3" />
          </div>
          <div class="player-input">
            <label for="player4">Player 4:</label>
            <input type="text" id="player4" name="player4" />
          </div>
          <div class="player-input">
            <label for="player5">Player 5:</label>
            <input type="text" id="player5" name="player5" />
          </div>
          <div class="player-input">
            <label for="player6">Player 6:</label>
            <input type="text" id="player6" name="player6" />
          </div>
          <div class="player-input">
            <label for="player7">Player 7:</label>
            <input type="text" id="player7" name="player7" />
          </div>
          <div class="player-input">
            <label for="player8">Player 8:</label>
            <input type="text" id="player8" name="player8" />
          </div>
          <div class="button-container">
            <button
              id="submit-button"
              onClick={async () => {
                const players = playerCalc();
                const gameObject = await createGameObject(players);
                console.log("ゲームオブジェクトは作れているよね？",gameObject);
                await gameObjectfileWrite(gameObject);
                console.log("終わってっか？？");
                handleConfirmPlayer();
              }}
            >
              決定
            </button>
          </div>
        </div>
      </body>
    </>
  );
};
/**
 * 入力された名前をもとにプレイヤークラスのオブジェクトを返す
 * @returns プレイヤーたちのオブジェクト
 */
export const playerCalc = () => {
  class Player {
    constructor(id, name, isJinroh, color, isAlive, isPM) {
      this.id = id;
      this.name = name;
      this.isJinroh = isJinroh;
      this.color = color;
      this.isAlive = isAlive;
      this.isPM = isPM;
      this.yourMission = [];
      this.voted = 0;
      this.imagePath = "/images/image";
    }

    setStatus(isAlive) {
      this.isAlive = isAlive;
    }

    setIsPM(isPM) {
      this.isPM = isPM;
    }
  }

  const colors = [
    "lime",
    "pink",
    "aqua",
    "purple",
    "yellow",
    "orange",
    "red",
    "gray",
  ];

  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;
  const player3Name = document.getElementById("player3").value;
  const player4Name = document.getElementById("player4").value;
  const player5Name = document.getElementById("player5").value;
  const player6Name = document.getElementById("player6").value;
  const player7Name = document.getElementById("player7").value;
  const player8Name = document.getElementById("player8").value;

  const playersName = [
    player1Name,
    player2Name,
    player3Name,
    player4Name,
    player5Name,
    player6Name,
    player7Name,
    player8Name,
  ].filter((name) => {
    return name !== "";
  });

  const howManyPlayers = playersName.length;

  let howManyJinroh;
  if (howManyPlayers <= 4) {
    howManyJinroh = 1;
  } else {
    howManyJinroh = 2;
  }

  const jinrohIndex = returnRandomIndex(0, howManyPlayers - 1, howManyJinroh);
  console.log("jinrohIndex", jinrohIndex);
  const players = [];

  let counterOfJinrohIndex = 0;
  for (let i = 0; i < howManyPlayers; i++) {
    let isJinroh = false;
    if (i === jinrohIndex[counterOfJinrohIndex]) {
      isJinroh = true;
      counterOfJinrohIndex++;
    }
    const player = new Player(
      i,
      playersName[i],
      isJinroh,
      colors[i],
      true,
      false
    );
    players.push(player);
  }

  return players;
};

/**
 * ランダムな整数を複数生成し、昇順に返す
 * @param {*} min 生成される数字の最小値
 * @param {*} max 生成される数字の最大値
 * @param {*} howMany 生成される数字の個数
 * @returns 生成された整数
 */
export const returnRandomIndex = (min, max, howMany) => {
  const indexies = [];
  while (howMany !== 0) {
    const createdIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    if (!indexies.includes(createdIndex)) {
      indexies.push(createdIndex);
      howMany -= 1;
    }
  }

  const compareFunc = (a, b) => {
    return a - b;
  };
  return indexies.sort(compareFunc);
};

export const gameObjectfileWrite = async (object) => {
  await fetch("/write-gameObject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const setData = (object, collectionId, documentId) => {
  const sendObject = {
    object,
    collectionId,
    documentId,
  };

  fetch("/set-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendObject),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const readData = (collectionId, documentId) => {
  const readObject = {
    collectionId,
    documentId,
  };
  fetch("/read-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(readObject),
  })
    .then((response) => response.text())
    .then((data) => console.log("読み込みapi:", data))
    .catch((error) => console.error("Error:", error));
};

export const createGameObject = async (Players) => {
  let returnGameObject;
  const playersObject = {
    players: Players,
  };
  await fetch("/create-gameObject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playersObject),
  })
    .then((response) => response.text())
    .then((data) => returnGameObject=data)
    .catch((error) => console.error("Error:", error));

  return JSON.parse(returnGameObject);
};
