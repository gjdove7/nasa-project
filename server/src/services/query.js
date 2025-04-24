const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT; // Mongo will return all docs on the first page if the limit is 0
    const skip = (page - 1) * limit;

    return {
        skip,
        limit,
    };
}

module.exports = {
    getPagination,
};