const chalk = require('chalk')

const log = {
	info(text){
		console.log(chalk.bold.bgBlue.rgb(255,255,255)(`\n [fmsdk] info -> `), chalk.underline(`${text} \n`))
	},
	success(text){
		console.log(chalk.bold.bgGreen(`\n [fmsdk] -> `), chalk.white(`${text} \n`))
	},
	error(text){
		console.log(chalk.bold.bgRed(`\n [fmsdk] error -> `), chalk.white(`\n\n ${text} \n`))
	}
}

module.exports = log
