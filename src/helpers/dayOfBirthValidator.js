const dayOfBirthValidator = (text, field) => {
    let newValue = text;

    if (!text || text === '') {
        if (field === 'day') {
            setDay('');
        }
        if (field === 'month') {
            setMonth('');
        }
        if (field === 'year') {
            setYear('');
        }
        return;
    }
    // Xử lý ngày
    if (field === 'day') {
        // Kiểm tra xem giá trị nhập vào có phải là số từ 1 đến 31 không
        const numericValue = Number(text);
        const monthValue = Number(month);
        if (!Number.isNaN(numericValue) && numericValue >= 1) {
            if (monthValue === 2) {
                // Kiểm tra năm nhuận
                const yearValue = Number(year);
                const isLeapYear = (yearValue % 4 === 0 && yearValue % 100 !== 0) || yearValue % 400 === 0;

                if (isLeapYear) {
                    // Tháng 2 có 29 ngày trong năm nhuận
                    if (numericValue >= 1 && numericValue <= 29) {
                        newValue = numericValue.toString();
                    } else {
                        return;
                    }
                }
                // Tháng 2 có 28 ngày trong năm không nhuận
                else if (numericValue >= 1 && numericValue <= 28) {
                    newValue = numericValue.toString();
                } else {
                    return;
                }
            } else if ([4, 6, 9, 11].includes(monthValue)) {
                // Tháng có 30 ngày
                if (numericValue >= 1 && numericValue <= 30) {
                    newValue = numericValue.toString();
                } else {
                    return;
                }
            }
            // Các tháng còn lại có 31 ngày
            else if (numericValue >= 1 && numericValue <= 31) {
                newValue = numericValue.toString();
            } else {
                return;
            }
        } else {
            return;
        }
    }
    // Xử lý tháng
    else if (field === 'month') {
        // Kiểm tra xem giá trị nhập vào có phải là số từ 1 đến 12 không
        const numericValue = Number(text);
        if (!Number.isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
            newValue = numericValue.toString();
        } else {
            return;
        }
    }
    // Xử lý năm
    else if (field === 'year') {
        // Tương tự, kiểm tra xem giá trị nhập vào có phải là số không
        // Trong ví dụ này, tôi không thêm ràng buộc về giới hạn của năm
        const numericValue = Number(text);
        if (!Number.isNaN(numericValue)) {
            newValue = numericValue.toString();
        } else {
            return;
        }
    }

    // Nếu giá trị hợp lệ, cập nhật state tương ứng
    if (field === 'day') {
        setDay(newValue);
        console.log(text);
    } else if (field === 'month') {
        setMonth(newValue);
        console.log(text);
    } else if (field === 'year') {
        setYear(newValue);
        console.log(text);
    }
};

