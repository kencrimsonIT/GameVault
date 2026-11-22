import { CalendarDays, Mail } from "lucide-react";
import { formatDate } from "../../../utils/formatDate";
import styles from "./ProfileActivity.module.scss";

type Props = {
  displayName: string;
  email: string;
  joinedAt: string;
};

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export default function ProfileHeader({ displayName, email, joinedAt }: Props) {
  return (
    <section className={styles.header}>
      <div className={styles.avatar} aria-hidden="true">
        {getInitials(displayName)}
      </div>

      <div className={styles.info}>
        <h1 className={styles.name}>{displayName}</h1>
        <p className={styles.meta}>
          <Mail size={16} aria-hidden="true" />
          {email || "Chưa cập nhật email"}
        </p>
        <p className={styles.meta}>
          <CalendarDays size={16} aria-hidden="true" />
          Tham gia từ {formatDate(joinedAt)}
        </p>
      </div>
    </section>
  );
}
