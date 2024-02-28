function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
}

function formatDateForDate(dateString: any) {
  const date = new Date(dateString);

  // Date objesinin geçerli olup olmadığını kontrol et
  if (isNaN(date.getTime())) {
    console.error("Invalid date object");
    return ""; // veya hata durumuna göre bir değer döndür
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Tek haneli aylar ve günler için başına sıfır ekleyerek formatla
  const paddedMonth = month < 10 ? `0${month}` : month;
  const paddedDay = day < 10 ? `0${day}` : day;

  return `${paddedDay}.${paddedMonth}.${year}`;
}

export { formatDate, formatDateForDate };
