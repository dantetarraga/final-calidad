import { useEffect, useState } from "react";
import { suggestFriends } from "../services/friend";

const FriendSuggestionSideBar = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => (async () => setSuggestions(await suggestFriends()))(), []);

  return (
    
  );
};

export default FriendSuggestionSideBar;
