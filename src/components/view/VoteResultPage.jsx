import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { VoteResult } from '../page/VoteResult';

export const VoteResultPage = () => {
    const [gameObject, setGameObject] = useState({ property: "default" });
    const [isLoad, setIsLoad] = useState(false); //useLoad    
    const [expelledPlayer, setExpelledPlayer] = useState(null);
    
    const navigate = useNavigate();

    const gameObjectfileRead = async () => {
        console.log(gameObject)
        await fetch("/read-gameObject")
            .then((response) => response.json())
            .then((data) => {
                setGameObject(data);
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
            .then((data) => { console.log(data); })
            .catch((error) => console.error("Error:", error));
    };

    const checkGameResult = (players) => {
        // もしコンパイル結果がアンサー通りなら

        let jinrohCount = 0;
        let citizenCount = 0;

        // isJinrohがtrueとfalseの個数をカウントする
        players.forEach(player => {
            if (player.isJinroh) {
                jinrohCount++;
            } else {
                citizenCount++;
            }
        });

        // 条件に基づいて結果を返す
        if (jinrohCount === 0) {
            return "citizen";
        } else if (jinrohCount === citizenCount) {
            return "jinroh";
        } else {
            if (gameObject.presentDay === gameObject.maxDay) {
                return "jinroh";
            }
            return "draw";
        }
    };

    useEffect(() => {
        (async () => {
            await gameObjectfileRead();
        })()
    }, [isLoad]);

    useEffect(() => {
        (async () => {
            console.log("ゲームオブジェクト:", gameObject);
            if (!gameObject.property && !isLoad) {

                // voted が最も多い値を見つける
                const maxVoted = gameObject.players.reduce((max, player) => {
                    return player.voted > max ? player.voted : max;
                }, -1);

                // voted が最も多いプレイヤーをすべて見つける
                const mostVotedPlayers = gameObject.players.filter(player => player.voted === maxVoted);

                // ランダムに1人選ぶ
                const randomIndex = Math.floor(Math.random() * mostVotedPlayers.length);
                const expelledPlayer = mostVotedPlayers[randomIndex];

                // 見つけたプレイヤーを配列から削除する
                const index = gameObject.players.indexOf(expelledPlayer);
                if (index > -1) {
                    gameObject.players.splice(index, 1);
                }

                // 勝敗判定
                gameObject.gameResult = checkGameResult(gameObject.players);

                await gameObjectfileWrite(gameObject); // 書き込み
                setExpelledPlayer(expelledPlayer);
                setIsLoad(true);
            }
        })()
    }, [gameObject]); //確認

    const handleFinishTurn = async () => {
        if (gameObject.gameResult === "draw") {
            gameObject.players.map((player) => {
                player.voted = 0;
            })
            gameObject.gamePhase = "night";
            gameObject.presentCodingTurn=1;
            gameObject.presentDay++;
            gameObject.startingTurn = Math.floor(Date.now() / 1000);
            await gameObjectfileWrite(gameObject); //書き込み
            navigate('/gamePage');
        } else {
            gameObject.gamePhase = "result";
            await gameObjectfileWrite(gameObject); //書き込み
            navigate('/resultPage');
        }
    };

    return (
        <>{isLoad ? (
            <VoteResult gameObject={gameObject} expelledPlayer={expelledPlayer} handleFinishTurn={handleFinishTurn} />
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};