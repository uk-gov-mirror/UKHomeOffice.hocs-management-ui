const byLabel = (a, b) => a.label.localeCompare(b.label);

module.exports = async (data, { logger }) => {
    logger.debug('REQUEST_TOPICS', { topics: data.length });
    return data
        .map(({ label, value }) => ({
            label: label,
            value: value
        }))
        .sort(byLabel);
};
