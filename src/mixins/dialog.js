export default {
    props: {
        open: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        emitClose() {
            this.$emit("close-dialog");
        }
    }
};
