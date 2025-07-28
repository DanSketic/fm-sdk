import chalk from 'chalk'

type LogFunction = (text: string) => void

const log: { 
    info: LogFunction, 
    success: LogFunction, 
    error: LogFunction 
} = {
    info(text: string) {
        console.log(
            chalk.bold.bgBlue.rgb(255, 255, 255)('\n [fm2sdk] info -> '),
            chalk.underline(`${text} \n`)
        )
    },
    success(text: string) {
        console.log(
            chalk.bold.bgGreen('\n [fm2sdk] -> '),
            chalk.white(`${text} \n`)
        )
    },
    error(text: string) {
        console.log(
            chalk.bold.bgRed('\n [fm2sdk] error -> '),
            chalk.white(`\n\n ${text} \n`)
        )
    }
}

export default log