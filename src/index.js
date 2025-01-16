const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

const getActiveTabCount = async (browserName) => {
    if(!browserName) {
        return;
    }

    const {stdout, stderr} = await execPromise(`osascript -e 'tell application "Google Chrome" to return count of windows'`);
    if(stderr) {
        throw stderr;
    }

    return parseInt(stdout);
}
const startBrowserProcess = async (browserName, url) => {
    //some validatioin
    try {
        if (!browserName || !url) {
            throw new Error('Browser name and URL are missing in request');
        }
        const { stdout, stderr } =  await execPromise(`open -a "${browserName}" "${url}"`);
        if(stderr) {
            throw stderr;
        }
    } catch(error) {
        throw new Error({
            message: 'Failed to start browser proccess',
            error: error
        })
    }
};

const stopBrowser = async (browserName) => {
    //some validation
    try {
        if (!browserName) {
            throw new Error('Browser name is missing in request');
        }

        const { stdout, stderr } =  await execPromise(`osascript -e 'quit app "${browserName}"'`)
        console.log(stdout);
        if(stderr) {
            throw stderr;
        }
    } catch(error) {
        throw new Error({
            message: 'Failed to stop browser',
            error: error
        })
    }
};

const getActiveTabUrl = async (browserName) => {
    //some validation
    try {
        if (!browserName) {
            throw new Error('Browser name is missing in request');
        }

        const tabCount = await getActiveTabCount(browserName);
        if(tabCount === 0) {
            throw new Error('No tabs open in the browser');
        }

        const activeTabCommand = `osascript -e 'tell application ${browserName} to return URL of tab  of front window'`;
        const { stdout, stderr } = await execPromise(activeTabCommand);
        if(stderr) {
            throw stderr;
        }
        return stdout.split(' ');
    } catch(error) {
        throw new Error({
            message: 'Failed to get active tab URL',
            error: error
        })
    }
};

const cleanupBrowsingSession = async (browserName) => {
    console.log(browserName);
    try {
        if (!browserName) {
            throw new Error('Browser name is missing in request');
        }

        const { stdout, stderr } = await execPromise(`kill -9 $(ps aux | grep '[G]oogle Chrome' | awk '{print $2}')`);
        if(stderr) {
            throw stderr;
        }
    } catch(error) {
       console.log(error);
    }
}

const BrowserManager = {
    startBrowserProcess,
    stopBrowser,
    getActiveTabUrl,
    cleanupBrowsingSession,
};

module.exports = BrowserManager;
