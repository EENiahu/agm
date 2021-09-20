module.exports = {
    findAncestor(el, sel) {
        if (el == null) return false;
        while ((el = el.parentElement)
        && !(el.matches
            || el.matchesSelector
            || el.webkitMatchesSelector
            || el.mozMatchesSelector
            || el.msMatchesSelector).call(el, sel)) {}
        return el;
    },

    nextEl(el, sel) {
        while ((el = el.nextElementSibling) && !((el.matches || el.matchesSelector).call(el, sel)));
        return el;
    },

    prevEl(el, sel) {
        while ((el = el.previousElementSibling) && !((el.matches || el.matchesSelector).call(el, sel)));
        return el;
    },

    is_touch_device() {
        let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        let mq = function(query) {
            return window.matchMedia(query).matches;
        };

        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }

        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        let query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    },

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0,
                v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    },

    removeObjectById(arr, id) {
        let index = null;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) index = i;
        }

        if (index != null) arr.splice(index, 1);
    },

    replaceObjectById(arr, id, obj) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) arr[i] = obj;
        }

        return false;
    },

    getObjectById(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) return arr[i];
        }

        return false;
    },

    getObjectIndexById(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) return i;
        }

        return false;
    },
};
