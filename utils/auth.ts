import AsyncStorage from "@react-native-async-storage/async-storage";

import { BLOCK_TIME, MAX_ATTEMPTS } from "@/constants/Block";

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email.toLowerCase())
}

export const checkRateLimit = async (setBlockedUntil: (blockedUntil: number | null) => void) => {

  const now = Date.now();

  const stored = await AsyncStorage.getItem("signup_attempts")
  const attemptsData = stored ? JSON.parse(stored) : { count: 0, firstAttempt: now }

  if (now - attemptsData.firstAttempt > BLOCK_TIME) {
    await AsyncStorage.setItem("signup_attempts", JSON.stringify({ count: 0, firstAttempt: now }))
    return false
  }

  if (attemptsData.count >= MAX_ATTEMPTS) {
    setBlockedUntil(attemptsData.firstAttempt + BLOCK_TIME)
    return true
  }

  return false
}

export const registerAttempt = async () => {

  const now = Date.now()

  const stored = await AsyncStorage.getItem("signup_attempts");
  const attemptsData = stored ? JSON.parse(stored) : { count: 0, firstAttempt: now }

  if (now - attemptsData.firstAttempt > BLOCK_TIME) {
    await AsyncStorage.setItem("signup_attempts", JSON.stringify({ count: 1, firstAttempt: now }))
  } else {
    attemptsData.count += 1
    await AsyncStorage.setItem("signup_attempts", JSON.stringify(attemptsData)
    )
  }
}

export const isStrongPassword = (password: string) => {
  if (password.length < 8) return false;

  return true
}

export const isWeakPassword = (password: string) => {
  if (commonPasswords.includes(password.toLowerCase())) return false;

  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasLetter && hasNumber;
}

export const commonPasswords = [
  "123456",
  "123456789",
  "12345678",
  "12345",
  "111111",
  "000000",
  "123123",
  "password",
  "password1",
  "admin",
  "qwerty",
  "abc123",
  "letmein",
  "welcome",
  "iloveyou",
  "monkey",
  "dragon",
  "sunshine",
  "football",
  "baseball",
  "princess",
  "passw0rd"
];