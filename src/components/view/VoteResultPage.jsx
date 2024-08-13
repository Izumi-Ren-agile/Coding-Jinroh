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
        let jinrohCount = 0;
        let citizenCount = 0;

        players.forEach(player => {
            if (player.isJinroh) {
                jinrohCount++;
            } else {
                citizenCount++;
            }
        });

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
            setIsLoad(true);
        })();
    }, []);

    useEffect(() => {
        if (isLoad) {
            (async () => {
                if (!gameObject.property) {
                    const maxVoted = gameObject.players.reduce((max, player) => {
                        return player.voted > max ? player.voted : max;
                    }, -1);

                    const mostVotedPlayers = gameObject.players.filter(player => player.voted === maxVoted);

                    if (mostVotedPlayers.length >= 2) {
                        console.log("2名以上最大投票数のプレイヤーがいます。PM判定に移ります");
                        navigate("/pmVoteResult");
                    } else {
                        const randomIndex = Math.floor(Math.random() * mostVotedPlayers.length);
                        const expelledPlayer = mostVotedPlayers[randomIndex];
                        
                        const newGameObject = { ...gameObject, players: [...gameObject.players] };
                        const index = newGameObject.players.indexOf(expelledPlayer);
                        if (index > -1) {
                            newGameObject.players.splice(index, 1);
                        }

                        newGameObject.gameResult = checkGameResult(newGameObject.players);

                        await gameObjectfileWrite(newGameObject);
                        setExpelledPlayer(expelledPlayer);
                        setGameObject(newGameObject);
                    }
                }
            })();
        }
    }, [isLoad, gameObject]);

    const handleFinishTurn = async () => {
        const newGameObject = { ...gameObject, players: [...gameObject.players] };

        if (newGameObject.gameResult === "draw") {
            newGameObject.players.forEach(player => {
                player.voted = 0;
            });
            newGameObject.gamePhase = "night";
            newGameObject.presentDay++;
            newGameObject.startingTurn = Math.floor(Date.now() / 1000);
            await gameObjectfileWrite(newGameObject);
            navigate('/gamePage');
        } else {
            newGameObject.gamePhase = "result";
            await gameObjectfileWrite(newGameObject);
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
