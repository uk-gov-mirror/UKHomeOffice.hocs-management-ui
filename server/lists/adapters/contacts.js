module.exports = async (data, { logger }) => {
    logger.debug('CONTACTS_FOR_TEAM', { topics: data.length });
    return data;
};

