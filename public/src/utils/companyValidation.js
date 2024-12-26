// utils/validationSchemas.js
import { z } from "zod";

export const companyRegisterSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(3, "Company name must be at least 3 characters long."),
    street: z.string().trim().min(1, "Street address is required.").max(100),
    city: z
      .string()
      .trim()
      .min(1, "City is required")
      .max(50, "City must be less than 50 characters"),
    state: z
      .string()
      .trim()
      .min(1, "State is required")
      .max(50, "State must be less than 50 characters"),
    postalCode: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Please provide a valid postal code"),
    country: z
      .string()
      .trim()
      .min(1, "Country is required")
      .max(50, "Country must be less than 50 characters"),
    contactEmail: z.string().email("Invalid email format"),
    contactPhone: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    repassword: z.string().trim(),
  })
  .refine((values) => values.password === values.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });
