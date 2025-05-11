import { ProviderName } from "@/types";

/**
 * This file allows users to configure the AI's models and temperatures.
 * It includes settings for the intention model, random response model,
 * hostile response model, question response model, and Hyde model.
 * This will help the AI to generate responses that are more aligned
 * with the user's needs.
 *
 * Note: Optional - you don't have to change these settings!
 *
 * @file configuration/models.ts
 * @author Son Nguyen
 * @license MIT
 * @version 1.0.0
 * @date 2025-05-11
 */

export const INTENTION_MODEL: string = "gpt-4o-mini";
export const INTENTION_TEMPERATURE: number = 0.7;

export const RANDOM_RESPONSE_PROVIDER: ProviderName = "openai";
export const RANDOM_RESPONSE_MODEL: string = "gpt-4o-mini";
export const RANDOM_RESPONSE_TEMPERATURE: number = 0.7;

export const HOSTILE_RESPONSE_PROVIDER: ProviderName = "openai";
export const HOSTILE_RESPONSE_MODEL: string = "gpt-4o-mini";
export const HOSTILE_RESPONSE_TEMPERATURE: number = 0.7;

export const QUESTION_RESPONSE_PROVIDER: ProviderName = "openai";
export const QUESTION_RESPONSE_MODEL: string = "gpt-4o";
export const QUESTION_RESPONSE_TEMPERATURE: number = 0.7;

export const HYDE_MODEL: string = "gpt-4o-mini";
export const HYDE_TEMPERATURE: number = 0.7;
