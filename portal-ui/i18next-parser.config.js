module.exports = {
    createOldCatalogs: false,
    // Save the \_old files

    defaultValue: '__STRING_NOT_TRANSLATED__',
    // Default value to give to empty keys
    // You may also specify a function accepting the locale, namespace, and key as arguments

    indentation: 2,
    // Indentation of the catalog files

    keepRemoved: false,
    // Keep keys from the catalog that are no longer in code

    // see below for more details
    lexers: {
        ts: ['JsxLexer'],
        tsx: ['JsxLexer'],

        default: ['JsxLexer'],
    },

    locales: ['en', 'fr'],
    // An array of the locales in your applications

    output: 'src/locales/$LOCALE/$NAMESPACE.json',
    // Supports $LOCALE and $NAMESPACE injection
    // Supports JSON (.json) and YAML (.yml) file formats
    // Where to write the locale files relative to process.cwd()

    input: ['src/**/*.{ts,tsx}'],
    // An array of globs that describe where to look for source files
    // relative to the location of the configuration file

    sort: true,
    // Whether or not to sort the catalog

    useKeysAsDefaultValue: false,
    // Whether to use the keys as the default value; ex. "Hello": "Hello", "World": "World"
    // The option `defaultValue` will not work if this is set to true

    verbose: true,
    // Display info about the parsing including some stats
};