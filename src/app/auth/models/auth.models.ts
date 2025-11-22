export type UserRole = 'user' | 'admin'

export interface UserProfile {
    uid: string;
    email: string;
    role: UserRole
}