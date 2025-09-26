"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { loginSchema, signupSchema, type LoginFormData, type SignupFormData } from "./schemas";

// Server actions
export async function loginAction(formData: LoginFormData) {
  try {
    // Validate the form data
    const validatedData = loginSchema.parse(formData);
    
    // TODO: Implement actual authentication logic
    console.log("Login attempt:", {
      email: validatedData.email,
      rememberMe: validatedData.rememberMe,
    });
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed
    // In a real app, you would check credentials against a database
    if (validatedData.email && validatedData.password) {
      // Set authentication cookies/session here
      redirect("/");
    } else {
      return {
        error: "Invalid email or password",
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function signupAction(formData: SignupFormData) {
  try {
    // Validate the form data
    const validatedData = signupSchema.parse(formData);
    
    // TODO: Implement actual user registration logic
    console.log("Signup attempt:", {
      name: validatedData.name,
      email: validatedData.email,
      agreeToTerms: validatedData.agreeToTerms,
    });
    
    // Simulate registration delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed
    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save user to database
    // 4. Send verification email
    
    // Redirect to login page after successful signup
    redirect("/login?message=Account created successfully. Please sign in.");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}