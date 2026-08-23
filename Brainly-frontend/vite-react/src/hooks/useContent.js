import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Data/BackEndUrl";

export function useContent() {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get(BACKEND_URL + "/app/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh };
}