import { z } from "zod";

/** A date input is either empty or a real ISO calendar date. */
function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

const optionalText = (max: number) =>
  z.string().trim().max(max).transform(value => value || null);

const optionalDate = z.string().trim().refine(
  value => !value || isIsoDate(value),
  "Ngày phải có định dạng YYYY-MM-DD và tồn tại trên lịch",
).transform(value => value || null);

function validateDateOrder(
  value: { startDate: string | null; endDate: string | null },
  ctx: z.RefinementCtx,
) {
  if (value.startDate && value.endDate && value.endDate < value.startDate) {
    ctx.addIssue({
      code: "custom",
      path: ["endDate"],
      message: "Ngày kết thúc không được trước ngày bắt đầu",
    });
  }
}

export const experienceSchema = z.object({
  company: z.string().trim().min(1).max(200),
  position: z.string().trim().min(1).max(200),
  employmentType: optionalText(100),
  location: optionalText(200),
  startDate: optionalDate,
  endDate: optionalDate,
  isCurrent: z.preprocess(
    value => value === "on" || value === "true" || value === true,
    z.boolean(),
  ),
  description: optionalText(10000),
  displayOrder: z.coerce.number().int().min(0).max(100000),
}).superRefine((value, ctx) => {
  validateDateOrder(value, ctx);
  if (value.isCurrent && value.endDate) {
    ctx.addIssue({
      code: "custom",
      path: ["endDate"],
      message: "Công việc hiện tại không được có ngày kết thúc",
    });
  }
});

export const educationSchema = z.object({
  institution: z.string().trim().min(1).max(200),
  degree: optionalText(200),
  fieldOfStudy: optionalText(200),
  startDate: optionalDate,
  endDate: optionalDate,
  description: optionalText(10000),
}).superRefine(validateDateOrder);
