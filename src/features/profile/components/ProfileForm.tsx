import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { profileSchema } from "../schemas/profile.schema";
import type { ProfileFormValues } from "../schemas/profile.schema";
import styles from "./ProfileForm.module.scss";

type Props = {
  defaultValues: ProfileFormValues;
  onSave: (values: ProfileFormValues) => void;
};

export default function ProfileForm({ defaultValues, onSave }: Props) {
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  function onSubmit(values: ProfileFormValues) {
    onSave(values);
    reset(values);
    setSaved(true);
  }

  function handleCancel() {
    reset(defaultValues);
    setSaved(false);
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setSaved(false)}
      noValidate
    >
      <h2 className={styles.title}>Thông tin cá nhân</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="displayName">
          Tên hiển thị
        </label>
        <input
          id="displayName"
          className={styles.input}
          type="text"
          aria-invalid={!!errors.displayName}
          {...register("displayName")}
        />
        {errors.displayName && (
          <p className={styles.error} role="alert">
            {errors.displayName.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="ten@example.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className={styles.error} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Số điện thoại
          </label>
          <input
            id="phone"
            className={styles.input}
            type="tel"
            placeholder="0901234567"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className={styles.error} role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="birthday">
            Ngày sinh
          </label>
          <input
            id="birthday"
            className={styles.input}
            type="date"
            aria-invalid={!!errors.birthday}
            {...register("birthday")}
          />
          {errors.birthday && (
            <p className={styles.error} role="alert">
              {errors.birthday.message}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="bio">
          Giới thiệu
        </label>
        <textarea
          id="bio"
          className={styles.input}
          rows={4}
          placeholder="Vài dòng về bạn và thể loại game yêu thích"
          aria-invalid={!!errors.bio}
          {...register("bio")}
        />
        {errors.bio && (
          <p className={styles.error} role="alert">
            {errors.bio.message}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.saveButton} type="submit" disabled={!isDirty}>
          Lưu thay đổi
        </button>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={handleCancel}
          disabled={!isDirty}
        >
          Hủy
        </button>
        {saved && (
          <span className={styles.success} role="status">
            <Check size={16} aria-hidden="true" />
            Đã lưu thay đổi
          </span>
        )}
      </div>
    </form>
  );
}
