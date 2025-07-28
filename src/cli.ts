#!/usr/bin/env node

import { program } from "commander"
import path from "path"
import log from "./log"

const { Bundler } = require('../bin/index.js')

type TargetType = 'plugin' | 'iconpack' | 'theme' | false
type ModeType = 'release' | 'dev'

program
    .option('-p, --project <value>', 'Project path')
    .option('-t, --target <value>', 'Target type')
    .option('-m, --mode <value>', 'Mode')
    .option('--platform <value>', 'Webpack target')
;

program.parse(process.argv);

function validateTarget(target: unknown): TargetType {
    if (typeof target !== 'string') return false;
    switch (target) {
        case 'plugin':
        case 'iconpack':
        case 'theme':
            return target;
        default:
            return false;
    }
}

function validateMode(mode: unknown): ModeType {
    if (mode === 'release') return 'release';
    return 'dev';
}

(async () => {
    const options = program.opts();
    const target = validateTarget(options.target);
    const mode = validateMode(options.mode);
    const projectPath = path.join(process.cwd(), typeof options.project === 'string' ? options.project : "");
    const webpackTarget = typeof options.platform === 'string' ? options.platform : 'node';

    if (target && projectPath) {
        switch (mode) {
            case 'release':
                let anyError = true
                const release = new Bundler({
                    projectPath,
                    webpackTarget
                })
                await release.bundle().then((err: any) => {
                    if (err) {
                        if (typeof err === 'string') {
                            log.error(err)
                        } else {
                            err.map((error: any) => {
                                log.error(`Error in ${error.moduleName} \n\n ${error.message}`)
                            })
                        }
                        anyError = false
                    }
                })
                await release.copyAssets()
                await release.zip() // Compress it in a ZIP file
                await release.zip('fmp') // Compress it in a FMP file
                if (anyError) log.success(`Plugin "${release.packageConf.name}" built in: \n
    ↳ ${release.releasePath}.zip
    ↳ ${release.releasePath}.fmp
                `)
                break;
            case 'dev':
                const dev = new Bundler({
                    projectPath,
                    webpackTarget
                })
                let lastError: any = null
                dev.watch((err: any) => {
                    if (err) {
                        log.error(err)
                        lastError = err
                    } else if (lastError) {
                        log.info(`Any error.`)
                        lastError = null
                    }
                }).then(() => {
                    log.info(`Started watching for changes.`)
                })
                break;
        }
    }
})()