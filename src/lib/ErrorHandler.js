class ErrorHandler {
    constructor() {
        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    record(errors = '') {
        this.errors = errors;
    }

    clear(field) {
        if (this.has(field)) {
            delete this.errors[field];
            this.errors = Object.assign({}, this.errors);
        }
    }

    clearAll() {
        this.errors = {};
    }
}

module.exports = ErrorHandler;
