module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/styles/base-vars.scss";`
            }
        }
    }
}