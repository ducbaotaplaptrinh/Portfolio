import { test } from "node:test";
import assert from "node:assert/strict";
import { educationSchema, experienceSchema } from "../src/lib/timeline-validation";

const experience = {
  company: "Example Company",
  position: "Software Engineer",
  employmentType: "",
  location: "",
  startDate: "2025-01-15",
  endDate: "",
  isCurrent: "on",
  description: "",
  displayOrder: "0",
};
const education = {
  institution: "Example University",
  degree: "",
  fieldOfStudy: "Software Engineering",
  startDate: "2022-09-01",
  endDate: "",
  description: "",
};

test("experience parses checkbox, nullable fields and display order", () => {
  const output = experienceSchema.parse(experience);
  assert.equal(output.isCurrent, true);
  assert.equal(output.endDate, null);
  assert.equal(output.displayOrder, 0);
  assert.equal(output.employmentType, null);
});

test("experience rejects an end date for current work", () => {
  assert.equal(
    experienceSchema.safeParse({ ...experience, endDate: "2025-12-31" }).success,
    false,
  );
});

test("experience rejects invalid dates and reversed date ranges", () => {
  assert.equal(experienceSchema.safeParse({ ...experience, startDate: "2025-02-30" }).success, false);
  assert.equal(
    experienceSchema.safeParse({ ...experience, isCurrent: undefined, endDate: "2024-12-31" }).success,
    false,
  );
});

test("education accepts an ongoing course and rejects reversed ranges", () => {
  assert.equal(educationSchema.safeParse(education).success, true);
  assert.equal(
    educationSchema.safeParse({ ...education, endDate: "2020-08-01" }).success,
    false,
  );
});

test("education rejects invalid dates and empty required institution", () => {
  assert.equal(educationSchema.safeParse({ ...education, startDate: "2025-13-01" }).success, false);
  assert.equal(educationSchema.safeParse({ ...education, institution: " " }).success, false);
});
