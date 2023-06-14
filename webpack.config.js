module.exports = {
    entry: "./main.js", // Входной файл, в котором мы пишем свой код
    output: {
        filename: "main-lib.js" // Выходной файл, который подключаем к HTML
					// Обратите внимание, сохранится он по пути "./dist/main.js"
    }
}