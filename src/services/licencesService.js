const licences = require('../models/licences');

const getLicences = async () => {
    return licences.getLicences();
};

const getSameLicenceProducts = async (licence_id) => {
    return licences.getLicences(licence_id);
};

module.exports = {
    getLicences, getSameLicenceProducts
}