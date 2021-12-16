import { useParams } from "react-router";
import Search from ".";

export default function ViewSearch() {
    const { queryString } = useParams();
    return <Search queryString={queryString} />;
}
