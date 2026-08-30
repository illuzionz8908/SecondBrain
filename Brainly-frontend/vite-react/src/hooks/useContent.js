// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../Data/BackEndUrl";

// export function useContent() {
//   const [contents, setContents] = useState([]);

//   function refresh() {
//     axios
//       .get(BACKEND_URL + "/app/v1/content", {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setContents(response.data.content);
//       })
//       .catch((error) => {
//         console.error("Error fetching content:", error);
//       });
//   }

//   useEffect(() => {
//     refresh();

//     const interval = setInterval(() => {
//       refresh();
//     }, 10 * 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return { contents, refresh };
// }


import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../Data/BackEndUrl";

export function useContent(searchQuery = "") {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);

    //useCallback makes refresh() update whenever searchQuery changes
    const refresh = useCallback((showLoader = false) => {
        if(showLoader){
          setLoading(true);   // Only show skeleton on initial/search load
        }

        let url = BACKEND_URL + "/app/v1/content";
        if (searchQuery.trim()) {
            url += `?search=${encodeURIComponent(searchQuery)}`;
        }

        axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data.content || []);
            })
            .catch((error) => {
                console.error("Failed to fetch contents", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchQuery]); // Recreates refresh() when searchQuery changes

    useEffect(() => {
        refresh(true);

        // Optional: re-enable auto-refresh every 10 seconds
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => clearInterval(interval);
        
    }, [refresh]); //Re-runs when refresh() itself changes

    return { contents, refresh, loading };
}
