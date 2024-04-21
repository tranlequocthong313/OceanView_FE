const formValidator = (text, field) => {
    if (!text) return `${field} can't be empty.`;
    return '';
};


export default formValidator;
