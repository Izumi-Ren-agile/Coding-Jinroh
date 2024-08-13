import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { PmVote } from "../page/PmVote";

export const PMVotePage = () => {
    const [gameObject, setGameObject] = useState({ property: "default" });
    const [isLoad, setIsLoad] = useState(false);
    const navigate = useNavigate();
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);

    const gameObjectfileRead = async () => {
        try {
            const response = await fetch("/read-gameObject");
            const data = await response.json();
            setGameObject(data);
            setIsLoad(true);
        } catch (error) {
            console.error("Error fetching game object:", error);
        }
    };

    const gameObjectfileWrite = async (object) => {
        try {
            const response = await fetch("/write-gameObject", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object),
            });
            console.log(await response.text());
        } catch (error) {
            console.error("Error writing game object:", error);
        }
    };

    useEffect(() => {
        gameObjectfileRead();
    }, []);

    const handleSelect = (player) => {
        setSelectedPlayerId(player.id);
    };

    const handleVote = async () => {
        const player = gameObject.players.find(p => p.id === selectedPlayerId);
        if (player) {
            player.voted++;
        }

        setSelectedPlayerId(null);

            gameObject.presentPlayer = 0;
            await gameObjectfileWrite(gameObject);
            navigate("/voteResultPage") 
    };

    return (
        <>
            {isLoad ? (
                <PmVote
                    gameObject={gameObject}
                    handleVote={handleVote}
                    selectedPlayerIndex={selectedPlayerId}
                    handleSelect={handleSelect}
                />
                
            ) : (
                <Load backgroundColor='#526D82' />
            )}
        </>
    );
};
