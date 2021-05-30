import { signIn, signOut, useSession } from "next-auth/client";
import { FaSpotify } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { Button } from "../Button";
import styles from "../Button/styles.module.scss";

export function LoginButton() {
  const [session] = useSession();
  const isAutheticated = session;

  return isAutheticated ? (
    <Button onClick={() => signOut()} className={`${styles.logged}`}>
      <img src={session.user.picture} alt="User image" />
      <span>{session.user.name}</span>
      <MdExitToApp size={16} color="#FFFFFF" opacity={0.6} />
    </Button>
  ) : (
    <Button onClick={() => signIn('spotify')}>
      <FaSpotify size={24} color="#FFFFFF" />
      <span>Login with Spotify</span>
    </Button>
  );
}
