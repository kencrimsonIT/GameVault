import { z } from "zod";

export const profileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Tên hiển thị tối thiểu 2 ký tự")
    .max(30, "Tên hiển thị tối đa 30 ký tự"),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .pipe(z.email("Email không hợp lệ")),
  phone: z
    .string()
    .trim()
    .regex(/^(|(0|\+84)\d{9})$/, "Số điện thoại không hợp lệ"),
  birthday: z
    .string()
    .refine((value) => value === "" || new Date(value) <= new Date(), "Ngày sinh không hợp lệ"),
  bio: z.string().trim().max(200, "Giới thiệu tối đa 200 ký tự"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
