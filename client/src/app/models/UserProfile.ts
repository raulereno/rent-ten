export interface userProfile {
        id: string;
        name: string;
        picture: string;
        sub: string;
        lastname: string;
        mail: string;
        country: string;
        admin: boolean;
        verified: string;
        verificationCode: string;
        favoriteshouses: string[]
}