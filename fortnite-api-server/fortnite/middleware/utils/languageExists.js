function languageExists(lang) {
    return ["en", "ar", "de", "es", "es-419", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr"].includes(lang)
}

module.exports = languageExists