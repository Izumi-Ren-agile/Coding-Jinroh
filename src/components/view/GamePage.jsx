import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Load } from "../page/Load";
import { Game } from "../page/Game";

export const GamePage = () => {
  const [gameObject, setGameObject] = useState({ property: "default" });
  const [isLoad, setIsLoad] = useState(false); //useLoad
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const gameObjectfileRead = async () => {
    console.log(gameObject);
    await fetch("/read-gameObject")
      .then((response) => response.json())
      .then((data) => {
        setGameObject(data);
        setCode(gameObject.editor);
        setIsLoad(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const gameObjectfileWrite = async (object) => {
    await fetch("/write-gameObject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    (async () => {
      await gameObjectfileRead();
      await gameObject.players.map(async (player) => {
        while (player.yourMission.length < gameObject.maxMissionNum) {
          player.yourMission.push(
            gameObject.missions[gameObject.nextMissionIndex]
          );
          gameObject.nextMissionIndex++;
        }
        await gameObjectfileWrite(gameObject); //書き込み
      });
      await gameObjectfileRead();
    })();
  }, [isLoad]);

  const handleFinishTurn = async () => {
    if (gameObject.gamePhase === "night") {
      gameObject.editor = code;
      gameObject.editorHistory = [
        ...gameObject.editorHistory,
        {
          name: `day${gameObject.presentDay}-${gameObject.presentCodingTurn} ${
            gameObject.players[gameObject.presentPlayer].name
          }`,
          code: code,
        },
      ];

      for (let i = 0; i < gameObject.players.length; i++) {
        const str1 =
          gameObject.editorHistory[
            gameObject.editorHistory.length - 2 < 0
              ? 0
              : gameObject.editorHistory.length - 2
          ].code;
        const str2 =
          gameObject.editorHistory[
            gameObject.editorHistory.length - 1 < 0
              ? 0
              : gameObject.editorHistory.length - 1
          ].code;
        console.log("ストリング1", str1);
        console.log("ストリング2", str2);
        console.log(
          "差分確認",
          getDifferences("yasyasyas", "yasteryasteryaster").added
        );
        const player = gameObject.players[i];
        console.log("プレイヤーオブジェクト中身確認", player);
        const missionObject = missionConverter(player.yourMission, str1, str2);
        gameObject.players[i].yourMission = missionObject.newYourMission;
        gameObject.players[i].solvedMission = missionObject.solvedMission;
        console.log(
          "プレイヤーのユアミッション",
          gameObject.players[i].yourMission
        );
        console.log(
          "プレイヤーのsolvedミッション",
          gameObject.players[i].solvedMission
        );
      }
    }

    if (gameObject.presentPlayer < gameObject.players.length - 1) {
      gameObject.presentPlayer++;
      await gameObjectfileWrite(gameObject); //書き込み
    } else {
      if (gameObject.presentCodingTurn < gameObject.maxCodingTurn) {
        gameObject.presentPlayer = 0;
        gameObject.presentCodingTurn++;
        await gameObjectfileWrite(gameObject); //書き込み
      } else {
        if (gameObject.gamePhase === "night") {
          gameObject.gamePhase = "daytime";
          await gameObjectfileWrite(gameObject); //書き込み
        } else {
          gameObject.presentPlayer = 0;
          gameObject.gamePhase = "vote";
          await gameObjectfileWrite(gameObject); //書き込み
          navigate("/votePage");
        }
      }
    }
    setIsLoad(false);
  };

  const handleChange = (value) => {
    setCode(value);
  };

  return (
    <>
      {isLoad ? (
        <Game
          gameObject={gameObject}
          handleFinishTurn={handleFinishTurn}
          code={code}
          handleChange={handleChange}
        />
      ) : (
        <Load backgroundColor="#526D82" />
      )}
    </>
  );
};

/**
 * 二つの文字列の差分を返す
 * @param {*} str1
 * @param {*} str2
 * @returns diff str1とstr2の差分
 */
const getDifferences = (str1, str2) => {
  let diff = {
    added: "",
    removed: "",
  };

  // 前方一致部分を特定
  let i = 0;
  while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
    i++;
  }

  // 後方一致部分を特定
  let j = 0;
  while (
    j < str1.length - i &&
    j < str2.length - i &&
    str1[str1.length - 1 - j] === str2[str2.length - 1 - j]
  ) {
    j++;
  }

  // 削除された部分
  diff.removed = str1.slice(i, str1.length - j);

  // 追加された部分
  diff.added = str2.slice(i, str2.length - j);

  return diff;
};

// 使用例
const str1 = "yasyasyas";
const str2 = "yasteryasteryaster";
const differences = getDifferences(str1, str2);
console.log("Added:", differences.added); // "terterter"
console.log("Removed:", differences.removed); // "yasyasyas"

/**
 * ミッションのargが二つの文字列の
 * @param {*} mission
 * @param {*} str1
 * @param {*} str2
 * @returns 差分にミッションのargが含まれていればtrueを返す
 */
const judgeMissionClear = (mission, str1, str2) => {
  const diff = getDifferences(str1, str2);
  return diff.added.indexOf(mission.arg) !== -1;
};

const missionConverter = (yourMission, str1, str2) => {
  const solvedMission = yourMission.filter((m) => {
    return judgeMissionClear(m, str1, str2);
  });
  const newYourMission = yourMission.filter((m) => {
    return !judgeMissionClear(m, str1, str2);
  });

  const missions = {
    solvedMission,
    newYourMission,
  };

  return missions;
};
