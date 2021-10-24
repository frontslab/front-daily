export default {
    props: {
        to: {
            type: String,
            default: '/',
        },
    },
    render(h) {
        return h(
            'a',
            { attrs: { href: `#${this.to}` } },
            this.$slots.default
        )
    }
}