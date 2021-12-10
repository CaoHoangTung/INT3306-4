import { useParams } from "react-router";
import Profile from ".";

export default function ViewProfile() {
    const { userId } = useParams();
    return <Profile userId={userId} />;
}
