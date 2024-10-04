import { useEffect } from "react";
import axios from "axios";

const CandidateCardList = () => {
  useEffect(() => {
    const getCandidates = async () => {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "candidates"
      );
      console.log(response.data);
    };

    getCandidates();
  }, []);
  return <div>Hello</div>;
};
export default CandidateCardList;
