import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge the class and avoid unresolved conflict
 * using clasx
 * @param inputs class that need to merge
 * @returns {string}
 */
export function mergeClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
