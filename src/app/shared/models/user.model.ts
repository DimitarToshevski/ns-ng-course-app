export class User {
    constructor(
        public email: string,
        public userId: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token() {
        if (
            !this._token ||
            !this._tokenExpirationDate ||
            new Date() > this._tokenExpirationDate
        ) {
            return null;
        }
        return this._token;
    }

    get isAuthenticated() {
        return !!this.token;
    }

    get timeToExpiry() {
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }
}
