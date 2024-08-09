import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { Load } from "../page/Load";
import { Game } from "../page/Game";
import { returnRandomIndex } from "../page/InputPlayer";

export const GamePage = () => {
  const [gameObject, setGameObject] = useState({ property: "default" });
  const [isLoad, setIsLoad] = useState(false); //useLoad
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // Fetchをリトライする関数
  const fetchWithRetry = async (
    url,
    options = {},
    retries = 3,
    backoff = 300
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        return response;
      } catch (error) {
        console.error(`Fetch attempt ${i + 1} failed: ${error.message}`);
        if (i < retries - 1) {
          await new Promise((res) => setTimeout(res, backoff));
          backoff *= 2; // Exponential backoff
        } else {
          throw error; // 最後のリトライで失敗した場合はエラーを投げる
        }
      }
    }
  };

  const gameObjectfileRead = async () => {
    console.log(gameObject);
    try {
      const response = await fetchWithRetry("/read-gameObject");
      const data = await response.json();
      setGameObject(data);
      setCode(gameObject.editor);
      setIsLoad(true);
    } catch (error) {
      console.error("gameObjectfileRead Error:", error);
      // 必要に応じてここでリトライやエラーメッセージの表示を行う
    }
  };

  const gameObjectfileWrite = async (object) => {
    try {
      const response = await fetchWithRetry("/write-gameObject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error("gameObjectfileWrite Error:", error);
      // 必要に応じてここでリトライやエラーメッセージの表示を行う
    }
  };

  /**------------------------------------------------------------------ */
  //プレイヤーの中からPMを選出する関数
  const selectPM = (players) => {
    const alivePlayers = players.filter((p) => p.isAlive);
    const howmanySolveMission = [];
    alivePlayers.map((a) => howmanySolveMission.push(a.solvedMission.length));
    let max = 0;
    let maxIndex = 0;
    for (let i = 0; i < howmanySolveMission.length; i++) {
      if (max < howmanySolveMission[i]) {
        max = howmanySolveMission[i];
        maxIndex = i;
      } else if (max === howmanySolveMission[i]) {
        if (returnRandomIndex(1, 2, 1) == 1) {
          maxIndex = i;
        }
      }
    }
    const PMid = alivePlayers[maxIndex].id;
    const returnPlayers = players;
    for (let i = 0; i < returnPlayers.length; i++) {
      if (returnPlayers[i].id === PMid) {
        returnPlayers[i].isPM = true;
      } else if (returnPlayers[i].isPM) {
        returnPlayers[i].isPM = false;
      }
    }
    return returnPlayers;
  };

  //二つの文字列の差分（足された分）を取得する関数
  const Diff = require("diff");
  const difference = (oldString, newString) => {
    // 文字単位での差分を取得
    const diff = Diff.diffChars(oldString, newString);
    console.log("check ディフ確認", diff);
    // 加えられた文字と除外された文字を初期化
    let addedChars = "";
    let removedChars = "";

    // 差分を解析
    diff.forEach((part) => {
      // if (part.added) {
      //   // 加えられた文字を記録
      //   addedChars += part.value;
      // } else if (part.removed) {
      //   // 除外された文字を記録
      //   removedChars += part.value;
      // }
      if (!oldString.includes(part.value)) {
        addedChars += part.value;
      } else if (part.value.length <= 3) {
        addedChars += part.value;
      } else if (part.added) {
        addedChars += part.value;
      }
    });
    return addedChars;
  };

  //特定の文字列が含まれる個数
  const countWords = (str, counter) => {
    const count = str.split(counter).length - 1;
    return count;
  };

  //古コードと新コードを比べ、特定の文字列が含まれている個数が新コードの方が多い場合、trueを返す
  const compare = (oldCode, newCode, counter) => {
    console.log("check 調査対象文字列：", counter);
    const oldCount = countWords(oldCode, counter);
    console.log("check 古いコードに含まれる", oldCount);
    const newCount = countWords(newCode, counter);
    console.log("check 新しいコードに含まれる", newCount);
    return newCount > oldCount ? true : false;
  };
  /**------------------------------------------------------------------ */

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
    //次に行く際にコンパイルを強制し、遷移先をResultへ
    const adjustedCode = "public class Main{" + gameObject.main + code + "}";
    let isComplete = false;

    //ミッション達成処理
    let howmanyMission = 0;

    const oldCode =
      gameObject.editorHistory[gameObject.editorHistory.length - 1].code;
    const newCode = code;

    console.log("check OldCode:", oldCode);
    console.log("check NewCode:", newCode);

    const nowPlayer = gameObject.players[gameObject.presentPlayer];
    console.log("check yourMission:", nowPlayer.yourMission);
    const targetIndex = [];
    for (let i = 0; i < nowPlayer.yourMission.length; i++) {
      if (compare(oldCode, newCode, nowPlayer.yourMission[i].arg)) {
        howmanyMission++;
        targetIndex.push(i);
      }
    }
    function removeIndexes(arr, indexesToRemove) {
      return arr.filter((_, index) => !indexesToRemove.includes(index));
    }
    nowPlayer.yourMission=removeIndexes(nowPlayer.yourMission,targetIndex);

    //確認ダイアログ
    swal
      .fire({
        title: "コーディングお疲れ様です！",
        confirmButtonText: "コードチェックを開始",
      })
      .then(function () {
        //処理中ダイアログ
        swal.fire({
          title: "コーディングチェック中",
          html: "処理終了まで画面はそのままにしてください。",
          allowOutsideClick: false, //枠外をクリックしても画面を閉じない
          showConfirmButton: false,
          didOpen: () => {
            swal.showLoading();
          },
        });

        //プロジェクトが達成できているか、ミッション達成数を返す
        const codeCheck = async () => {
          try {
            const response = await fetchWithRetry("/compile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                language: gameObject.codeLanguage,
                sourceCode: adjustedCode,
              }), // 言語とソースコードをリクエストボディに含める
            });

            if (!response.ok) {
              // レスポンスが成功していない場合はエラーメッセージを取得
              const errorResponse = await response.json();
              throw new Error(
                errorResponse.message || "コンパイル中にエラーが発生しました"
              );
            }

            const result = await response.json(); // レスポンスをJSONとして解析
            isComplete = !result.stdout.includes("×");
          } catch (error) {
            console.log("次の人へでのコンパイルと勝利判定でエラー", error);
          }
        };

        codeCheck().then(function () {
          //完了ダイアログ
          swal
            .fire({
              title: "コードチェック完了",
              text: `プロジェクト達成判定：${isComplete ? "達成" : "未達成"}
              このターンのミッション達成数：${howmanyMission}`,
              // text:`このターンのミッション達成数：${howmanyMission}`,
              // text:`累計ミッション達成数:${gameObject.presentPlayer.solvedMission.length}`,
              // text:`現在のPM${gameObject.players.filter((p)=>p.isPM)[0]}`,
              confirmButtonText: "次のターンへ",
            })
            .then(function () {
              console.log("処理終了後に画面更新");

              const changeTurn = async () => {
                if (isComplete) {
                  gameObject.gameResult = "citizen";
                  gameObject.gamePhase = "result";
                  await gameObjectfileWrite(gameObject); //書き込み
                  navigate("/resultPage");
                }
                /**--------------------------- */
                //PM判定
                console.log("ちゃんと", gameObject.players);
                console.log(
                  "ちゃんとPM判定を終えたプレイヤーオブジェクトたちが帰ってきてるか",
                  selectPM(gameObject.players)
                );

                if (gameObject.gamePhase === "night") {
                  gameObject.editor = code;
                  gameObject.editorHistory = [
                    ...gameObject.editorHistory,
                    {
                      name: `day${gameObject.presentDay}-${
                        gameObject.presentCodingTurn
                      } ${gameObject.players[gameObject.presentPlayer].name}`,
                      code: code,
                    },
                  ];
                }

                if (gameObject.presentPlayer < gameObject.players.length - 1) {
                  gameObject.presentPlayer++;
                  gameObject.startingTurn = Math.floor(Date.now() / 1000);
                  await gameObjectfileWrite(gameObject); //書き込み
                } else {
                  if (gameObject.presentCodingTurn < gameObject.maxCodingTurn) {
                    gameObject.presentPlayer = 0;
                    gameObject.presentCodingTurn++;
                    gameObject.startingTurn = Math.floor(Date.now() / 1000);
                    await gameObjectfileWrite(gameObject); //書き込み
                  } else {
                    if (gameObject.gamePhase === "night") {
                      gameObject.gamePhase = "daytime";
                      gameObject.startingTurn = Math.floor(Date.now() / 1000);
                      await gameObjectfileWrite(gameObject); //書き込み
                    } else {
                      gameObject.presentPlayer = 0;
                      gameObject.gamePhase = "vote";
                      gameObject.startingTurn = Math.floor(Date.now() / 1000);
                      await gameObjectfileWrite(gameObject); //書き込み
                      navigate("/votePage");
                    }
                  }
                }
                setIsLoad(false);
              };
              changeTurn();
            });
        });
      });
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
