module.exports = class ApiResponse {
    constructor({ data = [], error = null }) {
        this.data = data;
        this.error = error;
    }

    toJSON() {
        return {
            data: this.data,
            error: this.error,
        };
    }
}