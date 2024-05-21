export const formatDate = (data) => {
    const date = new Date(data);

    // Chuyển đổi sang ISO string
    const isoString = date.toISOString();
    console.log("ISO String:", isoString);

    // Chuyển đổi sang định dạng ngày tháng năm
    const formattedDate = date.toLocaleDateString('vi', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return formattedDate

}

export const formatCurrencyVND = (amount, currencySymbol = "vnđ") => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };