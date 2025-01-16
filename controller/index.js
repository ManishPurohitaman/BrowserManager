const BrowserManager = require('../src/index.js');

const BrowserController = {
    start: async (req, res) => {
        try {
            const { browser, url } = req.query;
            await BrowserManager.startBrowserProcess(browser, url);
            res.status(200).json({ message: 'Browser process started successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: JSON.stringify(error.message) || 'Failed To start browser process'})
        }
    },

    stop: async (req, res) => {
        try {
            const { browser } = req.query;
            await BrowserManager.stopBrowser(browser);
            res.status(200).json({ message: 'Browser process stopped successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message || 'Failed to stop browser process', error });
        }
    },

    getActiveTabs: async (req, res) => {
        try {
            const { browser } = req.query;
            const activeTabUrls = await BrowserManager.getActiveTabUrl(browser);
            res.status(200).json({ message: 'Active tab URL retrieved successfully.', urls: activeTabUrls });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve active tab URL', error });
        }
    },

    cleanup: async (req, res) => {
        try {
            const { browser } = req.query;
            await BrowserManager.cleanupBrowsingSession(browser);
            res.status(200).json({ message: 'Browser session cleaned up successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message || 'Failed to clean up browser session', error });
        }
    },
};

module.exports = BrowserController;
