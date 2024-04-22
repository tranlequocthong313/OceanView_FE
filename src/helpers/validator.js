const residentIdValidator = (residentId) => {
    const currentYear = new Date().getFullYear();

    const residentIdStr = String(residentId);

    if (residentIdStr.length !== 6) {
        return false;
    }
    const yearPart = Number(residentIdStr.substring(0, 2));
    if (yearPart < 24 || yearPart > currentYear % 100) {
        return false;
    }
    const orderPart = Number(residentIdStr.substring(2));
    if (orderPart < 0 || orderPart > 9999) {
        return false;
    }

    return true;
};

export default { residentIdValidator };
