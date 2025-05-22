import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getCurrentDate() {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, '0')}/${
        (now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${
        now.getHours().toString().padStart(2, '0')}:${
        now.getMinutes().toString().padStart(2, '0')}:${
        now.getSeconds().toString().padStart(2, '0')}`;

}