import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import { Load } from "../page/Load";
import { Game } from "../page/Game";
import { returnRandomIndex } from "../page/InputPlayer";

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

  /**------------------------------------------------------------------ */
  //プレイヤーの中からPMを選出する関数
  const selectPM=(players)=>{
    const alivePlayers=players.filter((p)=>p.isAlive);
   const howmanySolveMission=[];
    alivePlayers.map((a)=>howmanySolveMission.push(a.solvedMission.length));
    let max=0;
    let maxIndex=0;
    for(let i=0;i<howmanySolveMission.length;i++){
      if(max<howmanySolveMission[i]){
        max=howmanySolveMission[i];
        maxIndex=i;
      }else if(max===howmanySolveMission[i]){
        if(returnRandomIndex(1,2,1)==1){
          maxIndex=i;
        }
      }
    }
    const PMid=alivePlayers[maxIndex].id;
    const returnPlayers=players;
    for(let i=0;i<returnPlayers.length;i++){
      if(returnPlayers[i].id===PMid){
        returnPlayers[i].isPM=true;
      }else if(returnPlayers[i].isPM){
        returnPlayers[i].isPM=false;
      }
    }
    return returnPlayers;
  }
  /**------------------------------------------------- */

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
    const adjustedCode = "public class Main{" + gameObject.main + code + '}';
    let isComplete = false;

    //確認ダイアログ
    swal.fire({
      title: 'コーディングお疲れ様です！',
      confirmButtonText: 'コードチェックを開始'
    }).then(function () {

      //処理中ダイアログ
      swal.fire({
        title: 'コーディングチェック中'
        , html: '処理終了まで画面はそのままにしてください。'
        , allowOutsideClick: false     //枠外をクリックしても画面を閉じない
        , showConfirmButton: false
        , didOpen: () => {
          swal.showLoading();
        }
      });

      //プロジェクトが達成できているか、ミッション達成数を返す
      const codeCheck = async () => {
        try {
          const response = await fetch("/compile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ language: gameObject.codeLanguage, sourceCode: adjustedCode }), // 言語とソースコードをリクエストボディに含める
          });

          if (!response.ok) {
            // レスポンスが成功していない場合はエラーメッセージを取得
            const errorResponse = await response.json();
            throw new Error(
              errorResponse.message || "コンパイル中にエラーが発生しました"
            );
          }

          const result = await response.json(); // レスポンスをJSONとして解析
          isComplete = !result.stdout.includes('×');
        } catch (error) {
          console.log("次の人へでのコンパイルと勝利判定でエラー", error);
        }
      }

      codeCheck().then(function () {

        //完了ダイアログ
        swal.fire({
          title: 'コードチェック完了',
          text: `プロジェクト達成判定：${isComplete ? "達成" : "未達成"}`, confirmButtonText: '次のターンへ'
        }).then(function () {
          console.log('処理終了後に画面更新');

          const changeTurn = async () => {
            if (isComplete) {
              gameObject.gameResult = "citizen";
              gameObject.gamePhase = "result";
              await gameObjectfileWrite(gameObject); //書き込み
              navigate("/resultPage");
            }
            /**--------------------------- */


            if (gameObject.gamePhase === "night") {
              gameObject.editor = code;
              gameObject.editorHistory = [
                ...gameObject.editorHistory,
                {
                  name: `day${gameObject.presentDay}-${gameObject.presentCodingTurn} ${gameObject.players[gameObject.presentPlayer].name
                    }`,
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
          }
          changeTurn();
        })
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
