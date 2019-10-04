const byLabel = (a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase());

module.exports = async (data, { logger }) => {
    logger.debug('REQUEST_TOPICS', { topics: data.length });
    return data.sort(byLabel);
};
