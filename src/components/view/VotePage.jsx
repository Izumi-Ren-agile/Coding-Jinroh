import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { Vote } from "../page/Vote";

export const VotePage = () => {
    const [gameObject, setGameObject] = useState({ property: "default" });
    const [isLoad, setIsLoad] = useState(false); //useLoad
    const navigate = useNavigate();
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);

    const gameObjectfileRead = async () => {
        console.log(gameObject)
        await fetch("/read-gameObject")
            .then((response) => response.json())
            .then((data) => {
                setGameObject(data);
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
            .then((data) => { console.log(data); })
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        gameObjectfileRead();
    }, [isLoad]);

    useEffect(() => {
        console.log("ゲームオブジェクト:", gameObject);
    }, [gameObject]);

    //選択されたユーザーのidを保存する
    const handleSelect = (player) => {
        setSelectedPlayerId(player.id);
    };

    //投票
    const handleVote = async () => {
        // votedの値の更新、新しいplayerの配列を定義
        gameObject.players.map((player) => {
            // 選択されたプレイヤーのvotedを更新
            if (player.id === selectedPlayerId) {
                player.voted++;
            }
        });

        setSelectedPlayerId(null); // 選択を初期化する

        if (gameObject.presentPlayer < gameObject.players.length - 1) {
            gameObject.presentPlayer++;
            gameObject.startingTurn = Math.floor(Date.now() / 1000);
            await gameObjectfileWrite(gameObject); //書き込み
            setIsLoad(false)
            // navigate("/votePage"); // 更新が完了した後に遷移する

        } else {
            gameObject.presentPlayer = 0;
            gameObject.startingTurn = Math.floor(Date.now() / 1000);
            await gameObjectfileWrite(gameObject); //書き込み
            console.log("投票完了、ｐｍか結果画面に遷移")

            if (!gameObject.property) {
                const maxVoted = gameObject.players.reduce((max, player) => {
                    return player.voted > max ? player.voted : max;
                }, -1);

                const mostVotedPlayers = gameObject.players.filter(player => player.voted === maxVoted);
                console.log(mostVotedPlayers)
                if (mostVotedPlayers.length >= 2) {
                    console.log("2名以上最大投票数のプレイヤーがいます。PM判定に移ります");
                    navigate("/pmVotePage");
                }else{
                    navigate("/voteResultPage"); // 更新が完了した後に遷移する
                }
        }}
    };

    return (
        <>{isLoad ? (
            <Vote gameObject={gameObject} handleVote={handleVote} selectedPlayerIndex={selectedPlayerId} handleSelect={handleSelect} />
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};