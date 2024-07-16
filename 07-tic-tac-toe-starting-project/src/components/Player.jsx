import { useState } from "react";

export default function Player({name, symbol}) {
    const [isEditing, setIsEditing ] = useState(false);
    // isEditing이 false일 때만 name이 보여야 함
    // true이면 input이 보여야 함

    function handleClick() {
        if(!isEditing) {
            setIsEditing = true;
            name = <input type="text" />
        } else {
            setIsEditing = false;
        }
    }

    return (
      <li>
        <span className="player">
          <span className="player-name">{name}</span>
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>Edit</button>
      </li>
    );
}