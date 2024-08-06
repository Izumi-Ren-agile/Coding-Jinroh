import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { Vote } from "../page/Vote";

export const VotePage = () => {
    const [gameObject, setGameObject] = useState({ property: "default" });
    const [isLoad, setIsLoad] = useState(false); //useLoad
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    //const [isVoteUpdated, setIsVoteUpdated] = useState(false); // 更新が完了したかを示すフラグ
    // const [players, setPlayers] = useState();
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
        // if (!gameObject.property) {
        //     gameObject.players.map((player) => {
        //         while (player.yourMission.length < gameObject.maxMissionNum) {
        //             player.yourMission.push(gameObject.missions[gameObject.nextMissionIndex]);
        //             gameObject.nextMissionIndex++;
        //             console.log(gameObject.nextMissionIndex);
        //             setGameObject(gameObject);
        //         }
        //         gameObjectfileWrite(gameObject); //書き込み
        //     })
        //     setCode(gameObject.editor);
        // }
    }, [gameObject]);

    // playersの状態が更新された後に実行する処理
    // useEffect(() => {
    //     if (isVoteUpdated) {
    //         //presentPlayerの値を更新
    //         gameObject.presentPlayer += 1;
    //         if (gameObject.players.length > gameObject.presentPlayer) {
    //             //players.length > presentPlayerなら/vote
    //             navigate("/votePage"); // 更新が完了した後に遷移する

    //         } else {
    //             //players.length < presentPlayerなら/voteResult
    //             navigate("/voteResult"); // 更新が完了した後に遷移する

    //         }

    //         // 状態更新後のプレイヤーの状態
    //         console.log("Players after setPlayers: ", players);

    //     }
    // }, [players, isVoteUpdated, navigate]);

    //選択されたユーザーのidを保存する
    const handleSelect = (player) => {
        setSelectedPlayerId(player.id);
    };

    //投票
    const handleVote = async () => {
        if (selectedPlayerId !== null) {
            // votedの値の更新、新しいplayerの配列を定義
            const updatedPlayers = gameObject.players.map((player) => {
                // 選択されたプレイヤーのvotedを更新
                if (player.id === selectedPlayerId) {
                    return { ...player, voted: player.voted + 1 };
                }
                return player;
            });

            gameObject.player = updatedPlayers;

            console.log("updatedPlayers", updatedPlayers)
            // プレイヤーを新しいプレイヤーに更新
 //           setPlayers(updatedPlayers);
 //           setIsVoteUpdated(true);//更新フラグを立てる
            setSelectedPlayerId(null); // 選択を初期化する

            gameObject.presentPlayer += 1;
            if (gameObject.players.length > gameObject.presentPlayer) {
                //players.length > presentPlayerなら/vote
                await gameObjectfileWrite(gameObject); //書き込み
                navigate("/votePage"); // 更新が完了した後に遷移する

            } else {
                //players.length < presentPlayerなら/voteResult
                await gameObjectfileWrite(gameObject); //書き込み
                navigate("/voteResult"); // 更新が完了した後に遷移する

            }
        }
    };

    const handleFinishTurn = () => {
        //setIsLoad(false);

        if (gameObject.gamePhase === "night") {
            gameObject.editor = code;
            gameObject.editorHistory = [...gameObject.editorHistory, { name: `day${gameObject.presentDay}-${gameObject.presentCodingTurn} ${gameObject.players[gameObject.presentPlayer].name}`, code: code }]
        }

        if (gameObject.presentPlayer < gameObject.players.length - 1) {
            gameObject.presentPlayer++;
            gameObjectfileWrite(gameObject); //書き込み
        } else {
            if (gameObject.presentCodingTurn < gameObject.maxCodingTurn) {
                gameObject.presentPlayer = 0;
                gameObject.presentCodingTurn++;
                gameObjectfileWrite(gameObject); //書き込み
            } else {
                if (gameObject.gamePhase === "night") {
                    gameObject.gamePhase = "daytime";
                    gameObjectfileWrite(gameObject); //書き込み
                } else {
                    gameObject.presentPlayer = 0;
                    if (gameObject.presentDay < gameObject.maxDay) {
                        gameObject.presentDay++;
                        gameObjectfileWrite(gameObject); //書き込み
                        navigate('/vote');
                    } else {
                        gameObjectfileWrite(gameObject); //書き込み
                        navigate('/vote');
                    }
                }
            }
        }
    };

    const handleChange = (value) => {
        setCode(value);
    };

    return (
        <>{isLoad ? (
            <Vote gameObject={gameObject} handleVote={handleVote} selectedPlayerIndex={selectedPlayerId} handleSelect={handleSelect} />
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};