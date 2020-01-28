module.exports = async ({id, firstName, lastName, email}, { logger }) => {
    logger.debug('REQUEST_USER');
    return  {
        label: `${firstName} ${lastName} (${email})`,
        value: id
    };
}