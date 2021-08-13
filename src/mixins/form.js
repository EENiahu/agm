import errorHandler from "@/lib/ErrorHandler";

export default {
    data() {
        return {
            errors: new errorHandler(),
            disabled: false,
            loading: false,
        }
    },

    methods: {
        handleInput(name) {
            if (this.errors.has(name)) this.errors.clear(name);
        },

        deactivateSubmit() {
            this.disabled = true;
            this.loading = true;
        },

        activateSubmit() {
            this.disabled = false;
            this.loading = false;
        },

        handleSuccess(message = '') {
            this.activateSubmit();

            if (message) {
                this.$store.dispatch('alerts/set_alert', {
                    title: message,
                    type: 'success'
                });
            }
        },

        handleErrors(err) {
            this.activateSubmit();

            if (err.response) {
                if (err.response.data.errors['Message']) {
                    this.$store.dispatch('alerts/set_alert', { title: err.response.data.errors['Message'][0] });
                }
                else if (err.response.data.errors) {
                    this.errors.record(err.response.data.errors);
                }
            }
        },
    }
};
